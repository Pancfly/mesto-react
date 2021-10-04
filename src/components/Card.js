import React from 'react';

function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <div className="elements__element">     
            <img onClick={handleClick} src={props.card.link} alt={props.card.name} className="elements__image" />
            <button type="button" aria-label="Удалить карточку" className="elements__button elements__button_delete"></button>
            <h3 className="elements__title">{props.card.name}</h3>
            <div className="elements__like-conteiner">
            <button type="button" className="elements__button elements__button_like" />
                <span className="elements__count">{props.card.likes}</span>
            </div>
        </div>
    )
}

export default Card;