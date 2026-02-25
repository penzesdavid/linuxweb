document.querySelector('#hyde').style.visibility = 'hidden';

function popOut() {
    const pickedDistro = document.querySelector('#distro-select').value;
    const displayArea = document.querySelector('#hyde');

    // Ensure the translations object and the specific finder_details key exist
    if (pickedDistro !== '' && translations.finder_details) {
        const data = translations.finder_details[pickedDistro];

        if (data) {
            // Inject the translated Title and Description from the JSON
            displayArea.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.desc}</p>
                ${data.extra ? data.extra : ''}
            `;
            displayArea.style.visibility = 'visible';
        } else {
            console.warn(`No translation found for distro: ${pickedDistro}`);
            displayArea.style.visibility = 'hidden';
        }
    } else {
        displayArea.style.visibility = 'hidden';
    }
}