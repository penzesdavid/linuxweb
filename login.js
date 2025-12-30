//Betöltjük a korábban mentett listát, vagy ha üres, egy üres tömböt hozunk létre
let username_list = JSON.parse(localStorage.getItem('users')) || [];

function login() {
    const username = document.querySelector('#username_login').value;

    if (username === 'admin') {
        alert('Welcome, Admin!');
    } 
    //A közös listában keressük a nevet
    else if (username_list.includes(username)) {
        alert(`Welcome, ${username}!`);
    } 
    else {
        alert('User not recognized.');
    }
}

function register() {
    const username = document.querySelector('#username_register').value;

    if (username === "") {
        alert('Please enter a username.');
        return;
    }

    if (username_list.includes(username)) {
        alert('Username already taken.');
    } 
    else {
        // 3. Hozzáadjuk az új nevet a listához
        username_list.push(username);
        
        // 4. Elmentjük a frissített listát az egységes "users" kulcs alá
        localStorage.setItem('users', JSON.stringify(username_list));
        
        alert(`User ${username} registered successfully.`);
    }
}
