package com.amit.courseservice.course.mapper;

import com.amit.courseservice.course.dto.CourseDTO;
import com.amit.courseservice.course.entity.Course;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {PricingMapper.class})
public interface CourseMapper {
    @Mapping(source = "pricing", target = "pricing")
    CourseDTO toDto(Course course);
    Course toEntity(CourseDTO courseDTO);
}
