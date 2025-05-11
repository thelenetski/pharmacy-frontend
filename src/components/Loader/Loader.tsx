import { useEffect, useState } from 'react';
import css from './Loader.module.scss'; // Подключаем CSS-модуль

const Loader = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={css.loaderWrap}>
      <div className={css.loader}></div>
      {showMessage && (
        <p className={css.message}>Please wait until render-backend is up</p>
      )}
    </div>
  );
};

export default Loader;
