import "@babel/polyfill";
import React, { Component } from "react";
import Layout from "../components/Layout.js";
import isBlacklisted from "../helpers/isBlacklisted";
import { Client } from "dsteem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import PostGrid from "../components/PostGrid";

const client = new Client("https://api.steemit.com");

class Blog extends Component {
  static async getInitialProps(props) {
    let { author } = props.query;
    if (isBlacklisted(author, "none") === true) {
      const stream = { args: { stream: { blacklisted: true } } };
      return stream;
    }
    const args = { tag: author, limit: 24 };
    try {
      const stream = await client.database.getDiscussions("blog", args);
      return { args: { author: author, stream: stream } };
    } catch {
      const stream = { args: { stream: { notfound: true } } };
      return stream;
    }
  }
  render() {
    if (typeof this.props.args.stream.notfound !== "undefined") {
      return (
        <Layout>
          <Grid container spacing={16} alignItems="center" justify="center">
            <Grid item lg={7} md={8} sm={11} xs={12}>
              <Card>
                <CardContent>
                  <Typography>This author is not a valid account.</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Layout>
      );
    } else if (typeof this.props.args.stream.blacklisted !== "undefined") {
      return (
        <Layout>
          <Grid container spacing={16} alignItems="center" justify="center">
            <Grid item lg={7} md={8} sm={11} xs={12}>
              <Card>
                <CardContent>
                  <Typography>
                    This author is blacklisted from TravelFeed.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Layout>
      );
    } else {
      return (
        <Layout>
          <PostGrid
            stream={this.props.args.stream}
            type="blog"
            filter={this.props.args.author}
          />
        </Layout>
      );
    }
  }
}

Blog.propTypes = {
  args: PropTypes.array
};

export default Blog;