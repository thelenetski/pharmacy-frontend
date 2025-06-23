import css from './HomePage.module.scss';
import { useSelector } from 'react-redux';
import { selectIsSignedIn } from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
  const isSignIn = useSelector(selectIsSignedIn);

  console.log('Home ...');

  return (
    <div className={css.homePage}>
      {isSignIn ? <Navigate to={'/dashboard'} /> : <Navigate to={'/login'} />}
    </div>
  );
};

export default HomePage;
