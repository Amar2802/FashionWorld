import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const API_BASE = "/api";
const SESSION_KEY = "fashion_world_session";
const PROFILE_KEY = "fashion_world_profile";

function currency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value || 0);
}

function getSessionId() {
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

function readProfile() {
  const saved = localStorage.getItem(PROFILE_KEY);
  if (saved) return JSON.parse(saved);
  return {
    name: "Fashion World Member",
    email: "member@fashionworld.in",
    phone: "+91 98765 43210",
    line1: "MG Road",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560001",
    country: "India"
  };
}

async function api(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}

function Icon({ name }) {
  const paths = {
    bag: "M6 8h12l-1 12H7L6 8Zm3 0a3 3 0 0 1 6 0",
    plus: "M12 5v14M5 12h14",
    minus: "M5 12h14",
    trash: "M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",
    card: "M3 7h18v10H3V7Zm0 3h18M7 14h4",
    check: "m5 12 4 4L19 6",
    user: "M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",
    search: "m21 21-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z",
    heart: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8Z",
    truck: "M3 7h11v9H3V7Zm11 3h4l3 3v3h-7v-6ZM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
    shield: "M12 3 5 6v6c0 4.4 3 7.4 7 9 4-1.6 7-4.6 7-9V6l-7-3Z",
    close: "M6 6l12 12M18 6 6 18",
    star: "m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9L12 3Z"
  };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

function Header({ cartCount, query, setQuery, onCart, onProfile, onHome, view }) {
  return (
    <header className="site-header">
      <button className="brand" onClick={onHome}>
        <span>FW</span>
        <strong>Fashion World</strong>
      </button>
      <label className="search-box">
        <Icon name="search" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search dresses, sneakers, bags..."
          aria-label="Search products"
        />
      </label>
      <nav className="header-actions" aria-label="Primary navigation">
        <button className={view === "shop" ? "nav-action active" : "nav-action"} onClick={onHome}>Shop</button>
        <button className={view === "profile" ? "icon-button active" : "icon-button"} onClick={onProfile} title="Profile" aria-label="Open profile">
          <Icon name="user" />
        </button>
        <button className="icon-button cart-button" onClick={onCart} title="Cart" aria-label="Open cart">
          <Icon name="bag" />
          <span>{cartCount}</span>
        </button>
      </nav>
    </header>
  );
}

function Hero({ onShop }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">Fashion World</p>
        <h1>Premium fashion shopping with a complete cart and payment flow.</h1>
        <p>Explore curated clothing, footwear, and accessories with live search, checkout, profile details, and order history.</p>
        <button onClick={onShop}>Shop New Arrivals</button>
      </div>
    </section>
  );
}

function ProductCard({ product, onAdd }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <article className="product-card">
      <div className="product-media">
        <img src={product.image} alt={product.name} />
        <span>{discount}% off</span>
        <button title="Wishlist" aria-label={`Add ${product.name} to wishlist`}>
          <Icon name="heart" />
        </button>
      </div>
      <div className="product-body">
        <div>
          <p className="eyebrow">{product.brand}</p>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
        <div className="product-meta">
          <span><Icon name="star" /> {product.rating}</span>
          <span>{product.material}</span>
          <span>{product.stock} left</span>
        </div>
        <div className="choice-row">
          <select value={size} onChange={(event) => setSize(event.target.value)} aria-label={`Size for ${product.name}`}>
            {product.sizes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select value={color} onChange={(event) => setColor(event.target.value)} aria-label={`Color for ${product.name}`}>
            {product.colors.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="product-footer">
          <div>
            <strong>{currency(product.price)}</strong>
            <del>{currency(product.originalPrice)}</del>
          </div>
          <button onClick={() => onAdd(product, size, color)} title="Add to cart" aria-label={`Add ${product.name} to cart`}>
            <Icon name="bag" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

function Catalog({ products, category, setCategory, sort, setSort, maxPrice, setMaxPrice, loading, onAdd }) {
  const categories = ["All", "Women", "Men", "Unisex", "Accessories", "Footwear"];

  return (
    <section className="catalog" id="catalog">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Curated Storefront</p>
          <h2>Shop the collection</h2>
        </div>
        <div className="result-count">{loading ? "Loading products" : `${products.length} products`}</div>
      </div>

      <div className="filters">
        <div className="tabs" role="tablist" aria-label="Product categories">
          {categories.map((item) => (
            <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className="filter-controls">
          <label>
            Sort
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="newest">Newest</option>
              <option value="rating">Top Rated</option>
              <option value="priceLow">Price Low</option>
              <option value="priceHigh">Price High</option>
            </select>
          </label>
          <label>
            Max Price
            <select value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)}>
              <option value="">Any</option>
              <option value="2000">Under 2000</option>
              <option value="3500">Under 3500</option>
              <option value="5000">Under 5000</option>
            </select>
          </label>
        </div>
      </div>

      {products.length === 0 && !loading ? (
        <div className="empty-results">
          <Icon name="search" />
          <h3>No products found</h3>
          <p>Try a different keyword, category, or price filter.</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} onAdd={onAdd} />
          ))}
        </div>
      )}
    </section>
  );
}

function CartDrawer({ open, cart, busy, onClose, onQuantity, onRemove, onCheckout }) {
  return (
    <div className={open ? "drawer-shell open" : "drawer-shell"} aria-hidden={!open}>
      <button className="drawer-backdrop" onClick={onClose} aria-label="Close cart" />
      <aside className="cart-drawer" aria-label="Shopping cart">
        <div className="drawer-header">
          <div>
            <p className="eyebrow">Your Cart</p>
            <h2>Shopping Bag</h2>
          </div>
          <button className="icon-button" onClick={onClose} title="Close cart" aria-label="Close cart">
            <Icon name="close" />
          </button>
        </div>

        {cart.items.length === 0 ? (
          <div className="empty-state">
            <Icon name="bag" />
            <p>Your bag is ready for a statement piece.</p>
          </div>
        ) : (
          <div className="cart-items">
            {cart.items.map((item) => (
              <div className="cart-item" key={item._id}>
                <img src={item.product.image} alt={item.product.name} />
                <div>
                  <h3>{item.product.name}</h3>
                  <p>{item.size} - {item.color}</p>
                  <strong>{currency(item.lineTotal)}</strong>
                  <div className="quantity-control">
                    <button onClick={() => onQuantity(item, item.quantity - 1)} disabled={busy || item.quantity === 1} title="Decrease quantity" aria-label="Decrease quantity">
                      <Icon name="minus" />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onQuantity(item, item.quantity + 1)} disabled={busy} title="Increase quantity" aria-label="Increase quantity">
                      <Icon name="plus" />
                    </button>
                    <button className="ghost-icon" onClick={() => onRemove(item)} disabled={busy} title="Remove item" aria-label="Remove item">
                      <Icon name="trash" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="cart-summary">
          <span>Subtotal <strong>{currency(cart.totals.subtotal)}</strong></span>
          <span>Shipping <strong>{currency(cart.totals.shipping)}</strong></span>
          <span>Tax <strong>{currency(cart.totals.tax)}</strong></span>
          <span className="grand-total">Total <strong>{currency(cart.totals.total)}</strong></span>
        </div>
        <button className="checkout-button" onClick={onCheckout} disabled={cart.items.length === 0 || busy}>
          <Icon name="card" />
          Checkout Securely
        </button>
      </aside>
    </div>
  );
}

function TrustBand() {
  return (
    <section className="trust-band">
      <div><Icon name="truck" /><span>Free shipping above 4999</span></div>
      <div><Icon name="shield" /><span>Sandbox secure payment</span></div>
      <div><Icon name="check" /><span>Easy order tracking</span></div>
    </section>
  );
}

function Checkout({ cart, profile, onSubmit, onBack, busy }) {
  const [form, setForm] = useState({
    ...profile,
    cardName: profile.name,
    cardNumber: "4242 4242 4242 4242",
    expiry: "12/30",
    cvv: "123"
  });

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function submit(event) {
    event.preventDefault();
    onSubmit({
      profile: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        line1: form.line1,
        city: form.city,
        state: form.state,
        postalCode: form.postalCode,
        country: form.country
      },
      customer: {
        name: form.name,
        email: form.email,
        phone: form.phone
      },
      shippingAddress: {
        line1: form.line1,
        city: form.city,
        state: form.state,
        postalCode: form.postalCode,
        country: form.country
      },
      payment: {
        cardName: form.cardName,
        cardNumber: form.cardNumber,
        expiry: form.expiry,
        cvv: form.cvv
      }
    });
  }

  return (
    <section className="checkout-layout">
      <form className="checkout-form" onSubmit={submit}>
        <div className="form-header">
          <button type="button" onClick={onBack}>Back to Shop</button>
          <div>
            <p className="eyebrow">Secure Checkout</p>
            <h2>Delivery and Payment</h2>
          </div>
        </div>

        <div className="form-grid">
          <label>Name<input name="name" value={form.name} onChange={update} required /></label>
          <label>Email<input name="email" type="email" value={form.email} onChange={update} required /></label>
          <label>Phone<input name="phone" value={form.phone} onChange={update} required /></label>
          <label>Address<input name="line1" value={form.line1} onChange={update} required /></label>
          <label>City<input name="city" value={form.city} onChange={update} required /></label>
          <label>State<input name="state" value={form.state} onChange={update} required /></label>
          <label>Postal Code<input name="postalCode" value={form.postalCode} onChange={update} required /></label>
          <label>Country<input name="country" value={form.country} onChange={update} required /></label>
        </div>

        <div className="payment-strip">
          <Icon name="card" />
          <span>FashionPay Sandbox</span>
          <strong>{currency(cart.totals.total)}</strong>
        </div>

        <div className="form-grid">
          <label>Card Name<input name="cardName" value={form.cardName} onChange={update} required /></label>
          <label>Card Number<input name="cardNumber" value={form.cardNumber} onChange={update} required /></label>
          <label>Expiry<input name="expiry" value={form.expiry} onChange={update} required /></label>
          <label>CVV<input name="cvv" value={form.cvv} onChange={update} required /></label>
        </div>

        <div className="checkout-total">
          <span>Payable amount</span>
          <strong>{currency(cart.totals.total)}</strong>
        </div>

        <button className="place-order" disabled={busy}>
          <Icon name="check" />
          {busy ? "Processing Payment" : "Pay and Place Order"}
        </button>
      </form>
    </section>
  );
}

function Profile({ profile, setProfile, orders, onBack }) {
  const [form, setForm] = useState(profile);

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function save(event) {
    event.preventDefault();
    localStorage.setItem(PROFILE_KEY, JSON.stringify(form));
    setProfile(form);
  }

  return (
    <section className="profile-page">
      <div className="profile-hero">
        <button onClick={onBack}>Back to Shop</button>
        <div>
          <p className="eyebrow">My Account</p>
          <h1>Profile and Orders</h1>
          <p>Manage delivery details and review recent Fashion World purchases.</p>
        </div>
      </div>
      <div className="profile-grid">
        <form className="profile-card" onSubmit={save}>
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Saved Details</p>
              <h2>Profile</h2>
            </div>
            <button>Save</button>
          </div>
          <div className="form-grid">
            <label>Name<input name="name" value={form.name} onChange={update} required /></label>
            <label>Email<input name="email" value={form.email} onChange={update} required /></label>
            <label>Phone<input name="phone" value={form.phone} onChange={update} required /></label>
            <label>Address<input name="line1" value={form.line1} onChange={update} required /></label>
            <label>City<input name="city" value={form.city} onChange={update} required /></label>
            <label>State<input name="state" value={form.state} onChange={update} required /></label>
            <label>Postal Code<input name="postalCode" value={form.postalCode} onChange={update} required /></label>
            <label>Country<input name="country" value={form.country} onChange={update} required /></label>
          </div>
        </form>

        <div className="profile-card orders-card">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Purchase History</p>
              <h2>Orders</h2>
            </div>
            <span>{orders.length}</span>
          </div>
          {orders.length === 0 ? (
            <div className="empty-state">
              <Icon name="bag" />
              <p>No orders yet. Your next outfit will show up here after checkout.</p>
            </div>
          ) : (
            <div className="order-list">
              {orders.map((order) => (
                <article className="order-card" key={order._id}>
                  <div>
                    <h3>{order.items.length} items</h3>
                    <p>{new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
                  </div>
                  <strong>{currency(order.total)}</strong>
                  <span>{order.status}</span>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Confirmation({ order, onContinue, onProfile }) {
  return (
    <section className="confirmation">
      <div className="confirmation-mark">
        <Icon name="check" />
      </div>
      <p className="eyebrow">Order Confirmed</p>
      <h1>Thanks, {order.customer.name}</h1>
      <p>Payment ending in {order.payment.last4} was approved. Your Fashion World order is now being prepared.</p>
      <div className="receipt">
        <span>Order ID <strong>{order._id}</strong></span>
        <span>Total <strong>{currency(order.total)}</strong></span>
        <span>Status <strong>{order.status}</strong></span>
      </div>
      <div className="confirmation-actions">
        <button onClick={onContinue}>Continue Shopping</button>
        <button className="secondary-button" onClick={onProfile}>View Profile</button>
      </div>
    </section>
  );
}

function App() {
  const sessionId = useMemo(getSessionId, []);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [maxPrice, setMaxPrice] = useState("");
  const [cart, setCart] = useState({ items: [], totals: { subtotal: 0, shipping: 0, tax: 0, total: 0 } });
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState(readProfile);
  const [view, setView] = useState("shop");
  const [cartOpen, setCartOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [order, setOrder] = useState(null);

  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query.trim()), 250);
    return () => clearTimeout(timeout);
  }, [query]);

  async function loadCart() {
    const cartData = await api(`/cart/${sessionId}`);
    setCart(cartData);
  }

  async function loadOrders() {
    const orderData = await api(`/orders/session/${sessionId}`);
    setOrders(orderData);
  }

  useEffect(() => {
    loadCart().catch((error) => setMessage(error.message));
    loadOrders().catch(() => setOrders([]));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== "All") params.set("category", category);
    if (debouncedQuery) params.set("q", debouncedQuery);
    if (sort) params.set("sort", sort);
    if (maxPrice) params.set("max", maxPrice);

    setLoadingProducts(true);
    api(`/products?${params.toString()}`)
      .then(setProducts)
      .catch((error) => setMessage(error.message))
      .finally(() => setLoadingProducts(false));
  }, [category, debouncedQuery, sort, maxPrice]);

  async function addToCart(product, size, color) {
    setBusy(true);
    setMessage("");
    try {
      const cartData = await api(`/cart/${sessionId}/items`, {
        method: "POST",
        body: JSON.stringify({ productId: product._id, quantity: 1, size, color })
      });
      setCart(cartData);
      setCartOpen(true);
      setMessage(`${product.name} added to your cart.`);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function updateQuantity(item, quantity) {
    setBusy(true);
    try {
      const cartData = await api(`/cart/${sessionId}/items/${item._id}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity })
      });
      setCart(cartData);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function removeItem(item) {
    setBusy(true);
    try {
      const cartData = await api(`/cart/${sessionId}/items/${item._id}`, { method: "DELETE" });
      setCart(cartData);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function placeOrder(payload) {
    setBusy(true);
    setMessage("");
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(payload.profile));
      setProfile(payload.profile);
      const data = await api("/orders/checkout", {
        method: "POST",
        body: JSON.stringify({
          sessionId,
          customer: payload.customer,
          shippingAddress: payload.shippingAddress,
          payment: payload.payment
        })
      });
      setOrder(data.order);
      setCart({ items: [], totals: { subtotal: 0, shipping: 0, tax: 0, total: 0 } });
      await loadOrders();
      setView("confirmation");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }

  function goShop() {
    setView("shop");
    setCartOpen(false);
    setTimeout(() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" }), 0);
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        query={query}
        setQuery={setQuery}
        onCart={() => setCartOpen(true)}
        onProfile={() => setView("profile")}
        onHome={() => setView("shop")}
        view={view}
      />

      {message && <button className="toast" onClick={() => setMessage("")}>{message}</button>}

      {view === "checkout" ? (
        <Checkout cart={cart} profile={profile} onSubmit={placeOrder} onBack={() => setView("shop")} busy={busy} />
      ) : view === "profile" ? (
        <Profile profile={profile} setProfile={setProfile} orders={orders} onBack={() => setView("shop")} />
      ) : view === "confirmation" && order ? (
        <Confirmation order={order} onContinue={goShop} onProfile={() => setView("profile")} />
      ) : (
        <main>
          <Hero onShop={goShop} />
          <TrustBand />
          <Catalog
            products={products}
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            loading={loadingProducts}
            onAdd={addToCart}
          />
        </main>
      )}

      <CartDrawer
        open={cartOpen}
        cart={cart}
        busy={busy}
        onClose={() => setCartOpen(false)}
        onQuantity={updateQuantity}
        onRemove={removeItem}
        onCheckout={() => {
          setCartOpen(false);
          setView("checkout");
        }}
      />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
