import { Server } from "http";
import express, { Express } from "express";

const app: Express = express();

const PORT: number = parseInt(process.env.PORT || '3003');

// I had to add an underscore infront of req to stop the TS errors
app.get("/", (_req, res) => {
    res.send("Hello, Cordelia!");
});

app.get("/health", (_req, res) => {
    res.json({
        status: "OK"
    });
});

const server: Server = app.listen(PORT, '0.0.0.0', 0, () => {
    console.log(`Server is running on port ${PORT}`);
});

export { server };