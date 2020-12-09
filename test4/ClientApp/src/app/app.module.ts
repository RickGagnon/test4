import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

//import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatMenuModule, MatSnackBarModule, MatProgressBar, MatProgressBarModule, MatSpinner, MatProgressSpinnerModule } from '@angular/material/';
import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { UsersListComponent } from './users-list/users-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LinkConvertComponent } from './link-convert/link-convert.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
        FetchDataComponent,
        AdminComponent,
        LoginComponent,
        UsersListComponent,
        LinkConvertComponent,
        

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      MatToolbarModule,
      MatCardModule,
      MatButtonModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      BrowserAnimationsModule,
      MatMenuModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatSnackBarModule,
    RouterModule.forRoot([
      //{ path: '', component: HomeComponent, pathMatch: 'full' },
      //{ path: 'counter', component: CounterComponent },
      //  { path: 'fetch-data', component: FetchDataComponent },
        {
            path: '',
            component: HomeComponent,
            canActivate: [AuthGuard]
        },
        {
            path: 'admin',
            component: AdminComponent,
            canActivate: [AuthGuard],
            data: { roles: [Role.Admin] }
        },
        {
            path: 'userlist',
            component: UsersListComponent,
            canActivate: [AuthGuard],
            data: { roles: [Role.Admin] }
        },
        {
            path: 'login',
            component: LoginComponent
        },
        {
            path: 'link-convert',
            component: LinkConvertComponent
        },
        // otherwise redirect to home
        { path: '**', redirectTo: '' }
    ])
  ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        //fakeBackendProvider
    ],

  bootstrap: [AppComponent]
})
export class AppModule { }
