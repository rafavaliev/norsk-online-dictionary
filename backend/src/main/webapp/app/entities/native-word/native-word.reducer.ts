import axios from 'axios';
import {
  ICrudSearchAction,
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INativeWord, defaultValue } from 'app/shared/model/native-word.model';

export const ACTION_TYPES = {
  SEARCH_NATIVEWORDS: 'nativeWord/SEARCH_NATIVEWORDS',
  FETCH_NATIVEWORD_LIST: 'nativeWord/FETCH_NATIVEWORD_LIST',
  FETCH_NATIVEWORD: 'nativeWord/FETCH_NATIVEWORD',
  CREATE_NATIVEWORD: 'nativeWord/CREATE_NATIVEWORD',
  UPDATE_NATIVEWORD: 'nativeWord/UPDATE_NATIVEWORD',
  DELETE_NATIVEWORD: 'nativeWord/DELETE_NATIVEWORD',
  RESET: 'nativeWord/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INativeWord>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type NativeWordState = Readonly<typeof initialState>;

// Reducer

export default (state: NativeWordState = initialState, action): NativeWordState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_NATIVEWORDS):
    case REQUEST(ACTION_TYPES.FETCH_NATIVEWORD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NATIVEWORD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NATIVEWORD):
    case REQUEST(ACTION_TYPES.UPDATE_NATIVEWORD):
    case REQUEST(ACTION_TYPES.DELETE_NATIVEWORD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_NATIVEWORDS):
    case FAILURE(ACTION_TYPES.FETCH_NATIVEWORD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NATIVEWORD):
    case FAILURE(ACTION_TYPES.CREATE_NATIVEWORD):
    case FAILURE(ACTION_TYPES.UPDATE_NATIVEWORD):
    case FAILURE(ACTION_TYPES.DELETE_NATIVEWORD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_NATIVEWORDS):
    case SUCCESS(ACTION_TYPES.FETCH_NATIVEWORD_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_NATIVEWORD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NATIVEWORD):
    case SUCCESS(ACTION_TYPES.UPDATE_NATIVEWORD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NATIVEWORD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/native-words';
const apiSearchUrl = 'api/_search/native-words';

// Actions

export const getSearchEntities: ICrudSearchAction<INativeWord> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_NATIVEWORDS,
  payload: axios.get<INativeWord>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`)
});

export const getEntities: ICrudGetAllAction<INativeWord> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_NATIVEWORD_LIST,
    payload: axios.get<INativeWord>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<INativeWord> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NATIVEWORD,
    payload: axios.get<INativeWord>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INativeWord> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NATIVEWORD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<INativeWord> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NATIVEWORD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<INativeWord> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NATIVEWORD,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
