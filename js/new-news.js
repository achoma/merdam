document.addEventListener("DOMContentLoaded", function () {
  const postContainer = document.getElementById("blog-post");

  // Wstaw ID swojego arkusza Google Sheets
  const sheetId = "1cq2bT4wPj98UXtgHfLPeTkSnojD7LY_0Ww4WbugChkY"; // Zamień na swój ID
  const apiUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

  fetch(apiUrl)
    .then((response) => response.text())
    .then((data) => {
      const jsonData = JSON.parse(data.substring(47, data.length - 2));
      const rows = jsonData.table.rows;

      // Pomijamy pierwszy wiersz (nagłówki) i bierzemy tylko pierwszy post
      const firstRow = rows[1]; // Zmieniamy indeks na 1, bo wiersz 0 to nagłówki

      const postTitle = firstRow.c[0]?.v || "Bez tytułu"; // Kolumna A – Tytuł
      const postContent = firstRow.c[1]?.v || "Brak treści"; // Kolumna B – Treść

      // Tworzymy strukturę posta
      const postHTML = `
        <h4>${postTitle}</h4>
        <p>${postContent}</p>
      `;

      // Wstawiamy post do kontenera
      postContainer.innerHTML = postHTML;
    })
    .catch((error) => console.error("Błąd ładowania posta:", error));
});
