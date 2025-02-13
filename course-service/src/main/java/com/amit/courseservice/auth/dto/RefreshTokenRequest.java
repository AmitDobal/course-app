package com.amit.courseservice.auth.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefreshTokenRequest {
    private String refreshToken;
}
