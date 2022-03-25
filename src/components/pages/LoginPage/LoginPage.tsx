import { useNavigate } from 'react-router-dom';

import BaseLayout from 'components/layout/BaseLayout/BaseLayout';
import Page from 'components/layout/Page/Page';
import LoginCard, { TUserFormData } from 'components/shared/LoginCard/LoginCard';

import { initializeGame } from 'utils/gameHelpers';

const LoginPage: React.FC = (props) => {
  const navigate = useNavigate();

  const onLogin = (user: TUserFormData) => initializeGame(user, navigate);

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
