const express = require('express')
const mongoose = require('mongoose')
const cheerio = require('cheerio')
const axios = require('axios')
const Page = require('../models/Page')

// middleware 
const router = express.Router()


async function crawlPage(url) {
  try {
    // fetch HTML
    const { data } = await axios.get(url);
    const $ = cheerio.load(data, { xmlMode: true })
    
    // extract links
    const links = [];
    $("url > loc").each((_, el) => {
      links.push($(el).text().trim());
    });

    // pushing linksout into mongoDb

    let page = await Page.findOneAndUpdate(
      { url },
      { html: data, linksOut: links },
      { new: true, upsert: true }
    );

    // Update linksIn for target pages

    for (const link of links) {
      await Page.findOneAndUpdate(
        { url: link },
        { $addToSet: { linksIn: url } },
        { upsert: true }
      );
    }
    return page;
  } catch (err) {
    console.error("Error crawling:", url, err.message);
  }
}

router.post("/links-in", async (req, res) => {
  const { url } = req.body;
  const page = await Page.findOne({ url });
  if (!page) return res.status(404).json({ error: "Page not found" });
  res.json({ linksIn: page.linksIn });
});

// POST: Get all pages linking OUT from given URL
router.post("/links-out", async (req, res) => {
  const { url } = req.body;
  const page = await Page.findOne({ url });
  if (!page) return res.status(404).json({ error: "Page not found" });
  res.json({ linksOut: page.linksOut });
});

// POST: Get top N most linked pages
router.post("/top-linked", async (req, res) => {
  const { n } = req.body;
  const pages = await Page.aggregate([
    { $project: { url: 1, numLinksIn: { $size: "$linksIn" } } },
    { $sort: { numLinksIn: -1 } },
    { $limit: n }
  ]);
  res.json(pages);
});

module.exports = {router,crawlPage}