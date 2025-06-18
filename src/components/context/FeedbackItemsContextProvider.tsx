import { createContext, useMemo, useState } from 'react';
import type { TFeedbackItem } from '../lib/types';
import { useFeedbackItems } from '../lib/hooks';

type FeedbackItemsContextProviderProps = {
  children: React.ReactNode;
};
type TFeedbackItemsContext = {
  isLoading: boolean;
  errorMessage: string;
  companyList: string[];
  filteredFeedbackItems: TFeedbackItem[];
  handleAddToList: (text: string) => Promise<void>;
  setSelectedCompany: React.Dispatch<React.SetStateAction<string>>;
};

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
  null
);

export default function FeedbackItemsContextProvider({
  children,
}: FeedbackItemsContextProviderProps) {
  const { feedbackItems, isLoading, errorMessage, setFeedbackItems } =
    useFeedbackItems();

  const [selectedCompany, setSelectedCompany] = useState('');

  const companyList = useMemo(
    () =>
      feedbackItems
        .map((item) => item.company)
        .filter((value, index, self) => self.indexOf(value) === index),
    [feedbackItems]
  );
  const filteredFeedbackItems = useMemo(() => {
    if (!selectedCompany) return feedbackItems;
    return feedbackItems.filter(
      (item) => item.company.toLowerCase() === selectedCompany.toLowerCase()
    );
  }, [selectedCompany, feedbackItems]);

  const handleAddToList = async (text: string) => {
    const company = text
      .split(' ')
      .find((word) => word.includes('#'))!
      .substring(1);

    const newFeedbackItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: company.substring(0, 1).toUpperCase(),
      company: company,
      text,
      daysAgo: 0,
    };

    setFeedbackItems((prevItems) => [...prevItems, newFeedbackItem]);

    await fetch(
      'https://bytegrad.com/course-assets//projects/corpcomment/api/feedbacks',
      {
        method: 'POST',
        body: JSON.stringify(newFeedbackItem),
        headers: { 'Content-Type': 'application/json' },
      }
    );
  };

  return (
    <FeedbackItemsContext.Provider
      value={{
        isLoading,
        errorMessage,
        companyList,
        filteredFeedbackItems,
        handleAddToList,
        setSelectedCompany,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}
