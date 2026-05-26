# DATABASE_DESIGN.md

# Library Management System — Database Design

---

## Part 1 — System Design

## Collection: Users

### Purpose
Stores all system users including members, librarians, and managers.

---

### Data Fields
- name
- email
- phone
- registeredAt

---

### Problem-Solving Fields
- password 
- accountType (member | librarian | manager)

---

### Member-Specific Fields
- address
- dateOfBirth
- membershipNumber

---

### Librarian-Specific Fields
- responsibleDepartment

---

### Manager-Specific Fields
- uses shared fields only

---

### Relationship Fields
-  No direct relationships in this collection

Users (single collection)

|--- Base User (shared fields)

|--- Member (discriminator)

|--- Librarian (discriminator)

|--- Manager (discriminator)

---

## Collection: Materials

### Purpose
Stores books and other library materials.

---

### Data Fields
- _id
- title
- materialType (book | magazine | cd | map)
- totalCopies
- availableCopies
- coverImageUrl
- createdAt
- updatedAt

---

### Book Fields (Subtype)
- author
- publisher
- publicationYear
- category
- ISBN  

---

### Cd Fields
- artist

---

### map Fields
- region

---

### Magazine-Specific Fields
- issueNumber
- month
- year

---

### Problem-Solving Fields
- availableCopies

---

### Relationship Fields
- No direct relationships in this collection

Materials (single collection)

|--- Book (discriminator)

|---Magazine (discriminator)

|--- CD (discriminator)

|--- Map (discriminator)

---

## Collection: Loans

### Purpose
Stores all borrowing and return operations for library materials.

---

### Data Fields
- loanDate
- dueDate
- actualReturnDate (optional)
- finePerDay

---

### Relationship Fields
- memberId (references Users)
- materialId (references Materials)
- librarianId (references Users)

---

### Problem-Solving Fields
- status (active | returned | overdue | cancelled)
- paymentStatus (paid | unpaid)
- totalFineAmount

---

### Business Rules

- A loan becomes overdue when:
  actualReturnDate > dueDate

- totalFineAmount is calculated based on:
  number of overdue days × finePerDay

- actualReturnDate remains empty until the material is returned.

---

## Collection: Reservations

### Purpose
Stores reservations for materials that are currently unavailable.

---

### Data Fields
- reservedAt

---

### Relationship Fields
- memberId (references Users)
- materialId (references Materials)

---

### Problem-Solving Fields
- queuePriority
- notifiedWhenAvailable
- autoCancelAfter

---

## Collection: Reviews

### Purpose
Stores member ratings and reviews for library materials.

---

### Data Fields
- rating (1–5 stars)
- reviewText (optional)
- createdAt
---

### Relationship Fields
- memberId (references Users)
- materialId (references Materials)

---

### Problem-Solving Fields
 No direct Problem-Solving  in this collection 

---
Users ── Loans ── Materials

   └── Reservations ──┘
   
   └── Reviews ──┘