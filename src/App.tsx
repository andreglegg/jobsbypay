import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import About from './components/About';
import Footer from './components/Footer/Footer';
import Home from './components/Home';
import Navigation from './components/Navigation/Navigation';
import styles from './App.module.css';

const App = () => (
  <HashRouter>
    <div className={styles.appShell}>
      <Navigation />
      <main className={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </HashRouter>
);

export default App;
