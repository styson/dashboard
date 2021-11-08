import { Container, Row } from 'react-bootstrap';
import Seo from '../seo';
import Milestones from '../components/milestones'

export default function Home() {
  return (
    <Container fluid className="mt-2">
      <Seo title='Dovetail Software' />
      <Row>
        <h3>Milestones</h3>
      </Row>
      <Row>
        <Milestones />
      </Row>
    </Container>
  );
}
