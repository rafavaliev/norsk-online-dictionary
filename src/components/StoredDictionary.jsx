import React, { Component } from "react";
import { Link } from "react-router-dom";
import DictionaryWord from "./DictionaryWord";
import * as DictionaryActions from "../actions/DictionaryActions";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  fetchWords,
  createWord,
  deleteWord
} from "../actions/DictionaryActions";

@connect(store => {
  return {
    words: store.dictionary.words,
    fetching: store.dictionary.fetching,
    fetched: store.dictionary.fetched,
    error: store.dictionary.error
  };
})
class StoredDictionary extends Component {
  render() {
    return (
      <div>
        <button
          onClick={() => this.handleSave()}
          type="button"
          className="btn btn-primary m-2"
        >
          Generate word
        </button>
        <button
          onClick={() => this.reloadWords()}
          type="button"
          className="btn btn-primary m-2"
        >
          Reload words
        </button>
        {this.props.fetching === true && <h1>Loading...</h1>}
        {this.props.words.length > 0 && (
          <div>
            <h4>You have {this.props.words.length} words in your dictionary</h4>
            {this.getWords()}
          </div>
        )}
        {this.props.words.length === 0 && (
          <div>
            <h4>There are no words.</h4>
            <p>
              You can add them on <Link to="/">search tab</Link>
            </p>
          </div>
        )}
      </div>
    );
  }

  getWords() {
    const { words } = this.props;
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
  handleSave() {
    this.props.dispatch(createWord("Pristen", "The priest"));
  }

  handleDelete(word) {
    this.props.dispatch(deleteWord(word));
  }

  reloadWords() {
    this.props.dispatch(fetchWords());
  }
}

export default StoredDictionary;
