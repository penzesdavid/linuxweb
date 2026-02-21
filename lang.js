let translations = {}; // Global cache
let currentLang = 'en';

async function loadTranslations(lang) {
	const response = await fetch(`lang/${lang}.json`);
	translations = await response.json();
	applyTranslations();
	document.documentElement.lang = lang;
	currentLang = lang;
	localStorage.setItem('lang', lang);
}

function applyTranslations() {
	document.querySelectorAll('[data-key]').forEach(el => {
    	const key = el.getAttribute('data-key');
    	if (el.tagName === 'INPUT' && el.placeholder) {
    		el.placeholder = translations[key];
    	} else if (translations[key]) {
			el.innerHTML = translations[key]; 
		}
  });
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