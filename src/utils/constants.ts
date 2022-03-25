import { TArtistData } from 'schemas/artistRelatedData_d';

// START ~ API related variables
export const BASE_URL = 'https://api.musixmatch.com/ws/1.1/';
export const COUNTRY = 'WV';
export const CHART_NAME = 'top';
export const BASE_PAGE_NUMBER = 10;
export const TRACKS_PAGE_SIZE = 5;
export const ARTISTS_PAGE_SIZE = 3;
// END ~ API related variables

// START ~ Game variables
export const MILLISECONDS_PER_QUESTION = 10000;
export const SECONDS_PER_QUESTION = MILLISECONDS_PER_QUESTION / 1000;
export const CORRECT_ANSWER_POINTS = 100;
export const LAST_QUESTION_INDEX = 5;
// Set high scores ranking to 10 places
export const WOF_CUT_OFF = 10;
// END ~ Game variables

/* Sometimes request for related artists returns an empty list.
When this happens, use mocked list to fill the quiz options */
export const WRONG_ARTIST_OPTIONS: Partial<TArtistData>[] = [
  {
    artist_id: 123456789,
    artist_name: 'Belle and Sebastian',
  },
  {
    artist_id: 987654321,
    artist_name: 'Billy Joel',
  },
  {
    artist_id: 192837465,
    artist_name: 'Kasabian',
  },
  {
    artist_id: 5647382910,
    artist_name: 'Bonnie Tyler',
  },
  {
    artist_id: 1324758609,
    artist_name: 'Mos Def',
  },
  {
    artist_id: 1324758609,
    artist_name: 'Chuck Berry',
  },
  {
    artist_id: 8079463512,
    artist_name: 'Bob Dylan',
  },
  {
    artist_id: 8079463512,
    artist_name: 'Queen',
  },
  {
    artist_id: 1209347865,
    artist_name: 'Green Day',
  },
];
