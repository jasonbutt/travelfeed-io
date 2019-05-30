import Button from '@material-ui/core/Button';
import { indigo, teal } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { GET_USER_STATS } from '../../helpers/graphql/stats';
import HeaderCard from '../General/HeaderCard';
import RecentEarnings from './Stats/RecentEarningsChart';

class Wallet extends Component {
  render() {
    return (
      <Fragment>
        <Grid container spacing={0} justify="center" className="p-1">
          <Query query={GET_USER_STATS}>
            {({ data, loading, error }) => {
              if (loading || error || data.userstats === null) {
                return <Fragment />;
              }
              return (
                <Fragment>
                  <Grid item className="p-1" lg={6} md={6} sm={12} xs={12}>
                    <HeaderCard
                      title="Wallet"
                      background={indigo[600]}
                      content={
                        <Fragment>
                          <p>
                            You have earned{' '}
                            <strong>${data.userstats.total_payout}</strong> with
                            your TravelBlog so far.
                          </p>
                          <p>
                            For now, you need to use steemit wallet to transfer
                            and power up your earnings.
                          </p>
                          <a
                            href="https://steemitwallet.com/"
                            target="_blank"
                            rel="nofollow noreferrer noopener"
                          >
                            <Button variant="contained" color="secondary">
                              Go to steemit wallet
                            </Button>
                          </a>
                        </Fragment>
                      }
                    />
                  </Grid>
                  <Grid item className="p-1" lg={6} md={6} sm={12} xs={12}>
                    <HeaderCard
                      title="Monthly Earnings"
                      background={teal[600]}
                      content={
                        <RecentEarnings
                          color={teal[400]}
                          recent_payouts={data.userstats.recent_payouts}
                        />
                      }
                    />
                  </Grid>
                </Fragment>
              );
            }}
          </Query>
        </Grid>
      </Fragment>
    );
  }
}

export default Wallet;
