import { TWallOfFameUserData } from 'schemas/userData_d';

// START ~ Data manipulator helpers

// USAGE ~ flatten each `artist` object to its first level inside the array
export const reduceArtistObject = (list: any[]): any[] => {
  return list.reduce((acc, curr) => {
    const { artist } = curr;
    acc.push(artist);
    return acc;
  }, []);
};

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

// START ~ Generic utils
export const generateRandomNumber = (baseNumber: number): number =>
  Math.round(Math.random() * baseNumber);

export function shuffle<T>(data: T[]) {
  return data.sort(() => 0.5 - Math.random());
}

export function getReferenceDTLength(referenceData: Array<any> | Object): number {
  if (Array.isArray(referenceData)) return referenceData.length;
  return Object.values(referenceData).length;
}
// END ~ Generic utils
