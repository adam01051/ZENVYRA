import dotenv from "dotenv";
dotenv.config({
	path: process.env.NODE_ENV === "production" ? ".env.production":".env"
});
import server from "./app";


//cluster => database => collection = > document

import mongoose from "mongoose";


mongoose
	.connect(process.env.MONGO_URL as string, {})
	.then((data) => {
		console.log("mongoDB connection succeeded");
        const PORT = process.env.PORT ?? 3003;
        server.listen(PORT, function () {
			console.info(`the server is running at port: ${PORT}`);
			console.info(`Admin project on http://localhost:${PORT}/admin \n`);
        })
	})
	.catch((err) => {
		console.log("mongoDB connection failed", err);
	}); 