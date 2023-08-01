import { mongooseConnect } from '@/lib/mongoose'
import { Settings } from '@/models/Settings'
import { isAdminRequest } from '@/pages/api/auth/[...nextauth]'

export default async function handle(req, res) {
	const { method } = req
	await mongooseConnect()
	await isAdminRequest(req, res)

	if (method === 'GET') {
		res.json(await Settings.find())
	}

	if (method === 'PUT') {
		const { number, title, supTitle, photo } = req.body
		await Settings.updateOne({ number, title, supTitle, photo })
		res.json(true)
	}
}
