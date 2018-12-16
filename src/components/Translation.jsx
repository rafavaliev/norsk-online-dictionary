import React from "react";

const Translation = props => {
  const { word, example } = props;
  return (
    <div className="row">
      <div className="col-12">
        <div className="well">
          {word}, Example: {example}
        </div>
      </div>
    </div>
  );
};

export default Translation;
