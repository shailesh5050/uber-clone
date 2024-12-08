import dotenv from "dotenv";
import app from "./app.js";
import cors from "cors";
import http from "http";
dotenv.config();

app.use(cors());
//app.use(express.json());

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
