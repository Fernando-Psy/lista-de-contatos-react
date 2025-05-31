import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import ContactItem from '../contactItem/index';
import { useAppSelector } from '../../redux/hooks';
import { Contact } from '../../types/Contact';
import { ListContainer, Title, SearchInput, EmptyMessage, AddContactButton } from './styles';

interface ContactListProps {
  setContactToEdit: (contact: Contact | null) => void;
}

const ContactList: React.FC<ContactListProps> = ({ setContactToEdit }) => {
  const contacts = useAppSelector((state) => state.contacts.list);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredContacts = contacts.filter((contact: Contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  return (
    <ListContainer>
      <Title>Lista de Contatos ({contacts.length})</Title>

      {contacts.length > 0 && (
        <SearchInput
          data-cy="search-input"
          type="text"
          placeholder="🔍 Pesquisar contatos por nome, email ou telefone..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      )}

      {filteredContacts.length > 0 ? (
        filteredContacts.map((contact: Contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onEdit={setContactToEdit}
          />
        ))
      ) : (
        <EmptyMessage data-cy="empty-message">
          {contacts.length === 0 ? (
            <div>
              <p>📋 Nenhum contato adicionado ainda.</p>
              <p>Comece adicionando seu primeiro contato!</p>
              <AddContactButton as={Link} to="/adicionar">
                ➕ Adicionar Primeiro Contato
              </AddContactButton>
            </div>
          ) : (
            <p>🔍 Nenhum contato encontrado para "{searchTerm}"</p>
          )}
        </EmptyMessage>
      )}
    </ListContainer>
  );
};

export default ContactList;