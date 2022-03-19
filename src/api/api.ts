import axios from 'axios';

import { IChartTrackResponse } from 'schemas/chartTrackData_d';
import { ITrackSnippetResponse } from 'schemas/trackSnippetData_d';
import { IArtistRelatedResponse } from 'schemas/artistRelatedData_d';
import { IArtistResponse } from 'schemas/artistData_d';

import { BASE_URL, CHART_NAME, COUNTRY, PAGE, TRACKS_PAGE_SIZE } from 'utils/constants';

const axiosInstance = axios.create({
  baseURL: `https://corsanywhere.herokuapp.com/${BASE_URL}`,
  params: {
    apikey: process.env.REACT_APP_API_KEY || '',
  },
});

export const fetchTracks = () =>
  axiosInstance.get<string, IChartTrackResponse>('chart.tracks.get', {
    params: {
      chart_name: CHART_NAME,
      country: COUNTRY,
      page: PAGE,
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
