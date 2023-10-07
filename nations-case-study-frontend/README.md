# Case Study project

This project provides a full stack application to provide different views using data from a database of nations.

## Build for development

1. Add database username and password in `nations-case-study-backend\src\main\resources\application.properties`.

2. Start Back end:

```shell
cd nations-case-study-backend
.\mvnw spring-boot:run
```

3. Start front end:

```shell
cd nations-case-study-frontend
ng serve
```

4. Open a browser in `http://localhost:4200`

## Build for production

1. Add database username and password in `nations-case-study-backend\src\main\resources\application.properties`.

2. Build front end application:

```shell
cd nations-case-study-frontend
ng build
```

3. Copy all files from `nations-case-study-frontend\dist\nations-case-study-ui` to `nations-case-study-backend\src\main\resources\static`

4. Build application as a jar file and execute it

```shell
cd nations-case-study-backend
mvn clean install
java -jar .\target\nationscasestudy-0.0.1-SNAPSHOT.jar
```

5. Open a browser in `http://localhost:8080`