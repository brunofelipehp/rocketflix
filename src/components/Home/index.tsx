import "./styles.css";
import imageHeader from "../../assets/favico/android-chrome-512x512.png";
import imageButton from "../../assets/favico/favicon-32x32.png";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { Movie } from "../Movie";
import { log } from "console";

export interface HomeProps {
  title: string;
  poster_path?: string;
  overview?: string;
  clik: boolean;
}

export function Home() {
  const [title, setTitle] = useState<string>("");
  const [overview, setOverview] = useState("");
  const [poster, setPoster] = useState("");
  const [movieId, setMovieId] = useState();
  const [cliked, setCliked] = useState(false);
  const [findMovie, setFindMovie] = useState<number>();

  async function handleMovies() {
    const movieList = await api.get(`/movie/popular`);
    const moviesTotal = movieList.data.total_results;
    const movieHandleId = Math.floor(Math.random() * moviesTotal);

    setFindMovie(movieHandleId);
  }

  useEffect(() => {
    api
      .get(`/movie/${findMovie}`)
      .then((response) => {
        const { title, overview, poster_path, id, adult } = response.data;
        if (!adult) {
          setMovieId(id);
          setTitle(title);
          setOverview(overview);
          setPoster(poster_path);
          setCliked(true);
        }
      })
      .catch(function (error) {
        if (error.response.data.status_code) {
          console.clear();
        }
        setCliked(false);
      });
  }, [findMovie]);

  return (
    <div className="home">
      <img className="imageTitle" src={imageHeader} alt="" />
      <h1>Não sabe oque assistir</h1>

      {movieId && (
        <Movie
          title={title}
          overview={overview}
          poster_path={poster}
          clik={cliked}
        />
      )}
      <button onClick={handleMovies}>
        <img src={imageButton} alt="icone do botão" />
        Encontrar filme
      </button>
      <p>
        Clique em "Encontrar filme" que traremos informações de algum filme para
        você assistir hoje.
      </p>
    </div>
  );
}
