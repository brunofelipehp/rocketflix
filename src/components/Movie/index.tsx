import { HomeProps } from "../Home";
import "./styles.css";
import codarImg from "../../assets/poster.jpg";
import { useEffect, useState } from "react";
interface MovieProps extends HomeProps {}

export function Movie({ title, overview, poster_path, clik }: MovieProps) {
  const [image, setImage] = useState<string>();

  function handleImage() {
    poster_path
      ? setImage(`https://image.tmdb.org/t/p/w200${poster_path}`)
      : setImage(codarImg);
  }

  useEffect(() => {
    handleImage();
  }, [poster_path]);

  return (
    <div className="movie">
      <img src={image} alt="imagem do filme" />
      <div className="about">
        <h2>
          {clik
            ? title
            : "Ops, hoje não é dia de assistir filme. Bora codar! 🚀"}
        </h2>
        <p>{clik ? overview : ""}</p>
      </div>
    </div>
  );
}
