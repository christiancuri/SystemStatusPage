import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Badge,
  Accordion
} from "react-bootstrap";
import Header from "../../components/Header";
import APIService from "../../services/APIService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import LineChart from "../../components/LineChart";

const MODULES_LIST = [
  `system`,
  `chat`,
  `workspace`,
  `profile-file`,
  `profile-card`,
  `dashboard`,
  `user`,
  `user-profile`,
  `vault`,
  `contact`,
  `calendar`,
  `communication`,
  `task`
];

export default class Status extends Component {
  state = {
    modules: []
  };

  async componentWillMount() {
    MODULES_LIST.map(item => {
      return APIService.getUptime(item, 10).then(data => {
        this.setState({
          modules: [
            ...this.state.modules,
            {
              name: item,
              uptime:
                (data.uptime === "100.00"
                  ? `${Number(data.uptime)}`
                  : data.uptime) + `%`,
              history: data.docs,
              isAlive: data.docs[0].isAlive
            }
          ]
        });
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <Container fluid={true}>
          <Row>
            <Col lg={{ span: 6, offset: 3 }}>
              <Header />
            </Col>
          </Row>
          <Row>
            <Col lg={{ span: 6, offset: 3 }}>
              <Card>
                <Card.Body>
                  <Card>
                    <ListGroup variant='flush'>
                      {this.state.modules.map(item => (
                        <ListGroup.Item key={item.name}>
                          smash-service-{item.name}
                          <span style={{ float: "right" }}>
                            <h6
                              style={{ color: item.isAlive ? "green" : "red" }}
                            >
                              {item.isAlive ? "Operational" : "Down"}
                            </h6>
                          </span>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={{ span: 6, offset: 3 }}>
              <Card>
                <Card.Body>
                  <Accordion defaultActiveKey={0}>
                    {this.state.modules.map(item => (
                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey={item.name}>
                          smash-service-{item.name}
                          <Badge
                            variant={item.isAlive ? "success" : "danger"}
                            style={{
                              fontSize: "9px",
                              marginTop: "-5px",
                              float: "right"
                            }}
                          >
                            {item.uptime} Uptime
                          </Badge>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={item.name}>
                          <Card.Body>
                            <LineChart
                              options={{
                                chart: {
                                  animations: {
                                    enabled: true,
                                    easing: "linear",
                                    dynamicAnimation: {
                                      speed: 1000
                                    }
                                  },
                                  zoom: {
                                    enabled: false
                                  }
                                },
                                dataLabels: {
                                  enabled: false
                                },
                                stroke: {
                                  curve: "straight"
                                },
                                title: {
                                  text: "Metrics",
                                  align: "left"
                                },
                                grid: {
                                  row: {
                                    colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                                    opacity: 0.5
                                  }
                                },
                                xaxis: {
                                  categories: item.history.map(
                                    it => it.createdAt
                                  ),
                                  title: {
                                    text: "Date"
                                  }
                                },
                                yaxis: {
                                  title: {
                                    text: "Time in ms"
                                  }
                                }
                              }}
                              series={[
                                {
                                  name: "Ping",
                                  data: item.history.map(it => it.duration)
                                }
                              ]}
                            />
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    ))}
                  </Accordion>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
