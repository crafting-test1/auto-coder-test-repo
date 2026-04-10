# auto-coder-test-repo

This repository includes the CraftShop — a shopping website built with Python.

## 🛍️ CraftShop

A modern, responsive shopping website featuring:

- **Product Catalog** — Browse 12 products across 5 categories
- **Search & Filter** — Find products by keyword or category
- **Product Detail Pages** — View detailed product information with related items
- **Shopping Cart** — Add/remove items, adjust quantities, view order summary
- **Responsive Design** — Works on desktop and mobile devices
- **Client-side Cart Persistence** — Cart data saved in localStorage

### Quick Start

```bash
cd shop
python3 main.py
```

The server will start at `http://localhost:8080`.

Set a custom port with the `PORT` environment variable:

```bash
PORT=3000 python3 main.py
```

### Project Structure

```
shop/
├── main.py                  # Server, routes, and product data
├── templates/
│   ├── layout.html          # Base layout with nav and footer
│   ├── home.html            # Product listing page
│   ├── product.html         # Product detail page
│   ├── cart.html            # Shopping cart page
│   └── 404.html             # Not found page
└── static/
    ├── css/
    │   └── style.css        # All styles
    └── js/
        └── app.js           # Cart logic and UI interactions
```

### API Endpoints

| Method | Path                     | Description             |
|--------|--------------------------|-------------------------|
| GET    | `/`                      | Product listing page    |
| GET    | `/product?id={id}`       | Product detail page     |
| GET    | `/cart`                  | Shopping cart page       |
| GET    | `/api/products`          | List all products (JSON)|
| GET    | `/api/products/categories` | List categories (JSON)|
| POST   | `/api/cart/add`          | Add item to cart (JSON) |

---

## Legacy Applications

The original Go applications are located in the `/src` directory:

- `/src/hello` — Hello Crafting application
- `/src/newapp` — Re-implemented Hello Crafting application
