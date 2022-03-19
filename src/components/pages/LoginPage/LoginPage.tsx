import { useNavigate } from 'react-router-dom';

import BaseLayout from 'components/layout/BaseLayout/BaseLayout';
import Page from 'components/layout/Page/Page';
import LoginCard, { TUserFormData } from 'components/shared/LoginCard/LoginCard';

import { stringifyAndSetToStorage } from 'utils/functions';
import { AppRoutes } from 'components/routes/urls';

const LoginPage: React.FC = (props) => {
  const navigate = useNavigate();

  const onLogin = (user: TUserFormData) => {
    const { username } = user;
    // ? Might as well stringify an object - tricky to stringify and parse though, prefer to store separately
    stringifyAndSetToStorage('username', username);
    stringifyAndSetToStorage('score', 0);
    stringifyAndSetToStorage('highscore', 0);
    navigate(AppRoutes.QUIZ);
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
