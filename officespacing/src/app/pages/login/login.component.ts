import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service'; // Ensure this import path is correct
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginMsg: string | null = null;
  loginSuccess: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      check: [false] // Optional field
    });
  }

  ngOnInit() {
    // You can initialize additional logic here if needed
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(res => {
        if (res.status === "OK") {
          Swal.fire({
            title: "Success!",
            text: res.message,
            icon: "success",
            customClass: {
              confirmButton: 'custom-ok-button'
            }
          });
          this.loginSuccess = true;
          localStorage.setItem('token', res.token);

          setTimeout(() => {
            window.location.href = '/hunter-profile';
          }, 2000);
        }
      }, error => {
        // Handle observable error (e.g., network issue, server error)
        this.loginMsg = "Login failed";
        this.loginSuccess = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password or email incorrect!",
          customClass: {
            confirmButton: 'custom-ok-button'
          }
        });
      });
    }
  }
}
