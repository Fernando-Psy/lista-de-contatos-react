import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import { Button, ButtonGroup, ContactCard, ContactDetail, ContactInfo, ContactName } from './styles';
import { Contact } from '../../types/Contact';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ContactItemProps {
    contact: Contact;
    onEdit: (contact: Contact) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, onEdit }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (): void => {
        if (
            window.confirm(
                `Tem certeza que deseja excluir o contato ${contact.name}?`
            )
        ) {
            dispatch(deleteContact(contact.id));
        }
    };

    const handleEdit = (): void => {
        onEdit(contact);
        navigate('/editar');
    };

    return (
        <ContactCard data-cy="contact-item">
            <ContactInfo>
                <ContactName data-cy="contact-name">{contact.name}</ContactName>
                <ContactDetail data-cy="contact-email" icon="✉️">{contact.email}</ContactDetail>
                <ContactDetail data-cy="contact-phone" icon="📞">{contact.phone}</ContactDetail>
            </ContactInfo>
            <ButtonGroup>
                <Button data-cy="edit-button" edit onClick={handleEdit}>
                    ✏️ Editar
                </Button>
                <Button data-cy="delete-button" delete onClick={handleDelete}>
                    🗑️ Excluir
                </Button>
            </ButtonGroup>
        </ContactCard>
    );
};

export default ContactItem;