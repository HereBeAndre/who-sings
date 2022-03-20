import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

import { TArtistData } from 'schemas/artistRelatedData_d';

import { AppRoutes } from 'components/routes/urls';
import QuizPageContext from 'components/pages/QuizPage/QuizPageContext';

import { getFromStorageAndParse, stringifyAndSetToStorage } from 'utils/functions';
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
  const { card, setCard } = useContext(QuizPageContext);
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
            // TODO FIX LOGIC -> 1st check: if card === 4 return and redirect to user screen
            onClick={() => {
              if (artist?.artist_id === correctArtistId) {
                console.log('RIGHT ANSWER -> +100');
                const currentScore = getFromStorageAndParse('score');
                const updatedScore = Number(currentScore) + CORRECT_ANSWER_POINTS;
                stringifyAndSetToStorage('score', updatedScore);
              }

              card === 4 ? navigate(AppRoutes.MY_GAMES) : setCard(card + 1);
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
