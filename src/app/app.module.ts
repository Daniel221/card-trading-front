import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { AppRoutingModule } from './app.routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserCardComponent } from './user-card/user-card.component';
import { ChatInboxComponent } from './chat-inbox/chat-inbox.component';
import { ContactListComponent } from './contact-list/contact-list.component';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service'
import { SocialAuthServiceConfig } from 'angularx-social-login';
import { SocialLoginModule, GoogleLoginProvider } from 'angularx-social-login';

import { SocketService } from './shared/socket.service';
import { HeaderComponent } from './header/header.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { NotisComponent } from './notis/notis.component';
import { TradeComponent } from './trade/trade.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    RegisterFormComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserComponent,
    CatalogueComponent,
    CardDetailsComponent,
    UserListComponent,
    UserCardComponent,
    ChatInboxComponent,
    HeaderComponent,
    ContactListComponent,
    DeleteModalComponent,
    NotisComponent,
    TradeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    SocialLoginModule
  ],
  providers: [AuthService, AuthGuard, SocketService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('85332580143-t99f1q0ao3577q9d7mqtc0oiqttgrmog.apps.googleusercontent.com')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  /*{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
