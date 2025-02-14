package com.amit.courseservice.commons.validators.notempty;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = NotEmptyStringValidator.class)
public @interface NotEmptyString {

    String message() default "Field cannot be blank or empty";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

