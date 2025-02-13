package com.amit.courseservice.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequest {
    @NotBlank
    private String userIdentifier;

    @NotBlank
    private String password;
}
