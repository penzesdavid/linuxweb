// Search function
// Searches on ENTER press and button click
const searchForm = document.querySelector('form[role="search"]');
if (searchForm) {
  searchForm.addEventListener("submit", e => {
    e.preventDefault();
    searchText();
  });
}

function searchText() {
  const searchInput = document.getElementById("search");
  if (!searchInput) return;
  
  const input = searchInput.value.trim();
  if (!input) return;

  const elements = document.querySelectorAll(
    ".content p, .content h1, .content h2, .content h3, .content li"
  );

  // Remove old highlights
  document.querySelectorAll(".highlight-box").forEach(h => h.remove());

  let foundElement = null;

  for (let el of elements) {
    if (el.textContent.toLowerCase().includes(input.toLowerCase())) {
      foundElement = el;
      break;
    }
  }

  if (!foundElement) {
    alert("No results found");
    return;
  }

  // Scroll to element
  const navbar = document.querySelector(".navbar");
  const navbarHeight = navbar ? navbar.offsetHeight : 0;
  const y =
    foundElement.getBoundingClientRect().top +
    window.pageYOffset -
    navbarHeight -
    20;
  window.scrollTo({ top: y, behavior: "smooth" });

  // Create highlight box
  const box = document.createElement("div");
  box.className = "highlight-box";

  // Highlight the searched word
  const regex = new RegExp(`(${input})`, "gi");
  box.innerHTML = `<span class="close-btn">&times;</span>${foundElement.textContent.replace(regex, '<u>$1</u>')}`;

  // Click the x to remove
  box.querySelector(".close-btn").addEventListener("click", () => {
    box.remove();
  });

  document.body.appendChild(box);
}