import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ link: '', name: '' });

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  }
  
  const handleCardClick = (card) => {
    setSelectedCard(card)
  }


  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({ link: '', name: '' })
  }

  return (
    <div className="page">
      <>
        <Header />
        <Main
          onCardClick={handleCardClick}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick} />
        <Footer />
        <PopupWithForm onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} name="profile" title="Редактировать профиль">
          <>
            <form className="popup__input popup__input_type_profile-form" name="info" noValidate>
              <input id="profile-name" type="text" className="popup__text" name="name" placeholder="Имя" required minLength={2} maxLength={40} />
              <span id="profile-name-error" className="popup__text-error"></span>
              <input id="profile-about" type="text" className="popup__text" name="about" placeholder="О себе" required minLength={2} maxLength={200} />
              <span id="profile-about-error" className="popup__text-error"></span>
              <button type="submit" className="popup__button popup__button_submit" aria-label="Сохранить профиль">Сохранить</button>
            </form>
          </>
        </PopupWithForm>
        
        <PopupWithForm onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} name="elements" title="Новое место">
          <>
            <form className="popup__input popup__input_type_elements-form" name="card" noValidate>
              <input id="card-name-input" type="text" className="popup__text" name="card-name" placeholder="Название" required minLength={2} maxLength={30} />
              <span id="card-name-error" className="popup__text-error"></span>
              <input id="card-src-input" type="url" className="popup__text" name="card-link" placeholder="Ссылка на картинку" required />
              <span id="card-link-error" className="popup__text-error"></span>
              <button type="submit" className="popup__button popup__button_submit" aria-label="Создать карточку">Создать</button>
            </form>
          </>
        </PopupWithForm>

        <PopupWithForm onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} name="avatar" title="Обновить аватар">
          <>
            <form className="popup__input popup__input_type_avatar-form" name="avatar" noValidate>
              <input id="link" type="url" className="popup__text" name="link" placeholder="Ссылка на картинку" required />
              <span id="link-error" className="popup__text-error"></span>
              <button type="submit" className="popup__button popup__button_submit" aria-label="Сохранить аватар">Сохранить</button>
            </form>
          </>
        </PopupWithForm>
        <PopupWithForm onClose={closeAllPopups} name="delete" title="Вы уверены?">
          <>
            <button type="submit" className="popup__button popup__button_submit" aria-label="Удалить карточку">Да</button>
          </>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </>
    </div>
  );
}

export default App;
