# Stage 1: Build the Spring Boot application using Maven
FROM maven:3.8.3-openjdk-17 AS build
WORKDIR /app

# Copy Maven configuration and source code
COPY pom.xml .
COPY src ./src

# Package the application (skip tests for faster builds; remove -DskipTests if tests are needed)
RUN mvn clean package -DskipTests

# Stage 2: Create the runtime image
FROM openjdk:17-slim
WORKDIR /app

# Copy the built jar from the Maven build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
