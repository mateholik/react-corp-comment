import { TriangleUpIcon } from '@radix-ui/react-icons';
import type { TFeedbackItem } from '../lib/types';
import { useState } from 'react';

type FeedbackItemProps = {
  feedbackItem: TFeedbackItem;
};

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const [open, setOpen] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(feedbackItem.upvoteCount);

  const handleClickUpvote = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setUpvoteCount((prev) => prev + 1);
    event.stopPropagation();
    event.currentTarget.disabled = true;
  };

  return (
    <li
      className={`feedback ${open ? 'feedback--expand' : ''}`}
      onClick={() => setOpen((prev) => !prev)}
    >
      <button onClick={handleClickUpvote}>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>
      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>
      <div>
        <p>{feedbackItem.company}</p>
        <p>{feedbackItem.text}</p>
      </div>
      <p>{feedbackItem.daysAgo === 0 ? 'NEW' : `${feedbackItem.daysAgo} d`}</p>
    </li>
  );
}
