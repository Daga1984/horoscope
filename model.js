const zodiacEmojis = {
  aries: "♈",
  taurus: "♉",
  gemini: "♊",
  cancer: "♋",
  leo: "♌",
  virgo: "♍",
  libra: "♎",
  scorpio: "♏",
  sagittarius: "♐",
  capricorn: "♑",
  aquarius: "♒",
  pisces: "♓"
};

export async function fetchHoroscope(signo) {
  const API_URL = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${signo}&day=today`;
  const CORS_PROXY = "https://corsproxy.io/?";
  
  try {
    const response = await fetch(`${CORS_PROXY}${API_URL}`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    
    const result = await response.json();
    const emoji = zodiacEmojis[signo];    return {
      horoscope_data: result.data.horoscope_data,
      date: result.data.date,
      emoji: emoji
    };
  } catch (error) {
    console.error("Error al obtener horóscopo:", error);
    return null;
  }
}