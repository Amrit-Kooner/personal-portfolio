// changes icon state based on toggle
const btnToggle = (icon, component, source1, source2) => {
    component.classList.toggle("state")
    icon.src = component.classList.contains("state") ? source1 : source2
}


// saves state of toggle
const updateStorage = (component, state) =>{
    component.classList.contains("state") 
    ? localStorage.setItem(state, "state") 
    : localStorage.removeItem(state)
}


// loads saved state of toggle
const loadStorage = (icon, component, source, item) => {
    if(localStorage.getItem(item)) {
        component.classList.add("state")
        icon.src = source
    }
}


// burger menu logic
const burgerMenuLogic = function() {
    const menuBtn = document.querySelector(".burger-menu-btn")
    const menu = document.querySelector(".burger-menu")
    const menuIcon = document.querySelector(".burger-icon")
    //
    const menuSource1 = "img/icons/menu.svg"
    const menuSource2 = "img/icons/x.svg"

    // loads current state in local storage
    loadStorage(menuIcon, menu, menuSource1, "burgerMenuState")

    menuBtn.addEventListener("click", () => {
        //update icon state
        btnToggle(menuIcon, menu, menuSource1, menuSource2)
        
        //update state in local storage
        updateStorage(menu, "burgerMenuState")
    })
}


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
    //
    const sidebarSource1 = "img/icons/chevrons-up.svg"
    const sidebarSource2 = "img/icons/chevrons-down.svg"
    const themeSource1 = "img/icons/moon.svg"
    const themeSource2 = "img/icons/sun.svg"
    const volumeSource1 = "img/icons/volume-2.svg"
    const volumeSource2 = "img/icons/volume-x.svg"

    // loads current state from local storage
    loadStorage(sidebarIcon, sidebar, sidebarSource1, "sidebarState")
    loadStorage(themeIcon, mainBody, themeSource1, "themeState", "lightTheme")
    // TODO: LOAD STATE OF VOLUME AFTER FUNCTIONAILITY IS IMPLEMENTED

    sidebarBtn.addEventListener("click", () => {
        //update icon state
        btnToggle(sidebarIcon, sidebar, sidebarSource1, sidebarSource2)
        
        //update state in local storage
        updateStorage(sidebar, "sidebarState")
    })

    themeBtn.addEventListener("click", () => {
        //update icon state
        btnToggle(themeIcon, mainBody, themeSource1, themeSource2)

        //update state in local storage
        updateStorage(mainBody, "themeState")
    })

    volumeBtn.addEventListener("click", () => {
        //update icon state
        btnToggle(volumeIcon, volumeBtn, volumeSource1, volumeSource2)
        // TODO: will have more functionality here

        //update state in local storage
        // updateState(volumeBtn, "volumeState")
    })
}


// slideshow logic
const slideshowLogic = function(){
    // tutorial used: https://www.youtube.com/watch?v=9HcxHDS2w1s&t=740s&ab_channel=WebDevSimplified

    const buttons = document.querySelectorAll("[data-slider-btn]")
    
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const offset = btn.dataset.sliderBtn === "next" ? 1 : -1
            const slides = btn.closest("[data-slider]").querySelector("[data-slides]")
            const activeSlide = slides.querySelector("[data-active]")
            const dots = document.querySelectorAll(".pagination .dot")

            let newIndex = [...slides.children].indexOf(activeSlide) + offset

            if (newIndex < 0) {
                newIndex = slides.children.length - 1
            } else if (newIndex >= slides.children.length) {
                newIndex = 0
            }
        
            slides.children[newIndex].dataset.active = true
            delete activeSlide.dataset.active

            dots.forEach((dot, i) => {
                dot.classList.toggle("active-dot", i === newIndex)
            })
        })
    })
}


document.addEventListener("DOMContentLoaded", () => {
    burgerMenuLogic()
    sidebarLogic()
    slideshowLogic()
})
