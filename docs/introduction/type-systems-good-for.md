## What are Type Systems Good For?

### Error Detection

Static type checking systems can detect and thus catch certain errors early, at compile-time.

How much of such errors that can be caught by the type checking system depends on the type system's
*expressiveness*. A *more expressive* type system typically allows the programmer to encode more
information about data types and operations defined w.r.t. to those data types, which the type
system can use these encoded information to check for certain errors.

- Languages which support *dependent typing* can express array bounds checks by encoding an array
  or vector's length in the types, so that bounds checking can be eliminated at run-time because
  the static type system can prove the absence of certain out-of-bounds access at compile-time.

An [example in Idris]:

```haskell
-- Natural numbers: base case 0, or inductively define as successors of 0.
-- e.g. 1 == S Z, 2 == S (S Z), and so on for all natural numbers.
data Nat = Z | S Nat

-- A vector is also inductively defined; it is either an empty list `Nil`, or elements appended
-- to the empty list via `(::)`. Notice that the vector's length is encoded in its type,
-- specifically with it's `Nat` type in `Vector k a`, which is parametric over both its length `k`
-- and element type `a`.
data Vector : Nat -> Type -> Type where
    Nil  : Vector Z a
    (::) : a -> Vector k a -> Vector (S k) a

-- When two vectors are concatenated, the length of the resulting vector `r` is the sum of the
-- lengths of the two input vectors `n` and `m` respectively.
-- This invariant is encoded at the type level by the type-level expression `(n + m)`.
concat : Vector n a -> Vector m a -> Vector (n + m) a
concat Nil       ys = ys
concat (x :: xs) ys = x :: app xs ys
```

An expressive type system can also serve as a valuable *maintenance tool*, in that refactoring
code can be made relatively painless by revealing which sites still have inconsistent typing.

### Abstraction

Type systems can typically be used to enforce *modularity* in larger software projects that allows
the programmer to enforce *structure* as well as how public APIs can be used, subject to
*visibility* and *accessibility*.

The API surface of a module then typically becomes the *type of the module* – a well-defined
contract between the provider and its users.

Then, the possibility of hiding-away implementation details facilitates **abstraction**, to allow
dependency on well-defined interfaces instead of possibily constantly-changing implementation
details.

### Documentation

Types typically also serve to be useful when trying to read programs. Consider the following two
snippets, written in JavaScript and TypeScript, respectively.

```javascript
function add(a, b) {
  return a + b;
}
```

```typescript
function add(a: number, b: number): number {
  return a + b;
}
```

In the JavaScript version, we have no guarantee that we can even add `a` and `b` together, needless
to say what the results of the addition is. We might produce a `string` as the result of adding
`"a" + "b"`, when we might expect a `number` as the result. We don't really know what it is doing –
what argument it takes, and what return value it yields.

In languages with stronger static type systems, we can often encode the possibility of missing
return values, and possible failure with types too (versus possibility of forgetting `null` checks):

For example, in Rust, there is a [`checked_add`] function defined for all primitive integer types
which explicitly requires the user to account for the possibility of addition overflow.

```rust
assert!(1u8.checked_add(u8::MAX) == None);
```

These types are able to encode valuable information that we can use to supplement our documentation
so that not only are certain conditions documented, but that they are also statically checked
and verified by our compilers.

In Haskell and other programming languages that can guarantee *purity*, when effects are needed
they are typically encoded in the types too.

```haskell
-- We can guarantee purity here – no external state will be modified.
add :: Int -> Int -> Int

-- We can explicitly see that we are doing I/O as side effects in the type signature,
add_with_logging :: Int -> Int -> IO Int
```

Such types are also invaluable when it comes to guaranteeing public API stability and detecting
breaking changes, especially when many libraries and projects today use [semver] for versioning
and stability indication.

### Language Safety

What consitutes "*safety*" within a programming language is subject to what the language itself
defines as its guaranteed "*safety*". Typically, it constitutes as what you *cannot* do to harm
yourself in a particular language.

> A language's provided **safety** guarantees are guarantees that the language will protect its own
> *abstractions*.

An example of this may be trying to write to a sequential buffer. A "memory-safe" language such as
Rust may provide safe APIs that prevents the programmer from writing out-of-bounds memory, or else
the program explicitly crashes or [*panics*] to prevent illegal access. We say that Rust protects
its abstraction of memory safety by [explicitly enforcing bounds check for read and write access] to
such arrays/slices.

```rust
let v = vec![0, 2, 4, 6];
println!("{}", v[6]); // it will panic!
// alternatively, use the `get` or `get_mut` methods to explicitly handle potential failure:
match v.get(6) {
    Ok(_) => { unreachable!(); }
    None => { println!("index out-of-bounds"); }
}
```

Contrast this with C, where memory-safety is not guaranteed by the language and the responsibility
of ensuring in-bounds memory access is delegated to the programmer – i.e. out-of-bounds memory
access is **undefined behaviour** and behaviour is subject to the particular compiler, optimization
level, memory model and underlying operating system (if there is an OS!). Ideally, the OS would
terminate the process if it detects illegal memory access through [*paged virtual memory*], but this
is not guaranteed. On embedded systems where you *don't have an OS*, this probably results in
corrupted memory – the hardware is totally free to summon demons!

```c
// WARNING: undefined behaviour – here be dragons!
#include <stdio.h>
int main() {
    int x[] = {0, 2, 4, 6};
    // this *could* segfault, could print garbage, could summon a dragon.
    printf("x[6] = %d\n", x[6]);
}
```

Other examples of safety rules include (non-exhaustive):

- Lexical scoping
- Guarantess on call stack
- Aliasing XOR mutation (e.g. Rust's [ownership and borrowing rules] encoded by `&` and `&mut`
  statically, or [`Borrow`] and [`BorrowMut`] dynamically, as well as other types and constructs)

An important distinct to make is that

$$
\text{language safety} \neq \text{static type safety}
$$

Since language safety guarantees are typically enforced by both *static checks* (i.e. *syntactical
soundness checks*) **and** *dynamic checks* (i.e. *semantic soundness checks*).

- An example of this is Rust's [`assert!`] checks, for which

  > unsafe code relies on `assert!` to enforce run-time invariants that, if violated could lead to
  > unsafety.
  >
  > — excerpt from [`std::assert` documentation]

And so, we establish that

$$
\text{language safety} =
    \text{syntactical soundness (static checks)}
    \cup \text{semantic soundness (dynamic checks)}
$$

Even if these "safe" languages provide safe operations for which the language provides checks
that guarantee the integrity of their abstractions, theese languages typically also provide
facilities for bypassing these checks – either for performance reasons, or because there may be
perfectly sound programs that are rejected by the type system which is purposefully conservative
to preserve soundness.

An example of this is the `unsafe` "escape hatch" provided by Rust – the programmer is allowed
to bypass bounds checks, for example, but the responsibility of ensuring that the resulting program
is semantically sound is up to the programmer.

The vector `Vec` type provides an **unsafe** [`set_len`] method which forces the length of the
vector to be a programmer-specified length. The language now does not do safety checks at run-time,
but instead the responsibility of checking the required safety conditions are delegated to the
programmer. That is, ensuring that

> - The `new_len` **must** be less than or equal to `capacity()`.
> - The elements at `old_len..new_len` **must** be initialized.
>
> – excerpt from [`set_len` safety conditions]

are now the responsibilities of the programmer. A [`debug_assert!`] is used in the implementation
to do checks in debug builds, but such assertions are optimized out for release builds.

In fact, an important reason as to why `unsafe` "escape hatches" are required even in "safe"
languages is for [Foreign Function Interfacing (FFI)]. When a safe language calls over to another
language (irrespective of whether the other language is safe or unsafe), they almost certainly
will have *different safety guarantees* for which the **safety guarantees may not be preserved over
FFI boundaries**.

[Cardelli (1996)] provides another perspective of language safety: a language can be considered
safe when run-time errors are "*trapped*", which causes the program to halt execution immediately
(or via exceptions), while "*untrapped*" programs may allow execution to proceed – then a "safe"
language in this perspective is one that **prevents untrapped errors at run-time**.

Safety guarantees typically also have impacts on portability – when there are no safety guarantees
for certain operations, and that the definition of the language leaves out what to do, then such
behaviour is *unspecified* – aka "**Undefined Behaviour (UB)**". The compiler is typically free
to do whatever it wishes when it encounters such UB, and typically UB behaves *differently* in
different architectures and OS versions. In constrast, a well-typed program will produce identical
results (up to allowed differences such as floating-point precision) under "correct"
implementations.

### Efficiency

Types provide *additional information* for the compilers w.r.t. to machine instruction selection
as well as what optimizations are *safe* to perform.

In safe languages that have a rich static type system, certain dynamic checks (e.g. bounds check)
can be eliminated because there is sufficient type information that the compiler can use to
*statically prove* that no out-of-bounds access can possibly occur.

An example in Rust (compile this in Godbolt, try `O3` versus turning off optimization, where
panicking branches are not eliminated). Godbolt link: <https://godbolt.org/z/EM6cTQ>.

```rust
pub fn main() {
  // by construction and type annotation, we know that `v` is an integer array consisting of exactly
  // 3 `u8` elements.
  let mut sum = 0;
  let v: [u8; 3] = [1, 2, 3];

  // by induction on this for-loop, we know that `i` can ever take a value in the inclusive range
  // [0, 2].
  for i in 0..v.len() {
    // the compiler has sufficient information to prove that the `v[i]` access *cannot* be
    // out-of-bounds, so we don't need to generate `panic` branches for potential out-of-bounds
    // array index access.
    sum += i;
  }

  println!("sum = {}", sum);
}
```

Even compilers and interpreters for languages such as JavaScript which heavily relies on dynamic
duck-typing and doesn't have a rich type system try *hard* to deduce and infer type information to
try to perform optimizations.

An example of this is the [V8 JavaScript engine] which does Just-In-Time (JIT) compilation of
JavaScript code at run-time, which can accumlate run-time type information inductively.

<figure>
    <img
        src="https://imgs.xkcd.com/comics/optimization.png"
        title="XKCD 1691: Optimization"
        alt="XKCD 1691: Optimization"
        loading="lazy"
    />
    <figcaption>XKCD 1691: Optimization</figcaption>
</figure>

### Further Applications

Type systems can also help to enforce *security*. For example, there are research languages which
attempt to [encode security syntactically by annotating the flow of information].

Type systems can also be used to define templates for serialization/deserialization *automatically*
through code-gen, provided sufficient type information is available. A great example of this is
provided by the [`serde`] library in Rust – the programmer can simply define a `struct` or `enum`,
and have the library derive the relevent serialization/deserialization through macros.

Type systems (albeit very powerful ones) can be used for *automatic theorem proving*. Examples
of this include [Coq] or [Agda].

[example in Idris]: https://www.idris-lang.org/pages/example.html
[`checked_add`]: https://doc.rust-lang.org/std/primitive.i32.html#method.checked_add
[semver]: https://semver.org/
[*panics*]: https://doc.rust-lang.org/std/macro.panic.html
[explicitly enforcing bounds check for read and write access]: https://doc.rust-lang.org/alloc/vec/struct.Vec.html#indexing
[*paged virtual memory*]: https://en.wikipedia.org/wiki/Virtual_memory
[ownership and borrowing rules]: https://doc.rust-lang.org/rust-by-example/scope/borrow.html
[`Borrow`]: https://doc.rust-lang.org/alloc/borrow/trait.Borrow.html
[`BorrowMut`]: https://doc.rust-lang.org/alloc/borrow/trait.BorrowMut.html
[`assert!`]: https://doc.rust-lang.org/std/macro.assert.html
[`std::assert` documentation]: https://doc.rust-lang.org/std/macro.assert.html
[`set_len`]: https://doc.rust-lang.org/std/vec/struct.Vec.html#method.set_len
[`set_len` safety conditions]: https://doc.rust-lang.org/std/vec/struct.Vec.html#safety-1
[`debug_assert!`]: https://doc.rust-lang.org/std/macro.debug_assert.html
[Foreign Function Interfacing (FFI)]: https://en.wikipedia.org/wiki/Foreign_function_interface
[Cardelli (1996)]: https://dl.acm.org/doi/book/10.5555/547964
[V8 JavaScript engine]: https://en.wikipedia.org/wiki/V8_(JavaScript_engine)
[encode security syntactically by annotating the flow of information]: http://people.csail.mit.edu/polikarn/publications/lifty.pdf
[`serde`]: https://github.com/serde-rs/serde
[Coq]: https://coq.inria.fr/
[Agda]: https://github.com/agda/agda
