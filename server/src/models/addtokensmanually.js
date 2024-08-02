const { configDataBase } = require('../config/configDataBase');
const { Token } = require('./Token');
const mongoose = require('mongoose');


const main = async () => {

    await configDataBase();

    await Token.create({
        name: "Stellar",
        description: "Stellar is a decentralized blockchain platform designed to facilitate fast, low-cost international payments. It enables the creation, exchange, and transfer of digital assets, making cross-border transactions more efficient and accessible.",
        articleContent: {
            introduction: "Stellar, launched in 2014 by Jed McCaleb and Joyce Kim, is a blockchain platform aimed at improving financial inclusion by making money transfers more efficient. The Stellar Development Foundation (SDF), a nonprofit organization, oversees the network's development and promotes its use to bridge the gap between financial systems.",
            definition: "Stellar (XLM) is the native cryptocurrency of the Stellar blockchain. It serves as an intermediary currency within the network, facilitating transactions between different fiat currencies. Stellar's primary purpose is to enable seamless, low-cost international payments and to support the creation and exchange of digital assets.",
            methodology: "Stellar operates using the Stellar Consensus Protocol (SCP), a unique consensus mechanism that allows for faster and more energy-efficient transaction validation compared to traditional proof-of-work systems. SCP uses a Federated Byzantine Agreement (FBA) model where nodes, known as \"quorum slices,\" rely on a subset of trusted nodes to reach consensus. This results in quick transaction confirmations, with the network capable of processing thousands of transactions per second. Stellar's design ensures that transactions are completed in a matter of seconds, with minimal fees, making it an attractive option for cross-border payments and remittances.",
            specialties: "Stellar's specialties lie in its focus on financial inclusion and its efficient transaction process. The network allows for the creation of digital assets representing any form of value, such as currencies or commodities, which can be traded on Stellar's decentralized exchange. Stellar's partnerships with organizations like IBM highlight its potential to revolutionize international payments by connecting financial institutions and enabling rapid, cost-effective transfers. The platform's energy efficiency, attributed to SCP, further sets it apart from other blockchain networks, making it a more sustainable option.",
            benefits: "Stellar offers several benefits, including fast and low-cost transactions, which are crucial for international payments and remittances. Its decentralized nature ensures security and reduces reliance on intermediaries, lowering transaction costs. The ability to create and trade digital assets on Stellar's platform enhances its versatility, allowing for various financial applications. Additionally, Stellar's focus on interoperability and partnerships with major corporations, like IBM, enhances its credibility and potential for widespread adoption. The network's low energy consumption compared to proof-of-work blockchains makes it an environmentally friendly choice.",
        },
    });
    console.log('success');
    process.exit(0);
};

const updateDB = async () => {

    await configDataBase();

    try {
        await Token.updateMany(
            { 'articleContent.comments': { $exists: false } },
            { $set: { 'articleContent.comments': [] } }
        );

        console.log('All documents updated successfully.');
    } catch (err) {
        console.error('Error updating documents:', err);
    } finally {
        mongoose.connection.close();
    }

};

main(); 