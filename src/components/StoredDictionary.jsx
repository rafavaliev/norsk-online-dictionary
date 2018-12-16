import React, { Component } from "react";
import { Link } from "react-router-dom";
import DictionaryWord from "./DictionaryWord";
import DictionaryStore from "../stores/DictionaryStore";
import * as DictionaryActions from "../actions/DictionaryActions";

class StoredDictionary extends Component {
  constructor(props) {
    super(props);
    this.updateFromStore = this.updateFromStore.bind(this);
    this.state = {
      words: DictionaryStore.getAll(),
      isFetching: DictionaryStore.isFetching
    };
  }

  componentWillMount() {
    DictionaryStore.on("change", this.updateFromStore);
  }
  componentWillUnmount() {
    DictionaryStore.removeListener("change", this.updateFromStore);
  }

  render() {
    return (
      <div>
        <button
          className="button btn-default"
          onClick={() => this.createWord()}
        >
          Generate word
        </button>
        <button onClick={() => this.reloadWords()}>Reload words</button>
        {this.state.isFetching === true && <h1>Loading...</h1>}
        {this.state.words.length > 0 && (
          <div>
            <h1>My words</h1>
            {this.getWords()}
          </div>
        )}
        {this.state.words.length === 0 && (
          <div>
            <h1>There are no words.</h1>
            <p>
              You can add them on <Link to="/">search tab</Link>
            </p>
          </div>
        )}
      </div>
    );
  }

  updateFromStore() {
    this.setState({
      words: DictionaryStore.getAll(),
      isFetching: DictionaryStore.isFetching
    });
  }

  createWord() {
    DictionaryActions.createWord(Date.now(), Date.now());
  }

  reloadWords() {
    DictionaryActions.reloadWords();
  }

  getWords() {
    const { words } = this.state;
    return words.map(w => {
      return (
        <DictionaryWord
          key={w.id}
          id={w.id}
          word={w.word}
          translation={w.translation}
          onDelete={this.handleDelete.bind(this)}
        />
      );
    });
  }
  handleDelete(wordToDelete) {
    if (wordToDelete.length === 0) {
      return;
    }
    DictionaryActions.deleteWord(wordToDelete);
  }
}

export default StoredDictionary;
