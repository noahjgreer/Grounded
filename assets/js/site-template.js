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
                <div id="form" data-form-type="formoid">
                    <form action="https://mobirise.eu/" method="POST" class="mbr-form form-with-styler" data-form-title="Form Name">
                        <input type="hidden" name="email" data-form-email="true" value="Z25IACZzNFd+BJoslFQM1pDsPW5mr/obbA3I17VFJMuHcRKbhzHHqu9mkGaU+cgBPgft4qZzqF4qpT9NF+HfxDi4vW/q+sVmaOAOVVhp5je0F4WBnnu7BjY61ijGNf7U">
                        <div class="row">
                            <div hidden="hidden" data-form-alert="" class="alert alert-success col-12">Thanks for filling out the form!</div>
                            <div hidden="hidden" data-form-alert-danger="" class="alert alert-danger col-12">
                                Oops...! some problem!
                            </div>
                        </div>
                        <div id="form">
                            <div data-for="email">
                                <input type="email" name="email" placeholder="Email" data-form-field="Email">
                            </div>
                            <button type="submit">Subscribe</button>
                        </div>
                    </form>
                </div>
                <p id="status"></p>
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