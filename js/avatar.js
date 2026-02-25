// avatar.js initialization

// Global avatarSeed variable
let currentAvatarSeed = Math.random().toString(36).substring(7);

// Make it global so database.js can access it
window.newRandomAvatar = function() {
    currentAvatarSeed = Math.random().toString(36).substring(7);
    const imgElement = document.getElementById('avatar');
    
    if (imgElement) {
        imgElement.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentAvatarSeed}`;
        console.log("Avatar seed updated: " + currentAvatarSeed);
    }
}

// Wait for Firebase to be ready before allowing saves
function waitForFirebase(callback) {
    if (window.firebaseAuth && window.firebaseDb) {
        callback();
    } else {
        setTimeout(() => waitForFirebase(callback), 100);
    }
}

async function saveAvatar() {
    // First, ensure Firebase is loaded
    if (!window.firebaseAuth || !window.firebaseDb) {
        alert("Loading profile data... Please wait a moment and try again.");
        return;
    }

    const user = window.firebaseAuth.currentUser; 
    const usernameInput = document.getElementById('usernameInput');
    const newName = usernameInput ? usernameInput.value.trim() : "";

    if (!user) {
        alert("Error: You are not logged in!");
        return;
    }

    try {
        const profileData = {
            avatarSeed: currentAvatarSeed, // The current avatar seed
            username: newName             // The entered name
        };

        // 1. Save to Firebase (Firestore)
        const userDocRef = window.firebaseFirestore.doc(window.firebaseDb, "users", user.uid);
        await window.firebaseFirestore.setDoc(userDocRef, profileData, { merge: true });

        // 2. Save to LocalStorage for instant loading
        localStorage.setItem(`user_${user.uid}`, JSON.stringify(profileData));
        localStorage.setItem('last_uid', user.uid);

        // 3. Instant UI update
        if (typeof updateUI === 'function') {
            updateUI(newName, true);
        }

        alert("Profile (name and avatar) saved successfully!");
    } catch (error) {
        console.error("Save error:", error);
        alert("Error saving profile: " + error.message);
    }
}