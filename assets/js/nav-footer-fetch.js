var navHTML = "";
var footerHTML = "";
var pages;
var listeningLocations = "";
var footerCol1 = `
<div id="col1">
<img src="/assets/images/BigLogo-v1.2-white.svg" alt="The Grounded Logo" id="logo">
</div>
`
var audioPlayer = document.querySelector(".audioplayer");
var footerCol2 = "";
var footerCol3 = "";
var audioPlayerHeight = "";

// Add theme color to the head of the document if it doesn't exist
if (document.querySelector("meta[name='theme-color']") == null) {
    var metaTheme = document.createElement("meta");
    metaTheme.setAttribute("name", "theme-color");
    document.getElementsByTagName("head")[0].appendChild(metaTheme);
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.querySelector("meta[name='theme-color']").setAttribute("content", "#231f20");
    } else {
        document.querySelector("meta[name='theme-color']").setAttribute("content", "#ffffff");
    }
} else {
    // Check current user theme and set theme color accordingly
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.querySelector("meta[name='theme-color']").setAttribute("content", "#231f20");
    } else {
        document.querySelector("meta[name='theme-color']").setAttribute("content", "#ffffff");
    }
}
// Detect if the user changes their theme and set the theme color accordingly
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.querySelector("meta[name='theme-color']").setAttribute("content", "#231f20");
    } else {
        document.querySelector("meta[name='theme-color']").setAttribute("content", "#ffffff");
    }
})

// Detect if the footer element is completely in view, and then set the theme color to black or white accordingly
window.addEventListener('scroll', () => {
    var footer = document.querySelector("footer");
    var footerRect = footer.getBoundingClientRect();
    if (footerRect.top <= 0) {
        // Check current user theme and set theme color accordingly
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.querySelector("meta[name='theme-color']").setAttribute("content", "#000");
        } else {
            document.querySelector("meta[name='theme-color']").setAttribute("content", "#231f20");
        }
    } else {
        // Check current user theme and set theme color accordingly
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.querySelector("meta[name='theme-color']").setAttribute("content", "#231f20");
        } else {
            document.querySelector("meta[name='theme-color']").setAttribute("content", "#ffffff");
        }
    }
})


// Get the JSON file and set the nav and footer
fetch('/assets/pages.json')
    .then(response => response.json())
    .then(result => {
        pages = result;
        setNav();
        setFooter();
    })

// Sets the Navigation Bar - Site-wide
function setNav() {
    navHTML = "";
    listeningLocations = "";
    // Adding all pages from json into variable
    for (let i = 0; i < pages.index.length; i++) {
        const element = pages.index[i];
        navHTML = navHTML + `
        <li>
            <a href="${element.destination}">${element.displayName}</a>
        </li>
        `
    }

    // Adding all Listening locations from json into one variable
    for (let i = 0; i < pages.footer.col2[2].elements.length; i++) {
        const element = pages.footer.col2[2].elements[i];
        listeningLocations = listeningLocations + `
        <a href="${pages.footer.col2[2].elements[i].destination}" target="_blank">
            <img src="${pages.footer.col2[2].elements[i].icon}" alt="${pages.footer.col2[2].elements[i].altName}" class="social">
        </a>
        `
    }


    if (audioPlayer == undefined) {
        audioPlayerHeight = "0";
    } else {
        if (window.innerWidth > 825) {
            audioPlayerHeight = audioPlayer.clientHeight;
        } else {
            audioPlayerHeight = "0";
        }
    }

    document.querySelector("nav").innerHTML = `
    <a href="/">
        ${getNavLogo()}
    </a>
    <div id="hb">
        <div id="hb1" class="hb-line">
        </div>
        <div id="hb2" class="hb-line">
        </div>
        <div id="hb3" class="hb-line">
        </div>
    </div>
    <div id="hb-pages" style="height: calc(100% - ${audioPlayerHeight}px - 10)">

    </div>
    `
    // ^^^ The 10 rem in the style up there is a reference to the SCSS variable, $padding-heavy-const * 2
    document.querySelector("#hb-pages").innerHTML = `
    
    <ul id="pages">
    ` + navHTML + `</ul>` +     `
    <div id="listen-nav">
    ` + listeningLocations + `</div>`

    // Function of the Navigational Hamburger
    var hamburger = document.getElementById('hb');
    var hbPages = document.getElementById('hb-pages');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle("active");
        hbPages.classList.toggle("active");

        if (hamburger.classList.contains("active")) {
            hamburger.style.animation = "0.25s linear 0s 1 running hamburger";
        } else {
            hamburger.style.animation = "0.25s linear 0s 1 reverse hamburger";
        }
        
        // if (window.innerWidth <= 825) {
        //     audioPlayer.classList.toggle("inactive");
        // }
    })

    hamburger.addEventListener('animationend', () => {
        hamburger.style.animation = "";
    })

    function hamburgerClose() {
        if (hamburger.classList.contains("active")) {
            hamburger.style.animation = "0.25s linear 0s 1 reverse hamburger";
        }

        hamburger.classList.remove("active");
        hbPages.classList.remove("active");
        
        // if (audioPlayer.classList.contains("inactive") && window.innerWidth <= 825) {
        //     audioPlayer.classList.toggle("inactive");
        // }
    }

    window.onscroll = function() {hamburgerClose()};
}

// Sets the Footer Section - Site-wide
function setFooter() {
    for (let index = 0; index < pages.footer.col2.length; index++) {
        const element = pages.footer.col2[index];
        
        var batch = ""
        for (let i = 0; i < pages.footer.col2[index].elements.length; i++) {
            const element = pages.footer.col2[index].elements[i];
            
            batch = batch + `
            <a href="${pages.footer.col2[index].elements[i].destination}" target="_blank">
                <img src="${pages.footer.col2[index].elements[i].icon}" alt="${pages.footer.col2[index].elements[i].altName}" class="social">
            </a>
            `
        }

        footerCol2 = footerCol2 + `
            <h1>${element.name}</h1>
            <div class="${element.type}">
                ${batch}
            </div>
        `
    }
    footerCol3 = `
        <div id="col3">
            <h1>${pages.footer.col3.name}</h1>
            <ul id="pages">
    ` + navHTML + `</div>`
    document.getElementsByTagName("footer")[0].innerHTML = `
    <div id="body">` + footerCol1 + `<div id="col2">` + footerCol2 + `</div>` + footerCol3 +
    `</div><div id="copyright"><p>` + pages.footer.copyright + 
    `</p></div></div>`
}

// Fetches the logo based on the current color scheme
function getNavLogo() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return `<img src="/assets/images/LongLogo-v1.1-White.svg" id="logo" alt="The Grounded Logo">`
    } else {
        return `<img src="/assets/images/LongLogo-v1.1.svg" id="logo" alt="The Grounded Logo">`
    }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    setNav();
})