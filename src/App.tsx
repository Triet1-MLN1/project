/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Home from './pages/Home';
import Game from './pages/Game';
import Quiz from './pages/Quiz';
import Theory from './pages/Theory';
import About from './pages/About';
import Exam from './pages/Exam';
import Review from './pages/Review';
import HiddenGame from './pages/HiddenGame';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Full-screen modes – outside Layout so no navbar/footer */}
          <Route path="/quiz/exam" element={<Exam />} />
          <Route path="/quiz/review" element={<Review />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="game" element={<Game />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="theory" element={<Theory />} />
            <Route path="about" element={<About />} />
            <Route path="hiddenGame" element={<HiddenGame />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
