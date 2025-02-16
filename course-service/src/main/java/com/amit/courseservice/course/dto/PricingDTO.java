package com.amit.courseservice.course.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.math.BigDecimal;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PricingDTO {
    private Long id;

    @NotNull
    private BigDecimal price;

    private BigDecimal discount;
}
