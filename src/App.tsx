import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import store from './redux/store';
import GlobalStyle from './styles/GlobalStyle';
import ContactForm from './components/contactForm/index';
import ContactList from './components/contactList/index';
import Navigation from './components/navigation/index';
import { Contact } from './types/Contact';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  font-size: 1.1rem;
`;

const App: React.FC = () => {
  const [contactToEdit, setContactToEdit] = useState<Contact | null>(null);

  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <Header>
            <Title>Gerenciador de Contatos</Title>
            <Subtitle>Adicione, edite e remova seus contatos</Subtitle>
          </Header>

          <Navigation />

          <Routes>
            <Route
              path="/"
              element={<ContactList setContactToEdit={setContactToEdit} />}
            />
            <Route
              path="/adicionar"
              element={
                <ContactForm
                  contactToEdit={contactToEdit}
                  setContactToEdit={setContactToEdit}
                />
              }
            />
            <Route
              path="/editar"
              element={
                <ContactForm
                  contactToEdit={contactToEdit}
                  setContactToEdit={setContactToEdit}
                />
              }
            />
          </Routes>
        </AppContainer>
      </Router>
    </Provider>
  );
};

export default App;