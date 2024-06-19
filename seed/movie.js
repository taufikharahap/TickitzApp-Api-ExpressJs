const { save } = require('../src/model/movie')

module.exports = async () => {
    try {
        const dumy = [
            {
                movie_name: "Black Widow",
                movie_poster: "http://localhost:8001/image/poster/image-1718508429547-984299803-Rectangle 618.png",
                release_date: "2016-11-16",
                directed_by: "John",
                casts: ["Paul king", "Alex"],
                duration: "1 hours 57 minutes",
                synopsis: "An epic that details the checkered rise and fall of French Emperor Napoleon Bonaparte and his relentless journey to power through the prism of his addictive",
                genre: [1, 2],
            },
            {
                movie_name: "Black Widow",
                movie_poster: "http://localhost:8001/image/poster/image-1718508429547-984299803-Rectangle 618.png",
                release_date: "2016-11-16",
                directed_by: "John",
                casts: ["Paul king", "Alex"],
                duration: "1 hours 57 minutes",
                synopsis: "An epic that details the checkered rise and fall of French Emperor Napoleon Bonaparte and his relentless journey to power through the prism of his addictive",
                genre: [2, 3],
            },
            {
                movie_name: "Black Widow",
                movie_poster: "http://localhost:8001/image/poster/image-1718508429547-984299803-Rectangle 618.png",
                release_date: "2016-11-16",
                directed_by: "John",
                casts: ["Paul king", "Alex"],
                duration: "1 hours 57 minutes",
                synopsis: "An epic that details the checkered rise and fall of French Emperor Napoleon Bonaparte and his relentless journey to power through the prism of his addictive",
                genre: [3, 4],
            },
            {
                movie_name: "Black Widow",
                movie_poster: "http://localhost:8001/image/poster/image-1718508429547-984299803-Rectangle 618.png",
                release_date: "2016-11-16",
                directed_by: "John",
                casts: ["Paul king", "Alex"],
                duration: "1 hours 57 minutes",
                synopsis: "An epic that details the checkered rise and fall of French Emperor Napoleon Bonaparte and his relentless journey to power through the prism of his addictive",
                genre: [5, 6],
            },
            {
                movie_name: "Black Widow",
                movie_poster: "http://localhost:8001/image/poster/image-1718508429547-984299803-Rectangle 618.png",
                release_date: "2016-11-16",
                directed_by: "John",
                casts: ["Paul king", "Alex"],
                duration: "1 hours 57 minutes",
                synopsis: "An epic that details the checkered rise and fall of French Emperor Napoleon Bonaparte and his relentless journey to power through the prism of his addictive",
                genre: [7, 8],
            },
            {
                movie_name: "Black Widow",
                movie_poster: "http://localhost:8001/image/poster/image-1718508429547-984299803-Rectangle 618.png",
                release_date: "2016-11-16",
                directed_by: "John",
                casts: ["Paul king", "Alex"],
                duration: "1 hours 57 minutes",
                synopsis: "An epic that details the checkered rise and fall of French Emperor Napoleon Bonaparte and his relentless journey to power through the prism of his addictive",
                genre: [9, 10],
            },
            {
                movie_name: "Black Widow",
                movie_poster: "http://localhost:8001/image/poster/image-1718508429547-984299803-Rectangle 618.png",
                release_date: "2016-11-16",
                directed_by: "John",
                casts: ["Paul king", "Alex"],
                duration: "1 hours 57 minutes",
                synopsis: "An epic that details the checkered rise and fall of French Emperor Napoleon Bonaparte and his relentless journey to power through the prism of his addictive",
                genre: [11, 4],
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