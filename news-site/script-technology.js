// JavaScript source code
// Меню для мобильных устройств
document.querySelector('.menu-toggle').addEventListener('click', function () {
    document.querySelector('.nav').classList.toggle('active');
});

// Фильтрация новостей
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filterNews(this.textContent);
    });
});

// Данные технологических новостей
const techNews = [
    {
        title: "ChatGPT-5 анонсирован с революционными возможностями",
        excerpt: "Новая версия ИИ сможет понимать контекст на уровне человеческого сознания.",
        date: "25 мая 2025",
        views: "8.7K",
        image: "https://via.placeholder.com/300x200/3a3a3a/ffffff?text=AI",
        category: "ИИ",
        icon: "fa-robot"
    },
    {
        title: "Microsoft представила новый Surface Pro с голографическим дисплеем",
        excerpt: "Устройство поддерживает взаимодействие без касаний благодаря продвинутым датчикам.",
        date: "24 мая 2025",
        views: "5.2K",
        image: "https://via.placeholder.com/300x200/3a3a3a/ffffff?text=Gadget",
        category: "Гаджеты",
        icon: "fa-laptop"
    },
    {
        title: "Квантовый компьютер Google решил задачу за 3 минуты вместо 10 000 лет",
        excerpt: "Прорыв в квантовых вычислениях открывает новые горизонты для науки.",
        date: "23 мая 2025",
        views: "9.1K",
        image: "https://via.placeholder.com/300x200/3a3a3a/ffffff?text=Quantum",
        category: "Наука",
        icon: "fa-atom"
    },
    {
        title: "Android 14 выйдет с полностью переработанным интерфейсом",
        excerpt: "Google обещает революционные изменения в пользовательском опыте.",
        date: "22 мая 2025",
        views: "6.3K",
        image: "https://via.placeholder.com/300x200/3a3a3a/ffffff?text=Android",
        category: "Программы",
        icon: "fa-mobile"
    },
    {
        title: "Tesla представила робота-гуманоида для домашнего использования",
        excerpt: "Optimus Prime теперь может готовить ужин и убирать квартиру.",
        date: "21 мая 2025",
        views: "15.2K",
        image: "https://via.placeholder.com/300x200/3a3a3a/ffffff?text=Robot",
        category: "ИИ",
        icon: "fa-robot"
    },
    {
        title: "Новый алгоритм сжатия видео в 10 раз эффективнее HEVC",
        excerpt: "Технология позволит стримить 8K на обычных скоростях интернета.",
        date: "20 мая 2025",
        views: "4.5K",
        image: "https://via.placeholder.com/300x200/3a3a3a/ffffff?text=Video",
        category: "Программы",
        icon: "fa-video"
    }
];

// Загрузка новостей
const newsContainer = document.getElementById('newsContainer');
const loadMoreBtn = document.getElementById('loadMore');
let currentPage = 1;

function loadNews(page, filter = 'Все') {
    const startIndex = (page - 1) * 4;
    const endIndex = startIndex + 4;
    let newsToLoad = techNews.slice(startIndex, endIndex);

    if (filter !== 'Все') {
        newsToLoad = techNews.filter(news => news.category === filter).slice(startIndex, endIndex);
    }

    newsContainer.innerHTML = ''; // Очищаем перед загрузкой новых

    newsToLoad.forEach(news => {
        const newsCard = document.createElement('article');
        newsCard.className = 'news-card tech-card';
        newsCard.innerHTML = `
            <img src="${news.image}" alt="${news.title}" class="news-image tech-image">
            <div class="news-content tech-content">
                <div class="news-meta tech-meta">
                    <span class="news-date"><i class="far ${news.icon}"></i> ${news.date}</span>
                    <span class="news-category tech-category">${news.category}</span>
                </div>
                <h3>${news.title}</h3>
                <p>${news.excerpt}</p>
                <div class="tech-card-footer">
                    <span class="tech-views"><i class="far fa-eye"></i> ${news.views}</span>
                    <a href="#" class="read-more tech-read-more">Подробнее <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        `;
        newsContainer.appendChild(newsCard);
    });

    if (endIndex >= techNews.length ||
        (filter !== 'Все' && endIndex >= techNews.filter(n => n.category === filter).length)) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Фильтрация новостей
function filterNews(category) {
    currentPage = 1;
    loadNews(currentPage, category);
}

// Инициализация
loadNews(currentPage);

// Обработчик кнопки "Загрузить еще"
loadMoreBtn.addEventListener('click', function () {
    const activeFilter = document.querySelector('.filter-btn.active').textContent;
    currentPage++;
    loadNews(currentPage, activeFilter);
});