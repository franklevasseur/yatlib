import exithook from 'async-exit-hook'
import fs from 'fs'
import _ from 'lodash'
import path from 'path'
import yargs from 'yargs'
import yatlib from '.'
import { Logger } from './logger'

type Argv = {
  path: string
}

const YATLIB_ENV = 'YATLIB'
const logger = new Logger()

const isTestFile = (f: string) => {
  return /.+\.test\.(?:js|ts)$/gm.test(f)
}

const exploreDir = (dir: string): string[] => {
  const dirContent = fs.readdirSync(dir)

  const entryStats = dirContent.map((f) => {
    const fullPath = path.join(dir, f)
    const fileStat = fs.statSync(fullPath)
    return {
      fullPath,
      isDir: fileStat.isDirectory()
    }
  })

  const files = entryStats
    .filter((f) => !f.isDir)
    .map(({ fullPath }) => fullPath)
    .filter(isTestFile)

  const subDirContents: string[] = _(entryStats)
    .filter((f) => f.isDir)
    .flatMap((subdir) => exploreDir(subdir.fullPath))
    .value()

  return [...files, ...subDirContents]
}

const findAndRunTestFiles = (logger: Logger, rootDir: string) => {
  logger.info(`Looking for test files in dir "${rootDir}"`)
  const testFiles = exploreDir(rootDir)
  for (const f of testFiles) {
    logger.debug(`requiring file "${f}"`)
    require(f)
  }
}

const runSingleFile = (logger: Logger, filePath: string) => {
  logger.debug(`requiring file "${filePath}"`)
  require(filePath)
}

const afterAllTest = () => {
  const { tests } = yatlib
  const testCount = tests.length
  const successCount = tests.filter((t) => t.success).length
  logger.info(`Total: ${successCount}/${testCount}`)
  const failingTestCount = testCount - successCount
  if (failingTestCount > 0) {
    logger.error(`${failingTestCount} tests are failing`)
    process.exit(1)
  }
  process.exit(0)
}

const main = (argv: Argv) => {
  process.env[YATLIB_ENV] = '1'
  process.chdir(process.cwd())

  const root = path.resolve(process.cwd(), argv.path)
  const rootStat = fs.statSync(root)
  if (rootStat.isDirectory()) {
    findAndRunTestFiles(logger, root)
  } else {
    runSingleFile(logger, root)
  }

  exithook(afterAllTest)
}

yargs
  .command(
    ['$0'],
    'Launch YATLIB',
    {
      path: {
        description: 'Path where to look for test files.',
        type: 'string',
        alias: 'p',
        required: true
      }
    },
    (argv) => {
      main(argv)
    }
  )
  .help().argv
