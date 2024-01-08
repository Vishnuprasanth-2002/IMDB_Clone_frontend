import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

interface IMyComponent {
  sendRating: (rate: number) => void;
}
const MyComponent: React.FC<IMyComponent> = ({ sendRating }) => {
  const [rating, setRating] = useState(0);

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate);
    sendRating(rate);
  };
  console.log(rating);

  return <Rating onClick={handleRating} />;
};
export default MyComponent;
