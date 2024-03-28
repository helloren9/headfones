let song;
let playSong;

const clientId = "dca3fb1d39ee4913898b23bd38302bc8";
const clientSecret = "44e975e791d040428a3a19225a12560a";

const _getToken = async () => {
    const result = await fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token
}

/**
* @param img_index
* @param item_index
*/

async function clickedEvent(img_index, item_index) {
    let track = document.getElementsByTagName('img')[img_index].attributes[1].value;

    let token = await _getToken();

    let headers = new Headers([
        ['Content-Type', 'application/json'],
        ['Accept', 'application/json'],
        ['Authorization', `Bearer ${token}`]
    ]);

    let request = new Request(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=15`, {
        method: 'GET',
        headers: headers
    });

    let result = await fetch(request)

    let response = await result.json();

    console.log(response);
    let song = response.tracks.items[item_index].preview_url

    if (playSong) {
        stopSnippet();
    }
    songSnippet(song)
}

/**
*
* @param id
* @param event
*/

function getSong(id, event) {
    switch(id) {
        case 'fig1': {
            event.stopPropagation();
            clickedEvent(0, 0)
            break;
        }
    }
}

/**
* @param url
*
* url = Song Preview_url
*
*/

function songSnippet(url) {
    playSong = new Audio(url);
    return playSong.play()
}

function stopSnippet() {
    return playSong.pause();
}


