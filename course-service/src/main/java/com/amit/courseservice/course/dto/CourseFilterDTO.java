package com.amit.courseservice.course.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;

@Data
public class CourseFilterDTO {
    // Course fields
    private String title;
    private String description;

    // Pricing filters (assumes Pricing entity has a "price" field)
    private BigDecimal minPrice;
    private BigDecimal maxPrice;

    // Audit filters
    private String createdBy;
    private String updatedBy;
    private Instant createdAtFrom;
    private Instant createdAtTo;
    private Instant updatedAtFrom;
    private Instant updatedAtTo;

}
