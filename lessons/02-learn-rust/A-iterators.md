---
title: "Iterators"
description: "Iterators in rust are sooo much better."
---

### Ok lets start coding.
enough of this talking biz, its coding time. I have always been under the
impression its easier to learn with my hands than my eyes.

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

### There are 3 big things to cover to be able to use rust
1. Iterators
1. Options
1. Results

These are three big items to understand about rust.  Once you get those, it
becomes easier to work with rust initially.

I even think that it makes learning the borrow checker a bit easier.

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

and we can start with `.map`

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

* (in case you forgot) a closure is defined

```rust
// defining a closure
|x| {
    //... body with a return
    return x * 5;
}

// without body
|x| x * 5
```

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

Let's whiteboard what happens here.

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

`map(|(idx, item)|` is an example of destructuring.

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
    .count(); // prints 1
```

What will i print?
``` rust
    let how_many_items: usize = vec![1, 2, 5, 9, 4]
        .iter()
        .skip(2) // skips the first two
        .take_while(|&&x| x > 4) // i can explain the && later,
                                 // but know its pattern matching
        .for_each(|x| println!("{}", x));
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

What is 0 cost abstractions? Lets demonstraight it with a little example.

```rust
let b: Vec<i32> = vec![1, 2, 3]
    .iter()
    .map(|x| x * 3)
    .filter(|x| x > 5)
    .map(|x| x * 10)
    .collect();
```

This code would "compile to" something like this
```rust
let a = vec![1, 2, 3];
let mut b = vec![];
for i in 0..a.len() {
    let x = a[i] * 3;
    if x > 5 {
        let x = x * 10;
        b.push(x);
    }
}
```

```typescript
let b = [1, 2, 3]
    .map((x) => x * 3)
    .filter((x) => x > 5)
    .map((x) => x * 10);
```

This code would "compile to" something like this
```typescript
function map_1(x: number): number {
    return x * 3;
}

function filter_1(x: number): boolean {
    return x > 5;
}

function map_2(x: number): number {
    return x * 10;
}

let a = [1, 2, 3];
let b = [];
for (let i = 0; i < a.length; ++i) {
    b.push(map_1(a[i]));
}
let c = [];
for (let i = 0; i < b.length; ++i) {
    if (filter_1(b[i])) {
        c.push(b[i]);
    }
}
let d = [];
for (let i = 0; i < c.length; ++i) {
    d.push(map_2(c[i]));
}
```

*likely* v8 will optimize some of this away.  To what extent, i don't have the
faintest clue.

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

