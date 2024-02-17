const apiKey = 'TÄHÄN_API_AVAIN';

document.querySelector('button').addEventListener('click',() =>{
    //luetaan annetut valinnat:
    const yearU = document.querySelector('input[name="year"]:checked').value;
    const langU = document.querySelector('input[name="kieli"]:checked').value;
    const genreU = document.querySelector('input[name="genre"]:checked').value; 
    const pointsU = document.querySelector('input[name="points"]:checked').value;
    //tehdään vielä muuttujat valintojen käsittelylle
    let releaseYearStart = 1970;
    let releaseYearEnd = 2020;
    let spokenLanguage = '';  // fi tai tyhjä
    let genre = '35';  // Genre ID Komedia 35, Kauhu: 27, Draama: 18
    let minRating = 4;
    let maxRating = 7;

    //kielen käsittely
    if (langU=='kotimainen') {
        spokenLanguage="fi"
    }else{
        spokenLanguage=''
    }

    switch (yearU) { //vuosikymmenen aloitus ja lopetusvuodet
        case '1960':
            releaseYearStart = 1960;
            releaseYearEnd = 1969;        
            break;
        case '1970':
            releaseYearStart = 1970;
            releaseYearEnd = 1979;        
            break;
        case '1980':
            releaseYearStart = 1980;
            releaseYearEnd = 1989;        
            break;
        case '1990':
            releaseYearStart = 1990;
            releaseYearEnd = 1999;        
            break;
        case '2000':
            releaseYearStart = 2000;
            releaseYearEnd = 2009;        
            break;
        case '2010':
            releaseYearStart = 2010;
            releaseYearEnd = 2019;        
            break;
        case '2020':
            releaseYearStart = 2020;
            releaseYearEnd = 2024;        
            break;
                                                                    
        default:
            releaseYearStart = 1950;
            releaseYearEnd = 2024;        
            break;
    }
    //arvioinnit:
    switch (pointsU) {
        case 'Huono':
            minRating=0
            maxRating=3
            break;
        case 'OK':
            minRating=4
            maxRating=7
            break;
        case 'Hyvä':
            minRating=8
            maxRating=10
            break;
                
        default:
            minRating=0
            maxRating=10
            break;
    }

    //haetaan data annettujen kriteereiden perusteella
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fi-FI&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${releaseYearStart}-01-01&primary_release_date.lte=${releaseYearEnd}-12-31&with_original_language=${spokenLanguage}&with_genres=${genre}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}`)
    .then(response => response.json())
    .then(data => {

        // Varmista, että saadut tulokset eivät ole tyhjiä
        if (data.results.length > 0) {
            //arvotaan elokuva saadusta max 20 elokuvasta
            let random_number = Math.floor(Math.random() * data.results.length);
            const selectedMovie = data.results[random_number];

            document.querySelector('#title').innerHTML = selectedMovie.title;

            // Tarkista, onko elokuvalla kuvaa
            if (selectedMovie.backdrop_path) {
                document.querySelector('#kuva').src = `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`;
            } else {
                // Käytä oletuskuvaa, jos elokuvalla ei ole kuvaa
                document.querySelector('#kuva').src = 'img/No-Image-Placeholder.svg.png';
            }

            document.querySelector('#linkki').innerHTML = `<a href="https://www.themoviedb.org/movie/${selectedMovie.id}" target="_blank">TheMovieDatabase</a>`;
            } else {
            console.log('Ei tuloksia valituilla suodattimilla.');
            }
        })
        .catch(error => console.error('Virhe:', error));
    })