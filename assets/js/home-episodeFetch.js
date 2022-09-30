var episodesJSON;
var currentDate = new Date().getMonth() + 1 + "-" + new Date().getDate() + "-" + new Date().getFullYear();

async function modifyPage() {
    resp = await fetch("/episodes/episodes.json");
    episodesJSON = await resp.json();

    var episodeLineup = "";
    for (let i = 0; i < episodesJSON.episodes.length; i++) {
        const element = episodesJSON.episodes[i];
        
        var curEpName = episodesJSON.episodes[i].name;
        var curEpDate = episodesJSON.episodes[i].date;
        var curEpBG = episodesJSON.episodes[i].background;
        var curEpTag = episodesJSON.episodes[i].tag;
        var curEpLink = episodesJSON.episodes[i].clickLink;
        var curEpDesc = episodesJSON.episodes[i].description;
        var curEpColor = episodesJSON.episodes[i].txtColor;

        if (!episodesJSON.episodes[i].clickable) {
            var curButtonStatus = "unclickable";
            var curButtonText = "Coming Soon";
        } else {
            var curButtonStatus = "";
            var curButtonText = "Listen Now";
        }

        var episodeLineup = episodeLineup + `
            <div class="episode">
                <div class="bg" style="background-image: url(${curEpBG})"></div>
                <div class="body">            
                    <h2 style="color: ${curEpColor}">${curEpName}</h2>
                    <i style="color: ${curEpColor}">${curEpDate} • ${curEpTag}</i>
                    <p style="color: ${curEpColor}">${curEpDesc}</p>
                    <a href="${curEpLink}" class="button ${curButtonStatus}" target="_blank">${curButtonText}</a>
                </div>
            </div>
        `
    }
    document.getElementById("episode-gallery").innerHTML = episodeLineup;
}

modifyPage();