const dropdowns = document.querySelectorAll('.dropdown');


dropdowns.forEach(dropdown => { 
    dropdown.addEventListener('click', () => {
        const ul = dropdown.lastElementChild;
        ul.classList.toggle('show-dropdown');
    })
 })

const darkThemeBackground = '#191f33';
const switchEl = document.querySelector('[data-switch]');
const toggleEl = document.querySelector('[data-toggle]');
const mainHeader = document.querySelector('.main-header');
const userDetails = document.querySelector('.user-details');
const aside = document.querySelector('.aside');
const activeLink = document.querySelector('.dashboard.active a');


var toggleLeft = 0;

toggleEl.addEventListener('click', () => {
    if(toggleLeft == 0){
        userDetails.style.setProperty('background-color', 'white');
        activeLink.style.setProperty('background-color', '#1572e8');
        activeLink.style.setProperty('color', 'white');
        aside.style.setProperty('background-color', 'white');
        toggleEl.style.setProperty('--left', '55');
        switchEl.style.setProperty('background-color', '#cccccc');
        document.body.style.setProperty('background-color', '#f7f8f9');
        document.body.style.setProperty('color', '#000');
        document.body.style.setProperty('--color-light', '#8b92a9');
        mainHeader.style.setProperty('background-color', '#1572e8');
        
        toggleLeft = 45;
    }
    else {
        activeLink.style.setProperty('background-color', 'white');
        activeLink.style.setProperty('color', 'black');
        userDetails.style.setProperty('background-color', darkThemeBackground);
        aside.style.setProperty('background-color', darkThemeBackground);
        switchEl.style.setProperty('background-color', '#000');
        document.body.style.setProperty('--color-light', '#b9babf');
        document.body.style.setProperty('color', '#fff');
        mainHeader.style.setProperty('background-color', '#191f33');
        document.body.style.setProperty('background-color', '#191f33');
        toggleEl.style.setProperty('--left','0');
        toggleLeft = 0;
    }
})
switchEl.addEventListener('click', () => toggleEl.click());