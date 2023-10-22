window.addEventListener('load', () => {
    const divs = document.querySelectorAll("#board div");
    divs.forEach(div => div.classList.add("square"))
})