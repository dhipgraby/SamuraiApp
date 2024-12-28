"use server";

import axios from "axios";

const base_domain = process.env.KRAKEN_API_URL;

interface ApiGetParams {
  endPointName: string;
  inputParameters?: any;
}

export async function queryPublicEndpoint({
  endPointName,
  inputParameters
}: ApiGetParams) {
  const apiEndpointFullURL = `${base_domain}/0/public/${endPointName}${
    inputParameters ? `?${inputParameters}` : ""
  }`;

  try {
    const res = await axios.get(apiEndpointFullURL);
    return res.data;
  } catch (error) {
    throw new Error(
      `QueryPublicEndpoint Error: ${{
        endPointName,
        apiEndpointFullURL,
        error
      }}`
    );
  }
}
