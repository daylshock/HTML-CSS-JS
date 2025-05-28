// JavaScript source code
// Меню для мобильных устройств
document.querySelector('.menu-toggle').addEventListener('click', function () {
    document.querySelector('.nav').classList.toggle('active');
});

// Загрузка политических новостей
const newsContainer = document.getElementById('newsContainer');
const loadMoreBtn = document.getElementById('loadMore');
let currentPage = 1;

// Данные политических новостей
const politicsNews = [
    {
        title: "Состоялись переговоры между лидерами стран",
        excerpt: "Главы государств обсудили вопросы международного сотрудничества и безопасности.",
        date: "20 мая 2025",
        image: "https://via.placeholder.com/300x200",
        category: "Международные отношения"
    },
    {
        title: "Парламент принял новый бюджет",
        excerpt: "Депутаты утвердили бюджет на следующий год с акцентом на социальные программы.",
        date: "19 мая 2025",
        image: "https://via.placeholder.com/300x200",
        category: "Законодательство"
    },
    {
        title: "Оппозиция объявила о новых инициативах",
        excerpt: "Лидеры оппозиционных партий представили программу реформ.",
        date: "18 мая 2025",
        image: "https://via.placeholder.com/300x200",
        category: "Внутренняя политика"
    },
    {
        title: "Министр иностранных дел выступил с заявлением",
        excerpt: "Официальное заявление касается ситуации в регионе и позиции страны.",
        date: "17 мая 2025",
        image: "https://via.placeholder.com/300x200",
        category: "Дипломатия"
    },
    {
        title: "Изменения в налоговом законодательстве",
        excerpt: "Правительство предложило новые поправки в налоговый кодекс.",
        date: "16 мая 2025",
        image: "https://via.placeholder.com/300x200",
        category: "Законодательство"
    },
    {
        title: "Выборы в местные органы власти",
        excerpt: "Началась подготовка к выборам в городские и региональные советы.",
        date: "15 мая 2025",
        image: "https://via.placeholder.com/300x200",
        category: "Выборы"
    }
];

function loadNews(page) {
    const startIndex = (page - 1) * 4;
    const endIndex = startIndex + 4;
    const newsToLoad = politicsNews.slice(startIndex, endIndex);

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

    if (endIndex >= politicsNews.length) {
        loadMoreBtn.style.display = 'none';
    }
}

// Загрузка первых новостей
loadNews(currentPage);

// Обработчик кнопки "Загрузить еще"
loadMoreBtn.addEventListener('click', function () {
    currentPage++;
    loadNews(currentPage);
});