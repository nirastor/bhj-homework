const elMainMenuItems = Array.from(document.querySelectorAll('.menu_main .menu__item'));
const elMainMenuAllSubmenu = Array.from(document.querySelectorAll('.menu_main .menu_sub'));


for(let item of elMainMenuItems) {
    item.onclick = function () {
        const itemSubmenu = item.querySelector('.menu_sub');
        
        if (!itemSubmenu) {
            return;
        }

        itemSubmenu.classList.toggle('menu_active');
        
        elMainMenuAllSubmenu.forEach(a => {
            if (a !== itemSubmenu) {
                a.classList.remove('menu_active');
            }
        });
        
        return false;
    }
}
