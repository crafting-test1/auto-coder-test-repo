"""
Shopping Website - A simple e-commerce web application.

This module provides a lightweight shopping website using Python's
standard library HTTP server with JSON API endpoints and server-side
HTML template rendering.
"""

import http.server
import json
import os
import urllib.parse
from string import Template

HOST = "0.0.0.0"
PORT = int(os.environ.get("PORT", "8080"))

# ---------------------------------------------------------------------------
# Product catalog
# ---------------------------------------------------------------------------

PRODUCTS = [
    {
        "id": 1,
        "name": "Wireless Bluetooth Headphones",
        "price": 79.99,
        "category": "Electronics",
        "image": "\U0001f3a7",
        "description": "Premium noise-cancelling wireless headphones with 30-hour battery life.",
        "rating": 4.5,
    },
    {
        "id": 2,
        "name": "Organic Cotton T-Shirt",
        "price": 29.99,
        "category": "Clothing",
        "image": "\U0001f455",
        "description": "Soft, breathable organic cotton t-shirt available in multiple colors.",
        "rating": 4.2,
    },
    {
        "id": 3,
        "name": "Stainless Steel Water Bottle",
        "price": 24.99,
        "category": "Home & Kitchen",
        "image": "\U0001fad7",
        "description": "Double-wall insulated bottle that keeps drinks cold for 24 hours.",
        "rating": 4.8,
    },
    {
        "id": 4,
        "name": "Running Shoes",
        "price": 119.99,
        "category": "Sports",
        "image": "\U0001f45f",
        "description": "Lightweight running shoes with responsive cushioning and breathable mesh.",
        "rating": 4.6,
    },
    {
        "id": 5,
        "name": "Mechanical Keyboard",
        "price": 149.99,
        "category": "Electronics",
        "image": "\u2328\ufe0f",
        "description": "RGB backlit mechanical keyboard with Cherry MX switches.",
        "rating": 4.7,
    },
    {
        "id": 6,
        "name": "Yoga Mat",
        "price": 39.99,
        "category": "Sports",
        "image": "\U0001f9d8",
        "description": "Non-slip eco-friendly yoga mat with alignment markings.",
        "rating": 4.4,
    },
    {
        "id": 7,
        "name": "Leather Wallet",
        "price": 49.99,
        "category": "Accessories",
        "image": "\U0001f45b",
        "description": "Genuine leather bifold wallet with RFID blocking technology.",
        "rating": 4.3,
    },
    {
        "id": 8,
        "name": "Smart Watch",
        "price": 199.99,
        "category": "Electronics",
        "image": "\u231a",
        "description": "Fitness-tracking smart watch with heart rate monitor and GPS.",
        "rating": 4.6,
    },
    {
        "id": 9,
        "name": "Ceramic Coffee Mug Set",
        "price": 34.99,
        "category": "Home & Kitchen",
        "image": "\u2615",
        "description": "Set of 4 handcrafted ceramic mugs in earthy tones.",
        "rating": 4.1,
    },
    {
        "id": 10,
        "name": "Backpack",
        "price": 69.99,
        "category": "Accessories",
        "image": "\U0001f392",
        "description": "Water-resistant laptop backpack with USB charging port.",
        "rating": 4.5,
    },
    {
        "id": 11,
        "name": "Desk Lamp",
        "price": 44.99,
        "category": "Home & Kitchen",
        "image": "\U0001f4a1",
        "description": "Adjustable LED desk lamp with multiple brightness and color modes.",
        "rating": 4.4,
    },
    {
        "id": 12,
        "name": "Sunglasses",
        "price": 59.99,
        "category": "Accessories",
        "image": "\U0001f576\ufe0f",
        "description": "Polarized UV400 sunglasses with lightweight titanium frame.",
        "rating": 4.3,
    },
]


def _get_product_by_id(product_id: int):
    for p in PRODUCTS:
        if p["id"] == product_id:
            return p
    return None


# ---------------------------------------------------------------------------
# Template helpers
# ---------------------------------------------------------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def _read_template(name: str) -> str:
    path = os.path.join(BASE_DIR, "templates", name)
    with open(path, "r") as f:
        return f.read()


def _read_static(name: str) -> bytes:
    path = os.path.join(BASE_DIR, "static", name)
    with open(path, "rb") as f:
        return f.read()


def _render(template_name: str, **kwargs) -> str:
    layout = _read_template("layout.html")
    body = _read_template(template_name)
    # First render the body template
    rendered_body = Template(body).safe_substitute(**kwargs)
    # Then inject into layout
    return Template(layout).safe_substitute(body=rendered_body, **kwargs)


# ---------------------------------------------------------------------------
# Request handler
# ---------------------------------------------------------------------------


class ShopHandler(http.server.BaseHTTPRequestHandler):
    """HTTP request handler for the shopping website."""

    def _send_html(self, html: str, status: int = 200):
        self.send_response(status)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(html.encode("utf-8"))

    def _send_json(self, data, status: int = 200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))

    def _send_static(self, path: str):
        content_types = {
            ".css": "text/css",
            ".js": "application/javascript",
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".svg": "image/svg+xml",
        }
        ext = os.path.splitext(path)[1]
        content_type = content_types.get(ext, "application/octet-stream")
        try:
            data = _read_static(path)
            self.send_response(200)
            self.send_header("Content-Type", content_type)
            self.end_headers()
            self.wfile.write(data)
        except FileNotFoundError:
            self.send_response(404)
            self.end_headers()

    def _read_body(self) -> bytes:
        length = int(self.headers.get("Content-Length", 0))
        return self.rfile.read(length)

    # ------ Routes ------

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        if path == "/" or path == "/index.html":
            self._handle_home(query)
        elif path == "/product" and "id" in query:
            self._handle_product_detail(query)
        elif path == "/cart":
            self._handle_cart_page()
        elif path.startswith("/static/"):
            self._send_static(path[len("/static/"):])
        elif path == "/api/products":
            self._handle_api_products(query)
        elif path == "/api/products/categories":
            self._handle_api_categories()
        else:
            self._send_html(_render("404.html", title="Not Found"), 404)

    def do_POST(self):
        if self.path == "/api/cart/add":
            body = json.loads(self._read_body())
            product = _get_product_by_id(body.get("product_id", 0))
            if product:
                self._send_json({"ok": True, "product": product})
            else:
                self._send_json({"ok": False, "error": "Product not found"}, 404)
        else:
            self._send_json({"error": "Not found"}, 404)

    # ------ Page handlers ------

    def _handle_home(self, query):
        category = query.get("category", [None])[0]
        search = query.get("q", [None])[0]

        products = PRODUCTS
        if category:
            products = [p for p in products if p["category"] == category]
        if search:
            term = search.lower()
            products = [
                p
                for p in products
                if term in p["name"].lower() or term in p["description"].lower()
            ]

        categories = sorted(set(p["category"] for p in PRODUCTS))

        product_cards = ""
        for p in products:
            stars = "\u2605" * int(p["rating"]) + "\u2606" * (5 - int(p["rating"]))
            product_cards += f"""
            <div class="product-card" onclick="viewProduct({p['id']})">
                <div class="product-image">{p['image']}</div>
                <div class="product-info">
                    <span class="product-category">{p['category']}</span>
                    <h3 class="product-name">{p['name']}</h3>
                    <div class="product-rating">{stars} <span class="rating-num">({p['rating']})</span></div>
                    <p class="product-description">{p['description'][:80]}...</p>
                    <div class="product-footer">
                        <span class="product-price">${p['price']:.2f}</span>
                        <button class="btn btn-primary btn-sm add-to-cart-btn" onclick="event.stopPropagation(); addToCart({p['id']})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>"""

        category_options = ""
        for c in categories:
            selected = "selected" if c == category else ""
            category_options += f'<option value="{c}" {selected}>{c}</option>'

        search_value = search or ""
        active_category = category or ""
        result_count = len(products)

        self._send_html(
            _render(
                "home.html",
                title="CraftShop - Your One-Stop Shop",
                product_cards=product_cards,
                category_options=category_options,
                search_value=search_value,
                active_category=active_category,
                result_count=result_count,
                total_count=len(PRODUCTS),
            )
        )

    def _handle_product_detail(self, query):
        product_id = int(query["id"][0])
        product = _get_product_by_id(product_id)
        if not product:
            self._send_html(_render("404.html", title="Product Not Found"), 404)
            return

        stars = "\u2605" * int(product["rating"]) + "\u2606" * (5 - int(product["rating"]))

        related = [p for p in PRODUCTS if p["category"] == product["category"] and p["id"] != product["id"]][:3]
        related_cards = ""
        for r in related:
            related_cards += f"""
            <div class="product-card product-card-sm" onclick="viewProduct({r['id']})">
                <div class="product-image">{r['image']}</div>
                <div class="product-info">
                    <h3 class="product-name">{r['name']}</h3>
                    <span class="product-price">${r['price']:.2f}</span>
                </div>
            </div>"""

        self._send_html(
            _render(
                "product.html",
                title=product["name"] + " - CraftShop",
                product_id=product["id"],
                product_name=product["name"],
                product_price=f"{product['price']:.2f}",
                product_category=product["category"],
                product_image=product["image"],
                product_description=product["description"],
                product_rating=stars,
                product_rating_num=product["rating"],
                related_cards=related_cards,
            )
        )

    def _handle_cart_page(self):
        self._send_html(
            _render("cart.html", title="Shopping Cart - CraftShop")
        )

    # ------ API handlers ------

    def _handle_api_products(self, query):
        category = query.get("category", [None])[0]
        products = PRODUCTS
        if category:
            products = [p for p in products if p["category"] == category]
        self._send_json(products)

    def _handle_api_categories(self):
        categories = sorted(set(p["category"] for p in PRODUCTS))
        self._send_json(categories)

    def log_message(self, format, *args):
        print(f"[{self.log_date_time_string()}] {format % args}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    server = http.server.HTTPServer((HOST, PORT), ShopHandler)
    print(f"\U0001f6cd\ufe0f  CraftShop is running at http://{HOST}:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down...")
        server.server_close()


if __name__ == "__main__":
    main()
