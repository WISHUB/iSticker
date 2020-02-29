import { AuthActionTypes, All } from '../actions/auth.actions';
import { User } from '@interfaces';

export interface State {
    isAuthenticated: boolean;
    user: User | null;
    errorMessage: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
};

export function reducer(state = initialState, action: All): State {

  switch (action.type) {

    case AuthActionTypes.LOGIN_SUCCESS: {
        return {
            ...state,
            isAuthenticated: true,
            user: new User(action.payload),
            errorMessage: null
        };
    }

    case AuthActionTypes.LOGIN_FAILURE: {
        return {
            ...state,
            errorMessage: action.payload.error.message
        };
    }

    case AuthActionTypes.SIGNUP_SUCCESS: {
        return {
            ...state,
            isAuthenticated: true,
            user: new User(action.payload),
            errorMessage: null
        };
    }

    case AuthActionTypes.SIGNUP_FAILURE: {
        return {
            ...state,
            errorMessage: action.payload.error.message
        };
    }

    case AuthActionTypes.LOGOUT: {
        return initialState;
    }

    default: {
        return state;
    }
  }
}
