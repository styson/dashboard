import { Badge, Button, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { request } from "@octokit/request";
import BarChart from "./barChart";
import React from "react";
import requestDefaults from "../config/repo";

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

  function LinkToMilestone({ data }) {
    const navigate = useNavigate();
    function handleClick() {
      navigate('/milestone', { state: { title: data.title, number: data.number } });
    }

    return (
      <Button
        className="btn-sm btn-success float-end"
        onClick={handleClick}
      >
        Details
      </Button>
    );
  }

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
              <LinkToMilestone data={m} />
            </Card.Body>
          </Card>
        </Col>
      );
    })}
    </>
  );
}
