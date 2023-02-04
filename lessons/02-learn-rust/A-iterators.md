---
title: "Iterators"
description: "Iterators in rust are sooo much better."
---

### There are 3 big things to cover to be able to use rust
1. Iterators
1. Options
1. Results

These are three big items to understand about rust.  Once you get those, it
becomes easier to work with rust initially.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Lets start with iterators
I think iterators will make the easiest transition as they have the strongest
similarity in javascript.

Lets talk about `.map`

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Quick example in TypeScript
Lets go over a quick example in typescript

Lets create a script that:
- creates an list filled with 1, 2, 3
- adds 1 to each item in that list
- prints the list

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

```typescript
// what happens here?
const foo = [1, 2, 3].map(x => x + 1);
console.log(foo);
```

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Quick example in Rustlang
Now lets do it in rust!

(in case you forgot)
- creates an list filled with 1, 2, 3
- adds 1 to each item in that list
- prints the list

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

```rust
fn main() {
    let items: Vec<isize> = vec![1, 2, 3]
        .iter() // create the iterator to go over the elements in teh array
        .map(|x| x + 1) // do the plus one'ings
        .collect(); // take the iterator and put it somewhere..

    println!("items {:?}", items);
}
```

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Wanna see something cool with collect?
Well, collect is more that just "put back into array"

Collect into string!
```rust
let foo: String = vec!["this", "is", "a", "test"]
    .into_iter() // what the heck is this?  we will talk more about this
    .collect();
```

<br/>
<br/>
<br/>
<br/>

Collect into HashSet (this would be Set in JS)
```rust
let foo: HashSet<isize> = vec![1, 2, 3]
    .into_iter()
    .collect();
```

<br/>
<br/>
<br/>
<br/>

Collect into a HashMap
```rust
let foo: HashMap<String, isize> = vec!["this", "is", "a", "test"]
    .iter()
    .enumerate() // Adds the index to the iterator!
                 // one of the glories of rust is that we work with iterators
    .map(|(idx, item)| (item.to_string(), idx as isize))
    .collect();
```

<br/>
<br/>
<br/>
<br/>

Numeric fun
``` rust
let sum: usize = vec![1, 2, 3]
    .iter()
    .sum();
```

<br/>
<br/>
<br/>
<br/>

``` rust
let how_many_items: usize = vec![1, 2, 3]
    .iter()
    .skip(2) // skips the first two
    .count();
```

<br/>
<br/>
<br/>
<br/>

``` rust
let how_many_evens: usize = vec![1, 2, 3]
    .iter()
    .filter(|x| *x % 2 == 0) // we will explain the * later
    .count();
```

<br/>
<br/>
<br/>
<br/>

What about other collections?
```rust
let map = HashMap::from([
   ("foo", 1),
   ("bar", 2),
   ("baz", 3),
]);

map
    .iter()
    .for_each(|(k, v)| println!("{}: {}", k, v));
```

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Iterator way of thinking
This is an important concept which isn't in javascript

```
[Type] -> [Iterator] -> [Type]
```

This gives us 0 cost abstractions whereas with javascript, its not.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

