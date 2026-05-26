# Library Management System API

## Setup

```bash
npm install
```

## env vars
```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/libraryDB
    HOST=127.0.0.1
```

## Run Project
```
    npm run dev for development
    npm run start for production
```
##   Design Document  
click here to open Design Document :
[DATABASE_DESIGN.md](./DATABASE_DESIGN.md)

##   POSTMAN Documentation
click here to open POSTMAN Documentation:
[view API Docs](https://documenter.getpostman.com/view/34426542/2sBXwmPsjv)

##  User

### req body:
    {
    "name": "Omar",
    "email": "omar@test.com",
    "phone": "111222333",
    "password": "123456",
    "responsibleDepartment": "Science"
    }
### res :
    {
        "name": "Omar",
        "email": "omar@test.com",
        "role": "librarian",
        "phone": "111222333",
        "_id": "6a14a9c32e4eff458188b260",
        "responsibleDepartment": "Science",
        "registeredAt": "2026-05-25T19:57:55.635Z",
        "createdAt": "2026-05-25T19:57:55.640Z",
        "updatedAt": "2026-05-25T19:57:55.640Z"
    }

### material:

### req body:
    {
    "materialType": "book",
    "title": "Atomic Habits",
    "author": "James Clear",
    "publisher": "Penguin Random House",
    "publicationYear": 2018,
    "category": "self-development",
    "ISBN": "9780735211292",
    "totalCopies": 10,
    "availableCopies": 7,
    "coverImageUrl": "https://example.com/atomic-habits.jpg"
    }
### res :
    {
        "title": "Atomic Habits",
        "author": "James Clear",
        "publisher": "Penguin Random House",
        "publicationYear": 2018,
        "category": "self-development",
        "ISBN": "9780735211292",
        "totalCopies": 10,
        "availableCopies": 7,
        "coverImageUrl": "https://example.com/atomic-habits.jpg",
        "_id": "6a14ac7ee29d5be2d877c828",
        "createdAt": "2026-05-25T20:09:34.149Z",
        "updatedAt": "2026-05-25T20:09:34.149Z",
        "__v": 0
    }

## loan:

### req body:
    {
    "member": "6a14a92f08589ab8075d48e9",
    "material": "6a14b6fd02947329e236bb08",
    "librarian": "6a14a9c32e4eff458188b260",
    "dueDate": "2026-09-15",
    "finePerDay": 2
    }

### res :
    {
        "message": "Material is not available"
    }


## reservations:

### req body:
    {
    "member": "6a14a90e08589ab8075d48e8",
    "material": "6a14b6c402947329e236bb06",
    "notifiedWhenAvailable": true
    }
### res :
    {
        "member": "6a14a90e08589ab8075d48e8",
        "material": "6a14b6c402947329e236bb06",
        "queuePriority": 1,
        "notifiedWhenAvailable": true,
        "autoCancelAfter": "2026-05-28T22:02:30.720Z",
        "_id": "6a14c6f673e13e4bafa354ab",
        "reservedAt": "2026-05-25T22:02:30.721Z",
        "createdAt": "2026-05-25T22:02:30.722Z",
        "updatedAt": "2026-05-25T22:02:30.722Z",
        "__v": 0
    }

## reviews:

### req body:
    {
    "member": "6a14a92f08589ab8075d48e9",
    "material": "6a14b6c402947329e236bb06",
    "rating": 5
    //   ,
    //   "reviewText": "Amazing book, very useful!"
    }
### res :
    {
        "message": "You already reviewed this material"
    }