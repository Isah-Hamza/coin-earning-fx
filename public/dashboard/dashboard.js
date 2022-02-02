const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => { 
    dropdown.addEventListener('click', () => {
        const ul = dropdown.lastElementChild;
        ul.classList.toggle('show-dropdown');
    })
 })

 console.log('hello, js')
