import type { NextApiRequest, NextApiResponse } from "next";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

type Data =
  | {
      pageViews: number;
    }
  | {
      error: { message: string };
    };

const getPageViews = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const startDate = req.query.startDate || "2020-01-01";
  const slug = req.query.slug;

  try {
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      },
    });
    const [response] = await analyticsDataClient.runReport({
      property: `properties/351437362`,

      dateRanges: [
        {
          startDate: "2023-01-01",
          endDate: "today",
        },
      ],
      dimensions: [
        {
          name: "date",
        },
        {
          name: "pagePath",
        },
      ],
      metrics: [
        {
          name: "screenPageViews",
        },
      ],
      dimensionFilter: {
        filter: {
          fieldName: "pagePath",
          stringFilter: {
            matchType: "EXACT",
            value: slug.toString(),
          },
        },
      },
      orderBys: [
        {
          dimension: {
            dimensionName: "date",
          },
        },
      ],
    });

    let total = response.rows.reduce((prev, curr) => {
      return prev + parseInt(curr.metricValues[0].value, 0);
    }, 0);

    res.status(200).json({
      pageViews: total,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default getPageViews;
