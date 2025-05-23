import { styled } from "styled-components";

export const ListContainer = styled.div`
    margin-top: 20px;
`;

export const EmptyMessage = styled.p`
    text-align: center;
    color: #7f8c8d;
    font-style: italic;
    margin: 40px 0;
`;

export const Title = styled.h2`
    color: #2c3e50;
    margin-bottom: 20px;
    border-bottom: 2px solid #ecf0f1;
    padding-bottom: 10px;
`;

export const SearchInput = styled.input`
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