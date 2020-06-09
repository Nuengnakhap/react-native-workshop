# E-COMMERCE API

## Tech Stack

- **Microservices** Architecture with shared database
- **Node.js** (express) as server side tech at whole services.
- **MariaDB** as RDBMS
- **Sequelize** as Node.js based ORM
- Manage Queue with **Kue** - **Redis**
- **JWT** based Authorization

## Steps

1. Clone this repo
2. Create **.env** each service directory

```sh
** ENV Example
SECRET=cute cat
PORT=4000
HOST=127.0.0.1
DB_ATTR=ecommerce
DATABASE=ecommerce
** You must change port in each service directory **
** DB_ATTR is is DB username & password **
```

3. Create new mysql database `ecommerce`
4. Run `npm install` and `npm run dev` each service directory
