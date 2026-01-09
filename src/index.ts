import "dotenv/config"
import express, { Request, Response } from "express"
import { PrismaClient } from "./generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const app = express()
app.use(express.json())
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
const adapter = new PrismaPg(pool)
const prismaClient = new PrismaClient({ adapter })

app.get("/", async (req: Request, res: Response) => {
   
    const data = await prismaClient.user.findMany();
    res.json({
        data
    })
})

app.post("/", async (req: Request, res: Response) => {

    await prismaClient.user.create({
        data: {
            username: Math.random().toString(),
            password: Math.random().toString()
        }
    })
    res.json({
        "message": "post endpoint"
    })
})

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});