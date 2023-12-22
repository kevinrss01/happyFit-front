## Getting Started

To start the project you need : 
- Node.js (>18)
- pnpm
- git
- A brain 

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Documentation

### Auth Guard
- The AuthGuard is a Higher Order Component (HOC) that wraps the pages that require authentication and do some actions depending on the authentication state. Look at the schema below to understand how it works.
  ![AuthGuard Schema](./docs/images/excalidraw/AuthGuard.png)
- If the user have an accessToken in his locale storage (soon we'll move secured cookie) we do a verification on the server side to check if the token is valid. If it's not valid we redirect the user to the login page. There is 3 cases :
  - *Invalid Token* -> Redirect to login page
  - *Valid Token* -> User is authenticated
  - *Expired Token* -> Refresh the token with refresh Token
