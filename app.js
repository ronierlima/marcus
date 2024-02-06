import puppeteer from 'puppeteer';
import express, { json } from 'express';
import cors from "cors"

const app = express()

async function scrapePage(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const htmlContent = await page.content();
  await browser.close();

  return (htmlContent);
}

app.use(json())
app.use(cors())

app.post("/", async (req, res) => {

    try {
       const resposta =  await scrapePage(req.body.url)
       res.send(resposta)
    } catch (error) {
        res.send(error)
    }
 
});

app.listen(8080, () => {
    console.log("rodando na porta 8080")
})

