import { TChartTrackData } from 'schemas/chartTrackData_d';
import { TWallOfFameUserData } from 'schemas/userData_d';

// START ~ Getter / Setter helpers
export const getTrackProperty = (track: TChartTrackData, property: 'track_id' | 'artist_id') =>
  track?.track[property];
// END ~ Getter / Setter helpers

// START ~ Data manipulator helpers

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

// USAGE ~ Manipulate user data stored in Session Storage to feed Wall Of Fame table data
// TODO: O(N^2) not very efficient if input becomes large - either refactor or implement better DS in storage
export const manipulateUserData = (data: [string, string][]): TWallOfFameUserData[] => {
  return data?.reduce((acc: TWallOfFameUserData[], curr) => {
    const arr: TWallOfFameUserData[] = JSON.parse(curr[1])?.lastGames?.map((i: number) => {
      return { username: curr[0], score: i };
    });
    acc.push(...arr);
    return acc;
  }, []);
};

// END ~ Data manipulator helpers

// START ~ Storages helpers
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
// END ~ Storages helpers
