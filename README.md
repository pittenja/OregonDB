# OregonDB


To Run app:

1. install Node if not currently installed on your computer (this step is not required if running app on flip servers) : https://nodejs.org/en/

2. on lines 16-19 of Backend.js, fill in proper information for your cs340 database. remove your user and password when pushing to github

3. in terminal, navigate to directory with all app contents

4. run 'npm install express' in terminal 

5. run 'npm install mysql' in terminal

6. run 'npm install express-handlebars' in terminal

7. run 'npm install body-parser' in terminal

8. to start the application on port 2727, run 'node Backend.js 2727' in terminal

9. once steps 4-7 have been done once, you do not need to do them again

NOTE: when submitting the final project - run app in the "Forever" context so that app stays active for grading

To run on flip server:

1. run 'npm install forever' in terminal
2. run the command './node_modules/forever/bin/forever start Backend.js 2727' to run the app on port 2727
App is accessible at http://flipx.engr.oregonstate.edu:2727/ - replace 'x' after flip with flip server number