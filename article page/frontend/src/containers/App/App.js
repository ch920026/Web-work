import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Collapse,
  Card,
  CardBody
} from "reactstrap";

import {
  POSTS_QUERY,
  USERS_QUERY,
  CREATE_POST_MUTATION,
  POSTS_SUBSCRIPTION
} from "../../graphql";
import Post from "../../components/Post/Post";
import classes from "./App.module.css";

let unsubscribe = null;
let openArray = [];

class App extends Component {
  state = {
    formTitle: "",
    formBody: "",
    author: 1,
    collapse: []
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const { formTitle, formBody, author } = this.state;

    if (!formTitle || !formBody) return;

    this.createPost({
      variables: {
        title: formTitle,
        body: formBody,
        published: true,
        authorId: author
      }
    });

    this.setState({
      formTitle: "",
      formBody: ""
    });
  };

  open(e) {
    var post = document.getElementById("Post" + e.target.id);
    openArray[e.target.id - 1] = !openArray[e.target.id - 1];

    this.setState(state => ({ collapse: openArray }));
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className={classes.title}>Article Page</h1>
          </Col>
        </Row>
        <Row>
          <Col xs="6" className={classes.form}>
            <Mutation mutation={CREATE_POST_MUTATION}>
              {createPost => {
                this.createPost = createPost;

                return (
                  <Form onSubmit={this.handleFormSubmit}>
                    <FormGroup row>
                      <Label for="title" sm={2}>
                        Title
                      </Label>
                      <Col sm={10}>
                        <Input
                          name="title"
                          value={this.state.formTitle}
                          id="title"
                          placeholder="Post title..."
                          onChange={e =>
                            this.setState({ formTitle: e.target.value })
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Label for="body">Body</Label>
                      <Input
                        type="textarea"
                        name="body"
                        value={this.state.formBody}
                        id="body"
                        placeholder="Post body..."
                        onChange={e =>
                          this.setState({ formBody: e.target.value })
                        }
                      />
                    </FormGroup>
                    <Query query={USERS_QUERY}>
                      {({ loading, error, data, subscribeToMore }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(((</p>;

                        const users = data.users.map(item => (
                          <option id={item.id}>{item.name} </option>
                        ));

                        return (
                          <FormGroup>
                            <Label for="Author">Select Author</Label>
                            <Input
                              type="select"
                              name="select"
                              id="selectAuthor"
                              onChange={e => {
                                var selectID = e.target.selectedIndex;
                                var selectAuthor = document.getElementById(
                                  "selectAuthor"
                                ).options[selectID].id;
                                this.setState({ author: selectAuthor });
                              }}
                            >
                              {users}
                            </Input>
                          </FormGroup>
                        );
                      }}
                    </Query>

                    <Button type="submit" color="primary">
                      Post!
                    </Button>
                  </Form>
                );
              }}
            </Mutation>
          </Col>
          <Col xs="6">
            <div>
              <Query query={USERS_QUERY}>
                {({ loading, error, data, subscribeToMore }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error :(((</p>;

                  const users = data.users.map(item => (
                    <div>
                      <Query query={POSTS_QUERY}>
                        {({ loading, error, data, subscribeToMore }) => {
                          if (loading) return <p>Loading...</p>;
                          if (error) return <p>Error :(((</p>;
                          var select = data.posts.filter((post, id) => {
                            return post.author.name === item.name;
                          });

                          const list = select.map((post, id) => (
                            <Collapse
                              id={"Post" + item.id}
                              isOpen={this.state.collapse[item.id - 1]}
                            >
                              <Post data={post} key={id} />
                            </Collapse>
                          ));
                          const test = (
                            <div>
                              <Card
                                id={item.id}
                                onClick={this.open.bind(this)}
                                open={false}
                                style={{ marginBottom: "1rem" }}
                              >
                                {item.name}
                                {list.length}
                              </Card>
                              {list}
                            </div>
                          );

                          if (!unsubscribe) {
                            unsubscribe = subscribeToMore({
                              document: POSTS_SUBSCRIPTION,
                              updateQuery: (prev, { subscriptionData }) => {
                                if (!subscriptionData.data) {
                                  return prev;
                                }
                                const newPost = subscriptionData.data.post.data;
                                return {
                                  ...prev,
                                  posts: [newPost, ...prev.posts]
                                };
                              }
                            });
                          }

                          return <div>{test}</div>;
                        }}
                      </Query>
                    </div>
                  ));

                  return <FormGroup>{users}</FormGroup>;
                }}
              </Query>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
