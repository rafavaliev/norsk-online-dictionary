const initialState = {
  fetching: false,
  fetched: false,
  words: [],
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_WORDS": {
      return { ...state, fetching: true };
    }
    case "FETCH_WORDS_PENDING": {
      return { ...state, fetching: true };
    }
    case "FETCH_WORDS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        words: action.payload.words
      };
    }
    case "FETCH_WORDS_REJECTED": {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.payload
      };
    }

    case "CREATE_DICT_WORD": {
      const { words } = state;
      let maxId = 1;
      if (words.length > 0) {
        maxId =
          words.reduce(function(prev, current) {
            return prev.id > current.id ? prev : current;
          }).id + 1;
      }

      const word = {
        id: maxId,
        word: action.payload.word,
        translation: action.payload.translation
      };
      return { ...state, words: words.concat([word]) };
    }
    case "DELETE_DICT_WORD": {
      const word = action.payload.word;
      const { words } = state;
      const newWords = words.filter(w => w.word !== word);
      return { ...state, words: newWords };
    }

    default: {
      return state;
    }
  }
  return state;
}
