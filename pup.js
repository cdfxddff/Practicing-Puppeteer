const puppeteer=require('puppeteer');

(async ()=>{
    const browser= await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://dictionary.goo.ne.jp/jn/');
    //await page.goto('http://localhost:3000');
    await page.type('#searchtop',"成功");
    await page.click('input[class="NR-button all_keywordsearchbtn searchbox_form_submit"]');
    await page.waitForTimeout(1000);
    await page.screenshot({path:'type_result.png'});
    await browser.close();
})();