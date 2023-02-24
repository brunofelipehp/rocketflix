import "./styles.css";
import imageHeader from "../../assets/favico/android-chrome-512x512.png";
import imageButton from "../../assets/favico/favicon-32x32.png";
import { useState } from "react";
import { api } from "../../lib/axios";
import { Movie } from "../Movie";

export interface HomeProps {
  title: string;
  poster_path: string;
  overview: string;
}

export function Home() {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [poster, setPoster] = useState("");

  async function handleMovies() {
    const movieList = await api.get(`/movie/changes`);
    const moviesTotal = movieList.data.results.length;
    const movies = Math.floor(Math.random() * moviesTotal);
    try {
      const response = await api.get(`/movie/${movies}`);
      const { title, overview, poster_path } = response.data;
      console.log(response.data.id);

      setTitle(title);
      setOverview(overview);
      setPoster(poster_path);
    } catch (error) {
      console.error("Ops, filme não encotrado!");
    }
  }

  return (
    <div className="home">
      <img className="imageTitle" src={imageHeader} alt="" />
      <h1>Não sabe oque assistir</h1>
      <Movie title={title} overview={overview} poster_path={poster} />
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
