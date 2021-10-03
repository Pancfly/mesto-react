import React from 'react';

function PopupWithForm(props) {

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_is-opened'}`}>
            <div className="popup__container">
                <button type="button" onClick={props.onClose} aria-label="Закрыть окно" className="popup__button popup__button_close popup__button_close-add"></button>
                <h3 className="popup__title">{`${props.title}`}</h3>
                {props.children}         
            </div>
        </div>
    )
}

export default PopupWithForm;