// changes icon state based on toggle
const btnToggle = (iconElement, classElement, source1, source2) => {
    classElement.classList.toggle('closedState');
    iconElement.src = classElement.classList.contains('closedState') ? source1 : source2;
};


// loads saved state of toggle
const loadState = (item, classElement, iconElement, source) => {
    if(localStorage.getItem(item)) {
        classElement.classList.add("closedState");
        iconElement.src = source;
    }
};


// burger menu logic
const burgerMenuLogic = function() {
    const menuBtn = document.querySelector(".burger-menu-btn");
    const menu = document.querySelector(".burger-menu");
    const menuIcon = document.querySelector(".burger-icon");

    // loads current state in local storage
    loadState("burgerMenuState", menu, menuIcon, "img/icons/menu.svg")

    menuBtn.addEventListener("click", () => {
        btnToggle(menuIcon, menu, "img/icons/menu.svg", "img/icons/x.svg");
        
        //updates state in local storage
        menu.classList.contains("closedState") 
        ? localStorage.setItem("burgerMenuState", "state") 
        : localStorage.removeItem("burgerMenuState")
    });
};


// sidebar logic
const sidebarLogic = function(){
    const sidebarBtn = document.querySelector(".sidebar-btn");
    const sidebar = document.querySelector(".sidebar");
    const sidebarIcon = document.querySelector(".sidebar-icon");
    const themeBtn = document.querySelector(".theme-btn");
    const volumeBtn = document.querySelector(".volume-btn");

    // loads current state from local storage
    loadState("sidebarState", sidebar, sidebarIcon, "img/icons/chevrons-up.svg")

    sidebarBtn.addEventListener("click", () => {
        btnToggle(sidebarIcon, sidebar, "img/icons/chevrons-up.svg", "img/icons/chevrons-down.svg");

        //updates state in local storage
        sidebar.classList.contains("closedState") 
        ? localStorage.setItem("sidebarState", "state") 
        : localStorage.removeItem("sidebarState")
    });

    themeBtn.addEventListener("click", () => {
        const themeIcon = document.querySelector(".theme-icon");

        btnToggle(themeIcon, themeBtn, "img/icons/sun.svg", "img/icons/moon.svg");
        // TODO: will have more functionality here
        // TODO: save state of theme in local storage
    });

    volumeBtn.addEventListener("click", () => {
        const volumeIcon = document.querySelector(".volume-icon");

        btnToggle(volumeIcon, volumeBtn, "img/icons/volume-2.svg", "img/icons/volume-x.svg");
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
            const slides = btn.closest("[data-slider]").querySelector("[data-slides]");
            const activeSlide = slides.querySelector("[data-active]");
            const dots = document.querySelectorAll(".pagination .dot");

            let newIndex = [...slides.children].indexOf(activeSlide) + offset;

            if (newIndex < 0) {
                newIndex = slides.children.length - 1;
            } else if (newIndex >= slides.children.length) {
                newIndex = 0;
            }
        
            slides.children[newIndex].dataset.active = true;
            delete activeSlide.dataset.active;

            dots.forEach((dot, i) => {
                dot.classList.toggle("active-dot", i === newIndex);
            });
        });
    });
};


document.addEventListener("DOMContentLoaded", () => {
    burgerMenuLogic();
    sidebarLogic();
    slideshowLogic();
});
