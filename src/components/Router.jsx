// router.js
import { createBrowserRouter } from 'react-router-dom';
import App from '../pages/App';
import P404 from '../pages/P404';
import SignUp from '../pages/SignUp';
import ProtectedRoute from './ProtectedRoute';
import Homepage from '../pages/Homepage';
import AuthenticatedRoute from './AuthenticatedRoute';
import Logout from './Logout';
import ForgotPassword from '../pages/ForgotPassword';
import ChangePassword from '../pages/ChangePassword';

const Router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Homepage/>,
      },
      // {
      //   path: "/",
      //   element: <Login/>,
      //   errorElement: <P404/>
      // },
      {
        path: "/login",
        element: <AuthenticatedRoute/>,
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
      {
        path: "/recuperacion",
        element: <ForgotPassword/>
      },
      {
        path: "/cambiar-contrasena",
        element: <ChangePassword/>
      },
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
      {
        path: "/app/logout",
        element: <Logout/>,
      }
    ]
  );

export default Router;