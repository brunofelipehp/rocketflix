import { useEffect, useState } from "react";

import { MovieCard } from "../MovieCard";

import { api } from "../../lib/axios";

import imageHeader from "../../assets/favico/android-chrome-512x512.png";
import imageButton from "../../assets/favico/favicon-32x32.png";

import "./styles.css";

export function Home() {
  const [title, setTitle] = useState<string>();
  const [overview, setOverview] = useState<string>();
  const [poster, setPoster] = useState<string>();
  const [movieId, setMovieId] = useState<number | null>();
  const [findMovie, setFindMovie] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);

  const findId = () => {
    const movieHandleId = Math.floor(Math.random() * 8000);
    setFindMovie(movieHandleId);
  };

  const handleMovies = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/movie/${findMovie}?language=pt-BR`);
      const {
        id,
        title,
        overview,
        poster_path: posterPath,
        adult,
      } = response.data;

      if (!adult) {
        setMovieId(id);
        setTitle(title);
        setOverview(overview);
        setPoster(posterPath);
      } else {
        setMovieId(null);
      }
    } catch (error) {
      setMovieId(null);
      console.error("Filme não encontrado", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (findMovie) {
      handleMovies();
    }
  }, [findMovie]);

  return (
    <div className="home">
      <img className="imageTitle" src={imageHeader} alt="" />
      <h1>Não sabe o que assistir</h1>

      {findMovie && (
        <MovieCard
          id={movieId}
          title={title}
          overview={overview}
          poster_path={poster}
        />
      )}

      <button onClick={findId} disabled={loading}>
        <img src={imageButton} alt="icone do botão" />
        {loading ? "Buscando..." : "Encontrar filme"}
      </button>
      <p>
        Clique em "Encontrar filme" que traremos informações de algum filme para
        você assistir hoje.
      </p>
    </div>
  );
}
