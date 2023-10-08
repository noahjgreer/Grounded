var episodesJSON;
var currentDate = getCurrentDate();
var debugLine = document.getElementById('debugLine');
debugLine.innerHTML = "init";


var searchElements = document.getElementById("searchElements");
var searchBar = document.getElementById("search");
var episodeGallery = document.getElementById("episode-gallery");
// console.log(debugLine);

async function modifyPage(conditions) {
    if (!conditions) {
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
    
                // Missing Background
                var curBackground;
    
                if (element.background == "") {
                    curBackground = "/assets/images/episodes/MissingImage.png";
                } else {
                    curBackground = element.background;
                }
    
                debugLine.innerHTML = debugLine.innerHTML + " Existing";
    
                episodeLineup += `
                <div class="episode">
                    <div class="bg" style="background-image: url(${curBackground})"></div>
                    <div class="body">            
                        <h2>${element.name}</h2>
                        <i>${element.date} • ${element.tag}</i>
                        <p>${element.description}</p>
                        <div class="interactions">
                            <a href="${element.clickLink}" class="button ${curButtonStatus}">${curButtonText}</a>
                            ${isTranscribed(element.transcribed)}
                        </div>
                    </div>
                </div>
            `
            }
    
            if (getReleaseDate(element.date) == "future") {
                if (getReleaseDate(episodesJSON.episodes[i + 1].date) != "future") {
                    var curButtonStatus = "unclickable";
                    var curButtonText = "Coming Soon";
                    
                    debugLine.innerHTML = debugLine.innerHTML + " Future";
                    
                    // Missing Background
                    var curBackground;
    
                    if (element.background == "") {
                        curBackground = "/assets/images/episodes/MissingImage.png";
                    } else {
                        curBackground = element.background;
                    }
    
    
                    episodeLineup += `
                    <div class="episode">
                        <div class="bg" style="background-image: url(${curBackground})"></div>
                        <div class="body">            
                            <h2>${element.name}</h2>
                            <i>${element.date} • ${element.tag}</i>
                            <p>${element.description}</p>
                            <div class="interactions">
                                <a href="${element.clickLink}" class="button ${curButtonStatus}">${curButtonText}</a>
                                ${isTranscribed(element.transcribed)}
                            </div>
                        </div>
                    </div>`
                }
            }
            // End of New Method
        }
        document.getElementById("episode-gallery").innerHTML = episodeLineup;
    } else {
        resp = await fetch("/episodes/episodes.json");
        episodesJSON = await resp.json();
        var episodeLineup = "";
        
        if (conditions.length == 0) {
            episodeLineup = `
            <div class="alert">
                <div class="bg" style="background-image: url(/assets/images/episodes/MissingImage.png)"></div>
                <div class="body">            
                    <h2>No episodes found</h2>
                    <i>No episodes match your search query.</i>
                    <p>Try searching for something else, modifying your request, or simplifying your search.</p>
                </div>
            </div>
            `
        }

        conditions.forEach(selector => {
            i = selector.index;
            const element = episodesJSON.episodes[i];
    
            // Start of New Method
            if (getReleaseDate(element.date) == "past" || getReleaseDate(element.date) == "present") {
                var curButtonStatus = "";
                var curButtonText = "Listen Now";
    
                // Missing Background
                var curBackground;
    
                if (element.background == "") {
                    curBackground = "/assets/images/episodes/MissingImage.png";
                } else {
                    curBackground = element.background;
                }
        
                episodeLineup += `
                <div class="episode">
                    <div class="bg" style="background-image: url(${curBackground})"></div>
                    <div class="body">            
                        <h2>${element.name}</h2>
                        <i>${element.date} • ${element.tag}</i>
                        <p>${element.description}</p>
                        <div class="interactions">
                            <a href="${element.clickLink}" class="button ${curButtonStatus}">${curButtonText}</a>
                            ${isTranscribed(element.transcribed)}
                        </div>
                    </div>
                </div>
            `
            }

            if (getReleaseDate(element.date) == "future") {
                if (getReleaseDate(episodesJSON.episodes[i + 1].date) != "future") {
                    var curButtonStatus = "unclickable";
                    var curButtonText = "Coming Soon";
                    
                    debugLine.innerHTML = debugLine.innerHTML + " Future";
                    
                    // Missing Background
                    var curBackground;
    
                    if (element.background == "") {
                        curBackground = "/assets/images/episodes/MissingImage.png";
                    } else {
                        curBackground = element.background;
                    }
    
    
                    episodeLineup += `
                    <div class="episode">
                        <div class="bg" style="background-image: url(${curBackground})"></div>
                        <div class="body">            
                            <h2>${element.name}</h2>
                            <i>${element.date} • ${element.tag}</i>
                            <p>${element.description}</p>
                            <div class="interactions">
                                <a href="${element.clickLink}" class="button ${curButtonStatus}">${curButtonText}</a>
                                ${isTranscribed(element.transcribed)}
                            </div>
                        </div>
                    </div>`
                }
            }
        });

        document.getElementById("episode-gallery").innerHTML = episodeLineup;
    }
}

function isTranscribed(transBool) {
    if (transBool) {
        return `<img src="/assets/images/icons/document.svg" class="indicator" alt="This episode contains a readable article/transcription.">`
    } else {
        return ""
    }
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
    // console.log(DD);
    var YYYY = new String(date.charAt(date.length - 4)) + new String(date.charAt(date.length - 3)) + new String(date.charAt(date.length - 2)) + new String(date.charAt(date.length - 1));
    
    var recompiledDate = YYYY + "-" + MM + "-" + DD;
    var dateNew = new Date(recompiledDate);
    var currentDateAsDate = new Date(currentDate);

    debugLine.innerHTML = debugLine.innerHTML + " GRD <i>RecompDate:</i> " + recompiledDate + " <i>NewDate:</i> " + dateNew + " <i><b>CurrentDate:</i></b> " + currentDate + " <i>CurrentDateAD:</i> " + currentDateAsDate;
    // console.log(dateNew + " " + currentDateAsDate);
    debugLine.innerHTML = debugLine.innerHTML + " " + (dateNew.getTime()) + " " + (new String(currentDateAsDate.getTime()));

    if (dateNew < currentDateAsDate) {
        debugLine.innerHTML = debugLine.innerHTML + " <b>*</b> ";
        // console.log("past");
        return "past";
    }
    if (+dateNew == +currentDateAsDate) {
        debugLine.innerHTML = debugLine.innerHTML + " <b>*</b> ";
        // console.log("present");
        return "present";
    }
    if (dateNew > currentDateAsDate) {
        debugLine.innerHTML = debugLine.innerHTML + " <b>*</b> ";
        // console.log("future");
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

// Search Bar Size
updateSearchBarSize();
window.addEventListener("load", updateSearchBarSize);
window.addEventListener("resize", updateSearchBarSize);
searchBar.addEventListener("keyup", function (e) {
    if (e.key === "Enter" || e.keyCode === 13) {
        submitSearch();
    }
});

function updateSearchBarSize() {
    let firstElement = true;
    let firstRowElements;
    let firstRowY; 
    for (let i = 0; i < episodeGallery.children.length; i++) {
        const element = episodeGallery.children[i];
        if (firstElement) {
            firstRowY = element.getBoundingClientRect().y;
            firstRowElements = 1;
            firstElement = false;
        } else {
            if (element.getBoundingClientRect().y != firstRowY) {
                break;
            } else {
                firstRowElements++;
            }
        }    
    }
    let searchBarWidth = episodeGallery.children[firstRowElements - 1].getBoundingClientRect().right - episodeGallery.children[0].getBoundingClientRect().left;
    searchElements.style.width = searchBarWidth - (2 * window.getComputedStyle(searchElements).paddingInline.slice(0, -2)) + "px";
}

// Search Bar Submit
function submitSearch() {
    let query = searchBar.value;
    if (query || params.search_query) {
        query = query.replaceAll(' ', '+');
        window.location.href = "/?search_query=" + query;
    }
}

// Search Bar Submission Handling
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

if (params.search_query) {
    searchBar.value = params.search_query.replaceAll('+', ' ');
    searchEpisodes(params.search_query);
} else {
    modifyPage();
}

async function searchEpisodes(query) {
    await fetch("/episodes/episodes.json")
    .then(response => response.json())
    .then(result => {
        resultHeatmap = [];
        episodesJSON = result;
        for (let i = 0; i < result.episodes.length; i++) {
            const element = result.episodes[i];
            let heat = 0;
            query.split(' ').forEach(word => {
                if (element.name.toLowerCase().includes(word.toLowerCase())) {
                    heat++;
                }
                if (element.description.toLowerCase().includes(word.toLowerCase())) {
                    heat++;
                }
                if (element.tag.toLowerCase().includes(word.toLowerCase())) {
                    heat++;
                }
                if (element.tags.toLowerCase().includes(word.toLowerCase())) {
                    heat++;
                }
            });
            resultHeatmap[i] = JSON.stringify({heat: heat, index: i});
        }
        for (let i = 0; i < resultHeatmap.length; i++) {
            const element = resultHeatmap[i];
            elementParsed = JSON.parse(element);
            resultHeatmap[i] = elementParsed;
            if (elementParsed.heat == 0) {
                resultHeatmap.splice(i, 1);
                i--;
            }
        }
        resultHeatmap.sort((a, b) => (a.heat < b.heat) ? 1 : -1);
        modifyPage(resultHeatmap);
    })
}