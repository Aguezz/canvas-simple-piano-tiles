(function() {
	const cvs = document.getElementById('canvas')
	const ctx = cvs.getContext('2d')
	const cW = cvs.clientWidth
	const cH = cvs.clientHeight

	let tiles = [[3, 400]]
	const tW = 100
	const tH = 200

	let speed = 5

	const line = { x: 0 , y: tH * 3, w: cW, h: 5 }

	const difficult = [5,10,15,20,25,30,40,55,70,85,110,130,155,180,200,225,250,275,300,325]
	let score = 0
	let play = false
	let gameOver = false

	function draw() {
		ctx.fillStyle = '#0f0f0f'
		ctx.fillRect(0, 0, cW, cH)

		for (let i = 0; i < tiles.length; i++) {
			ctx.fillStyle = '#fff'
			ctx.fillRect(tiles[i][0] * tW, tiles[i][1], tW, tH)
			if (play) tiles[i][1] += speed
		}

		if (line.y < tiles[0][1]) {
			play = false
			gameOver = true
		}

		ctx.fillStyle = '#ff4d4d'
		ctx.fillRect(line.x, line.y, line.w, line.h)

		document.getElementById('score').innerHTML = 'SCORE : ' + score

		if (!gameOver) requestAnimationFrame(draw)
	}

	function generatePositionTile() {
		let value = Math.floor(Math.random() * 4)
		if (tiles[tiles.length - 1][0] == value) value = generatePositionTile()
		return value
	}

	function newTile() {
		const p = generatePositionTile()
		const y = tiles[tiles.length - 1][1] - tH
		tiles.push([p, y])
	}

	function clicked(key) {
		if (!play && tiles[0][0] == key) play = true
		if (play) {
			if (line.y - 100 <= tiles[0][1] + tH) {
				if (tiles[0][0] == key) {
					tiles.shift()
					newTile()
					updateScore()
				} else {
					play = false
					gameOver = true
				}
			}
		}
	}

	function updateScore() {
		score++
		let index = 0
		for (let i = 0; i < difficult.length; i++) {
			if (score >= difficult[i]) index = i
		}
		speed = 5 + index
	}

	document.addEventListener('keydown', function(e) {
		const key = e.keyCode
		if (key == 68) clicked(0)
		else if (key == 70) clicked(1)
		else if (key == 74) clicked(2)
		else if (key == 75) clicked(3)
	})

	for (let i = 0; i < 4; i++) {
		newTile()
	}

	draw()
})()
