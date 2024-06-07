const express = require("express")
const TBDGRBRoutes = require("./src/TBDGRB/routes");


const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Good Reading Bookstore");
})

app.use("/TBDGRB", TBDGRBRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
