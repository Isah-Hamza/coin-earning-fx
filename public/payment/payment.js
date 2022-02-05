const dropdowns = document.querySelectorAll('main .dropdown');

dropdowns.forEach(dropdown => { 
    dropdown.addEventListener('click', () => {
        const body = dropdown.parentElement.parentElement.lastElementChild;
        console.log(body)
        body.classList.toggle('show-dropdown');
    })
 })




 const aside_dropdowns = document.querySelectorAll('aside .dropdown');

aside_dropdowns.forEach(dropdown => { 
    dropdown.addEventListener('click', () => {
        const ul = dropdown.lastElementChild;
        ul.classList.toggle('show-aside-dropdown');
    })
 })