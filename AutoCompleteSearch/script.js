import { api } from "./server.js";

const HOST = 'server.com/';

const searchInput = document.getElementsByClassName('search__bar__input')[0];
const suggestionsElement = document.getElementsByClassName('search__suggestions__list')[0];
const actionsElement = document.getElementsByClassName('search__actions')[0];

function wrapBoldedCharacters({inputValue, suggestion}) {
  if (suggestion.startsWith(inputValue)) {
    return `${suggestion.substring(0, inputValue.length)}<b>${suggestion.substring(inputValue.length, suggestion.length)}</b>`;
  }
  return `<b>${suggestion}</b>`;
}

function createSuggestionElement({suggestion, auxiliaryData}) {
  const auxiliaryString = auxiliaryData ? ` - ${auxiliaryData}` : "";
  const boldProcessedSuggestion = wrapBoldedCharacters({
    inputValue: searchInput.value,
    suggestion
  });
  return `<li class="search__suggestions__list__result">${boldProcessedSuggestion}${auxiliaryString}</li>`
}

function onSuggestionsResponse(data) {
  let suggestionsHTML = "";
  for (const suggestion of data) {
    suggestionsHTML += createSuggestionElement({
      suggestion: suggestion.suggestion,
      auxiliaryData: suggestion.auxiliary
    });
  }
  suggestionsElement.innerHTML = suggestionsHTML;
  if (suggestionsHTML) {
    actionsElement.classList.add('search__actions--autosuggest');
  } else {
    actionsElement.classList.remove('search__actions--autosuggest');
  }
}

function handleInput(event) {
  if (searchInput.value) {
    api.get(HOST + 'autocomplete', searchInput.value, onSuggestionsResponse);
  } else {
    suggestionsElement.innerHTML = '';
    actionsElement.classList.remove('search__actions--autosuggest');
  }
}

searchInput.oninput = handleInput;
