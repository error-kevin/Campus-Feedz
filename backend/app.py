import os
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# --- UPDATED CORS CONFIGURATION ---
# This allows the frontend to send the 'ngrok-skip-browser-warning' header
CORS(app, resources={r"/*": {
    "origins": "*",
    "methods": ["GET", "POST", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization", "ngrok-skip-browser-warning"]
}})

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-1.5-flash')

if not firebase_admin._apps:
    try:
        cred = credentials.Certificate("serviceAccountKey.json")
        firebase_admin.initialize_app(cred)
        print("✅ Firebase Admin Connected Successfully")
    except Exception as e:
        print(f"❌ Error connecting to Firebase: {e}")

db = firestore.client()

# Standard Preflight Handler for browsers
@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        res = make_response()
        res.headers.add("Access-Control-Allow-Origin", "*")
        res.headers.add("Access-Control-Allow-Headers", "Content-Type,ngrok-skip-browser-warning")
        res.headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
        return res

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "status": "success",
        "message": "CampusFeedz AI Backend is Running!",
        "version": "1.0.1"
    }), 200

@app.route('/api/analyze-post', methods=['POST'])
def analyze_post():
    try:
        data = request.json
        caption = data.get('caption', '')
        prompt = f"Analyze this campus post caption: '{caption}'. Classify it into exactly one of these categories: 'Campus News', 'Lost & Found', or 'General Feed'. Return only the category name."
        response = model.generate_content(prompt)
        category = response.text.strip()
        return jsonify({"status": "success", "suggestedCategory": category}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/ask-ai', methods=['POST'])
def ask_ai():
    try:
        data = request.json
        question = data.get('question', '')
        prompt = f"You are a helpful campus mentor. Answer briefly: {question}"
        response = model.generate_content(prompt)
        return jsonify({"status": "success", "ai_answer": response.text.strip()}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/add-points', methods=['POST'])
def add_points():
    try:
        data = request.json
        uid = data.get('uid')
        points_to_add = data.get('points', 10)
        user_ref = db.collection('users').document(uid)
        user_ref.update({'points': firestore.Increment(points_to_add)})
        return jsonify({"status": "success", "message": f"{points_to_add} points added!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)