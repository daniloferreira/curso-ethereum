import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xc6CDFb18e478A99635c9e45bfCc6DB09C2427bFA'
);

export default instance;