import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'checkbook-docs/3.0.0 (api/6.1.1)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Get the bank accounts for a user
   *
   * @summary Get bank accounts
   */
  getBanks(): Promise<FetchResponse<200, types.GetBanksResponse200> | FetchResponse<number, types.GetBanksResponseDefault>> {
    return this.core.fetch('/v3/account/bank', 'get');
  }

  /**
   * Add a new bank account
   *
   * @summary Add bank account
   */
  postBank(body: types.PostBankBodyParam): Promise<FetchResponse<201, types.PostBankResponse201> | FetchResponse<number, types.PostBankResponseDefault>> {
    return this.core.fetch('/v3/account/bank', 'post', body);
  }

  /**
   * Add a new bank account with instant account verification
   *
   * @summary Add bank account with IAV
   */
  postBankIav(body: types.PostBankIavBodyParam): Promise<FetchResponse<201, types.PostBankIavResponse201> | FetchResponse<number, types.PostBankIavResponseDefault>> {
    return this.core.fetch('/v3/account/bank/iav', 'post', body);
  }

  /**
   * Retrieve the bank account(s) associated with the Plaid token
   *
   * @summary Add bank account with Plaid
   */
  postBankPlaid(body: types.PostBankPlaidBodyParam): Promise<FetchResponse<201, types.PostBankPlaidResponse201> | FetchResponse<number, types.PostBankPlaidResponseDefault>> {
    return this.core.fetch('/v3/account/bank/iav/plaid', 'post', body);
  }

  /**
   * Return a list of our supported institutions for instant account verification
   *
   * @summary Get institutions
   */
  getBankInstitutions(): Promise<FetchResponse<200, types.GetBankInstitutionsResponse200> | FetchResponse<number, types.GetBankInstitutionsResponseDefault>> {
    return this.core.fetch('/v3/account/bank/institutions', 'get');
  }

  /**
   * Release the micro-deposits for a bank account
   *
   * @summary Release micro-deposits
   */
  postBankRelease(body: types.PostBankReleaseBodyParam): Promise<FetchResponse<number, types.PostBankReleaseResponseDefault>> {
    return this.core.fetch('/v3/account/bank/release', 'post', body);
  }

  /**
   * Verify the micro-deposits for a bank account
   *
   * @summary Verify micro-deposits
   */
  postBankVerify(body: types.PostBankVerifyBodyParam): Promise<FetchResponse<number, types.PostBankVerifyResponseDefault>> {
    return this.core.fetch('/v3/account/bank/verify', 'post', body);
  }

  /**
   * Remove the specified bank account
   *
   * @summary Remove bank account
   */
  deleteBank(metadata: types.DeleteBankMetadataParam): Promise<FetchResponse<number, types.DeleteBankResponseDefault>> {
    return this.core.fetch('/v3/account/bank/{bank_id}', 'delete', metadata);
  }

  /**
   * Update an existing bank account
   *
   * @summary Update bank account
   */
  putBank(body: types.PutBankBodyParam, metadata: types.PutBankMetadataParam): Promise<FetchResponse<number, types.PutBankResponseDefault>> {
    return this.core.fetch('/v3/account/bank/{bank_id}', 'put', body, metadata);
  }

  /**
   * Return the cards
   *
   * @summary Get cards
   */
  getCards(): Promise<FetchResponse<200, types.GetCardsResponse200> | FetchResponse<number, types.GetCardsResponseDefault>> {
    return this.core.fetch('/v3/account/card', 'get');
  }

  /**
   * Add a new card
   *
   * @summary Add card
   */
  postCard(body: types.PostCardBodyParam): Promise<FetchResponse<201, types.PostCardResponse201> | FetchResponse<number, types.PostCardResponseDefault>> {
    return this.core.fetch('/v3/account/card', 'post', body);
  }

  /**
   * Remove the specified card
   *
   * @summary Remove card
   */
  deleteCard(metadata: types.DeleteCardMetadataParam): Promise<FetchResponse<number, types.DeleteCardResponseDefault>> {
    return this.core.fetch('/v3/account/card/{card_id}', 'delete', metadata);
  }

  /**
   * Update the specified card
   *
   * @summary Update card
   */
  putCard(body: types.PutCardBodyParam, metadata: types.PutCardMetadataParam): Promise<FetchResponse<number, types.PutCardResponseDefault>> {
    return this.core.fetch('/v3/account/card/{card_id}', 'put', body, metadata);
  }

  /**
   * Return the Paypal accounts of a user
   *
   * @summary Get PayPal accounts
   */
  get_paypal(): Promise<FetchResponse<200, types.GetPaypalResponse200> | FetchResponse<number, types.GetPaypalResponseDefault>> {
    return this.core.fetch('/v3/account/paypal', 'get');
  }

  /**
   * Add a new Paypal account for a user
   *
   * @summary Create PayPal account
   */
  add_paypal(body: types.AddPaypalBodyParam): Promise<FetchResponse<201, types.AddPaypalResponse201> | FetchResponse<number, types.AddPaypalResponseDefault>> {
    return this.core.fetch('/v3/account/paypal', 'post', body);
  }

  /**
   * Remove an existing PayPal account
   *
   * @summary Remove PayPal account
   */
  remove_paypal(metadata: types.RemovePaypalMetadataParam): Promise<FetchResponse<number, types.RemovePaypalResponseDefault>> {
    return this.core.fetch('/v3/account/paypal/{paypal_id}', 'delete', metadata);
  }

  /**
   * Update an existing Paypal account
   *
   * @summary Update PayPal account
   */
  put_paypal(body: types.PutPaypalBodyParam, metadata: types.PutPaypalMetadataParam): Promise<FetchResponse<number, types.PutPaypalResponseDefault>> {
    return this.core.fetch('/v3/account/paypal/{paypal_id}', 'put', body, metadata);
  }

  /**
   * Return the virtual cards
   *
   * @summary Get virtual cards
   */
  getVccs(): Promise<FetchResponse<200, types.GetVccsResponse200> | FetchResponse<number, types.GetVccsResponseDefault>> {
    return this.core.fetch('/v3/account/vcc', 'get');
  }

  /**
   * Add a new vcc
   *
   * @summary Create virtual card
   */
  postVcc(body: types.PostVccBodyParam): Promise<FetchResponse<201, types.PostVccResponse201> | FetchResponse<number, types.PostVccResponseDefault>> {
    return this.core.fetch('/v3/account/vcc', 'post', body);
  }

  /**
   * Remove the specified vcc
   *
   * @summary Remove virtual card
   */
  deleteVcc(metadata: types.DeleteVccMetadataParam): Promise<FetchResponse<number, types.DeleteVccResponseDefault>> {
    return this.core.fetch('/v3/account/vcc/{vcc_id}', 'delete', metadata);
  }

  /**
   * Update the specified vcc
   *
   * @summary Update virtual card
   */
  putVcc(body: types.PutVccBodyParam, metadata: types.PutVccMetadataParam): Promise<FetchResponse<number, types.PutVccResponseDefault>> {
    return this.core.fetch('/v3/account/vcc/{vcc_id}', 'put', body, metadata);
  }

  /**
   * Get the transactions for the specified VCC
   *
   * @summary Get virtual card transactions
   */
  getVccTransaction(metadata: types.GetVccTransactionMetadataParam): Promise<FetchResponse<200, types.GetVccTransactionResponse200> | FetchResponse<number, types.GetVccTransactionResponseDefault>> {
    return this.core.fetch('/v3/account/vcc/{vcc_id}/transaction', 'get', metadata);
  }

  /**
   * Return the Venmo accounts of a user
   *
   * @summary Get Venmo accounts
   */
  get_venmo(): Promise<FetchResponse<200, types.GetVenmoResponse200> | FetchResponse<number, types.GetVenmoResponseDefault>> {
    return this.core.fetch('/v3/account/venmo', 'get');
  }

  /**
   * Add a new Venmo account for a user
   *
   * @summary Create Venmo account
   */
  add_venmo(body: types.AddVenmoBodyParam): Promise<FetchResponse<201, types.AddVenmoResponse201> | FetchResponse<number, types.AddVenmoResponseDefault>> {
    return this.core.fetch('/v3/account/venmo', 'post', body);
  }

  /**
   * Remove an existing Venmo account
   *
   * @summary Remove Venmo account
   */
  remove_venmo(metadata: types.RemoveVenmoMetadataParam): Promise<FetchResponse<number, types.RemoveVenmoResponseDefault>> {
    return this.core.fetch('/v3/account/venmo/{venmo_id}', 'delete', metadata);
  }

  /**
   * Update an existing Venmo account
   *
   * @summary Update Venmo account
   */
  put_venmo(body: types.PutVenmoBodyParam, metadata: types.PutVenmoMetadataParam): Promise<FetchResponse<number, types.PutVenmoResponseDefault>> {
    return this.core.fetch('/v3/account/venmo/{venmo_id}', 'put', body, metadata);
  }

  /**
   * Add a new wallet account for user
   *
   * @summary Create wallet
   */
  add_wallet(body: types.AddWalletBodyParam): Promise<FetchResponse<201, types.AddWalletResponse201> | FetchResponse<number, types.AddWalletResponseDefault>> {
    return this.core.fetch('/v3/account/wallet', 'post', body);
  }

  /**
   * Return the zelle accounts
   *
   * @summary Get Zelle accounts
   */
  get_zelle(): Promise<FetchResponse<200, types.GetZelleResponse200> | FetchResponse<number, types.GetZelleResponseDefault>> {
    return this.core.fetch('/v3/account/zelle', 'get');
  }

  /**
   * Create a new zelle account
   *
   * @summary Create Zelle account
   */
  add_zelle(body: types.AddZelleBodyParam): Promise<FetchResponse<201, types.AddZelleResponse201> | FetchResponse<number, types.AddZelleResponseDefault>> {
    return this.core.fetch('/v3/account/zelle', 'post', body);
  }

  /**
   * Update an existing zelle account
   *
   * @summary Update Zelle account
   */
  put_zelle(body: types.PutZelleBodyParam, metadata: types.PutZelleMetadataParam): Promise<FetchResponse<number, types.PutZelleResponseDefault>> {
    return this.core.fetch('/v3/account/zelle/{account_id}', 'put', body, metadata);
  }

  /**
   * Remove an existing Zelle account
   *
   * @summary Remove Zelle account
   */
  remove_zelle(metadata: types.RemoveZelleMetadataParam): Promise<FetchResponse<number, types.RemoveZelleResponseDefault>> {
    return this.core.fetch('/v3/account/zelle/{zelle_id}', 'delete', metadata);
  }

  /**
   * Return approvals
   *
   * @summary Get approval payments
   */
  getApprovalChecks(metadata?: types.GetApprovalChecksMetadataParam): Promise<FetchResponse<200, types.GetApprovalChecksResponse200> | FetchResponse<number, types.GetApprovalChecksResponseDefault>> {
    return this.core.fetch('/v3/approval', 'get', metadata);
  }

  /**
   * Create a new approval digital payment
   *
   * @summary Create approval digital payment
   */
  postApprovalDigital(body: types.PostApprovalDigitalBodyParam): Promise<FetchResponse<201, types.PostApprovalDigitalResponse201> | FetchResponse<number, types.PostApprovalDigitalResponseDefault>> {
    return this.core.fetch('/v3/approval/digital', 'post', body);
  }

  /**
   * Create a new multi-party payment approval
   *
   * @summary Create multi-party payment approval
   */
  postApprovalMulti(body: types.PostApprovalMultiBodyParam): Promise<FetchResponse<201, types.PostApprovalMultiResponse201> | FetchResponse<number, types.PostApprovalMultiResponseDefault>> {
    return this.core.fetch('/v3/approval/multi', 'post', body);
  }

  /**
   * Create a new physical check approval
   *
   * @summary Create physical check approval
   */
  postApprovalPhysical(body: types.PostApprovalPhysicalBodyParam): Promise<FetchResponse<201, types.PostApprovalPhysicalResponse201> | FetchResponse<number, types.PostApprovalPhysicalResponseDefault>> {
    return this.core.fetch('/v3/approval/physical', 'post', body);
  }

  /**
   * Create a live payment from an approval
   *
   * @summary Approve payment
   */
  postApprovalRelease(body: types.PostApprovalReleaseBodyParam): Promise<FetchResponse<200, types.PostApprovalReleaseResponse200> | FetchResponse<number, types.PostApprovalReleaseResponseDefault>> {
    return this.core.fetch('/v3/approval/release', 'post', body);
  }

  /**
   * Cancel the specified check approval
   *
   * @summary Remove payment approval
   */
  deleteApprovalCheck(metadata: types.DeleteApprovalCheckMetadataParam): Promise<FetchResponse<number, types.DeleteApprovalCheckResponseDefault>> {
    return this.core.fetch('/v3/approval/{lockbox_id}', 'delete', metadata);
  }

  /**
   * Get the specified payment approval
   *
   * @summary Get payment approval
   */
  getApprovalCheck(metadata: types.GetApprovalCheckMetadataParam): Promise<FetchResponse<200, types.GetApprovalCheckResponse200> | FetchResponse<number, types.GetApprovalCheckResponseDefault>> {
    return this.core.fetch('/v3/approval/{lockbox_id}', 'get', metadata);
  }

  /**
   * Update the specified paynent approval
   *
   * @summary Update payment approval
   */
  putApprovalCheck(body: types.PutApprovalCheckBodyParam, metadata: types.PutApprovalCheckMetadataParam): Promise<FetchResponse<number, types.PutApprovalCheckResponseDefault>> {
    return this.core.fetch('/v3/approval/{lockbox_id}', 'put', body, metadata);
  }

  /**
   * Get the attachment for a payment approval
   *
   * @summary Get attachment for payment approval
   */
  getApprovalAttachment(metadata: types.GetApprovalAttachmentMetadataParam): Promise<FetchResponse<number, types.GetApprovalAttachmentResponseDefault>> {
    return this.core.fetch('/v3/approval/{lockbox_id}/attachment', 'get', metadata);
  }

  /**
   * Return the sent/received payments
   *
   * @summary Get sent/received payments
   */
  getChecks(metadata?: types.GetChecksMetadataParam): Promise<FetchResponse<200, types.GetChecksResponse200> | FetchResponse<number, types.GetChecksResponseDefault>> {
    return this.core.fetch('/v3/check', 'get', metadata);
  }

  /**
   * Deposit a payment
   *
   * @summary Deposit a payment
   */
  postCheckDeposit(body: types.PostCheckDepositBodyParam, metadata: types.PostCheckDepositMetadataParam): Promise<FetchResponse<201, types.PostCheckDepositResponse201> | FetchResponse<number, types.PostCheckDepositResponseDefault>> {
    return this.core.fetch('/v3/check/deposit/{check_id}', 'post', body, metadata);
  }

  /**
   * Create a digital payment
   *
   * @summary Create a digital payment
   */
  postCheckDigital(body: types.PostCheckDigitalBodyParam): Promise<FetchResponse<201, types.PostCheckDigitalResponse201> | FetchResponse<number, types.PostCheckDigitalResponseDefault>> {
    return this.core.fetch('/v3/check/digital', 'post', body);
  }

  /**
   * Endorse a multi party payment
   *
   * @summary Endorse a multi-party payment
   */
  postCheckEndorse(body: types.PostCheckEndorseBodyParam, metadata: types.PostCheckEndorseMetadataParam): Promise<FetchResponse<number, types.PostCheckEndorseResponseDefault>> {
    return this.core.fetch('/v3/check/endorse/{check_id}', 'post', body, metadata);
  }

  /**
   * Create a new multi party payment
   *
   * @summary Create a multi-party payment
   */
  postCheckMulti(body: types.PostCheckMultiBodyParam): Promise<FetchResponse<201, types.PostCheckMultiResponse201> | FetchResponse<number, types.PostCheckMultiResponseDefault>> {
    return this.core.fetch('/v3/check/multi', 'post', body);
  }

  /**
   * Create a new paper check
   *
   * @summary Create a physical check
   */
  postCheckPhysical(body: types.PostCheckPhysicalBodyParam): Promise<FetchResponse<201, types.PostCheckPhysicalResponse201> | FetchResponse<number, types.PostCheckPhysicalResponseDefault>> {
    return this.core.fetch('/v3/check/physical', 'post', body);
  }

  /**
   * Preview a new payment
   *
   * @summary Preview payment
   */
  postCheckPreview(body: types.PostCheckPreviewBodyParam): Promise<FetchResponse<200, types.PostCheckPreviewResponse200> | FetchResponse<number, types.PostCheckPreviewResponseDefault>> {
    return this.core.fetch('/v3/check/preview', 'post', body);
  }

  /**
   * Print a check
   *
   * @summary Print a payment
   */
  postCheckPrint(metadata: types.PostCheckPrintMetadataParam): Promise<FetchResponse<number, types.PostCheckPrintResponseDefault>> {
    return this.core.fetch('/v3/check/print/{check_id}', 'post', metadata);
  }

  /**
   * Trigger a webhook notification on sandbox
   *
   * @summary Trigger a sandbox webhook
   */
  post_check_webhook(body: types.PostCheckWebhookBodyParam, metadata: types.PostCheckWebhookMetadataParam): Promise<FetchResponse<number, types.PostCheckWebhookResponseDefault>> {
    return this.core.fetch('/v3/check/webhook/{check_id}', 'put', body, metadata);
  }

  /**
   * Void the specified payment
   *
   * @summary Void a payment
   */
  deleteCheck(metadata: types.DeleteCheckMetadataParam): Promise<FetchResponse<number, types.DeleteCheckResponseDefault>> {
    return this.core.fetch('/v3/check/{check_id}', 'delete', metadata);
  }

  /**
   * Get the specified payment
   *
   * @summary Get payment
   */
  getCheck(metadata: types.GetCheckMetadataParam): Promise<FetchResponse<200, types.GetCheckResponse200> | FetchResponse<number, types.GetCheckResponseDefault>> {
    return this.core.fetch('/v3/check/{check_id}', 'get', metadata);
  }

  /**
   * Get the attachment for a payment
   *
   * @summary Get attachment for a payment
   */
  getCheckAttachment(metadata: types.GetCheckAttachmentMetadataParam): Promise<FetchResponse<number, types.GetCheckAttachmentResponseDefault>> {
    return this.core.fetch('/v3/check/{check_id}/attachment', 'get', metadata);
  }

  /**
   * Get details on a deposited payment
   *
   * @summary Get deposit details
   */
  getCheckDeposit(metadata: types.GetCheckDepositMetadataParam): Promise<FetchResponse<200, types.GetCheckDepositResponse200> | FetchResponse<number, types.GetCheckDepositResponseDefault>> {
    return this.core.fetch('/v3/check/{check_id}/deposit', 'get', metadata);
  }

  /**
   * Get details on a failed payment
   *
   * @summary Get details on failed payment
   */
  getCheckFail(metadata: types.GetCheckFailMetadataParam): Promise<FetchResponse<200, types.GetCheckFailResponse200> | FetchResponse<number, types.GetCheckFailResponseDefault>> {
    return this.core.fetch('/v3/check/{check_id}/fail', 'get', metadata);
  }

  /**
   * Get tracking details on a mailed check
   *
   * @summary Get tracking details on mailed check
   */
  getCheckTracking(metadata: types.GetCheckTrackingMetadataParam): Promise<FetchResponse<200, types.GetCheckTrackingResponse200> | FetchResponse<number, types.GetCheckTrackingResponseDefault>> {
    return this.core.fetch('/v3/check/{check_id}/tracking', 'get', metadata);
  }

  /**
   * Return the directory entry
   *
   * @summary Get directory entries
   */
  getDirectory(metadata?: types.GetDirectoryMetadataParam): Promise<FetchResponse<200, types.GetDirectoryResponse200> | FetchResponse<number, types.GetDirectoryResponseDefault>> {
    return this.core.fetch('/v3/directory', 'get', metadata);
  }

  /**
   * Create a new directory item
   *
   * @summary Create a directory entry
   */
  createDirectory(body: types.CreateDirectoryBodyParam): Promise<FetchResponse<201, types.CreateDirectoryResponse201> | FetchResponse<number, types.CreateDirectoryResponseDefault>> {
    return this.core.fetch('/v3/directory', 'post', body);
  }

  /**
   * Remove the directory item
   *
   * @summary Remove a directory entry
   */
  deleteDirectory(metadata: types.DeleteDirectoryMetadataParam): Promise<FetchResponse<number, types.DeleteDirectoryResponseDefault>> {
    return this.core.fetch('/v3/directory/{directory_id}', 'delete', metadata);
  }

  /**
   * Update a directory item
   *
   * @summary Update a directory entry
   */
  updateDirectory(body: types.UpdateDirectoryBodyParam, metadata: types.UpdateDirectoryMetadataParam): Promise<FetchResponse<number, types.UpdateDirectoryResponseDefault>> {
    return this.core.fetch('/v3/directory/{directory_id}', 'put', body, metadata);
  }

  /**
   * Create a new directory bank account
   *
   * @summary Add a bank account to a directory entry
   */
  createDirectoryBank(body: types.CreateDirectoryBankBodyParam, metadata: types.CreateDirectoryBankMetadataParam): Promise<FetchResponse<201, types.CreateDirectoryBankResponse201> | FetchResponse<number, types.CreateDirectoryBankResponseDefault>> {
    return this.core.fetch('/v3/directory/{directory_id}/account/bank', 'post', body, metadata);
  }

  /**
   * Create a new directory card account
   *
   * @summary Add a credit/debit card to a directory entry
   */
  createDirectoryCard(body: types.CreateDirectoryCardBodyParam, metadata: types.CreateDirectoryCardMetadataParam): Promise<FetchResponse<201, types.CreateDirectoryCardResponse201> | FetchResponse<number, types.CreateDirectoryCardResponseDefault>> {
    return this.core.fetch('/v3/directory/{directory_id}/account/card', 'post', body, metadata);
  }

  /**
   * Remove a directory account
   *
   * @summary Remove a payment account from a directory entry
   */
  deleteDirectoryAccount(metadata: types.DeleteDirectoryAccountMetadataParam): Promise<FetchResponse<number, types.DeleteDirectoryAccountResponseDefault>> {
    return this.core.fetch('/v3/directory/{directory_id}/account/{account_id}', 'delete', metadata);
  }

  /**
   * Get sent/received invoices
   *
   * @summary Get sent/received invoices
   */
  getInvoices(metadata?: types.GetInvoicesMetadataParam): Promise<FetchResponse<200, types.GetInvoicesResponse200> | FetchResponse<number, types.GetInvoicesResponseDefault>> {
    return this.core.fetch('/v3/invoice', 'get', metadata);
  }

  /**
   * Create a new invoice
   *
   * @summary Create an invoice
   */
  postInvoice(body: types.PostInvoiceBodyParam): Promise<FetchResponse<201, types.PostInvoiceResponse201> | FetchResponse<number, types.PostInvoiceResponseDefault>> {
    return this.core.fetch('/v3/invoice', 'post', body);
  }

  /**
   * Pay an outstanding invoice
   *
   * @summary Pay an invoice
   */
  postInvoicePayment(body: types.PostInvoicePaymentBodyParam): Promise<FetchResponse<200, types.PostInvoicePaymentResponse200> | FetchResponse<201, types.PostInvoicePaymentResponse201> | FetchResponse<number, types.PostInvoicePaymentResponseDefault>> {
    return this.core.fetch('/v3/invoice/payment', 'post', body);
  }

  /**
   * Cancel the specified invoice
   *
   * @summary Void an invoice
   */
  deleteInvoice(metadata: types.DeleteInvoiceMetadataParam): Promise<FetchResponse<number, types.DeleteInvoiceResponseDefault>> {
    return this.core.fetch('/v3/invoice/{invoice_id}', 'delete', metadata);
  }

  /**
   * Get the specified invoice
   *
   * @summary Get invoice
   */
  getInvoice(metadata: types.GetInvoiceMetadataParam): Promise<FetchResponse<200, types.GetInvoiceResponse200> | FetchResponse<number, types.GetInvoiceResponseDefault>> {
    return this.core.fetch('/v3/invoice/{invoice_id}', 'get', metadata);
  }

  /**
   * Get the attachment for an invoice
   *
   * @summary Get attachment for an invoice
   */
  getInvoiceAttachment(metadata: types.GetInvoiceAttachmentMetadataParam): Promise<FetchResponse<number, types.GetInvoiceAttachmentResponseDefault>> {
    return this.core.fetch('/v3/invoice/{invoice_id}/attachment', 'get', metadata);
  }

  /**
   * Return the subscriptions
   *
   * @summary Get subscriptions
   */
  getSubscriptions(metadata?: types.GetSubscriptionsMetadataParam): Promise<FetchResponse<200, types.GetSubscriptionsResponse200> | FetchResponse<number, types.GetSubscriptionsResponseDefault>> {
    return this.core.fetch('/v3/subscription', 'get', metadata);
  }

  /**
   * Create a new payment subscription
   *
   * @summary Create payment subscription
   */
  postSubscriptionCheck(body: types.PostSubscriptionCheckBodyParam): Promise<FetchResponse<201, types.PostSubscriptionCheckResponse201> | FetchResponse<number, types.PostSubscriptionCheckResponseDefault>> {
    return this.core.fetch('/v3/subscription/check', 'post', body);
  }

  /**
   * Create a new invoice subscription
   *
   * @summary Create invoice subscription
   */
  postSubscriptionInvoice(body: types.PostSubscriptionInvoiceBodyParam): Promise<FetchResponse<201, types.PostSubscriptionInvoiceResponse201> | FetchResponse<number, types.PostSubscriptionInvoiceResponseDefault>> {
    return this.core.fetch('/v3/subscription/invoice', 'post', body);
  }

  /**
   * Remove the specified subscription
   *
   * @summary Remove subscription
   */
  deleteSubscription(metadata: types.DeleteSubscriptionMetadataParam): Promise<FetchResponse<number, types.DeleteSubscriptionResponseDefault>> {
    return this.core.fetch('/v3/subscription/{subscription_id}', 'delete', metadata);
  }

  /**
   * Get the specified subscription
   *
   * @summary Get subscription
   */
  getSubscription(metadata: types.GetSubscriptionMetadataParam): Promise<FetchResponse<200, types.GetSubscriptionResponse200> | FetchResponse<number, types.GetSubscriptionResponseDefault>> {
    return this.core.fetch('/v3/subscription/{subscription_id}', 'get', metadata);
  }

  /**
   * Update the specified subscription
   *
   * @summary Update subscription
   */
  putSubscription(body: types.PutSubscriptionBodyParam, metadata: types.PutSubscriptionMetadataParam): Promise<FetchResponse<number, types.PutSubscriptionResponseDefault>> {
    return this.core.fetch('/v3/subscription/{subscription_id}', 'put', body, metadata);
  }

  /**
   * Get user information
   *
   * @summary Get user details
   */
  getUser(): Promise<FetchResponse<200, types.GetUserResponse200> | FetchResponse<number, types.GetUserResponseDefault>> {
    return this.core.fetch('/v3/user', 'get');
  }

  /**
   * Create a new marketplace user
   *
   * @summary Create user
   */
  postUser(body: types.PostUserBodyParam): Promise<FetchResponse<201, types.PostUserResponse201> | FetchResponse<number, types.PostUserResponseDefault>> {
    return this.core.fetch('/v3/user', 'post', body);
  }

  /**
   * Update existing user information
   *
   * @summary Update user
   */
  putUser(body: types.PutUserBodyParam): Promise<FetchResponse<number, types.PutUserResponseDefault>> {
    return this.core.fetch('/v3/user', 'put', body);
  }

  /**
   * Return the API keys for the user
   *
   * @summary Get API keys for user
   */
  getApiKeys(): Promise<FetchResponse<200, types.GetApiKeysResponse200> | FetchResponse<number, types.GetApiKeysResponseDefault>> {
    return this.core.fetch('/v3/user/api_key', 'get');
  }

  /**
   * Generate new API keys for the user
   *
   * @summary Generate new API Key for user
   */
  newApiKey(body: types.NewApiKeyBodyParam): Promise<FetchResponse<201, types.NewApiKeyResponse201> | FetchResponse<number, types.NewApiKeyResponseDefault>> {
    return this.core.fetch('/v3/user/api_key', 'post', body);
  }

  /**
   * Delete API key for user
   *
   * @summary Delete API key for user
   */
  deleteApiKey(metadata: types.DeleteApiKeyMetadataParam): Promise<FetchResponse<number, types.DeleteApiKeyResponseDefault>> {
    return this.core.fetch('/v3/user/api_key/{key_id}', 'delete', metadata);
  }

  /**
   * Return the marketplace users
   *
   * @summary Get marketplace users
   */
  getUsers(metadata?: types.GetUsersMetadataParam): Promise<FetchResponse<200, types.GetUsersResponse200> | FetchResponse<number, types.GetUsersResponseDefault>> {
    return this.core.fetch('/v3/user/list', 'get', metadata);
  }

  /**
   * Add signature
   *
   * @summary Add signature for user
   */
  postUserSignature(body: types.PostUserSignatureBodyParam): Promise<FetchResponse<number, types.PostUserSignatureResponseDefault>> {
    return this.core.fetch('/v3/user/signature', 'post', body);
  }

  /**
   * Delete the marketplace user
   *
   * @summary Remove marketplace user
   */
  deleteUser(metadata: types.DeleteUserMetadataParam): Promise<FetchResponse<number, types.DeleteUserResponseDefault>> {
    return this.core.fetch('/v3/user/{user_id}', 'delete', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { AddPaypalBodyParam, AddPaypalResponse201, AddPaypalResponseDefault, AddVenmoBodyParam, AddVenmoResponse201, AddVenmoResponseDefault, AddWalletBodyParam, AddWalletResponse201, AddWalletResponseDefault, AddZelleBodyParam, AddZelleResponse201, AddZelleResponseDefault, CreateDirectoryBankBodyParam, CreateDirectoryBankMetadataParam, CreateDirectoryBankResponse201, CreateDirectoryBankResponseDefault, CreateDirectoryBodyParam, CreateDirectoryCardBodyParam, CreateDirectoryCardMetadataParam, CreateDirectoryCardResponse201, CreateDirectoryCardResponseDefault, CreateDirectoryResponse201, CreateDirectoryResponseDefault, DeleteApiKeyMetadataParam, DeleteApiKeyResponseDefault, DeleteApprovalCheckMetadataParam, DeleteApprovalCheckResponseDefault, DeleteBankMetadataParam, DeleteBankResponseDefault, DeleteCardMetadataParam, DeleteCardResponseDefault, DeleteCheckMetadataParam, DeleteCheckResponseDefault, DeleteDirectoryAccountMetadataParam, DeleteDirectoryAccountResponseDefault, DeleteDirectoryMetadataParam, DeleteDirectoryResponseDefault, DeleteInvoiceMetadataParam, DeleteInvoiceResponseDefault, DeleteSubscriptionMetadataParam, DeleteSubscriptionResponseDefault, DeleteUserMetadataParam, DeleteUserResponseDefault, DeleteVccMetadataParam, DeleteVccResponseDefault, GetApiKeysResponse200, GetApiKeysResponseDefault, GetApprovalAttachmentMetadataParam, GetApprovalAttachmentResponseDefault, GetApprovalCheckMetadataParam, GetApprovalCheckResponse200, GetApprovalCheckResponseDefault, GetApprovalChecksMetadataParam, GetApprovalChecksResponse200, GetApprovalChecksResponseDefault, GetBankInstitutionsResponse200, GetBankInstitutionsResponseDefault, GetBanksResponse200, GetBanksResponseDefault, GetCardsResponse200, GetCardsResponseDefault, GetCheckAttachmentMetadataParam, GetCheckAttachmentResponseDefault, GetCheckDepositMetadataParam, GetCheckDepositResponse200, GetCheckDepositResponseDefault, GetCheckFailMetadataParam, GetCheckFailResponse200, GetCheckFailResponseDefault, GetCheckMetadataParam, GetCheckResponse200, GetCheckResponseDefault, GetCheckTrackingMetadataParam, GetCheckTrackingResponse200, GetCheckTrackingResponseDefault, GetChecksMetadataParam, GetChecksResponse200, GetChecksResponseDefault, GetDirectoryMetadataParam, GetDirectoryResponse200, GetDirectoryResponseDefault, GetInvoiceAttachmentMetadataParam, GetInvoiceAttachmentResponseDefault, GetInvoiceMetadataParam, GetInvoiceResponse200, GetInvoiceResponseDefault, GetInvoicesMetadataParam, GetInvoicesResponse200, GetInvoicesResponseDefault, GetPaypalResponse200, GetPaypalResponseDefault, GetSubscriptionMetadataParam, GetSubscriptionResponse200, GetSubscriptionResponseDefault, GetSubscriptionsMetadataParam, GetSubscriptionsResponse200, GetSubscriptionsResponseDefault, GetUserResponse200, GetUserResponseDefault, GetUsersMetadataParam, GetUsersResponse200, GetUsersResponseDefault, GetVccTransactionMetadataParam, GetVccTransactionResponse200, GetVccTransactionResponseDefault, GetVccsResponse200, GetVccsResponseDefault, GetVenmoResponse200, GetVenmoResponseDefault, GetZelleResponse200, GetZelleResponseDefault, NewApiKeyBodyParam, NewApiKeyResponse201, NewApiKeyResponseDefault, PostApprovalDigitalBodyParam, PostApprovalDigitalResponse201, PostApprovalDigitalResponseDefault, PostApprovalMultiBodyParam, PostApprovalMultiResponse201, PostApprovalMultiResponseDefault, PostApprovalPhysicalBodyParam, PostApprovalPhysicalResponse201, PostApprovalPhysicalResponseDefault, PostApprovalReleaseBodyParam, PostApprovalReleaseResponse200, PostApprovalReleaseResponseDefault, PostBankBodyParam, PostBankIavBodyParam, PostBankIavResponse201, PostBankIavResponseDefault, PostBankPlaidBodyParam, PostBankPlaidResponse201, PostBankPlaidResponseDefault, PostBankReleaseBodyParam, PostBankReleaseResponseDefault, PostBankResponse201, PostBankResponseDefault, PostBankVerifyBodyParam, PostBankVerifyResponseDefault, PostCardBodyParam, PostCardResponse201, PostCardResponseDefault, PostCheckDepositBodyParam, PostCheckDepositMetadataParam, PostCheckDepositResponse201, PostCheckDepositResponseDefault, PostCheckDigitalBodyParam, PostCheckDigitalResponse201, PostCheckDigitalResponseDefault, PostCheckEndorseBodyParam, PostCheckEndorseMetadataParam, PostCheckEndorseResponseDefault, PostCheckMultiBodyParam, PostCheckMultiResponse201, PostCheckMultiResponseDefault, PostCheckPhysicalBodyParam, PostCheckPhysicalResponse201, PostCheckPhysicalResponseDefault, PostCheckPreviewBodyParam, PostCheckPreviewResponse200, PostCheckPreviewResponseDefault, PostCheckPrintMetadataParam, PostCheckPrintResponseDefault, PostCheckWebhookBodyParam, PostCheckWebhookMetadataParam, PostCheckWebhookResponseDefault, PostInvoiceBodyParam, PostInvoicePaymentBodyParam, PostInvoicePaymentResponse200, PostInvoicePaymentResponse201, PostInvoicePaymentResponseDefault, PostInvoiceResponse201, PostInvoiceResponseDefault, PostSubscriptionCheckBodyParam, PostSubscriptionCheckResponse201, PostSubscriptionCheckResponseDefault, PostSubscriptionInvoiceBodyParam, PostSubscriptionInvoiceResponse201, PostSubscriptionInvoiceResponseDefault, PostUserBodyParam, PostUserResponse201, PostUserResponseDefault, PostUserSignatureBodyParam, PostUserSignatureResponseDefault, PostVccBodyParam, PostVccResponse201, PostVccResponseDefault, PutApprovalCheckBodyParam, PutApprovalCheckMetadataParam, PutApprovalCheckResponseDefault, PutBankBodyParam, PutBankMetadataParam, PutBankResponseDefault, PutCardBodyParam, PutCardMetadataParam, PutCardResponseDefault, PutPaypalBodyParam, PutPaypalMetadataParam, PutPaypalResponseDefault, PutSubscriptionBodyParam, PutSubscriptionMetadataParam, PutSubscriptionResponseDefault, PutUserBodyParam, PutUserResponseDefault, PutVccBodyParam, PutVccMetadataParam, PutVccResponseDefault, PutVenmoBodyParam, PutVenmoMetadataParam, PutVenmoResponseDefault, PutZelleBodyParam, PutZelleMetadataParam, PutZelleResponseDefault, RemovePaypalMetadataParam, RemovePaypalResponseDefault, RemoveVenmoMetadataParam, RemoveVenmoResponseDefault, RemoveZelleMetadataParam, RemoveZelleResponseDefault, UpdateDirectoryBodyParam, UpdateDirectoryMetadataParam, UpdateDirectoryResponseDefault } from './types';
