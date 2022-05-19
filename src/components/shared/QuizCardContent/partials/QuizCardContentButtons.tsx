import { memo, useCallback, useContext, useEffect, useState } from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';

import { TArtistData, TBasicArtistData } from 'schemas/musixMatchData/artistRelatedData_d';

import QuizPageContext from 'components/pages/QuizPage/QuizPageContext';
import BaseButton from 'components/shared/buttons/BaseButton';

import { USER_CHOICE_FEEDBACK_MILLISECONDS } from 'utils/constants';
import { getReferenceDTLength } from 'utils/functions';
import { handleCorrectAnswer } from 'utils/gameHelpers';

interface IQuizCardContentButtonsProps {
  artists: (TArtistData | TBasicArtistData)[];
  correctArtistId: number;
}

const QuizCardContentButtons: React.FC<IQuizCardContentButtonsProps> = ({
  artists,
  correctArtistId,
}) => {
  const { cardNumber, setCardNumber } = useContext(QuizPageContext);

  /* USAGE ~ State responsible for keeping track whether user selects correct or wrong artist
      For the time being, it holds a single key-value pair, like such: { 0 : true }
      Where -> key: index of selected artist
            -> value: `true` equals correct choice, `false` equals wrong choice
  */
  const [artistsMap, setArtistsMap] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Perform clean-up upon new song snippet
    return () => {
      setArtistsMap({});
    };
  }, [artists]);

  const moveToNextQuestion = useCallback(() => {
    const answerFeedbackTimeout = setTimeout(
      () => setCardNumber(cardNumber + 1),
      USER_CHOICE_FEEDBACK_MILLISECONDS,
    );

    return () => {
      clearTimeout(answerFeedbackTimeout);
    };
  }, [correctArtistId]);

  return (
    <>
      {artists?.map((artist, i) => {
        return (
          <BaseButton
            className={
              getReferenceDTLength(artistsMap)
                ? 'quiz-card-button__submitted-answer'
                : `quiz-card-button`
            }
            id={`${artistsMap[i]}`}
            icon={<PlayCircleOutlined />}
            key={`${artist?.artist_id}-${i}`}
            onClick={() => {
              setArtistsMap((prev) => ({
                ...prev,
                [i]: artist?.artist_id === correctArtistId,
              }));
              if (artist?.artist_id === correctArtistId) handleCorrectAnswer();
              moveToNextQuestion();
            }}
            disabled={!!getReferenceDTLength(artistsMap)}
          >
            {artist?.artist_name}
          </BaseButton>
        );
      })}
    </>
  );
};

export const QuizCardContentButtonsMemoized = memo(QuizCardContentButtons);
