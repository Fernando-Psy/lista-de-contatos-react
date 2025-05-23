import * as React from 'react';
import { useState, useEffect, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, updateContact } from '../../redux/contactsSlice';
import { Contact } from '../../types';
import {
    FormContainer,
    FormTitle,
    Form,
    InputGroup,
    Label,
    Input,
    ButtonGroup,
    Button
} from './styles';



interface ContactFormProps {
    contactToEdit: Contact | null;
    setContactToEdit: (contact: Contact | null) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ contactToEdit, setContactToEdit }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (contactToEdit) {
            setName(contactToEdit.name);
            setEmail(contactToEdit.email);
            setPhone(contactToEdit.phone);
            setIsEditing(true);
        }
    }, [contactToEdit]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !phone.trim()) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        const contactData = { name, email, phone };

        if (isEditing && contactToEdit) {
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

    const handleCancel = (): void => {
        setName('');
        setEmail('');
        setPhone('');
        setIsEditing(false);
        setContactToEdit(null);
    };

    return (
        <FormContainer>
            <FormTitle>{isEditing ? 'Editar Contato' : 'Adicionar Contato'}</FormTitle>
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <Label htmlFor="name">Nome:</Label>
                    <Input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </InputGroup>
                <InputGroup>
                    <Label htmlFor="email">Email:</Label>
                    <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </InputGroup>
                <InputGroup>
                    <Label htmlFor="phone">Telefone:</Label>
                    <Input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </InputGroup>
                <ButtonGroup>
                    <Button type="submit">{isEditing ? 'Salvar' : 'Adicionar'}</Button>
                    {isEditing && (
                        <Button type="button" onClick={handleCancel}>
                            Cancelar
                        </Button>
                    )}
                </ButtonGroup>
            </Form>
        </FormContainer>
    );
};

export default ContactForm;
