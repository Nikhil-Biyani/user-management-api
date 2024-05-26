# user-management-api

## Problem Statement
```
https://scoremarks.notion.site/Sample-Task-User-List-Management-and-Email-Sending-API-95730b8da4674359bfcdcda3639b27d1?pvs=4
```

## Deployment Link
```
https://user-management-api-ial3.onrender.com/
```

## Overview

This project provides a RESTful API for managing a list of users with customizable properties and sending emails to the users. The API supports features such as list creation, user addition via CSV upload, email sending, and user unsubscription.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Nodemailer
- express-validator
- csv-parser

## Features

1. **List Creation**: Admin can create a list with a title and custom properties. Custom properties have a title and a default/fallback value.
2. **User Addition**: Admin can add users to the list via CSV upload. The application handles CSVs with 10,000+ records efficiently.
3. **Unique Emails**: Ensures no two users with the same email are present in a list.
4. **Email Sending**: Admin can send emails to all users in a list, with support for placeholders in the email body.
5. **Unsubscribe**: Users can unsubscribe from emails via a link in the email.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/user-list-api.git
    cd user-list-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up MongoDB:
    Ensure MongoDB is installed and running. Update the connection string in `config/db.js` if necessary.

4. Start the server:
    ```bash
    npm start
    ```
