import { NgModule } from '@angular/core';
import { LoginPage } from './login-screen';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
];

@NgModule({
  providers: [],
  imports: [RouterModule.forChild(routes), IonicModule, ReactiveFormsModule],
  declarations: [LoginPage],
})
export class LoginModule {}
