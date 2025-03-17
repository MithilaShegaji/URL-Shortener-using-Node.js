const express = require('express');
const router = express.Router();
const { handleGenerateShortURL, handleGetAnalytics, redirectToMainUrl } = require('../controllers/url');

router.post('/', handleGenerateShortURL);
router.get('/analytics/:shortID', handleGetAnalytics);
router.get('/:shortID', redirectToMainUrl);

module.exports = router;


/*
http://localhost:8001/
http://localhost:8001/url
http://localhost:8001/url/analytics/xCbQLXZjX
*/