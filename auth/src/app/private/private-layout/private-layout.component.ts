import {Component, OnInit} from '@angular/core';
import { Event, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss']
})
export class PrivateLayoutComponent implements OnInit {

  constructor(
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {}

  logout() {
    this.authService.logout().subscribe(()=> {
      console.log('Вышли из системы');
    });
    this.authService.setAuth(false);
    localStorage.removeItem('token');
    this.router.navigate(['/admin', 'login']);
  }
}
