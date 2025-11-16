# -------------------
# Stage 1: Build backend
# -------------------
FROM maven:3.9.2-eclipse-temurin-20 AS backend-build
WORKDIR /app/backend
COPY backend/pom.xml ./
RUN mvn dependency:go-offline -B
COPY backend/ ./
RUN mvn package -DskipTests

# -------------------
# Stage 2: Build frontend
# -------------------
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps
COPY frontend/ ./

# Use the **Angular output folder from angular.json**
# Usually it's "dist/<project-name>", check angular.json -> outputPath
RUN npx ng build --configuration production

# -------------------
# Stage 3: Final image
# -------------------
FROM eclipse-temurin:20-jdk
WORKDIR /app

# Copy backend jar
COPY --from=backend-build /app/backend/target/*.jar app.jar

# Copy Angular build output to Spring Boot static folder
# Replace 'OnlineJobPortal' with the actual folder name from dist/
COPY --from=frontend-build /app/frontend/dist/* /app/static

EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]