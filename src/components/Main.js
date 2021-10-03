import React from 'react';
import api from '../utils/Api';
import Card from './Card';


function Main(props) {

    const [userName, setUserName] = React.useState();
    const [userDescription , setUserDescription ] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserData()
        .then(res => {
            setUserName(res.name)
            setUserDescription(res.about)
            setUserAvatar(res.avatar)
        })
        .catch((err) => {
            console.error(err);
        })
    })

    React.useEffect(() => {
        api.getInitialCards()
        .then(res => {
            const data = res.map((item) => {
                return {
                    id: item._id,
                    link: item.link,
                    name: item.name,
                    likes: item.likes.length
                }
            })
            setCards(data)
        })
        .catch(err => {
            console.error(err)
        })
    }, []);


    const onEditAvatar = () => {
        props.onEditAvatar(props.onClick);
    }
  
    const onEditProfile = () => {
        props.onEditProfile(props.onClick);
    }
  
    const onAddPlace = () => {
        props.onAddPlace(props.onClick);
    }
  

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-overlay">
                    <img src={userAvatar} alt="Аватар пользователя" className="profile__avatar" />
                    <button onClick={onEditAvatar} type="button" className="profile__button profile__button_action_avatar-edit"></button>
                </div>
                <div className="profile__info">
                    <button onClick={onEditProfile} type="button" aria-label="Редактировать профиль" className="profile__button profile__button_action_edit"></button>
                    <h1 className="profile__name">{userName}</h1>                    
                    <p className="profile__about">{userDescription}</p>
                </div>
                <button onClick={onAddPlace} type="button" aria-label="Добавить место" className="profile__button profile__button_action_add"></button>
            </section>
            <section className="elements">
                <div className="elements__list">
                    {cards.map(card => (
                        <Card key={card.id} card={card} onCardClick={props.onCardClick} />
                    ))}
                </div>
            </section>
        </main>    
    )
}

export default Main;