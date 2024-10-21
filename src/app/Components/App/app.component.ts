import { ChangeDetectionStrategy, Component, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Client, WeatherForecast } from './api-client';
import { BASE_URL } from '../../Tokens/tokens';
import { Observable, map, of, tap } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoginComponent } from '../login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';  
import { Store } from '@ngrx/store';
import { changeLanguage, signOut } from '../../State/app.actions';
import { LanguagePickerComponent as LanguagePicker } from '../language-picker/language-picker.component';
import { selectIsLoggedIn } from '../../State/app.selectors';
// Factory function for loading translation files
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Component({
  selector: 'app-root', 
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule,
    RouterModule,
    LanguagePicker,
     TranslateModule,
     MatSlideToggleModule,
     MatButtonModule,
     MatButtonToggleModule,
     LoginComponent,
     MatToolbarModule,
     MatListModule,
     MatCardModule,
     MatButtonToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class HomeComponent {
serverResponse:Observable<string> | undefined;

features = [
  {
    title: 'FEATURE_FINANCIAL_CONSULTATION',
    description: 'FEATURE_FINANCIAL_CONSULTATION_DESC'
  },
  {
    title: 'FEATURE_TAX_PLANNING',
    description: 'FEATURE_TAX_PLANNING_DESC'
  },
  {
    title: 'FEATURE_BOOKKEEPING',
    description: 'FEATURE_BOOKKEEPING_DESC'
  }
];
protected isLoggedIn$: Observable<boolean>;
protected signout()
{
  this.store.dispatch(signOut());
}

protected getWeather() {
    this.serverResponse= this.weatherForecastClient.getWeatherForecast().pipe(
map (x => {
  const str = JSON.stringify(x);
  console.log(x);
  return str;
}
)
      );
}
  constructor(public translate: TranslateService,private weatherForecastClient: Client,private store: Store) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn).pipe(tap(x=> console.log(`loggedin? ${x}`)));
  }
  title = 'Accountify-App';
}
