import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { GtcnavComponent } from './gtcnav/gtcnav.component';
import { SshowComponent } from './sshow/sshow.component';
import { GalleryComponent } from './gallery/gallery.component';
import { NewsComponent } from './news/news.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';
import { SignupComponent } from './signup/signup.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { AuthGuard } from './auth.guard';
import { InboxComponent } from './mailbox/inbox/inbox.component';
import { SentmailComponent } from './mailbox/sentmail/sentmail.component';
import { NologinGuard } from './nologin.guard';
import { TestComponent } from './test/test.component';
import { MailboxService } from './mailbox.service';
import { ComposeComponent } from './mailbox/compose/compose.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { SentMessageComponent } from './mailbox/sent-message/sent-message.component';
import { InboxMessageComponent } from './mailbox/inbox-message/inbox-message.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';




@NgModule({
  declarations: [
    AppComponent,
    GtcnavComponent,
    SshowComponent,

    GalleryComponent,
    NewsComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    MailboxComponent,
    InboxComponent,
    SentmailComponent,
    TestComponent,
    ComposeComponent,
    EditprofileComponent,
    ProfileComponent,
    SentMessageComponent,
    InboxMessageComponent,
    UsersComponent,
    UserComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  providers: [LoginService,AuthGuard,NologinGuard,MailboxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
