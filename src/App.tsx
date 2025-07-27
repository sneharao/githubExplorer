import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RepoDetailPage from './components/RepoDetailsPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RepoContainer from './components/RepoListContainer';

function App() {
  return (
    <div className="dark bg-black text-white font-body min-h-screen p-8">
      <Header />
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RepoContainer />} />
            <Route path="/repository/:username/:repoName"
              element={<RepoDetailPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
      <Footer />
    </div>
  );
}

export default App;
