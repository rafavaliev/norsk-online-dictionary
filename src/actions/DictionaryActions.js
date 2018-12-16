import dispatcher from "../dispatcher";

export function createWord(word, translation) {
  dispatcher.dispatch({
    type: "CREATE_DICT_WORD",
    word: word,
    translation: translation
  });
}

export function deleteWord(word) {
  dispatcher.dispatch({
    type: "DELETE_DICT_WORD",
    word: word
  });
}

export function reloadWords(word) {
  dispatcher.dispatch({
    type: "FETCH_WORDS"
  });
  setTimeout(() => {
    dispatcher.dispatch({
      type: "RECEIVED_WORDS",
      words: [
        { id: 12, word: "Kooken", translation: "Cook" },
        { id: 5, word: "Eplet", translation: "Apple" }
      ]
    });
  }, 1000);
}
