const puppeteer=require('puppeteer');

(async ()=>{
    const browser= await puppeteer.launch({
        args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--single-process'
          ]
        });
    const page = await browser.newPage();
    await page.goto('https://dictionary.goo.ne.jp/jn/');
    await page.type('#searchtop',"成功");
    //テキストフォームに入力↑

    //~で始まるをクリック　ナビゲーションを出す
    const aop = await page.$('#search-unit > div.menu > p > a');
    await aop.click();

    //～で一致するをクリックナビゲーションを設定
    const a = await page.$('#search-unit > div.menu > ul > li:nth-child(2) > a');
    await Promise.all([
        page.waitForNavigation({waitUntil:['load','networkidle2']}),
        a.click()
    ]);
    //
    const btn = await page.$('#freeword1 > div.bk_search_btn > input');
    await Promise.all([
        page.waitForNavigation({waitUntil:['load','networkidle2']}),
        btn.click()
    ]);
    
    await page.screenshot({path:'screen_shot.png'})
    
    await browser.close();
})();