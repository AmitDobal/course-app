package com.amit.courseservice.course.service;

import com.amit.courseservice.course.dto.CourseFilterDTO;
import com.amit.courseservice.course.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Map;

public interface CourseService {
    Page<Course> findAll(Pageable pageable);
    Page<Course> findAll(CourseFilterDTO courseFilterDTO, Pageable pageable);
    Course findById(Long id);
    Course save(Course course);
    void saveAll(List<Course> courses);
    Course update(Course course);
    void delete(Long id);
}
