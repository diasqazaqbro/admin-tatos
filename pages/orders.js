import Layout from '@/components/Layout'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function OrdersPage() {
	const [orders, setOrders] = useState([])
	const [isSuccess, setIsSuccess] = useState(false)
	useEffect(() => {
		axios.get('/api/orders').then(response => {
			setOrders(response.data)
		})
	}, [])

	const isYes = () => {
		axios.delete('/api/orders')
		setIsSuccess(false)
	}
	const isNo = () => {
		setIsSuccess(false)
	}
	const deleteOrders = () => {
		setIsSuccess(true)
	}

	if (isSuccess) {
		return (
			<Layout>
				<div className='order-success'>
					<h1>Вы уверены что хотите очистить список заказов?</h1>
					<button onClick={isYes} className='btn-red'>
						Да
					</button>
					<button onClick={isNo} className='btn-default'>
						Нет
					</button>
				</div>
			</Layout>
		)
	} else {
		return (
			<Layout>
				<button className='btn-red' onClick={deleteOrders}>
					Очистить весь список
				</button>
				<table className='basic table'>
					<thead>
						<tr>
							<th>Дата</th>
							<th>Получатель</th>
							<th>Связаться</th>
							<th>Комментарий</th>
							<th>Товар</th>
						</tr>
					</thead>
					<tbody>
						{orders.length > 0 &&
							orders.map(order => (
								<tr key={order._id}>
									<td>{new Date(order.createdAt).toLocaleString()}</td>

									<td>{order.name}</td>
									<td>
										{order.option} {order.number}
									</td>
									<td>{order.commentary}</td>
									<td>
										{order.line_items.map(l => (
											<>
												{l.price_data?.product_data.name} x{l.quantity} -{' '}
												{l.price_data?.unit_amount} тг
												<br />
											</>
										))}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</Layout>
		)
	}
}
