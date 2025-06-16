import { useState } from 'react';
import { MAX_CHARACTERS } from './lib/constants';

export default function FeedbackForm() {
  const [inputValue, setInputValue] = useState('');

  const charCount = MAX_CHARACTERS - inputValue.length;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Feedback submitted:', inputValue);
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
    <form onSubmit={handleSubmit} className='form'>
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
  );
}
