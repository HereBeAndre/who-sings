import { TArtistData } from 'schemas/artistRelatedData_d';

export const BASE_URL = 'https://api.musixmatch.com/ws/1.1/';
export const COUNTRY = 'fdsfsd';
// ? TODO: Make PAGE dynamic??
export const PAGE = 1;
export const TRACKS_PAGE_SIZE = 5;
export const ARTISTS_PAGE_SIZE = 3;

export const WRONG_ARTIST_OPTIONS: TArtistData[] = [
  {
    //   ! TODO -> Replace with generateRandomNumber() helper? Same applies for API pages
    artist_id: Math.floor(Math.random() * 100),
    artist_name: 'Belle and Sebastian',
    artist_name_translation_list: [],
    artist_comment: '',
    artist_country: '',
    artist_alias_list: [],
    artist_rating: 0,
    artist_twitter_url: '',
    artist_credits: {
      artist_list: [],
    },
    restricted: 0,
    updated_time: '',
    begin_date_year: '',
    begin_date: '',
    end_date_year: '',
    end_date: '',
  },
  {
    //   ! TODO -> Replace with generateRandomNumber() helper? Same applies for API pages
    artist_id: Math.floor(Math.random() * 200),
    artist_name: 'Billy Joel',
    artist_name_translation_list: [],
    artist_comment: '',
    artist_country: '',
    artist_alias_list: [],
    artist_rating: 0,
    artist_twitter_url: '',
    artist_credits: {
      artist_list: [],
    },
    restricted: 0,
    updated_time: '',
    begin_date_year: '',
    begin_date: '',
    end_date_year: '',
    end_date: '',
  },
];
