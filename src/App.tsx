import Container from './components/layout/Container';
import Footer from './components/layout/Footer';
import HashTagList from './components/hashtag/HashTagList';
import { useFeedbackItemsStore } from './components/store/feedbackItemsStore';
import { useEffect } from 'react';

export default function App() {
  const fetchFeedbackItems = useFeedbackItemsStore(
    (state) => state.fetchFeedbackItems
  );

  useEffect(() => {
    fetchFeedbackItems();
  }, [fetchFeedbackItems]);
  return (
    <div className='app'>
      <Footer />
      <Container />
      <HashTagList />
    </div>
  );
}
