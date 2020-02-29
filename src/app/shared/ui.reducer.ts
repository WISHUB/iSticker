import * as FromUI from './ui.actions';

export interface State {
    isLoading: boolean;
}

const initState: State = {
    isLoading: false
};

export function reducer(state = initState, action: FromUI.Accions) {

    switch (action.type) {

        case FromUI.ACTIVATE_LOADING:
            return { isLoading: true };

        case FromUI.DESACTIVATE_LOADING:
            return { isLoading: false };

        default: {
            return state;
        }
    }
}
