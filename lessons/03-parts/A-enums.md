---
title: "Enums"
description: "An introduction into enums"
---

### Lets just jump right in.
The thing we will tackle first may seem like an odd thing to start with.

Remember, this isn't a course to teach you how to program, this is a course to
teach you how to program rust and assuming you have programming knowledge

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

### TypeScript
They are plain, and people hate them...

```typescript
enum Foo {
    Bar,
    Baz,
    Buz,
}

enum Foo2 {
    Bar2 = "Thing",
    Baz2 = "Thang",
    Buz2 = "Thung",
}

console.log("foo", Foo, "foo2", Foo2); // what does this do?

```

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

```typescript
foo {
  "0": "Bar",
  "1": "Baz",
  "2": "Buz",
  "Bar": 0,
  "Baz": 1,
  "Buz": 2
}

foo2 {
  "Bar2": "Thing",
  "Baz2": "Thang",
  "Buz2": "Thung"
}
```

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

```typescript
enum Foo {
    Bar,
    Baz,
    Buz,
}

function testFoo(_foo: Foo) {
}

testFoo(4);
```

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

### Reminder
TypeScript isn't necessarily typesafe.

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
1. rust enums are like nothing you have ever seen
1. rust enums are like `type Foo = string | number` in typescript but not really
1. rust enums will blow your mind...

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

### Lets Program them,
I don't just want to show you, i want you to experience it for yourself

* basic definition
* basic usage
* impl
* adding types
* usage
* adding generics

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

### Lets do a small exersize
Lets read a file and create a list from the file contents.
1. The file content will be separated by new lines
1. The file may contain strings or numbers
1. Create an array filled with numbers and strings...

### Example file
```bash
hello world
1
5
welcome to front-end masters, teaching rust
7
91
subscribe to my yt :)
```

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

### EXAMPLE CODE
```rust
use anyhow::Result;

#[derive(Debug)]
enum CoolEnum {
    Num(isize),
    Str(String),
}

fn main() -> Result<()> {
    let file = std::fs::read_to_string("./enum_example")?;
    let out = file
        .lines()
        .map(|x| {
            return x.parse::<isize>()
                .map_or(CoolEnum::Str(x.to_string()), |x| {
                    return CoolEnum::Num(x);
                });
        })
        .collect::<Vec<CoolEnum>>();

    for o in &out {
        if let CoolEnum::Num(x) = o {
            println!("cool enum {}", x);
        }
    }

    return Ok(());
}
```

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

### Now... we know about errors right?

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

### Now ... we know about Options right?

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

### enums...
```rust
enum Result<V, E> {
    Ok(V),
    Err(E),
}

enum Option<V> {
    None,
    Some(V),
}
```

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

### mind blown

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

