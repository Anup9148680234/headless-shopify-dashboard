import axios from "axios";

const SHOPIFY_DOMAIN = "teststoreanup.myshopify.com";
const SHOPIFY_API_KEY = "e0954128c13d4402edfe952cad5f41a0";
const API_VERSION = "2024-07"; // You can change to latest available

const endpoint = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;

export async function fetchShopifyProducts() {
  const query = `
{
  products(first: 10) {
    edges {
      node {
        id
        title
        handle
        images(first: 1) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  }
}
`;

  const res = await axios.post(
    endpoint,
    { query },
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": SHOPIFY_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data.data.products.edges.map((edge: any) => {
    const node = edge.node;
    return {
      id: node.id,
      title: node.title,
      price: node.variants.edges[0]?.node?.price.amount ?? "0.00",
      image: node.images.edges[0]?.node?.url || node.images.edges[0]?.node?.src,
      variants: node.variants.edges.map((v: any) => ({
        id: v.node.id,
        title: v.node.title,
        price: v.node.price.amount,
        available: v.node.availableForSale,
        options: v.node.selectedOptions,
      })),
    };
  });
}
