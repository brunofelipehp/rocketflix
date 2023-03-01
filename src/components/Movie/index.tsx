import { HomeProps } from "../Home";
import "./styles.css";

interface MovieProps extends HomeProps {}

export function Movie({ title, overview, poster_path, clik }: MovieProps) {
  return (
    <div className="movie">
      <img
        src={`https://image.tmdb.org/t/p/w200${poster_path}`}
        alt="imagem do filme"
      />
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
