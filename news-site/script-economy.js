// JavaScript source code
// Меню для мобильных устройств
document.querySelector('.menu-toggle').addEventListener('click', function () {
    document.querySelector('.nav').classList.toggle('active');
});

// Загрузка экономических новостей
const newsContainer = document.getElementById('newsContainer');
const loadMoreBtn = document.getElementById('loadMore');
let currentPage = 1;

// Данные экономических новостей
const economyNews = [
    {
        title: "Крупнейшая IPO года: компания привлекла $2 млрд",
        excerpt: "Первичное публичное предложение акций стало рекордным для этого сектора экономики.",
        date: "22 мая 2025",
        image: "https://via.placeholder.com/300x200",
        category: "Фондовый рынок"
    },
    {
        title: "Инфляция замедлилась до 5,3% в годовом выражении",
        excerpt: "Статистика показывает улучшение экономических показателей.",
        date: "21 мая 2025",
        image: "https://via.placeholder.com/300x200",
        category: "Макроэкономика"
    },
    {
        title: "Криптовалютный рынок вырос на 15% за неделю",
        excerpt: "Биткоин преодолел важный психологический уровень.",
        date: "20 мая 2025",
        image: "https://via.placeholder.com/300x200",
        category: "Криптовалюты"
    },
    {
        title: "Крупный merger в IT-секторе: сделка на $10 млрд",
        excerpt: "Две компании объявили о слиянии, что создаст нового лидера рынка.",
        date: "19 мая 2025",
        image: "https://via.placeholder.com/300x200",
        category: "Корпорации"
    },
    {
        title: "Новый налоговый вычет для малого бизнеса",
        excerpt: "Правительство утвердило дополнительные меры поддержки предпринимателей.",
        date: "18 мая 2025",
        image: "https://via.placeholder.com/300x200",
        category: "Налоги"
    },
    {
        title: "Рост ВВП за квартал составил 2,1%",
        excerpt: "Экономика демонстрирует устойчивое развитие несмотря на внешние вызовы.",
        date: "17 мая 2025",
        image: "https://via.placeholder.com/300x200",
        category: "Макроэкономика"
    }
];

// Функция для загрузки новостей
function loadNews(page) {
    const startIndex = (page - 1) * 4;
    const endIndex = startIndex + 4;
    const newsToLoad = economyNews.slice(startIndex, endIndex);

    newsToLoad.forEach(news => {
        const newsCard = document.createElement('article');
        newsCard.className = 'news-card';
        newsCard.innerHTML = `
            <img src="${news.image}" alt="${news.title}" class="news-image">
            <div class="news-content">
                <div class="news-meta">
                    <span class="news-date">${news.date}</span>
                    <span class="news-category">${news.category}</span>
                </div>
                <h3>${news.title}</h3>
                <p>${news.excerpt}</p>
                <a href="#" class="read-more">Читать далее</a>
            </div>
        `;
        newsContainer.appendChild(newsCard);
    });

    if (endIndex >= economyNews.length) {
        loadMoreBtn.style.display = 'none';
    }
}

// Функция для обновления экономических индикаторов (моковые данные)
function updateEconomicIndicators() {
    // В реальном проекте здесь был бы запрос к API
    document.getElementById('usdRate').textContent = '75,43 ₽ (-0,15%)';
    document.getElementById('eurRate').textContent = '82,17 ₽ (+0,23%)';
    document.getElementById('oilPrice').textContent = '$76,84 (+1,2%)';
}

// Загрузка первых новостей и индикаторов
loadNews(currentPage);
updateEconomicIndicators();

// Обработчик кнопки "Загрузить еще"
loadMoreBtn.addEventListener('click', function () {
    currentPage++;
    loadNews(currentPage);
});