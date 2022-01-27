function getRandomString({ length }) {
  const characterChoices =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let characters = [];
  while (characters.length < length) {
    const randomIndex = getRandomInteger({
      min: 0,
      max: characterChoices.length - 1,
    });
    characters.push(characterChoices.charAt(randomIndex));
  }
  return characters.join("");
}

function getRandomInteger({ min, max }) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateSuggestion({ prefix }) {
  const RATIO_EXACT_MATCH = 0.3;
  const RATIO_AUTOCORRECT = 0.1;

  // 10% times return autocorrect suggestions
  if (Math.random() < RATIO_AUTOCORRECT) {
    return getRandomString({
      length: getRandomInteger({ min: 1, max: prefix.length }),
    });
  }

  // 30% times return the same prefix
  if (Math.random() < RATIO_EXACT_MATCH) {
    return prefix;
  }

  return (
    prefix +
    getRandomString({
      length: getRandomInteger({ min: 1, max: prefix.length }),
    })
  );
}

function autoCompleteHandler(data) {
  const MAX_PREFIX_LENGTH = 10;
  const RATIO_AUXILIARY = 0.1; // 10%
  const RESULT_LENGTH = 10;
  let results = [];
  if (data.length > MAX_PREFIX_LENGTH) {
    return results;
  }

  while (results.length < RESULT_LENGTH) {
    const suggestion = generateSuggestion({ prefix: data });

    if (results.find((result) => result.suggestion === suggestion)) {
      continue;
    }

    if (Math.random() < RATIO_AUXILIARY) {
      for (let i = 0; i < 2; i++) {
        results.push({
          suggestion,
          auxiliary: getRandomString({
            length: getRandomInteger({ min: 5, max: 15 }),
          }),
        });
      }
    } else {
      results.push({ suggestion, auxiliary: "" });
    }
  }
  return results;
}

const endpointsList = {
  "/autocomplete": {
    get: autoCompleteHandler,
  },
};

function getFunction(url, data, callback) {
  const domain = url.substring(0, url.indexOf("/"));
  const endpoint = url.substring(url.indexOf("/"), url.length);

  callback(endpointsList[endpoint]["get"](data));
}

export const api = {
  get: getFunction,
};
