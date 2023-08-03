import { useEffect, useState } from "react";

import codarImg from "../../assets/poster.jpg";

import "./styles.css";

interface MovieCardProps {
  id?: number | null;
  overview?: string;
  title?: string;
  poster_path?: string;
}

export function MovieCard({
  id: movieId,
  title,
  overview,
  poster_path: posterPath,
}: MovieCardProps) {
  const [image, setImage] = useState<string>(
    movieId !== null && posterPath
      ? `https://image.tmdb.org/t/p/w200${posterPath}`
      : codarImg
  );

  useEffect(() => {
    setImage(
      movieId !== null && posterPath
        ? `https://image.tmdb.org/t/p/w200${posterPath}`
        : codarImg
    );
  }, [movieId, posterPath]);

  return (
    <div className="movie">
      <img src={image} alt="imagem do filme" />
      <div className="about">
        <h2>
          {movieId !== null
            ? title
            : "Ops, hoje não é dia de assistir filme. Bora codar! 🚀"}
        </h2>
        {movieId !== null && <p>{overview}</p>}
      </div>
    </div>
  );
}
