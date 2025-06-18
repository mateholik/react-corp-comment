import Pattern from '../Pattern';
import Logo from '../Logo';
import PageHeading from '../PageHeading';
import FeedbackForm from '../feedback/FeedbackForm';

import { useFeedbackItemsStore } from '../store/feedbackItemsStore';

export default function Header() {
  const addItemToList = useFeedbackItemsStore((state) => state.addItemToList);

  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddToList={addItemToList} />
    </header>
  );
}
