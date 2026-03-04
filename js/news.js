async function loadNewsFromJSON() {
    const NEWS_CONTAINER = document.getElementById('news-container');

    try {
        // Most már csak a lokális JSON-t kérjük le, nincs szükség kulcsra!
        const response = await fetch('./data.json');
        const data = await response.json();

        if (data.news && data.news.length > 0) {
            displayNews(data.news);
        }
    } catch (error) {
        console.error('Hiba a JSON betöltésekor:', error);
        NEWS_CONTAINER.innerHTML = '<p>A hírek jelenleg nem érhetőek el.</p>';
    }
}

// A displayNews függvény ugyanaz marad, mint az előző példában...
loadNewsFromJSON();