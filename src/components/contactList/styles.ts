import { styled } from "styled-components";

export const ListContainer = styled.div`
    margin-top: 20px;
`;

export const EmptyMessage = styled.div`
    text-align: center;
    color: #7f8c8d;
    margin: 40px 0;

    p {
        font-size: 1.1rem;
        margin-bottom: 10px;

        &:first-child {
            font-size: 1.3rem;
            color: #5a6c7d;
        }
    }
`;

export const Title = styled.h2`
    color: #2c3e50;
    margin-bottom: 20px;
    border-bottom: 2px solid #ecf0f1;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;

    &:before {
        content: '👥';
        font-size: 1.2em;
    }
`;

export const SearchInput = styled.input`
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 16px;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    &:focus {
        border-color: #3498db;
        outline: none;
        box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }

    &::placeholder {
        color: #95a5a6;
    }
`;

export const AddContactButton = styled.button`
    background-color: #15ab92;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    margin-top: 15px;
    transition: all 0.3s ease;

    &:hover {
        background-color: #00c6aa;
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(21, 171, 146, 0.3);
    }
`;