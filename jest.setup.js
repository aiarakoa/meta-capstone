/**
 * JSDOM does not implement global "open" function
 */
window.open = jest.fn();

const mockWinAssign = jest.fn();

const oldWindowLocation = window.location;

HTMLAnchorElement.prototype.click = jest.fn();

global.window.URL.createObjectURL = jest.fn();

beforeAll(() => {
  delete window.location;
  window.location = Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(oldWindowLocation),
      assign: {
        configurable: true,
        value: mockWinAssign,
      },
    },
  )
})

afterAll(() => {
  // restore location
  window.location = oldWindowLocation;
})