const WP_Page = require("./types/wordpress/WP_Page");
const WP_MenuItem = require("./types/wordpress/WP_MenuItem");
const WpNovaPoshtaCity = require("./types/wordpress/WpNovaPoshtaCity");
const WpNovaPoshtaWarehouse = require("./types/wordpress/WpNovaPoshtaWarehouse");
const WP_PageFilter = require("./types/wordpress/inputs/WP_PageFilter");
const WC_Product = require("./types/woocommerce/types/WC_Product");
const WC_Category = require("./types/woocommerce/types/WC_Category");
const WpWcOrder = require("./types/woocommerce/types/WpWcOrder");
const WC_PaymentMethod = require("./types/woocommerce/types/WC_PaymentMethod");
const WC_ShippingMethod = require("./types/woocommerce/types/WC_ShippingMethod");
const WC_ProductParams = require("./types/woocommerce/inputs/WC_ProductParams");
const WC_ShippingMethodParams = require("./types/woocommerce/inputs/WC_ShippingMethodParams");
const WC_PaymentMethodParams = require("./types/woocommerce/inputs/WC_PaymentMethodParams");
const OrderDataInput = require("./types/woocommerce/inputs/OrderDataInput");
const WC_ProductCategoryParams = require("./types/woocommerce/inputs/WC_ProductCategoryParams");
const LanguagesEnum = require("./enums/LanguagesEnum");
const PublishStatusesEnum = require("./enums/PublishStatusesEnum");
const StockStatusesEnum = require("./enums/StockStatusesEnum");

const { gql } = require('apollo-server');
const WP_MenuItemFilter = require("./types/wordpress/inputs/WP_MenuItemFilter");
const NP_CitiesParams = require("./types/wordpress/inputs/NP_CitiesParams");
const NP_WarehousesParams = require("./types/wordpress/inputs/NP_WarehousesParams");

const typeDefs = gql`#graphql

    type Query {
        allWpPages(language: LanguagesEnum, filter: WP_PageFilter): [WP_Page!]!
        allWpPosts(language: LanguagesEnum, filter: WP_PageFilter): [WP_Page!]!
        allWpMenuItems(slug: String!, language: LanguagesEnum, filter: WP_MenuItemFilter): [WP_MenuItem!]!
        allWpWcOrders: [WpWcOrder!]! ###########
        allWpNovaPoshtaCities(params: NP_CitiesParams): [WpNovaPoshtaCity!]!
        allWpNovaPoshtaWarehouses(params: NP_WarehousesParams): [WpNovaPoshtaWarehouse!]!
        allWcProducts(params: WC_ProductParams): [WC_Product!]!
        allWcProductsCategories(params: WC_ProductCategoryParams): [WC_Category!]! ###########
        allWcShippingZonesMethods(zoneId: Int, language: LanguagesEnum, params: WC_ShippingMethodParams): [WC_ShippingMethod!]!
        allWcPaymentMethods(language: LanguagesEnum, params: WC_PaymentMethodParams): [WC_PaymentMethod!]!

        wpPage(pageId: Int!, language: LanguagesEnum): WP_Page!
        wpPost(postId: Int!, language: LanguagesEnum): WP_Page!
        wpWcOrder(productId: Int!): WpWcOrder! ###########
        wpWcProduct(productId: Int!, language: LanguagesEnum): WC_Product! ###########
    }

    type Mutation {
        wpWcCreateOrder(data: OrderDataInput!): WpWcOrder
    }
#############----------Types--------------####################
    ${WP_Page}
    ${WC_Product}
    ${WP_MenuItem}
    ${WC_Category}
    ${WpWcOrder}
    ${WpNovaPoshtaCity}
    ${WpNovaPoshtaWarehouse}
    ${WC_PaymentMethod}
    ${WC_ShippingMethod}
#############----------Inputs--------------####################
    ${WC_ProductParams}
    ${OrderDataInput}
    ${WC_ProductCategoryParams}
    ${WP_PageFilter}
    ${WP_MenuItemFilter}
    ${NP_CitiesParams}
    ${NP_WarehousesParams}
    ${WC_PaymentMethodParams}
    ${WC_ShippingMethodParams}
#############----------Enums--------------####################
    ${LanguagesEnum}
    ${PublishStatusesEnum}
    ${StockStatusesEnum}
`;

module.exports = typeDefs;
