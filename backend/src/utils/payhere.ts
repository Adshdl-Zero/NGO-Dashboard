import crypto from "crypto";

interface PayHerePaymentRequest {
  merchant_id: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  order_id: string;
  items: string;
  amount: string;
  currency: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

interface PayHereNotification {
  order_id: string;
  payment_id: string;
  payhere_amount: string;
  payhere_currency: string;
  status_code: string;
  status_message: string;
  md5sig: string;
  merchant_id: string;
  custom_1?: string;
  [key: string]: any;
}

export const generatePayHereHash = (
  merchantId: string,
  orderId: string,
  amount: string,
  currencyCode: string,
  merchantSecret: string,
): string => {
  const hashStr = `${merchantId}${orderId}${amount}${currencyCode}${merchantSecret}`;
  return crypto.createHash("md5").update(hashStr).digest("hex").toUpperCase();
};

export const verifyPayHereSignature = (
  merchantId: string,
  orderId: string,
  amount: string,
  currencyCode: string,
  statusCode: string,
  md5sig: string,
  merchantSecret: string,
): boolean => {
  const secretHash = crypto
    .createHash("md5")
    .update(merchantSecret)
    .digest("hex")
    .toUpperCase();
  const hashStr = `${merchantId}${orderId}${amount}${currencyCode}${statusCode}${secretHash}`;
  const expectedHash = crypto
    .createHash("md5")
    .update(hashStr)
    .digest("hex")
    .toUpperCase();
  return md5sig === expectedHash;
};

export const createPayHereRequest = (
  merchantId: string,
  merchantSecret: string,
  orderId: string,
  amount: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address: string,
  returnUrl: string,
  cancelUrl: string,
  notifyUrl: string,
): PayHerePaymentRequest => {
  const currency = "LKR";
  const amountStr = amount.toFixed(2);

  return {
    merchant_id: merchantId,
    return_url: returnUrl,
    cancel_url: cancelUrl,
    notify_url: notifyUrl,
    order_id: orderId,
    items: "Donation",
    amount: amountStr,
    currency: currency,
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone: phone,
    address: address,
    city: "City",
    country: "LK",
  };
};

export const generatePayHereChecksum = (
  request: PayHerePaymentRequest,
  merchantSecret: string,
): string => {
  const secretHash = crypto
    .createHash("md5")
    .update(merchantSecret)
    .digest("hex")
    .toUpperCase();
  const hashStr = `${request.merchant_id}${request.order_id}${request.amount}${request.currency}${secretHash}`;
  return crypto.createHash("md5").update(hashStr).digest("hex").toUpperCase();
};
