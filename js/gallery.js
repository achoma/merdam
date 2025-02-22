document.addEventListener("DOMContentLoaded", function () {
  const latestGalleryContainer = document.getElementById("latest-gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");
  const lightboxClose = document.getElementById("lightbox-close");

  // Wstaw ID swojego arkusza Google Sheets
  const sheetId = "14f0CJcM0PIpacskaRJ5ZcOhF0sbLU2z54jx4lZ9E1T8";
  const apiUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

  let images = [];
  let currentIndex = 0;

  fetch(apiUrl)
    .then((response) => response.text())
    .then((data) => {
      const jsonData = JSON.parse(data.substring(47, data.length - 2));
      const rows = jsonData.table.rows;

      // Pobieramy zdjęcia, pomijając nagłówek i wybieramy 6 ostatnich
      images = rows
        .slice(1) // Pomijamy nagłówek
        .slice(-6) // Pobieramy 6 ostatnich zdjęć
        .map((row) => ({
          url: row.c[0]?.v || "",
          title: row.c[1]?.v || "Bez tytułu",
        }))
        .reverse(); // Odwracamy kolejność, by najnowsze było pierwsze

      latestGalleryContainer.innerHTML = "";

      images.forEach((image, index) => {
        if (!image.url) return;

        const galleryItem = document.createElement("div");
        galleryItem.classList.add("latest-gallery-item");
        galleryItem.dataset.index = index;

        const imgElement = document.createElement("img");
        imgElement.src = image.url;
        imgElement.alt = image.title;

        imgElement.onerror = function () {
          this.src = "https://via.placeholder.com/320x200?text=Brak+zdjęcia";
        };

        galleryItem.appendChild(imgElement);
        latestGalleryContainer.appendChild(galleryItem);
      });

      // Obsługa kliknięcia w zdjęcie - otwieranie lightboxa
      document.querySelectorAll(".latest-gallery-item").forEach((item) => {
        item.addEventListener("click", function () {
          currentIndex = parseInt(this.dataset.index);
          openLightbox(currentIndex);
        });
      });
    })
    .catch((error) => console.error("Błąd ładowania najnowszych zdjęć:", error));

  // Funkcja otwierająca lightbox
  function openLightbox(index) {
    lightboxImg.src = images[index].url;
    lightboxCaption.textContent = images[index].title;
    lightbox.style.display = "flex";
  }

  // Przewijanie zdjęć w lightboxie
  //   lightboxPrev.addEventListener("click", function () {
  //     currentIndex = (currentIndex - 1 + images.length) % images.length;
  //     openLightbox(currentIndex);
  //   });

  //   lightboxNext.addEventListener("click", function () {
  //     currentIndex = (currentIndex + 1) % images.length;
  //     openLightbox(currentIndex);
  //   });

  // Zamknięcie lightboxa
  //   lightboxClose.addEventListener("click", function () {
  //     lightbox.style.display = "none";
  //   });

  // Zamknięcie lightboxa po kliknięciu w tło
  //   lightbox.addEventListener("click", function (event) {
  //     if (event.target === lightbox) {
  //       lightbox.style.display = "none";
  //     }
  //   }
  //   );
});
