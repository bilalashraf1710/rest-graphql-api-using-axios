import { setupWorker } from 'msw'
import { resthandlers } from './restMockHandlers'
import { graphqlhandlers } from './graphqlMockHandlers'
const worker = setupWorker(...resthandlers, ...graphqlhandlers)
worker.start()
export default worker
