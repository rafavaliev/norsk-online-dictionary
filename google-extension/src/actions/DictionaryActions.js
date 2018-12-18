import dispatcher from "../dispatcher";

export function createWord(word, translation) {
  return {
    type: "CREATE_DICT_WORD",
    payload: {
      word: word,
      translation: translation
    }
  };
}

export function deleteWord(word) {
  return {
    type: "DELETE_DICT_WORD",
    payload: {
      word: word
    }
  };
}

export function fetchWords() {
  return {
    type: "FETCH_WORDS_FULFILLED",
    payload: {
      words: [
        { id: 1, word: "Huset", translation: "House" },
        { id: 2, word: "Kona", translation: "Wife" },
        { id: 3, word: "Jenta", translation: "Girl" }
      ]
    }
  };
}
