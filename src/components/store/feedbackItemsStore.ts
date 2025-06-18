import { create } from 'zustand';
import type { TFeedbackItem } from '../lib/types';

type Store = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  getCompanyList: () => string[];
  getFilteredFeedbackItems: () => TFeedbackItem[];
  setSelectedCompany: (company: string) => void;
  fetchFeedbackItems: () => Promise<void>;
  addItemToList: (text: string) => Promise<void>;
};

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: '',
  selectedCompany: '',
  getCompanyList: () => {
    return get()
      .feedbackItems.map((item) => item.company)
      .filter((value, index, self) => self.indexOf(value) === index);
  },
  setSelectedCompany: (company: string) => {
    set({ selectedCompany: company });
  },
  getFilteredFeedbackItems: () => {
    if (!get().selectedCompany) return get().feedbackItems;
    return get().feedbackItems.filter(
      (item) =>
        item.company.toLowerCase() === get().selectedCompany.toLowerCase()
    );
  },
  fetchFeedbackItems: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        'https://bytegrad.com/course-assets//projects/corpcomment/api/feedbacks'
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      set({ feedbackItems: data.feedbacks });
    } catch {
      set({ errorMessage: 'Failed to load feedbacks.' });
    }
    set({ isLoading: false });
  },
  addItemToList: async (text: string) => {
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

    set((state) => ({
      feedbackItems: [...state.feedbackItems, newFeedbackItem],
    }));

    await fetch(
      'https://bytegrad.com/course-assets//projects/corpcomment/api/feedbacks',
      {
        method: 'POST',
        body: JSON.stringify(newFeedbackItem),
        headers: { 'Content-Type': 'application/json' },
      }
    );
  },
}));
