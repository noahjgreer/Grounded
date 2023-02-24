var navHTML = "";
var footerHTML = "";
var pages;
var footerCol1 = `
<div id="col1">
<img src="/assets/images/BigLogo-v1.2-white.svg" alt="The Grounded Logo" id="logo">
</div>
`
var footerCol2 = "";
var footerCol3 = "";

fetch('/assets/pages.json')
    .then(response => response.json())
    .then(result => {
        pages = result;
        setNav();
        setFooter();
    })

function setNav() {
    for (let i = 0; i < pages.index.length; i++) {
        const element = pages.index[i];
        navHTML = navHTML + `
        <li>
            <a href="${element.destination}">${element.displayName}</a>
        </li>
        `
    }
    document.getElementsByTagName("nav")[0].innerHTML = `
    <a href="/">
        <img src="/assets/images/LongLogo-v1.1.svg" id="logo" alt="The Grounded Logo">
    </a>
    <ul id="pages">
    ` + navHTML + `</ul>`
}

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

