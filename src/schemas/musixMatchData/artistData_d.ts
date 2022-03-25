import { TArtistData } from './artistRelatedData_d';
import { TMetaData } from './metaData_d';

export interface IArtistResponse {
  data: {
    message: {
      header: TMetaData;
      body: {
        artist: TArtistData;
      };
    };
  };
}
