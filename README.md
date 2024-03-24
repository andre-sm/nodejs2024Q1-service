# Home Library Service

### Installation

#### 1. Clone repository
```
https://github.com/andre-sm/nodejs2024Q1-service.git
```
####  2. Go to the project directory
```
cd nodejs2024Q1-service
```
####  3. Switch to `dev-part-2` branch
```
git checkout dev-part-2
```
####  4. Install dependencies
```
npm install
```
####  5. Rename .env.example file to .env
####  6. Create and start containers
```
docker-compose up
```

####  7. Run the tests
```
npm run test
```

####  8. Scan docker images for vulnerabilities
```
npm run docker:scan
```

#### 9. Auto-fix and format
```
npm run lint
```

```
npm run format
```

### Notes

- After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/
- For more information about OpenAPI/Swagger please visit https://swagger.io/

### API Endpoints

| Method    | Endpoint             | Description                  |
|-----------|----------------------|------------------------------|
| 			|	  User endpoint    |                              |
| `GET`     | `/user`              | Get all users                |
| `GET`     | `/user/:id`          | Get user by id               |
| `POST`    | `/user`              | Create new user              |
| `PUT`     | `/user/:id`          | Update user's password       |
| `DELETE`  | `/user/:id`          | Delete user                  |
| 			|	 Track endpoint    |                              |
| `GET`     | `/track`             | Get all tracks               |
| `GET`     | `/track/:id`         | Get track by id              |
| `POST`    | `/track`             | Create new track             |
| `PUT`     | `/track/:id`         | Update track info            |
| `DELETE`  | `/track/:id`         | Delete track                 |
| 			|	 Artist endpoint   |                              |
| `GET`     | `/artist`            | Get all artists              |
| `GET`     | `/artist/:id`        | Get artist by id             |
| `POST`    | `/artist`            | Create new artist            |
| `PUT`     | `/artist/:id`        | Update artist info           |
| `DELETE`  | `/artist/:id`        | Delete artist                |
| 			|	 Album endpoint    |                              |
| `GET`     | `/album`             | Get all albums               |
| `GET`     | `/album/:id`         | Get album by id              |
| `POST`    | `/album`             | Create new albums            |
| `PUT`     | `/album/:id`         | Update album info            |
| `DELETE`  | `/album/:id`         | Delete album                 |
| 			|	 Favs endpoint     |                              |
| `GET`     | `/favs`              | Get all favorites            |
| `POST`    | `/favs/track/:id`    | Add track to the favorites   |
| `DELETE`  | `/favs/track/:id`    | Delete track from favorites  |
| `POST`    | `/favs/album/:id`    | Add album to the favorites   |
| `DELETE`  | `/favs/album/:id`    | Delete album from favorites  |
| `POST`    | `/favs/artist/:id`   | Add artist to the favorites  |
| `DELETE`  | `/favs/artist/:id`   | Delete artist from favorites |


