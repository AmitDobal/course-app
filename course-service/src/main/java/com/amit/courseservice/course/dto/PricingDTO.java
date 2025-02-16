package com.amit.courseservice.course.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PricingDTO {
    private Long id;
    private BigDecimal price;
    private BigDecimal discount;
}
