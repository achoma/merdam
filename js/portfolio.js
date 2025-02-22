document.addEventListener("DOMContentLoaded", function () {
  const galleryContainer = document.getElementById("gallery");
  const paginationContainer = document.getElementById("pagination");

  // Wstaw ID swojego arkusza Google Sheets
  const sheetId = "14f0CJcM0PIpacskaRJ5ZcOhF0sbLU2z54jx4lZ9E1T8";
  const apiUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

  const itemsPerPage = 16;
  let images = [];
  let currentPage = 1;
  let lightbox;

  fetch(apiUrl)
    .then((response) => response.text())
    .then((data) => {
      const jsonData = JSON.parse(data.substring(47, data.length - 2));
      const rows = jsonData.table.rows;

      // Pobieramy zdjęcia, pomijając nagłówek, i odwracamy kolejność, aby najnowsze były pierwsze
      images = rows
        .slice(1) // Pomijamy nagłówek
        .map((row) => ({
          url: row.c[0]?.v || "",
          title: row.c[1]?.v || "Bez tytułu",
        }))
        .reverse(); // Odwrócenie kolejności

      renderGallery();
      renderPagination();
    })
    .catch((error) => console.error("Błąd ładowania galerii:", error));

  function renderGallery() {
    galleryContainer.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const imagesToShow = images.slice(start, end);

    imagesToShow.forEach((image) => {
      if (!image.url) return;

      const galleryItem = document.createElement("a");
      galleryItem.href = image.url;
      galleryItem.classList.add("gallery-item");
      galleryItem.setAttribute("data-caption", image.title); // ✅ Przekazanie opisu

      const imgElement = document.createElement("img");
      imgElement.src = image.url;
      imgElement.alt = image.title;

      imgElement.onerror = function () {
        this.src = "https://via.placeholder.com/200x150?text=Brak+zdjęcia";
      };

      galleryItem.appendChild(imgElement);
      galleryContainer.appendChild(galleryItem);
    });

    // Jeśli SimpleLightbox już istnieje – usuwamy go i tworzymy na nowo
    if (lightbox) {
      lightbox.destroy();
    }

    // Inicjalizujemy SimpleLightbox ponownie po każdym załadowaniu galerii
    lightbox = new SimpleLightbox(".gallery-item", {
      captions: true,
      captionsData: "data-caption",
      captionDelay: 250,
      close: true,
      nav: true,
    });
  }

  function renderPagination() {
    paginationContainer.innerHTML = "";
    const pageCount = Math.ceil(images.length / itemsPerPage);

    for (let i = 1; i <= pageCount; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.classList.add("page-btn");
      if (i === currentPage) pageButton.classList.add("active");

      pageButton.addEventListener("click", function () {
        currentPage = i;
        renderGallery();
        renderPagination();
      });

      paginationContainer.appendChild(pageButton);
    }
  }
});
