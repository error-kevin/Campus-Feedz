import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore

# 1. App Configuration
app = Flask(__name__)

# CORS Allow React (Port 5173) and Flask (Port 5000) to connect and talk
CORS(app, resources={r"/*": {"origins": "*"}})

# 2. Firebase Initialization (Sirf ek baar hona chahiye)
# Check karte hain ki app pehle se initialized to nahi hai
if not firebase_admin._apps:
    try:
        cred = credentials.Certificate("serviceAccountKey.json")
        firebase_admin.initialize_app(cred)
        print("✅ Firebase Admin Connected Successfully")
    except Exception as e:
        print(f"❌ Error connecting to Firebase: {e}")

# Database Reference
db = firestore.client()

# 3. Test Route (To check if server is running)
@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "status": "success",
        "message": "CampusFeedz Backend is Running!",
        "team": "Ready to Win"
    }), 200

# 4. Example API: Get All Posts (Isse baad me replace karenge)
@app.route('/api/test-db', methods=['GET'])
def test_db():
    try:
        # Ek dummy collection create karke test krte hain
        doc_ref = db.collection('test').document('server_check')
        doc_ref.set({'status': 'working', 'timestamp': firestore.SERVER_TIMESTAMP})
        return jsonify({"message": "Database write successful!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 5. Server Run
if __name__ == '__main__':
    # Debug=True hackathon me errors dikhane k lie helpful hai
    app.run(debug=True, port=5000)