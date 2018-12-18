import React, { Component } from "react";
//import { Link } from "react-router-dom";
import Translation from "./Translation";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "",
      translations: []
    };
  }
  render() {
    const { word, translations } = this.state;
    const translationResult = this.getTranslations(translations);

    return (
      <div>
        <h1 class="m-3 display-7">Translate 4</h1>
        <div class="col-12 col-lg-3 input-group mb-3">
          <input
            onChange={e => this.translate(e.target.value)}
            type="text"
            value={word.length ? word : ""}
            class="form-control"
            placeholder={"Write a word to translate"}
          />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button">
              Translate
            </button>
          </div>
        </div>

        {word.length > 0 && this.getWordDetails()}
        {word.length > 0 && (
          <div>
            <p>We found: </p>
            {translationResult}
          </div>
        )}
      </div>
    );
  }

  translate = word => {
    let results = [
      { word: "Home", example: "Jeg har et huset" },
      { word: "House", example: "Det er mitt hus." },
      { word: "Cabin", example: "Jeg har et cabin" },
      { word: "Pristen1", example: "The priest1" },
      { word: "Pristen2", example: "The priest2" },
      { word: "Pristen3", example: "The priest3" },
      { word: "Pristen4", example: "The priest4" }
    ];
    results.length = word.length;
    this.setState({ word: word, translations: results });
  };

  getTranslations = translations => {
    return translations.map(t => {
      return <Translation key={t.word} word={t.word} example={t.example} />;
    });
  };

  getWordDetails = word => {
    return <Translation word={"huse"} example={"[ˈhʉːse] v ( ~t/-sa/-ste)"} />;
  };
}

export default Search;
