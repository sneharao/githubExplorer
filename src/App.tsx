import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import RepoContainer from './components/RepoContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  return (
    <div className="dark bg-black text-white font-body min-h-screen p-8">
      <Header />
      <QueryClientProvider client={new QueryClient()}>
      <RepoContainer />
      </QueryClientProvider>
        <Footer />
    </div>
  );
}

export default App;
