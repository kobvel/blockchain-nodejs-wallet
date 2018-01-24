import { StartupService } from 'app/startup.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppService } from 'app/app.service';
import { HashNamePipe } from './hash.pipe';
import { WalletComponent } from './wallet/wallet.component';
import { OperationsComponent } from './operations/operations.component';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        FormsModule,
        BrowserModule
      ],
      declarations: [
        HashNamePipe,
        AppComponent,
        OperationsComponent,
        WalletComponent
      ],
      providers: [
        AppService,
        StartupService,
        { provide: 'Hashwords', useValue: window['hashwords']() }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`shoult be initialized with the default vars'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app.walletFilter).toEqual('');
  }));

});
