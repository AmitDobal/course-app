package com.amit.courseservice.course.service;

import com.amit.courseservice.course.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CourseService {
    Page<Course> findAll(Pageable pageable);
    Course findById(Long id);
    Course save(Course course);
    Course update(Course course);
    void delete(Long id);
}
