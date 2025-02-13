package com.amit.courseservice.course.repository;

import com.amit.courseservice.course.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {}
