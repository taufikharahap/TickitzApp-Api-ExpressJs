const { saveData } = require('../src/model/genre')

module.exports = async () => {
    try {
        const dumy = [
            {
                name: "Fantasy",
            },
            {
                name: "Comedy",
            },
            {
                name: "Romance",
            },
            {
                name: "Thriller",
            },
            {
                name: "Horror",
            },
            {
                name: "Science fiction",
            },
            {
                name: "Action",
            },
            {
                name: "Drama",
            },
            {
                name: "Adventure",
            },
            {
                name: "Mystery",
            },
        ]

        for await (const data of dumy) {
            console.log(data);
            await saveData(data)
        }

        console.log(`${dumy.length} genre created`);
    } catch (error) {
        throw error
    }
}