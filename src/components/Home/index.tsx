import "./styles.css";
import imageHeader from "../../assets/favico/android-chrome-512x512.png";

export function Home() {
  return (
    <div>
      <img src={imageHeader} alt="" />
      <h1>Não sabe oque assistir</h1>
    </div>
  );
}
