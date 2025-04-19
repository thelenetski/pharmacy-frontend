import { useNavigate } from 'react-router-dom';
import css from './NotFoundPage.module.scss';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={css.main}>
      <button
        style={{
          border: '1px solid #ccc',
          padding: '5px 10px',
          borderRadius: '15px',
        }}
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <h2>Not Found page</h2>
    </div>
  );
};

export default NotFound;
