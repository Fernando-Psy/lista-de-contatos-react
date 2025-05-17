import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { deleteContact } from '../redux/contactsSlice';

const ContactCard = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
`;

const ContactInfo = styled.div`
    margin-bottom: 10px;
`;

const ContactName = styled.h3`
    margin: 0 0 5px 0;
    color: #2c3e50;
`;

const ContactDetail = styled.p`
    margin: 5px 0;
    color: #7f8c8d;
    display: flex;
    align-items: center;

    &:before {
        content: '${props => props.icon}';
        margin-right: 10px;
        color: #3498db;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 10px;
`;

const Button = styled.button`
    padding: 8px 12px;
    background-color: ${props => {
        if (props.edit) return '#3498db';
        if (props.delete) return '#e74c3c';
        return '#4caf50';
    }};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: ${props => {
            if (props.edit) return '#2980b9';
            if (props.delete) return '#c0392b';
            return '#388e3c';
        }};
    }
`;

const ContactItem = ({ contact, onEdit }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
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