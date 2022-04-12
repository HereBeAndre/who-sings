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

export type TBasicArtistData = Omit<
  TArtistData,
  | 'artist_name_translation_list'
  | 'artist_comment'
  | 'artist_country'
  | 'artist_alias_list'
  | 'artist_rating'
  | 'artist_twitter_url'
  | 'artist_credits'
  | 'restricted'
  | 'updated_time'
  | 'begin_date_year'
  | 'begin_date'
  | 'end_date_year'
  | 'end_date'
>;

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
