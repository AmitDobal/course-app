package com.amit.courseservice.course.mapper;

import com.amit.courseservice.course.dto.SubscriptionDTO;
import com.amit.courseservice.course.entity.Course;
import com.amit.courseservice.course.entity.Subscription;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface SubscriptionMapper {

    // Mapping for toDto: from Subscription to SubscriptionDTO
    @Mapping(source = "course.id", target = "courseId")
    SubscriptionDTO toDto(Subscription subscription);

    // Mapping for toEntity: from SubscriptionDTO to Subscription
    // Instead of mapping to "course.id" directly, map the entire "course" field
    @Mapping(source = "courseId", target = "course", qualifiedByName = "mapCourseFromId")
    Subscription toEntity(SubscriptionDTO subscriptionDTO);

    // Helper method that converts a courseId to a Course object with that id.
    @Named("mapCourseFromId")
    default Course mapCourseFromId(Long courseId) {
        if (courseId == null) {
            return null;
        }
        Course course = new Course();
        // Manually set the id; assuming Course has a setter or a constructor that sets id.
        course.setId(courseId);
        return course;
    }
}
