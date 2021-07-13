import memoize from '../src'

// $ExpectType string[]
memoize((arg: string) => [arg])('foo')

// $ExpectError
memoize((arg: number) => [arg])
