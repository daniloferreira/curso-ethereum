import React, { Component, useState } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';
function CampaignNew () {
   
    const [loading, setLoading] = useState(false);
    const [minimumContribuition, changeContribuition] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            setErrorMessage('');
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(minimumContribuition)
            .send({
                from: accounts[0]
            });
            Router.pushRoute('/');
        } catch(err) {
            setErrorMessage(err.message)
            setLoading(false);
        }
    }
    return (
        <Layout>
            <h1>New Campaign!</h1>
            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Minimum Contribuition</label>
                    <Input label="wei" labelPosition="right" value={minimumContribuition}
                    onChange={event => changeContribuition(event.target.value)}
                    ></Input>
                </Form.Field>
                <Message error header="Oops!" content={errorMessage}/>
                <Button loading={loading} primary>Create!</Button>
            </Form>
        </Layout>
    )

}

export default CampaignNew;