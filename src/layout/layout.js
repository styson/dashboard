import React from "react";
import { Container } from 'react-bootstrap';
import Header from '../layout/header';

export default function Layout({ children }) {
  return (
    <Container fluid>
      <Header />
      {children}
    </Container>
  );
}
