import { AppService } from './app.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { OperationsComponent } from './operations/operations.component';
import { WalletComponent } from './wallet/wallet.component';
import { HashNamePipe } from './hash.pipe';


import { StartupService } from './startup.service';

import 'rxjs/Rx';

export function startupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    OperationsComponent,
    WalletComponent,
    HashNamePipe
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule
  ],
  providers: [
    AppService,
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [StartupService],
      multi: true
    },
    { provide: 'Hashwords', useValue: window['hashwords']() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
