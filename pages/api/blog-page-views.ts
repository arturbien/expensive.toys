import type { NextApiRequest, NextApiResponse } from "next";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

type Data =
  | {
      data: any;
    }
  | {
      error: { message: string };
    };

const getBlogPageViews = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
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
      metrics: [
        {
          name: "screenPageViews",
        },
      ],
      dimensions: [
        {
          name: "pagePath",
        },
      ],
      dimensionFilter: {
        filter: {
          fieldName: "pagePath",
          stringFilter: {
            matchType: "BEGINS_WITH",
            value: "/blog/",
          },
        },
      },
    });

    const pageViews = response.rows.reduce((acc, row, index) => {
      const slug = row.dimensionValues[0].value.replace("/blog/", "");
      const pageViews = parseInt(row.metricValues[0].value);
      if (slug in acc) {
        acc[slug] += pageViews;
        return acc;
      } else {
        acc[slug] = pageViews;
      }

      return acc;
    }, {});

    res.status(200).json({
      data: pageViews,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default getBlogPageViews;
