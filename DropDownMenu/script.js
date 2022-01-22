import { CategoryType, HOST } from "./constants.js";
import { api } from "./server.js";

function getMainMenuItems() {
  const items = document.getElementsByClassName("menu__main__item");
  return items;
}

function handleUpdateCategory(categories,categoryType) {
  let newCategories = '';
  for (const category of categories) {
    const categoryElement = `
      <li class="menu__sub__categories__item">
        <a href="#" class="menu__sub__categories__item__link">${category}</a>
      </li>
    `;
    newCategories += categoryElement;
  }
  const categoriesElement = document.getElementsByClassName(`menu__sub__categories__items--${categoryType}`)[0];
  categoriesElement.innerHTML = newCategories;
}

function updateCategories(category) {
  const activeMenuItemName = activeMenuItem.children[0].innerHTML;
  api.get(HOST + "categories",{category,menuItem : activeMenuItemName},(categories) => handleUpdateCategory(categories,category));
}

function showSubMenu() {
  const subMenu = document.getElementsByClassName("menu__sub")[0];
  subMenu.style.display = "block";
  updateCategories(CategoryType.TOP);
  updateCategories(CategoryType.ADDITIONAL);
}

function hideSubMenu() {
  const subMenu = document.getElementsByClassName("menu__sub")[0];
  subMenu.style.display = "none";
}

function menuItemOnMouseEnter(item) {
  if (activeMenuItem) {
    activeMenuItem.classList.remove("menu__main__item--active");
  }
  // setting the current active(hovered) MenuItems
  activeMenuItem = item;
  item.classList.add("menu__main__item--active");
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

const menu = document.getElementsByClassName("menu")[0];
menu.onmouseleave = hideSubMenu;

function deactivateMenuItem() {
  activeMenuItem.classList.remove("menu__main__item--active");
  activeMenuItem = null;
}

const submenu = document.getElementsByClassName("menu__sub")[0];
submenu.onmouseleave = deactivateMenuItem;
