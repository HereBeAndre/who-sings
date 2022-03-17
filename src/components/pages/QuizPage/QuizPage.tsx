import React, { useEffect, useState } from 'react';

import BaseLayout from 'components/layout/BaseLayout/BaseLayout';
import Page from 'components/layout/Page/Page';

import { fetchTracks } from 'api/api';

import './QuizPage.scss';

const QuizPage: React.FC = (props) => {
  // ! TODO: Fix type any
  const [tracks, setTracks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    fetchTracks().then(
      (response) => {
        setIsLoading(false);
        setTracks(response.data.message.body.track_list);
      },
      /* Handle errors here instead of a catch() block so that we don't swallow
    exceptions from actual bugs in component */
      (err) => {
        setIsLoading(false);
        // Mock error
        setError(err?.message);
      },
    );
  }, []);

  return (
    <Page {...props}>
      <BaseLayout>
        <div className="quiz-page-container">Quiz Page</div>
      </BaseLayout>
    </Page>
  );
};

export default QuizPage;
