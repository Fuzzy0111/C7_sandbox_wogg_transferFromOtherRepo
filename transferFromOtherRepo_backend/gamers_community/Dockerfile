# Multi-stage build for efficient image size

# Build stage - Use Gradle to build the application
FROM gradle:8.14-jdk21-alpine AS builder

# Set working directory
WORKDIR /app

# Copy Gradle wrapper and build files
COPY gradle gradle
COPY gradlew .
COPY gradle.properties .
COPY settings.gradle .
COPY build.gradle .

# Copy source code
COPY src src

# Build WAR only for Tomcat deployment
RUN gradle clean war --no-daemon -x test

# Runtime stage - Use Tomcat 10 for JDK 21 compatibility
FROM tomcat:10.1-jdk21

# Remove default Tomcat applications
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy the built WAR file from builder stage
# This now uses your dual-mode WAR output: app.war
COPY --from=builder /app/build/libs/app.war /usr/local/tomcat/webapps/ROOT.war

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Set JVM options optimized for Micronaut + Tomcat
ENV CATALINA_OPTS="-Xmx512m -Xms256m -server -Djava.security.egd=file:/dev/./urandom"
ENV JAVA_OPTS="-Djava.awt.headless=true"

# Create logs directory
RUN mkdir -p /usr/local/tomcat/logs
 
EXPOSE 8080

# Start Tomcat
CMD ["catalina.sh", "run"]


