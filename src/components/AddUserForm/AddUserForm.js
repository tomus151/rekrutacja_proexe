import { useState } from 'react';
import LightBox from '../LightBox/LightBox';
import { addUser } from '../../actions/appActions';
import { connect } from 'react-redux'
import './AddUserForm.css';
const AddUserForm = ({ closelightbox, usersList, addUser }) => {
    const [nameInputValue, setNameInputValue] = useState('')
    const [usernameInputValue, setUsernameInputValue] = useState('')
    const [emailInputValue, setEmailInputValue] = useState('')
    const [cityInputValue, setCityInputValue] = useState('')
    const [nameValidation, setNameValidation] = useState(false);
    const [emailValidation, setEmailValidation] = useState(false);
    const handleNameInputChange = (e) => {
        setNameInputValue(e.target.value)
    }
    const handleUsernameInputChange = (e) => {
        setUsernameInputValue(e.target.value)
    }
    const handleEmailInputChange = (e) => {
        setEmailInputValue(e.target.value)
    }
    const handleCityInputChange = (e) => {
        setCityInputValue(e.target.value)
    }
    const handleSubmitForm = (e) => {
        e.preventDefault();

        if (nameInputValue.length && nameInputValue.match(/^[a-z ,.'-]+$/) && emailInputValue.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
            let highestId = usersList.length ? [...usersList].sort((a, b) => a.id - b.id)[usersList.length - 1].id : 0;
            const newUser = {
                id: usersList.length ? highestId + 1 : 1,
                name: nameInputValue,
                username: usernameInputValue,
                email: emailInputValue,
                address: { city: cityInputValue }
            }
            // METODA DO WYSYŁANIA NA SWERER
            // fetch('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data', {
            // method: 'POST',
            // body: JSON.stringify(newUser),
            // headers: {
            //     'Content-type': 'application/json; charset=UTF-8',
            // },
            // })
            // .then((response) => response.json())
            // .then((json) => console.log(json));
            addUser(newUser);
            setNameInputValue('');
            setUsernameInputValue('');
            setEmailInputValue('');
            setCityInputValue('');
            closelightbox();
        } else {
            !nameInputValue.length || !nameInputValue.match(/^[a-z ,.'-]+$/) ? setNameValidation(true) : setNameValidation(false);
            !emailInputValue.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) ? setEmailValidation(true) : setEmailValidation(false);
        }
    }

    return (
        <form onSubmit={handleSubmitForm} className="add-user-form">
            <div className={`top-of-form-container`}>
                <span className="top-form-text">Add User</span>
            </div>
            <hr />
            <br />
            <div className="add-user-wrapper-field">
                <label>Name:
                    <input className={nameValidation ? 'not-validated' : ''} type="text" value={nameInputValue} onChange={handleNameInputChange} placeholder="Name" />

                </label>
                {nameValidation &&
                    <>
                        <br />
                        <span className='validation-alert-text validation-alert-text-name'>Minimal length = 1 and only letters</span>
                    </>
                }
            </div>
            <div className="add-user-wrapper-field">
                <label>User Name:
                    <input type="text" value={usernameInputValue} onChange={handleUsernameInputChange} placeholder="User Name" />
                </label>
            </div>
            <div className="add-user-wrapper-field">
                <label>Email:
                    <input className={emailValidation ? 'not-validated' : ''} type="email" value={emailInputValue} onChange={handleEmailInputChange} placeholder="Email" />

                </label>
                {emailValidation &&
                    <>
                        <br />
                        <span className='validation-alert-text validation-alert-text-email'>email example: x@x.xx'</span>
                    </>
                }
            </div>
            <div className="add-user-wrapper-field">
                <label>City:
                    <input type="text" value={cityInputValue} onChange={handleCityInputChange} placeholder="City" />
                </label>
            </div>
            <div className="add-user-buttons-container">
                <button className="add-user-button-cancel" type="button" onClick={closelightbox}>Cancel</button>
                <button className="add-user-button-submit" type="submit">Submit</button>
            </div>
        </form >
    )
}
const connectReduxStateToProps = store => {
    return ({
        usersList: store.users
    })
}
const connectActionsToProps = ({
    addUser
})
const AddUserFormConsumer = connect(connectReduxStateToProps, connectActionsToProps)(AddUserForm)
export default AddUserFormConsumer;