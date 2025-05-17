import { fetchHoroscope } from "./model.js";
import { disableButton, enableButton, clearView, renderHoroscope, renderError, fadeOut } from "./view.js";

let hideTimeout;

function getZodiacSign(dateString) {
  const [day, month] = dateString.split('-').map(Number);
  
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "aquarius";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "pisces";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "capricorn";
  return "unknown";
}

async function showAdvice() {
  disableButton();
  clearTimeout(hideTimeout);
  clearView();

  try {
    const birthdate = document.getElementById("date").value;
    if (!birthdate || !isValidDateFormat(birthdate)) {
      throw new Error("Formato de fecha inválido");
    }

    const sign = getZodiacSign(birthdate);
    const data = await fetchHoroscope(sign);
    
    if (!data) throw new Error("Sin datos del horóscopo");
    
    renderHoroscope(data);
    hideTimeout = setTimeout(() => {
      fadeOut();
      setTimeout(() => {
        clearView();
        enableButton();
      }, 1000);
    }, 15000);
  } catch (error) {
    renderError();
    setTimeout(enableButton, 2000);
  }
}

function isValidDateFormat(dateString) {
  return /^\d{2}-\d{2}-\d{4}$/.test(dateString);
}

document.getElementById("get-horoscope").addEventListener("click", showAdvice);

document.getElementById("date").addEventListener("input", (e) => {
  const isValid = isValidDateFormat(e.target.value);
  document.getElementById("dateError").style.display = isValid ? "none" : "block";
  document.getElementById("dateError").textContent = isValid ? "" : "Formato dd-mm-aaaa";
  document.getElementById("get-horoscope").disabled = !isValid;
});