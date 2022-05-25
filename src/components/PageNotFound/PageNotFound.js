import './PageNotFound.css';
import {Link} from "react-router-dom";

function PageNotFound() {
    return (
      <section className="error-page">
            <div className="error-page__container">
                <h2 className="error-page__title">404</h2>
                <p className="error-page__subtitle">Страница не найдена</p>
            </div>
            <Link className="error-page__link">Назад</Link>
      </section>
    );
}

export default PageNotFound;