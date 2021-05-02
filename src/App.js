import './App.css';
import Algo from "./pages/Algo";
import Home from "./pages/Home";
import Vote from "./pages/Vote";
import Arrow from "./pages/Arrow";
import { BrowserRouter, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Route exact path="/Arrow" component={Arrow} />
      <Route exact path="/" component={Home} />
      <Route exact path="/vote" component={Vote} />
      <Route exact path="/algo" component={Algo} />
    </BrowserRouter>
  );
}

export default App;
