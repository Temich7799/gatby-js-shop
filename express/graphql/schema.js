const { buildSchema } = require('graphql');
const ShippingLine = require('./types/ShippingLine');
const WpWcOrderedProduct = require('./types/WpWcOrderedProduct');
const WpWcCustomer = require('./types/WpWcCustomer');
const WpWcOrder = require('./types/WpWcOrder');
const WpNovaPoshtaWarehouse = require('./types/WpNovaPoshtaWarehouse');
const WpNovaPoshtaCity = require('./types/WpNovaPoshtaCity');
const WpWcProduct = require('./types/WpWcProduct');

const schema = buildSchema(`

    type Query {
        allWpWcOrders: [WpWcOrder!]!
        allWpNovaPoshtaCities(language: Languages, regExp: String): [WpNovaPoshtaCity!]!
        allWpNovaPoshtaWarehouses(language: Languages, cityRef: String!, regExp: String): [WpNovaPoshtaWarehouse!]!
        allWpWcProducts: [WpWcProduct!]!

        wpWcOrder(id: Int!): WpWcOrder!
        wpWcProduct(id: Int!): WpWcProduct!
    }

    enum Languages {
        RU
        UA
    }

    ${WpWcProduct}
    ${ShippingLine}
    ${WpWcOrderedProduct}
    ${WpWcCustomer}
    ${WpWcOrder}
    ${WpNovaPoshtaCity}
    ${WpNovaPoshtaWarehouse}
`);

module.exports = schema;
