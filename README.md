# Test-Project-INSANE-GROUP-CO

## for all methods you need TOKEN
## you can take TOKEN after registration or ligin

### request.heders.token => "TOKEN"
### pagination on Query Params in key "page"


#### first step: registration => http://localhost:5000/user/register
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


#### second step: login => http://localhost:5000/user/login
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

#### get all users: http://localhost:5000/profiles     pagination with Query Params => "?page=1"
    response: []

#### get one user: http://localhost:5000/profile/:userId
    response: []

#### change user: http://localhost:5000/profile/:userId
    {
        "username": "",
        "email": ""
    }.required!

#### delete user: http://localhost:5000/profile/:userId


# POST

#### get all posts => http://localhost:5000/posts      pagination with Query Params => "?page=1"
    response: []

#### get one user: http://localhost:5000/post/:postId
    response: []


#### write post => method POST => http://localhost:5000/posts
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

#### delete post => method delete => http://localhost:5000/post/:postId
    response:
    {
        "status": ""
        "message": ""
        "data": {}
    }
