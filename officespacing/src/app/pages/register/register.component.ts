import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  regForm!: FormGroup;
  submitted = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.regForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidation
    });
  }

  passwordMatchValidation(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  get PasswordMismatch() {
    return this.regForm.get('confirmPassword')?.errors?.['passwordMismatch'];
  }

  submit() {
    this.submitted = true;
    this.errorMessage = null;

    if (this.regForm.valid) {
      const registrationData = {
        firstname: this.regForm.value.firstname,
        lastname: this.regForm.value.lastname,
        email: this.regForm.value.email,
        password: this.regForm.value.password,
        role: "USER"
      };

      this.authService.register(registrationData).subscribe({
        next: res => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            setTimeout(() => {
              window.location.href = '/login';
            }, 2000);
          }
        }
      });
    }
  }
}