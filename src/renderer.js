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
  // console.log(apiUrl);

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

function createArrayData(type, object) {
  const data = [];

  if (type == "one") {
    const dateActuelle = new Date();
    const jour = dateActuelle.getDate().toString().padStart(2, "0");
    const mois = (dateActuelle.getMonth() + 1).toString().padStart(2, "0");
    const annee = dateActuelle.getFullYear();
    const dateEnString = `${jour}-${mois}-${annee}`;

    data.push(dateEnString);
    data.push(object.main.temp);
    data.push(object.weather[0].description);
  } else {
    object.list.forEach((element) => {
      const info = [];
      info.push(element.dt_txt);
      info.push(element.main.temp);
      info.push(element.weather[0].description);
      data.push(info);
    });
  }
  return data;
}

async function fetchOneTempData() {
  const lat = "43.296482";
  const lon = "5.36978";
  const apikey = "ce594e43db947220ca66ff854126f346";

  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=metric" +
    "&lang=fr" +
    "&appid=" +
    apikey;

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
  const temp5Days = await fetchWeatherData();
  const temp = await fetchOneTempData();

  const dataOne = createArrayData("one", temp);
  const dataFiveDays = createArrayData("all", temp5Days);

  document.getElementById("city-name").textContent = temp5Days.city.name;

  // Créez des cartes pour afficher les données

  createCards("one", dataOne);
  // createCards("all", dataFiveDays);

  chartJs(dataFiveDays);
}

function createCards(type, data) {
  const weatherCards = document.getElementById("weather-cards");
  const primaryWeatherCards = document.getElementById("primary-weather-cards");

  if (type == "one") {
    const card = createDomForCards(data);

    primaryWeatherCards.appendChild(card);
  } else {
    data.forEach((info) => {
      const card = createDomForCards(info);

      weatherCards.appendChild(card);
    });
  }
}

function createDomForCards(data) {
  const card = document.createElement("div");
  card.classList.add("card");

  const date = document.createElement("p");
  date.textContent = `Date: ${data[0]}`;

  const temperature = document.createElement("p");
  temperature.textContent = `Temperature: ${data[1]}°C`;

  const description = document.createElement("p");
  description.textContent = `Description: ${data[2]}`;

  card.appendChild(date);
  card.appendChild(temperature);
  card.appendChild(description);

  return card;
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
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,

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

const cpu = async () => {
  const response = await window.versions.cpu();
  // console.log(`le CPU est à ${response} de charge`);
  document.getElementById("temp-process").textContent =
    "le CPU est à " + response + " de charge";
  return response;
};

cpu();

const tempCpu = async () => {
  const response = await window.versions.tempCpu();
  // console.log(`le CPU est à ${response} de charge`);
  // document.getElementById("temp-process").textContent =
  //   "le CPU est à " + response + " de charge";
  // console.log(response);
  return response;
};

tempCpu();

setInterval(() => {
  const b = cpu();
}, 10000);
