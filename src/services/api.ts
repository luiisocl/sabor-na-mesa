import type { Ingredient, Meal } from '../types';

// API pública e gratuita: https://www.themealdb.com/api.php
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const api = {
  search: (term: string) => `${BASE_URL}/search.php?s=${encodeURIComponent(term)}`,
  byId: (id: string) => `${BASE_URL}/lookup.php?i=${id}`,
  random: () => `${BASE_URL}/random.php`,
  categories: () => `${BASE_URL}/categories.php`,
  byCategory: (category: string) => `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`,
};

// A API guarda os ingredientes em 20 campos separados.
// Esta função junta tudo em uma lista limpa.
export function extractIngredients(meal: Meal): Ingredient[] {
  const list: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim() ?? '';
    if (name) list.push({ name, measure });
  }
  return list;
}

// Nomes das categorias em português (a API retorna em inglês)
export const categoryNames: Record<string, string> = {
  Beef: 'Carne bovina',
  Breakfast: 'Café da manhã',
  Chicken: 'Frango',
  Dessert: 'Sobremesa',
  Goat: 'Cabrito',
  Lamb: 'Cordeiro',
  Miscellaneous: 'Diversos',
  Pasta: 'Massas',
  Pork: 'Porco',
  Seafood: 'Frutos do mar',
  Side: 'Acompanhamentos',
  Starter: 'Entradas',
  Vegan: 'Vegano',
  Vegetarian: 'Vegetariano',
};

export const translateCategory = (name?: string) => (name ? categoryNames[name] ?? name : '');

// Países/origens em português (a API retorna em inglês: "Italian", "Mexican"...)
export const areaNames: Record<string, string> = {
  Algerian: 'Argelina',
  American: 'Americana',
  Argentinian: 'Argentina',
  Australian: 'Australiana',
  Brazilian: 'Brasileira',
  British: 'Britânica',
  Canadian: 'Canadense',
  Chinese: 'Chinesa',
  Croatian: 'Croata',
  Dutch: 'Holandesa',
  Egyptian: 'Egípcia',
  Filipino: 'Filipina',
  French: 'Francesa',
  Greek: 'Grega',
  Indian: 'Indiana',
  Irish: 'Irlandesa',
  Italian: 'Italiana',
  Jamaican: 'Jamaicana',
  Japanese: 'Japonesa',
  Kenyan: 'Queniana',
  Malaysian: 'Malaia',
  Mexican: 'Mexicana',
  Moroccan: 'Marroquina',
  Norwegian: 'Norueguesa',
  Polish: 'Polonesa',
  Portuguese: 'Portuguesa',
  Russian: 'Russa',
  'Saudi Arabian': 'Saudita',
  Slovakian: 'Eslovaca',
  Spanish: 'Espanhola',
  Syrian: 'Síria',
  Thai: 'Tailandesa',
  Tunisian: 'Tunisiana',
  Turkish: 'Turca',
  Ukrainian: 'Ucraniana',
  Uruguayan: 'Uruguaia',
  Venezulan: 'Venezuelana', // a API escreve assim mesmo
  Venezuelan: 'Venezuelana',
  Vietnamese: 'Vietnamita',
  Unknown: 'Origem desconhecida',
  // Algumas receitas usam o nome do país em vez da nacionalidade
  Argentina: 'Argentina',
  France: 'Francesa',
  India: 'Indiana',
  Netherlands: 'Holandesa',
  Norway: 'Norueguesa',
  Slovakia: 'Eslovaca',
  'United States': 'Americana',
  Venezuela: 'Venezuelana',
};

export const translateArea = (name?: string) => (name ? areaNames[name] ?? name : '');

// Dicionário de busca: português → inglês (a API só entende inglês)
const searchDictionary: Record<string, string> = {
  // carnes e proteínas
  frango: 'chicken', galinha: 'chicken', carne: 'beef', bife: 'steak', porco: 'pork', lombo: 'pork',
  cordeiro: 'lamb', cabrito: 'goat', pato: 'duck', peru: 'turkey', presunto: 'ham', bacon: 'bacon',
  linguica: 'sausage', salsicha: 'sausage', costela: 'ribs', almondega: 'meatball', hamburguer: 'burger',
  peixe: 'fish', salmao: 'salmon', atum: 'tuna', camarao: 'prawn', lula: 'squid', polvo: 'octopus',
  mexilhao: 'mussels', caranguejo: 'crab', ovo: 'egg', tofu: 'tofu',
  // pratos
  bolo: 'cake', torta: 'pie', tarte: 'tart', pao: 'bread', sopa: 'soup', salada: 'salad',
  massa: 'pasta', macarrao: 'pasta', espaguete: 'spaghetti', lasanha: 'lasagne', arroz: 'rice',
  panqueca: 'pancake', pudim: 'pudding', biscoito: 'biscuit', bolacha: 'cookie', sorvete: 'ice cream',
  ensopado: 'stew', guisado: 'stew', caril: 'curry', sanduiche: 'sandwich', cuscuz: 'couscous',
  // ingredientes e sabores
  queijo: 'cheese', chocolate: 'chocolate', maca: 'apple', banana: 'banana', morango: 'strawberry',
  limao: 'lemon', laranja: 'orange', coco: 'coconut', mel: 'honey', batata: 'potato', tomate: 'tomato',
  cogumelo: 'mushroom', cenoura: 'carrot', abobora: 'pumpkin', espinafre: 'spinach', feijao: 'bean',
  lentilha: 'lentil', alho: 'garlic', cebola: 'onion', gengibre: 'ginger', manteiga: 'butter',
  leite: 'milk', creme: 'cream', amendoim: 'peanut', canela: 'cinnamon', caramelo: 'caramel',
  // modos de preparo
  assado: 'roast', assada: 'roast', frito: 'fried', frita: 'fried', grelhado: 'grilled', grelhada: 'grilled',
  picante: 'spicy', apimentado: 'spicy', doce: 'sweet', vegano: 'vegan', vegetariano: 'vegetarian',
};

// Palavras que não ajudam na busca ("bolo DE chocolate", "frango COM batata")
const stopWords = new Set(['de', 'da', 'do', 'das', 'dos', 'com', 'e', 'a', 'o', 'na', 'no', 'em', 'ao']);

// Remove acentos e deixa minúsculo: "Maçã" → "maca"
const normalize = (text: string) => text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

// Traduz uma palavra; tenta também sem o "s" do plural ("ovos" → "ovo")
function translateWord(word: string): string | null {
  return searchDictionary[word] ?? (word.endsWith('s') ? searchDictionary[word.slice(0, -1)] : undefined) ?? null;
}

// Converte o termo digitado em português para o inglês que a API entende.
// Ex.: "frango" → "chicken" · "bolo de chocolate" → "chocolate cake"
// Se nenhuma palavra estiver no dicionário, devolve o termo original (o usuário pode ter digitado em inglês).
export function toEnglishSearch(term: string): string {
  const words = normalize(term).split(/\s+/).filter((w) => w && !stopWords.has(w));
  const translated = words.map(translateWord);
  if (translated.every((w) => w === null)) return term.trim();

  // Em português o principal vem antes ("bolo de chocolate"); em inglês, depois ("chocolate cake")
  return words
    .map((w, i) => translated[i] ?? w)
    .reverse()
    .join(' ');
}

// Plano B para buscas com várias palavras: usa só a primeira palavra conhecida.
// Ex.: "carne assada" não acha nada como "roast beef" → tenta só "beef".
export function fallbackSearch(term: string): string | null {
  const words = normalize(term).split(/\s+/).filter((w) => w && !stopWords.has(w));
  if (words.length < 2) return null;
  for (const w of words) {
    const t = translateWord(w);
    if (t) return t;
  }
  return null;
}
