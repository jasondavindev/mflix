import MoviesDAO from "../src/dao/moviesDAO"

describe("Projection", async () => {
  beforeAll(async () => {
    await MoviesDAO.injectDB(global.mflixClient)
  })

  test("Can perform a country search for one country", async () => {
    const kosovoList = ["Kosovo"]
    const movies = await MoviesDAO.getMoviesByCountry(kosovoList)
    expect(movies.length).toEqual(2)
  })

  test("Can perform a country search for three countries", async () => {
    const countriesList = ["Russia", "Japan", "Mexico"]
    const expectedKeys = ["_id", "title"]
    const movies = await MoviesDAO.getMoviesByCountry(countriesList, expectedKeys)
    expect(movies.length).toEqual(2788)
    movies.map(movie => {
      const movieKeys = Object.keys(movie).sort()
      expect(movieKeys).toEqual(expectedKeys)
    })
  })
})
