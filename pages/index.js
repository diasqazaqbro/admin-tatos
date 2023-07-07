import Layout from '@/components/Layout'
import { useSession } from 'next-auth/react'

export default function Home() {
	const { data: session } = useSession()
	return (
		<Layout>
			<h3 className='font-medium text-2xl py-3'>
				Доброе утро, <b>{session?.user?.name}</b>
			</h3>
		</Layout>
	)
}
