import { UniqueIdProvider } from "../infra/providers/unique-id.provider"
import { ShortnerController } from "../controllers/shortner"
import { ShortUrl } from "../domain/services/short-url"
import { ShorterUrlRepository } from "../infra/database/shorter-url.repository"
import { GetOriginalUrl } from "../domain/services/get-original-url"
import { GetTopVisited } from "../domain/services/get-top-visited"

export const makeShortUrlController = () => {
  const uniqueIdProvider = new UniqueIdProvider()
  const shortenedRepository = new ShorterUrlRepository()

  const shortUrl = new ShortUrl(uniqueIdProvider, shortenedRepository)
  const getOriginalUrlService = new GetOriginalUrl(shortenedRepository)
  const getTopVisited = new GetTopVisited(shortenedRepository)

  const shortnerController = new ShortnerController(shortUrl, getOriginalUrlService, getTopVisited)
  return shortnerController
}