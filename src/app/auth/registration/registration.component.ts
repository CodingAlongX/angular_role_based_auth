import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Role} from '../models/role.model';
import {AuthService} from '../services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  role: Role = new Role();

  form = this.fb.group({
    userName: ['', Validators.required],
    email: ['', Validators.email],
    firstName: [''],
    lastName: [''],
    roles: [[]],
    passwords: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, {validators: [this.comparePasswords]})
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  comparePasswords(fg: FormGroup): void {
    const password = fg.get('password');
    const confirmPassword = fg.get('confirmPassword');

    if (confirmPassword.errors == null || 'passwordMismatch' in confirmPassword.errors) {
      if (confirmPassword.value !== password.value) {
        confirmPassword.setErrors({passwordMismatch: true});
      } else {
        confirmPassword.setErrors(null);
      }
    }
  }

  onSubmit(): void {

    this.authService.register(this.form).subscribe(
      (response: any) => {
        this.form.reset();
        this.toastr.success(response.message);
      },
      error => {
        error.error.forEach(e => {
            switch (e.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken', 'Registration failed');
                break;
              default:
                this.toastr.error(e.message, 'Registration failed');
                break;

            }
          }
        );
      });
  }


}
