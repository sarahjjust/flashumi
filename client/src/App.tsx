import { Routes, Route } from 'react-router';
import { FlashcardView } from './pages/FlashcardView';
import { DeckView } from './pages/DeckView';
import { Home } from './pages/Home';
import { Decks } from './pages/Decks';

function NotFound() {
  return <h2>404 - Not Found</h2>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/decks" element={<Decks />} />
      <Route path="/flashcard/:id" element={<FlashcardView />} />
      <Route path="/deck/:id" element={<DeckView />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}