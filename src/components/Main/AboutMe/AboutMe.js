import './AboutMe.css';

function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__header">Студент</h2>
            <div className="about-me__student-container">
                <div className="about-me__text-container">
                    <h3 className="about-me__student-title">Даниил</h3>
                    <p className="about-me__student-subtitle">Фронтенд-разработчик, 19 лет</p>
                    <p className="about-me__text">Я живу в Краснодаре. Обучаюсь на 2 курсе в университете КубГАУ на направлении
                        "Прикладная Информатика". Я люблю слушать музыку, играть в компьютерные игры и кататься на скейте.
                        В августе 2021 записался на курсы Яндекс Практикума "Веб-разработчик". Учился там 10 месяцев.
                        В настоящий момент нахожусь в поиске работы.</p>
                    <div className="about-me__links">
                        <a className="about-me__link" href="https://www.linkedin.com/in/dankuzmenko/" target="_blank">LinkedIn</a>
                        <a className="about-me__link" href="https://github.com/DanyKuzmenko" target="_blank">Github</a>
                    </div>
                </div>
                <div className="about-me__image" />
            </div>
            <div className="about-me__portfolio">
                <h3 className="about-me__portfolio-title">Портфолио</h3>
                <div className="about-me__portfolio-links">
                    <a className="about-me__portfolio-link" href="http://dankuzmenko.mesto.nomoredomains.work" target="_blank">
                        <p className="about-me__portfolio-link-text">Одностраничное приложение</p>
                        <div className="about-me__portfolio-link-logo" />
                    </a>
                    <a className="about-me__portfolio-link" href="https://danykuzmenko.github.io/russian-travel/" target="_blank">
                        <p className="about-me__portfolio-link-text">Адаптивный сайт</p>
                        <div className="about-me__portfolio-link-logo" />
                    </a>
                    <a className="about-me__portfolio-link" href="https://how-to-learn-svwfkv77w-danykuzmenko.vercel.app/" target="_blank">
                        <p className="about-me__portfolio-link-text">Статичный сайт</p>
                        <div className="about-me__portfolio-link-logo" />
                    </a>
                </div>
            </div>
        </section>
    );
}

export default AboutMe;
