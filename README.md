## Tech Stack Used


- **Backend:** Express.js, Node.js, MongoDB
- **Frontend:** React, Vite
- **Authentication:** JWT (JSON Web Token)

---

## Features

- RESTful API endpoints for food, user, cart, order, and image
- JWT-based authentication for secure user login
- Support for food images, pricing, and inventory
- Implemented payment gateways using Stripe API for seamless online transactions

---

## Setting up the secret keys for Stripe payment testing

Follow these steps to test payments using Stripe's sandbox environment:

### 1. Create a Stripe Account

* Visit [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
* Sign up or log in to your account.

---

### 2. Switch to Test Mode

* On the **Stripe Dashboard**, toggle **“View test data”** (top-left switch).
* All keys and transactions will now be in test mode.

---

### 3. Get Your Stripe Test Key

- Go to **Developers > API Keys**
- Copy the following:

  * **Secret Key** (starts with `sk_test_...`)

- In your backend directory, create an .env file and add the following:

```env
STRIPE_SECRET_KEY=sk_test_xxx
```
- Replace `sk_test_xxx` with your secret key

---

## Setting up MongoDB Cluster

### 1. Create a MongoDB Atlas Account

- Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Sign up or log in with your account.

### 2. Create a New Cluster

- Click **“Build a Database”**
- Choose the **Free Shared Cluster (M0)** option.
- Select cloud provider & region (e.g., AWS - Mumbai).
- Name your cluster and click **Create**.

### 3. Set Up Database Access

- Go to **Database Access > Add New Database User**
- Choose **Username and Password**
- Set a secure password.
- Select **Read and Write to Any Database**
- Click **Add User**

### 4. Add IP Whitelist

- Go to **Network Access > Add IP Address**
- Click **"Allow Access from Anywhere"** (`0.0.0.0/0`) — or specify your IP.
- Save changes.

### 5. Get Your MongoDB URI

- Go to **Clusters > Connect > Connect Your Application**
- Copy the **Connection String** (e.g.):

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
```
- Store your Connection String in your .env file as follows:
  
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
```

---

## Setting up the Environment Variables

In backend, your .env file should look like this:

```bash
JWT_SECRET=random#secret
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
STRIPE_SECRET_KEY=sk_test_xxx
```

In frontend, your .env file should look like this:

```bash
VITE_API_URL=http://localhost:5000
```

## Running the Backend

Open a terminal on VSCode and follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/jobigutenburg02/food-delivery-mern-fullstack-app.git
```

### 2. Navigate into the backend folder

```bash
cd food-delivery-mern-fullstack-app/backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server 

```bash
npm run dev
```

### 5. Open your browser and go to [http://localhost:5000](http://localhost:5000)

---

## Running the Frontend:

Open another terminal on VSCode and follow these steps:

### 1. Navigate into the frontend directory from the backend directory

```bash
cd ../frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open your browser and go to [http://localhost:5173](http://localhost:5173)

Once both the backend and frontend are running, you’ll be able to:
 - Browse food of different categories
 - Add food items to cart
 - Log in/register
 - Place and track orders
   
---

## API Endpoints

### Food Routes (`/api/food`)
- **POST `/add`**  
  Add a new food item (with image upload).
- **GET `/list`**  
  Get a list of all food items.
- **POST `/remove`**  
  Remove a food item by ID.

### User Routes (`/api/user`)
- **POST `/register`**  
  Register a new user.
- **POST `/login`**  
  Login an existing user.

### Cart Routes (`/api/cart`)
- **POST `/add`**  
  Add a food item to the user's cart (requires authentication).
- **POST `/remove`**  
  Remove a food item from the user's cart (requires authentication).
- **POST `/get`**  
  Get the current user's cart data (requires authentication).

### Order Routes (`/api/order`)
- **POST `/place`**  
  Place a new order (requires authentication, integrates Stripe).
- **POST `/verify`**  
  Verify payment and update order status.
- **POST `/userorders`**  
  Get all orders for the current user (requires authentication).
- **GET `/list`**  
  Get all orders (admin panel).
- **POST `/status`**  
  Update the status of an order.

### Image Routes (`/images`)
- **GET `/images/:filename`**  
  Serve uploaded food images.

---

**Note:**  
- Endpoints marked "requires authentication" use JWT-based middleware.
- Stripe integration is used for payment processing in the `/api/order/place` endpoint.

---

## Support

For support and questions:
- Create an issue in the repository
- Contact: johanbiju02@gmail.com
