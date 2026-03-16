let translations = {}; // Global cache
let currentLang = 'en';

async function loadTranslations(lang) {
	const response = await fetch(`lang/${lang}.json`);
	translations = await response.json();
	applyTranslations();
	document.documentElement.lang = lang;
	currentLang = lang;
	localStorage.setItem('lang', lang);
	updateLanguageSwitcher();
}

function applyTranslations() {
	document.querySelectorAll('[data-key]').forEach(el => {
    	const key = el.getAttribute('data-key');
		const translation = key.split('.').reduce((obj, i) => (obj ? obj[i] : null), translations);

		if (translation) {
			if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
				el.placeholder = translation;
			} else {
				el.innerHTML = translation; 
			}
		} else {
			console.warn(`Translation missing for key: ${key}`);
		}
  });
}

function updateLanguageSwitcher() {
	const langImg = document.getElementById('lang-flag-img');
	const langText = document.getElementById('lang-flag-text');
	const langBtn = document.getElementById('lang-switcher-btn');
	
	if (langImg) {
		if (currentLang === 'en') {
			langImg.src = './pictures/english.png';
			langImg.alt = 'English';
			langBtn.title = 'Click to switch to Hungarian';
			if (langText) langText.textContent = 'EN';
		} else {
			langImg.src = './pictures/hungary.png';
			langImg.alt = 'Hungarian';
			langBtn.title = 'Click to switch to English';
			if (langText) langText.textContent = 'HU';
		}
	}
}

function toggleLanguage() {
	const nextLang = currentLang === 'en' ? 'hu' : 'en';
	changeLanguage(nextLang);
}

async function changeLanguage(lang) {
	if (lang === currentLang) return;
	await loadTranslations(lang);
}

// Auto-load
window.addEventListener('DOMContentLoaded', () => {
	const saved = localStorage.getItem('lang') || 'en';
	loadTranslations(saved);
});