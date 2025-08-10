import { useEffect, useState } from "react";
import axios from "axios";

export function useProductReviews(handle: string) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await axios.post(
        "https://teststoreanup.myshopify.com/api/2024-07/graphql.json",
        {
          query: `
            {
              product(handle: "${handle}") {
                metafield(namespace: "custom", key: "reviews") {
                  value
                }
              }
            }
          `,
        },
        {
          headers: {
            "X-Shopify-Storefront-Access-Token": "e0954128c13d4402edfe952cad5f41a0",
            "Content-Type": "application/json",
          },
        }
      );

      const json = res.data?.data?.product?.metafield?.value;
      if (json) setReviews(JSON.parse(json));
    };

    fetchReviews();
  }, [handle]);

  return reviews;
}