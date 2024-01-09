import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './models/user';
import { UserService } from './services/users.service';

@Component({
    moduleId: module.id,
    selector: 'user-register',
    templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
    user: User = new User;
    showPassword = false;

    message: string;

    constructor(private userService: UserService,
                private router: Router) {
    }

    ngOnInit(): void { }

    submitForm(): void {
        this.userService.registerUser(this.user)
            .subscribe(
                (response: any) => {
                    // Assuming your backend response contains an 'id' field
                    const userId = response.id;
                    const username: string = response.username;
                    const name: string = response.name;

                    // Do something with the userId, for example, store it in sessionStorage
                    this.dataSaveLogin(userId, username, name);

                    // Navigate to the desired route
                    this.router.navigate(['/prevozi']);
                },
                (error: any) => {
                    this.message = 'Izbrano uporabniško ime že obstaja.';
                }
            );
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    back(): void {
        this.router.navigate(['/prevozi']);
    }

    dataSaveLogin(userId: number, username: string, name: string): void {
        sessionStorage.setItem('userId', userId.toString());
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('name', name);
    }
}
