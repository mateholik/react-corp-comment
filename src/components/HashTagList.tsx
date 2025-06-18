import { useFeedbackItemsContext } from './lib/hooks';

export default function HashTagList() {
  const { companyList, setSelectedCompany } = useFeedbackItemsContext();
  return (
    <ul className='hashtags'>
      {companyList.map((company) => (
        <li key={company}>
          <button
            onClick={() => setSelectedCompany(company)}
          >{`#${company}`}</button>
        </li>
      ))}
    </ul>
  );
}
