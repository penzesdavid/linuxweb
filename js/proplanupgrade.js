console.log("Pro Plan Upgrade script loaded");
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

const db = getFirestore();
const auth = getAuth();

const btn = document.getElementById('upgradeButton');
if (btn) {
    btn.addEventListener('click', upgradeToPro);
}

async function upgradeToPro() {
    const user = auth.currentUser;
    const lastUserUid = user ? user.uid : localStorage.getItem('last_uid');

    if (!lastUserUid) {
        alert("Please login to upgrade to Pro Plan.");
        return;
    }

    try {
        await updateDoc(doc(db, "users", lastUserUid), {
            plan: "pro",
        });

        localStorage.setItem('user_plan', 'pro');

        alert("Successfully upgraded to Pro Plan!");
        window.location.href = "./profile_page.html";
    } catch (error) {
        console.error("Error:", error);
        alert("Error: " + error.message);
    }
}

auth.onAuthStateChanged((user) => {
    if (!user) {
        // Ha nincs bejelentkezve, töröljük a pro-t a tárolóból is, biztos ami biztos
        localStorage.removeItem('user_plan');
        window.location.href = "./login.html";
    }
});