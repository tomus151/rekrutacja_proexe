import LightBox from '../LightBox/LightBox';
import './RemovePopUpContainer.css';
const RemovePopUpContainer = ({ idProps, nameProps, userNameProps, emailProps, cityProps, handleCloseRemoveUserPopUp, handleRemoveUser }) => {
    const handleStopPropagation = (e) => {
        e.stopPropagation();
    }
    return (
        <LightBox click={handleCloseRemoveUserPopUp}>
            <div className="removepopup-container" onClick={handleStopPropagation}>
                <div className="removepopup-text-container">
                    <p className="removepopup-title">Delete</p>
                    <hr />
                    <div className="data-to-remove">
                        <p>Id: {idProps}</p>
                        <p>Name: {nameProps}</p>
                        <p>User Name: {userNameProps}</p>
                        <p>Email: {emailProps}</p>
                        <p>City: {cityProps}</p>
                    </div>
                </div>
                <div className="removepopup-buttons-container">
                    <button className="removepopup-button-cancel" onClick={handleCloseRemoveUserPopUp}>Cancel</button>
                    <button className="removepopup-button-remove-user" onClick={() => handleRemoveUser(idProps)}>Delete</button>
                </div>
            </div>
        </LightBox>
    );
}

export default RemovePopUpContainer;