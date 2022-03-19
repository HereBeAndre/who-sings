import { Button, Card } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

import { TArtistData } from 'schemas/artistRelatedData_d';
import { useContext } from 'react';
import QuizPageContext from 'components/pages/QuizPage/QuizPageContext';

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
                console.log('RIGHT ANSWER -> +1');
              }
              if (artist?.artist_id !== correctArtistId) {
                console.log('WRONG ANSWER -> +0');
              }

              card === 4 ? console.log('Game is over! Redirect to user screen') : setCard(card + 1);
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
