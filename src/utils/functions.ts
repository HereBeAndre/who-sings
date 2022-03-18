import { TChartTrackData } from 'schemas/chartTrackData_d';

export const getTrackProperty = (track: TChartTrackData, property: 'track_id' | 'artist_id') =>
  track?.track[property];
