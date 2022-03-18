import { TMetaData } from './metaData_d';

export type TTrackSnippetData = {
  snippet_id: 27950320;
  snippet_language: string;
  restricted: number;
  instrumental: number;
  snippet_body: string;
  script_tracking_url: string;
  pixel_tracking_url: string;
  html_tracking_url: string;
  updated_time: string;
};

export interface ITrackSnippetResponse {
  data: {
    message: {
      header: TMetaData;
      body: {
        snippet: TTrackSnippetData;
      };
    };
  };
}
