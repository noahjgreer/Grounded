// A script used for generating articles WITHOUT their transcriptions
var episodesJSON;
var pageData = `
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- 
        Replace these things with the information below!
        ***TITLE >>> The title of the page (e.g. Grounded - Episode 1 - Introduction (Part 1))
        ***DESCRIPTION >>> Description (e.g. Welcome to the grounded podcast today we will be interviewing pastor matt for the first time.)
        ***OG-IMAGE >>> The reference to the opengraph image locally. (e.g. /assets/images/episodes/opengraph.png)
        ***PAGE-LOCATION >>> Location of the exact page.. THIS PAGE. Not local. (e.g. https://groundedwithmatt.com/episodes/interview/introduction.html)
        ***Audio-Link >>> Audio Link URL
        ***Date >>> The Date, in Words.. (e.g. September 11th, 2001)
        ***Episode-ID >>> The Episode ID (e.g. Episode 1 - Part 2)
        ***Episode-Name >>> Title of the Episode (How Big is Big Bob?)
        ***YT-Link >>> Youtube Link
        ***PUB-DATE >>> Published Date, in a YYYY-MM-DD format.
        ***MOD-DATE >>> Modified Date, in a YYYY-MM-DD format.
    -->

    <!-- Developer Definitions -->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link type="text/css" rel="stylesheet" href="/assets/style.css">
    <!-- Search Engine Optimization -->
    <title>***TITLE</title>
    <meta name="description" content="***DESCRIPTION">
    <link rel="home" href="https://groundedwithmatt.com/">
    <link rel="canonical" href="***PAGE-LOCATION">
    <meta name="robots" content="index, follow" />
    <script type='application/ld+json'>
        {
            "@context": "http://schema.org/",
            "@type": "Article",
            "headline": "***TITLE",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "***PAGE-LOCATION"
            },
            "image": {
                "@type": "ImageObject",
                "url": "https://groundedwithmatt.com***OG-IMAGE",
                "height": 700,
                "width": 1000
            },
            "publisher": {
                "@type": "Organization",
                "name": "Grounded",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://groundedwithmatt.com/assets/images/favicons/favicon-32x32.png",
                    "height": 32,
                    "width": 32
                }
            },
            "datePublished": "***PUB-DATE",
            "dateModified": "***MOD-DATE",
            "author": {
                "@type": "Person",
                "name": "Noah Greer & Pastor Matt Round"
            },
            "description": "***DESCRIPTION"
        }
    </script>
    <!-- Icons -->
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicons/apple-touch-icon.png?v=2.1">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicons/favicon-32x32.png?v=2.1">
    <link rel="icon" type="image/png" sizes="194x194" href="/assets/images/favicons/favicon-194x194.png?v=2.1">
    <link rel="icon" type="image/png" sizes="192x192" href="/assets/images/favicons/android-chrome-192x192.png?v=2.1">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicons/favicon-16x16.png?v=2.1">
    <link rel="manifest" href="/assets/images/favicons/site.webmanifest?v=2.1">
    <link rel="mask-icon" href="/assets/images/favicons/safari-pinned-tab.svg?v=2.1" color="#DE3F28">
    <link rel="shortcut icon" href="/assets/images/favicons/favicon.ico?v=2.1">
    <meta name="apple-mobile-web-app-title" content="Grounded">
    <meta name="application-name" content="Grounded">
    <meta name="msapplication-TileColor" content="#b91d47">
    <meta name="msapplication-TileImage" content="/assets/images/favicons/mstile-144x144.png?v=2.1">
    <meta name="msapplication-config" content="/assets/images/favicons/browserconfig.xml?v=2.1">
    <meta name="theme-color" content="#ffffff">
    <!-- Open Graph -->
    <meta property="og:url" content="***PAGE-LOCATION">
    <meta property="og:type" content="website">
    <meta property="og:title" content="***TITLE">
    <meta property="og:image" content="***OG-IMAGE">
    <meta property="og:image:width" content="1000">
    <meta property="og:image:height" content="700">
    <meta property="og:description" content="***DESCRIPTION">
    <meta property="og:site_name" content="Grounded">
    <meta property="og:locale" content="en_US">
    <meta property="og:locale:alternate" content="en_US">
    <meta property="og:locale:alternate" content="es_US">
    <!-- Twitter Open Graph-->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@GroundedMatt">
    <meta name="twitter:url" content="***PAGE-LOCATION">
    <meta name="twitter:title" content="***TITLE">
    <meta name="twitter:description" content="***DESCRIPTION">
    <meta name="twitter:image" content="***OG-IMAGE">
</head>
    
<body>
    <nav>
    </nav>
    <header>
        <div class="credits">
            <div class="left">
                <div class="speakers">
                    <img src="/assets/images/icons/people/noah.png" alt="Noah J. Greer">
                    <img src="/assets/images/icons/people/pmatt.png" alt="Pastor Matt Round">
                </div>
                <div class="details">
                    <div class="names">
                        <p>Noah Greer & Pastor Matt Round</p>
                    </div>
                    <div class="info">
                        <p id="date">***Date</p>
                        <p id="episode">***Episode-ID</p>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="locations">
                    <a href="***YT-Link" target="_blank">
                        <img src="/assets/images/icons/youtube.svg" alt="Listen to this Episode on Youtube" class="social">
                    </a>
                    <a href="https://open.spotify.com/show/2AGB5qVXBus9Jwv0cMc3vZ?si=e86d946712b54d03" target="_blank">
                        <img src="/assets/images/icons/spotify.svg" alt="Listen to this Episode on Spotify" class="social">
                    </a>
                    <a href="https://podcasts.apple.com/us/podcast/grounded/id1647718821" target="_blank">
                        <img src="/assets/images/icons/apple.svg" alt="Listen to this Episode on Apple Podcasts" class="social">
                    </a>
                </div>
            </div>
        </div>        
        <div class="audioplayer">
            <audio class="audio" src="***Audio-Link"></audio>
            <a class="play moving">
                <img src="/assets/images/icons/Play2.svg" alt="Play/Pause">
            </a>
            <a class="play static">
                <img src="/assets/images/icons/Play2.svg" alt="Play/Pause">
            </a>
            <div class="mid">
                <div class="scrub">
                    <div class="scrub-progress"></div>
                </div>
            </div>
            <p class="timestamp">--:--/--:--</p>
        </div>
    </header>
    <article>
        <h1>***Episode-Name</h1>
        <h2>Transcription in Progress:</h2>
        <p>We're in the process of making a transcript for this page. In the meantime, you can listen to it audibly by clicking or tapping the play button above. We appreciate your patience!</p>
    </article>
    <footer>
    </footer>
</body>
<script src="/assets/js/nav-footer-fetch.js"></script>
<script src="/assets/js/player.js"></script>
<script src="/assets/js/pageGen.js"></script>
</html>
`

fetch("/episodes/episodes.json")
    .then(response => response.json())
    .then(result => {
        episodesJSON = result;
        console.log('JSON has been fetched and is ready for commencement.');
    }).catch(reason => {
        console.error(reason);
    })

function pageGen(inputID) {
    var documentInfo = String(pageData);
    var inputID = (episodesJSON.episodes.length - 1) - inputID;
    let indexPos = episodesJSON.episodes[inputID];

    console.log(indexPos);

    // Find the Index of the episode, fetching it's page information.
    // for (let pos = 0; pos < episodesJSON.episodes.length; pos++) {
    //     const element = episodesJSON.episodes[pos];

    //     if (element == inputID) {
    //         console.log(element + " " + JSON.stringify(episodesJSON.episodes[pos]));
    //         indexPos = episodesJSON.episodes[pos];
    //     }
    // }

    // Modify the document
    documentInfo = documentInfo.replaceAll('***TITLE', String(indexPos.title));
    documentInfo = documentInfo.replaceAll('***DESCRIPTION', String(indexPos.description));
    documentInfo = documentInfo.replaceAll('***OG-IMAGE', String(indexPos.opengraph));
    documentInfo = documentInfo.replaceAll('***PAGE-LOCATION', String(indexPos.pageLocation));
    documentInfo = documentInfo.replaceAll('***Audio-Link', String(indexPos.audioLink));
    documentInfo = documentInfo.replaceAll('***Date', String(indexPos.fullDate));
    documentInfo = documentInfo.replaceAll('***Episode-ID', String(indexPos.episodeId));
    documentInfo = documentInfo.replaceAll('***Episode-Name', String(indexPos.name));
    documentInfo = documentInfo.replaceAll('***YT-Link', String(indexPos.ytLink));
    documentInfo = documentInfo.replaceAll('***PUB-DATE', String(indexPos.pubDate));
    documentInfo = documentInfo.replaceAll('***MOD-DATE', String(indexPos.modDate));    

    // Update the document
    document.documentElement.innerHTML = documentInfo;
    console.info(documentInfo);

    return `
    Please place this into the ${indexPos.tag} folder, under the episode:
    ${indexPos.name}
    `;
}


function findData(inputID, episodesJSON) {
    for (var pos in episodesJSON) {
        if (typeof(episodesJSON[pos]) === 'object') {
            findData(inputID, episodesJSON[pos]);
        } else {
            if (episodesJSON[pos] == inputID) {
                console.log(episodesJSON);
            }
        }
    }
}

function objToString (obj) {
    let str = '';
    for (const [p, val] of Object.entries(obj)) {
        str += `${p}::${val}\n`;
    }
    return str;
}