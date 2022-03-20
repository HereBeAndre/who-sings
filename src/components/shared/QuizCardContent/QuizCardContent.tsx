import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

import { TArtistData } from 'schemas/artistRelatedData_d';

import { AppRoutes } from 'components/routes/urls';
import QuizPageContext from 'components/pages/QuizPage/QuizPageContext';

import {
  getFromStorageAndParse,
  reduceIntegersArray,
  stringifyAndSetToStorage,
} from 'utils/functions';
import { CORRECT_ANSWER_POINTS } from 'utils/constants';

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
    <Card title={snippet} style={{ width: 600 }}>
      {artists?.map((artist) => {
        return (
          <Button
            type="default"
            shape="round"
            icon={<PlayCircleOutlined />}
            size="large"
            key={artist?.artist_id}
            // TODO Extract into helper function
            onClick={() => {
              if (artist?.artist_id === correctArtistId) {
                const currentScore = getFromStorageAndParse('score');
                const updatedScore = Number(currentScore) + CORRECT_ANSWER_POINTS;
                stringifyAndSetToStorage('score', updatedScore);
              }

              // cardNumber is 0 indexed - Condition marks when game is over
              if (cardNumber === 4) {
                // Update last games list
                const username = getFromStorageAndParse('username');
                const score = getFromStorageAndParse('score');
                const userLastGames = getFromStorageAndParse('lastGames');
                const updatedUserGames = [...userLastGames, score];
                stringifyAndSetToStorage('lastGames', updatedUserGames);
                const userMaxScore = reduceIntegersArray(updatedUserGames);
                const updatedUserRecord = { lastGames: updatedUserGames, highscore: userMaxScore };

                stringifyAndSetToStorage(username, updatedUserRecord, 'sessionStorage');

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
