import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import BaseLayout from 'components/layout/BaseLayout/BaseLayout';
import Page from 'components/layout/Page/Page';
import LoginCard, { TUserFormData } from 'components/shared/LoginCard/LoginCard';
import QuizPageContext from 'components/pages/QuizPage/QuizPageContext';

import { initializeGame } from 'utils/gameHelpers';

const LoginPage: React.FC = (props) => {
  const navigate = useNavigate();
  const { setCardNumber } = useContext(QuizPageContext);

  const onLogin = (user: TUserFormData) => {
    setCardNumber(0);
    initializeGame(user, navigate);
  };

  return (
    <Page {...props}>
      <BaseLayout>
        <div className="login-page-container">
          <LoginCard onFinish={onLogin} />
        </div>
      </BaseLayout>
    </Page>
  );
};

export default LoginPage;
