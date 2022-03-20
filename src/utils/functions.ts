import { TChartTrackData } from 'schemas/chartTrackData_d';

export const getTrackProperty = (track: TChartTrackData, property: 'track_id' | 'artist_id') =>
  track?.track[property];

// Use this function to flatten each `artist` object to its first level inside the array
export const reduceArtistObject = (list: any[]): any[] => {
  return list.reduce((acc, curr) => {
    const { artist } = curr;
    acc.push(artist);
    return acc;
  }, []);
};

// Use this function to get the greater integer out of an array of integers
export const reduceIntegersArray = (array: number[]) =>
  array.reduce((acc, curr) => (curr > acc ? curr : acc), 0);

export const stringifyAndSetToStorage = (
  property: string,
  value: any,
  storage: 'localStorage' | 'sessionStorage' = 'localStorage',
) => {
  const stringifiedData = JSON.stringify(value);
  return storage === 'localStorage'
    ? localStorage.setItem(property, stringifiedData)
    : sessionStorage.setItem(property, stringifiedData);
};

export const getFromStorageAndParse = (
  property: string,
  storage: 'localStorage' | 'sessionStorage' = 'localStorage',
) => {
  const storageData =
    storage === 'localStorage' ? localStorage.getItem(property) : sessionStorage.getItem(property);
  return storageData && JSON.parse(storageData);
};
