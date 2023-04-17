import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import CourseStructure from './Components/CourseStructure';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/Home' element={<Home />} />
          <Route path='/CourseStructure' element={<CourseStructure />} />
          
        </Routes>  
      </Router>
    </>
  );
}

export default App;