FROM openjdk:22-jdk-slim
WORKDIR /app
COPY mvnw .
COPY .mvn .mvn
COPY src src
COPY pom.xml .
EXPOSE 10201
CMD ["./mvnw", "spring-boot:run"]
