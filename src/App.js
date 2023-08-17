// import logo from './logo.svg';
// import './App.css';
import { useEffect } from 'react';
import { fetchUpcomingMovies } from './utility/api';

function App() {

  useEffect(() => {
    fetchUpcomingMovies(1).then((data) => {
      console.log("data", data);
    })
  }, []);

  return (
    <div>
      
    </div>
  );
}

export default App;
