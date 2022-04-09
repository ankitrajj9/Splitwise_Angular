import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserEditComponent } from './user-edit/user-edit.component'
import { LoginComponent } from './login/login.component'
import {UserProfileComponent} from './user-profile/user-profile.component'
import {CreateGroupComponent} from './create-group/create-group.component'
import {GroupListingComponent} from './group-listing/group-listing.component'
import {GroupDetailComponent} from './group-detail/group-detail.component'
import {FollowListComponent} from './follow-list/follow-list.component'
import {LogoutComponent} from './logout/logout.component'
import {VerifyEmailComponent} from './verify-email/verify-email.component'
import {ResetPasswordComponent} from './reset-password/reset-password.component'
import {ExternalLoginComponent} from './external-login/external-login.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  { path: 'getusers', component: UserListComponent },
  { path: 'adduser', component: UserFormComponent },
  { path: 'edituser/:id', component: UserEditComponent },
  { path: 'login', component: LoginComponent },
  {path : 'viewprofile/:id', component:UserProfileComponent,pathMatch: 'full'},
  {path: 'creategroup', component:CreateGroupComponent},
  {path: 'grouplisting', component:GroupListingComponent},
  {path: 'groupdetails/:groupId/:mailId', component:GroupDetailComponent},
  {path: 'following/:id/:mailId', component:FollowListComponent},
  {path: 'follower/:id/:mailId', component:FollowListComponent},
  {path: 'logout', component:LogoutComponent},
  {path: 'verifyemail/:mailId', component:VerifyEmailComponent},
  {path: 'resetpassword', component:ResetPasswordComponent},
  {path: 'resetpassword/:encodedMailId', component:ResetPasswordComponent},
  {path: 'externallogin', component:ExternalLoginComponent},
  {path: 'externallogin/:code', component:ExternalLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
