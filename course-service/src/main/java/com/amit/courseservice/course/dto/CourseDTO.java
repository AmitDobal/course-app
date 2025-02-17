package com.amit.courseservice.course.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseDTO {
    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    private String content;

    private PricingDTO pricing;
    private String imageUrl = "https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?t=st=1739724343~exp=1739727943~hmac=e26d6abdb6c15396990cb0edce69a23f7263063b85de5ea71f734cbd9df76728&w=900";
    private Instant createdAt;
    private String createdBy;
    private Instant updatedAt;
    private String updatedBy;
}
