package com.amit.courseservice.course.entity;

import com.amit.courseservice.commons.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "coupons")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Coupon extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String code;
    
    @Column(nullable = false)
    private BigDecimal discountPercentage;
    
    @Column(nullable = false)
    private Instant expiryDate;
}
