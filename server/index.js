const express = require("express");
const next = require("next");
const dotenv = require("dotenv");
const request = require("request");
const bodyParser = require("body-parser");

dotenv.config();

const port = parseInt(process.env.SERVER_PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const handle = app.getRequestHandler();

function setupRobotsTXT(server) {
    const robotsOptions = {
        root: __dirname + "/../public/",
        headers: {
            "Content-Type": "text/plain;charset=UTF-8",
        }
    };
    server.get("/robots.txt", (req, res) => (
        res.status(200).sendFile("robots.txt", robotsOptions)
    ));
}

function setupSiteMapXML(server) {
    const siteMapOptions = {
        root: __dirname + "/../public/",
        headers: {
            "Content-Type": "text/xml;charset=UTF-8",
        }
    };
    server.get("/sitemap.xml", (req, res) => (
        res.status(200).sendFile("sitemap.xml", siteMapOptions)
    ));
}

function setupFavicon(server) {
    const faviconOptions = {
        root: __dirname + "/../public/"
    };
    server.get("/favicon.ico", (req, res) => (
        res.status(200).sendFile("favicon.ico", faviconOptions)
    ));
}

function handleRedirect(req, res) {

    console.log(req.originalUrl);

    const options = {
        method: req.method,
        url: `${process.env.ADMIN_API_BASE_URL}${req.originalUrl.replace(/^\/api/, "")}`,
        headers: {
            ...req.headers,
            "CLIENT-ID": process.env.CLIENT_ID,
        },
        body: JSON.stringify(req.body)
    };

    request(options, function (error, response, body) {
        if (error) res.status(403).send(error);
        console.log("error:", error); // Print the error if one occurred
        console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
        console.log("body:", body);
        res.set(response.headers);
        res.send(body);
    });
}

app.prepare().then(() => {
    const server = express();

    setupRobotsTXT(server);
    setupSiteMapXML(server);
    setupFavicon(server);

    server.use(bodyParser.json());
    server.use("/api/*", handleRedirect);

    server.get("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
