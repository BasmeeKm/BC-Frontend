import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import HomePage from './components/HomePage';
import Ans from './components/Ans';
import AssessmentForm from './components/AssessmentForm';
import AssessmentForm2 from './components/AssessmentForm2';
import Result from './components/Result';
import Screening from './components/Screening';
import Confirmation from './components/Confirmation';
import Knowledge from './components/Knowledge';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Ans" element={<Ans />} />
        <Route path="/AssessmentForm" element={<AssessmentForm />} />
        <Route path="/AssessmentForm2" element={<AssessmentForm2 />} />
        <Route path="/Result" element={<Result />} />
        <Route path="/Knowledge" element={<Knowledge />} />
        <Route path="/Screening" element={<Screening />} />
        <Route path="/Confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
