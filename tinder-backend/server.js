import express from "express";
import mongoose from "mongoose";
import Cards from "./dbcards.js";
import cors from "cors";
import "dotenv/config";

//App config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = process.env.MONGODB_URI;

if (!connection_url) {
    console.error("MONGODB_URI is missing. Create a .env file (see .env.example).");
    process.exit(1);
}
//Middleware
app.use(express.json());
app.use(cors());
//DB config

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((err) => {
        console.log("MongoDB connection failed:", err.message);
    });


//API endpoints
app.get("/", (req, res) => res.status(200).send("Hello Rohith"));
app.post("/tinder/card", async (req, res) => {
    try {
        const dbCard = await Cards.create(req.body);
        res.status(201).send(dbCard);
    } catch (err) {
        res.status(500).send(err);
    }
});
app.get("/tinder/cards", async (req, res) => {
    try {
        const data = await Cards.find();
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

//Listener
app.listen(port, () => console.log(`Listening on localhost:${port}`));