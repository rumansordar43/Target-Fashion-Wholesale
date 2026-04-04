import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database("prism_retail.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    sku TEXT,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    retail_price INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    image_url_2 TEXT,
    gallery TEXT,
    description TEXT,
    badge TEXT,
    fabric TEXT,
    gsm TEXT,
    sizes TEXT,
    colors TEXT,
    stock_count INTEGER DEFAULT 0,
    tags TEXT,
    status TEXT DEFAULT 'Active',
    is_popular INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    business_name TEXT,
    message TEXT,
    product_id INTEGER,
    status TEXT DEFAULT 'Pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS reseller_inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    business_name TEXT,
    location TEXT,
    experience TEXT,
    message TEXT,
    status TEXT DEFAULT 'Pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    shipping_address TEXT NOT NULL,
    total_amount INTEGER NOT NULL,
    status TEXT DEFAULT 'Pending',
    items TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`);

// Initialize default settings
const announcementBarDefault = JSON.stringify({
  enabled: true,
  text: "🏪 প্রিমিয়াম কোয়ালিটি T-shirt কিনুন | সারা বাংলাদেশে ক্যাশ অন ডেলিভারি",
  backgroundColor: "#800000",
  textColor: "#ffffff"
});

db.prepare("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)").run("announcement_bar", announcementBarDefault);
db.prepare("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)").run("benefits_section_image", "https://picsum.photos/seed/customer-benefit/1000/1000");

// Admin Middleware (Simple token check for demo)
const ADMIN_TOKEN = "prism_admin_2025";
const isAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers["x-admin-token"];
  if (token === ADMIN_TOKEN) {
    next();
  } else {
    console.warn(`Unauthorized admin access attempt with token: ${token}`);
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Seed initial data if empty
const productCount = db.prepare("SELECT COUNT(*) as count FROM products").get() as { count: number };
const categoryCount = db.prepare("SELECT COUNT(*) as count FROM categories").get() as { count: number };

if (categoryCount.count === 0) {
  console.log("Seeding categories...");
  const categories = [
    { title: "Solid", slug: "solid", image_url: "https://picsum.photos/seed/solid/800/1000" },
    { title: "Graphic", slug: "graphic", image_url: "https://picsum.photos/seed/graphic/800/1000" },
    { title: "Polo", slug: "polo", image_url: "https://picsum.photos/seed/polo/800/1000" },
    { title: "Oversized", slug: "oversized", image_url: "https://picsum.photos/seed/oversized/800/1000" },
    { title: "Full Sleeve", slug: "full-sleeve", image_url: "https://picsum.photos/seed/fullsleeve/800/1000" },
    { title: "Embroidered", slug: "embroidered", image_url: "https://picsum.photos/seed/embroidered/800/1000" }
  ];

  const insertCategory = db.prepare("INSERT INTO categories (title, slug, image_url) VALUES (?, ?, ?)");
  categories.forEach(cat => insertCategory.run(cat.title, cat.slug, cat.image_url));
  console.log("Categories seeded successfully.");
}

if (productCount.count === 0) {
  console.log("Seeding products...");
  const insert = db.prepare(`
    INSERT INTO products (
      title, sku, slug, category, retail_price, 
      image_url, image_url_2, gallery, description, badge, 
      fabric, gsm, sizes, colors, stock_count, tags, status, is_popular
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const products = [
    {
      title: "Premium Solid Drop Shoulder",
      sku: "PK-SDS-001",
      slug: "premium-solid-drop-shoulder",
      category: "Solid",
      price: 550,
      img1: "https://picsum.photos/seed/t1f/800/1000",
      img2: "https://picsum.photos/seed/t1b/800/1000",
      gallery: JSON.stringify(["https://picsum.photos/seed/t1f/800/1000", "https://picsum.photos/seed/t1b/800/1000", "https://picsum.photos/seed/t1c/800/1000", "https://picsum.photos/seed/t1m/800/1000"]),
      desc: "Our signature solid drop shoulder tee. Made from 100% premium combed cotton.",
      badge: "NEW",
      fabric: "100% Cotton",
      gsm: "180-190",
      sizes: JSON.stringify(["S", "M", "L", "XL", "XXL"]),
      colors: JSON.stringify([{name: "Black", hex: "#000000"}, {name: "White", hex: "#FFFFFF"}, {name: "Navy", hex: "#000080"}]),
      stock: 500,
      tags: JSON.stringify(["new-arrival", "featured"]),
      status: "Active",
      popular: 1
    },
    {
      title: "Cyberpunk Graphic Tee",
      sku: "PK-OGT-002",
      slug: "cyberpunk-graphic-tee",
      category: "Graphic",
      price: 650,
      img1: "https://picsum.photos/seed/t2f/800/1000",
      img2: "https://picsum.photos/seed/t2b/800/1000",
      gallery: JSON.stringify(["https://picsum.photos/seed/t2f/800/1000", "https://picsum.photos/seed/t2b/800/1000", "https://picsum.photos/seed/t2c/800/1000"]),
      desc: "High-quality graphic print with futuristic cyberpunk aesthetics.",
      badge: "HOT",
      fabric: "100% Cotton",
      gsm: "170-180",
      sizes: JSON.stringify(["M", "L", "XL"]),
      colors: JSON.stringify([{name: "Black", hex: "#000000"}]),
      stock: 300,
      tags: JSON.stringify(["hot", "featured"]),
      status: "Active",
      popular: 1
    },
    {
      title: "Vintage Embroidered Polo",
      sku: "PK-POL-003",
      slug: "vintage-embroidered-polo",
      category: "Polo",
      price: 850,
      img1: "https://picsum.photos/seed/t3f/800/1000",
      img2: "https://picsum.photos/seed/t3b/800/1000",
      gallery: JSON.stringify(["https://picsum.photos/seed/t3f/800/1000", "https://picsum.photos/seed/t3b/800/1000"]),
      desc: "Classic polo with intricate vintage embroidery on the chest.",
      badge: null,
      fabric: "Pique Cotton",
      gsm: "220",
      sizes: JSON.stringify(["S", "M", "L", "XL"]),
      colors: JSON.stringify([{name: "Royal Blue", hex: "#4169E1"}, {name: "White", hex: "#FFFFFF"}]),
      stock: 400,
      tags: JSON.stringify(["featured"]),
      status: "Active",
      popular: 0
    },
    {
      title: "Heavyweight Oversized Tee",
      sku: "PK-OGT-004",
      slug: "heavyweight-oversized-tee",
      category: "Oversized",
      price: 750,
      img1: "https://picsum.photos/seed/t4f/800/1000",
      img2: "https://picsum.photos/seed/t4b/800/1000",
      gallery: JSON.stringify(["https://picsum.photos/seed/t4f/800/1000", "https://picsum.photos/seed/t4b/800/1000"]),
      desc: "Durable heavyweight fabric for the perfect oversized silhouette.",
      badge: "NEW",
      fabric: "100% Heavy Cotton",
      gsm: "240",
      sizes: JSON.stringify(["M", "L", "XL", "XXL"]),
      colors: JSON.stringify([{name: "Charcoal", hex: "#36454F"}, {name: "Olive", hex: "#808000"}]),
      stock: 250,
      tags: JSON.stringify(["new-arrival"]),
      status: "Active",
      popular: 1
    },
    {
      title: "Minimalist Full Sleeve",
      sku: "PK-FST-005",
      slug: "minimalist-full-sleeve",
      category: "Full Sleeve",
      price: 600,
      img1: "https://picsum.photos/seed/t5f/800/1000",
      img2: "https://picsum.photos/seed/t5b/800/1000",
      gallery: JSON.stringify(["https://picsum.photos/seed/t5f/800/1000", "https://picsum.photos/seed/t5b/800/1000"]),
      desc: "Clean full sleeve tee for a minimalist look.",
      badge: null,
      fabric: "100% Cotton",
      gsm: "180",
      sizes: JSON.stringify(["S", "M", "L", "XL"]),
      colors: JSON.stringify([{name: "Black", hex: "#000000"}, {name: "Grey", hex: "#808080"}]),
      stock: 350,
      tags: JSON.stringify(["new-arrival"]),
      status: "Active",
      popular: 0
    },
    {
      title: "Floral Embroidered Tee",
      sku: "PK-EDT-006",
      slug: "floral-embroidered-tee",
      category: "Embroidered",
      price: 700,
      img1: "https://picsum.photos/seed/t6f/800/1000",
      img2: "https://picsum.photos/seed/t6b/800/1000",
      gallery: JSON.stringify(["https://picsum.photos/seed/t6f/800/1000", "https://picsum.photos/seed/t6b/800/1000"]),
      desc: "Beautiful floral embroidery on soft premium cotton.",
      badge: "HOT",
      fabric: "100% Cotton",
      gsm: "180",
      sizes: JSON.stringify(["S", "M", "L"]),
      colors: JSON.stringify([{name: "Pink", hex: "#FFC0CB"}, {name: "White", hex: "#FFFFFF"}]),
      stock: 150,
      tags: JSON.stringify(["hot"]),
      status: "Active",
      popular: 1
    }
  ];

  products.forEach(p => {
    insert.run(
      p.title, p.sku, p.slug, p.category, p.price, 
      p.img1, p.img2, p.gallery, p.desc, p.badge, 
      p.fabric, p.gsm, p.sizes, p.colors, p.stock, p.tags, p.status, p.popular
    );
  });
  console.log("Products seeded successfully.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Public API Routes
  app.get("/api/categories", (req, res) => {
    const categories = db.prepare("SELECT * FROM categories ORDER BY created_at DESC").all();
    res.json(categories);
  });

  app.get("/api/products", (req, res) => {
    const products = db.prepare("SELECT id, title, sku, slug, category, retail_price, image_url, image_url_2, gallery, description, badge, fabric, gsm, sizes, colors, stock_count, tags, status, is_popular FROM products").all();
    const parsedProducts = products.map((p: any) => ({
      ...p,
      gallery: p.gallery ? JSON.parse(p.gallery) : [],
      sizes: p.sizes ? JSON.parse(p.sizes) : [],
      colors: p.colors ? JSON.parse(p.colors) : [],
      tags: p.tags ? JSON.parse(p.tags) : [],
      is_popular: !!p.is_popular
    }));
    res.json(parsedProducts);
  });

  app.get("/api/products/:slug", (req, res) => {
    const product: any = db.prepare("SELECT id, title, sku, slug, category, retail_price, image_url, image_url_2, gallery, description, badge, fabric, gsm, sizes, colors, stock_count, tags, status, is_popular FROM products WHERE slug = ?").get(req.params.slug);
    if (product) {
      const parsedProduct = {
        ...product,
        gallery: product.gallery ? JSON.parse(product.gallery) : [],
        sizes: product.sizes ? JSON.parse(product.sizes) : [],
        colors: product.colors ? JSON.parse(product.colors) : [],
        tags: product.tags ? JSON.parse(product.tags) : [],
        is_popular: !!product.is_popular
      };
      res.json(parsedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  });

  app.get("/api/categories/:category", (req, res) => {
    const products = db.prepare("SELECT id, title, sku, slug, category, retail_price, image_url, image_url_2, gallery, description, badge, fabric, gsm, sizes, colors, stock_count, tags, status, is_popular FROM products WHERE category = ?").all(req.params.category);
    const parsedProducts = products.map((p: any) => ({
      ...p,
      gallery: p.gallery ? JSON.parse(p.gallery) : [],
      sizes: p.sizes ? JSON.parse(p.sizes) : [],
      colors: p.colors ? JSON.parse(p.colors) : [],
      tags: p.tags ? JSON.parse(p.tags) : [],
      is_popular: !!p.is_popular
    }));
    res.json(parsedProducts);
  });

  app.post("/api/inquiry", async (req, res) => {
    const { name, phone, business_name, message, product_id } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO inquiries (name, phone, business_name, message, product_id) VALUES (?, ?, ?, ?, ?)");
      const result = stmt.run(name, phone, business_name, message, product_id);
      await sendAdminNotification({ type: "Wholesale Inquiry", name, phone, business_name, message });
      res.status(201).json({ success: true, message: "Inquiry submitted successfully", id: result.lastInsertRowid });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to submit inquiry" });
    }
  });

  app.post("/api/reseller-inquiry", async (req, res) => {
    const { name, phone, email, business_name, location, experience, message } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO reseller_inquiries (name, phone, email, business_name, location, experience, message) VALUES (?, ?, ?, ?, ?, ?, ?)");
      const result = stmt.run(name, phone, email, business_name, location, experience, message);
      await sendAdminNotification({ type: "Reseller Registration", name, phone, business_name, message: `Location: ${location}, Experience: ${experience}` });
      res.status(201).json({ success: true, message: "Reseller inquiry submitted successfully", id: result.lastInsertRowid });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to submit reseller inquiry" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    const { customer_name, customer_phone, shipping_address, total_amount, items } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO orders (customer_name, customer_phone, shipping_address, total_amount, items) VALUES (?, ?, ?, ?, ?)");
      const result = stmt.run(customer_name, customer_phone, shipping_address, total_amount, JSON.stringify(items));
      await sendAdminNotification({ type: "New Order", name: customer_name, phone: customer_phone, message: `Total: ${total_amount}, Items: ${items.length}` });
      res.status(201).json({ success: true, message: "Order placed successfully", id: result.lastInsertRowid });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to place order" });
    }
  });

  app.get("/api/settings", (req, res) => {
    const settings = db.prepare("SELECT * FROM settings").all() as { key: string, value: string }[];
    const settingsMap = settings.reduce((acc: any, curr) => {
      try {
        acc[curr.key] = JSON.parse(curr.value);
      } catch (e) {
        acc[curr.key] = curr.value;
      }
      return acc;
    }, {});
    res.json(settingsMap);
  });

  app.post("/api/admin/settings", isAdmin, (req, res) => {
    const { key, value } = req.body;
    if (!key) return res.status(400).json({ error: "Key is required" });
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").run(key, stringValue);
    res.json({ success: true });
  });

  app.get("/api/announcement-bar", (req, res) => {
    const setting = db.prepare("SELECT value FROM settings WHERE key = ?").get("announcement_bar") as { value: string } | undefined;
    if (setting) {
      res.json(JSON.parse(setting.value));
    } else {
      res.json({ enabled: false, text: "", backgroundColor: "#800000", textColor: "#ffffff" });
    }
  });

  app.post("/api/admin/announcement-bar", isAdmin, (req, res) => {
    const value = JSON.stringify(req.body);
    db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").run("announcement_bar", value);
    res.json({ success: true });
  });

  // Admin API Routes
  app.get("/api/admin/categories", isAdmin, (req, res) => {
    const categories = db.prepare("SELECT * FROM categories ORDER BY created_at DESC").all();
    res.json(categories);
  });

  app.post("/api/admin/categories", isAdmin, (req, res) => {
    const { title, slug, image_url, description } = req.body;
    try {
      if (!title || !slug || !image_url) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }
      const stmt = db.prepare("INSERT INTO categories (title, slug, image_url, description) VALUES (?, ?, ?, ?)");
      const result = stmt.run(title, slug, image_url, description || "");
      res.status(201).json({ success: true, id: result.lastInsertRowid });
    } catch (error: any) {
      console.error("Category create error:", error);
      res.status(400).json({ success: false, error: error.message || "Slug must be unique" });
    }
  });

  app.put("/api/admin/categories/:id", isAdmin, (req, res) => {
    const { title, slug, image_url, description } = req.body;
    try {
      db.prepare("UPDATE categories SET title = ?, slug = ?, image_url = ?, description = ? WHERE id = ?").run(title, slug, image_url, description || "", req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Category update error:", error);
      res.status(400).json({ success: false, error: error.message || "Failed to update category" });
    }
  });

  app.delete("/api/admin/categories/:id", isAdmin, (req, res) => {
    db.prepare("DELETE FROM categories WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/admin/inquiries", isAdmin, (req, res) => {
    const inquiries = db.prepare("SELECT * FROM inquiries ORDER BY created_at DESC").all();
    res.json(inquiries);
  });

  app.get("/api/admin/reseller-inquiries", isAdmin, (req, res) => {
    const inquiries = db.prepare("SELECT * FROM reseller_inquiries ORDER BY created_at DESC").all();
    res.json(inquiries);
  });

  app.get("/api/admin/orders", isAdmin, (req, res) => {
    const orders = db.prepare("SELECT * FROM orders ORDER BY created_at DESC").all();
    const parsedOrders = orders.map((o: any) => ({ ...o, items: JSON.parse(o.items) }));
    res.json(parsedOrders);
  });

  app.patch("/api/admin/orders/:id", isAdmin, (req, res) => {
    const { status } = req.body;
    db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, req.params.id);
    res.json({ success: true });
  });

  app.get("/api/admin/products", isAdmin, (req, res) => {
    const products = db.prepare("SELECT * FROM products ORDER BY created_at DESC").all();
    const parsedProducts = products.map((p: any) => ({
      ...p,
      gallery: p.gallery ? JSON.parse(p.gallery) : [],
      sizes: p.sizes ? JSON.parse(p.sizes) : [],
      colors: p.colors ? JSON.parse(p.colors) : [],
      tags: p.tags ? JSON.parse(p.tags) : [],
      is_popular: !!p.is_popular
    }));
    res.json(parsedProducts);
  });

  app.post("/api/admin/products", isAdmin, (req, res) => {
    try {
      const p = req.body;
      const stmt = db.prepare(`
        INSERT INTO products (
          title, sku, slug, category, retail_price, 
          image_url, image_url_2, gallery, description, badge, 
          fabric, gsm, sizes, colors, stock_count, tags, status, is_popular
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const result = stmt.run(
        p.title || "", p.sku || "", p.slug || "", p.category || "", p.retail_price || 0,
        p.image_url || "", p.image_url_2 || "", JSON.stringify(p.gallery || []), p.description || "", p.badge || "",
        p.fabric || "", p.gsm || "", JSON.stringify(p.sizes || []), JSON.stringify(p.colors || []), p.stock_count || 0, JSON.stringify(p.tags || []), p.status || "Active", p.is_popular ? 1 : 0
      );
      res.json({ success: true, id: result.lastInsertRowid });
    } catch (error: any) {
      console.error("Error adding product:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.put("/api/admin/products/:id", isAdmin, (req, res) => {
    try {
      const p = req.body;
      const stmt = db.prepare(`
        UPDATE products SET 
          title = ?, sku = ?, slug = ?, category = ?, retail_price = ?, 
          image_url = ?, image_url_2 = ?, gallery = ?, description = ?, badge = ?, 
          fabric = ?, gsm = ?, sizes = ?, colors = ?, stock_count = ?, tags = ?, status = ?, is_popular = ?
        WHERE id = ?
      `);
      stmt.run(
        p.title || "", p.sku || "", p.slug || "", p.category || "", p.retail_price || 0,
        p.image_url || "", p.image_url_2 || "", JSON.stringify(p.gallery || []), p.description || "", p.badge || "",
        p.fabric || "", p.gsm || "", JSON.stringify(p.sizes || []), JSON.stringify(p.colors || []), p.stock_count || 0, JSON.stringify(p.tags || []), p.status || "Active", p.is_popular ? 1 : 0,
        req.params.id
      );
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error updating product:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.delete("/api/admin/products/:id", isAdmin, (req, res) => {
    try {
      db.prepare("DELETE FROM products WHERE id = ?").run(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting product:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Mock Notification Service
  const sendAdminNotification = async (inquiry: any) => {
    console.log("--------------------------------------------------");
    console.log(`🔔 ADMIN NOTIFICATION: ${inquiry.type}`);
    console.log(`From: ${inquiry.name} (${inquiry.phone})`);
    if (inquiry.business_name) console.log(`Business: ${inquiry.business_name}`);
    console.log(`Message: ${inquiry.message}`);
    console.log("--------------------------------------------------");
  };

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
