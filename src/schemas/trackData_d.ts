type TResponseHeader = {
  status_code: number;
  execute_time: number;
};

export type TTrackData = {
  track: {
    track_id: number;
    track_name: string;
    track_name_translation_list: unknown[];
    track_rating: number;
    commontrack_id: number;
    instrumental: number;
    explicit: number;
    has_lyrics: number;
    has_subtitles: number;
    has_richsync: number;
    num_favourite: number;
    album_id: number;
    album_name: string;
    artist_id: number;
    artist_name: string;
    track_share_url: string;
    track_edit_url: string;
    restricted: number;
    updated_time: string;
    primary_genres: {
      music_genre_list: unknown[];
    };
  };
};

export interface IResponseMessage {
  data: {
    message: {
      header: TResponseHeader;
      body: {
        track_list: TTrackData[];
      };
    };
  };
}
