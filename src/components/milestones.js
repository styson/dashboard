import { LinkContainer } from "react-router-bootstrap";
import { Badge, Button, Card, Col } from "react-bootstrap";
import { request } from "@octokit/request";
import requestDefaults from "../config/repo";
import React from "react";
import BarChart from "./barChart";

requestDefaults.headers.authorization = `token ${process.env.REACT_APP_API_TOKEN}`;

const requestWithAuth = request.defaults(requestDefaults);

export default function Milestones() {
  const [milestones, updateMilestones] = React.useState([]);

  React.useEffect(function effectFunction() {
    async function getMilestones() {
      // https://docs.github.com/en/rest/reference/issues#list-milestones
      const response = await requestWithAuth(
        "GET /repos/{owner}/{repo}/milestones",
        { state: "open", sort: "completeness", direction: "desc" }
      );
      // console.log(response.data)
      updateMilestones(response.data);
    }
    getMilestones();
  }, []);

  return (
    <>
    {milestones.map((m, i) => {
      const data = [
        {
          'title': 'Issues & PRs',
          'open': m.open_issues,
          'closed': m.closed_issues,
        }
      ];

      return (
        <Col className="mt-2" lg={3} md={4} sm={6} key={i}>
          <Card>
            <Card.Body>
              <Card.Title title={m.number}>
                {m.title}
                <Badge
                  bg="success"
                  className="float-end d-none"
                >{m.state}</Badge>
              </Card.Title>
              <Card.Subtitle className="my-2 text-muted">{m.open_issues} Open, {m.closed_issues} Closed</Card.Subtitle>
              <Card.Text>
                {m.description}
              </Card.Text>
              <BarChart data={data} />
              <LinkContainer
                key={i}
                to={{
                  pathname: "/milestone",
                  state: [{
                    number: m.number,
                    title: m.title,
                  }],
                }}
              >
                <Button className="btn-sm btn-success float-end">Details</Button>
              </LinkContainer>
            </Card.Body>
          </Card>
        </Col>
      );
    })}
    </>
  );
}
