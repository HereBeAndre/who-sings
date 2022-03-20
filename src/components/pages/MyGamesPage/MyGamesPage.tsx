import BaseLayout from 'components/layout/BaseLayout/BaseLayout';
import Page from 'components/layout/Page/Page';

const MyGamesPage: React.FC = (props) => {
  return (
    <Page {...props}>
      <BaseLayout>
        <div className="login-page-container">My Games Page</div>
      </BaseLayout>
    </Page>
  );
};

export default MyGamesPage;
