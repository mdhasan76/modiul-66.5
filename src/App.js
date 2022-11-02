import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Add from './components/Add';
import Home from './components/Home';
import Update from './components/Update';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/add',
      element: <Add />
    },
    {
      path: '/update/:id',
      loader: ({ params }) => fetch(`http://localhost:5000/update/${params.id}`),
      element: <Update />
    }
  ])
  return (
    <div className="App w-50 mx-auto">
      <RouterProvider router={router}>

      </RouterProvider>
    </div>
  );
}

export default App;
