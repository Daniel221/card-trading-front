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
import { InfoComponent } from './info/info.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { AppRoutingModule } from './app.routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserCardComponent } from './user-card/user-card.component';
import { ChatInboxComponent } from './chat-inbox/chat-inbox.component';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SocketService } from './shared/socket.service';
import { HeaderComponent } from './header/header.component';

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
    InfoComponent,
    CardDetailsComponent,
    UserListComponent,
    UserCardComponent,
    ChatInboxComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AuthService, AuthGuard, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
