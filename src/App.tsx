import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ProgramsPage } from '@/pages/ProgramsPage';
import { ResourcesPage } from '@/pages/ResourcesPage';
import { AIPlaygroundPage } from '@/pages/AIPlaygroundPage';
import { ContactPage } from '@/pages/ContactPage';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('hu-idter-dark-mode');
    if (stored !== null) return stored === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('hu-idter-dark-mode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <Router>
      <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/ai-playground" element={<AIPlaygroundPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
