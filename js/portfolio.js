// Wklej tutaj link do opublikowanego arkusza w formacie CSV
const sheetURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ7YnovprHgRzQ_6Lu1xY_8IUqUtkIhNN9Ue3K-dRENFYzDAMPBZOTi4XAAttmdCHWohUT9L-DGSCgo/pub?gid=0&single=true&output=csv";

async function loadGallery() {
  try {
    const response = await fetch(sheetURL);
    const data = await response.text();
    const rows = data.split("\n").slice(1); // Pomijamy nagłówek

    let galleryHTML = "";

    rows.forEach((row) => {
      const [image_url, title] = row.split(",");

      if (image_url) {
        galleryHTML += `
                            <div>
                                <img src="${image_url.trim()}" alt="${
          title ? title.trim() : "Zdjęcie"
        }">
                                <p>${title ? title.trim() : ""}</p>
                            </div>
                        `;
      }
    });

    document.getElementById("gallery").innerHTML = galleryHTML;
  } catch (error) {
    console.error("Błąd ładowania galerii:", error);
  }
}

loadGallery();
