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
      <h2>hello</h2>
    </div>
  );
}

export default App;
