import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addContact, updateContact } from '../redux/contactsSlice';

const FormContainer = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const FormTitle = styled.h2`
    color: #2c3e50;
    margin-bottom: 20px;
`;

const InputGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;

    &:focus {
        border-color: #00c6aa;
        outline: none;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;

const Button = styled.button`
    padding: 10px 15px;
    background-color: ${props => props.secondary ? '#9e9e9e' : '#15ab92'};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: ${props => props.secondary ? '#757575' : '#00c6aa'};
    }
`;

const ContactForm = ({ contactToEdit, setContactToEdit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (contactToEdit) {
            setName(contactToEdit.name);
            setEmail(contactToEdit.email);
            setPhone(contactToEdit.phone);
            setIsEditing(true);
        }
    }, [contactToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !phone.trim()) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        const contactData = { name, email, phone };

        if (isEditing) {
            dispatch(updateContact({ id: contactToEdit.id, ...contactData }));
            setIsEditing(false);
            setContactToEdit(null);
        } else {
            dispatch(addContact(contactData));
        }

        setName('');
        setEmail('');
        setPhone('');
    };

    const handleCancel = () => {
        setName('');
        setEmail('');
        setPhone('');
        setIsEditing(false);
        setContactToEdit(null);
    };

    return (
        <FormContainer>
            <FormTitle>{isEditing ? 'Editar Contato' : 'Adicionar Novo Contato'}</FormTitle>
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Digite o nome completo"
                    />
                </InputGroup>
                <InputGroup>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite o e-mail"
                    />
                </InputGroup>
                <InputGroup>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Digite o telefone"
                    />
                </InputGroup>
                <ButtonGroup>
                    {isEditing && (
                        <Button type="button" secondary onClick={handleCancel}>
                            Cancelar
                        </Button>
                    )}
                    <Button type="submit">
                        {isEditing ? 'Atualizar' : 'Adicionar'}
                    </Button>
                </ButtonGroup>
            </Form>
        </FormContainer>
    );
};

export default ContactForm;
