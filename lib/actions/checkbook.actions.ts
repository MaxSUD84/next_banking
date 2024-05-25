"use server";

import sdk from '@api/checkbook-docs';

const {
  CHECKBOOK_KEY: api_key,
  CHECKBOOK_SECRET: api_secret,
  CHECKBOOK_BASE_URL: api_base_url,
} = process.env

sdk.server(api_base_url as string);
// Authorization: YOUR_SANDBOX_API_KEY:YOUR_SANDBOX_SECRET_KEY

export const createCheckbookCustomer = async (
  newCustomer: Pick <SignUpParams, 'firstName' | 'lastName' | 'email'>
) => {
  try {
    sdk.auth(`${api_key}:${api_secret}`);
    sdk.postUser({
      name: `${newCustomer.firstName}_${newCustomer.lastName}`,
      user_id: newCustomer.email
    })
    .then(({ data }) => {
      console.log(data)
      return data })
    // .catch(err => console.error("Creating a Checkbook Customer Failed: ", err));
    } catch (err) {
      console.error("Creating a Checkbook Customer Failed: ", err);
    }
};

export const connectToBankPlaid = async (
  plaidToken: string // Plaid Account Processor Token
) => {
  sdk.auth(`${api_key}:${api_secret}`);
  sdk.postBankPlaid({
    processor_token: plaidToken
  })
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
}


// Create a Dwolla Funding Source using a Plaid Processor Token
export const addFundingSource = async ({
  dwollaCustomerId,
  processorToken,
  bankName,
}: AddFundingSourceParams) => {
  try {
    // create dwolla auth link
    const dwollaAuthLinks = await createOnDemandAuthorization();

    // add funding source to the dwolla customer & get the funding source url
    const fundingSourceOptions = {
      customerId: dwollaCustomerId,
      fundingSourceName: bankName,
      plaidToken: processorToken,
      _links: dwollaAuthLinks,
    };
    return await createFundingSource(fundingSourceOptions);
  } catch (err) {
    console.error("Transfer fund failed: ", err);
  }
};


export const createTransfer = async ({
  sourceFundingSourceUrl,
  destinationFundingSourceUrl,
  amount,
}: TransferParams) => {
  try {
    const requestBody = {
      _links: {
        source: {
          href: sourceFundingSourceUrl,
        },
        destination: {
          href: destinationFundingSourceUrl,
        },
      },
      amount: {
        currency: "USD",
        value: amount,
      },
    };
    return await dwollaClient
      .post("transfers", requestBody)
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Transfer fund failed: ", err);
  }
};

