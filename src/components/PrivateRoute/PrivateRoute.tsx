import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsSignedIn } from '../../redux/auth/selectors';
import { ReactNode } from 'react';

interface PrivateRouteProps {
  component: ReactNode;
  redirectTo: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  redirectTo = '/',
}) => {
  const IsSignedIn = useSelector(selectIsSignedIn);

  return IsSignedIn ? Component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
