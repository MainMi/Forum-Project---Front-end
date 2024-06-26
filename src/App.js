import { useCookies } from 'react-cookie'
import { nanoid } from 'nanoid'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import HomePage from './page/HomePage';
import RootLayout from './page/RootPage';

import TopicPage from './page/TopicPage';
import SignPage from './page/SignPage';
import ProfilePage from './page/ProfilePage';
import AboutPage from './page/AboutPage';

function App() {
    const [cookies, setCookie] = useCookies(['uuid-user']);
    if (!cookies['uuid-user']) {
        setCookie('uuid-user', nanoid());
    }

    document.title = 'Forum';

    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            children: [
                { path: '/', element: <HomePage /> },
                { path: '/about', element: <AboutPage /> },
                { path: '/topic', element: <TopicPage /> },
                { path: '/sign', element: <SignPage /> },
                { path: '/profile', element: <ProfilePage /> },
            ]
        }

    ]);

    return (
        <RouterProvider router={router} />
    );
}

export default App;
