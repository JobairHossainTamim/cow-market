<h1 align="center">Cow Market <h1>

 
# Build with :
- TypeScript
- Node 
- MongoDb
- yarn
- eslint
- prettier

## User Routes :

- Post Request create User :  /api/v1/users/create-user


```json 

{
  
  "password":"123456789",
  "role": "buyer",
   "name":{
      "firstName": "Mr. Babull",
      "lastName": "Bro"
    },
  "phoneNumber":"01711111111",
  "address": "Chattogram",
  "budget":70000,
  "income":0
 
}
```
- Get Request

-- Get All User : /api/v1/users/?address=etc? ?page=1 ? ?limit=10 ?sortOrder=asc
-- Get All User : /api/v1/users/?contactNo=etc? ?page=1 ? ?limit=10
-- Get All User : /api/v1/users/?address=etc? ?page=1 ? ?limit=10
-- Get All User : /api/v1/users/?name=etc? ?page=1 ?limit=10 
-- Get All User : /api/v1/users/?searchTerm=etc? ?page=1 ?limit=10 
-- Get All User : /api/v1/users/?role=seller or buyer ?page=1 ?limit=10 

-  Get Single User : /api/v1/users/:id
-  Delete Single User : /api/v1/users/:id
-  For Update Patch User : /api/v1/users/:id



# Cow Routes :

- Post Request create User :  /api/v1/cow/create-cow

```json 

 {
  "name": "Bella",
  "age": 4,
  "price": 5000,
  "location": "Dhaka",
  "breed": "Brahman",
  "weight": 400,
  "label": "for sale",
  "category": "Beef",
  "seller": "609c17fc1281bb001f523456"
}

```
- Get All User : /api/v1/cow/
### we Implementation :
page: The page number for pagination (e.g., ?page=1).
limit: The number of cow listings per page (e.g., ?limit=10).
sortBy: The field to sort the cow listings (e.g., ?sortBy=price).
sortOrder : The order of sorting, either 'asc' or 'desc' (e.g., ?sortOrder=asc).
minPrice: The minimum price for filtering (e.g., ?minPrice=1000).
maxPrice: The maximum price for filtering (e.g., ?maxPrice=5000).
location: The location for filtering (e.g., ?location=chattogram).
searchTerm: The search query string for searching cows (e.g., ?SearchTerm=Dhaka). 


- Get Single Cow : /api/v1/cow/:id
- For Update Patch  : /api/v1/users/:id
- Delete : /api/v1/users/:id 




