import "./styles.css";
import imageHeader from "../../assets/favico/android-chrome-512x512.png";
import imageButton from "../../assets/favico/favicon-32x32.png";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { Movie } from "../Movie";
import { log } from "console";

export interface HomeProps {
  title?: string;
  poster_path?: string;
  overview?: string;
}

export function Home() {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [poster, setPoster] = useState("");
  const [movieId, setMovieId] = useState();
  const [findMovie, setFindMovie] = useState<number>(12);

  async function handleMovies() {
    const movieList = await api.get(`/movie/changes`);
    const moviesTotal = movieList.data.results.length;
    const movieHandleId = Math.floor(Math.random() * moviesTotal);
    setFindMovie(movieHandleId);
  }

  useEffect(() => {
    api
      .get(`/movie/${findMovie}`)
      .then((response) => {
        console.log(response.status);
        const { title, overview, poster_path } = response.data;
        setMovieId(response.data.id);
        setTitle(title);
        setOverview(overview);
        setPoster(poster_path);

        if (response.status === 404) {
          return new Error("não encontrou qualquer resultado");
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [findMovie]);

  return (
    <div className="home">
      <img className="imageTitle" src={imageHeader} alt="" />
      <h1>Não sabe oque assistir</h1>

      {movieId && (
        <Movie title={title} overview={overview} poster_path={poster} />
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
