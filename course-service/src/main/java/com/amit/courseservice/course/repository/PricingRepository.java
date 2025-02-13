package com.amit.courseservice.course.repository;

import com.amit.courseservice.course.entity.Pricing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PricingRepository extends JpaRepository<Pricing, Long> {}
