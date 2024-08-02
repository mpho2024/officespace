import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service'; // Ensure this import path is correct

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  regForm!: FormGroup; // Changed to regForm to match HTML
  submitted = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.regForm = this.fb.group({
      name: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      agreeTerms: [false, [Validators.requiredTrue]]
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
    if (this.regForm.valid) {
      const registrationData = {
        firstname: this.regForm.value.name,
        lastname: this.regForm.value.lname,
        email: this.regForm.value.email,
        password: this.regForm.value.password,
        role: "USER"
      };

      this.authService.register(registrationData).subscribe(res => {
        if (res.token !== null) {
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        } else {
          // Handle registration error
        }
      });
    }
  }
}
