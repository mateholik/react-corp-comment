import Container from './components/Container';
import Footer from './components/Footer';
import HashTagList from './components/HashTagList';

export default function App() {
  return (
    <div className='app'>
      <Footer />
      <Container />
      <HashTagList />
    </div>
  );
}
