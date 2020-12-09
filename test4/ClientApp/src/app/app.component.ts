import { Component,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services';
import { User, Role } from './_models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    currentUser: User;
    title = 'Atess Software Applications';
    constructor(private router: Router, private authenticationService: AuthenticationService)
    {
        //this.router.navigate(['/login']);
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    }
    get isAdmin() {
        return this.currentUser && this.currentUser.role === Role.Admin;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
