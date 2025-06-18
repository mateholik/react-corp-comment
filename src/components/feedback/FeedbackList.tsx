import FeedbackItem from './FeedbackItem';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import { useFeedbackItemsStore } from '../store/feedbackItemsStore';
import { useMemo } from 'react';

export default function FeedbackList() {
  const feedbackItems = useFeedbackItemsStore((state) => state.feedbackItems);
  const selectedCompany = useFeedbackItemsStore(
    (state) => state.selectedCompany
  );
  const isLoading = useFeedbackItemsStore((state) => state.isLoading);
  const errorMessage = useFeedbackItemsStore((state) => state.errorMessage);

  const filteredFeedbackItems = useMemo(() => {
    if (!selectedCompany) return feedbackItems;
    return feedbackItems.filter(
      (item) => item.company.toLowerCase() === selectedCompany.toLowerCase()
    );
  }, [feedbackItems, selectedCompany]);

  return (
    <ol className='feedback-list'>
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {filteredFeedbackItems.map((item) => (
        <FeedbackItem key={item.id} feedbackItem={item} />
      ))}
    </ol>
  );
}
