import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Header from '../Header/Header';
import FormContainer from '../FormContainer/FormContainer';
// import background from '../../images/delete_popup.png';
import './App.css';


const App = () => {
  return (
    <>
      {/* <img className="layer" src={background} alt="background" /> */}
      <Provider store={store}>
        <div className="app">
          <Header />
          <FormContainer />
        </div>
      </Provider>
    </>
  );
}

export default App;
