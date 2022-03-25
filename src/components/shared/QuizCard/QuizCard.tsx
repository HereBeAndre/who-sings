import { useEffect, useReducer, useState } from 'react';
import { Spin } from 'antd';

import { TChartTrackData } from 'schemas/musixMatchData/chartTrackData_d';
import { TArtistData } from 'schemas/musixMatchData/artistRelatedData_d';

import QuizCardContent from 'components/shared/QuizCardContent/QuizCardContent';
import ErrorHandler from 'components/shared/ErrorHandler/ErrorHandler';

import { fetchRelatedArtists, fetchArtist, fetchTrack } from 'api/api';

import { getTrackProperty, reduceArtistObject, shuffle } from 'utils/functions';
import { WRONG_ARTIST_OPTIONS } from 'utils/constants';

import { initialState, quizCardReducer } from './reducers';

interface IQuizCardProps {
  track: TChartTrackData;
}

const QuizCard: React.FC<IQuizCardProps> = ({ track }) => {
  const trackId = getTrackProperty(track, 'track_id');
  const artistId = getTrackProperty(track, 'artist_id');

  // useReducer hook to avoid clogging this component with too many useState hooks
  const [state, dispatch] = useReducer(quizCardReducer, initialState);
  const {
    snippetBody,
    isTrackReqLoading,
    trackReqError,
    isArtistReqLoading,
    artistReqError,
    isRelatedArtistReqLoading,
    relatedArtistsReqError,
  } = state;

  const [artists, setArtists] = useState<TArtistData[]>([]);

  useEffect(() => {
    dispatch({ type: 'setIsTrackReqLoading', payload: true });
    trackId &&
      fetchTrack(trackId).then(
        (response) => {
          dispatch({ type: 'setIsTrackReqLoading', payload: false });
          dispatch({
            type: 'setSnippetBody',
            payload: response?.data?.message?.body?.snippet?.snippet_body,
          });
        },
        /* Handle errors here instead of a catch() block so that we don't swallow
    exceptions from actual bugs in component */
        (err) => {
          dispatch({ type: 'setIsTrackReqLoading', payload: false });
          // Mock error
          dispatch({ type: 'setTrackReqError', payload: 'Error' });
        },
      );

    dispatch({ type: 'setIsArtistReqLoading', payload: true });
    artistId &&
      fetchArtist(artistId).then(
        (response) => {
          dispatch({ type: 'setIsArtistReqLoading', payload: false });
          setArtists((prev) => [...prev, response?.data?.message?.body?.artist]);
        },
        /* Handle errors here instead of a catch() block so that we don't swallow
    exceptions from actual bugs in component */
        (err) => {
          dispatch({ type: 'setIsArtistReqLoading', payload: false });
          // Mock error
          dispatch({ type: 'setArtistReqError', payload: 'Error' });
        },
      );

    dispatch({ type: 'setIsRelatedArtistReqLoading', payload: true });
    artistId &&
      fetchRelatedArtists(artistId).then(
        (response) => {
          dispatch({ type: 'setIsRelatedArtistReqLoading', payload: false });
          const artistListResponse = response?.data?.message?.body?.artist_list || [];

          const relatedArtists =
            artistListResponse.length === 2
              ? reduceArtistObject(artistListResponse)
              : shuffle(WRONG_ARTIST_OPTIONS).slice(0, 2);

          setArtists((prev) => [...prev, ...relatedArtists]);
        },
        /* Handle errors here instead of a catch() block so that we don't swallow
        exceptions from actual bugs in component */
        (err) => {
          dispatch({ type: 'setIsRelatedArtistReqLoading', payload: false });
          // Mock error
          dispatch({ type: 'setRelatedArtistsReqError', payload: 'Error' });
        },
      );

    // Clean-up to empty previous question's artist list
    return () => {
      setArtists([]);
    };
  }, [trackId, artistId]);

  return (
    <Spin spinning={isTrackReqLoading || isArtistReqLoading || isRelatedArtistReqLoading}>
      {snippetBody ? (
        <QuizCardContent snippet={snippetBody} correctArtistId={artistId} artists={artists} />
      ) : (
        <ErrorHandler error={trackReqError || artistReqError || relatedArtistsReqError} />
      )}
    </Spin>
  );
};

export default QuizCard;
