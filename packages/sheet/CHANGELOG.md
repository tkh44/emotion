# @emotion/sheet

## 1.0.2

### Patch Changes

- [#2393](https://github.com/emotion-js/emotion/pull/2393) [`405af5ca`](https://github.com/emotion-js/emotion/commit/405af5ca01dcc0cac64227db082ce3f483e1bb46) Thanks [@layershifter](https://github.com/layershifter)! - Do not log failed rule insertions in the speedy mode for even more vendor-prefixed pseudo-elements/classes like `:-moz-focus-inner`, `:-moz-focusring`, and `:-ms-clear`.

## 1.0.1

### Patch Changes

- [`5469d003`](https://github.com/emotion-js/emotion/commit/5469d0034d055a34587e9d05332f6da4d4722b1c) [#2149](https://github.com/emotion-js/emotion/pull/2149) Thanks [@Andarist](https://github.com/Andarist)! - Do not log failed rule insertions in the speedy mode for vendor-prefixed pseudo-elements/classes like `::-moz-placeholder`.

## 1.0.0

### Major Changes

- [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf) [#1817](https://github.com/emotion-js/emotion/pull/1817) Thanks [@Andarist](https://github.com/Andarist)! - `@import` rules are no longer special-cased - they no longer are always inserted at the beginning of the stylesheet. The responsibility to put them first has been moved to a consumer of this package.

### Minor Changes

- [`4a891bf6`](https://github.com/emotion-js/emotion/commit/4a891bf6a30e3bb37f8f32031fa75a571c637d9c) [#1473](https://github.com/emotion-js/emotion/pull/1473) Thanks [@jcharry](https://github.com/jcharry)! - The new `prepend` option can make Emotion add style tags at the beginning of the specified DOM container instead of the end.

* [`dfe79aca`](https://github.com/emotion-js/emotion/commit/dfe79aca696fc688f960218b16afee197926fe71) [#1696](https://github.com/emotion-js/emotion/pull/1696) Thanks [@Andarist](https://github.com/Andarist)! - Added `hydrate` method which can be used for SSRed styles. They become a part of a sheet and can be flushed.

### Patch Changes

- [`42df3f3b`](https://github.com/emotion-js/emotion/commit/42df3f3bc01526eed61cedba106d86b9e3807f9d) [#2028](https://github.com/emotion-js/emotion/pull/2028) Thanks [@Andarist](https://github.com/Andarist)! - Generated style elements got `data-s="1"` attribute so `@emotion/cache` can recognize them as being already owned by another Emotion copy to avoid messing up existing style elements when initializing a new copy.

* [`1e4a741d`](https://github.com/emotion-js/emotion/commit/1e4a741de6424d3d9c1f3ca9695e1953bed3a194) [#1697](https://github.com/emotion-js/emotion/pull/1697) Thanks [@Andarist](https://github.com/Andarist)! - Removed mentions of `maxLength` option in types & docs as it has been removed some time ago.

## 1.0.0-rc.0

### Major Changes

- [`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63) [#2030](https://github.com/emotion-js/emotion/pull/2030) Thanks [@Andarist](https://github.com/Andarist)! - Release candidate version.

## 1.0.0-next.5

### Patch Changes

- [`42df3f3b`](https://github.com/emotion-js/emotion/commit/42df3f3bc01526eed61cedba106d86b9e3807f9d) [#2028](https://github.com/emotion-js/emotion/pull/2028) Thanks [@Andarist](https://github.com/Andarist)! - Generated style elements got `data-s` attribute so `@emotion/cache` can recognize them as being already owned by another Emotion copy to avoid messing up existing style elements when initializing a new copy.

## 1.0.0-next.4

### Patch Changes

- [`39be057b`](https://github.com/emotion-js/emotion/commit/39be057b1a0c6b76f2cb7a455cb8bc35fe875ba0) [#1997](https://github.com/emotion-js/emotion/pull/1997) Thanks [@Andarist](https://github.com/Andarist)! - Reverted the change that has started to add an empty `<style/>` element eagerly in non-production environments that has been introduced in [`v1.0.0-next.3`](https://github.com/emotion-js/emotion/blob/next/packages/sheet/CHANGELOG.md#100-next3) as this has found to be problematic for websites using `Content-Security-Policy` and a `nonce`. Instead of this `@emotion/cache` will from now on insert an empty rule in non-production environments but it will only do that if an empty rule gets actually created by the user.

## 1.0.0-next.3

### Patch Changes

- [`dc1a0c5e`](https://github.com/emotion-js/emotion/commit/dc1a0c5ed78b27fb7ce49b6296f2ca8631654cd1) [#1962](https://github.com/emotion-js/emotion/pull/1962) Thanks [@Andarist](https://github.com/Andarist)! - From now on an empty `<style/>` element gets inserted eagerly into the DOM in the constructor in non-production environments. This helps to grab used `key`s from the (JS)DOM even for sheets/caches that have not inserted any actual rules to the document yet. It allows `@emotion/jest` to find those and serialize Emotion classes properly in situations like this:

  ```js
  import styled from '@emotion/styled/macro'
  import { render } from '@testing-library/react'

  const Div = styled.div``

  test('foo', () => {
    const { container } = render(<Div />)
    expect(container).toMatchSnapshot()
  })
  ```

## 1.0.0-next.2

### Major Changes

- [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf) [#1817](https://github.com/emotion-js/emotion/pull/1817) Thanks [@Andarist](https://github.com/Andarist)! - `@import` rules are no longer special-cased - they no longer are always inserted at the beginning of the stylesheet. The responsibility to put them first has been moved to a consumer of this package.

### Patch Changes

- [`91046a8c`](https://github.com/emotion-js/emotion/commit/91046a8c188327a65daac61583ef3c4458f30afb) [#1900](https://github.com/emotion-js/emotion/pull/1900) Thanks [@Andarist](https://github.com/Andarist)! - Renamed `rehydrate` method to `hydrate` to align naming to what is already used in Emotion and React itself.

## 0.10.0-next.1

### Minor Changes

- [`dfe79aca`](https://github.com/emotion-js/emotion/commit/dfe79aca696fc688f960218b16afee197926fe71) [#1572](https://github.com/emotion-js/emotion/pull/1572) Thanks [@Andarist](https://github.com/Andarist)! - Added `rehydrate` method which can be used for SSRed styles. They become a part of a sheet and can be flushed.

### Patch Changes

- [`1e4a741d`](https://github.com/emotion-js/emotion/commit/1e4a741de6424d3d9c1f3ca9695e1953bed3a194) [#1572](https://github.com/emotion-js/emotion/pull/1572) Thanks [@Andarist](https://github.com/Andarist)! - Removed mentions of `maxLength` option in types & docs as it has been removed some time ago.

## 0.10.0-next.0

### Minor Changes

- [`4a891bf6`](https://github.com/emotion-js/emotion/commit/4a891bf6a30e3bb37f8f32031fa75a571c637d9c) [#1473](https://github.com/emotion-js/emotion/pull/1473) Thanks [@jcharry](https://github.com/jcharry)! - Accept new `prepend` option to allow for adding style tags at the beginning of the specified DOM container.

## 0.9.4

### Patch Changes

- [`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968) [#1698](https://github.com/emotion-js/emotion/pull/1698) Thanks [@Andarist](https://github.com/Andarist)! - Add LICENSE file

## 0.9.3

### Patch Changes

- [c0eb604d](https://github.com/emotion-js/emotion/commit/c0eb604d) [#1419](https://github.com/emotion-js/emotion/pull/1419) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Update build tool
