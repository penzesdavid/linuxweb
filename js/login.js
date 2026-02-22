  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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


// --- LOGIN FOLYAMAT ---
const login_button = document.getElementById('login_button');
if (login_button) {
    login_button.addEventListener('click', function(event) {
        event.preventDefault();

        const email_login = document.getElementById('email_login').value;
        const password_login = document.getElementById('password_login').value;

        signInWithEmailAndPassword(auth, email_login, password_login)
            .then((userCredential) => {
                alert("User logged in successfully");
                window.location.href = "./success_page.html";
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    });
}



// --- KIJELENTKEZÉS JAVÍTÁSA ---
// A window.logout-ot használjuk, hogy a HTML-ből is elérhető legyen
window.logout = async () => {
    try {
        await signOut(auth); // Meghívjuk a Firebase kijelentkezést
        alert("Successfully logged out!");
        // A kijelentkezés után visszairányítunk a főoldalra
        window.location.href = "index.html"; 
    } catch (e) {
        console.error("Error during logout:", e);
        alert("Error during logout: " + e.message);
    }
};