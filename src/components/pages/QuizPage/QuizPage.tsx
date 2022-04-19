import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';

import BaseLayout from 'components/layout/BaseLayout/BaseLayout';
import Page from 'components/layout/Page/Page';
import QuizCard from 'components/shared/QuizCard/QuizCard';
import ErrorHandler from 'components/shared/ErrorHandler/ErrorHandler';

import { TTrackGameData } from 'schemas/musixMatchData/chartTrackData_d';

import { fetchGameData } from 'api/api';

import { showNotificationPopup } from 'utils/ui';

import QuizPageContext from './QuizPageContext';

import './QuizPage.scss';

const QuizPage: React.FC = (props) => {
  const [tracks, setTracks] = useState<TTrackGameData[]>([]);
  const [isTracksReqLoading, setIsTracksReqLoading] = useState<boolean>(false);
  const [tracksReqError, setTracksReqError] = useState<string>('');

  const [cardNumber, setCardNumber] = useState(0);
  const value = { cardNumber, setCardNumber };

  useEffect(() => {
    setIsTracksReqLoading(true);
    fetchGameData().then(
      (response: any) => {
        setIsTracksReqLoading(false);
        setTracks(response);
        /* Handle errors here instead of a catch() block so that we don't swallow
    exceptions from actual bugs in component */
      },
      (err) => {
        setIsTracksReqLoading(false);
        // Mock error
        setTracksReqError('Error');
      },
    );
    return () => {
      setIsTracksReqLoading(false);
    };
  }, []);

  useEffect(() => {
    tracksReqError && showNotificationPopup('Oops, something went wrong', 'Please try again...');
  }, [tracksReqError]);

  return (
    <QuizPageContext.Provider value={value}>
      <Page {...props}>
        <BaseLayout>
          <div className="quiz-page-container">
            <Spin spinning={isTracksReqLoading}>
              {tracks?.length ? (
                <QuizCard track={tracks[cardNumber]} />
              ) : (
                <ErrorHandler error={tracksReqError} />
              )}
            </Spin>
          </div>
        </BaseLayout>
      </Page>
    </QuizPageContext.Provider>
  );
};

export default QuizPage;
