import { useSelector } from 'react-redux';
import { selectIsSignedIn } from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
  const isSignIn = useSelector(selectIsSignedIn);

  return (
    <>
      {isSignIn ? <Navigate to={'/dashboard'} /> : <Navigate to={'/login'} />}
    </>
  );
};

export default HomePage;
