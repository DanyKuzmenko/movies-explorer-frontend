import './ProfilePopup.css';
import popupImage from '../../images/profilePopupImage.svg';

function ProfilePopup(props) {
    return (
        <div className={`popup ${props.isPopupOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button
                    type="button"
                    className="popup__close-button"
                    aria-label="Закрыть попап"
                    onClick={props.onClose}
                />
                <img className="popup__icon" src={popupImage} />
                <h1 className="popup__description">Вы успешно изменили профиль</h1>
            </div>
        </div>
    );
}

export default ProfilePopup;