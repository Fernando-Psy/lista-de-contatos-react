import { styled } from "styled-components";

export const ContactCard = styled.div`
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

export const ContactInfo = styled.div`
    margin-bottom: 10px;
`;

export const ContactName = styled.h3`
    margin: 0 0 5px 0;
    color: #2c3e50;
`;

export interface ContactDetailProps {
    icon: string;
}

export const ContactDetail = styled.p<ContactDetailProps>`
    margin: 5px 0;
    color: #7f8c8d;
    display: flex;
    align-items: center;

    &:before {
        content: '${(props) => props.icon}';
        margin-right: 10px;
        color: #3498db;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 10px;
`;

export interface ButtonProps {
    edit?: boolean;
    delete?: boolean;
}

export const Button = styled.button<ButtonProps>`
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