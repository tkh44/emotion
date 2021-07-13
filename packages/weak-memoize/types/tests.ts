import weakMemoize from '../src'

interface Foo {
  bar: 'xyz'
}

declare class Qwe {
  answer: number
}

// $ExpectType Foo[]
weakMemoize((arg: Foo) => [arg])({ bar: 'xyz' })

// $ExpectError
weakMemoize((arg: string) => [arg])('foo')

// $ExpectError
weakMemoize((arg: Foo) => [arg])(42)

// $ExpectError
weakMemoize((arg: string) => [arg])
// $ExpectError
weakMemoize((arg: number) => [arg])
// $ExpectError
weakMemoize((arg: boolean) => [arg])
// $ExpectError
weakMemoize((arg: symbol) => [arg])
// $ExpectError
weakMemoize((arg: null) => [arg])
// $ExpectError
weakMemoize((arg: undefined) => [arg])

weakMemoize((arg: () => void) => [arg])
weakMemoize((arg: Map<any, any>) => [arg])
weakMemoize((arg: Set<any>) => [arg])
weakMemoize((arg: Qwe) => [arg])
