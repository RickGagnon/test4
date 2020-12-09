import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../_models/user";
import { UserService } from '../_services';
import { Role } from '../_models';

@Component({
  selector: 'userslist',
    templateUrl: './users-list.component.html'
})
export class UsersListComponent {
  public users: User[];
    loading: boolean;
    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private userService: UserService, ) {
        this.loading = true;
        userService.getAll().subscribe(result => { this.users = result }, error => console.error(error), () => { this.loading = false; });

    //    http.get<User[]>(baseUrl + 'users').subscribe(result => {
    //  this.users = result;
    //}, error => console.error(error));
    }
    //addUser() {
    //    let d = new User();
    //    d.firstName = "Neil";
    //    d.lastName = "Ybey";
    //    d.password = "Test";
    //    d.role = Role.Admin;
    //    d.username = "Neil";
    //    this.userService.addUser(d).subscribe(result => this.users.push(result));
        
    //}


}


