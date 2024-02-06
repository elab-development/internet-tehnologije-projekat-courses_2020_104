# Getting Started with app

List of steps you need to do in order to run the app

## Prerequisites 

* NodeJs
* PHP
* composer
* mysql

## Starting the server app

* Create db named courses
* Execute `composer install`
* Execute `php artisan migrate`
* Execute `php artisan db:seed`
* Execute `php artisan serve`

## Starting the client app

* Execute `npm install`
* Exectute `npm start`

# Functionalities

The app has 3 types of users

* Student
* Teacher 
* Admin

Student can search and listen to courses. Teacher and admin can create, update and delete a course.

Teacher can only update and delete it's own course.

Admin can delete any course

