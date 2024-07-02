const menu = document.querySelector('.menubtn')
const nav = document.querySelector('.link')
const menuBtnIcon = menu.querySelector("i")

menu.addEventListener('click', (e) => {
    nav.classList.toggle("open")

    const isOpen = nav.classList.contains("open")
    menuBtnIcon.setAttribute("class", isOpen? "ri-close-line" : "ri-menu-line")
})

nav.addEventListener('click', (e) => {
    nav.classList.remove("open")
    menuBtnIcon.setAttribute("class", "ri-menu-line")
})

const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration : 1000,
};

ScrollReveal().reveal(".left h1", {
    ...scrollRevealOption,
})

ScrollReveal().reveal(".left .leftBtn", {
    ...scrollRevealOption,
    delay: 500,
})

ScrollReveal().reveal(".right h4", {
    ...scrollRevealOption,
    delay : 2000,
})

ScrollReveal().reveal(".right h2", {
    ...scrollRevealOption,
    delay : 2500,
})

ScrollReveal().reveal(".right h3", {
    ...scrollRevealOption,
    delay : 3000,
})

ScrollReveal().reveal(".right p", {
    ...scrollRevealOption,
    delay : 3500,
})

ScrollReveal().reveal(".right .image-1", {
    duration: 1000,
    delay : 4000,
})

ScrollReveal().reveal(".right .image-2", {
    duration: 1000,
    delay : 4500,
})

ScrollReveal().reveal(".location", {
    ...scrollRevealOption,
    origin: "left",
    delay : 5000,
})

ScrollReveal().reveal(".socials span", {
    ...scrollRevealOption,
    origin:"top",
    delay : 5300,
    interval : 800,
})