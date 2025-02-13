package com.amit.courseservice.course.entity;

import com.amit.courseservice.commons.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course extends BaseEntity {

    @Column(nullable = false)
    private String title;
    
    @Column(length = 5000)
    private String description;
    
    @Column(length = 10000)
    private String content;
    
    // One-to-one relation with Pricing; cascading to propagate audit changes
    @OneToOne(mappedBy = "course", cascade = CascadeType.ALL)
    private Pricing pricing;
}
