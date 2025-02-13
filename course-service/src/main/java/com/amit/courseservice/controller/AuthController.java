package com.amit.courseservice.controller;

import com.amit.courseservice.dto.AuthRequest;
import com.amit.courseservice.dto.AuthResponse;
import com.amit.courseservice.dto.RegisterRequest;
import com.amit.courseservice.dto.RefreshTokenRequest;
import com.amit.courseservice.security.RefreshTokenService;
import com.amit.courseservice.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest request) {
        authService.register(request);
        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthRequest request) {
        return ResponseEntity.ok(authService.login(request.getUserIdentifier(), request.getPassword()));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody RefreshTokenRequest request) {
        return ResponseEntity.ok(authService.refreshToken(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody RefreshTokenRequest request) {
        refreshTokenService.deleteByToken(request.getRefreshToken());
        return ResponseEntity.ok("Logged out successfully");
    }
}
