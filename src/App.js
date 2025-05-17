import React, { useState } from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import store from './redux/store';
import GlobalStyle from './styles/GlobalStyle';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

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

function App() {
  const [contactToEdit, setContactToEdit] = useState(null);

  return (
    <Provider store={store}>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <Title>Gerenciador de Contatos</Title>
          <Subtitle>Adicione, edite e remova seus contatos</Subtitle>
        </Header>

        <ContactForm
          contactToEdit={contactToEdit}
          setContactToEdit={setContactToEdit}
        />
        <ContactList setContactToEdit={setContactToEdit} />
      </AppContainer>
    </Provider>
  );
}

export default App;