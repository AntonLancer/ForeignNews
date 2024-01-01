import unirest from 'unirest';
import cheerio from 'cheerio';
import axios from 'axios';
import { country_post } from '.';

const delay = (ms) => {
  new Promise(r => setTimeout(() => { }, ms));
}

const log = (i, count, ms) => {
return new Promise(r => setTimeout(() => {
  console.log(`
    Запись: ${i},
    Всего записей: ${count}
  `);
  r();
}, ms))
}

function parser(url, configs){
  return new Promise((resolve, reject) => {
    unirest.get(url).end(({ body }) => { 
   //  if (error) console.log("Ошибка в модуле Parser"); else
    {
      const $ = cheerio.load(body);
      //const domain = url.match(/\/\/(.*?)\//)[1]; 
      const title = $(configs.title).text().trim(); 
      let baseImage = $(configs.image).attr('src');
     if (baseImage == undefined) {
      baseImage = '';
     }else {
      baseImage = baseImage.indexOf(`http`) >= 0 ? baseImage : `http://${baseImage}`;
    }
    const name = configs.name;

    const s_text = $(configs.text).text().trim();
    let text = '';
    if(configs.text_special == 'true') {
      const setText = (s) => s.length >= 1000 ? s.substr(0, 1000) + ' ...' : s;
      text = setText(s_text);
     }
    if(configs.text_special == 'false') text = s_text;
    
      const post = {
        title: title,
        title_orig: title,
        image: baseImage,
        text: text,
        text_orig: text,
        name: name,
        url: url
      };
      resolve(post);}
    });
  });
}

function parseLinks(url, className, maxLinks) {
  return new Promise((resolve, reject) => {
    let links = [];
    unirest.get(url).end(({ body, error}) => { 

      if (error) reject (error);
    //  console.log(body);
      const $ = cheerio.load(body);
      const domain = url.match(/\/\/(.*?)\//)[1];

      $(className).each((i, e) =>{
        if(!links.includes($(e).attr('href'))){
          if (i + 1 <= maxLinks) {
            const link_str = $(e).attr('href');
            if (link_str.indexOf(`http`) >= 0) 
            links.push($(e).attr('href')); 
            else
            links.push('http://' + domain + $(e).attr('href'));  
            console.log(links[i]);
          }
        }
      });
      resolve(links);
      if (!links.length) reject({error: "Empty parseLinks"});
    });
  });
}

const googleTranslate = (from, to, txt) =>
  `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=${from}&tl=${to}&q=${txt}`;

async function getPosts(links, configs) {
  return new Promise(async (resolve, reject) => {
    let count = links.length;
    let posts = [];
    for (let i = 0; i < count; i++){
      
    const post = await parser(links[i], configs).then(post => post);
     
    await axios(googleTranslate(configs.lang,'ru',post.title)).then((resp) => {
   let i = 0;
      let text = '';
      if(resp.data[0] != null)
      while(resp.data[0][i]){
        text += resp.data[0][i][0];
        i++
      }

      
      post.title = text;
    });
    delay(400);
      
    await axios(googleTranslate(configs.lang,'ru',post.text)).then((resp) => {
        let i = 0;
        let text = '';
        if(resp.data[0] != null)
        while(resp.data[0][i]){
          text += resp.data[0][i][0];
          i++
        }
        post.text = text;
        }
    );
    delay(400);
   
 
    var check = (post.text.match(/\%/g) || []).length;
    //console.log(check);
    if(check<10)  country_post.push(post);
    else console.log('Ошибка перевода, пост не будет записан');

    posts.push(post);
    await log(i + 1, count, 200); 
    }
    if (!posts.length) reject({ empty: "Empty getPosts() в переводе"});
    resolve(posts);
  });
}

 export { parser, parseLinks, getPosts};