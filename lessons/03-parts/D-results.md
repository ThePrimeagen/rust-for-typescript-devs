---
title: "Errors vs Values"
description: "How rust handles errors differently"
---

### F in file is for fun
To begin learning rust, lets start with some fundamental concepts

Lets read a file, name passed in via cli, and print out each line after we parse
it via json

### Errors in javascript suck
They do.  You may be use to them.  You may think they are fine, but its likely
due to lack of experience in a different paradigm to understand the value.

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

TODO: Insert success: error meme

#### TypeScript
Lets first think about typescript errors

```typescript
type Result = {
    foo: {
        bar: boolean
    }
}

async function getData(path: string): Promise<Data> {
    const result = JSON.parse(await readFile(path)) as Result;
    if (result.foo.bar) {
        return {
            ...
        };
    }
    return {
        ...
    };
}
```

So where could the errors be?

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

### JSON.parse
it throws errors.

```typescript
JSON.parse("{1");
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

### reading file...
we don't know if there could be an error or not.

```typescript
const result = JSON.parse(await readFile(path)) as Result;
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

### result.foo.bar
We technically are not performing run time checks on the data, therefore it can
be a bit dangerous


1. you need runtime checks
2. you run the risk...

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

### TypeScript: Error is Control flow
when an error is thrown... where does your code go?

![Chrome Debugger](./images/chrome-oops.png)

unless you are explicitly catching...  but this has its own problems

```typescript
let data: Type;
try {
    data = JSON.parse("...") as Type;
} catch (e) {
    // handle this?
    // leave function early?
    // What if handling this requires catching?
}

// ... the rest of the function ...
```

Bonus fun...

Will it parse?

```typescript
1> JSON.parse("1")
2> JSON.parse("\"hello?\"")
5> JSON.parse("[]")
6> JSON.parse("[\"foo\", undefined]")
3> JSON.parse(undefined)
4> JSON.parse("undefined")
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

### Super bonus round
```typescript
1> JSON.stringify(undefined)
2> JSON.stringify({foo: undefined})
3> JSON.stringify([undefined])

class Foo {
    #field
    constructor() {
        this.#field = 5;
    }
}
4> JSON.stringify(new Foo())
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

### But this is a smaller point, in a larger picture
What methods throw errors?

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

### So how does Rust solve this?

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

### Rust: Errors as Values

install this library.  this library is a great way to make errors accessible.

```bash
cargo add anyhow
cargo add serde --features=derive
cargo add serde_json
```

creating your own errors in rust isn't hard, its just a bit more involved.  So
instead of talking about how to create errors, we are going to address how to
work with errors.

* read this from a file
```bash
touch data
```

put this data into the file.  notice one of the lines is bad json
```json
{"foo": 5}
{"foo": 6}
{"foo": 7}
{"foo: 5}
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

```rust
fn foo() -> Result<Value, Error> {
    let result = some_external_service().await?; // The question mark means i
    // don't want to handle the error
    // return it to the calling function

    //... parse json ...
    let result = serde_json::from_str(result); // <--- Result error object
    match result {
        Ok(value) => // value contains the JSON parsed object,
        Err(err) => // an err happened, so sorry, parse(undefined) doesn't exist)
    }
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

### What does that mean?
1. you know, by the signature, if the method throws an error
1. there is syntax to return the error (shorthand (?))
1. you can handle the error in line without returning it

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


