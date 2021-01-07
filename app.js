const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
    "Fog": "wi wi-day-fog",
    "Smoke": "wi wi-day-cloudy-high",
    "Mist": "wi wi-day-fog",
}

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

async function main(withIp = true) {
    let ville;
    if (withIp) {
        //1. Choper l'adresse IP du pc qui ouvre la page : https://api.ipify.org?format=json
        const ip = await fetch('https://api.ipify.org?format=json')
            .then(resultat => resultat.json())
            .then(json => json.ip);

        //2.Chopper La ville grâce à l'adresse IP : 'https://freegeoip.app/json/'+ ipDuMec
        ville = await fetch('https://freegeoip.app/json/' + ip)
            .then(resultat => resultat.json())
            .then(json => json.city);
  
    }else{
        ville = document.querySelector('#ville').textContent;
    }
    //3. Choper les infos météo grâce à la ville : http://api.openweathermap.org/data/2.5/weather?q=VilleDuMec&appid=09a596cd485babb2d5d77c644c1c2e81&Lang=fr&units=metric
        const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=09a596cd485babb2d5d77c644c1c2e81&lang=fr&units=metric`)
            .then(resultat => resultat.json())
            .then(json => json);
        console.log(meteo);
  //4. Appeler fonction viewWeatherInfos et Afficher les informations meteo sur la page
  viewWeatherInfos(meteo);


}

function viewWeatherInfos(data) {

    const name = data.name;
    const temperature = data.main.temp;
    const ressenti = data.main.feels_like;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;
    const humidite = data.main.humidity;
    const vent = data.wind.speed;

    //Envoyer de la vue
    document.querySelector('#ville').textContent = name;
    document.querySelector('#temperature').textContent = temperature;
    document.querySelector('#ressenti').textContent = Math.round(ressenti);
    document.querySelector('#conditions').textContent = capitalize(description);
    document.querySelector('#humidite').textContent = humidite;
    document.querySelector('#vent').textContent = vent;

    document.querySelector('i.wi').className = weatherIcons[conditions];
    //Se servir de l'objet weatherIcons et des classes pour afficher les images en fonction des icones
    document.body.className = conditions.toLowerCase();
}

const ville = document.querySelector('#ville');

ville.addEventListener('click', () => {
    ville.contentEditable = true;
});

ville.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        ville.contentEditable = false;
        main(false);
    }
})

main();