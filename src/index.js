import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./env"
});

try {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`\nServer is running on port ${process.env.PORT}`);
    });
} catch (error) {
    console.log(error);
}