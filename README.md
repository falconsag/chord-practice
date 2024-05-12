### How to run

Clone repository and simply execute 

`docker compose up --build` 

in the root directory of the project. The application will be available at `http://localhost:10200` by default.

`--build` is necessary to rebuild the image after pulling changes from the repository.

### Browser caching

Since browsers by default cache static files, it is recommended to disable caching in the browser's developer tools while testing the application.
