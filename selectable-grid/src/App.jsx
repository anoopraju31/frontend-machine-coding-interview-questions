import SelectableGrid from './components/SelectableGrid'

export default function App() {
	return (
		<div className='flex flex-col items-center'>
			<h1 className='text-3xl font-bold text-center my-5'> Selectable Grid </h1>
			<SelectableGrid rows={15} columns={15} />
		</div>
	)
}
