import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './Components/App/app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { BASE_URL } from './Tokens/tokens';
import { provideState, provideStore } from '@ngrx/store';
import { quizFeature } from './State/app.feature';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppEffects } from './State/app.effects';
import { authInterceptor } from './auth-interceptors/auth-interceptor.service';
import { provideFirebaseApp } from '@angular/fire/app';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environment } from './environment';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideStore(), 
    provideState(quizFeature),
    provideEffects(AppEffects),
        importProvidersFrom(
    ),
    provideStoreDevtools({
      maxAge: 25
    }),
    provideHttpClient(
      withInterceptors([authInterceptor]) // Register the interceptor
    )
    ,
    { provide: BASE_URL, useValue: "https://localhost:7024" },
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
     provideAnimationsAsync(),
     provideFirebaseApp((() => initializeApp(environment.firebaseConfig))),
     
]
};
