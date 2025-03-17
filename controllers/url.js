const shortID_Require = require("shortid");
const URL = require('../models/url');

async function handleGenerateShortURL(req, res) {
    const body = req.body;

    if (!body.url) 
        return res.status(400).render('error',{ error: 'URL is required' });

    // Check if the URL already exists in the database
    let urlRecord = await URL.findOne({ redirectURL: body.url, createdBy: req.user._id });
    
    // If it exists, use the existing short ID
    if (urlRecord) {
        const userUrls = await URL.find({createdBy: req.user._id}); // Retrieve all URLs for the table
        return res.render('home', { id: urlRecord.shortID, urls: userUrls });
    }

    // If it doesn't exist, create a new short ID
    const shortID_Generate = shortID_Require.generate();

    urlRecord = await URL.create({
        shortID: shortID_Generate,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    const userUrls = await URL.find({createdBy: req.user._id}); // Retrieve all URLs for the table
    return res.render('home', { id: shortID_Generate, urls: userUrls});
}



async function handleGetAnalytics(req, res) {
    const shortID_Require = req.params.shortID;
    const result = await URL.findOne({ shortID: shortID_Require });
    if (!result) return res.status(404).json({ error: 'Short URL not found' });

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

async function redirectToMainUrl(req, res) {
    const shortID = req.params.shortID;

    const urlRecord = await URL.findOneAndUpdate(
        { shortID }, // Correctly reference shortID
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            },
        },
        // { new: true } // Return the updated document
    );

    if (!urlRecord) {
        return res.status(404).send("No entry found for the provided shortId.");
    }

    res.redirect(urlRecord.redirectURL);
}



module.exports = {
    handleGenerateShortURL,
    handleGetAnalytics,
    redirectToMainUrl,

};
