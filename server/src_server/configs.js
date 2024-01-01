const configs = {
    WashingtonPost: {
      name: 'WashingtonPost',
      title: 'h1',
      image: '.overflow-hidden div img',
      text: '.article-body p',
      text_special: 'true',
      web: 'https://www.washingtonpost.com/?reload=true&_=1681590122812',
      links: 'h2 a',
      lang: 'en',
      filename: 'USA'
    },
    NYTimes: {
      name: 'NYTimes',
      title: 'h1',
      image: 'img',
      text: 'p',
      text_special: 'true',
      web: 'https://www.nytimes.com/',
      links: '.story-wrapper a',
      lang: 'en',
      filename: 'USA'
    },
    TheHill: {
      name: 'TheHill',
      title: 'h1:first',
      image: '.article__featured-image div img',
      text: '.article__text p',
      text_special: 'true',
      web: 'https://thehill.com/',
      links: 'h1 a',
      lang: 'en',
      filename: 'USA'
    },
    Spiegel: {
      name: 'Spiegel',
      title: 'h2',
      image: '.relative picture img',
      text: 'p',
      text_special: 'true',
      web: 'https://www.spiegel.de/schlagzeilen/',
      links: 'h2 a',
      lang: 'de',
      filename: 'GER'
    },
    JungeFreiheit: {
      name: 'Junge Freiheit',
      title: 'h2',
      image: '.elementor-widget-container > img',
      text: 'p',
      text_special: 'true',
      web: 'https://jungefreiheit.de/',
      links: ".ee-post__title",
      lang: 'de',
      filename: 'GER'
    },
    BerlinerMorgenpost: {
      name: 'Berliner Morgenpost',
      title: 'h2',
      image: 'a > img',
      text: 'p',
      text_special: 'false',
      web: 'https://www.morgenpost.de/',
      links: ".content__column .collapsable__content a",
      lang: 'de',
      filename: 'GER'
    },
    TheAsahiShimbun: {
      name: 'The Asahi Shimbun',
      title: 'h1',
      image: '.Image img',
      text: '.ArticleText p',
      text_special: 'false',
      web: 'https://www.asahi.com/ajw/new/',
      links: ".specialList a",
      lang: 'en',
      filename: 'JAP'
    },
    YomiuriShimbun: {
      name: 'Yomiuri Shimbun',
      title: 'h1',
      image: '.p-main-contents figure a img',
      text: 'p',
      text_special: 'true',
      web: 'https://www.yomiuri.co.jp/',
      links: ".title a",
      lang: 'ja',
      filename: 'JAP'
    },
    MainichiShimbun: {
      name: 'MainichiShimbun',
      title: 'h1',
      image: '.wrap img',
      text: '.txt',
      text_special: 'false',
      web: 'https://mainichi.jp/english/',
      links: '.col-set li a',
      lang: 'en',
      filename: 'JAP'
    },
  /*  Sohu: { ///////////////////////
      name: 'Sohu',
      title: 'h1',
      image: '.article p img',
      text: '.article p',
      text_special: 'false',
      web: 'https://www.sohu.com/?utm_source=vsesmi_online',
      links: '.sn-list > ul > li > a',
      lang: 'zh',
      filename: 'CHI'
    },
    Eastday: { ///////////////////////
      name: 'Eastday',
      title: 'h1',
      image: '.article p img',
      text: '.article p',
      text_special: 'false',
      web: 'https://world.eastday.com/',
      links: '.title a',
      lang: 'zh',
      filename: 'CHI'
    },
    GlobalTimesCH: { ///////////////////////
      name: 'GlobalTimesCH',
      title: '.article_title',
      image: '.article_right img',
      text: '.article_right p',
      text_special: 'false',
      web: 'https://www.globaltimes.cn/china/index.html',
      links: '.level01_list ul li div a',
      lang: 'en',
      filename: 'CHI'
    },
    Guancha: { ///////////////////////
      name: 'Guancha',
      title: '.g_title',
      image: '.gc_content p img',
      text: '.gc_content p',
      text_special: 'true',
      web: 'https://m.guancha.cn/',
      links: '.box-right > a',
      lang: 'zh',
      filename: 'CHI'
    },*/
    China_com: {
      name: 'China.com',
      title: '.article_title',
      image: '.article_content p img',
      text: '.article_content',
      text_special: 'false',
      web: 'https://news.china.com/',
      links: '.item_list li h3 a',
      lang: 'zh-CN',
      filename: 'CHI'
    },
    Janmin: {
      name: 'Janmin',
      title: 'h1',
      image: 'p img',
      text: 'p',
      text_special: 'false',
      web: 'http://en.people.cn/',
      links: '.foreign_list1 li a',
      lang: 'en',
      filename: 'CHI'
    },
    GazetaPL: {
      name: 'Gazeta.pl',
      title: 'h1',
      image: '.related_images div img',
      text: '#gazeta_article_lead, p',
      text_special: 'true',
      web: 'https://www.gazeta.pl/0,0.html?utm_source=vsesmi_online',
      links: '.sectionTiles__box a',
      lang: 'pl',
      filename: 'POL'
    },
    NiezaleznaPL: {
      name: 'Niezalezna PL',
      title: 'h1',
      image: '.article-image img',
      text: 'p',
      text_special: 'false',
      web: 'https://niezalezna.pl/?utm_source=vsesmi_online',
      links: ".col[style='overflow: hidden;'] .news-title-title a",
      lang: 'pl',
      filename: 'POL'
    },
    wPolitycePL: {
      name: 'wPolityce.PL',
      title: 'h1',
      image: '.article-img__img',
      text: '.intext-links p',
      text_special: 'true',
      web: 'https://wpolityce.pl/?utm_source=vsesmi_online',
      links: ".tile-container div article a",
      lang: 'pl',
      filename: 'POL'
    }
  };
module.exports = {
    configs: configs
};