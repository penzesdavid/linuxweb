  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB9qHY_q2xTWTLCIa4KsMxpom50Ly0X7OY",
    authDomain: "linuxatlas.firebaseapp.com",
    projectId: "linuxatlas",
    storageBucket: "linuxatlas.firebasestorage.app",
    messagingSenderId: "395652638024",
    appId: "1:395652638024:web:291936d4d391933a2d3f7d",
    measurementId: "G-2FL022QKGK"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

//inputs
const auth = getAuth();


//submit login
const register_button = document.getElementById('register_button');
register_button.addEventListener('click', function(event) {
event.preventDefault()

const email_reg = document.getElementById('email_register').value;
const password_reg = document.getElementById('password_register').value;
createUserWithEmailAndPassword(auth, email_reg, password_reg)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert("User registered successfully");
    window.location.href = "success_page.html";
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Error: " + errorMessage);
    // ..
  });
});