import "dotenv/config";
import connectDB from "./db/index.db.js";
import app from "./app.js";

const startServer = async () => {
    try {
        // Attempt to connect to the database
        await connectDB();
        
        const PORT = process.env.PORT;

        // Start the server after DB connection
        app.listen(PORT, () => {
            console.log(`@@ THE Server is Running at port ::> ${PORT}`);
        });
    } catch (err) {
        // Log the DB connection error and exit the process
        console.error("Failed to start the server due to database connection error:", err);
        process.exit(1); // Exit the process with failure code
    }
};

// Start the server
startServer();
