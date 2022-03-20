/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable prefer-destructuring */
import { TChartTrackData } from 'schemas/chartTrackData_d';
import { TWallOfFameUserData } from 'schemas/userData_d';

export const getTrackProperty = (track: TChartTrackData, property: 'track_id' | 'artist_id') =>
  track?.track[property];

// USAGE ~ flatten each `artist` object to its first level inside the array
export const reduceArtistObject = (list: any[]): any[] => {
  return list.reduce((acc, curr) => {
    const { artist } = curr;
    acc.push(artist);
    return acc;
  }, []);
};

// USAGE ~ get the greater integer out of an array of integers
export const reduceIntegersArray = (array: number[]) =>
  array.reduce((acc, curr) => (curr > acc ? curr : acc), 0);

// USAGE ~ Manipulate user data stored in Session Storage to feed Wall Of Fametable data
export const manipulateUserData = (data: [string, any][]): TWallOfFameUserData[] => {
  return data.reduce((acc, curr) => {
    const obj: any = {};
    obj['username'] = curr[0];
    obj['highscore'] = JSON.parse(curr[1]).highscore;
    acc.push(obj);
    return acc;
  }, [] as TWallOfFameUserData[]);
};

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
