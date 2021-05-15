import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import { Link } from "../../routes";
import Layout from "../../components/Layout";
import CampaignBuilder from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = CampaignBuilder(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    return {
      address: props.query.address,
      minimimContribuition: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimimContribuition,
      requestsCount,
      approversCount,
    } = this.props;
    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can create requests to withdraw money",
        style: {
          overflowWrap: "break-word",
        },
      },
      {
        header: minimimContribuition,
        meta: "Minimum Contribuiotion (wei)",
        description: "You must contribute at least this much wei to",
        style: {
          overflowWrap: "break-word",
        },
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description: "A request tries to withdraw money from the ",
        style: {
          overflowWrap: "break-word",
        },
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description: "Number of people who have already donated to ",
        style: {
          overflowWrap: "break-word",
        },
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description: "How much money this campaign has left to spend",
        style: {
          overflowWrap: "break-word",
        },
      },
    ];
    return <Card.Group items={items}></Card.Group>;
  }
  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address}></ContributeForm>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
