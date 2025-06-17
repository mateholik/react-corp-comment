type HashTagListProps = {
  companyList: string[];
  onSelectCompany: (tag: string) => void;
};

export default function HashTagList({
  companyList,
  onSelectCompany,
}: HashTagListProps) {
  return (
    <ul className='hashtags'>
      {companyList.map((company) => (
        <li key={company}>
          <button
            onClick={() => onSelectCompany(company)}
          >{`#${company}`}</button>
        </li>
      ))}
    </ul>
  );
}
