export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
  }
  


  export type SignInErrors = 'INVALID_LOGIN_CREDENTIALS' | 
                            'TOO_MANY_ATTEMPTS_TRY_LATER' | 
                            'USER_DISABLED' | 
                            'GENERAL_ERROR'|
                            'EMAIL_EXISTS'|
                            'EMAIL_NOT_FOUND'|
                             'INVALID_PASSWORD'