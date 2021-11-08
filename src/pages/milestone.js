import { Container, Row } from "react-bootstrap";
import Seo from "../seo";
import React from "react";

export default class Milestone extends React.Component {
  render() {
    // const { state } = this.props;      
    // console.log(this.props)
    return (
      <Container fluid className="mt-2">
        <Seo title="Dovetail Software" />
        <Row>
          <h3>Milestone {}</h3>
        </Row>
      </Container>
    );
  }
}
