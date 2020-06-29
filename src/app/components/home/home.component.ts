import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  info: any = {};
  isLogin = false;
  roles: string[];
  authority: string;
  constructor(private tokenService: TokenService,private router: Router) { }

  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      email: this.tokenService.getUserName(),
      authorities: this.tokenService.getAuthorities()
    };

    if (this.tokenService.getToken()) {
      this.isLogin = true;
      this.roles = [];
      this.roles = this.tokenService.getAuthorities();
      this.roles.every(rol => {
        if (rol === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }

  logOut(): void {
    this.tokenService.logOut();
    this.isLogin = false;
    this.authority = '';
    this.router.navigate(['login']);
    
  }

}