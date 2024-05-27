import { useCookies } from 'react-cookie'
import { nanoid } from 'nanoid'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import HomePage from './page/HomePage';
import RootLayout from './page/RootPage';

import TopicPage from './page/TopicPage';
import SingPage from './page/SingPage';
import ProfilePage from './page/ProfilePage';



function App() {

  const [ cookies, setCookie ] = useCookies(['uuid-user']);

  if (!cookies['uuid-user']) {
    setCookie( 'uuid-user', nanoid() );
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/topic', element: <TopicPage /> },
        { path: '/sing', element: <SingPage /> },
        { path: '/profile', element: <ProfilePage /> },
      ]
    }
    
  ]);

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
