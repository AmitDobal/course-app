package com.amit.courseservice.course.repository;

import com.amit.courseservice.course.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CouponRepository extends JpaRepository<Coupon, Long> {}
