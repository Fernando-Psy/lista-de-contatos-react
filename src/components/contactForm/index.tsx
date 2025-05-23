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
import { useNavigate, useLocation } from 'react-router-dom';



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
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (contactToEdit && location.pathname === '/editar') {
            setName(contactToEdit.name);
            setEmail(contactToEdit.email);
            setPhone(contactToEdit.phone);
            setIsEditing(true);
        } else if (location.pathname === '/adicionar') {
            setName('');
            setEmail('');
            setPhone('');
            setIsEditing(false);
        }
    }, [contactToEdit, location.pathname]);

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
        navigate('/');
    };

    const handleCancel = (): void => {
        setName('');
        setEmail('');
        setPhone('');
        setIsEditing(false);
        setContactToEdit(null);
        navigate('/');
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
                        placeholder='Digite o nome completo'
                    />
                </InputGroup>
                <InputGroup>
                    <Label htmlFor="email">Email:</Label>
                    <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Digite o email'
                    />
                </InputGroup>
                <InputGroup>
                    <Label htmlFor="phone">Telefone:</Label>
                    <Input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder='Digite o telefone'
                    />
                </InputGroup>
                <ButtonGroup>
                    <Button type="submit">{isEditing ? 'Salvar' : 'Adicionar'}</Button>
                    <Button type="button" onClick={handleCancel} secondary>Cancelar</Button>
                </ButtonGroup>
            </Form>
        </FormContainer>
    );
};

export default ContactForm;
