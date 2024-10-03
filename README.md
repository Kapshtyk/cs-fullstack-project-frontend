# Crazy Shop

## Project Overview

This project is a modern web application built using Next.js, TypeScript, and various other technologies. It aims to provide a seamless user experience with features such as user authentication, product listings, and more. The application is designed to be scalable, maintainable, and easy to deploy.

The chosen architecture is [Feature-Sliced Design](https://feature-sliced.design). Since the FSD requirements conflict a bit with the mandatory folder structure of Next.js applications, the FSD related folders are in the /src folder of the application, and the Next.js mandatory folders are in /app.

My application has slices that reflect the domain layer of the backend application. I have tried to follow FSD as much as possible, but in some cases I have cross-imports between slices on the same layer, these imports are marked with `@x` notation. I also consider cross-imports from different features within a slice as acceptable.

For rendering action elements I've used render slots (e.g. in the case of ProductCard). These slots are filled on the top layers (mostly widgets).

For each feature (reused implementations of entire product features, i.e. actions that provide business value to the user), I follow a convention: 
I have a `dto/query` folder with the `dto` objects needed to fetch/create the data. 
I have an `api` folder with the function based on the `API client` and `dto/query`.
I have a `lib/hooks` folder where my `Tanstack query hooks` are located. These hooks are also based on `api` and `dto/query`.
In some cases I also have `ui` folder which contains some `ui` elements like buttons or forms.
If I have form, I also have `model` folder where is my JSON schema for `Ajv` validator.

Ui and model folders can also be on the widgets layer if I need to use some features from the other slices.

The application has three levels of access: for anonymous users, for clients and for admins. Admins can manage products, categories, orders, users and the frontpage via the dashboard. Users can manage their profiles, shopping carts and orders.

[Deployed version of the application](http://crazy-shop.zapto.org)

Admin credentials: 
   - email: test@user.com
   - password: sygxy2-cuxteb-maJcaq

## Features

- **User Authentication**: Secure login and registration system.
- **Product Listings**: Browse and search for products.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Server-Side Rendering (SSR) and OpenGraph attributes**: Improved SEO and faster initial load times.
- **API Integration**: Connects to a backend API for data fetching using Tanstack Query and Axios.
- **Error Handling**: Error handling and nicelooking user notifications.

Authorisation and authentication is probably the most complex and complicated part of my application. I tried using the Next-Auth library for this and it worked almost without problems, but eventually I hit the token refreshing bug - the current token version wasn't persisted. This was caused by the Next-Auth problem and as a result all token refreshing is now handled by the middleware and server action associated with retrieving the actual access token. This action is called in every hook that requires an access token and manually triggers the middleware. The middleware is also triggered when you try to access the protected routes and handle redirects to not-found or sign-in pages (depending on the route, the dashboard doesn't exist for anonymouse users).

## Getting Started

### Prerequisites

1. For local testing [the backend](https://github.com/Kapshtyk/fs18_CSharp_FullStack_Backend) should be up and running on the same machine, as the deployed version of the backend is set to only work with the deployed version of the application (CORS).
2. Node.js (v20 or higher)

### Installation:
1. Clone the repository: 
```
git clone git@github.com:Kapshtyk/fs18_CSharp_FullStack_Backend.git
cd fs18_CSharp_FullStack_Backend
```
2. Install the dependencies:
```
npm install
```
3. Create `.env` file:
```
NEXTAUTH_SECRET="Secret"
NEXT_PUBLIC_BACKEND_URL=<URL of your backend application, by the default it runs on http://localhost:5169/>
NEXTAUTH_URL="http://localhost:3000/"
```
4. Run you application
```
npm run dev
```

## Screenshots
### Frontpage
![frontpage](https://github.com/user-attachments/assets/2398f57d-120e-4fba-9155-08c80195952f)
### Product page
![product](https://github.com/user-attachments/assets/a6522ed4-dad0-4474-bf0a-d66a3065d3b0)
### Admin dashboard
![admin dashboard](https://github.com/user-attachments/assets/afd07d33-52b6-4cf0-b239-252ce5e1ce87)
### Social sharing preview
<img width="573" alt="Screenshot 2024-09-20 at 14 35 15" src="https://github.com/user-attachments/assets/b73d4dd8-3877-4d37-9cb7-37f989e35fe3">




