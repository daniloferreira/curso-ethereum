import React, { Component } from 'react';
import {Form, Input, Button, Message} from 'semantic-ui-react';
import CampaignBuilder from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';
class ContributeForm extends Component {
    state = {
        value: '',
        errorMessage: '',
        loading: false
    }

    onSubmit = async (event) => {
        const campaign = CampaignBuilder(this.props.address);
        try {
            this.setState({loading: true, errorMessage: ''})
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });
            Router.replaceRoute(`/campaigns/${this.props.address}`);
            this.setState({loading: false})
        } catch(err) {
            this.setState({errorMessage: err.message});
        }
        this.setState({loading: false, value: ''});
    }
    render () {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribuite</label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({value: event.target.value})}
                        label="ether"
                        labelPosition="right"
                    />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage} ></Message>
                <Button primary loading={this.state.loading}>
                    Contribuite
                </Button>
            </Form>
        )
    }
}

export default ContributeForm;