package com.amit.courseservice.course.specification;

import com.amit.courseservice.course.dto.CourseFilterDTO;
import com.amit.courseservice.course.entity.Course;
import com.amit.courseservice.course.entity.Course_;
import com.amit.courseservice.course.entity.Pricing_;
import jakarta.persistence.criteria.Predicate;

import java.util.ArrayList;
import java.util.Objects;

import org.springframework.data.jpa.domain.Specification;

public class CourseSpecification {

    public static Specification<Course> list(CourseFilterDTO filter) {
        return (root, query, criteriaBuilder) -> {
            var predicates = new ArrayList<Predicate>();

            if (Objects.nonNull(filter)) {
                // Filter by course title (case-insensitive)
                if (Objects.nonNull(filter.getTitle())) {
                    predicates.add(
                            criteriaBuilder.like(
                                    criteriaBuilder.lower(root.get(Course_.title)),
                                    like(filter.getTitle())
                            )
                    );
                }

                // Filter by course description (case-insensitive)
                if (Objects.nonNull(filter.getDescription())) {
                    predicates.add(
                            criteriaBuilder.like(
                                    criteriaBuilder.lower(root.get(Course_.description)),
                                    like(filter.getDescription())
                            )
                    );
                }

                // Pricing filters (assuming a one-to-one join with "pricing")
                if (Objects.nonNull(filter.getMinPrice())) {
                    predicates.add(
                            criteriaBuilder.greaterThanOrEqualTo(root.join(Course_.pricing).get(Pricing_.price), filter.getMinPrice())
                    );
                }
                if (Objects.nonNull(filter.getMaxPrice())) {
                    predicates.add(
                            criteriaBuilder.lessThanOrEqualTo(root.join(Course_.pricing).get(Pricing_.price), filter.getMaxPrice())
                    );
                }

                // Audit filters
                if (Objects.nonNull(filter.getCreatedBy())) {
                    predicates.add(
                            criteriaBuilder.equal(root.get(Course_.createdBy), filter.getCreatedBy())
                    );
                }
                if (Objects.nonNull(filter.getUpdatedBy())) {
                    predicates.add(
                            criteriaBuilder.equal(root.get(Course_.updatedBy), filter.getUpdatedBy())
                    );
                }
                if (Objects.nonNull(filter.getCreatedAtFrom())) {
                    predicates.add(
                            criteriaBuilder.greaterThanOrEqualTo(root.get(Course_.createdAt), filter.getCreatedAtFrom())
                    );
                }
                if (Objects.nonNull(filter.getCreatedAtTo())) {
                    predicates.add(
                            criteriaBuilder.lessThanOrEqualTo(root.get(Course_.createdAt), filter.getCreatedAtTo())
                    );
                }
                if (Objects.nonNull(filter.getUpdatedAtFrom())) {
                    predicates.add(
                            criteriaBuilder.greaterThanOrEqualTo(root.get(Course_.updatedAt), filter.getUpdatedAtFrom())
                    );
                }
                if (Objects.nonNull(filter.getUpdatedAtTo())) {
                    predicates.add(
                            criteriaBuilder.lessThanOrEqualTo(root.get(Course_.updatedAt), filter.getUpdatedAtTo())
                    );
                }
            }


            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static String like(String filter) {
        return "%" + filter.toLowerCase() + "%";
    }
}
