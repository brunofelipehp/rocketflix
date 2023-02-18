import "./App.css";
import { Home } from "./components/Home";
import { api } from "./lib/axios";

function App() {
  //api.get("").then((response) => console.log(response.data));

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
