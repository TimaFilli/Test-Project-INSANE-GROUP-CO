# Test-Project-INSANE-GROUP-CO

## For all methods you need ```TOKEN```
## You can take ```TOKEN``` after registration or ligin
#

### ```Each request must contain a token```
```
Request.heders.token => TOKEN
```
## ```Pagination on Query Params in key "page"```

#
## INSTALL
```
npm i
```
#
## RUN project
 ```
 npm run start
 ```
#
## RUN with ```nodemon```
 ```
 npm run start:dev
 ```
#
#### ***```first step: registration =>```*** http://localhost:5000/user/register
    {
        "username": required!
        "password": required!
        "email": required!
    }
    response:
    {
        "status": ""
        "message": ""
        "data": {
            "userId": ""
            "username": ""
            "email": ""
            "updatedAt": ""
            "createdAt": ""
        },
        "token": ""
    }


#### ***``second step: login =>``*** http://localhost:5000/user/login
    {
        "username": required!
        "password": required!
    }
    response:
    {
        "status": ""
        "message": ""
        "data": {
            "userId": ""
            "username": ""
            "email": ""
            "updatedAt": ""
            "createdAt": ""
        },
        "token": ""
    }

#### ***```get all users:```*** http://localhost:5000/profiles     ***```pagination with Query Params => "?page=1"```***
    response: []

#### ***```get one user:```*** http://localhost:5000/profile/:userId
    response: []

#### ***```change user:```*** http://localhost:5000/profile/:userId
    {
        "username": "",
        "email": ""
    }.required!

#### ***`delete user:`*** http://localhost:5000/profile/:userId


# **POST**

#### ***```get all posts =>```*** http://localhost:5000/posts      ***```pagination with Query Params => "?page=1"```***
    response: []

#### ***```get one user:```*** http://localhost:5000/post/:postId
    response: []


#### ***```write post => method POST =>```*** http://localhost:5000/posts
    {
        "title": "something",
        "content": "another something!"
    }
    response:
    {
        "status": ""
        "message": ""
        "data": {}
    }

#### ***```delete post => method delete =>```*** http://localhost:5000/post/:postId
    response:
    {
        "status": ""
        "message": ""
        "data": {}
    }
