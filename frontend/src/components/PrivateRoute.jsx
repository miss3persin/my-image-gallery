// import {Navigate, Outlet} from 'react-router-dom';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import {auth} from '../firebase';


// const PrivateRoute = () => {
//     const [user] = useAuthState(auth);
//   return user ? <Outlet/> : <Navigate to='/' replace/>
// }

// export default PrivateRoute


import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Loader from '../components/Loader';

const PrivateRoute = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  if (loading) {
    <Loader/> // or a loading indicator if you prefer
  }

  if (user) {
    return <Outlet />;
  } else {
    // Get the current route from the URL
    const currentRoute = window.location.pathname;

    // Redirect to a different route based on the current route
    if (currentRoute === '/profile') {
      navigate('/'); // Redirect to login page if user tries to access /profile
    } else if (currentRoute === '/user'){
      navigate('/'); // Redirect to home page for any other route
    } else {
      navigate('/'); // Redirect to home page for any other route
    }
  }
};

export default PrivateRoute;
