import axios from 'axios';

import { BASE_URL, COUNTRY, PAGE, PAGE_SIZE } from 'utils/constants';

// https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=5&country=it&f_has_lyrics=1&apikey=d689c918930f76e43ac276a9a9c22e6a

const axiosInstance = axios.create({
  baseURL: `https://cors-anywhere.herokuapp.com/${BASE_URL}`,
});

export const fetchTracks = () =>
  // ! TODO: Fix type any
  axiosInstance.get<string, any>('chart.tracks.get', {
    params: {
      chart_name: 'top',
      country: COUNTRY,
      page: PAGE,
      page_size: PAGE_SIZE,
      f_has_lyrics: 1,
      apikey: process.env.REACT_APP_API_KEY || '',
    },
  });
