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
contentEl.innerHTML = `<p data-key="finder.suggest_placeholder"></p>`;

// --- When user state changes, show suggestion form if logged in ---
auth.onAuthStateChanged(user => {
if (user) {
    // Show suggestion form instead of "Hello world"
    contentEl.innerHTML = `
    <h2 style='text-align: center; color: var(--glow-magenta);' data-key='finder.suggest_title'>Submit a suggestion</h2>
    <form id='suggestion-form'>
        <input type='text' id='title' placeholder='Distro name' required data-key='finder.suggest_short' /><br />
        <textarea id='desc' placeholder='Detailed description of the distro...' rows='6' required data-key='finder.suggest_long'></textarea><br />
        <button type='submit' class='button-style' data-key='finder.suggest_send'>Send</button>
    </form>
    <div id='status'></div>
    `;

    const form = document.getElementById("suggestion-form");
    const status = document.getElementById("status");

    // Handle submit
    form.addEventListener("submit", async e => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const desc = document.getElementById("desc").value.trim();

    try {
        await db.collection("suggestions").add({
        title: title,
        description: desc,
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
    contentEl.innerHTML = `<p data-key='finder.suggest_placeholder'></p>`;
}
});