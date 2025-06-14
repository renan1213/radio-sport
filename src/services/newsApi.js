import { API_KEY } from '@/constants';

export const fetchNewsArticles = async () => {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=(futebol OR soccer OR football) AND (Brasil OR Brazil OR mundial OR Champions League OR Libertadores OR Brasileirão OR Copa do Brasil)&language=pt&sortBy=publishedAt&pageSize=21&apiKey=${API_KEY}`
  );
  
  if (!response.ok) {
    const errorData = await response.json();
    console.error('NewsAPI Error:', errorData);
    if (response.status === 401) {
      throw new Error('Chave de API inválida ou não autorizada. Verifique sua chave NewsAPI.');
    }
    if (response.status === 426) {
        throw new Error('Muitas requisições para a NewsAPI. Por favor, tente novamente mais tarde (plano gratuito).');
    }
    if (response.status === 429) {
        throw new Error('Limite de requisições da NewsAPI atingido. Tente mais tarde.');
    }
    throw new Error(`Falha ao carregar notícias: ${response.statusText} (código: ${response.status}) - ${errorData.message}`);
  }
  
  const data = await response.json();
  if (data.status === "error") {
    throw new Error(`Erro da API NewsAPI: ${data.message}`);
  }
  return data.articles || [];
};