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
        <h1>Translate</h1>
        <input
          value={word.length ? word : ""}
          placeholder={"Write a word to translate"}
          onChange={e => this.translate(e.target.value)}
        />
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
    const results = [
      { word: "Home", example: "Jeg har et huset" },
      { word: "House", example: "Det er mitt hus." },
      { word: "Cabin", example: "Jeg har et cabin" }
    ];
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
