import { FC } from "react";
import "./App.css";
import Header from "./Header";
import Synthesizer from "./Synthesizer";

const App: FC = () => {
  return (
    <div className="App">
      <Header />
      <Synthesizer />
    </div>
  );
};

export default App;