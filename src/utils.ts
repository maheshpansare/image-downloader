const htm = require('htm') // NOTE: Looks like Jest doesn't handle ES6 imports for this library
import { mockRecursivePartial, RecursivePartial } from 'sneer'

export const mockChrome = () =>
  mockRecursivePartial<typeof chrome>({
    runtime: {
      onInstalled: {
        addListener: jest.fn(),
      },
      sendMessage: jest.fn(),
    },
    tabs: {
      create: jest.fn(),
    },
  })

export const asMockedFunction = <T extends (...args: any[]) => any>(fn: T) =>
  fn as jest.MockedFunction<T>

const createElement = <T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  { style, ...props }: RecursivePartial<HTMLElementTagNameMap[T]>
) => {
  const element: HTMLElementTagNameMap[T] = document.createElement(tagName)
  Object.assign(element, props)
  Object.assign(element.style, style)

  return element
}

export const html = htm.bind(createElement)
