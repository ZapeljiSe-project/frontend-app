import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './models/user';
import { UserService } from './services/users.service';

@Component({
    moduleId: module.id,
    selector: 'user-update',
    templateUrl: 'user-update.component.html'
})
export class UserUpdate implements OnInit {
    user: User = new User;
    showPassword = false;

    constructor(private userService: UserService,
                private router: Router) {
    }

    ngOnInit(): void { 
        this.userService.getUser(Number(this.get())).subscribe(user => this.user = user);
    }

    submitForm(): void {
        this.userService.updateUser(this.user)
            .subscribe(
                () => {
                    this.dataSaveUpdateSession();
                    this.router.navigate(['/prevozi']);
                });
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    get() {
        return sessionStorage.getItem('userId');
    }

    back(): void {
        this.router.navigate(['/prevozi']);
    }

    dataSaveUpdateSession(): void {
        sessionStorage.setItem('userId', this.user.id.toString());
        sessionStorage.setItem('username', this.user.username);
        sessionStorage.setItem('name', this.user.name);
        sessionStorage.setItem('phone', this.user.phone);
    }
}
