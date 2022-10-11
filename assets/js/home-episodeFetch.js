var episodesJSON;
var currentDate = getCurrentDate();
var debugLine = document.getElementById('debugLine');
debugLine.innerHTML = "init";
console.log(debugLine);

async function modifyPage() {
    resp = await fetch("/episodes/episodes.json");
    episodesJSON = await resp.json();
    debugLine.innerHTML = debugLine.innerHTML + " async"

    var episodeLineup = "";
    for (let i = 0; i < episodesJSON.episodes.length; i++) {
        const element = episodesJSON.episodes[i];

        debugLine.innerHTML = debugLine.innerHTML + " for"

        // Start of Old Method
        //  if (!episodesJSON.episodes[i].clickable) {
        //         var curButtonStatus = "unclickable";
        //         var curButtonText = "Coming Soon";
        //  } else {
        //     var curButtonStatus = "";
        //     var curButtonText = "Listen Now";
        //  }

        //  var episodeLineup = episodeLineup + `
        //         <div class="episode">
        //             <div class="bg" style="background-image: url(${element.background})"></div>
        //             <div class="body">            
        //                 <h2>${element.name}</h2>
        //                 <i>${element.date} • ${element.tag}</i>
        //                 <p>${element.description}</p>
        //                 <a href="${element.clickLink}" class="button ${curButtonStatus}">${curButtonText}</a>
        //             </div>
        //         </div>`
        // End of Old Method

        // Start of New Method
        debugLine.innerHTML = debugLine.innerHTML + " <i>releaseDateString:</i> " + (getReleaseDate(element.date))
        if (getReleaseDate(element.date) == "past" || getReleaseDate(element.date) == "present") {
            var curButtonStatus = "";
            var curButtonText = "Listen Now";

            debugLine.innerHTML = debugLine.innerHTML + " Existing";

            var episodeLineup = episodeLineup + `
            <div class="episode">
                <div class="bg" style="background-image: url(${element.background})"></div>
                <div class="body">            
                    <h2>${element.name}</h2>
                    <i>${element.date} • ${element.tag}</i>
                    <p>${element.description}</p>
                    <a href="${element.clickLink}" class="button ${curButtonStatus}">${curButtonText}</a>
                </div>
            </div>
        `
        }

        if (getReleaseDate(element.date) == "future") {
            if (getReleaseDate(episodesJSON.episodes[i + 1].date) != "future") {
                var curButtonStatus = "unclickable";
                var curButtonText = "Coming Soon";
                
                debugLine.innerHTML = debugLine.innerHTML + " Future";
    
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
            }
        }
        // End of New Method
    }
    document.getElementById("episode-gallery").innerHTML = episodeLineup;
}

function getReleaseDate(date) {
    if (date.charAt(1) == "-") {
        var MM = date.charAt(0);
    } else {
        var MM = new String(date.charAt(0)) + new String(date.charAt(1));
    }
    if (MM.length == 1) {
        if (date.charAt(3) == "-") {
            var DD = new Number (date.charAt(2)) + 1;
        } else {
            var DD = new Number(new String(date.charAt(2)) + new String(date.charAt(3))) + 1;
        }
    } else {
        if (date.charAt(4) == "-") {
            var DD = new Number(date.charAt(3)) + 1;
        } else {
            var DD = new Number(new String(date.charAt(3)) + new String(date.charAt(4))) + 1;
        }
    }
    if (MM.length == 1) {
        MM = "0" + MM;
    }
    if (new String(DD).length == 1) {
        DD = "0" + DD;
    }
    console.log(DD);
    var YYYY = new String(date.charAt(date.length - 4)) + new String(date.charAt(date.length - 3)) + new String(date.charAt(date.length - 2)) + new String(date.charAt(date.length - 1));
    
    var recompiledDate = YYYY + "-" + MM + "-" + DD;
    var dateNew = new Date(recompiledDate);
    var currentDateAsDate = new Date(currentDate);

    debugLine.innerHTML = debugLine.innerHTML + " GRD <i>RecompDate:</i> " + recompiledDate + " <i>NewDate:</i> " + dateNew + " <i><b>CurrentDate:</i></b> " + currentDate + " <i>CurrentDateAD:</i> " + currentDateAsDate;
    console.log(dateNew + " " + currentDateAsDate);
    debugLine.innerHTML = debugLine.innerHTML + " " + (dateNew.getTime()) + " " + (new String(currentDateAsDate.getTime()));

    if (dateNew < currentDateAsDate) {
        debugLine.innerHTML = debugLine.innerHTML + " <b>*</b> ";
        console.log("past");
        return "past";
    }
    if (+dateNew == +currentDateAsDate) {
        debugLine.innerHTML = debugLine.innerHTML + " <b>*</b> ";
        console.log("present");
        return "present";
    }
    if (dateNew > currentDateAsDate) {
        debugLine.innerHTML = debugLine.innerHTML + " <b>*</b> ";
        console.log("future");
        return "future";
    }
}

function getCurrentDate() {
    var YYYY;
    var MM;
    var DD;

    var YYYY = new Date().getFullYear();
    if (new String(new Date().getMonth() + 1).length == 1) {
        MM = "0" + new String(new Date().getMonth() + 1);
    } else {
        MM = new Date().getMonth() + 1;
    }
    if (new String(new Date().getDate() + 1).length == 1) {
        DD = "0" + new String(new Date().getDate() + 1);
    } else {
        DD = new Date().getDate() + 1;
    }
    if (new Number(DD) >= 32) {
        DD = 31;
    }

    return YYYY + "-" + MM + "-" + DD;
}

debugLine.innerHTML = debugLine.innerHTML + console;

modifyPage();