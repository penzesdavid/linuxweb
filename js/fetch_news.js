const fs = require('fs');

async function getNews() {
    const API_KEY = process.env.WORLD_NEWS_API_KEY; // A GitHub titkokból jön
    const url = `https://api.worldnewsapi.com/search-news?text=linux&language=en&api-key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Elmentjük a híreket egy JSON fájlba
        fs.writeFileSync('data.json', JSON.stringify(data));
        console.log('Hírek sikeresen mentve a data.json fájlba.');
    } catch (error) {
        console.error('Hiba az API hívás közben:', error);
        process.exit(1);
    }
}

getNews();