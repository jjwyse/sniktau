import './App.css';
import Map from "./pages/Map";
import Login from "./pages/Login";
import OAuth from "./pages/OAuth";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={ <Login /> } />
        <Route exact path="/oauth" element={ <OAuth /> } />
        <Route path="/map" element={ <Map /> } />
      </Routes>
    </Router>
  );
}

export default App;
