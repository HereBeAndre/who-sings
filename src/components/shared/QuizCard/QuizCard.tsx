import { useContext } from 'react';

import QuizPageContext from 'components/pages/QuizPage/QuizPageContext';
import { TTrackData } from 'schemas/trackData_d';

import { getTrackProperty } from 'utils/functions';

interface IQuizCardProps {
  track: TTrackData;
}

const QuizCard: React.FC<IQuizCardProps> = ({ track }) => {
  const { card, setCard } = useContext(QuizPageContext);
  const trackId = getTrackProperty(track, 'track_id');
  const artistId = getTrackProperty(track, 'artist_id');

  const onCardClick = () => {
    setCard(card + 1);
  };

  return (
    <div style={{ border: '1px solid black' }} onClick={onCardClick}>
      <p>{trackId}</p> - <p>{artistId}</p>
    </div>
  );
};

export default QuizCard;
