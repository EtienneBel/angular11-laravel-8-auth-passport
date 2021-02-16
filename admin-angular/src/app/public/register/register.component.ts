import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder,
    private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      c_password: ['', Validators.required],
    })
  }

  submit() {
    const formData = this.form.getRawValue();

    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      c_password: formData.c_password,
    };


    console.log(formData);
    this.http.post('http://localhost:8000/api/register', data).subscribe(
      (result: any) => {
        console.log(result)
        localStorage.setItem('token', result.data['token']);
        this.router.navigate(['/']);
      },
      (error) => console.log(error)
    )
  }
}
