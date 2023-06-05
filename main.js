const gallery = document.querySelector('#gallery')

function getTextColor(red, green, blue) {
    const brightness = (red * 300 + green * 590 + blue * 115) / 1000
    return brightness > 125 ? '#000000' : '#ffffff'
}

fetch(
    'https://api.themoviedb.org/3/movie/upcoming?api_key=0a162f40e6a2a9391d8f39a96afa58b8&region=kr'
)
    .then((res) => res.json())
    .then((data) => {
        data.results.forEach((film) => {
            if (
                film.overview !== '' &&
                film.poster_path !== '' &&
                film.poster_path !== null &&
                film.original_title !== ''
            ) {
                const description = film.overview
                const image = film.poster_path
                const title = film.original_title

                const createGallery = document.createElement('div')
                createGallery.classList.add('gallery')

                const imageElement = document.createElement('img')
                imageElement.crossOrigin = 'anonymous'
                imageElement.src = `https://image.tmdb.org/t/p/w400/${image}`
                imageElement.alt = title
                imageElement.classList.add('poster')

                imageElement.addEventListener('load', () => {
                    const colorThief = new ColorThief()
                    const dominantColor = colorThief.getColor(imageElement)

                    createGallery.style.backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`

                    const textColor = getTextColor(
                        dominantColor[0],
                        dominantColor[1],
                        dominantColor[2]
                    )
                    createGallery.style.borderColor = textColor
                    titleElement.style.color = textColor
                    descriptionElement.style.color = textColor
                })

                const informationDiv = document.createElement('div')
                informationDiv.classList.add('information')

                const titleElement = document.createElement('h1')
                titleElement.classList.add('title')
                titleElement.textContent = title

                const descriptionElement = document.createElement('p')
                descriptionElement.classList.add('description')
                descriptionElement.textContent = description

                informationDiv.appendChild(titleElement)
                informationDiv.appendChild(descriptionElement)
                createGallery.appendChild(imageElement)
                createGallery.appendChild(informationDiv)
                gallery.appendChild(createGallery)
            }
        })
    })
