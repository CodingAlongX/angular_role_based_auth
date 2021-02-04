import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formModel = {
    userName: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit(form: NgForm): void {
    this.authService.login(form.value).subscribe((result: any) => {
      localStorage.setItem('token', result.token);
      this.router.navigateByUrl('/');
    }, (error) => {
      if (error.status === 400) {
        this.toastr.error('Incorrect username or password', 'Authentication failed');
      } else {
        console.log(error);
      }
    });
  }
}
