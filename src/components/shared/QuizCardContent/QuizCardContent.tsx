import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

import { TArtistData } from 'schemas/artistRelatedData_d';

import { AppRoutes } from 'components/routes/urls';
import QuizPageContext from 'components/pages/QuizPage/QuizPageContext';

import { getFromStorageAndParse, stringifyAndSetToStorage } from 'utils/functions';
import { CORRECT_ANSWER_POINTS } from 'utils/constants';

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
  const { cardNumber, setCardNumber } = useContext(QuizPageContext);
  const navigate = useNavigate();
  return (
    <Card title={snippet} className="quiz-card-content">
      {artists?.map((artist) => {
        return (
          <Button
            type="default"
            shape="round"
            className="quiz-card-button"
            icon={<PlayCircleOutlined />}
            size="large"
            key={artist?.artist_id}
            // TODO Extract into helper function
            onClick={() => {
              if (artist?.artist_id === correctArtistId) {
                const currentScore = getFromStorageAndParse('score', 'sessionStorage');
                const updatedScore = Number(currentScore) + CORRECT_ANSWER_POINTS;
                stringifyAndSetToStorage('score', updatedScore, 'sessionStorage');
              }

              // cardNumber is 0 indexed - Condition marks when game is over
              if (cardNumber === 4) {
                const username = getFromStorageAndParse('username', 'sessionStorage');
                const score = getFromStorageAndParse('score', 'sessionStorage');
                const userLastGames = getFromStorageAndParse('lastGames', 'sessionStorage');
                const updatedUserGames = [...userLastGames, score];
                stringifyAndSetToStorage('lastGames', updatedUserGames, 'sessionStorage');
                const updatedUserRecord = { lastGames: updatedUserGames };

                stringifyAndSetToStorage(username, updatedUserRecord);

                navigate(AppRoutes.MY_GAMES);
                return;
              }
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
