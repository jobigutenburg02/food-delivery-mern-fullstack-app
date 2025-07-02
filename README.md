## Tech Stack Used

- The backend is built using **Express**, and it provides a robust interface for managing food items, users, orders, and cart functionality. 
- The frontend is built using **React** with **Vite** tool, and it provides a fast, responsive, and modern user interface for browsing food items, adding them to cart, and placing orders.
- MongoDB is the database used.

---

## Features

- RESTful API endpoints for food, categories, and orders
- JWT-based authentication for secure user login
- Support for food images, pricing, and inventory
- Implemented payment gateways using Stripe API for seamless online transactions
- Ready-to-use with React frontend

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

## Support

For support and questions:
- Create an issue in the repository
- Contact: jbros2513@gmail.com
