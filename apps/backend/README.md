In this project we are using pnpm as our package manager.
To install dependencies, run the following command in the root directory of the project:

```bash
pnpm install
```

This will install all the necessary packages for the frontend application located in the `apps/frontend` directory.
To start the development server, navigate to the `apps/frontend` directory and run:

```bash
pnpm run dev
```

This will start the frontend application in development mode.
You can then access the application in your web browser at `http://localhost:5001`.

To run the server add the following environment variables to a `.env` file in the `apps/backend` directory:

```env
DATABASE_URL="your_database_url"
PORT=5001
JWT_SECRET="your_jwt_secret"
```
