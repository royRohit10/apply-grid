import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideAnimations(),   // <-- replace BrowserAnimationsModule
    provideToastr(),       
    ...(appConfig?.providers || []),
  ],
}).catch(err => console.error(err));
