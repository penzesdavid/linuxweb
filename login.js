username_list = [];

function login() {
    const username = document.querySelector('#username_login').value;

    if (username === 'admin') {
        alert('Welcome, admin!');
    }

    else {
        if (username_list.includes(username)) {
            alert(`Welcome, ${username}!`);
        } else {
            alert('User not recognized.');
        }
    }
};

function register() {
    const username = document.querySelector('#username_register').value;

    if (username_list.includes(username)) {
        alert('Username already taken.');
    }
    else {
        username_list.push(username);
        localStorage.setItem('usernames', JSON.stringify(username_list));
        alert(`User ${username} registered successfully.`);
    }
};