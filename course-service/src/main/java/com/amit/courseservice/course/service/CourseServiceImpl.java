package com.amit.courseservice.course.service;

import com.amit.courseservice.commons.exception.ResourceNotFoundException;
import com.amit.courseservice.course.entity.Course;
import com.amit.courseservice.course.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    @Override
    public Page<Course> findAll(Pageable pageable) {
        return courseRepository.findAll(pageable);
    }

    @Override
    public Course findById(Long id) {
        return courseRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Course not found with id " + id));
    }

    @Override
    public Course save(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public Course update(Course course) {
        // Optionally merge fields
        Course existing = findById(course.getId());
        // update existing with course values; here we simply save the new version.
        return courseRepository.save(course);
    }

    @Override
    public void delete(Long id) {
        Course course = findById(id);
        courseRepository.delete(course);
    }
}
