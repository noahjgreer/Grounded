const navBurger = () => {
    const burger = document.getElementById("burger");
    const nav = document.getElementById("pages");

    burger.addEventListener('click', () => {
        nav.classList.toggle('active')
    });
}

navBurger();