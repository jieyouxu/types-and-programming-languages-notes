## Types in Computer Science

Software engineering employs a wide range of **formal methods** to check that
some system behaviours *correctly* when compared against a predefined set of
*specifications*.

```text
                [ system ]
                     |
                     v
            < formal method(s) >  <- [ specification ]
                     |
                     v
 { is system correct w.r.t. specification? }
        |                       |
        v                       v
     { yes }                  { no }
```

But typically, there exists a trade-off between *generality* (how *expressive* the verfication
system is) and *usability* (how easy it is for the programmer to use the system), among other
aspects such as time and space complexity.

```text
     [Spectrum of Generality and Expressiveness of Formal Methods]

More general/powerful                              Less general/powerful
More cumbersome                                        More light-weight
Higher time/space complexity                                Less complex
Requires more markup                                Less markup required

<---------------------------------------------------------------------->

Hoare logic                                               Model checkers
Algebraic verification languages                     Run-time monitoring
Modal logics                                                Type systems
Denotational semantics
```

**Type systems** is one of such *lightweight formal method* for checking the system against a
specification automatically.

### Possible Definition of a "Type System"

> A type system is a tractable syntactic method for proving the absence of certain program
> behaviors by classifying phrases according to the kinds of values they compute.

- Focuses on *programs*.
- *Classification* of syntactical phrases (terms); computing a *static approximation* to the
  run-time behaviour of terms within a program.

Since type systems are *static* (i.e. type information generated at compile-time, even for
supposedly *dynamically-checked* or *dynamically-typed* languages where heap allocations are
given *type tags* to do the type-checking at run-time; but this type tag information is still
generated at compile-time).

### A Necessary Trade-off between Soundness and Completeness

Static type systems need to be **conservative** in order to remain **sound**:

- Not all ill-behaved programs can be rejected by the type system.
- Not all well-behaved programs can be accepted by the type system.

Again, this is yet another case of Gödel's Incompleteness Theorem [1] where we must pick
**soundness** (consistency) over **completeness** because we never want to mistakenly accept
a "badly-behaved" program as a well-typed program. Our programming languages are sufficiently
complex that the well-typedness of an arbitrary program is an *undecidable problem*.

> Any consistent formal system F within which a certain amount of elementary arithmetic can be
> carried out is incomplete; i.e., there are statements of the language of F which can neither be
> proved nor disproved in F.

Due to the incompleteness, the type systems are also not able to catch every possible misbehaved
program. The soundness w.r.t bad behaviours only applies to the programs for which the typing rules
of the type system can reject.

The bad behaviours are typically eliminated by the type system through *run-time type errors*, but
the **safety** (aka **soundness**) of the type system must be judged w.r.t. to its own set of
*run-time errors*.

#### Voluntary Unsoundness: An Escape Hatch

Interestingly, modern programming languages often do not necessarily have "sound" type systems in
that precisely because some programs, despite behaving well at run-time, are not syntactically
well-typed (i.e. the type systems are incomplete) – these type systems and programming languages
provide "unsafe" mechanics to allow the programmer to write logic that the type system accepts
as a true assumption but requires the programmer to manually enforce the required pre- and
post-conditions and any required invariants.

Examples:

- Java's `sun.misc.Unsafe` API.
- Rust's `unsafe` blocks and functions.
- C#'s `unsafe` keyword.

The responsibility of checking the program's run-time behaviour when unsafe sections are used
is then left to the programmer.

> "With great power comes great responsibility"
>
> – The Peter Parker Principle

Some reseachers are exploring the possibility of elevating the soundness of a type system from
just *syntactical soundness* up to *semantic soundness* – that is, a *synatictically sound* program
is necessarily *semantically sound*, but a *semantically sound* program is not necessarily
*synatically sound* (e.g. Rust `unsafe` sections). See the RustBelt project [2], [3].

### Working Together: Automatic Systems with Hints from the Programmer

Type systems are automatic proof systems that typically also requires assistance from the
programmer to suggest intent by providing *type annotations*.

```rust
fn add(x: u8, y: u8) -> u8 {
    x + y
}
```

Here, the `: TypeName` and `-> TypeName` are Rust's syntactical type annotations.

Rust enforces these type annotations for public APIs to preserve backwards compatibility of
crates.

Usually, a programming language keeps these annotations as light as possible without hindering
type-checking so programmers do not need to type as much. Although, types also serve as excellent
*executable documentation* that cannot become out of date.

### Efficiency of Type Systems

It is *insufficient* for type systems to be **sound** – these type systems typically also need to
be **efficient** so programmers don't have to suffer from long compile times, or in the case of
dynamically type-checked languages, don't need to suffer from high run-time performance penalty.

<p align="center">
    <img
        src="https://imgs.xkcd.com/comics/compiling.png"
        title="XKCD 303: Compiling"
        alt="XKCD 303: Compiling"
    />
</p>

### Branches of the Study of Type Systems

Within CS, there are two branches of the study of type systems:

1. More practical approach w.r.t. to programming languages.
2. More abstract (connections between various "pure typed lambda-calculi" and logics).

[1]: https://courses.maths.ox.ac.uk/node/view_material/2333
[2]: https://plv.mpi-sws.org/rustbelt/popl18/paper.pdf
[3]: https://www.ralfj.de/blog/2017/01/20/paris-rust-meetup.html
