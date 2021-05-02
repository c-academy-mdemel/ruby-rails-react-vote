import './App.css';
import Algo from "./pages/Algo";
import Home from "./pages/Home";
import Vote from "./pages/Vote";
import { BrowserRouter, Route } from "react-router-dom";
import LastPage from "./pages/LastPage";


function App() {
  return (
    <BrowserRouter>
      <Route exact path="/last" component={LastPage} />
      <Route exact path="/" component={Home} />
      <Route exact path="/vote" component={Vote} />
      <Route exact path="/algo" component={Algo} />
    </BrowserRouter>
  );
}

export default App;
