document.addEventListener("DOMContentLoaded", function () {
  const galleryContainer = document.getElementById("gallery");

  // Wstaw ID swojego arkusza Google Sheets
  const sheetId = "14f0CJcM0PIpacskaRJ5ZcOhF0sbLU2z54jx4lZ9E1T8";

  const apiUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

  fetch(apiUrl)
    .then((response) => response.text())
    .then((data) => {
      const jsonData = JSON.parse(data.substring(47, data.length - 2));
      const rows = jsonData.table.rows;

      rows.forEach((row) => {
        const imageUrl = row.c[0]?.v || "";
        const imageTitle = row.c[1]?.v || "Bez tytułu";

        if (!imageUrl) return;

        const galleryItem = document.createElement("div");
        galleryItem.classList.add("gallery-item");

        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = imageTitle;

        imgElement.onerror = function () {
          this.src = "https://via.placeholder.com/200x150?text=Brak+zdjęcia";
        };

        const titleElement = document.createElement("p");
        titleElement.textContent = imageTitle;

        galleryItem.appendChild(imgElement);
        galleryItem.appendChild(titleElement);
        galleryContainer.appendChild(galleryItem);
      });
    })
    .catch((error) => console.error("Błąd ładowania galerii:", error));
});
