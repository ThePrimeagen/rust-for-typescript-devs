---
title: "Iterators"
description: "An introduction into Iterators"
---

### Iterators
These are one of the greatest features of rust.  They make it so easy to write
easy code without high abstraction cost

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### What is an iterator
Sometimes its easy to mistake an iterator for an array method in JavaScript

```typescript
const result = [1, 2, 3].map(x => x + 1);
```

This is not an iterator.  This iterates over an array and applys a transform
function to each element and accumulates them.

What is an iterator?
*to the drawing board*

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### TypeScript has them
* Map#values() is an iterator
* Object#values() is not an iterator

** Show example via node **

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

** the big takeaway here is that iterators are not really extensible **
** this is a problem of the language itself **

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### Rust

Lets first start with some simple vector operations. Lets print each item in a
vector.

* Vector -> Iterator
  * let iter, while loop
  * get index
  * add 3
  * do we need this while loop?
    * show example in node

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

