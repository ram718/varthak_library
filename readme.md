# Library App

## Introduction

- This app is a simple backend application of a simple library management.
- There are two types of API's , one is for users and the other one is for books.

## User Schema and User API

- The schema for user is {email,password,name,role}.
- There are two routes - register and login.

### Register API

- This API is to register new user.
- API - endpoint:"/user/register"

### Login API

- This API is to login with a token.
- API - endpoint:"/user/login"

## Books Schema and Books API

- The schema for book is {title,author,year}.
- There are two requests - Post and Get.
- The books can be created and can be viewed with the help of the user's role.
- There are 3 roles for the user - CREATOR, VIEWER, VIEW_ALL
- Users with the role "CREATOR" can create books.
- Users with the role "VIEWER" can view books created by them.
- Users with role "VIEW_ALL" can see all created books.

### Creating books API

- This API is used to add new books into the library.
- API - endpoint:"/books"

### View Books API

- This API is used to get all the books data that is present in the database of the library.(Depending on the role of the user the results are given as response accordingly)
- API - endpoint:"/books"
- There are queries like old=1 and new=1 which will give the response of books that are added more than 10 minutes or below 10 minutes respectively.
- API - endpoint:"/books?old=1" or "/books?new=1"
