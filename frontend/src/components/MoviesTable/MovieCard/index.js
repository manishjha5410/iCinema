import React from "react";

import FlippingCardFront from "./CardFront";
import FlippingCardBack from "./CardBack";
import "./style.css";

export default function ({ movie }) {
  let {
    _id,
    title,
    rate,
    genre,
    image,
    description,
    trailerLink,
    movieLength,
  } = movie;

  let encodedImage,coverImage;

  try
  {
    encodedImage = new Buffer(image.data, "binary").toString("base64");
    coverImage = "data:image/jpeg;base64," + encodedImage;
  }
  catch(E)
  {}



  function flipCard(cardID) {
    const card = document.getElementById(`${cardID}`);
    card.classList.toggle("flipped");
  }

  return (
    <div className="card-container">
      <div className="card-wrapper" id={_id} onClick={() => flipCard(_id)}>
        <FlippingCardFront
          trailerLink={trailerLink}
          coverImage={coverImage}
          rate={rate}
          movieLength={movieLength}
          genre={genre}
          title={title}
        />

        <FlippingCardBack description={description} />
      </div>
    </div>
  );
}

