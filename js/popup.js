// Adres JSON z Google Sheets (podmień na swój)
const sheetUrl = "https://docs.google.com/spreadsheets/d/e/1M5QIdh8xn2teGJaPT34ZwMtBaKc_agFBgwB_kNTaroU/pub?output=tsv";

// Funkcja pobierająca dane z Google Sheets
async function fetchPopupSettings() {
  try {
    const response = await fetch(sheetUrl);
    const text = await response.text();
    const lines = text.split("\n");
    const data = lines[1].split("\t");

    const isActive = data[0].trim() === "TRUE";
    const message = data[1].trim();

    return { isActive, message };
  } catch (error) {
    console.error("Błąd pobierania danych:", error);
    return { isActive: false, message: "Błąd ładowania danych" };
  }
}

// Funkcja obsługująca wyświetlanie pop-upa
async function handlePopup() {
  const { isActive, message } = await fetchPopupSettings();

  if (isActive) {
    document.getElementById("popup-message").textContent = message;
    document.getElementById("popup").style.display = "flex";
  }
}

// Obsługa zamykania pop-upa
document.querySelector(".close-btn").addEventListener("click", function () {
  document.getElementById("popup").style.display = "none";
});

// Uruchomienie pop-upa po załadowaniu strony
window.onload = handlePopup;
