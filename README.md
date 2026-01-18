Assignment-1 — Node.js HTTP Server
Overview

This project is a simple Node.js HTTP server built using TypeScript and the native http module. It handles basic routing and returns text and JSON responses.

Tech Used

Node.js

TypeScript

HTTP module

Routes
Route	Response Type	Description
/	Text	Home Page
/about	Text	About Page
/service	Text	Service Page
/api/user	JSON	User information
Others	404	Page Not Found
/api/user Response
{
  "name": "Sameer Khan",
  "Role": "Student",
  "student_id": "369046",
  "course": "Mernstack development"
}

Run Project
npm install
ts-node index.ts


Server runs on:

http://localhost:3000

Author

Sameer Khan
