import React from 'react';
// --- Semantic UI
import 'semantic-ui-css/semantic.min.css';
// --- Tostify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// --- Axios Progress bar
import 'axios-progress-bar/dist/nprogress.css';
import { loadProgressBar } from 'axios-progress-bar';
import { Main } from './pages/Main';
loadProgressBar(); //invoke this once time

function App() {
  return (
    <div>
      <Main />
      <ToastContainer />
    </div>
  );
}

export default App;
