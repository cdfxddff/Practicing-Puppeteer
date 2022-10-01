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

    //～で一致するをクリック　ナビゲーションを設定
    const a = await page.$('#search-unit > div.menu > ul > li:nth-child(2) > a');
    await Promise.all([
        page.waitForNavigation({waitUntil:['load','networkidle2']}),
        a.click()
    ]);
    //検索ボタンをクリック
    const btn = await page.$('#freeword1 > div.bk_search_btn > input');
    await Promise.all([
        page.waitForNavigation({waitUntil:['load','networkidle2']}),
        btn.click()
    ]);
    //要素を取得
    const eletopi = await page.$('#NR-main-in > section > div > div.basic_title.nolink');
    const elecont = await page.$$('#NR-main-in > section > div > div.example_sentence > ul > li');
    //データを抽出
    const valtopi = await (await eletopi.getProperty('textContent')).jsonValue();
    let valcont=[];
    for(let i=0;i<elecont.length;i++){
        valcont[i] = await (await elecont[0].getProperty('textContent')).jsonValue();
        valcont[i].trim();
    }
    //データを整形
    console.log(valtopi.replace('で一致する言葉','').trim());
    console.log(valcont);

    //await page.screenshot({path:'screen_shot.png'})
    
    await browser.close();
})();