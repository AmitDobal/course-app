package com.amit.courseservice.auth.service;

import com.amit.courseservice.auth.dto.AuthResponse;
import com.amit.courseservice.auth.dto.RefreshTokenRequest;
import com.amit.courseservice.auth.dto.RegisterRequest;
import com.amit.courseservice.auth.entity.Role;
import com.amit.courseservice.auth.entity.User;
import com.amit.courseservice.commons.exception.AuthException;
import com.amit.courseservice.auth.repository.RoleRepository;
import com.amit.courseservice.auth.repository.UserRepository;
import com.amit.courseservice.auth.security.JwtService;
import com.amit.courseservice.auth.security.RefreshTokenService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    public User register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AuthException("Username already taken", HttpStatus.BAD_REQUEST);
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AuthException("Email already in use", HttpStatus.BAD_REQUEST);
        }
        // Set default role to "ROLE_USER"
        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new AuthException("Default role not found", HttpStatus.BAD_REQUEST));

        Set<Role> roles = new HashSet<>();
        roles.add(userRole);

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(roles)
                .build();

        return userRepository.save(user);
    }

    public AuthResponse login(String userIdentifier, String password) {
        User user = userRepository.findByUsername(userIdentifier)
                .orElseGet(() -> userRepository.findByEmail(userIdentifier)
                        .orElseThrow(() -> new AuthException("User not found", HttpStatus.BAD_REQUEST)));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new AuthException("Invalid credentials", HttpStatus.BAD_REQUEST);
        }

        String token = jwtService.generateToken(user.getUsername());
        var refreshToken = refreshTokenService.createRefreshToken(user);

        String role = user.getRoles().iterator().next().getName();

        return new AuthResponse(token, refreshToken.getToken(),
                "Bearer", user.getUsername(), role);
    }

    public AuthResponse refreshToken(RefreshTokenRequest request) {
        var refreshTokenOpt = refreshTokenService.findByToken(request.getRefreshToken())
                .orElseThrow(() -> new AuthException("Invalid refresh token", HttpStatus.BAD_REQUEST));
        if (!refreshTokenService.verifyExpiration(refreshTokenOpt))
            throw new AuthException("Invalid refresh token", HttpStatus.BAD_REQUEST);

        User user = refreshTokenOpt.getUser();
        String token = jwtService.generateToken(user.getUsername());
        var newRefreshToken = refreshTokenService.createRefreshToken(user);
        String role = user.getRoles().iterator().next().getName();

        return new AuthResponse(token, newRefreshToken.getToken(),
                "Bearer", user.getUsername(), role);
    }
}
