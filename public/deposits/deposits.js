const aside_dropdowns = document.querySelectorAll('aside .dropdown');

aside_dropdowns.forEach(dropdown => { 
    dropdown.addEventListener('click', () => {
        const ul = dropdown.lastElementChild;
        ul.classList.toggle('show-aside-dropdown');
    })
 })

 const overlay = document.querySelector('.overlay');
 const deposit_btn = document.querySelector('.new-deposit');
 deposit_btn.addEventListener('click', () => {
    overlay.classList.remove('hide');
    console.log('first');
 })


 const close_overlay = document.querySelector('.close-overlay');
 close_overlay.addEventListener('click', () => {
     overlay.classList.add('hide');
 })
 