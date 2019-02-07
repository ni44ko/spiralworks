import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})

export class TopNavbarComponent implements OnInit {
  activeLink: number = 1;
  showRegisterMenu: boolean = true;

  constructor(private route: Router, private routeConfig: ActivatedRoute, public authService: AuthenticationService) { }

  ngOnInit() {
    console.log(this.route.url);
    if (this.route.url === '/register') {
      this.showRegisterMenu = true;
    } else {
      this.showRegisterMenu = false;
    }

  }


  linkClick(link: number) {
    this.activeLink = link;
  }

  gotoLogin() {
    this.authService.logout();
    this.route.navigate(['/login']);
  }
}
