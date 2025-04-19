import style from './SignInPage.module.scss';
import pill from '../../assets/images/pill.png';
import pill2x from '../../assets/images/pill@2x.png';
import SignInForm from '../../components/SignInForm/SignInForm';

const SignInPage = () => {
  return (
    <div className={style.signInPage}>
      <h1>
        Your medication,
        <div className={style.pill}>
          <img
            src={pill}
            srcSet={`${pill} 1x, ${pill2x} 2x`}
            alt="pill illustration"
          />
        </div>
        delivered Say goodbye to all <span>your healthcare</span> worries with
        us
      </h1>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
