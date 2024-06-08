const express = require("express")
const bodyParser = require("body-parser")
const TBDGRBRoutes = require("./src/TBDGRB/routes");

const app = express();
const port = 3500;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Good Reading Bookstore");
})

app.use("/TBDGRB", TBDGRBRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
