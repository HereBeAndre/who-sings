import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { TTrackGameData } from 'schemas/musixMatchData/chartTrackData_d';

import QuizCardContent from 'components/shared/QuizCardContent/QuizCardContent';
import QuizPageContext from 'components/pages/QuizPage/QuizPageContext';

import { handleGameOver } from 'utils/gameHelpers';
import { LAST_QUESTION_INDEX } from 'utils/constants';
import { shuffle } from 'utils/functions';

interface IQuizCardProps {
  track: TTrackGameData;
}

const QuizCard: React.FC<IQuizCardProps> = ({ track }) => {
  const navigate = useNavigate();

  const { cardNumber } = useContext(QuizPageContext);

  const makeArtistList = () => shuffle([track?.artist, ...track.relatedArtists]);

  useEffect(() => {
    cardNumber === LAST_QUESTION_INDEX && handleGameOver(navigate);
  }, [cardNumber]);

  return (
    <>
      {track?.snippet ? (
        <QuizCardContent
          snippet={track?.snippet}
          correctArtistId={track?.artist?.artist_id}
          artists={makeArtistList()}
        />
      ) : null}
    </>
  );
};

export default QuizCard;
