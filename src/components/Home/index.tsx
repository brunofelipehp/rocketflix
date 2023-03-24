import "./styles.css";
import imageHeader from "../../assets/favico/android-chrome-512x512.png";
import imageButton from "../../assets/favico/favicon-32x32.png";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { Movie } from "../Movie";

export interface HomeProps {
  movieId?: number | null;
  title?: string;
  posterPath?: string;
  overview?: string;
}

export function Home() {
  const [title, setTitle] = useState<string>();
  const [overview, setOverview] = useState<string>();
  const [poster, setPoster] = useState<string>();
  const [searchMovieId, setSearchMovieId] = useState<number | null>();
  const [findMovie, setFindMovie] = useState<number>();
  const [loading, setLoading] = useState(false);

  async function handleMovies() {
    const movieList = await api.get(`/movie/popular`);
    const moviesTotal = movieList.data.total_results;
    const movieHandleId = Math.floor(Math.random() * moviesTotal);

    setFindMovie(movieHandleId);
  }

  useEffect(() => {
    const handleMovies = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/movie/${findMovie}`);
        const {
          id,
          title,
          overview,
          poster_path: posterPath,
          adult,
        } = response.data;
        if (!adult) {
          setSearchMovieId(id);
          setTitle(title);
          setOverview(overview);
          setPoster(posterPath);
        } else {
          setSearchMovieId(null);
        }
      } catch (error) {
        if (error === 404) {
          console.clear();
          setSearchMovieId(null);
        }
      }
      handleMovies();
      setLoading(false);
    };
  }, [findMovie]);

  return (
    <div className="home">
      <img className="imageTitle" src={imageHeader} alt="" />
      <h1>Não sabe o que assistir</h1>

      {findMovie && (
        <Movie
          movieId={searchMovieId}
          title={title}
          overview={overview}
          posterPath={poster}
        />
      )}

      {!loading && (
        <button onClick={handleMovies}>
          <img src={imageButton} alt="icone do botão" />
          Encontrar filme
        </button>
      )}
      {loading && (
        <button onClick={handleMovies} disabled>
          <img src={imageButton} alt="icone do botão" />
          Buscando...
        </button>
      )}
      <p>
        Clique em "Encontrar filme" que traremos informações de algum filme para
        você assistir hoje.
      </p>
    </div>
  );
}
