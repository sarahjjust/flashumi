import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FlashcardView } from './pages/FlashcardView';
import { Home } from './pages/Home';
import { NewDeck } from './pages/NewDeck';

function NotFound() {
  return <h2>404 - Not Found</h2>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newdeck" element={<NewDeck />} />
        <Route path="/flashcard/:id" element={<FlashcardView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}