import React from 'react';

import BaseLayout from 'components/layout/BaseLayout/BaseLayout';
import Page from 'components/layout/Page/Page';

import './QuizPage.scss';

const QuizPage: React.FC = (props) => {
  return (
    <Page {...props}>
      <BaseLayout>
        <div className="quiz-page-container">Quiz Page</div>
      </BaseLayout>
    </Page>
  );
};

export default QuizPage;
