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
  if (!input) {
    // If search is cleared, also clear previous results
    document.querySelectorAll(".highlight-box").forEach(h => h.remove());
    return;
  }

  const elements = document.querySelectorAll(
    ".content p, .content h1, .content h2, .content h3, .content li"
  );

  // Remove old highlights
  document.querySelectorAll(".highlight-box").forEach(h => h.remove());

  const matches = [];

  for (let el of elements) {
    if (el.textContent.toLowerCase().includes(input.toLowerCase())) {
      matches.push(el);
    }
  }

  if (matches.length === 0) {
    alert("No results found");
    return;
  }

  // Scroll to first matching element
  const firstMatch = matches[0];
  const navbar = document.querySelector(".navbar");
  const navbarHeight = navbar ? navbar.offsetHeight : 0;
  const y =
    firstMatch.getBoundingClientRect().top +
    window.pageYOffset -
    navbarHeight -
    20;
  window.scrollTo({ top: y, behavior: "smooth" });

  // Create result box with list of matches
  const box = document.createElement("div");
  box.className = "highlight-box";

  const title = document.createElement("div");
  title.innerHTML = `<strong>Search results for "${input}"</strong>`;
  box.appendChild(title);

  const list = document.createElement("ul");
  list.style.listStyle = "none";
  list.style.paddingLeft = "0";

  const maxResults = 10;
  matches.slice(0, maxResults).forEach((el, index) => {
    const li = document.createElement("li");
    li.style.cursor = "pointer";
    li.style.margin = "0.25rem 0";

    // Short snippet around the search term
    const text = el.textContent || "";
    const lower = text.toLowerCase();
    const q = input.toLowerCase();
    const pos = lower.indexOf(q);
    let snippet = text.trim();
    if (pos >= 0) {
      const start = Math.max(0, pos - 30);
      const end = Math.min(text.length, pos + q.length + 30);
      snippet = (start > 0 ? "..." : "") +
        text.slice(start, end).trim() +
        (end < text.length ? "..." : "");
    }

    li.textContent = `${index + 1}. ${snippet}`;

    li.addEventListener("click", () => {
      const rect = el.getBoundingClientRect();
      const yTarget =
        rect.top + window.pageYOffset - navbarHeight - 20;
      window.scrollTo({ top: yTarget, behavior: "smooth" });
    });

    list.appendChild(li);
  });

  if (matches.length > maxResults) {
    const more = document.createElement("div");
    more.style.marginTop = "0.5rem";
    more.style.fontSize = "0.8rem";
    more.textContent = `+ ${matches.length - maxResults} more result(s) not shown`;
    box.appendChild(more);
  }

  box.appendChild(list);

  // Click the x to remove
  const closeBtn = document.createElement("span");
  closeBtn.className = "close-btn";
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", () => {
    box.remove();
  });
  box.insertBefore(closeBtn, box.firstChild);

  document.body.appendChild(box);
}

const secretqrcode = document.getElementById('secretqrcode').style.display = 'none';

const secretlink = document.getElementById('secretlink');
if (secretlink) {
  secretlink.addEventListener('click', () => {
    const qrcode = document.getElementById('secretqrcode');
    if (qrcode.style.display === 'none') {
      qrcode.style.display = 'block';
    } else {
      qrcode.style.display = 'none';
    }
  });
}


