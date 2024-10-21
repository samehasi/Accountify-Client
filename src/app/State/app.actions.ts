import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { State } from "./app.state";

export const userQuizActions  = createActionGroup({
    source: 'User Quiz', 
    events: {
        'reset': emptyProps(), 
        'answer current question': props<{index: number}>()
    }
})

export const systemActions = createActionGroup({
    source: 'System', 
    events: {
        'reset state': props<{state: State}>()
    }
})

export const changeLanguage = createAction(
    '[Language] Change Language',
    props<{ language: string }>()
  );

  export const signInRequest = createAction(
    '[Auth] Sign In Request',
    props<{ email: string , password: string }>()
  );
  export const signUpRequest = createAction(
    '[Auth] Sign Up Request',
    props<{ email: string , password: string }>()
  );

  export const signInSuccess = createAction(
    '[Auth] Sign In Success',
    props<{ token: string , timeout: number }>()
  );

  export const signOut = createAction(
    '[Auth] Sign Out'
  );

  export const signInError = createAction(
    '[Auth] Sign In Error',
    props<{ error: string }>()
  );

  export const signUpSuccess= createAction(
    '[Auth] Sign Up Success' // The language to switch to
  );

  export const signUpError = createAction(
    '[Auth] Sign Up Error',
    props<{ error: string }>()  // The language to switch to
  );

  export const AuthDataReset= createAction(
    '[Auth] Reset' // The language to switch to
  );