const express = require("express");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/adminRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const cartRoutes = require("./routes/cartRoutes");
const cart_itemsRoutes = require("./routes/cart_itemsRoutes");
const customerRoutes = require("./routes/customerRoutes");
const customer_addressRoutes = require("./routes/customer_addressRoutes");
const customer_cardRoutes = require("./routes/customer_cardRoutes");
const delivery_methodRoutes = require("./routes/delivery_methodRoutes");
const districtRoutes = require("./routes/districtRoutes");
const eventRoutes = require("./routes/eventRoutes");
const event_typeRoutes = require("./routes/event_typeRoutes");
const human_categoryRoutes = require("./routes/human_categoryRoutes");
const langRoutes = require("./routes/langRoutes");
const payment_methodRoutes = require("./routes/payment_methodRoutes");
const regionRoutes = require("./routes/regionRoutes");
const seatRoutes = require("./routes/seatRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const ticket_statusRoutes = require("./routes/ticket_statusRoutes");
const typesRoutes = require("./routes/typesRoutes");
const venueRoutes = require("./routes/venueRoutes");
const venue_photoRoutes = require("./routes/venue_photoRoutes");
const venue_typeRoutes = require("./routes/venue_typeRoutes");
const cors = require("cors");
require("dotenv").config();

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/admins", adminRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/cart-items', cart_itemsRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/customer-addresses', customer_addressRoutes);
app.use('/api/customer-cards', customer_cardRoutes);
app.use('/api/delivery-methods', delivery_methodRoutes);
app.use('/api/districts', districtRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/event-types', event_typeRoutes);
app.use('/api/human-categories', human_categoryRoutes);
app.use('/api/langs', langRoutes);
app.use('/api/payment-methods', payment_methodRoutes);
app.use('/api/regions', regionRoutes);
app.use('/api/seats', seatRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/ticket-statuses', ticket_statusRoutes);
app.use('/api/types', typesRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/venue-photos', venue_photoRoutes);
app.use('/api/venue-types', venue_typeRoutes);

const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "CRM va Savdo API Dokumentatsiyasi",
			version: "1.0.0",
			description: "Barcha modul endpointlari uchun API tavsifi",
		},
		servers: [{ url: `http://localhost:${PORT}`, description: "Local server" }],
	},
	apis: ["./routes/*Routes.js"],
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));

async function startServer() {
	try {
		await mongoose.connect(process.env.MONGO_URL, {
			serverSelectionTimeoutMS: 10000,
		});
		console.log("MongoDB muvaffaqiyatli ishladi");
		app.listen(PORT, () => {
			console.log(`Server is running at http://localhost:${PORT}`);
			console.log(`Swagger UI sahifasi: http://localhost:${PORT}/api-docs`);
		});
	} catch (error) {
		console.error("MongoDB ulanishda xatolik yuz berdi:", error.message);
		process.exit(1);
	}
}

startServer();

module.exports = app;