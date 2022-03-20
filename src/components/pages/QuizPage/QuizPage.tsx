import React, { useEffect, useState } from 'react';

import BaseLayout from 'components/layout/BaseLayout/BaseLayout';
import Page from 'components/layout/Page/Page';
import QuizCard from 'components/shared/QuizCard/QuizCard';

import { TChartTrackData } from 'schemas/chartTrackData_d';

import { fetchTracks } from 'api/api';
import QuizPageContext from './QuizPageContext';

import './QuizPage.scss';

const QuizPage: React.FC = (props) => {
  const [tracks, setTracks] = useState<TChartTrackData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [cardNumber, setCardNumber] = useState(0);
  const value = { cardNumber, setCardNumber };

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
            {tracks?.length ? <QuizCard track={tracks[cardNumber]} /> : <>Loading...</>}
          </div>
        </BaseLayout>
      </Page>
    </QuizPageContext.Provider>
  );
};

export default QuizPage;
