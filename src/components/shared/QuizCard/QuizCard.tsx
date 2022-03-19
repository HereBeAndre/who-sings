import { useContext, useEffect, useState } from 'react';

import { TChartTrackData } from 'schemas/chartTrackData_d';
import { TArtistData } from 'schemas/artistRelatedData_d';

import QuizPageContext from 'components/pages/QuizPage/QuizPageContext';
import QuizCardContent from 'components/shared/QuizCardContent/QuizCardContent';

import { fetchRelatedArtists, fetchArtist, fetchTrack } from 'api/api';

import { getTrackProperty, reduceArtistObject } from 'utils/functions';
import { WRONG_ARTIST_OPTIONS } from 'utils/constants';

interface IQuizCardProps {
  track: TChartTrackData;
}

const QuizCard: React.FC<IQuizCardProps> = ({ track }) => {
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
          const artistListResponse = response?.data?.message?.body?.artist_list || [];

          const relatedArtists =
            artistListResponse.length === 2
              ? reduceArtistObject(artistListResponse)
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

    // Clean-up to empty artist list from previous question
    return () => {
      setArtists([]);
    };
  }, [trackId, artistId]);

  return snippetBody ? (
    <QuizCardContent snippet={snippetBody} correctArtistId={artistId} artists={artists} />
  ) : (
    <div>'Loading...'</div>
  );
};

export default QuizCard;
