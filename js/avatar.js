// avatar.js

// 1. Ez a változó tárolja az aktuálisan látható kép kódját
let currentAvatarSeed = "start"; 

// 2. Új véletlenszerű avatar generálása
function newRandomAvatar() {
    currentAvatarSeed = Math.random().toString(36).substring(7);
    const imgElement = document.getElementById('avatar');
    
    if (imgElement) {
        imgElement.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentAvatarSeed}`;
        console.log("Aktuális seed frissítve: " + currentAvatarSeed);
    }
}

// avatar.js

async function saveAvatar() {
    const user = window.firebaseAuth.currentUser; 
    const usernameInput = document.getElementById('usernameInput');
    const newName = usernameInput ? usernameInput.value.trim() : "";

    if (!user) {
        alert("Hiba: Nem vagy bejelentkezve!");
        return;
    }

    try {
        const profileData = {
            avatarSeed: currentAvatarSeed, // Az aktuális kép kódja
            username: newName             // A beírt név
        };

        // 1. Mentés a Firebase-be (Firestore)
        const userDocRef = window.firebaseFirestore.doc(window.firebaseDb, "users", user.uid);
        await window.firebaseFirestore.setDoc(userDocRef, profileData, { merge: true });

        // 2. Mentés a LocalStorage-ba az azonnali betöltéshez
        localStorage.setItem(`user_${user.uid}`, JSON.stringify(profileData));
        localStorage.setItem('last_uid', user.uid);

        // 3. Azonnali UI frissítés a navigációban és máshol
        if (typeof updateUI === 'function') {
            updateUI(newName, true);
        }

        alert("Profil (név és avatar) sikeresen elmentve!");
    } catch (error) {
        console.error("Mentési hiba:", error);
        alert("Hiba történt a mentés során: " + error.message);
    }
}