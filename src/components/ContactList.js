import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ContactItem from './ContactItem';

const ListContainer = styled.div`
    margin-top: 20px;
`;

const EmptyMessage = styled.p`
    text-align: center;
    color: #7f8c8d;
    font-style: italic;
    margin: 40px 0;
`;

const Title = styled.h2`
    color: #2c3e50;
    margin-bottom: 20px;
    border-bottom: 2px solid #ecf0f1;
    padding-bottom: 10px;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 20px;
    font-size: 16px;

    &:focus {
        border-color: #3498db;
        outline: none;
    }
`;

const ContactList = ({ setContactToEdit }) => {
    const contacts = useSelector((state) => state.contacts.list);
    const [searchTerm, setSearchTerm] = React.useState('');

    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm)
    );

    return (
        <ListContainer>
            <Title>Lista de Contatos</Title>
            <SearchInput
                type="text"
                placeholder="Pesquisar contatos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
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
