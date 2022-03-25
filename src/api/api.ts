import axios from 'axios';

import { IChartTrackResponse } from 'schemas/musixMatchData/chartTrackData_d';
import { ITrackSnippetResponse } from 'schemas/musixMatchData/trackSnippetData_d';
import { IArtistResponse } from 'schemas/musixMatchData/artistData_d';
import { IArtistRelatedResponse } from 'schemas/musixMatchData/artistRelatedData_d';

import { BASE_URL, CHART_NAME, COUNTRY, TRACKS_PAGE_SIZE } from 'utils/constants';

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
