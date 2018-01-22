import { AppService } from './app.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { OperationsComponent } from './operations/operations.component';
import { WalletComponent } from './wallet/wallet.component';
import { OperationsService } from './operations/operations.service';
import 'rxjs/Rx';

@NgModule({
  declarations: [
    AppComponent,
    OperationsComponent,
    WalletComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule
  ],
  providers: [AppService, OperationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
