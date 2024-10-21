// app.module.ts
import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { RootComponent } from '../Components/root-component/root-component';
import { environment } from '../environment';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterModule, RouterOutlet, provideRouter } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { routes } from '../app.routes';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../Components/App/app.component';
import { AppEffects } from '../State/app.effects';
import { quizFeature } from '../State/app.feature';
import { BASE_URL } from '../Tokens/tokens';
import { authInterceptor } from '../auth-interceptors/auth-interceptor.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth } from 'firebase/auth';
import { provideAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule,
     RouterOutlet,
    AngularFireModule.initializeApp(environment.firebaseConfig),  

    AngularFireAuthModule
  ],
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
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync(),],
  bootstrap: [RootComponent]
})
export class  
 AppModule {}
