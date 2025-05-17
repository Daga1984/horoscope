const container = document.getElementById("horoscope-container");
const button = document.getElementById("get-horoscope");

export function disableButton() {
  button.disabled = true;
}

export function enableButton() {
  button.disabled = false;
}

export function clearView() {
  container.innerHTML = "";
  container.classList.remove("fade-out");
}

export function renderHoroscope({ horoscope_data, date, emoji }) {
  container.innerHTML = `
    <h2>${emoji} Horóscopo del día</h2>
    <p><strong>Fecha:</strong> ${date}</p>
    <p>${horoscope_data}</p>
  `;
  container.classList.add("visible");
}

export function renderError() {
  container.innerHTML = "<p>❌ Error al obtener el horóscopo. Intenta nuevamente.</p>";
}

export function fadeOut() {
  container.classList.add("fade-out");
}