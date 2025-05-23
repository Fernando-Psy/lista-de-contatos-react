import styled from 'styled-components';

export const FormContainer = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`

export const FormTitle = styled.h2`
    color: #2c3e50;
    margin-bottom: 20px;
`

export const InputGroup = styled.div`
    margin-bottom: 15px;
`

export const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
`

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;

    &:focus {
        border-color: #00c6aa;
        outline: none;
    }
`

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`

export interface ButtonProps {
    secondary?: boolean;
}

export const Button = styled.button<ButtonProps>`
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
`