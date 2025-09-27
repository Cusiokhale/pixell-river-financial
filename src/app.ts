import { Server } from "http";
import express, { Express } from "express";
import morgan from "morgan";

const app: Express = express();

const PORT: number = parseInt(process.env.PORT || '3003');

app.use(morgan("combined"));

// I had to add an underscore infront of req to stop the TS errors
app.get("/", (_req, res) => {
    res.send("Hello, Cordelia!");
});

app.get("/health", (_req, res) => {
    res.send("Server is healthy")
});

const server: Server = app.listen(PORT, '0.0.0.0', 0, () => {
    console.log(`Server is running on port ${PORT}`);
});

export { app, server };