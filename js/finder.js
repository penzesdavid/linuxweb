function popOut() {
    const pickedDistro = document.querySelector('#distro-select').value;
    const displayArea = document.querySelector('#hyde');

    // Ensure the translations object and the specific finder_details key exist
    if (pickedDistro !== '' && translations.finder_details) {
        const data = translations.finder_details[pickedDistro];

        if (data) {
            if (displayArea.classList.contains('show')) {
                // 1. Fade it out first
                displayArea.classList.remove('show');
                
                // 2. Wait 400ms (matching your CSS transition) before swapping text and fading back in
                setTimeout(() => {
                    updateAndShowText(displayArea, data);
                }, 350);

            } else {
                // If it's currently hidden, just show it immediately
                updateAndShowText(displayArea, data);
            }
        } else {
            console.warn(`No translation found for distro: ${pickedDistro}`);
            displayArea.classList.remove('show');
        }
    } else {
        displayArea.classList.remove('show');
    }
}

function updateAndShowText(container, data) {
    container.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.desc}</p>
        ${data.extra ? data.extra : ''}
    `;
    container.classList.add('show');
}