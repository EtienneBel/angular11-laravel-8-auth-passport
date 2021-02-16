import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: '',
      password: '',
    });
  }

  submit() {
    
    const formData = this.form.getRawValue();

    const data = {
      email: formData.email,
      password: formData.password
    };

    this.http.post('http://localhost:8000/api/login', data).subscribe(
      (result:any) => {
        // console.log(result);
        localStorage.setItem('token', result.data['token']);
        this.router.navigate(['/']);
      },
      (error) => {
        alert('Mauvais identifiant. Réessayez.');
        // console.log(error);
      }
    );
  }
}
