import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setUserName(currentUser.name);
    setUserDescription(currentUser.about);
}, [currentUser]); 

  function handleSubmit(e) {
  e.preventDefault();
  props.onUpdateUser({
    userName,
    userAbout: userDescription,
  });
}
  
  function handleChangeUserName(e) {
    setUserName(e.target.value)
  }

  function handleChangeUserDescription(e) {
    setUserDescription(e.target.value)
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} name="profile" title="Редактировать профиль" buttonText="Сохранить">
      <input value={userName || ''} onChange={handleChangeUserName} id="profile-name" type="text" className="popup__text" name="name" placeholder="Имя" required minLength={2} maxLength={40} />
      <span id="profile-name-error" className="popup__text-error" />
      <input value={userDescription || ''} onChange={handleChangeUserDescription} id="profile-about" type="text" className="popup__text" name="about" placeholder="О себе" required minLength={2} maxLength={200} />
      <span id="profile-about-error" className="popup__text-error" />
    </PopupWithForm>
  )
}

export default EditProfilePopup