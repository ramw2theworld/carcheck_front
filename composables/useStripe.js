import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NnNKLIZ7GRzcjItjwQGvG8cBmTuW4FPCgPxiQDHo9nBfSqj0KjHgcgjdbwSchQWW5rvPbuUK3IsdjwOUGYWSZJV008sWndQue');

export const useStripe = () => {
  const processPayment = async () => {
    const stripe = await stripePromise;
    return { success: true };
  };

  return {
    processPayment
  };
};

