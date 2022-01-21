function getMainMenuItems() {
  const items = document.getElementsByClassName("menu__main__item");
  return items;
}

function showSubMenu() {
    const subMenu = document.getElementsByClassName('menu__sub')[0];
    subMenu.style.display = 'block'
}

function hideSubMenu() {
    const subMenu = document.getElementsByClassName('menu__sub')[0];
    subMenu.style.display = 'none'
}

function menuItemOnMouseEnter(item) {
    if(activeMenuItem) {
        activeMenuItem.classList.remove('menu__main__item--active');
    }
    // setting the current active(hovered) MenuItems 
    activeMenuItem = item;
    item.classList.add('menu__main__item--active');
    showSubMenu();
}

// to store active menu item
let activeMenuItem = null;

const menuItems = getMainMenuItems();

//for Each Method does not work on Collection
Array.from(menuItems).forEach((item) => {
  // when we hover over main menu item show subMenu
  item.onmouseenter = () => menuItemOnMouseEnter(item);
});

const menu = document.getElementsByClassName('menu')[0];
menu.onmouseleave = hideSubMenu;

function deactivateMenuItem() {
    activeMenuItem.classList.remove('menu__main__item--active');
    activeMenuItem = null;
  
  }
   
  const submenu = document.getElementsByClassName("menu__sub")[0];
  submenu.onmouseleave = deactivateMenuItem;