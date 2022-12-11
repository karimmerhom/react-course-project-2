import "./App.css";
import HomePage from "./pages/home.page"
import SearchPage from "./pages/search.page"
import {Routes , Route} from 'react-router-dom';

function App() {

  return (
    <div >
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Search' element={<SearchPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
