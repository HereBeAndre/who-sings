import BaseLayout from 'components/layout/BaseLayout/BaseLayout';
import Page from 'components/layout/Page/Page';

const WallOfFamePage: React.FC = (props) => {
  return (
    <Page {...props}>
      <BaseLayout>
        <div className="quiz-page-container">Wall of Fame Page</div>
      </BaseLayout>
    </Page>
  );
};

export default WallOfFamePage;
