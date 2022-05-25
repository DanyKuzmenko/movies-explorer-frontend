import './AboutProject.css';

function AboutProject() {
    return (
        <section className="about-project">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__container">
                <div className="about-project__text-container">
                    <h3 className="about-project__text-title">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__text">Составление плана, работу над бэкендом,
                        вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__text-container">
                    <h3 className="about-project__text-title">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн,
                        которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__progress-bar">
                <div className="about-project__progress-container">
                    <p className="about-project__progress about-project__progress-backend">1 неделя</p>
                    <h3 className="about-project__progress-title">Back-end</h3>
                </div>
                <div className="about-project__progress-container">
                    <p className="about-project__progress">4 недели</p>
                    <h3 className="about-project__progress-title">Front-end</h3>
                </div>
            </div>
        </section>
    );
}

export default AboutProject;
