const { save } = require('../src/model/movie')

module.exports = async () => {
    try {
        const dumy = [
            {
                name: "Fantastic Beasts and Where to Find Them",
                banner: "https://image.com/image1.jpeg",
                release: "2016-11-16",
                genre: [1, 2],
            },
            {
                name: "Uncharted",
                banner: "https://image.com/image1.jpeg",
                release: "2022-02-16",
                genre: [7, 9],
            },
            {
                name: "spider man homecoming",
                banner: "https://image.com/image1.jpeg",
                release: "2017-07-07",
                genre: [7, 1],
            },
            {
                name: "The Lion King",
                banner: "https://image.com/image1.jpeg",
                release: "2019-07-17",
                genre: [7, 9],
            },
            {
                name: "John Wick: Chapter 3",
                banner: "https://image.com/image1.jpeg",
                release: "2019-05-17",
                genre: [7],
            },
            {
                name: "Black Widow",
                banner: "https://image.com/image1.jpeg",
                release: "2021-05-09",
                genre: [7, 4],
            },
            {
                name: "The Witches",
                banner: "https://image.com/image1.jpeg",
                release: "2020-10-22",
                genre: [7, 5],
            },
            {
                name: "Tenet",
                banner: "https://image.com/image1.jpeg",
                release: "2021-02-10",
                genre: [7, 10],
            },
            {
                name: "Pulp Fiction",
                banner: "https://image.com/image5.jpeg",
                release: "1994-10-14",
                genre: [9, 10],
            },
            {
                name: "The Godfather",
                banner: "https://image.com/image6.jpeg",
                release: "1972-03-24",
                genre: [1, 2],
            },
            {
                name: "The Matrix",
                banner: "https://image.com/image7.jpeg",
                release: "1999-03-31",
                genre: [3, 4],
            },
            {
                name: "Forrest Gump",
                banner: "https://image.com/image8.jpeg",
                release: "1994-07-06",
                genre: [5, 6],
            },
            {
                name: "Fight Club",
                banner: "https://image.com/image9.jpeg",
                release: "1999-10-15",
                genre: [7, 8],
            },
            {
                name: "The Lord of the Rings: The Return of the King",
                banner: "https://image.com/image10.jpeg",
                release: "2003-12-17",
                genre: [9, 10],
            },
            {
                name: "The Lion King",
                banner: "https://image.com/image11.jpeg",
                release: "1994-06-24",
                genre: [1, 2],
            },
            {
                name: "The Shawshank Redemption",
                banner: "https://image.com/image12.jpeg",
                release: "1994-09-23",
                genre: [3, 4],
            },
            {
                name: "The Godfather: Part II",
                banner: "https://image.com/image13.jpeg",
                release: "1974-12-20",
                genre: [5, 6],
            },
            {
                name: "The Dark Knight Rises",
                banner: "https://image.com/image14.jpeg",
                release: "2012-07-20",
                genre: [7, 8],
            },
            {
                name: "The Lord of the Rings: The Fellowship of the Ring",
                banner: "https://image.com/image15.jpeg",
                release: "2001-12-19",
                genre: [9, 10],
            },
            {
                name: "Inception",
                banner: "https://image.com/image16.jpeg",
                release: "2010-07-16",
                genre: [1, 2],
            },
            {
                name: "The Matrix",
                banner: "https://image.com/image17.jpeg",
                release: "1999-03-31",
                genre: [3, 4],
            },
            {
                name: "Forrest Gump",
                banner: "https://image.com/image18.jpeg",
                release: "1994-07-06",
                genre: [5, 6],
            },
            {
                name: "The Dark Knight",
                banner: "https://image.com/image19.jpeg",
                release: "2008-07-18",
                genre: [7, 8],
            },
            {
                name: "The Lion King",
                banner: "https://image.com/image20.jpeg",
                release: "1994-06-24",
                genre: [9, 10],
            },
            {
                name: "Pulp Fiction",
                banner: "https://image.com/image21.jpeg",
                release: "1994-10-14",
                genre: [1, 2],
            },
            {
                name: "Fight Club",
                banner: "https://image.com/image22.jpeg",
                release: "1999-10-15",
                genre: [3, 4],
            },
            {
                name: "The Lord of the Rings: The Two Towers",
                banner: "https://image.com/image23.jpeg",
                release: "2002-12-18",
                genre: [5, 6],
            },
            {
                name: "The Godfather",
                banner: "https://image.com/image24.jpeg",
                release: "1972-03-24",
                genre: [7, 8],
            },
            {
                name: "The Dark Knight Rises",
                banner: "https://image.com/image25.jpeg",
                release: "2012-07-20",
                genre: [9, 10],
            },
            {
                name: "Inception",
                banner: "https://image.com/image26.jpeg",
                release: "2010-07-16",
                genre: [1, 2],
            },
            {
                name: "Forrest Gump",
                banner: "https://image.com/image27.jpeg",
                release: "1994-07-06",
                genre: [3, 4],
            },
            {
                name: "The Matrix",
                banner: "https://image.com/image28.jpeg",
                release: "1999-03-31",
                genre: [5, 6],
            },
            {
                name: "The Godfather: Part II",
                banner: "https://image.com/image29.jpeg",
                release: "1974-12-20",
                genre: [7, 8],
            },
            {
                name: "The Shawshank Redemption",
                banner: "https://image.com/image30.jpeg",
                release: "1994-09-23",
                genre: [9, 10],
            },
        ]

        for await (const data of dumy) {
            console.log(data);
            await save(data)
        }

        console.log(`${dumy.length} movie created`);
    } catch (error) {
        throw error
    }
}