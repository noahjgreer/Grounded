var episodesJSON;
var currentDate = (new Date().getMonth() + 1) + "-" + new Date().getDate() + "-" + new Date().getFullYear();

async function modifyPage() {
    resp = await fetch("/episodes/episodes.json");
    episodesJSON = await resp.json();

    var episodeLineup = "";
    for (let i = 0; i < episodesJSON.episodes.length; i++) {
        const element = episodesJSON.episodes[i];

         if (!episodesJSON.episodes[i].clickable) {
                var curButtonStatus = "unclickable";
                var curButtonText = "Coming Soon";
         } else {
            var curButtonStatus = "";
            var curButtonText = "Listen Now";
         }

         var episodeLineup = episodeLineup + `
                <div class="episode">
                    <div class="bg" style="background-image: url(${element.background})"></div>
                    <div class="body">            
                        <h2>${element.name}</h2>
                        <i>${element.date} • ${element.tag}</i>
                        <p>${element.description}</p>
                        <a href="${element.clickLink}" class="button ${curButtonStatus}">${curButtonText}</a>
                    </div>
                </div>`

        // if (getReleaseDate(element.date) == "past" || getReleaseDate(element.date) == "present") {
        //     var curButtonStatus = "";
        //     var curButtonText = "Listen Now";

        //     var episodeLineup = episodeLineup + `
        //     <div class="episode">
        //         <div class="bg" style="background-image: url(${element.background})"></div>
        //         <div class="body">            
        //             <h2>${element.name}</h2>
        //             <i>${element.date} • ${element.tag}</i>
        //             <p>${element.description}</p>
        //             <a href="${element.clickLink}" class="button ${curButtonStatus}">${curButtonText}</a>
        //         </div>
        //     </div>
        // `
        // }

        // if (getReleaseDate(element.date) == "future") {
        //     if (getReleaseDate(episodesJSON.episodes[i + 1].date) != "future") {
        //         var curButtonStatus = "unclickable";
        //         var curButtonText = "Coming Soon";
        //         var filledFutureEpisode = true;
    
        //         var episodeLineup = episodeLineup + `
        //         <div class="episode">
        //             <div class="bg" style="background-image: url(${element.background})"></div>
        //             <div class="body">            
        //                 <h2>${element.name}</h2>
        //                 <i>${element.date} • ${element.tag}</i>
        //                 <p>${element.description}</p>
        //                 <a href="${element.clickLink}" class="button ${curButtonStatus}">${curButtonText}</a>
        //             </div>
        //         </div>`
        //     }
        // }
    }
    document.getElementById("episode-gallery").innerHTML = episodeLineup;
}

function getReleaseDate(date) {
    // if (date.charAt(1) == "-") {
    //     var MM = date.charAt(0);
    // } else {
    //     var MM = new String(date.charAt(0)) + new String(date.charAt(1));
    // }
    // if (MM.length == 1) {
    //     if (date.charAt(3) == "-") {
    //         var DD = date.charAt(2);
    //     } else {
    //         var DD = new String(date.charAt(2)) + new String(date.charAt(3));
    //     }
    // } else {
    //     if (date.charAt(4) == "-") {
    //         var DD = date.charAt(3);
    //     } else {
    //         var DD = new String(date.charAt(3)) + new String(date.charAt(4));
    //     }
    // }
    // var YYYY = new String(date.charAt(date.length - 4)) + new String(date.charAt(date.length - 3)) + new String(date.charAt(date.length - 2)) + new String(date.charAt(date.length - 1));
    
    // var recompiledDate = DD + "-" + MM + "-" + YYYY;
    var dateNew = new Date(date);
    var currentDateAsDate = new Date(currentDate);

    if (dateNew < currentDateAsDate) {
        console.log("past");
        return "past";
    }
    if (+dateNew == +currentDateAsDate) {
        console.log("present");
        return "present";
    }
    if (dateNew > currentDateAsDate) {
        console.log("future");
        return "future";
    }
}

modifyPage();