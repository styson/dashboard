import { Badge, Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { request } from "@octokit/request";
import { useLocation } from 'react-router-dom';
import React from "react";
import Seo from "../seo";

import requestDefaults from "../config/repo";
requestDefaults.headers.authorization = `token ${process.env.REACT_APP_API_TOKEN}`;

const requestWithAuth = request.defaults(requestDefaults);
let open = 0;
let closed = 0;

export default function Milestone() {
  const { state } = useLocation();

  const [issues, updateIssues] = React.useState([]);
  React.useEffect(function effectFunction() {
    async function getIssues() {
      // https://docs.github.com/en/rest/reference/issues#list-repository-issues
      const response = await requestWithAuth(
        "GET /repos/{owner}/{repo}/issues",
        { state: "all", sort: "state", direction: "asc", milestone: state.number, per_page: 100 }
      );
      // console.log(response.data)
      updateIssues(response.data);

      open = response.data.filter(_ => _.state === 'open').length;
      closed = response.data.filter(_ => _.state === 'closed').length;
    }

    getIssues();
  }, [state.number]);

  const [pulls, updatePulls] = React.useState([]);
  React.useEffect(function effectFunction() {
    async function getPulls() {
      // https://docs.github.com/en/rest/reference/pulls#list-pull-requests
      const response = await requestWithAuth(
        "GET /repos/{owner}/{repo}/pulls",
        { state: "all", sort: "created", direction: "desc", per_page: 100 }
      );
      // console.log(response.data)
      const pullrequests = response.data.filter(_ => _.milestone?.number === state.number);
      updatePulls(pullrequests);
    }

    getPulls();
  }, [state.number]);

  // const [files, updateFiles] = React.useState([]);
  // React.useEffect(function effectFunction() {
  //   async function getFiles() {
  //     pulls.forEach(function(pull) {
  //       // https://docs.github.com/en/rest/reference/pulls#list-pull-requests-files
  //       const response = await requestWithAuth(
  //         "GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
  //         { pull_number: pull.number }
  //       );

  //       pull.files = response.data;
  //       updateFiles(response.data);
  //     });
  //   }

  //   getFiles();
  // }, [pulls]);

  return (
    <Container className="mt-2">
      <Seo title="Dashboard" />
      <Row>
        <h3>Milestone {state.title} ({state.number})</h3>
        <p className="my-1 text-muted">{open} Open, {closed} Closed (includes PRs)</p>
      </Row>
      <Row className="">
        <Tabs defaultActiveKey="issues" id="uncontrolled-tab-example" className="mt-2">
          <Tab eventKey="issues" title="Issues">
            {issues.map((issue, i) => {
              if(pulls.find(_ => _.number === issue.number)) return <></>;
              const PR = pulls.find(_ => _.number === issue.number) ? 'PR' : '';
              return (
                <Col className="mt-2" md={6} key={i}>
                  <Card>
                    <Card.Body>
                      <Card.Title className="fs-5">
                        {issue.number} {PR}
                        <Badge
                          bg={issue.state==='open' ? "success" : "secondary"}
                          className="float-end"
                          pill
                          title={i+1}
                        >{issue.state}</Badge>
                      </Card.Title>
                      <Card.Subtitle className="my-2 text-muted">{issue.title}</Card.Subtitle>
                      <Card.Text>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Tab>
          <Tab eventKey="pulls" title="Pull Requests">
            {pulls.map((pull, i) => {
              console.log(pull)
              return (
                <Col className="mt-2" md={6} key={i}>
                  <Card>
                    <Card.Body>
                      <Card.Title className="fs-5">
                        {pull.number} {pull.title}
                        <Badge
                          bg={pull.state==='open' ? "success" : "secondary"}
                          className="float-end"
                          pill
                        >{pull.state}</Badge>
                      </Card.Title>
                      <Card.Subtitle className="my-2 text-muted"></Card.Subtitle>
                      <Card.Text>
                        <textarea disabled>{pull.body}</textarea>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
}
