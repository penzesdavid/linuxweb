// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2n0rzNLqHYEEePxcab8XTgXGYvVQjan4",
  authDomain: "linuxatlas.firebaseapp.com",
  projectId: "linuxatlas",
  storageBucket: "linuxatlas.firebasestorage.app",
  messagingSenderId: "395652638024",
  appId: "1:395652638024:web:291936d4d391933a2d3f7d",
  measurementId: "G-2FL022QKGK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- LOGIN PROCESS ---
const login_button = document.getElementById('login_button');
if (login_button) {
    login_button.addEventListener('click', function(event) {
        event.preventDefault();

        const email_login = document.getElementById('email_login').value;
        const password_login = document.getElementById('password_login').value;

        signInWithEmailAndPassword(auth, email_login, password_login)
            .then(async (userCredential) => {
                const user = userCredential.user;

                // --- ÚJ: Felhasználói adatok szinkronizálása az eszközzel ---
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        localStorage.setItem('user_plan', userData.plan || 'free');
                    } else {
                        // Ha valamiért nincs dokumentum, alapértelmezett free
                        localStorage.setItem('user_plan', 'free');
                    }
                    
                    // UID mentése a biztonság kedvéért
                    localStorage.setItem('last_uid', user.uid);

                    alert("User logged in successfully");
                    window.location.href = "./success_page.html";

                } catch (dbError) {
                    console.error("Error fetching user data:", dbError);
                    // Még ha a DB hiba is, engedjük be, de legyen free a helyi státusza
                    localStorage.setItem('user_plan', 'free');
                    window.location.href = "./success_page.html";
                }
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    });
}


// --- LOGOUT PROCESS ---
window.logout = async () => {
    try {
        await signOut(auth);
        
        // --- ÚJ: LocalStorage teljes takarítása ---
        localStorage.removeItem('user_plan');
        localStorage.removeItem('last_uid');
        // Vagy mindent egyszerre: localStorage.clear();

        alert("Successfully logged out!");
        window.location.href = "index.html";
    } catch (e) {
        console.error("Error during logout:", e);
        alert("Error during logout: " + e.message);
    }
};