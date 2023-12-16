import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'login-screen',
  templateUrl: 'login-screen.html',
  styleUrls: ['login-screen.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      email: [],
      password: [],
    });
  }


  navigate() {
    this.router.navigate(['onboarding']);
  }


  handleSubmit(){
    
  }
}
