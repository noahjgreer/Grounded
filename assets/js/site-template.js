console.log(`Web Design made from scratch by Noah J. Greer`)

document.getElementById("navbar").innerHTML = (`
<div id="logo">
            <a href="/index.html">
                <img src="/assets/images/LongLogo.svg" alt="Grounded Logo">
            </a>
        </div>
        <div id="pages">
            <a href="/index.html">Home</a>
            <a href="/ask.html">Ask</a>
            <a href="/episodes/index.html">Episodes</a>
            <a href="/about.html">About</a>
        </div>
        <div id="burger">
            <div id="line1"></div>
            <div id="line2"></div>
            <div id="line3"></div>
        </div>
        `);
document.getElementById("footer").innerHTML = (`
        <div>
            <img id="logo" src="/assets/images/BigLogo-white.svg">
            <div id="newsletter">
                <h3>Newsletter</h3>
                <form class="newsletter">
                    <input type="email" placeholder="Email">
                    <button type="submit">Subscribe</button>
                </form>
                <div class="socials">
                    <a id="mail" class="img-link" href="mailto:groundedwithmattround@gmail.com"></a>
                    <a id="twitter" class="img-link" href="https://twitter.com/chapelcity93010"></a>
                    <a id="yt" class="img-link" href="https://www.youtube.com/channel/UCRVmMSvZfpuXiReda8MmCrg"></a>
                </div>
            </div>
            <div id="navigation">
                <h3>Navigation</h3>
                <div>
                    <a href="/index.html">Home</a>
                    <a href="/ask.html">Ask</a>
                    <a href="/episodes/index.html">Episodes</a>
                    <a href="/about.html">About</a>
                </div>
            </div>
        </div>
        <p id="copyright">Copyright © ${new Date().getFullYear()} - Grounded</p>
`)