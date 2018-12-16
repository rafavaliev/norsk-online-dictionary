import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class DictionaryStore extends EventEmitter {
  constructor() {
    super();
    this.words = [
      { id: 1, word: "Huset", translation: "House" },
      { id: 2, word: "Kona", translation: "Wife" },
      { id: 3, word: "Jenta", translation: "Girl" }
    ];
    this.isFetching = false;
  }

  getAll() {
    return this.words;
  }

  createWord(word, translation) {
    const id = Date.now();
    this.words.push({
      id: id,
      word: word,
      translation: translation
    });
    this.emit("change");
  }

  deleteWord(wordToDelete) {
    const words = this.words;
    this.words = words.filter(w => w.word !== wordToDelete);
    this.emit("change");
  }

  handleActions(action) {
    switch (action.type) {
      case "CREATE_DICT_WORD": {
        this.createWord(action.word, action.translation);
        break;
      }
      case "DELETE_DICT_WORD": {
        this.deleteWord(action.word);
        break;
      }
      case "RECEIVED_WORDS": {
        this.words = action.words;
        this.isFetching = false;
        this.emit("change");
        break;
      }
      case "FETCH_WORDS": {
        this.isFetching = true;
        this.emit("change");
        break;
      }
      default: {
      }
    }
  }
}

const dictionaryStore = new DictionaryStore();

dispatcher.register(dictionaryStore.handleActions.bind(dictionaryStore));
export default dictionaryStore;
