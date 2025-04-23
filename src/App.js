import { Header } from './components/Header';
import { NewsDetail } from './components/NewsDetail';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchNewsDetails } from './features/newsDetailsSlice';
import './App.css';

function App() {

  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNewsDetails()); // Dispatch the action to fetch news details
    }, [dispatch]);
    
  return (
    <div className="App">
      <Header/>
      <NewsDetail/>
    </div>
  );
}

export default App;
