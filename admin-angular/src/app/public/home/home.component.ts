import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: any;
  loggedIn = false;

  constructor(private http: HttpClient, private router: Router) {
    this.name = "";
  }

  ngOnInit(): void {
    this.loggedIn = localStorage.getItem('token') !== null;

    if (this.loggedIn) {
      // console.log(`Bearer ${localStorage.getItem('token')}`);
      const headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      });

      this.http
        .get('http://localhost:8000/api/home', { headers: headers })
        .subscribe((result) => this.name = result);
    } else {
      this.router.navigate(['login']);
    }

  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
