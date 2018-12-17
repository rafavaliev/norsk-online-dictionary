import React from "react";

const DictionaryWord = props => {
  const { word, translation, onDelete } = props;
  return (
    <div className="row m-1">
      <div className="col-12">
        {word} - {translation}{" "}
        <button
          type="button"
          className="btn btn-warning m-1"
          onClick={() => onDelete(word)}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default DictionaryWord;
