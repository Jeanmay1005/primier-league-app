export default async function getNews() {
  const API_KEY = "bdac2a8248d14c1bad1715f3a94cc9a8";
  const today = new Date();
  const yesterday = new Date(today.setDate(today.getDate() - 1));
  const y = yesterday.toISOString().split("T")[0];

  const url = `https://newsapi.org/v2/everything?language=en&q=premier+league&from=${y}&apiKey=${API_KEY}`;
  console.log("news api");
  let res = await fetch(url);
  let data = await res.json();
  let articles = data.articles; // get the article property

  return articles.map((article) => ({
    title: article.title,
    content: article.content,
    description: article.description,
    url: article.url,
    publishTime: article.publishedAt,
    image: article.urlToImage,
  }));
}
