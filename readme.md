# YATLIB

**Stands for Yet Another Test Lib**

## Why ?

Glad you asked !

Because I believe, deep down in my heart, that Jest terribly sucks and is directly responsible for the loss of years of my life that I will never get back.

**Made for programmers who meet one or more of these criterias**

- Likes Typescript
- Likes **For loops** and **Functions** (\*\***WOW**\*\*)
- Likes logging text messages in the terminal using good old fashion `console.log`s
- Doesn't like when a program swallows logs sent to the terminal
- Doesn't like when a library needs 100000 other libs to run
- Doesn't like when a library needs to "_transform_" with babel to even run your code
- Prefers coding than browsing Stack Overflow
- Doesn't mind importing the dependencies it uses

Basically,

YATLIB does **less** than Jest.

## Installation

YATLIB is not yet hosted on npm, but will be in a very short time. When this is done, you'll be able to install YATLIB like you would typically do for any node package:

```bash
npm i --save-dev yatlib
#or
yarn add --dev yatlib
```

## Usage

To use YATLIB, all you need to do is import it like this:

```ts
// some-test.test.ts
import yatlib from 'yatlib'
import validatePath from './somebadlookingpieceofcode.ts'

const main = async () => {
  await yatlib.test({
    name: '69 is not 42',
    handler: async () => {
      yatlib.expect(69).not.toBe(42)
    }
  })

  const validPaths: string[] = ['/', '/somedir', '/somedir/somefile.txt']

  for (const p of validPaths) {
    await yatlib.test({
      name: `path ${p} is valid`,
      handler: async () => {
        yatlib.expect(validatePath(p)).toBeTrue()
      }
    })
  }

  if (!yn(process.env.YATLIB)) {
    // process.env.YATLIB is defined when using YATLIB's CLI
    const { tests } = yatlib
    const testCount = tests.length
    const successCount = tests.filter((t) => t.success).length
    console.log(`Total: ${successCount}/${testCount}`)

    const failingTestCount = testCount - successCount
    if (failingTestCount > 0) {
      process.exit(1)
    }

    process.exit(0)
  }
}

main()
```

To run your test, you have 2 choices.

1. You can simply run your test like you would for any other typescript/javascript file. You can use `ts-node` or build your test using `tsc` and run the resulting `*.js` file with node.

2. You can use YATLIB's CLI. More on this in the next section.

## CLI

YATLIB comes with a CLI that allows you to run all tests located in a target directory. To use it run:

```bash
npx yatlib --path /your/tests/directory
# or
yarn yatlib --path /your/tests/directory
```

When a test file is ran by the YATLIB's CLI, the environment variable `YATLIB` is set to 1.

## How it works

YATLIB is slightly different than Jest. These differences may not seem like much but they give IMO a better product.

Instead of parsing all test files to first locate test and then run them, YATLIB runs a test when it sees one. This make the use of weird complicated test hooks like `beforeAll()` and `afterEach()` obsolete.

This is quite handy if you want to run the exact same test suite using multiple different infrastructure using a for loop.

Also, the only reason why a test would fail is if an exeption occurs inside its handler. All the expect functions do is to throw if a condition is not met. Therefore, to make your own custom expecters, all you have to do is to create a function that throws or not. Tests will pass or fail accordingly.

## Documentation

There is currently no documentation, but the package is fully typed. To learn more about a function or feature, just press on `ctrl+space` in your favorite IDE and the intellisense will give you a hand.

## Disclaimer ⚠️

YATLIB is still very early in its development and is subject to massive breaking changes.
