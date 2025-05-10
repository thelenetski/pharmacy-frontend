import { lazy, useEffect } from 'react';
import './App.scss';
import { selectIsRefreshing } from './redux/auth/selectors.ts';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './components/Loader/Loader.tsx';
import { Route, Routes } from 'react-router-dom';
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute.tsx';
import { refreshUser } from './redux/auth/operations.ts';
import SharedLayout from './components/SharedLayout/SharedLayout.tsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.tsx';
import { AppDispatch } from './redux/store.ts';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.tsx'));
const SignInPage = lazy(() => import('./pages/SignInPage/SignInPage.tsx'));
const DashboardPage = lazy(
  () => import('./pages/DasboardPage/DashboardPage.tsx')
);
const NotFoundPage = lazy(
  () => import('./pages/NotFoundPage/NotFoundPage.tsx')
);

function App() {
  const isRefreshing = useSelector(selectIsRefreshing);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const init = async () => {
      try {
        await dispatch(refreshUser());
      } catch (e) {
        console.log(e);
      }
    };

    init();
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <SharedLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <RestrictedRoute
              component={<SignInPage />}
              redirectTo="/dashboard"
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute component={<DashboardPage />} redirectTo="/login" />
          }
        />
        {/* <Route
              path="/dictionary"
              element={
                <PrivateRoute
                  component={<DictionaryPage />}
                  redirectTo="/login"
                />
              }
            />
            <Route
              path="/recommended"
              element={
                <PrivateRoute
                  component={<RecommendPage />}
                  redirectTo="/login"
                />
              }
            />
            <Route
              path="/training"
              element={
                <PrivateRoute
                  component={<TrainingPage />}
                  redirectTo="/login"
                />
              }
            /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SharedLayout>
  );
}

export default App;
