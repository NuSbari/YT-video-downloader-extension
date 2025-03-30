const urlEl = document.getElementById("url-el");
let youtubeURL = "";
let videoID = "";
const API_KEY = "AIzaSyCgv2CBzqfZXS7ZJ69Q6uV1_Yrx-Ufb4xU";

function getData(videoID){
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoID}&key=${API_KEY}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Il link inserito non è valido o il video non esiste");
        }
        return response.json(); // Convertiamo la risposta in formato JSON
    })
    .then(data => {
        // Qui i dati sono disponibili, possiamo estrarli
        const videoThumbnail = data.items[0].snippet.thumbnails.high.url;
        const videoTitle = data.items[0].snippet.title; // Titolo del video

        // Impostiamo la thumbnail nell'elemento HTML
        const thumbnailEl = document.getElementById("thumbnail-el");
        thumbnailEl.src = videoThumbnail;

        // Facoltativo: puoi anche mostrare il titolo, se necessario
        const titleEl = document.getElementById("title-el");
        titleEl.textContent = videoTitle; // Inserisci il titolo in un elemento con id "title-el"
    })
    .catch(error => {
        console.log(error); // In caso di errore, lo stampiamo nella console
    });
}


urlEl.addEventListener("input", function(){
    youtubeURL = urlEl.value
    videoID = videoIdFinder(youtubeURL)
    getData(videoID)
})

function videoIdFinder(youtubeURL) {
    try {
        let url = new URL(youtubeURL);

        // Se è un URL di YouTube, estrai l'ID in base al formato
        if (url.hostname.includes("youtube.com")) {
            if (url.pathname.startsWith("/watch")) {
                return url.searchParams.get("v"); // Per link standard
            } else if (url.pathname.startsWith("/shorts/")) {
                return url.pathname.split("/")[2]; // Per shorts
            }
        } else if (url.hostname === "youtu.be") {
            return url.pathname.substring(1); // Per link abbreviati
        }
    } catch (e) {
        return null; // Se l'URL non è valido
    }
    return null; // Se non è un link YouTube valido
}
