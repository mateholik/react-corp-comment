import Container from './components/layout/Container';
import Footer from './components/layout/Footer';
import HashTagList from './components/HashTagList';
import FeedbackItemsContextProvider from './components/context/FeedbackItemsContextProvider';

export default function App() {
  return (
    <div className='app'>
      <Footer />
      <FeedbackItemsContextProvider>
        <Container />
        <HashTagList />
      </FeedbackItemsContextProvider>
    </div>
  );
}
