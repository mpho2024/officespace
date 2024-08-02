package com.office.oficeSpace.auth;

public class AuthenticationRequest {
    private String email;
    private String password;

    // Getters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
