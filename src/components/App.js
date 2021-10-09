import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cardForDelete, setCardForDelete] = React.useState({})
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ link: '', name: '' });
  const [cards, setCards] = React.useState([]);

  const [isLoadingInitialData, setIsLoadingInitialData] = React.useState(false);
  const [isLoadingSetUserInfo, setIsLoadingSetUserInfo] = React.useState(false);
  const [isLoadingAddPlaceSubmit, setIsLoadingAddPlaceSubmit] = React.useState(false);
  const [isLoadingAvatarUpdate, setIsLoadingAvatarUpdate] = React.useState(false);

  React.useEffect(() => {
    setIsLoadingInitialData(true);
    api.getInitialCards()
      .then(res => {
        setCards(res)
      })
      .catch(err => {
        console.error(err)
      })
      .finally( () => {
        setIsLoadingInitialData(false);
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

  function handleCardDelete(e) {
    e.preventDefault();
    api.deleteCard(cardForDelete._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== cardForDelete._id))
        closeAllPopups()
      })
      .catch((err) => {      
        console.error(err);
      })
  }

  const handleUpdateUser = (data) => {
    setIsLoadingSetUserInfo(true);
    api.patchUserData(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoadingSetUserInfo(false)
      })
  }

  const handleUpdateAvatar = (data) => {
    setIsLoadingAvatarUpdate(true);
    api.patchUserAvatar(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoadingAvatarUpdate(false);
      })
  }

  const handleAddPlaceSubmit = (newCard) => {
    setIsLoadingAddPlaceSubmit(true);
    api.postCard(newCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups()
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        setIsLoadingAddPlaceSubmit(false);
      })
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleCardDeleteRequest(card) {
    setCardForDelete(card);
    setIsConfirmPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
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
          onCardDeleteRequest={handleCardDeleteRequest}
          onCardLike={handleCardLike}
          isLoadingInitialData={isLoadingInitialData}
          cards={cards} />

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoadingData={isLoadingSetUserInfo} isLoadingInitialData={isLoadingInitialData} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoadingData={isLoadingAddPlaceSubmit} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoadingData={isLoadingAvatarUpdate} />

        <ConfirmationPopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onSubmit={handleCardDelete} />

        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;