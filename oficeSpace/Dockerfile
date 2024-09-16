#define base docker image
# Start with a base image containing Java runtime
FROM openjdk:17

# Add Maintainer Info
LABEL maintainer="mpho2024"
ADD target/oficeSpace-0.0.1-SNAPSHOT.jar springboot-docker-demo.jar

# Add a volume pointing to /tmp or /usr/share or /opt/
VOLUME /tmp


# Make port 8080 available to the world outside this container
EXPOSE 8080



# Run the jar file

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar","springboot-docker-demo.jar"]