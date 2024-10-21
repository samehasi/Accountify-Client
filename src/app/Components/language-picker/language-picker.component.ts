import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { changeLanguage } from '../../State/app.actions';
import { selectCurrentLanguage } from '../../State/app.selectors';
import { map, take, tap } from 'rxjs';

@Component({
  selector: 'language-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.css'],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
  ]
})
export class LanguagePickerComponent {
  selectedLanguage: string;

  languages = [
    { value: 'en', viewValue: 'English' },
    { value: 'ar', viewValue: 'العربية' },
    { value: 'he', viewValue: 'עברית' }
  ];

 protected currentLanguage$ = this.store.select(selectCurrentLanguage).pipe(take(1),
 tap(x => {

 })).subscribe(lang => this.selectedLanguage = lang ?? this.selectedLanguage);

  constructor(private translateService: TranslateService , private store:Store) {
    this.selectedLanguage = this.translateService.currentLang || 'en'; // Set the default language
  }

  // Switch the language based on user selection
  switchLanguage(language: string) {
    this.store.dispatch(changeLanguage({ language }));

  }
}
