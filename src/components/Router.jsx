// router.js
import { createBrowserRouter } from 'react-router-dom';
import App from '../pages/App';
import Login from '../pages/Login';
import P404 from '../pages/P404';
import SignUp from '../pages/SignUp';
import ProtectedRoute from './ProtectedRoute';

const Router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Login/>,
        errorElement: <P404/>
      },
      {
        path: "/login",
        element: <Login/>,
        errorElement: <P404/>
      },
      {
        path: "/registro",
        element: <SignUp/>,
        errorElement: <P404/>
    },
    {
        path: '/app',
        element: (
            <ProtectedRoute>
                <App />
            </ProtectedRoute>
        ),
    },
      // {
      //   path: "/change-password",
      //   element: <ResetPassword/>
      // },
      // {
      //   path: "/password-gallery",
      //   element: <PasswordGallery/>
      // },
      // {
      //   path: "/dash",
      //   element: <Dashboard/>
      // },
      {
        path: "/page-not-found",
        element: <P404/>,
        errorElement: <P404/>
      },
    ]
  );

export default Router;