import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: './header-en.component.html',
})
export class HeaderENComponent implements OnInit {
    constructor( private router: Router, private authService: AuthService ) { }

    ngOnInit() { }


      onsubmit(){    
        console.log("insie logout")
        this.authService.logout();

    }
}