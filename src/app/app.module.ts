import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './user-service.service';
import { UserEditComponent } from './user-edit/user-edit.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import { FormGroup,FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { GroupListingComponent } from './group-listing/group-listing.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FollowListComponent } from './follow-list/follow-list.component';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import {MatTableModule } from '@angular/material/table'
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import {MatToolbarModule } from '@angular/material/toolbar'
import {MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule} from '@angular/material/list'
import { MatIconModule} from '@angular/material/icon'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { LogoutComponent } from './logout/logout.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule,MatGridTile } from '@angular/material/grid-list';
import { MatBadgeModule } from '@angular/material/badge';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DisableBackComponent } from './disable-back/disable-back.component';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {TokenInterceptorService} from './token-interceptor.service';
import { ExternalLoginComponent } from './external-login/external-login.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    UserEditComponent,
    LoginComponent,
    UserProfileComponent,
    UserSearchComponent,
    CreateGroupComponent,
    GroupListingComponent,
    GroupDetailComponent,
    FollowListComponent,
    HeaderComponent,
    LogoutComponent,
    VerifyEmailComponent,
    ResetPasswordComponent,
    DisableBackComponent,
    ExternalLoginComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule,
    NgbModule,
    MatCardModule, 
   MatButtonModule,
   MatTableModule,
   FlexLayoutModule,
   NgxChartsModule,
   MatToolbarModule,
   MatSidenavModule,
   MatListModule,
   MatIconModule,
   BrowserAnimationsModule,
   MatFormFieldModule,
   MatMenuModule,
   MatProgressSpinnerModule,
   MatGridListModule,
   MatBadgeModule,
   LoadingBarModule,
   LoadingBarRouterModule,
   MatInputModule,
   MatNativeDateModule,
   MatDatepickerModule
  ],
  providers: [UserService,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
