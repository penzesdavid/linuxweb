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

// Global variable
window.userName = "Login/register";

// UI Update with different logic for Title and Navbar
const updateUI = (name, isLoggedIn) => {
    const title = document.getElementById('custom_name');
    const nav = document.getElementById('navUserName');
    
    if (isLoggedIn && name !== "Login/register") {
        // When logged in and has a name
        if (title) title.innerText = "Welcome back " + name + "!";
        if (nav) nav.innerText = "HI " + name + "!";
    } else {
        // Default state (Logged out or no name set)
        if (title) title.innerText = "Welcome to LinuxAtlas";
        if (nav) nav.innerText = "Login/register";
    }
};

// SAVE FUNCTION
window.saveUsername = async () => {
    const user = auth.currentUser;
    const input = document.getElementById('usernameInput');
    const newName = input ? input.value.trim() : "";

    if (user && newName !== "") {
        try {
            await setDoc(doc(db, "users", user.uid), { 
                username: newName 
            }, { merge: true });

            window.userName = newName;
            updateUI(newName, true);
            input.value = ""; 
            alert("Username updated!");
        } catch (e) {
            console.error("Save error:", e);
        }
    } else {
        alert("Please enter a valid name!");
    }
};

// AUTH OBSERVER
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            const docSnap = await getDoc(doc(db, "users", user.uid));
            if (docSnap.exists()) {
                window.userName = docSnap.data().username;
                updateUI(window.userName, true);
            } else {
                updateUI("No Name Set", true);
            }
        } catch (e) {
            console.error("Load error:", e);
        }
    } else {
        window.userName = "Login/register";
        updateUI("Login/register", false);
    }
});