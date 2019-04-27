import React, { Component, Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import getImage from "../helpers/getImage";
import dateFromJsonString from "../helpers/dateFromJsonString";
import CardActions from "@material-ui/core/CardActions";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import { regExcerpt, regTitle, extractSWM } from "../utils/regex";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Create";
import ViewIcon from "@material-ui/icons/OpenInBrowser";
import PostEditor from "./PostEditor";
import parseBody from "../helpers/parseBody";
import SubHeader from "./Post/SubHeader";

class PostCard extends Component {
  state = { editor: false };
  openEditor() {
    this.setState({ editor: true });
  }
  closeEditor() {
    this.setState({ editor: false });
  }
  render() {
    let appIcon = <Fragment />;
    if (
      this.props.post.app &&
      this.props.post.app.split("/")[0] === "travelfeed"
    ) {
      appIcon = (
        <img
          width="25"
          className="mr-1"
          src="https://travelfeed.io/favicon.ico"
        />
      );
    }
    var content = (
      <div className="row">
        <div className="col-sm-4 p-0">
          <CardMedia
            className="h-100"
            style={{ minHeight: "150px" }}
            image={this.props.post.img_url}
          />
        </div>
        <div className="col-sm-8 pl-0">
          <CardContent>
            <div className="pr-2 pl-2 pb-2">
              <Typography gutterBottom variant="h5" component="h2">
                {appIcon}
                {this.props.post.title}
              </Typography>
              <Typography component="p">
                {this.props.post.excerpt} [...]
              </Typography>
            </div>
          </CardContent>
          <CardActions className="bg-dark">
            <span className="text-light pl-2">
              <Button
                color="inherit"
                className="p-0 pl-2 pr-2"
                onClick={() => this.openEditor()}
              >
                <span className="pr-1">Edit</span> <EditIcon />
              </Button>
            </span>
            <Link
              as={`/@${this.props.post.author}/${this.props.post.permlink}`}
              href={`/post?author=${this.props.post.author}&permlink=${
                this.props.post.permlink
              }`}
              passHref
            >
              <a className="text-light">
                <Button color="inherit" className="p-0 pr-2 pl-2">
                  <span className="pr-1">View</span> <ViewIcon />
                </Button>
              </a>
            </Link>
          </CardActions>
        </div>
      </div>
    );
    if (this.state.editor == true) {
      const extractswm = extractSWM(this.props.post.body);
      var swmextract = "";
      if (extractswm != null) {
        swmextract = " \n [//]:# (" + extractswm[0] + " d3scr)";
      }
      content = (
        <CardContent>
          <PostEditor
            initialValue={
              parseBody(this.props.post.body, { editor: true }) + swmextract
            }
            edit={{
              author: this.props.post.author,
              permlink: this.props.post.permlink,
              title: this.props.post.title,
              tags: this.props.post.tags
            }}
            mode="edit"
          />
          <span className="text-light pl-2">
            <Button
              color="primary"
              variant="outlined"
              className="p-0 pl-2 pr-2"
              onClick={() => this.closeEditor()}
            >
              <span className="pr-1">Close Editor</span>
            </Button>
          </span>
        </CardContent>
      );
    }
    return (
      <Fragment>
        <Card key={this.props.post.permlink} className="m-2">
          {content}
        </Card>
      </Fragment>
    );
  }
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  sanitized: PropTypes.string
};

export default PostCard;
