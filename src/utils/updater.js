const puppeteer = require("puppeteer");
const fsp = require('fs/promises')

const today = require('./today.js')

var c = ['Not Loaded yet', 'c', 'c', 'c', 'c', 'c']
var d = ['Not Loaded yet', 'd', 'd', 'd', 'd', 'd']
var v = 'Not Loaded yet'
var site = "https://crumblcookies.com/";
var siteupdated = false;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {


    while (true) {
        console.log("Updating cookies", today.getDateTime());

        try {
            const browser = await puppeteer.launch({
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                ],

                defaultViewport: {
                    width: 800,
                    height: 4500,
                },
            });

            const page = await browser.newPage();
            await page.goto(site, {"waitUntil" : "networkidle0"})
            const vid = await page.$('#crumbl_homePage_desktop_video');

            //await page.screenshot({ path: "weekly-cookie-flavors.png"});

            const element = await page.$('#weekly-cookie-flavors');
            await element.screenshot({ path: "./src/cookies/cookies.png" });
            //console.log("screenshot taken")


            //gets cookie video
            const cookieVid = await page.evaluate(() => {
                console.log('hi')
                return document.querySelector("video").currentSrc;

            })
            v = cookieVid.toString();
            await fsp.writeFile("./src/cookies/cookieVid.txt", cookieVid.toString())



            //gets cookie names and checks if updated
            const cookies = await page.evaluate(() => {
                const container = document.querySelector("#weekly-cookie-flavors");
                return Array.from(container.querySelectorAll("h3")).map(x => x.textContent)
            })
            await fsp.writeFile("./src/cookies/cookieNames.txt", cookies.join("\r\n"))

            if (c[2] !== 'c' && cookies[2] !== c[2]) {
                siteupdated = true;
            }
            c = cookies;

            //gets cookie descriptions
            const descs = await page.evaluate(() => {
                const container = document.querySelector("#weekly-cookie-flavors");
                return Array.from(container.querySelectorAll("p")).map(x => x.textContent)
            })
            await fsp.writeFile("./src/cookies/cookieDescs.txt", descs.join("\r\n"))
            d = descs;

            await browser.close();

            //send console log update complete
            console.log("Cookie update complete", today.getDateTime());
        } catch (err) {
            console.log("update failed")
            console.error(err.message);
        }


        //await sleep(900000);
        await sleep(60000);


    }

})();

module.exports.isUpdated = () => {
    
    if (siteupdated === true) {
        siteupdated = false
        return true
    }
    return false
}