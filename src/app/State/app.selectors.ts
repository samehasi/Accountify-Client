import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./app.state";

export const selectLanguageFeature = createFeatureSelector<State>('quiz');

export const selectCurrentLanguage = createSelector(
  selectLanguageFeature,
  (state: State) => state.language
);

export const selectSignInStaus= createSelector(
  selectLanguageFeature,
  (state: State) => ({state: state.authenticationStat.signInState , error: state.authenticationStat.signInErrorMessage})
);

export const selectSignUpStaus= createSelector(
  selectLanguageFeature,
  (state: State) => ({state: state.authenticationStat.signUpState , error: state.authenticationStat.signUpErrorMessage})
);

export const selectAuthInfo= createSelector(
  selectLanguageFeature,
  (state: State) => ({token: state.authenticationStat.token , timeout: state.authenticationStat.tokenTimeout})
);

export const selectIsAuthFailed = createSelector(
  selectLanguageFeature,
  (state: State) => state.authenticationStat.signInState === "Failed"
);

export const selectIsLoggedIn = createSelector(
  selectLanguageFeature,
  (state: State) => state.authenticationStat.token !== null
);

export const selectAuthToken = createSelector(
  selectLanguageFeature,
  (state: State) => state.authenticationStat.token
);