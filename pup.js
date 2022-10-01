const puppeteer=require('puppeteer');

(async ()=>{
    const browser= await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    await page.type('input',"おはようございます");
    await page.screenshot({path:'type_result.png'});
    await browser.close();
})();