import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'

export default function SelectableGrid({ rows = 10, columns = 10 }) {
	const [isMouseDown, setIsMouseDown] = useState(false)
	const [selectedBox, setSelectedBox] = useState([])

	const handleMouseUp = () => setIsMouseDown(false)
	const handleMouseDown = (boxId) => {
		setIsMouseDown(true)
		setSelectedBox([boxId])
	}
	const handleMouseEnter = useCallback(
		(boxId) => {
			if (!isMouseDown) return

			const startBox = selectedBox[0]
			const endBox = boxId

			const startRow = Math.floor((startBox - 1) / columns)
			const startColumn = (startBox - 1) % columns
			const endRow = Math.floor((endBox - 1) / columns)
			const endColumn = (endBox - 1) % columns

			const minRow = Math.min(startRow, endRow)
			const maxRow = Math.max(startRow, endRow)
			const minColumn = Math.min(startColumn, endColumn)
			const maxColumn = Math.max(startColumn, endColumn)

			const selected = []

			for (let row = minRow; row < maxRow; row++)
				for (let column = minColumn; column < maxColumn; column++)
					selected.push(row * columns + column + 1)

			setSelectedBox(selected)
		},
		[isMouseDown],
	)
	return (
		<div
			style={{
				gridTemplateColumns: `repeat(${columns}, 40px)`,
				gridTemplateRows: `repeat(${rows}, 40px)`,
			}}
			className='grid'
			onMouseUp={handleMouseUp}>
			{[...Array(rows * columns).keys()].map((_, i) => (
				<div
					key={i}
					onMouseDown={() => handleMouseDown(i + 1)}
					onMouseEnter={() => handleMouseEnter(i + 1)}
					className={`border border-black select-none flex justify-center items-center ${
						selectedBox.includes(i + 1) ? 'bg-green-400' : 'bg-white'
					}`}>
					{i + 1}
				</div>
			))}
		</div>
	)
}

SelectableGrid.propTypes = {
	rows: PropTypes.number,
	columns: PropTypes.number,
}
