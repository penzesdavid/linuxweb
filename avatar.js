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

// 3. Mentés funkció (Ezt hívja meg a Save gombod)
async function saveAvatar() {
    // Használjuk a database.js-ben window-hoz kötött auth-ot és db-t
    const user = window.firebaseAuth.currentUser; 
    const usernameInput = document.getElementById('usernameInput');
    const newName = usernameInput ? usernameInput.value.trim() : "";

    if (!user) {
        alert("Error: No user is currently logged in.");
        return;
    }

    try {
        // A v10-es Modular szintaxist kell használnunk a database.js miatt
        await window.firebaseFirestore.setDoc(window.firebaseFirestore.doc(window.firebaseDb, "users", user.uid), {
            avatarSeed: currentAvatarSeed,
            username: newName
        }, { merge: true });

        alert("Avatar is saved successfully!");
        
    } catch (error) {
        console.error("Firebase save error:", error);
        alert("Error occurred while saving the avatar.");
    }
}