import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ link: '', name: '' });
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards()
      .then(res => {
        setCards(res)
      })
      .catch(err => {
        console.error(err)
      })
  }, []);

  React.useEffect(() => {
    api.getUserData()
      .then(res => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.error(err);
      })
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.error(err)
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== card._id));
      })
      .catch((err) => {      
        console.error(err);
      })
  }

  const handleUpdateUser = (data) => {
    api.patchUserData(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
    .catch((err) => {
        console.error(err);
      })
  }

  const handleUpdateAvatar = (data) => {
    api.patchUserAvatar(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
    .catch((err) => {
        console.error(err);
      })
  }

  const handleAddPlaceSubmit = (newCard) => {
    api.postCard(newCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups()
      })
    .catch(err => {
        console.error(err)
      })
  }

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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header />

        <Main
          onCardClick={handleCardClick}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
          cards={cards} />

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;