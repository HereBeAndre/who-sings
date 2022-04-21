import { State } from 'schemas/index_d';
import { TGenericAction } from 'schemas/actions_d';

export const initialState: State = {
  snippetBody: '',
  isTrackReqLoading: false,
  trackReqError: '',
  isArtistReqLoading: false,
  artistReqError: '',
  isRelatedArtistReqLoading: false,
  relatedArtistsReqError: '',
};

export function quizCardReducer(state: State, action: TGenericAction<any>): State {
  switch (action.type) {
    case 'setSnippetBody':
      return {
        ...state,
        snippetBody: action.payload,
      };
    case 'setIsTrackReqLoading':
      return {
        ...state,
        isTrackReqLoading: action.payload,
      };
    case 'setTrackReqError':
      return {
        ...state,
        trackReqError: action.payload,
      };
    case 'setIsArtistReqLoading':
      return {
        ...state,
        isArtistReqLoading: action.payload,
      };
    case 'setArtistReqError':
      return {
        ...state,
        artistReqError: action.payload,
      };

    case 'setIsRelatedArtistReqLoading':
      return {
        ...state,
        isRelatedArtistReqLoading: action.payload,
      };
    case 'setRelatedArtistsReqError':
      return {
        ...state,
        relatedArtistsReqError: action.payload,
      };

    default:
      return state;
  }
}
