package com.amit.courseservice.course.mapper;

import com.amit.courseservice.course.dto.PricingDTO;
import com.amit.courseservice.course.entity.Pricing;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PricingMapper {
    PricingDTO toDto(Pricing pricing);
    Pricing toEntity(PricingDTO pricingDTO);
}
