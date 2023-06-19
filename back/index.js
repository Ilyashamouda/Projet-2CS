const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", require("./src/routes/acceuil"));
app.use("/dons", require("./src/routes/dons"));
app.use("/fournisseurs", require("./src/routes/fournisseurs"));
app.use("/subventions", require("./src/routes/subventions"));
app.use("/rss", require("./src/routes/rss"));

// Start the server
app.listen(3000, async () => {
  console.log("Server is running on port 3000");
});
