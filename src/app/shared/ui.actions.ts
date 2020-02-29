import { Action } from '@ngrx/store';

export const ACTIVATE_LOADING = '[UI Loading] Loading';
export const DESACTIVATE_LOADING = '[UI Loading] End loading';

export class ActivateLoadingAction implements Action {
    readonly type = ACTIVATE_LOADING;
}

export class DesctivateLoadingAction implements Action {
    readonly type = DESACTIVATE_LOADING;
}

export type Accions = ActivateLoadingAction | DesctivateLoadingAction;
