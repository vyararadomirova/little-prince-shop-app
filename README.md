# Little Prince Shop - Functional Guide

## 1. Application Purpose

The goal of the application is to provide an online souvenir shop inspired by "The Little Prince". Users can browse products, view details, add items to cart, and administrators can manage the product catalog.

---

## 2. User Roles

**Guest (Not Authenticated User)**
- Can view Home page
- Can view Catalog
- Can view Details page
- Can register or login

**Authenticated User**
- Can add products to cart
- Can manage cart
- Can view personal dashboard

**Administrator**
- Can create, edit and delete products

---

## 3. Public Features

- Home page
- Catalog page
- Details page
- Login page
- Registration page

---

## 4. Authenticated User Features

- Add to cart
- View and manage cart
- View personal dashboard

**Administrator only:**
- Create new products
- Edit own products
- Delete own products

---

## 5. Main Application Flow

1. User opens the Home page.
2. User navigates to the Catalog page.
3. User selects an item and opens the Details page.
4. User logs in or registers.
5. Authenticated user adds products to cart.
6. Administrator creates new products.
7. The new product appears in the Catalog.

---

## 6. Data Structure

**Product Object**
- `_id` – unique identifier
- `_ownerId` – ID of the creator
- `name` – product name
- `description` – short description
- `content` – full description
- `price` – product price
- `imageUrl` – product image URL
- `isTop` – featured flag

**User Object**
- `_id` – unique identifier
- `email` – user email
- `username` – display name
- `accessToken` – authentication token

---

## 7. Project Architecture

- components/
- services/
- interfaces/
- guards/
- pipes/

---

## 8. Technologies Used

- Angular
- TypeScript
- RxJS
- REST API
- CSS3

---

## 9. How to Run the Project

1. Clone the repository
2. Install dependencies – `npm install`
3. Start the backend server – `cd server && node server.js`
4. Start the application – `ng serve`
5. Open `http://localhost:4200`

**Test users:**
- `peter@abv.bg` / `123456` (regular user)
- `george@abv.bg` / `123456` (regular user)
- `admin@abv.bg` / `admin` (administrator)