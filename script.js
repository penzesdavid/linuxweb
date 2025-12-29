// ENTER-re és gombra is keres
document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  searchText();
});

function searchText() {
  const input = document.getElementById("search").value.trim();
  if (!input) return;

  const elements = document.querySelectorAll(
    ".content p, .content h1, .content h2, .content h3, .content li"
  );

  // régi highlight eltávolítása
  document.querySelectorAll(".highlight-box").forEach(h => h.remove());

  let foundElement = null;

  for (let el of elements) {
    if (el.textContent.toLowerCase().includes(input.toLowerCase())) {
      foundElement = el;
      break;
    }
  }

  if (!foundElement) {
    alert("Nincs találat");
    return;
  }

  // scroll az elemhez
  const y =
    foundElement.getBoundingClientRect().top +
    window.pageYOffset -
    document.querySelector(".navbar").offsetHeight -
    20;
  window.scrollTo({ top: y, behavior: "smooth" });

  // létrehozott kék doboz
  const box = document.createElement("div");
  box.className = "highlight-box";

  // keresett szó aláhúzva a dobozban
  const regex = new RegExp(`(${input})`, "gi");
  box.innerHTML = `<span class="close-btn">&times;</span>${foundElement.textContent.replace(regex, '<u>$1</u>')}`;

  // kattintás az x-re eltávolítja
  box.querySelector(".close-btn").addEventListener("click", () => {
    box.remove();
  });

  document.body.appendChild(box);
}
