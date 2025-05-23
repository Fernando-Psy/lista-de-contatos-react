import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavigationLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 20px;
  justify-content: center;
`;

const NavItem = styled.li``;

interface CustomNavLinkProps {
  $isActive: boolean;
}

const StyledNavLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== '$isActive',
})<CustomNavLinkProps>`
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 4px;
  color: ${props => props.$isActive ? 'white' : '#2c3e50'};
  background-color: ${props => props.$isActive ? '#15ab92' : 'transparent'};
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.$isActive ? '#00c6aa' : '#f8f9fa'};
    color: ${props => props.$isActive ? 'white' : '#15ab92'};
  }
`;

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <NavContainer>
      <NavigationLinks>
        <NavItem>
          <StyledNavLink to="/" $isActive={location.pathname === '/'}>
            📋 Lista de Contatos
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/adicionar" $isActive={location.pathname === '/adicionar'}>
            ➕ Adicionar Contato
          </StyledNavLink>
        </NavItem>
      </NavigationLinks>
    </NavContainer>
  );
};

export default Navigation;