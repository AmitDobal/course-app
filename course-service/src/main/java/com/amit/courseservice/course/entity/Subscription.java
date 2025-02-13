package com.amit.courseservice.course.entity;

import com.amit.courseservice.commons.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "subscriptions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Subscription extends BaseEntity {

    @Column(nullable = false)
    private String subscriptionType;  // e.g., "Monthly", "Yearly"
    
    @Column(nullable = false)
    private Instant startDate;
    
    @Column(nullable = false)
    private Instant endDate;
    
    // Subscription is for a specific course.
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;
}
