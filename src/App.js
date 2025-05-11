import { NewsDetails } from './components/NewsDetails';
import{ Root } from './components/Root';
import { SearchFallback } from './components/SearchFallback';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.scss';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<NewsDetails />} />
      <Route path="search" element={<SearchFallback/>} />
    </Route>
  )
);

function App() {
    
  return (
    <div className="App">
      <RouterProvider router={router} />  
    </div>
  );
}

export default App;
