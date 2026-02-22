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

const updateUI = (name, isLoggedIn) => {
    const title = document.getElementById('custom_name');
    const nav = document.getElementById('navUserName');
    const inputField = document.getElementById('usernameInput');
    const UserMenu = document.getElementById('NavLinkEdit');
    
    if (isLoggedIn && name && name !== "Login/register") {
        if (title) title.innerText = "Welcome back " + name + "!";
        if (nav) nav.innerText = "HI " + name + "!";
        if (UserMenu) UserMenu.href = "./profile_page.html";
        
        if (inputField) {
            inputField.value = name;
        }
    } else {
        if (title) title.innerText = "Welcome to LinuxAtlas";
        if (nav) nav.innerText = "Login/register";
        if (inputField) inputField.value = "";
        if (UserMenu) UserMenu.href = "./login_page.html";
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


const lastUserUid = localStorage.getItem('last_uid');
if (lastUserUid) {
    const cachedData = localStorage.getItem(`user_${lastUserUid}`);
    if (cachedData) {
        const data = JSON.parse(cachedData);
        window.userName = data.username || "Login/register";
        
        const nav = document.getElementById('navUserName');
        if (nav && data.username) nav.innerText = "HI " + data.username + "!";
        
        const avatarImg = document.getElementById('avatar');
        if (avatarImg && data.avatarSeed) {
            avatarImg.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.avatarSeed}`;
        }
    }
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        localStorage.setItem('last_uid', user.uid);
        
        try {
            const docSnap = await getDoc(doc(db, "users", user.uid));
            if (docSnap.exists()) {
                const data = docSnap.data();
                localStorage.setItem(`user_${user.uid}`, JSON.stringify(data));
                
                window.userName = data.username || "Login/register";
                updateUI(window.userName, true);

                if (data.avatarSeed) {
                    const avatarImg = document.getElementById('avatar');
                    if (avatarImg) {
                        avatarImg.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.avatarSeed}`;
                    }
                }
            }
        } catch (e) { console.error("Load error:", e); }
    } else {
        localStorage.removeItem('last_uid');
        updateUI("Login/register", false);
    }
});

function fastLoadFromCache() {
    const lastUserUid = localStorage.getItem('last_uid');
    if (lastUserUid) {
        const cachedData = localStorage.getItem(`user_${lastUserUid}`);
        if (cachedData) {
            const data = JSON.parse(cachedData);
            updateUI(data.username, true);
            
            const avatarImg = document.getElementById('avatar');
            if (avatarImg && data.avatarSeed) {
                avatarImg.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.avatarSeed}`;
            }
        }
    }
}

fastLoadFromCache();

document.addEventListener('DOMContentLoaded', fastLoadFromCache);
