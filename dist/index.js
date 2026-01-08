"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const client_1 = require("./generated/prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const app = (0, express_1.default)();
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
const adapter = new adapter_pg_1.PrismaPg(pool);
const prismaClient = new client_1.PrismaClient({ adapter });
app.get("/", async (req, res) => {
    const data = await prismaClient.user.findMany();
    res.json({
        data
    });
});
app.post("/", async (req, res) => {
    await prismaClient.user.create({
        data: {
            username: Math.random().toString(),
            password: Math.random().toString()
        }
    });
    res.json({
        "message": "post endpoint"
    });
});
app.listen(3000);
//# sourceMappingURL=index.js.map