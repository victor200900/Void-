import { Routes, Route} from "react-router-dom";
import MovieCard from "./component/MovieCard";
import About from "./component/About";
import Contact from "./component/Contact";

import "./App.css";

function App() {
  return (
    <>
    <Routes>
      <Route path = "/" element= {<MovieCard/>}/>
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    </>
  );
}

export default App;
