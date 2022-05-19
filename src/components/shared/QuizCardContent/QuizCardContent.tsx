/* eslint-disable consistent-return */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card } from 'antd';

import { TArtistData, TBasicArtistData } from 'schemas/musixMatchData/artistRelatedData_d';

import QuizPageContext from 'components/pages/QuizPage/QuizPageContext';

import {
  LAST_QUESTION_INDEX,
  MILLISECONDS_PER_QUESTION,
  SECONDS_PER_QUESTION,
} from 'utils/constants';
import { handleCountdownColor, handleGameOver } from 'utils/gameHelpers';

import QuizCardContentHeader from './partials/QuizCardContentHeader';
import { QuizCardContentButtonsMemoized } from './partials/QuizCardContentButtons';

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
      };
    }
  }, [artists]);

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
      <QuizCardContentButtonsMemoized artists={artists} correctArtistId={correctArtistId} />
    </Card>
  );
};

export default QuizCardContent;
