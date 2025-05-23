import React, { useState, ChangeEvent } from 'react';
import ContactItem from '../contactItem/index';
import { useAppSelector } from '../../redux/hooks';
import { Contact } from '../../types/Contact';
import { ListContainer, Title, SearchInput, EmptyMessage } from './styles';

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
      <Title>Lista de Contatos</Title>
      <SearchInput
        type="text"
        placeholder="Pesquisar contatos..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {filteredContacts.length > 0 ? (
        filteredContacts.map((contact: Contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onEdit={setContactToEdit}
          />
        ))
      ) : (
        <EmptyMessage>
          {contacts.length === 0
            ? 'Nenhum contato adicionado ainda. Adicione um novo contato usando o formulário acima.'
            : 'Nenhum contato encontrado para esta pesquisa.'}
        </EmptyMessage>
      )}
    </ListContainer>
  );
};

export default ContactList;
