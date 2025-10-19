FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/notification-service-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 2003
ENTRYPOINT ["java", "-jar", "app.jar"]