/*import "https://www.gstatic.com/firebasejs/12.10.0/firebase-app-compact.js";
import "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore-compact.js";
import "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth-compact.js";
*/

const firebaseConfig = {
    apiKey: "AIzaSyA2n0rzNLqHYEEePxcab8XTgXGYvVQjan4",
    authDomain: "linuxatlas.firebaseapp.com",
    projectId: "linuxatlas",
    storageBucket: "linuxatlas.firebasestorage.app",
    messagingSenderId: "395652638024",
    appId: "1:395652638024:web:291936d4d391933a2d3f7d",
    measurementId: "G-2FL022QKGK"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const contentEl = document.getElementById("suggest-div");

// --- When user state changes, show suggestion form if logged in ---
auth.onAuthStateChanged(user => {
if (user) {
    // Show suggestion form instead of "Hello world"
    contentEl.innerHTML = `
    <h2 style='text-align: center; color: var(--glow-magenta);'>Submit a suggestion</h2>
    <form id='suggestion-form'>
        <input type='text' id='title' placeholder='Title' required /><br />
        <textarea id='long-text' placeholder='Your long suggestion text...' rows='6' required></textarea><br />
        <button type='submit' class='button-style'>Send</button>
    </form>
    <div id='status'></div>
    `;

    const form = document.getElementById("suggestion-form");
    const status = document.getElementById("status");

    // Handle submit
    form.addEventListener("submit", async e => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const longText = document.getElementById("long-text").value.trim();

    try {
        await db.collection("suggestions").add({
        title: title,
        longText: longText,
        userEmail: user.email,           // attach user email
        userId: user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        status.textContent = "Suggestion sent successfully!";
        form.reset();
    } catch (error) {
        status.textContent = "Error: " + error.message;
    }
    });
} else {
    // If not logged in, keep "Hello world" (or arbitrary text)
    contentEl.innerHTML = translations.finder.suggest_placeholder;
}
});