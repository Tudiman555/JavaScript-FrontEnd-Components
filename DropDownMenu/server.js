import { CategoryType, MenuItems } from "./constants.js";

//this is a fake server
function getCategories(data) {
    if (data.category == CategoryType.TOP) {
      if (data.menuItem == MenuItems.MOTORS) {
        return [
          'Car',
          'Motorcycle',
          'Plane',
          'Trucks',
          'Wheels'
        ];
      }
      if (data.menuItem == MenuItems.FASHION) {
        return [
          'Women\'s tops',
          'Men\'s tops',
          'Jeans',
          'Hats'
        ];
      }
      return [
        'Server apple',
        'Server banana',
        'Server pear',
        'Server orange'
      ];
    }
    if (data.category == CategoryType.ADDITIONAL) {
      if (data.menuItem == MenuItems.MOTORS) {
        return [
          'Tires',
          'Windshields',
          'Ski racks',
          'Doors',
          'Windows'
        ];
      }
      if (data.menuItem == MenuItems.FASHION) {
        return [
          'On sale',
          'Red stuff',
          'Gucci',
          'New Arrivals'
        ];
      }
      return [
        'Server square',
        'Server circle',
        'Server oval',
        'Server diamond'
      ];
    }
    return [];
  }
  
  const endpointsList = {
    "/categories": {
      "get": getCategories
    }
  }
  
  function getFunction(url, data, callback) {
    const domain = url.substring(0, url.indexOf("/"));
    const endpoint = url.substring(url.indexOf("/"), url.length);
  
    callback(endpointsList[endpoint]["get"](data));
  }
  
  export const api = {
    get: getFunction
  };