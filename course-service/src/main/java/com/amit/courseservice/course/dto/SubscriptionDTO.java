package com.amit.courseservice.course.dto;

import lombok.*;
import java.time.Instant;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubscriptionDTO {
    private Long id;
    
    @NotBlank(message = "Subscription type is required")
    private String subscriptionType;
    
    @NotNull(message = "Start date is required")
    private Instant startDate;
    
    @NotNull(message = "End date is required")
    private Instant endDate;
    
    @NotNull(message = "Course id is required")
    private Long courseId;
    
    private Instant createdAt;
    private String createdBy;
    private Instant updatedAt;
    private String updatedBy;
}
