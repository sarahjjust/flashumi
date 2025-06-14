import { Routes, Route } from 'react-router';
import { FlashcardView } from './pages/FlashcardView';
import { DeckView } from './pages/DeckView';
import { Home } from './pages/Home';
import { NewDeck } from './pages/NewDeck';

function NotFound() {
  return <h2>404 - Not Found</h2>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/newdeck" element={<NewDeck />} />
      <Route path="/flashcard/:id" element={<FlashcardView />} />
      <Route path="/deck/:id" element={<DeckView />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}