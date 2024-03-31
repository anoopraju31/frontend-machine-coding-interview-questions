export default function SelectableGrid({ rows = 10, columns = 10 }) {
	return (
		<div
			style={{
				gridTemplateColumns: `repeat(${columns}, 40px)`,
				gridTemplateRows: `repeat(${rows}, 40px)`,
			}}
			className={`grid `}>
			{[...Array(rows * columns).keys()].map((_, i) => (
				<div
					key={i}
					className='border border-black flex justify-center items-center'>
					{i + 1}
				</div>
			))}
		</div>
	)
}
