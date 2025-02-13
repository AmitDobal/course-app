package com.amit.courseservice.course.mapper;

import com.amit.courseservice.course.dto.CouponDTO;
import com.amit.courseservice.course.entity.Coupon;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CouponMapper {
    CouponDTO toDto(Coupon coupon);
    Coupon toEntity(CouponDTO couponDTO);
}
