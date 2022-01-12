import './TopForm.css';
const TopForm = ({ click, isLightBoxOpen }) => {
    return (
        <div className={`top-of-form-container ${isLightBoxOpen ? 'cant-see' : 'can-see'}`}>
            <span className="top-form-text">User List</span>
            <button className="top-form-button" onClick={click}>Add new</button>
        </div>
    );
}

export default TopForm;