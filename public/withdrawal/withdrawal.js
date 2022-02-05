const aside_dropdowns = document.querySelectorAll('aside .dropdown');

aside_dropdowns.forEach(dropdown => { 
    dropdown.addEventListener('click', () => {
        const ul = dropdown.lastElementChild;
        ul.classList.toggle('show-aside-dropdown');
    })
 })

 const overlay = document.querySelector('.overlay');
 const withdrawal_btns = document.querySelectorAll('.request-cards button');
 
 withdrawal_btns.forEach(btn => {
        btn.addEventListener('click', () => {
        overlay.classList.remove('hide');
 })
 })


 const close_overlay = document.querySelector('.close-overlay');
 close_overlay.addEventListener('click', () => {
     overlay.classList.add('hide');
 })
 