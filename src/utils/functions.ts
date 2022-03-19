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
