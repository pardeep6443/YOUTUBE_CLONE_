import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"
const app = express();
dotenv.config();

const connect = () => {
    mongoose
        .connect(process.env.MONGO)
        .then(() => {
            console.log("connected to DB!!")
        })
        .catch((err) => {
            throw err;
        });
}

const corsOptions = {
    // AccessControlAllowOrigin: '*',
    origin: "https://youtube-clone-frontend-gules.vercel.app/",
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    Credential: true,
};

app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOptions));
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.status || "something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    })
})

app.listen(8800, () => {
    connect()
    console.log("connected to server!!")
})
