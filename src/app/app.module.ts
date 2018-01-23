import { AppService } from './app.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { OperationsComponent } from './operations/operations.component';
import { WalletComponent } from './wallet/wallet.component';
import { HashNamePipe } from './hash.pipe';
import 'rxjs/Rx';

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
  providers: [AppService, { provide: 'Hashwords', useValue: window['hashwords']() }],
  bootstrap: [AppComponent]
})
export class AppModule { }
