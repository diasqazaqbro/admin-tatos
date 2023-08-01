import { mongooseConnect } from '@/lib/mongoose'
import { Order } from '@/models/Order'

export default async function handler(req, res) {
	const { method } = req
	await mongooseConnect()
	if (method === 'GET') {
		res.json(await Order.find().sort({ createdAt: -1 }))
	}

	if (method === 'DELETE') {
		await Order.deleteMany({})
	}
}
