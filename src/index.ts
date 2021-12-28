import express, { Request, Response } from 'express'
import { ProblemDocument } from 'http-problem-details'
import registerwarnings from 'express-http-warning/dist/registerwarnings'

const app = express()
app.use(registerwarnings())
app.get('/', (_req: Request, res: Response) => {
  return res
    .status(200)
    .warn([
      new ProblemDocument({
        detail: 'Street name was too long. It has been shortened...',
        instance: 'https://example.com/shipments/3a186c51/msgs/c94d',
        type: 'https://example.com/errors/shortened_entry'
      })
    ])
    .send({ some: 'content' })
})
const server = app.listen(3000)
process.on('SIGINT', () => {
  server.close()
})
