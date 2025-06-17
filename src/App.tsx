import { useEffect, useState } from 'react';
import Container from './components/Container';
import Footer from './components/Footer';
import HashTagList from './components/HashTagList';
import type { TFeedbackItem } from './components/lib/types';

export default function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddToList = (text: string) => {
    const companyName = text
      .split(' ')
      .find((word) => word.includes('#'))!
      .substring(1);

    const newFeedbackItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
      companyName: companyName,
      text,
      daysAgo: 0,
    };

    setFeedbackItems((prevItems) => [...prevItems, newFeedbackItem]);
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          'https://bytegrad.com/course-assets//projects/corpcomment/api/feedbacks'
        );

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();

        setFeedbackItems(data.feedbacks);
      } catch {
        setErrorMessage('Failed to load feedbacks.');
      }
      setIsLoading(false);
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className='app'>
      <Footer />
      <Container
        handleAddToList={handleAddToList}
        feedbackItems={feedbackItems}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
      <HashTagList />
    </div>
  );
}
