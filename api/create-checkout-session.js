import Stripe from 'stripe';

export default async function handler(req, res) {

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const { second } = req.query;

try {

const session = await stripe.checkout.sessions.create({

payment_method_types: ['card'],

mode: 'payment',

line_items: [
{
price_data: {
currency: 'eur',
product_data: {
name: `Second ${second}`,
},
unit_amount: 100,
},
quantity: 1,
},
],

metadata: {
second: second,
},

success_url: 'https://buyasecond.vercel.app/success',
cancel_url: 'https://buyasecond.vercel.app/cancel',

});

res.status(200).json({ url: session.url });

} catch (err) {

res.status(500).json({ error: err.message });

}

}
