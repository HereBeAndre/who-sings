import { TMetaData } from './metaData_d';

type TArtistAlias = {
  artist_alias: string;
};

export type TArtistData = {
  artist_id: number;
  artist_name: string;
  artist_name_translation_list: unknown[];
  artist_comment: string;
  artist_country: string;
  artist_alias_list: TArtistAlias[];
  artist_rating: number;
  artist_twitter_url: string;
  artist_credits: {
    artist_list: unknown[];
  };
  restricted: number;
  updated_time: string;
  begin_date_year: string;
  begin_date: string;
  end_date_year: string;
  end_date: string;
};

interface TArtistRelatedMetaData extends TMetaData {
  available: number;
}

export interface IArtistRelatedResponse {
  data: {
    message: {
      header: TArtistRelatedMetaData;
      body: {
        artist_list: TArtistData[];
      };
    };
  };
}
