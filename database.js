 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
    import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
    import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyA2n0rzNLqHYEEePxcab8XTgXGYvVQjan4",
    authDomain: "linuxatlas.firebaseapp.com",
    projectId: "linuxatlas",
    storageBucket: "linuxatlas.firebasestorage.app",
    messagingSenderId: "395652638024",
    appId: "1:395652638024:web:291936d4d391933a2d3f7d",
    measurementId: "G-2FL022QKGK"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Globális változó a névnek
window.userName = "Vendég";

// Segédfüggvény: Lecseréli a szövegeket az oldalon
const updateUI = (name) => {
    const title = document.getElementById('custom_name');
    const nav = document.getElementById('navUserName');
    
    if (title) title.innerText = `Welcome back, ${name}!`;
    if (nav) nav.innerText = `HI ${name}!`;
};

// MENTÉS FUNKCIÓ
window.saveUsername = async () => {
    const user = auth.currentUser;
    const inputField = document.getElementById('usernameInput');
    const newName = inputField.value.trim();

    if (user && newName !== "") {
        try {
            await setDoc(doc(db, "users", user.uid), { 
                username: newName 
            }, { merge: true });

            window.userName = newName; // Változó frissítése
            updateUI(newName);        // UI frissítése
            inputField.value = "";     // Mező ürítése
            alert("Név elmentve!");
        } catch (e) {
            console.error("Hiba a mentésnél:", e);
        }
    } else {
        alert("Jelentkezz be és írj be egy nevet!");
    }
};

// BETÖLTÉS FUNKCIÓ
window.loadUsername = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
            window.userName = docSnap.data().username;
            updateUI(window.userName); // UI frissítése a betöltött névvel
        }
    } catch (e) {
        console.error("Hiba a betöltésnél:", e);
    }
};

// FIGYELŐ: Amint bejelentkezik valaki, lefut a betöltés
onAuthStateChanged(auth, (user) => {
    if (user) {
        loadUsername();
    } else {
        window.userName = "Vendég";
        updateUI("Vendég");
    }
});