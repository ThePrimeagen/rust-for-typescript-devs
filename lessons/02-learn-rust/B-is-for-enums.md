---
title: "Rust Enums"
description: "Rust enums are the greatest thing you have ever seen"
---

### Enums in TypeScript
![Enums are bad](./images/enums-bad.png)

And I agree

So... why are we learning enums?

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

### Rust enums are incredible
They are nothing like TypeScript's enums, and a reason why rust, for a static
typed language, is so good.

<br />

So lets go over a basic set of examples

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

### TypeScript
- Create an enum `Color` with `Red`, `Blue`, and `Green` fields.
- Create a `printColor` method that prints out "red" for `Red`, ...

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

### Full Code

```typescript
enum Color {
    Red,
    Green,
    Blue,
}

function printColor(color: Color) {
    switch (color) {
        case Color.Red:
            console.log("red");
            break;
        case Color.Green:
            console.log("green");
            break;
        case Color.Blue:
            console.log("blue");
            break;
    }
}

printColor(Color.Green);
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

### Lets do the same thing in Rust
Exact same thing

1. the syntax for an equivalent enum in rust is 100% identical to ts
1. use `match` to get _near_ equivalent behavior of `switch`

i'll give you ~2 minutes, then i'll start

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

### Complete Code
```rust
enum Color {
    Red,
    Green,
    Blue,
}

fn print_color(color: Color) {
    match color {
        Color::Red => println!("red"),
        Color::Green => println!("green"),
        Color::Blue => println!("blue"),
    }
}

fn main() {
    print_color(Color::Green);
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

### ok...?
They seem the same...

Ok... lets extend our original example

Lets add `Yellow`

I'll give you a moment with `TypeScript`

(follow along pls and make you type out the full example)

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

### Complete Code
```typescript
enum Color {
    Red,
    Yellow,
    Green,
    Blue,
}

function printColor(color: Color) {
    switch (color) {
        case Color.Red:
            console.log("red");
            break;
        case Color.Green:
            console.log("green");
            break;
        case Color.Blue:
            console.log("blue");
            break;
    }
}

printColor(Color.Green);
```

### Rust's turn
Upgrade the enum in rust.

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

### Complete Code
```rust
enum Color {
    Red,
    Yellow,
    Green,
    Blue,
}

fn print_color(color: Color) {
    match color {
        Color::Red => println!("red"),
        Color::Yellow => println!("yellow"),
        Color::Green => println!("green"),
        Color::Blue => println!("blue"),
    }
}

fn main() {
    print_color(Color::Green);
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

### Ok...
I still think enums suck.. I mean technically it was the `match` statement that
made rust so good, not the enum itself. <br/>

Lets take enum's to another level

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

### Stand back, its method time
* We are going to add 2 methods to the enum in rust
* is_green
  - return true for green
* is_green_parts
  - return true for blue and yellow

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

### Next complete code

```rust
enum Color {
    Red,
    Yellow,
    Green,
    Blue,
}

impl Color {
    fn is_green_parts(&self) -> bool {
        match self {
            Color::Yellow => true,
            Color::Blue => true,
            _ => false,
        }
    }

    fn is_green(&self) -> bool {
        if let Color::Green = self {
            return true;
        }
        return false;
    }
}

fn print_color(color: Color) {
    match color {
        Color::Red => println!("red"),
        Color::Green => println!("green"),
        Color::Blue => println!("blue"),
        Color::Yellow => println!("yellow"),
    }
}

fn main() {
    print_color(Color::Red);
    Color::Green.is_green();
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

### Ok... are you impressed yet?
well, you shouldn't be.  this isn't awesome yet

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

### One small argument
Most of what rust can do, javascript can do, but differently.

You could imagen that a javascript module exists for `Color` where the function
`is_green` and `is_green_parts` are defined and exported.  But i would argue
that having to peruse through a module to know what operations are supported is
not nearly as nice as having them hang off the struct itself.  And in this
case, the enum

```javascript
import Color, { is_green } from "./colors";

// this is simply not as convenient as green.is_green();
const green = Color.Green;
if (is_green(green)) {
    console.log("i am green");
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

### I hope you are sitting down
First, lets start with typescript

* create a custom struct called Custom
  - it should have 2 fields, age: number, and name: string

* create a union type `Item` that is `number | string | Custom`
* create a method `append` to take in a list of `Item`s and push in the string `"Hello Fem!"`
* create an `Item`s array (doesn't matter if its empty or not)
* pass it to `addItem`

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

### Complete Code

TypeScript
```typescript
type Custom = {
    name: string,
    age: number,
}

type Item = number | Custom | string;

function append(items: Item[]) {
    items.push("hello fem");
}

const items: Item[] = [];
append(items);

console.log(items);
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

### One more task
* create a list of `number` and pass it to `append`

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

### How do you feel?
Do you feel you have been lied to?

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

### The rust way
Lets do the same thing, but this time the rust way, and we will do it together.

#### Instructions (in case you forgot)
* create a custom struct called Custom
  - it should have 2 fields, age: number, and name: string

* create a union type `Item` that is `number | string | Custom`
* create a method `append` to take in a list of `Item`s and push in the string `"Hello Fem!"`
* create an `Item`s array (doesn't matter if its empty or not)
* pass it to `addItem`

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


Rust
```rust
struct Custom {
    name: String,
    age: usize,
}

enum Item {
    Number(usize),
    Custom(Custom),
    String(String),
}

fn append(items: &mut Vec<Item>) {
    items.push(Item::Number(1));
}

fn main() {
    let mut items: Vec<Item> = vec![];
    append(&mut just_strings);

    let mut items: Vec<usize> = vec![];
    append(&mut just_strings); // errors
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

### Pretty dang cool?
This means no more

```typescript
if (typeof x === "number") {
    ...
}
```

or

```typescript
if ("bar" in x) {
    ...
}
```

So no more "magic" checking for types, you get named types and this works very
well with non type discriminated unions (what we made).  This is because the
discrimination exists at a language level, not a `type: string` level

#### its not all magic
Sometimes code can become a bit more verbose because of this, and that isn't as
nice to write.  But at the same time, it prevents easy errors where you forgot
to handle cases.

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

### Lets talk about Pattern Matching
Its incredible, and you can DO a lot.  Check this out

```rust
struct Custom {
    name: String,
    age: usize,
}

enum Item {
    Number(usize),
    Custom(Custom),
    String(String),
}

fn main() {
    let foo = Item::Number(5);

    match &foo {
        Item::Number(num) => println!("i am a number: {}", num),
        Item::String(str) => println!("i am a string: {}", str),
        Item::Custom(custom) =>
            println!("name: {}, age: {}", custom.name, custom.age),
    }

    match &foo {
        Item::Custom(custom) =>
            println!("name: {}, age: {}", custom.name, custom.age),
        _ => {}
    }

    match &foo {
        Item::Custom(Custom {
            age,
            ..
        }) => println!("age: {}", age),
        _ => {}
    }

    match &foo {
        Item::Custom(custom) if custom.name == "Ricky" =>
            println!("Hi, Ricky"),
        Item::Custom(custom) if custom.age > 33 =>
            println!("N64 was the best console"),
        Item::Custom(custom) if custom.age < 30  =>
            println!("Xbox was the best console"),
        _ => {}
    }
}
```

There are SO many problems that can be solved by good pattern matching, its
wild.

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

