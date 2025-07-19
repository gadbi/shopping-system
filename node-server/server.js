const express = require("express")
const cors = require("cors")
const { Client } = require("@elastic/elasticsearch")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3001

// Elasticsearch client
const client = new Client({
  node: process.env.ELASTICSEARCH_URL || "http://localhost:9200",
})

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json())

// Create index if it doesn't exist
async function createOrdersIndex() {
  try {
    const indexExists = await client.indices.exists({ index: "orders" })

    if (!indexExists) {
      await client.indices.create({
        index: "orders",
        body: {
          mappings: {
            properties: {
              fullName: { type: "text" },
              address: { type: "text" },
              email: { type: "keyword" },
              products: {
                type: "nested",
                properties: {
                  name: { type: "text" },
                  category: { type: "keyword" },
                  quantity: { type: "integer" },
                },
              },
              orderDate: { type: "date" },
              totalItems: { type: "integer" },
            },
          },
        },
      })
      console.log("Orders index created successfully")
    }
  } catch (error) {
    console.error("Error creating orders index:", error)
  }
}

// Routes
app.post("/api/orders", async (req, res) => {
  try {
    const { fullName, address, email, products } = req.body

    // Validate required fields
    if (!fullName || !address || !email || !products || products.length === 0) {
      return res.status(400).json({
        error: "Missing required fields: fullName, address, email, and products",
      })
    }

    // Calculate total items
    const totalItems = products.reduce((sum, product) => sum + product.quantity, 0)

    // Prepare order document
    const orderDoc = {
      fullName,
      address,
      email,
      products,
      orderDate: new Date().toISOString(),
      totalItems,
    }

    // Save to Elasticsearch
    const result = await client.index({
      index: "orders",
      body: orderDoc,
    })

    res.status(201).json({
      success: true,
      orderId: result._id,
      message: "Order saved successfully",
    })
  } catch (error) {
    console.error("Error saving order:", error)
    res.status(500).json({
      error: "Failed to save order",
      details: error.message,
    })
  }
})

// Get all orders (for admin purposes)
app.get("/api/orders", async (req, res) => {
  try {
    const result = await client.search({
      index: "orders",
      body: {
        query: { match_all: {} },
        sort: [{ orderDate: { order: "desc" } }],
      },
    })

    const orders = result.hits.hits.map((hit) => ({
      id: hit._id,
      ...hit._source,
    }))

    res.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    res.status(500).json({
      error: "Failed to fetch orders",
      details: error.message,
    })
  }
})

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() })
})

// Initialize and start server
async function startServer() {
  await createOrdersIndex()

  app.listen(PORT, () => {
    console.log(`Node.js server running on port ${PORT}`)
  })
}

startServer().catch(console.error)
