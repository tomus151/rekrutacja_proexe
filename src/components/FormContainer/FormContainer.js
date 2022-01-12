import { useState } from 'react'
import TopForm from '../TopForm/TopForm';
import UsersTableConsumer from '../UsersTable/UsersTable';
import AddUserFormConsumer from '../AddUserForm/AddUserForm';
import './FormContainer.css';
const FormContainer = () => {
    const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
    const handleOpenLightBox = () => {
        setIsLightBoxOpen(true);
    }
    const handleCloseLightBox = () => {
        setIsLightBoxOpen(false);
    }
    return (
        <div className="form-container">
            <TopForm click={handleOpenLightBox} isLightBoxOpen={isLightBoxOpen} />
            {!isLightBoxOpen && <hr />}
            <UsersTableConsumer isLightBoxOpen={isLightBoxOpen} />
            {isLightBoxOpen ? < AddUserFormConsumer closelightbox={handleCloseLightBox} /> : null}
        </div>
    );
}

export default FormContainer;