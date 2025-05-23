import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import { Button, ButtonGroup, ContactCard, ContactDetail, ContactInfo, ContactName } from './styles';
import { Contact } from '../../types/Contact';
import React from 'react';


interface ContactItemProps {
    contact: Contact;
    onEdit: (contact: Contact) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, onEdit }) => {
    const dispatch = useDispatch();

    const handleDelete = (): void => {
        if (
            window.confirm(
                `Tem certeza que deseja excluir o contato ${contact.name}?`
            )
        ) {
            dispatch(deleteContact(contact.id));
        }
    };

    return (
        <ContactCard>
            <ContactInfo>
                <ContactName>{contact.name}</ContactName>
                <ContactDetail icon="✉️">{contact.email}</ContactDetail>
                <ContactDetail icon="📞">{contact.phone}</ContactDetail>
            </ContactInfo>
            <ButtonGroup>
                <Button edit onClick={() => onEdit(contact)}>
                    Editar
                </Button>
                <Button delete onClick={handleDelete}>
                    Excluir
                </Button>
            </ButtonGroup>
        </ContactCard>
    );
};

export default ContactItem;