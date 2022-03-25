import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';

import BaseLayout from 'components/layout/BaseLayout/BaseLayout';
import Page from 'components/layout/Page/Page';
import QuizCard from 'components/shared/QuizCard/QuizCard';
import ErrorHandler from 'components/shared/ErrorHandler/ErrorHandler';

import { TChartTrackData } from 'schemas/musixMatchData/chartTrackData_d';

import { fetchTracks } from 'api/api';

import { showNotificationPopup } from 'utils/ui';
import { generateRandomNumber } from 'utils/functions';
import { BASE_PAGE_NUMBER } from 'utils/constants';

import QuizPageContext from './QuizPageContext';

import './QuizPage.scss';

const QuizPage: React.FC = (props) => {
  const [tracks, setTracks] = useState<TChartTrackData[]>([]);
  const [isTracksReqLoading, setIsTracksReqLoading] = useState<boolean>(false);
  const [tracksReqError, setTracksReqError] = useState<string>('');

  const [cardNumber, setCardNumber] = useState(0);
  const value = { cardNumber, setCardNumber };

  useEffect(() => {
    setIsTracksReqLoading(true);
    fetchTracks(generateRandomNumber(BASE_PAGE_NUMBER)).then(
      (response) => {
        setIsTracksReqLoading(false);
        setTracks(response?.data?.message?.body?.track_list);
      },
      /* Handle errors here instead of a catch() block so that we don't swallow
    exceptions from actual bugs in component */
      (err) => {
        setIsTracksReqLoading(false);
        // Mock error
        setTracksReqError('Error');
      },
    );
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
