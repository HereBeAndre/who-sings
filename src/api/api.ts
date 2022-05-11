import axios from 'axios';

import {
  IChartTrackResponse,
  TChartTrackData,
  TTrackGameData,
} from 'schemas/musixMatchData/chartTrackData_d';
import { ITrackSnippetResponse } from 'schemas/musixMatchData/trackSnippetData_d';
import { IArtistResponse } from 'schemas/musixMatchData/artistData_d';
import { IArtistRelatedResponse } from 'schemas/musixMatchData/artistRelatedData_d';

import {
  BASE_PAGE_NUMBER,
  BASE_URL,
  CHART_NAME,
  COUNTRY,
  TRACKS_PAGE_SIZE,
  WRONG_ARTIST_OPTIONS,
} from 'utils/constants';
import { generateRandomNumber, reduceArtistObject, shuffle } from 'utils/functions';

const axiosInstance = axios.create({
  // Created Heroku app to act as proxy server
  baseURL: `https://peaceful-depths-95964.herokuapp.com/${BASE_URL}`,
  params: {
    apikey: process.env.REACT_APP_MUSIXMATCH_API_KEY || '',
  },
});

export const fetchTracks = (page: number) =>
  axiosInstance.get<string, IChartTrackResponse>('chart.tracks.get', {
    params: {
      chart_name: CHART_NAME,
      country: COUNTRY,
      page,
      page_size: TRACKS_PAGE_SIZE,
      f_has_lyrics: 1,
    },
  });

export const fetchTrack = (track_id: number) =>
  axiosInstance.get<string, ITrackSnippetResponse>('track.snippet.get', {
    params: {
      track_id,
    },
  });

export const fetchArtist = (artist_id: number) =>
  axiosInstance.get<string, IArtistResponse>('artist.get', {
    params: {
      artist_id,
    },
  });

export const fetchRelatedArtists = (artist_id: number) =>
  axiosInstance.get<string, IArtistRelatedResponse>('artist.related.get', {
    params: {
      artist_id,
      page_size: 2,
      page: 1,
    },
  });

// USAGE ~ Initialize all match data as soon as user logs in + user clicks on new game
export const fetchGameData = async (): Promise<TTrackGameData[]> => {
  try {
    const tracks = await fetchTracks(generateRandomNumber(BASE_PAGE_NUMBER));
    const tracksData = tracks.data.message.body.track_list;

    const response = Promise.all(
      tracksData.map(async (t: TChartTrackData) => {
        const track = await fetchTrack(t.track.track_id);
        const artist = await fetchArtist(t.track.artist_id);
        const relatedArtists = await fetchRelatedArtists(t.track.artist_id);

        const artistListResponse = relatedArtists?.data?.message?.body?.artist_list || [];

        const relatedArtistList =
          artistListResponse.length === 2
            ? reduceArtistObject(artistListResponse)
            : shuffle(WRONG_ARTIST_OPTIONS).slice(0, 2);

        return {
          snippet: track?.data?.message?.body?.snippet?.snippet_body,
          artist: {
            artist_id: artist?.data?.message?.body?.artist?.artist_id,
            artist_name: artist?.data?.message?.body?.artist?.artist_name,
          },
          relatedArtists: relatedArtistList,
        };
      }),
    );
    return response;
  } catch (err) {
    // Ideally, do something useful with this error
    console.log('Error - Fetch game data', err);
  }
  return [];
};
