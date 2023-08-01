import Layout from '@/components/Layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function ProductForm({
	number: existingNumber,
	title: existingTitle,
	supTitle: existingSupTitle,
	photo: existingPhoto,
}) {
	const [number, setNumber] = useState(existingNumber || '')
	const [title, setTitle] = useState(existingTitle || '')
	const [supTitle, setSupTitle] = useState(existingSupTitle || '')
	const [photo, setPhoto] = useState(existingPhoto || '')
	const [setting, setSetting] = useState([0])

	const router = useRouter()

	useEffect(() => {
		axios.get('/api/settings').then(response => {
			setSetting(response.data)
		})
	}, [])
	async function saveProduct(ev) {
		ev.preventDefault()
		const data = {
			number,
			title,
			supTitle,
			photo,
		}
		await axios.put('/api/settings', data)
	}
	return (
		<Layout>
			<h1 className='my-4'>Настройка содержимого сайта</h1>
			<form onSubmit={saveProduct}>
				<label>Тут введите активный номер</label>
				<input
					type='text'
					placeholder='Номер'
					value={number || setting[0].number}
					onChange={ev => setNumber(ev.target.value)}
				/>

				<label>Заголовок в главной странице</label>
				<input
					type='text'
					placeholder='Велком'
					value={title || setting[0].title}
					onChange={ev => setTitle(ev.target.value)}
				/>
				<label>Подзаголовок в главной странице</label>
				<input
					type='text'
					placeholder='Реклама над хедером'
					value={supTitle || setting[0].supTitle}
					onChange={ev => setSupTitle(ev.target.value)}
				/>
				<input
					type='text'
					placeholder='Фото в главной странице'
					value={photo || setting[0].photo}
					onChange={ev => setPhoto(ev.target.value)}
				/>
				<button type='submit' className='btn-primary'>
					Сохранить
				</button>
			</form>
		</Layout>
	)
}
