# REST Spec of LeCow

## Users
### Create
Create a new user
#### Request
* URL: **/api/v1/users**
* METHOD: **POST**
* BODY *json*
  ```
  {
    "name": "string",
    "email": "email_string"
  }
  ```

