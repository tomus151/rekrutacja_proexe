import { useState } from 'react';
import RemovePopUpContainer from '../RemovePopUpContainer/RemovePopUpContainer';
import { deleteUser, editUser } from '../../actions/appActions';
import { connect } from 'react-redux';
import './User.css';
const User = ({ idProps, nameProps, userNameProps, emailProps, cityProps, editProps, deleteProps, deleteUser, usersList, editUser, sortClickProps, canISort }) => {
    // console.log(idProps, nameProps, userNameProps, emailProps, cityProps)

    const [removeClicked, setRemoveClicked] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [inputId, setInputId] = useState(idProps);
    const [inputName, setInputName] = useState(nameProps);
    const [inputUsername, setInputUsername] = useState(userNameProps);
    const [inputEmail, setInputEmail] = useState(emailProps);
    const [inputCity, setInputCity] = useState(cityProps);
    const [nameValidation, setNameValidation] = useState(true);
    const [emailValidation, setEmailValidation] = useState(true);
    // console.log(inputId, inputName, inputUsername, inputEmail, inputCity)
    const handleOpenRemoveUserPopUp = (id) => {
        // document.querySelector('#root').style.filter = "blur(8px)";
        document.body.style.overflow = "hidden";
        setRemoveClicked(true)
    }
    const handleCloseRemoveUserPopUp = () => {
        // document.querySelector('#root').style.filter = ""
        document.body.style.overflow = "";
        setRemoveClicked(false)
    }
    const handelEditClick = () => {
        if (!canEdit) {
            setCanEdit(true)
        } else {
            let nameValidation = inputName.match(/^[a-zA-Z ,.'-]+$/);
            let emailValidation = inputEmail.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
            if (nameValidation && emailValidation) {
                setNameValidation(true);
                setEmailValidation(true);
                let editedUser = {
                    id: idProps,
                    name: inputName ? inputName : '',
                    username: inputUsername ? inputUsername : '',
                    email: inputEmail ? inputEmail : '',
                    address: inputCity ? { city: inputCity } : { city: '' }
                }
                // METODA DO EDYCJI URZYTKOWNIKA
                // fetch(`https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${idProps}`, {
                //     method: 'PUT',
                //     body: JSON.stringify(editedUser),
                //     headers: {
                //         'Content-type': 'application/json; charset=UTF-8',
                //     },
                // })
                editUser(editedUser);
                setCanEdit(false)
            } else {
                !nameValidation ? setNameValidation(false) : setNameValidation(true);
                !emailValidation ? setEmailValidation(false) : setEmailValidation(true);
            }

        }
    }
    const handleInputIdChange = (e) => {
        setInputId(e.target.value);
    }
    const handleInputNameChange = (e) => {
        setInputName(e.target.value);
    }
    const handleInputUserNameChange = (e) => {
        setInputUsername(e.target.value);
    }
    const handleInputUserEmailChange = (e) => {
        setInputEmail(e.target.value);
    }
    const handleInputUserCityChange = (e) => {
        setInputCity(e.target.value);
    }
    const handleRemoveUser = (id) => {
        document.body.style.overflow = "";
        setRemoveClicked(false)
        setCanEdit(false)
        // METODA DO USUWANIA
        // fetch(`https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${id}`, {
        // method: 'DELETE',
        // });
        deleteUser(id)
        setInputId(idProps)
    }
    return (
        <li className="list-element">
            <div className="list-element-container id-container">
                <span className="-value">{idProps}</span>
            </div>
            <div className="list-element-container name-container">
                {
                    !canEdit ?
                        <span className={`list-element-name-value ${canISort}`} onClick={sortClickProps}>{nameProps}</span>
                        :
                        <input className={`edit-name-input ${!nameValidation && 'no-validated'}`} value={inputName} onChange={handleInputNameChange} />
                }
            </div>
            <div className="list-element-container username-container">
                {
                    !canEdit ?
                        <span className="-value">{userNameProps}</span>
                        :
                        <input value={inputUsername} onChange={handleInputUserNameChange} />
                }
            </div>
            <div className="list-element-container email-container">
                {
                    !canEdit ?
                        <span className="-value">{emailProps}</span>
                        :
                        <input className={`edit-email-input ${!emailValidation && 'no-validated'}`} value={inputEmail} onChange={handleInputUserEmailChange} />
                }
            </div>
            <div className="list-element-container city-container">
                {
                    !canEdit ?
                        <span className="-value">{cityProps}</span>
                        :
                        <input value={inputCity} onChange={handleInputUserCityChange} />
                }
            </div>
            <div className="list-element-container edit-container">
                {
                    idProps === 'Id' ?
                        <span className="-value">{editProps}</span>
                        :
                        <button className="edit-button" onClick={handelEditClick}>{!canEdit ? "edit" : "confirm"}</button>
                }
            </div>
            <div className="list-element-container delete-container">
                {idProps === 'Id' ?
                    <span className="-value">{deleteProps}</span>
                    :
                    <button className="delete-button" onClick={() => handleOpenRemoveUserPopUp(idProps)}>delete</button>
                }
            </div>
            {removeClicked ? <RemovePopUpContainer
                idProps={idProps}
                nameProps={nameProps}
                userNameProps={userNameProps}
                emailProps={emailProps}
                cityProps={cityProps}
                handleCloseRemoveUserPopUp={handleCloseRemoveUserPopUp}
                handleRemoveUser={handleRemoveUser}
            /> : null}
        </li>
    );
}
const connectReduxStateToProps = store => {
    return ({
        usersList: store.users
    })
}
const connectActionToProps = ({
    deleteUser, editUser
})
const UserConsumer = connect(connectReduxStateToProps, connectActionToProps)(User)
export default UserConsumer;