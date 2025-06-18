import { useFeedbackItemsStore } from '../store/feedbackItemsStore';
import HashtagItem from './hashtagItem';

export default function HashTagList() {
  const companyList = useFeedbackItemsStore((state) => state.getCompanyList());
  const setSelectedCompany = useFeedbackItemsStore(
    (state) => state.setSelectedCompany
  );
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
