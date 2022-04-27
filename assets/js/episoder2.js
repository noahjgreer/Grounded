var episodeJSONData;
var testFunction;


async function getEpisodes() {
    episodeJSONResponse = await fetch('../../episodes/index.json');
    episodeJSONData = await episodeJSONResponse.json();

    // Date Calculator
    var currentDate = new Date().getMonth() + 1 + "-" + new Date().getDate() + "-" + new Date().getFullYear();
    var yesterdaysDate = new Date().getMonth() + 1 + "-" + (new Date().getDate() - 1) + "-" + new Date().getFullYear();

    var timeDistanceCalc = function() {
        if (currentDate == episodeJSONData.episodes[episodeIncrementFunct].date) {
            return "Today";
        } else if (yesterdaysDate == episodeJSONData.episodes[episodeIncrementFunct].date) {
            return "Yesterday";
        } else {
            return episodeJSONData.episodes[episodeIncrementFunct].date;
        }
        // console.log((currentDate - episodeJSONData.episodes[episodeIncrementFunct].date))
        // switch (currentDate - episodeJSONData.episodes[episodeIncrementFunct].date) {
        //     case 0:
        //         return "Today";
        //         break;
        //     case 1:
        //         return "Yesterday";
        //         break;
        //     default:
        //         return episodeJSONData.episodes[episodeIncrementFunct].date;
        // }
    }

    // Episode Displayer
    var episodeHolder = "";
    var cardDisplayCount = 3;

    var visitTest = () => {
        if (episodeJSONData.episodes[episodeIncrementFunct].visitable == false) {
            return `<a class="button alt unclickable">Coming Soon</a>`
        } else {
            return `<a class="button alt" href="${episodeJSONData.episodes[episodeIncrementFunct].viewLink}">View</a>`
        }
    }

    console.log(episodeJSONData.episodes.length)

    for (var episodeIncrementFunct = 0; episodeIncrementFunct < episodeJSONData.episodes.length; episodeIncrementFunct++) {
        var episodeHolder = episodeHolder + `
                <div class="cast" style="background-image: url(${episodeJSONData.episodes[episodeIncrementFunct].background})">
                    <div>
                        <h2>${episodeJSONData.episodes[episodeIncrementFunct].title}</h2>
                        <h3>` + timeDistanceCalc() + `</h3>
                    </div>` + visitTest() + `
                </div>`
    }

    document.getElementById('episodes main').innerHTML = episodeHolder;


    // document.getElementById('first').style.backgroundImage = `url(${episodeJSONData.episodes[0].background})`;
    // document.getElementById('first').innerHTML = `
    //     <div>
    //         <h2>${episodeJSONData.episodes[0].title}</h2>
    //         <h3>${timeDistance}</h3>
    //     </div>
    //     <a class="button alt">View</a>
    // `
}

getEpisodes();