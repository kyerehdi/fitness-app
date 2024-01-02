import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/fitness-app-sdk/package/services/user-service/user-service';
import { User } from 'src/fitness-app-sdk/package/models/users';
import { catchError, map } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { UserStateI } from '../store/users/new-user.reducer';
import { State, Store } from '@ngrx/store';
import { authenticate } from '../store/users/new-user.actions';
@Component({
  selector: 'login-screen',
  templateUrl: 'login-screen.html',
  styleUrls: ['login-screen.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private store$: Store<State<UserStateI>>
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
    if (user?.email && user?.password) {
      this.store$.dispatch(
        authenticate({
          user: {
            email: user.email,
            password: user.password,
          },
        })
      );
    }
    // this.userService
    //   .authenticate(user)
    //   .pipe(
    //     map((token) => {
    //       localStorage.setItem('token', token);

    //     }),
    //     catchError(
    //       async (err) =>{
    //         const alertBox = await this.alertController.create({
    //           header:"Login Failure",
    //           message: err.error,
    //           buttons: ['Close']
    //         })
    //         await alertBox.present();
    //       }
    //     )
    //   )
    //   .subscribe();
  }
}
