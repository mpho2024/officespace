package com.office.oficeSpace.auth;

public class AuthenticationResponse {
    private String token;
    private String message;
    private String status;
    private String username;

    // Constructor
    public AuthenticationResponse(String token, String message, String status, String username) {
        this.token = token;
        this.message = message;
        this.status = status;
        this.username = username;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Builder class
    public static class Builder {
        private String token;
        private String message;
        private String status;
        private String username;

        public Builder token(String token) {
            this.token = token;
            return this;
        }

        public Builder message(String message) {
            this.message = message;
            return this;
        }

        public Builder status(String status) {
            this.status = status;
            return this;
        }

        public Builder username(String username) {
            this.username = username;
            return this;
        }

        public AuthenticationResponse build() {
            return new AuthenticationResponse(token, message, status, username);
        }
    }

    public static Builder builder() {
        return new Builder();
    }
}