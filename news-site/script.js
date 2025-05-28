// JavaScript source code
// Меню для мобильных устройств
document.querySelector('.menu-toggle').addEventListener('click', function () {
    document.querySelector('.nav').classList.toggle('active');
});

// Загрузка новостей
const newsContainer = document.getElementById('newsContainer');
const loadMoreBtn = document.getElementById('loadMore');
let currentPage = 1;

// Пример данных новостей (в реальном приложении можно загружать с сервера)
const newsData = [
    {
        title: "Новые технологии в медицине",
        excerpt: "Ученые разработали новый метод лечения сложных заболеваний.",
        date: "15 мая 2025",
        image: "https://via.placeholder.com/300x200"
    },
    {
        title: "Изменения в налоговом кодексе",
        excerpt: "Правительство предложило новые поправки к налоговому законодательству.",
        date: "14 мая 2025",
        image: "https://via.placeholder.com/300x200"
    },
    {
        title: "Итоги чемпионата по футболу",
        excerpt: "Завершился национальный чемпионат, определились победители.",
        date: "13 мая 2025",
        image: "https://via.placeholder.com/300x200"
    },
    {
        title: "Курс валют на этой неделе",
        excerpt: "Аналитики прогнозируют стабилизацию курса основных валют.",
        date: "12 мая 2025",
        image: "https://via.placeholder.com/300x200"
    },
    {
        title: "Новый стартап привлек инвестиции",
        excerpt: "Молодая компания получила $10 млн на развитие своей платформы.",
        date: "11 мая 2025",
        image: "https://via.placeholder.com/300x200"
    },
    {
        title: "Экологическая конференция в Берлине",
        excerpt: "Лидеры стран обсуждают меры по борьбе с изменением климата.",
        date: "10 мая 2025",
        image: "https://via.placeholder.com/300x200"
    }
];

function loadNews(page) {
    const startIndex = (page - 1) * 4;
    const endIndex = startIndex + 4;
    const newsToLoad = newsData.slice(startIndex, endIndex);

    newsToLoad.forEach(news => {
        const newsCard = document.createElement('article');
        newsCard.className = 'news-card';
        newsCard.innerHTML = `
            <img src="${news.image}" alt="${news.title}" class="news-image">
            <div class="news-content">
                <span class="news-date">${news.date}</span>
                <h3>${news.title}</h3>
                <p>${news.excerpt}</p>
                <a href="#" class="read-more">Читать далее</a>
            </div>
        `;
        newsContainer.appendChild(newsCard);
    });

    // Скрываем кнопку, если новостей больше нет
    if (endIndex >= newsData.length) {
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