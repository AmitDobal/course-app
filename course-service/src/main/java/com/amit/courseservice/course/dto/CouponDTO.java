package com.amit.courseservice.course.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CouponDTO {
    private Long id;
    
    @NotBlank(message = "Coupon code is required")
    private String code;
    
    @NotNull(message = "Discount percentage is required")
    @DecimalMin(value = "0.0", inclusive = false)
    @DecimalMax(value = "100.0", inclusive = false)
    private BigDecimal discountPercentage;
    
    @NotNull(message = "Expiry date is required")
    private Instant expiryDate;
    
    private Instant createdAt;
    private String createdBy;
    private Instant updatedAt;
    private String updatedBy;
}
