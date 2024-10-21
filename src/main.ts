import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { RootComponent } from './app/Components/root-component/root-component';

//bootstrapApplication(RootComponent, appConfig)
 // .catch((err) => console.error(err));

 import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/modules/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)  

  .catch(err => console.error(err));
