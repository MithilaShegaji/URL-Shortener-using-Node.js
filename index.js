const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const PORT = 8001;

const {checkForAuthentication, restrictTo} = require("./middlewares/auth");
// const {restrictToLoggedInUserOnly,checkAuth} = require("./middlewares/auth");

const URL = require('./models/url');
const User = require("./models/user");

const urlRoute = require('./routes/url');
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const { connectToMongoDB } = require("./connection");
connectToMongoDB('mongodb://127.0.0.1:27017/shorturl')
    .then(() => console.log('MongoDB connected\nClick on http://localhost:8001\nClick on http://localhost:8001/signup\nClick on http://localhost:8001/login'));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls
    });
});

// app.use("/url",restrictToLoggedInUserOnly, urlRoute);
// app.use("/",checkAuth, staticRoute);
app.use("/user", userRoute);
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/", staticRoute);

app.get('/:shortID', async (req, res) => {
    const shortID = req.params.shortID;

    // Find the URL document and update the visitHistory in one operation
    const urlRecord = await URL.findOneAndUpdate(
        { shortID }, // Use the correct key here
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            },
        },
        { new: true } // Return the updated document
    );
    
    if (!urlRecord) {
        return res.status(404).send('Short URL not found');
    }
    
    // Redirect to the original URL
    res.redirect(urlRecord.redirectURL);
});



app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));


/*
    http://localhost:8001/
    http://localhost:8001/url/analytics/dscrEXoVR
*/