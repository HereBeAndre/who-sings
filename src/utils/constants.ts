import { TArtistData } from 'schemas/artistRelatedData_d';
import { generateRandomNumber } from './functions';

// START ~ API related variables
export const BASE_URL = 'https://api.musixmatch.com/ws/1.1/';
export const COUNTRY = 'WV';
export const CHART_NAME = 'top';
// ? TODO: Make PAGE dynamic??
export const PAGE = generateRandomNumber(8);
export const TRACKS_PAGE_SIZE = 5;
export const ARTISTS_PAGE_SIZE = 3;
// END ~ API related variables

// START ~ Game variables
export const CORRECT_ANSWER_POINTS = 100;
// Set high scores ranking to 10 places
export const WOF_CUT_OFF = 10;
// END ~ Game variables

/* Sometimes request for related artists returns an empty list.
When this happens, use mocked list to fill the quiz options */
export const WRONG_ARTIST_OPTIONS: TArtistData[] = [
  {
    //   ! TODO -> Replace with generateRandomNumber() helper? Same applies for API pages
    artist_id: generateRandomNumber(100),
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
    artist_id: generateRandomNumber(100),
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
