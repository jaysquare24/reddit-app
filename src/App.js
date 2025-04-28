import { Header } from './components/Header';
import { NewsDetail } from './components/NewsDetail';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchNewsRep } from './features/newsDetailsSlice';
import { fetchCommentsRep } from './features/commentsSlice';


import './App.css';

function App() {
  

  const dispatch = useDispatch(); // Initialize the dispatch function
    

  useEffect(() => {
    dispatch(fetchNewsRep()); // Dispatch the action to fetch news details
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCommentsRep()); // Dispatch the action to fetch news details
  }, [dispatch]);
    
    
  return (
    <div className="App">
      <Header/>
      <NewsDetail/>
    </div>
  );
}

export default App;
