import { Action, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AuthActionTypes } from '@auth/store/actions/auth.actions';
import * as FromUI from './shared/ui.reducer';
import * as FromAuth from './modules/auth/store/reducers/auth.reducer';

export interface AppState {
  ui: FromUI.State;
  auth: FromAuth.State;
}

export const reducers: ActionReducerMap < AppState > = {
  ui: FromUI.reducer,
  auth: FromAuth.reducer
};

export function localStorageSyncReducer(reducer: ActionReducer < FromAuth.State > ): ActionReducer < FromAuth.State > {
  return localStorageSync({
    keys: ['auth'],
    rehydrate: true,
    removeOnUndefined: true,
    storage: sessionStorage
  })(reducer);
}

export function clearState(reducer) {
  return (state, action: Action) =>  {
    if (action.type === AuthActionTypes.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: Array < MetaReducer < AppState, Action >> = [localStorageSyncReducer, clearState];
