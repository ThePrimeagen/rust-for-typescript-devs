---
title: "Rust Enums"
description: "Rust enums are the greatest thing you have ever seen"
---

### Iterators, Options, and Results
Those are the three big things to teach you... therefore, we are going to teach
you enums...

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

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

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Full code
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
    print_color(Color::Red);
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

Ok... lets make it harder

Lets add `Yellow`

First in TS and then Rust

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
I still think enums suck..

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
    fn green_parts(&self) -> bool {
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

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
First, lets write up something in typescript

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Lets see how rust does it?

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
    items.push(1);
    items.push("hello");
    items.push({ age: 1, name: "2" });
}

const justStrings: string[] = ["hello", "world"];
append(justStrings);

console.log(justStrings);
```


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
    let mut just_strings = vec!["hello", "fem"];

    append(&mut just_strings);

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

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

