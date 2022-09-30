const puppeteer=require('puppeteer');

(async ()=>{
    const browser= await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    let sel = await page.$('h1');
    let value = await (await sel.getProperty('textContent')).jsonValue();
    console.log(value);

    await browser.close();
})();