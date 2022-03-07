import { Header } from 'components';
import { Footer } from 'components';

import { MainPage } from 'pages';
import { ItemPage } from 'pages';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} exact />
            <Route path="/restaurants/:id" element={<ItemPage />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </div>
  );
}

export default App;
