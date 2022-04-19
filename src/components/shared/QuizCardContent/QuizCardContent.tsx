/* eslint-disable consistent-return */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

import { TArtistData, TBasicArtistData } from 'schemas/musixMatchData/artistRelatedData_d';

import QuizPageContext from 'components/pages/QuizPage/QuizPageContext';

import {
  LAST_QUESTION_INDEX,
  MILLISECONDS_PER_QUESTION,
  SECONDS_PER_QUESTION,
  USER_CHOICE_FEEDBACK_MILLISECONDS,
} from 'utils/constants';
import { handleCorrectAnswer, handleCountdownColor, handleGameOver } from 'utils/gameHelpers';

import QuizCardContentHeader from './partials/QuizCardContentHeader';
import './QuizCardContent.scss';

interface IQuizCardContentProps {
  snippet: string;
  correctArtistId: number;
  artists: (TArtistData | TBasicArtistData)[];
}

const QuizCardContent: React.FC<IQuizCardContentProps> = ({
  snippet,
  correctArtistId,
  artists,
}) => {
  const navigate = useNavigate();
  const { cardNumber, setCardNumber } = useContext(QuizPageContext);

  const [questionCountdown, setQuestionCountdown] = useState<number>(SECONDS_PER_QUESTION);
  const [countdownColor, setCountdownColor] = useState<string>('green');

  /* USAGE ~ State responsible for keeping track whether user selects correct or wrong artist
      For the time being, it holds a single key-value pair, like such: { 0 : true }
      Where -> key: index of selected artist
            -> value: `true` equals correct choice, `false` equals wrong choice
  */
  const [artistsMap, setArtistsMap] = useState<any>({});

  useEffect(() => {
    // When artists are loaded, decrease remaining time
    if (artists?.length === 3) {
      const decreaseCountdown = setInterval(() => {
        setQuestionCountdown(questionCountdown > 0 ? questionCountdown - 1 : 0);
        setCountdownColor(handleCountdownColor(questionCountdown));
      }, 1000);

      return () => {
        clearInterval(decreaseCountdown);
      };
    }
  });

  useEffect(() => {
    cardNumber === LAST_QUESTION_INDEX && handleGameOver(navigate);
  }, [cardNumber]);

  useEffect(() => {
    // Start timer when all artist options are available
    if (artists?.length === 3) {
      const questionTimer = setTimeout(() => {
        setCardNumber(cardNumber + 1);
      }, MILLISECONDS_PER_QUESTION);

      // Perform clean-up upon new song snippet
      return () => {
        setQuestionCountdown(SECONDS_PER_QUESTION);
        setCountdownColor('green');
        clearTimeout(questionTimer);
        setArtistsMap({});
      };
    }
  }, [artists]);

  const moveToNextQuestion = () => {
    const answerFeedbackTimeout = setTimeout(
      () => setCardNumber(cardNumber + 1),
      USER_CHOICE_FEEDBACK_MILLISECONDS,
    );

    return () => {
      clearTimeout(answerFeedbackTimeout);
    };
  };

  return (
    <Card
      title={
        <QuizCardContentHeader
          snippet={snippet}
          timeRemaining={questionCountdown}
          className={`quiz-card-content-header ${countdownColor}`}
        />
      }
      className="quiz-card-content"
    >
      {artists?.map((artist, i) => {
        return (
          <Button
            type="default"
            shape="round"
            className={
              Object.values(artistsMap).length
                ? 'quiz-card-button__submitted-answer'
                : `quiz-card-button`
            }
            id={`${artistsMap[i]}`}
            icon={<PlayCircleOutlined />}
            size="large"
            // TODO Fix following line
            key={artist?.artist_id || Math.random() * 100000000}
            onClick={() => {
              setArtistsMap((prev: any) => ({
                ...prev,
                [i]: artist?.artist_id === correctArtistId,
              }));
              if (artist?.artist_id === correctArtistId) handleCorrectAnswer();
              moveToNextQuestion();
            }}
          >
            {artist?.artist_name}
          </Button>
        );
      })}
    </Card>
  );
};

export default QuizCardContent;
