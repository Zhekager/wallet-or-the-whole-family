import RegistrationForm from '../../components/AuthForms/RegistrationForm';
import AuthHeading from '../../components/AuthHeading';
import AuthNav from '../../components/AuthForms/AuthNav';
import LoginGoogle from '../../components/AuthForms/GoogleAuth';
import BgPageContainer from '../../components/BgPageContainer';
import ImgContentContainer from '../../components/AuthForms/ImgContentContainer';
import AuthContentContainer from '../../components/AuthForms/AuthContentContainer';

import useSizeScreen from '../../hooks/useSizeScreen';
import { SignupImgPage } from '../../components/IconBtn/SignupImgPage';

import styles from './RegistrationPage.module.scss';

export default function RegistrationPage() {
  const sizeScreen = useSizeScreen();

  return (
    <BgPageContainer bgContainer="BgSignupPageContainer">
      <ImgContentContainer>
        {sizeScreen >= 768 && sizeScreen < 1280 && (
          <SignupImgPage svg={styles.svgSignup} />
        )}
        {sizeScreen >= 1280 && <SignupImgPage svg={styles.svgSignup} />}
      </ImgContentContainer>

      <AuthContentContainer authContainer="SignupContainer">
        <AuthContentContainer authContainer="SignupFormContainer">
          <AuthHeading text="Wallet" />
          <RegistrationForm />
          <LoginGoogle />
          <AuthNav content="Log in" path="/login" />
        </AuthContentContainer>
      </AuthContentContainer>
    </BgPageContainer>
  );
}