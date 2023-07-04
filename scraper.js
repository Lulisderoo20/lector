const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// URL de las páginas que queres leer
const urls = [
  'https://docs.autonomicjump.com/autonomic-jump/about/introduction/',
  'https://docs.autonomicjump.com/autonomic-jump/about/how-it-works/',
  'https://docs.autonomicjump.com/autonomic-jump/about/how-to-apply/',
  'https://docs.autonomicjump.com/autonomic-jump/about/philosophy/',
  'https://docs.autonomicjump.com/autonomic-jump/mechanics/objectives/',
  'https://docs.autonomicjump.com/autonomic-jump/mechanics/metrics/',
  'https://docs.autonomicjump.com/autonomic-jump/mechanics/terms/',
  'https://docs.autonomicjump.com/autonomic-jump/mechanics/rules/',
  'https://docs.autonomicjump.com/autonomic-jump/mechanics/about/end/',
  'https://docs.autonomicjump.com/autonomic-jump/mechanics/cycles/',
  'https://docs.autonomicjump.com/autonomic-jump/mechanics/payment/',
  'https://docs.autonomicjump.com/autonomic-jump/getting-started/',
  'https://docs.autonomicjump.com/autonomic-jump/forum/',
  'https://docs.autonomicjump.com/autonomic-jump/property/',
  'https://docs.autonomicjump.com/autonomic-jump/plagiarism/',
  'https://docs.autonomicjump.com/submission/submission-intro/',
  'https://docs.autonomicjump.com/submission/general-criteria/',
  'https://docs.autonomicjump.com/submission/specific-criteria/',
  'https://docs.autonomicjump.com/submission/policy/',
  'https://docs.autonomicjump.com/submission/style/',
  'https://docs.autonomicjump.com/submission/structure/',
  'https://docs.autonomicjump.com/submission/external-solutions/',
  'https://docs.autonomicjump.com/submission/commit/',
  'https://docs.autonomicjump.com/submission/merge-request/',
  'https://docs.autonomicjump.com/submission/uniqueness/',
  'https://docs.autonomicjump.com/templates-and-tips/templates-intro/',
  'https://docs.autonomicjump.com/templates-and-tips/commit/hack-and-code/',
  'https://docs.autonomicjump.com/templates-and-tips/commit/vbd/',
  'https://docs.autonomicjump.com/templates-and-tips/yaml/hack-and-code/',
  'https://docs.autonomicjump.com/templates-and-tips/gherkin/hack/',
  'https://docs.autonomicjump.com/templates-and-tips/gherkin/vbd/',
  'https://docs.autonomicjump.com/templates-and-tips/forum-template/',
  'https://docs.autonomicjump.com/templates-and-tips/score/',
  'https://docs.autonomicjump.com/templates-and-tips/builds/',
  'https://docs.autonomicjump.com/templates-and-tips/languages/',
  'https://docs.autonomicjump.com/templates-and-tips/templates-and-tips/libraries/',
];

let text = '';

// Función para hacer scraping de una página
async function scrapePage(url) {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  
  // Aquí iría la lógica para seleccionar los elementos correctos y extraer su texto
  $('div').each((i, elem) => {
    const elemText = $(elem).text();
    const sanitizedText = elemText.replace(/\n/g, '');
    text += sanitizedText + ' ';
  });
}

// Función para hacer scraping de todas las páginas
async function scrapeAll() {
  for (let url of urls) {
    await scrapePage(url);
  }
  
  fs.writeFile('output.txt', text, err => {
    if (err) {
      console.error(err);
    } else {
      console.log('Archivo escrito exitosamente');
    }
  });
}

// Inicia el proceso de scraping
scrapeAll().catch(console.error);
