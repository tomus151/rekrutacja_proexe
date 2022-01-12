import React from 'react';
import ReactDOM from 'react-dom';
import './LightBox.css';
const LightBox = ({ children, click }) => {
    return ReactDOM.createPortal((
        <div className="lightbox-container" onClick={click}>
            {children}
        </div>
    ), document.body)
}
export default LightBox;