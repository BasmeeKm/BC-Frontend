// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Ans from './components/Ans';
import AssessmentForm from './components/AssessmentForm';
import AssessmentForm2 from './components/AssessmentForm2';
import Result from './components/Result';
import Screening from './components/Screening';
import Confirmation from './components/Confirmation';
import Knowledge from './components/Knowledge';
import Footer from './components/Footer';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
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
                <Footer />
            </div>
        </Router>
    );
}

export default App;
