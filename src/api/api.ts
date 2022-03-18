import axios from 'axios';
import { IResponseMessage } from 'schemas/trackData_d';

import { BASE_URL, COUNTRY, PAGE, PAGE_SIZE } from 'utils/constants';

const axiosInstance = axios.create({
  baseURL: `https://corsanywhere.herokuapp.com/${BASE_URL}`,
});

export const fetchTracks = () =>
  axiosInstance.get<string, IResponseMessage>('chart.tracks.get', {
    params: {
      chart_name: 'top',
      country: COUNTRY,
      page: PAGE,
      page_size: PAGE_SIZE,
      f_has_lyrics: 1,
      apikey: process.env.REACT_APP_API_KEY || '',
    },
  });
