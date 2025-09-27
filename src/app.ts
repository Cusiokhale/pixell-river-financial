import { Server } from "http";
import express, { Express } from "express";

const app: Express = express();

const PORT: number = parseInt(process.env.PORT || '3000');

app.get("/", (req, res) => {
    res.send("Hello, Cordilia!");
});

app.get("/health", (req, res) => {
    res.json({
        status: "OK"
    });
});

const server: Server = app.listen(PORT, '0.0.0.0', 0, () => {
    console.log(`Server is running on port ${PORT}`);
});

export { server };