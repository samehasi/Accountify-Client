



export type RequestState =  'Idle' | 'Running' |'Failed' | 'Success';

export interface AuthenticationState{
    readonly signInState:RequestState
    readonly signInErrorMessage:string
    readonly signUpState:RequestState
    readonly signUpErrorMessage:string
    readonly token:string|null
    readonly tokenTimeout:number|null

}


export interface State {
    readonly language: string
    readonly authenticationStat:AuthenticationState
}

export const INITIAL_STATE: State = {
    language: 'en',  // Default language
    authenticationStat: {
        signInState: 'Idle',
        signInErrorMessage: '',
        signUpState: "Idle",
        signUpErrorMessage: '',
        token: null,
        tokenTimeout: null
    }
}