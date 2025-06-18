import { useFeedbackItemsStore } from '../store/feedbackItemsStore';
import HashtagItem from './hashtagItem';

export default function HashTagList() {
  const feedbackItems = useFeedbackItemsStore((state) => state.feedbackItems);
  const setSelectedCompany = useFeedbackItemsStore(
    (state) => state.setSelectedCompany
  );
  const companyList = [...new Set(feedbackItems.map((item) => item.company))];
  return (
    <ul className='hashtags'>
      {companyList.map((company) => (
        <HashtagItem
          key={company}
          company={company}
          onSelectCompany={setSelectedCompany}
        />
      ))}
    </ul>
  );
}
