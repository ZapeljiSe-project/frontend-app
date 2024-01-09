import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './models/user';
import { UserService } from './services/users.service';

@Component({
    moduleId: module.id,
    selector: 'user-login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    user: User = new User;
    showPassword = false;

    message: string;

    constructor(private userService: UserService,
                private router: Router) {
    }

    ngOnInit(): void { }

    submitForm(): void {
        this.userService.loginUser(this.user)
            .subscribe(
                (response: any) => {
                    // Assuming your backend response contains an 'id' field
                    const userId = response.id;
                    const username: string = response.username;
                    const name: string = response.name;
                    const phone: string = response.phone;

                    // Do something with the userId, for example, store it in sessionStorage
                    this.dataSaveLogin(userId, username, name, phone);

                    // Navigate to the desired route
                    this.router.navigate(['/prevozi']);
                },
                (error: any) => {
                    this.message = 'Napačno uporabniško ime ali geslo.';
                }
            );
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    back(): void {
        this.router.navigate(['/prevozi']);
    }

    dataSaveLogin(userId: number, username: string, name: string, phone: string): void {
        sessionStorage.setItem('userId', userId.toString());
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('phone', phone);
    }
}
