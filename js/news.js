document.addEventListener("DOMContentLoaded", function () {
  const blogContainer = document.getElementById("blog-posts");

  // Wstaw ID swojego arkusza Google Sheets
  const sheetId = "1cq2bT4wPj98UXtgHfLPeTkSnojD7LY_0Ww4WbugChkY"; // Podmień na właściwy ID arkusza
  const apiUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

  fetch(apiUrl)
    .then((response) => response.text())
    .then((data) => {
      const jsonData = JSON.parse(data.substring(47, data.length - 2));
      const rows = jsonData.table.rows;

      // Pomiń pierwszy wiersz (nagłówki)
      rows.slice(1).forEach((row) => {
        const title = row.c[0]?.v || "Brak tytułu"; // Tytuł posta
        const content = row.c[1]?.v || "Brak treści"; // Treść posta

        // Tworzymy element HTML dla każdego posta
        const postElement = document.createElement("div");
        postElement.classList.add("blog-post");

        const titleElement = document.createElement("h2");
        titleElement.textContent = title;

        const contentElement = document.createElement("p");
        contentElement.textContent = content;

        // Dodajemy tytuł i treść do posta
        postElement.appendChild(titleElement);
        postElement.appendChild(contentElement);

        // Dodajemy post do kontenera
        blogContainer.appendChild(postElement);
      });
    })
    .catch((error) => console.error("Błąd ładowania postów:", error));
});
