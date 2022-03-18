import { TTrackData } from 'schemas/trackData_d';

export const getTrackProperty = (track: TTrackData, property: 'track_id' | 'artist_id') =>
  track?.track[property];
