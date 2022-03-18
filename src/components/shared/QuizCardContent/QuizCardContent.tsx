import { Button, Card } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

import { TArtistData } from 'schemas/artistRelatedData_d';
import { useContext } from 'react';
import QuizPageContext from 'components/pages/QuizPage/QuizPageContext';

interface IQuizCardContent {
  snippet: string;
  correctArtistId: number;
  artists: TArtistData[];
}

const QuizCardContent: React.FC<IQuizCardContent> = ({ snippet, correctArtistId, artists }) => {
  const { card, setCard } = useContext(QuizPageContext);
  return (
    <Card title={snippet} style={{ width: 300 }}>
      {artists?.map((artist) => {
        return (
          <Button
            type="default"
            shape="round"
            icon={<PlayCircleOutlined />}
            size="large"
            key={artist?.artist_id}
            onClick={() => {
              if (artist?.artist_id === correctArtistId) {
                console.log('RIGHT ANSWER -> +1');
              } else {
                console.log('WRONG ANSWER -> +0');
              }
              setCard(card + 1);
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
