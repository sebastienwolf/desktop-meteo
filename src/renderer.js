async function fetchWeatherData() {
  const lat = "43.296482";
  const lon = "5.36978";
  const apikey = "ce594e43db947220ca66ff854126f346";

  const apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=metric" +
    "&lang=fr" +
    "&appid=" +
    apikey;
  console.log(apiUrl);

  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const dataMeteo = await response.json();
      return dataMeteo; // Retournez les données météorologiques
    } else {
      console.error("La requête n'a pas réussi.");
    }
  } catch (error) {
    console.error("Erreur de la requête :", error);
  }
}

async function useWeatherData() {
  // Appelez la fonction pour récupérer les données météorologiques
  const weatherData = await fetchWeatherData();

  const data = [];

  weatherData.list.forEach((element) => {
    const info = [];
    info.push(element.dt_txt);
    info.push(element.main.temp);
    info.push(element.weather[0].description);
    data.push(info);
  });
  console.log(data);

  document.getElementById("city-name").textContent = weatherData.city.name;

  // Créez des cartes pour afficher les données
  const weatherCards = document.getElementById("weather-cards");

  data.forEach((info) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const date = document.createElement("p");
    date.textContent = `Date: ${info[0]}`;

    const temperature = document.createElement("p");
    temperature.textContent = `Temperature: ${info[1]}°C`;

    const description = document.createElement("p");
    description.textContent = `Description: ${info[2]}`;

    card.appendChild(date);
    card.appendChild(temperature);
    card.appendChild(description);

    weatherCards.appendChild(card);
  });

  chartJs(data);
}

function chartJs(data) {
  // Utilisez les données météorologiques ici
  const temperatureData = data.map((data) => data[1]); // Exemple de données de température
  const labels = data.map((data) => data[0]); // Exemple d'étiquettes pour l'axe des X

  // Obtenez une référence à l'élément canvas
  const ctx = document.getElementById("temperature-chart").getContext("2d");

  // Créez un objet de configuration pour le graphique
  const config = {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Température en °C",
          data: temperatureData,
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          suggestedMin: 0,
          suggestedMax: 30, // Ajustez cette valeur en fonction de vos données
        },
      },
    },
  };

  // Créez le graphique en utilisant la configuration
  const myChart = new Chart(ctx, config);
}

useWeatherData(); // Déclenche le processus pour récupérer les données météorologiques

const information = document.getElementById("info");
information.innerText = `Cette application utilise Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), et Electron (v${versions.electron()})`;

const func = async () => {
  const response = await window.versions.ping();
  console.log(response); // Affichera 'pong'
};

func();

const cpu = async () => {
  const response = await window.versions.cpu();
  console.log(`le CPU est à ${response} de charge`);
  document.getElementById("temp-process").textContent =
    "le CPU est à " + response + " de charge";
};

cpu();
