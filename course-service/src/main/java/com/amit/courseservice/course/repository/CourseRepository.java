package com.amit.courseservice.course.repository;

import com.amit.courseservice.course.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {}
