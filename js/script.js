const button = document.getElementById("searchBtn");
const input = document.getElementById("cityInput");
const result = document.getElementById("result");

const apiKey = "919fe45eceb59fc8a82b59b8c8eba068";

async function getWeather() {

  const city = input.value.trim();

  if (!city) {
    result.innerHTML = "Digite uma cidade.";
    return;
  }

  result.innerHTML = "Consultando clima...";

  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;

  try {

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Cidade não encontrada");
    }

    const data = await response.json();

    const temperatura = data.main.temp;
    const descricao = data.weather[0].description;
    const umidade = data.main.humidity;
    const cidade = data.name;

    result.innerHTML = `
      <h2>${cidade}</h2>
      <p>Temperatura: ${temperatura}°C</p>
      <p>Clima: ${descricao}</p>
      <p>Umidade: ${umidade}%</p>
    `;

  } catch (error) {

    result.innerHTML = "Erro ao buscar dados da cidade.";

  }

}

button.addEventListener("click", getWeather);

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    getWeather();
  }
});