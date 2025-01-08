# Library and Academics microservice development

In this project I made a REST api for library managment and academics analysis.

**1. Tech stack**
- Node.js
- Express
- MongoDB

**2. Database schema design**

- Library database
![Library database design](https://github.com/ambikaprasad21/klusterschola/blob/master/database%20schema%20design/library%20database.png)

- Academics database
![Academics database design](https://github.com/ambikaprasad21/klusterschola/blob/master/database%20schema%20design/academicas%20database.png)

**3. Api documentation**
This documentation was built with the help of postman [Documentation Link](https://documenter.getpostman.com/view/26298504/2sAYJAeHfe)

**4. Setup instructions**

*mongodb locally is **required** to be present in the system.*

- Download the zip file or clone the repository to get code into the system
```
git clone https://github.com/ambikaprasad21/klusterschola.git
```

- Open `cmd` at the project location and run these command one by one
```
npm i
npm run add-library-data
npm run add-academic-data
```

`npm run add-library-data` will create a library database into your local mongodb and will add the required data for library microservice.

`npm run add-academic-data` will create a academics database into your local mongodb and will add the required data for academics microservice.

- use `npm run start-lib` to start the library server which will run on port 5000.
- use `npm run start-acad` to start the academics server which will run on port 5500.

