import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

// Ensure your Firebase 'app' is initialized here or imported
import { app } from "./database.js"; 

const auth = getAuth(app);
const db = getFirestore(app);

const suggestionsList = document.getElementById("profiledatas");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    await fetchUserSuggestions(user.uid);
  } else {
    if (suggestionsList) {
        suggestionsList.innerHTML = "<h4>Profile Data</h4><p>Your suggestions will appear here.</p>";
    }
  }
});

async function fetchUserSuggestions(userId) {
  try {
    const suggestionsRef = collection(db, "suggestions");

    const q = query(
      suggestionsRef, 
      where("userId", "==", userId),
      orderBy("createdAt", "desc") 
    );

    const querySnapshot = await getDocs(q);

    if (suggestionsList) {
        suggestionsList.innerHTML = "<h4>Profile Data</h4>"; 

        if (querySnapshot.empty) {
            suggestionsList.innerHTML = "<h4>Profile Data</h4><p>Your suggestions will appear here.</p>";
            return;
        }

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          let dateString = "Unknown date";
          
          if (data.createdAt && typeof data.createdAt.toDate === 'function') {
              const date = data.createdAt.toDate(); 
              dateString = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
          }

          const li = document.createElement("li");
          li.style.marginBottom = "15px";
          li.innerHTML = `
            <strong>${data.title}</strong> <br>
            <small style="color: gray;">Submitted: ${dateString}</small> <br>
            <p>${data.description}</p>
            <hr>
          `;
          suggestionsList.appendChild(li);
        });
    }

  } catch (error) {
    console.error("Error fetching suggestions:", error);
    // Fixed: check if element exists before writing to it
    if (suggestionsList) {
        suggestionsList.innerHTML = "<li>Error loading suggestions. Check console for details.</li>";
    }
  }
}