import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ link: '', name: '' });

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  
  const handleCardClick = (card) => {
    setSelectedCard(card)
  }


  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ link: '', name: '' })
  }

  return (
    <div className="page">

      <Header />

      <Main
        onCardClick={handleCardClick}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick} />

      <Footer />

      <PopupWithForm onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} name="profile" title="Редактировать профиль" buttonText="Сохранить">
        <input id="profile-name" type="text" className="popup__text" name="name" placeholder="Имя" required minLength={2} maxLength={40} />
        <span id="profile-name-error" className="popup__text-error"></span>
        <input id="profile-about" type="text" className="popup__text" name="about" placeholder="О себе" required minLength={2} maxLength={200} />
        <span id="profile-about-error" className="popup__text-error"></span>
      </PopupWithForm>
        
      <PopupWithForm onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} name="elements" title="Новое место" buttonText="Создать">
        <input id="card-name-input" type="text" className="popup__text" name="card-name" placeholder="Название" required minLength={2} maxLength={30} />
        <span id="card-name-error" className="popup__text-error"></span>
        <input id="card-src-input" type="url" className="popup__text" name="card-link" placeholder="Ссылка на картинку" required />
        <span id="card-link-error" className="popup__text-error"></span>
      </PopupWithForm>

      <PopupWithForm onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} name="avatar" title="Обновить аватар" buttonText="Сохранить">
        <input id="link" type="url" className="popup__text" name="link" placeholder="Ссылка на картинку" required />
        <span id="link-error" className="popup__text-error"></span>
      </PopupWithForm>

      <PopupWithForm onClose={closeAllPopups} name="delete" title="Вы уверены?" buttonText="Да" />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      
    </div>
  );
}

export default App;