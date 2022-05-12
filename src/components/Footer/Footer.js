import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__container">
                <p className="footer__text">© 2020</p>
                <div className="footer__links">
                    <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank">Яндекс.Практикум</a>
                    <a className="footer__link" href="https://www.linkedin.com/in/dankuzmenko/" target="_blank">Github</a>
                    <a className="footer__link" href="https://github.com/DanyKuzmenko" target="_blank">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
