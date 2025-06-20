import { useState } from 'react';
import { MAX_CHARACTERS } from '../lib/constants';

type FeedbackFormProps = {
  onAddToList: (text: string) => void;
};

export default function FeedbackForm({ onAddToList }: FeedbackFormProps) {
  const [inputValue, setInputValue] = useState('');
  const [showValidIndicator, setShowValidIndicator] = useState(false);
  const [showInValidIndicator, setShowInValidIndicator] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const charCount = MAX_CHARACTERS - inputValue.length;

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim().length < 5) {
      setShowInValidIndicator(true);
      setErrorMessage('Minimal characters length is 5');
      setTimeout(() => {
        setShowInValidIndicator(false);
        setErrorMessage('');
      }, 3000);

      return;
    } else if (!inputValue.trim().includes('#')) {
      setShowInValidIndicator(true);
      setErrorMessage('Company name is mandatory. Example: #Nike');
      setTimeout(() => {
        setShowInValidIndicator(false);
        setErrorMessage('');
      }, 3000);

      return;
    } else {
      setShowValidIndicator(true);
      setTimeout(() => setShowValidIndicator(false), 3000);
    }

    onAddToList(inputValue);
    setInputValue('');
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value;
    if (newValue.length > MAX_CHARACTERS) {
      return;
    }
    setInputValue(newValue);
  };

  return (
    <>
      <form
        onSubmit={handleOnSubmit}
        className={`form ${showValidIndicator ? 'form--valid' : ''} ${
          showInValidIndicator ? 'form--invalid' : ''
        }`}
      >
        <textarea
          id='feedback-textarea'
          placeholder='blabla'
          spellCheck={false}
          value={inputValue}
          onChange={handleOnChange}
        />

        <label htmlFor='feedback-textarea'>
          Enter your feedback here, remember to #hashtag the company
        </label>

        <div>
          <p className='u-italic'>{charCount}</p>
          <button>
            <span>Submit</span>
          </button>
        </div>
      </form>
      <p className='error-text'>{errorMessage}</p>
    </>
  );
}
