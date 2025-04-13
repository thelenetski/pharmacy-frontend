import css from './Loader.module.scss'; // Подключаем CSS-модуль

const Loader = () => {
  return (
    <div className={css.loaderWrap}>
      <div className={css.loader}></div>
    </div>
  );
};

export default Loader;
