import React, { useEffect, useState } from 'react';

import BaseLayout from 'components/layout/BaseLayout/BaseLayout';
import Page from 'components/layout/Page/Page';
import QuizCard from 'components/shared/QuizCard/QuizCard';

import { TTrackData } from 'schemas/trackData_d';

import { fetchTracks } from 'api/api';
import QuizPageContext from './QuizPageContext';

import './QuizPage.scss';

const QuizPage: React.FC = (props) => {
  const [tracks, setTracks] = useState<TTrackData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [card, setCard] = useState(0);
  const value = { card, setCard };

  useEffect(() => {
    setIsLoading(true);
    fetchTracks().then(
      (response) => {
        setIsLoading(false);
        setTracks(response?.data?.message?.body?.track_list);
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
    <QuizPageContext.Provider value={value}>
      <Page {...props}>
        <BaseLayout>
          <div className="quiz-page-container">
            <QuizCard track={tracks[card]} />
          </div>
        </BaseLayout>
      </Page>
    </QuizPageContext.Provider>
  );
};

export default QuizPage;
