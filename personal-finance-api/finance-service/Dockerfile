FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/finance-service-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 2000
ENTRYPOINT ["java", "-jar", "app.jar"]