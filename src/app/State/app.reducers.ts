import { createReducer, on } from '@ngrx/store';
import { INITIAL_STATE, RequestState, State } from './app.state';
import { changeLanguage, signInRequest as signInRequest, signInError, signInSuccess, signOut, signUpError, signUpSuccess, systemActions, userQuizActions, signUpRequest } from './app.actions';

export const quizReducer = createReducer(
  INITIAL_STATE,
  on(userQuizActions.reset, () => INITIAL_STATE),
  on(systemActions.resetState, (_, action) => action.state),
  on(changeLanguage, (state, { language }) => ({ ...state, language })),
  on(signInSuccess, (state, { token,timeout }) => ({ ...state, authenticationStat:{...state.authenticationStat,signInState:'Success' as RequestState,token:token,tokenTimeout:timeout} })),
  on(signInError, (state, { error }) => ({ ...state, authenticationStat:{...state.authenticationStat,signInState:'Failed' as RequestState,signInErrorMessage:error} })),
  on(signUpSuccess, (state) => ({ ...state, authenticationStat:{...state.authenticationStat,signUpState:'Success' as RequestState} })),
  on(signUpError, (state,{error}) => ({ ...state, authenticationStat:{...state.authenticationStat,signUpState:'Failed' as RequestState,signUpErrorMessage:error} })),
  on(signOut, (state) => ({ ...state, authenticationStat:{...state.authenticationStat,token:null,tokenTimeout:null} })),
  on(signInRequest, (state) => ({ ...state, authenticationStat:{...state.authenticationStat,token:null,tokenTimeout:null,signInState:'Running' as RequestState} })),
  on(signUpRequest, (state) => ({ ...state, authenticationStat:{...state.authenticationStat,token:null,tokenTimeout:null,signUpState:'Running' as RequestState} }))


);
function currentQuestion(state: State) {
    throw new Error('Function not implemented.');
}
