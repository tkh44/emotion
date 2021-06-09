---
'@emotion/css': patch
'@emotion/native': patch
'@emotion/react': patch
'@emotion/serialize': patch
---

Avoid creating TypeScript interfaces that extend `Array`. Refactored those to type aliases which should improve TypeScript performance slightly when checking those types.
