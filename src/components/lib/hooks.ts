import { useContext } from 'react';
import { FeedbackItemsContext } from '../context/FeedbackItemsContextProvider';

export function useFeedbackItemsContext() {
  const context = useContext(FeedbackItemsContext);
  if (!context) {
    throw new Error(
      'Container must be used within a FeedbackItemsContextProvider'
    );
  }
  return context;
}
