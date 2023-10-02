// changes icon state based on toggle
const btnToggle = (icon, component, source1, source2) => {
    component.classList.toggle("state");
    icon.src = component.classList.contains("state") ? source1 : source2;
};


// loads saved state of toggle
const loadState = (icon, component, source, item) => {
    if(localStorage.getItem(item)) {
        component.classList.add("state")
        icon.src = source
    }
};


// burger menu logic
const burgerMenuLogic = function() {
    const menuBtn = document.querySelector(".burger-menu-btn")
    const menu = document.querySelector(".burger-menu")
    const menuIcon = document.querySelector(".burger-icon")

    // loads current state in local storage
    loadState(menuIcon, menu, "img/icons/menu.svg", "burgerMenuState")

    menuBtn.addEventListener("click", () => {
        btnToggle(menuIcon, menu, "img/icons/menu.svg", "img/icons/x.svg")
        
        //updates state in local storage
        menu.classList.contains("state") 
        ? localStorage.setItem("burgerMenuState", "state") 
        : localStorage.removeItem("burgerMenuState")
    });
};


// sidebar logic
const sidebarLogic = function(){
    const sidebar = document.querySelector(".sidebar")
    const mainBody = document.body
    //
    const sidebarBtn = document.querySelector(".sidebar-btn")
    const themeBtn = document.querySelector(".theme-btn")
    const volumeBtn = document.querySelector(".volume-btn")
    //
    const sidebarIcon = document.querySelector(".sidebar-icon")
    const themeIcon = document.querySelector(".theme-icon")
    const volumeIcon = document.querySelector(".volume-icon")

    // loads current state from local storage
    loadState(sidebarIcon, sidebar, "img/icons/chevrons-up.svg", "sidebarState")
    loadState(themeIcon, mainBody, "img/icons/sun.svg", "themeState", "lightTheme")
    // TODO: LOAD STATE OF VOLUME AFTER FUNCTIONAILITY IS IMPLEMENTED

    sidebarBtn.addEventListener("click", () => {
        btnToggle(sidebarIcon, sidebar, "img/icons/chevrons-up.svg", "img/icons/chevrons-down.svg")

        //updates state in local storage
        sidebar.classList.contains("state") 
        ? localStorage.setItem("sidebarState", "state") 
        : localStorage.removeItem("sidebarState")
    });


    themeBtn.addEventListener("click", () => {
        const themeIcon = document.querySelector(".theme-icon")

        btnToggle(themeIcon, mainBody, "img/icons/sun.svg", "img/icons/moon.svg")

        //updates state in local storage
        mainBody.classList.contains("state") 
        ? localStorage.setItem("themeState", "theme") 
        : localStorage.removeItem("themeState")
    });


    volumeBtn.addEventListener("click", () => {
        const volumeIcon = document.querySelector(".volume-icon")

        // btnToggle(volumeIcon, ???, "img/icons/volume-2.svg", "img/icons/volume-x.svg")
        // TODO: will have more functionality here
        // TODO: save state of volume in local storage
    });
};


// slideshow logic
const slideshowLogic = function(){
    // tutorial used: https://www.youtube.com/watch?v=9HcxHDS2w1s&t=740s&ab_channel=WebDevSimplified

    const buttons = document.querySelectorAll("[data-slider-btn]");
    
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const offset = btn.dataset.sliderBtn === "next" ? 1 : -1;
            const slides = btn.closest("[data-slider]").querySelector("[data-slides]")
            const activeSlide = slides.querySelector("[data-active]")
            const dots = document.querySelectorAll(".pagination .dot")

            let newIndex = [...slides.children].indexOf(activeSlide) + offset

            if (newIndex < 0) {
                newIndex = slides.children.length - 1;
            } else if (newIndex >= slides.children.length) {
                newIndex = 0;
            }
        
            slides.children[newIndex].dataset.active = true
            delete activeSlide.dataset.active

            dots.forEach((dot, i) => {
                dot.classList.toggle("active-dot", i === newIndex)
            });
        });
    });
};


document.addEventListener("DOMContentLoaded", () => {
    burgerMenuLogic()
    sidebarLogic()
    slideshowLogic()
});
