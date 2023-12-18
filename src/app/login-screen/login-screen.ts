import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/fitness-app-sdk/package/services/user-service/user-service';
import { User } from 'src/fitness-app-sdk/package/models/users';
import { catchError, map } from 'rxjs';
@Component({
  selector: 'login-screen',
  templateUrl: 'login-screen.html',
  styleUrls: ['login-screen.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      email: [],
      password: [],
    });
  }

  navigate() {
    this.router.navigate(['onboarding']);
  }

  handleSubmit() {
    const user = new User();
    user.email = this.form.get('email')?.value;
    user.password = this.form.get('password')?.value;
    // this.userService.authenticate(user).pipe(
    //   map((token) =>{
        
    //       localStorage.setItem('token', token);
    //       //route to home
        
    //   }),
    //   catchError((err) => )
    // );
  }
}
