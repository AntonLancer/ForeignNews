import {parseLinks, getPosts} from './parser';
import fs from 'fs';
import {configs} from './configs';

let Country_massiv = [
 //USA
 [
    configs.NYTimes,              
    configs.WashingtonPost,
    configs.TheHill
  ],
  //Denmark
  [
    configs.Spiegel,              
    configs.JungeFreiheit,
    configs.BerlinerMorgenpost
  ],
  //Japan
  [
    configs.TheAsahiShimbun,      
    configs.YomiuriShimbun,
    configs.MainichiShimbun
  ],
  //China
  [
   // configs.GlobalTimesCH,              
    configs.China_com,
    configs.Janmin
  ],
  //Poland
  [   
    configs.GazetaPL,
    configs.NiezaleznaPL,
    configs.wPolitycePL
  ]
]

let filenameJS = '';
function saveInFile (json)  {
  fs.writeFile(`../src/containers/${filenameJS}.json`, json, err => {
    if (err) console.log('File result is not saved');
  });
}

let country_post = [];
async function Start_posts()
{
  for(let j = 0; j < Country_massiv.length; j++){
    country_post = [];
    for(let i = 0; i < Country_massiv[j].length; i++)
    {
      console.log(Country_massiv[j][i].name);
      filenameJS = Country_massiv[j][i].filename;
      let web_site = Country_massiv[j][i].web;
      let web_links = Country_massiv[j][i].links;
      
      await parseLinks(web_site, web_links, 5).then( async links => {
        await getPosts(links, Country_massiv[j][i]).then( posts => console.log(country_post)).catch(e => console.log(e));
      });
      
    }
    saveInFile(JSON.stringify(country_post));
  }
}

Start_posts();
export {country_post, Start_posts};

//  const headliner = '.headline relative gray-darkest pb-xs';
//'https://www.washingtonpost.com/?reload=true&_=1681590122812', `${headliner} h2 a`
//'http://russian.people.com.cn/31521/index.html', `.d2_08 tr a`
/*
РАБОЧИЙ ЗАПРОС  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

parseLinks('https://www.washingtonpost.com/?reload=true&_=1681590122812', 'h2 a', 7).then(links => {
  getPosts(links, configs.WashingtonPost).then(posts => saveInFile(JSON.stringify(posts))).catch(e => console.log(e));
});

*/

/*
const appendFile = json => {
  fs.appendFile(`../src/${filenameJS}.json`, json, err => {
    if (err) console.log('File result is not append');
  });
}*/



/*const getPost = async () => {
  return await Post.then(data => data);
};*/


//'.one_t tr a'
//npx babel src_server --out-dir dist_server && node dist_server/index.js
