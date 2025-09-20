# Edzy.ai Sitemap Crawler

This project is a **backend application** built using **Node.js, Express, MongoDB, Axios, and Cheerio** to crawl pages from [Edzy.ai](https://www.edzy.ai/) and generate a summary of **in-links** and **out-links** for each page.

---

## Features

- Fetch URLs from **sitemap.xml** (`https://www.edzy.ai/sitemap.xml`).
- Crawl each page using **Axios** and extract links with **Cheerio**.
- Store pages in **MongoDB** with the following information:
  - `url` — Page URL
  - `html` — Raw HTML content
  - `linksOut` — URLs this page links to
  - `linksIn` — URLs linking to this page
- Expose API endpoints for querying link structure:
  - **POST /api/links-in** — Returns all pages linking **to** a given URL
  - **POST /api/links-out** — Returns all pages a given URL is linking **out to**
  - **POST /api/top-linked** — Returns top N pages with the most incoming links

---

## Tech Stack

- **Node.js** — Backend runtime
- **Express.js** — Web framework for APIs
- **MongoDB & Mongoose** — Database and schema modeling
- **Axios** — HTTP client to fetch page HTML
- **Cheerio** — Parse HTML and extract `<a>` links

---

## Installation

1. Clone the repository:
```bash
git clone https://github.com/kushvendar/sitemapCrawler
cd sitemapCrawler

npm install

enter your connection string in .env 
MONGO_URI = "YOUR-CONNECTION-STRING"

RUN
node index.js
