import { useEffect, useState } from 'react';
import FeedbackItem from './FeedbackItem';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

export default function FeedbackList() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    <ol className='feedback-list'>
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {feedbackItems.map((item) => (
        <FeedbackItem key={item.id} feedbackItem={item} />
      ))}
    </ol>
  );
}
