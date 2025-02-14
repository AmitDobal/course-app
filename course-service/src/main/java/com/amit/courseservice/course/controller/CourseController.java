package com.amit.courseservice.course.controller;

import com.amit.courseservice.commons.dto.PaginationResponse;
import com.amit.courseservice.commons.utils.ResponseUtils;
import com.amit.courseservice.course.dto.CourseDTO;
import com.amit.courseservice.course.mapper.CourseMapper;
import com.amit.courseservice.course.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;
    private final CourseMapper courseMapper;

    @GetMapping
    public ResponseEntity<PaginationResponse<CourseDTO>> getAllCourses(Pageable pageable) {
        Page<CourseDTO> courses = courseService.findAll(pageable)
            .map(courseMapper::toDto);
        return ResponseEntity.ok(ResponseUtils.convertPageToPaginationResponse(courses));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDTO> getCourse(@PathVariable Long id) {
        CourseDTO courseDTO = courseMapper.toDto(courseService.findById(id));
        return ResponseEntity.ok(courseDTO);
    }

    @PostMapping
    public ResponseEntity<CourseDTO> createCourse(@Valid @RequestBody CourseDTO courseDTO) {
        CourseDTO saved = courseMapper.toDto(courseService.save(courseMapper.toEntity(courseDTO)));
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseDTO> updateCourse(@PathVariable Long id, @Valid @RequestBody CourseDTO courseDTO) {
        courseDTO.setId(id);
        CourseDTO updated = courseMapper.toDto(courseService.update(courseMapper.toEntity(courseDTO)));
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        courseService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
