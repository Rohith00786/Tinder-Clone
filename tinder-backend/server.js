import express from "express";
import mongoose from "mongoose";
import Cards from "./dbcards.js";
import cors from "cors";

//App config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://sesharohith99_db_user:HpnLvFsgd8iQBOjI@cluster0.ogecotf.mongodb.net/tinderdb'
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
app.post("/tinder/card", (req, res) => {
    const dbCard = new Card(req.body);
    
    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});
app.get("/tinder/cards", (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

//Listener
app.listen(port, () => console.log(`Listening on localhost:${port}`));