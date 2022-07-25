FROM openjdk:17-ea-11-jdk-slim

VOLUME /tmp
COPY build/libs/beedly-0.0.1-SNAPSHOT.jar beedly.jar

ENTRYPOINT ["java","-jar","beedly.jar"]

# wornjs135 도커 허브 계정명

# docker build -t wornjs135/beedly .
# docker push wornjs135/beedly
# docker run -d -p 8080:8080 --name beedly wornjs135/beedly:latest