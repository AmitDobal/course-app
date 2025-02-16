package com.amit.courseservice.course.entity;

import com.amit.courseservice.commons.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "pricings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pricing extends BaseEntity {

    @Column(nullable = false)
    private BigDecimal price;
    
    @Column
    private BigDecimal discount;  // Optional discount field
    
    @OneToOne(mappedBy = "pricing")
    private Course course;
}
