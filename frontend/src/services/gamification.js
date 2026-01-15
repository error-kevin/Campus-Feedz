// src/services/gamification.js
import { doc, updateDoc, increment, getDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Calculates Rank based on XP score
 */
export const getRankLabel = (points) => {
  if (points >= 500) return "Campus Legend 🏆";
  if (points >= 200) return "Expert Contributor ⭐";
  if (points >= 100) return "Active Student 📚";
  return "Freshman 🌱";
};

/**
 * Updates user points and rank in Firestore
 * @param {string} uid - The user's unique ID
 * @param {number} pointsToAdd - How many points to give
 */
export const awardXP = async (uid, pointsToAdd) => {
  if (!uid) return;

  try {
    const userRef = doc(db, "users", uid);
    
    // 1. Atomically increment points in Firestore
    await updateDoc(userRef, {
      points: increment(pointsToAdd)
    });

    // 2. Fetch updated points to recalculate Rank
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const newTotal = userSnap.data().points || 0;
      const newRank = getRankLabel(newTotal);

      // 3. Update the Rank string
      await updateDoc(userRef, {
        rank: newRank
      });
      
      return { newTotal, newRank };
    }
  } catch (error) {
    console.error("Error awarding XP:", error);
  }
};