const SHOPIFY_DOMAIN = "teststoreanup.myshopify.com";
const API_VERSION = "2024-01";
const SHOPIFY_API_KEY = "e0954128c13d4402edfe952cad5f41a0";
async function shopifyFetch(query: string, variables?: any) {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_API_KEY,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error("Shopify API errors:", json.errors);
    throw new Error("Shopify API error");
  }

  return json.data;
}

// Create a new cart
export async function createCart() {
  const query = `
    mutation {
      cartCreate {
        cart {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch(query);
  if (data.cartCreate.userErrors.length > 0) {
    console.error("cartCreate errors:", data.cartCreate.userErrors);
    throw new Error("Failed to create cart");
  }

  return data.cartCreate.cart.id; // Cart ID (gid)
}

// Add line items to cart
export async function addLinesToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]) {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = { cartId, lines };

  const data = await shopifyFetch(query, variables);
  if (data.cartLinesAdd.userErrors.length > 0) {
    console.error("cartLinesAdd errors:", data.cartLinesAdd.userErrors);
    throw new Error("Failed to add lines to cart");
  }

  return data.cartLinesAdd.cart;
}

// Submit cart for checkout and get checkout URL
export async function submitCartForCheckout(cartId: string) {
  const query = `
    mutation cartSubmitForCompletion($cartId: ID!) {
      cartSubmitForCompletion(cartId: $cartId) {
        result {
          ... on CartCheckoutUrl {
            checkoutUrl
          }
          ... on CartUserError {
            code
            message
          }
        }
      }
    }
  `;

  const variables = { cartId };

  const data = await shopifyFetch(query, variables);
  const result = data.cartSubmitForCompletion.result;

  if ("checkoutUrl" in result) {
    return result.checkoutUrl;
  } else {
    console.error("cartSubmitForCompletion error:", result);
    throw new Error(result.message || "Failed to submit cart for checkout");
  }
}