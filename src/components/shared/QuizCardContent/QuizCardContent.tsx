/* eslint-disable consistent-return */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

import { TArtistData } from 'schemas/artistRelatedData_d';

import QuizPageContext from 'components/pages/QuizPage/QuizPageContext';

import {
  LAST_QUESTION_INDEX,
  MILLISECONDS_PER_QUESTION,
  SECONDS_PER_QUESTION,
} from 'utils/constants';
import { handleCorrectAnswer, handleGameOver } from 'utils/gameHelpers';
import QuizCardContentHeader from './QuizCardContentHeader';

import './QuizCardContent.scss';

interface IQuizCardContentProps {
  snippet: string;
  correctArtistId: number;
  artists: TArtistData[];
}

const QuizCardContent: React.FC<IQuizCardContentProps> = ({
  snippet,
  correctArtistId,
  artists,
}) => {
  const navigate = useNavigate();
  const { cardNumber, setCardNumber } = useContext(QuizPageContext);

  const [questionCountdown, setQuestionCountdown] = useState<number>(SECONDS_PER_QUESTION);

  useEffect(() => {
    // When artists are loaded, decrease remaining time
    if (artists?.length === 3) {
      const decreaseCountdown = setInterval(() => {
        setQuestionCountdown(questionCountdown > 0 ? questionCountdown - 1 : 0);
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

      return () => {
        setQuestionCountdown(SECONDS_PER_QUESTION);
        clearTimeout(questionTimer);
      };
    }
  }, [artists]);

  return (
    <Card
      title={<QuizCardContentHeader snippet={snippet} timeRemaining={questionCountdown} />}
      className="quiz-card-content"
    >
      {artists?.map((artist) => {
        return (
          <Button
            type="default"
            shape="round"
            className="quiz-card-button"
            icon={<PlayCircleOutlined />}
            size="large"
            key={artist?.artist_id}
            onClick={() => {
              if (artist?.artist_id === correctArtistId) handleCorrectAnswer();
              setCardNumber(cardNumber + 1);
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
