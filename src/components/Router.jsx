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
import GithubAuthorize from './GithubAuthMiddleware';
import { LinkedInCallback } from 'react-linkedin-login-oauth2';

const Router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Homepage/>,
      },
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
      {
        path: "/page-not-found",
        element: <P404/>,
        errorElement: <P404/>
      },
      {
        path: "/app/logout",
        element: <Logout/>,
      },
      {
        path: "/auth/github",
        element: <GithubAuthorize/>,
      },
      {
        path: "/auth/linkedin/callback",
        element: <LinkedInCallback />,
      },
      // {
      //   path: "/app/duracion-bateria",
      //   element: <DuracionBateria />,
      // }
    ]
  );

export default Router;