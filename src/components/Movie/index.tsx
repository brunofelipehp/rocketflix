import { HomeProps } from "../Home";
import "./styles.css";

interface MovieProps extends HomeProps {}

export function Movie({ title, overview, poster_path }: MovieProps) {
  return (
    <div className="movie">
      <img
        src={`https://image.tmdb.org/t/p/w200${poster_path}`}
        alt="imagem do filme"
      />
      <div>
        <h1>{title}</h1>
        <p>{overview}</p>
      </div>
    </div>
  );
}
