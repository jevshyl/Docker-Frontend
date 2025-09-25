 # README #

This is the frontend to a Fullstack Web application from Jevgenia and Luka.



---



## Backend

[Click here to go to the Backend](https://github.com/Luka0731/UEK223-OurSpace-Group-6-Backend)



---



## Dokumentation

[Click here to go to the documentation](https://github.com/Luka0731/UEK223-OurSpace-Group-6-Frontend/blob/main/docs/ourspace-documentation.pdf)

### Swagger
Default Swagger Endpoint is http://localhost:8080/swagger-ui/index.html. Make sure that the Backend is running first



---



## How to start application

### Backend
#### Set docker up
```
docker run --name postgres_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```
#### Prerequisites
- Node.js (v16+)
- Java 18 (for Gradle)
- Docker
- PostgreSQL
#### Trouble Shooting
```
org.postgresql.util.PSQLException: ERROR: relation "role_authority" does not exist
```
Simply restart the application. Hibernate sometimes does not initialize the tables fast enough and causes this error. Restarting the application fixes this
#### Run Backend
If running it for the first time go to the right side bar -> gradle -> Tasks -> application -> booRun.
Backend runs on: http://localhost:8080. 

### Frontend
Make sure that the Backend is running
#### Install and run Frontend
```
cd react_frontend
yarn install
yarn start
```
Frontend runs on: http://localhost:3000



---



## User Test Data
* Admin: admin@example.com / 1234
* User 1: user@example.com / 1234
* User 2: second@example.com / 1234



---



## Testing

### Cypress
#### Set up
First of all you have to install cypress. For that you'll need to use this command 
```
Yarn add cypress --save-dev
```
To open cypress you can use this:
```
Yarn cypress open
```
You will be redirected to Cypress, where you can choose your browser, where you'll get redirected once again.
#### Run tests
To run the cypress tests, you'll need to go to your Specs, which you'll find in the navbar on your left. Here you see all of our Tests:
- adminCannotAddElements
- userCreatesListElement
- userTriesToAddElementWithoutLogin

Click on one of those tests. I should run directly. If the test stops at the login and doesn't continue just restart the test. That should fix the problem.
#### Where to find tests
You can find our cypress test here:
- UEK223-OurSpace-Group-6-Frontend/cypress/e2e/

### Postman
* The collection of tests you can find in the backend here: \postman\OurSpace-tests.postman_collection.json
* The necessary environment variables for the collection you can find in the backend: \postman\OurSpace-tests.postman_environment.json
* A test run that has been carried out you can find in the backend: \postman\OurSpace-tests.postman_test_run.json
What tests
#### Import to Postman
- Open Postman
- Click "Import" → "File"
- Select spring_backend/tests.postman_collection.json
- Run collection to test all endpoints



---



## Pages

öffentliche Homepage:
- Homepage: http://localhost:3000/
 
User Overview, wo man als User andere Userprofile besuchen kann und als Admin CRUD Operationen zu den Users ausführen kann:
- User Overview: http://localhost:3000/users
 
Auf der ProfilePage kann man den Vor- und Nachnamen des spezifischen Users und die Listeneinträge sehen. In der eigenen ProfilePage kann man als User neue Listeneinträge erstellen und eigene Listeneinträge bearbeiten oder löschen. Als Admin kann man auch der ProfilePage der anderen Users deren Listeneinträge bearbeiten und löschen. Um einen Listeneintrag zu bearbeiten oder löschen kann man einfach auf den Listeneintrag klicken und es öffnet sich ein Dialog.
- Profile Page: http://localhost:3000/http://localhost:3000/profileList/{userId}
