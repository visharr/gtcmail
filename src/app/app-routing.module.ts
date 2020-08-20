import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


import { HomeComponent } from "./home/home.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { MailboxComponent } from "./mailbox/mailbox.component";
import { AuthGuard } from "./auth.guard";
import { NologinGuard } from "./nologin.guard";
import { TestComponent } from "./test/test.component";
import { InboxComponent } from "./mailbox/inbox/inbox.component";
import { SentmailComponent } from "./mailbox/sentmail/sentmail.component";
import { ComposeComponent } from "./mailbox/compose/compose.component";
import { EditprofileComponent } from "./editprofile/editprofile.component";
import { ProfileComponent } from "./profile/profile.component";
import { InboxMessageComponent } from "./mailbox/inbox-message/inbox-message.component";
import { SentMessageComponent } from "./mailbox/sent-message/sent-message.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./user/user.component";



const appRouter: Routes = [
    { path: '', component: HomeComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'signup', canActivate: [NologinGuard], component: SignupComponent },
    { path: 'profile/edit', canActivate: [AuthGuard], component: EditprofileComponent },
    { path: 'login', canActivate: [NologinGuard], component: LoginComponent },
    {
        path: 'mailbox', canActivate: [AuthGuard], component: MailboxComponent,
        children:
            [

                { path: 'inbox', component: InboxComponent },
                { path: 'inbox/:id', component: InboxMessageComponent },
                { path: 'sent', component: SentmailComponent },
                { path: 'sent/:id', component: SentMessageComponent },
                { path: 'compose', component: ComposeComponent },
                { path: '**', redirectTo: 'inbox' }
            ]
    },
    {
        path: 'profile', canActivate: [AuthGuard], component: ProfileComponent,
        children:
            [
                { path: '', component: ProfileComponent },
                { path: 'edit', component: EditprofileComponent },
                { path: '**', redirectTo: '' }
            ]
    },
    { path: 'users', canActivate: [AuthGuard], component: UsersComponent },
    { path: 'users/:id', canActivate: [AuthGuard], component: UserComponent },
    { path: 'test', component: TestComponent },
    { path: '**', redirectTo: '' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRouter)
    ],
    exports: [RouterModule]

})
export class AppRoutingModule {
}