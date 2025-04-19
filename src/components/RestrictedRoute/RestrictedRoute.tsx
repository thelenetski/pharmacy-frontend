import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsSignedIn } from '../../redux/auth/selectors.js';
import { ReactNode } from 'react';

interface RestrictedRouteProps {
  component: ReactNode;
  redirectTo: string;
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({
  component: Component,
  redirectTo = '/',
}) => {
  const IsSignedIn = useSelector(selectIsSignedIn);

  return IsSignedIn ? <Navigate to={redirectTo} /> : Component;
};

export default RestrictedRoute;
