import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { changeLanguage } from '../../State/app.actions';
@Component({
  selector: 'app-root',
  //standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './root-component.html',
  styleUrl: './root-component.css'
})
export class RootComponent {
  constructor(private store: Store) {
    // Dispatch the default language at app initialization
    //const defaultLanguage = 'en'; // Set your default language here
    //this.store.dispatch(changeLanguage({ language: defaultLanguage }));
  }
}
