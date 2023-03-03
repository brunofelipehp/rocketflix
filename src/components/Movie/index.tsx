import { HomeProps } from "../Home";
import "./styles.css";
import codarImg from "../../assets/poster.jpg";
import { useEffect, useState } from "react";
interface MovieProps extends HomeProps {}

export function Movie({ title, overview, posterPath, movieId }: MovieProps) {
  const [image, setImage] = useState<string>();

  function handleImage() {
   posterPath && movieId !== null
      ? setImage(`https://image.tmdb.org/t/p/w200${posterPath}`)
      : setImage(codarImg);
  }

  useEffect(() => {
    handleImage();
  }, [movieId]);

  return (
    <div className="movie">
      <img src={image} alt="imagem do filme" />
      <div className="about">
        <h2>
          {
          movieId !== null
            ? title
            : "Ops, hoje não é dia de assistir filme. Bora codar! 🚀"
            }
        </h2>
        <p>{movieId !== null ? overview : ""}</p>
      </div>
    </div>
  );
}
