const aside_dropdowns = document.querySelectorAll('aside .dropdown');

aside_dropdowns.forEach(dropdown => { 
    dropdown.addEventListener('click', () => {
        const ul = dropdown.lastElementChild;
        ul.classList.toggle('show-aside-dropdown');
    })
 })

 const togglers_div = document.querySelector('.toggle-table');
 const tables = Array.from(document.getElementsByTagName('table'));
 const togglers = Array.from(togglers_div.children);
 
 togglers.forEach(toggler => {
        toggler.addEventListener('click', () => {
        togglers.forEach(toggler => toggler.classList.remove('active'));
        toggler.classList.add('active');
        const togglerName = toggler.classList[0];
        tables.forEach(table => {
            table.classList.add('hide');
            if(table.classList.contains(togglerName)) 
                table.classList.remove('hide');
        })
     })

 })
 