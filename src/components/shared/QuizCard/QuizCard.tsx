import { useContext, useEffect, useState } from 'react';

import { TChartTrackData } from 'schemas/chartTrackData_d';
import { TArtistData } from 'schemas/artistRelatedData_d';

import QuizPageContext from 'components/pages/QuizPage/QuizPageContext';
import QuizCardContent from 'components/shared/QuizCardContent/QuizCardContent';

import { fetchRelatedArtists, fetchArtist, fetchTrack } from 'api/api';

import { getTrackProperty } from 'utils/functions';
import { WRONG_ARTIST_OPTIONS } from 'utils/constants';

interface IQuizCardProps {
  track: TChartTrackData;
}

const QuizCard: React.FC<IQuizCardProps> = ({ track }) => {
  // ! TODO Check if needed
  const { card, setCard } = useContext(QuizPageContext);

  const trackId = getTrackProperty(track, 'track_id');
  const artistId = getTrackProperty(track, 'artist_id');

  const [snippetBody, setSnippetBody] = useState<string>('');
  const [artists, setArtists] = useState<TArtistData[]>([]);

  useEffect(() => {
    trackId &&
      fetchTrack(trackId).then(
        (response) => {
          setSnippetBody(response?.data?.message?.body?.snippet?.snippet_body);
        },
        /* Handle errors here instead of a catch() block so that we don't swallow
    exceptions from actual bugs in component */
        (err) => {
          // setIsLoading(false);
          // Mock error
          // setError(err?.message);
        },
      );

    artistId &&
      fetchArtist(artistId).then(
        (response) => {
          setArtists((prev) => [...prev, response?.data?.message?.body?.artist]);
        },
        /* Handle errors here instead of a catch() block so that we don't swallow
    exceptions from actual bugs in component */
        (err) => {
          // setIsLoading(false);
          // Mock error
          // setError(err?.message);
        },
      );

    artistId &&
      fetchRelatedArtists(artistId).then(
        (response) => {
          const relatedArtists =
            response?.data?.message?.body?.artist_list.length === 2
              ? response?.data?.message?.body?.artist_list
              : WRONG_ARTIST_OPTIONS;
          setArtists((prev) => [...prev, ...relatedArtists]);
        },
        /* Handle errors here instead of a catch() block so that we don't swallow
    exceptions from actual bugs in component */
        (err) => {
          // setIsLoading(false);
          // Mock error
          // setError(err?.message);
        },
      );
  }, [trackId, artistId]);

  // ! TODO Check if needed
  /* const onOptionClick = (evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log(evt);
    setCard(card + 1);
  }; */

  return snippetBody ? (
    <QuizCardContent snippet={snippetBody} correctArtistId={artistId} artists={artists} />
  ) : (
    <div>'Loading...'</div>
  );
};

export default QuizCard;
