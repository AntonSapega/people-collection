import React from 'react';
import { useState } from 'react';
import Modal from '../../components/Modal/Modal';

const Home = () => {
  const [isVisible, setVisibility] = useState(false);

  function togglePopupStatus() {
    setVisibility(status => !status);
  }

  return (
    <div>
      <h1>Home Page works!</h1>
      <button onClick={togglePopupStatus}>Show Modal</button>
      {isVisible &&
        <Modal
          title="Please confirm your actions"
          type={'confirm'}
          userChoice={res => togglePopupStatus(res)}>
          Hello Modal
        </Modal>
      }
    </div>
  )
}

export default Home;