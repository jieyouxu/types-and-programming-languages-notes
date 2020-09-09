# Type Systems and Language Design

It's very difficult to try to "retrofit" a type system for a language that did not have
type checking designed in mind. Even if a language did, great care has to be taken to ensure that
no unsound public APIs are introduced which might not be able to be removed for a long time due to
a language's stability/backwards-compatibility guarantees.

Even for Rust, there still is not a formally specified denotational semantics for its type system
(there's a *subset* of Rust's semantics, with work being spearheaded by the
[RustBelt Project][rustbelt], such as the
["Stacked Borrows" paper by Ralf Jung et al.][stacked-borrows]). Work is also being done on the
front of sepcifying operational semantics for Rust's type system in [miri].

Typically, the concrete *syntax* ([always subject to extensive bike-shedding][law-of-triviality])
for statically-typed languages is going to be more involved than untyped or dynamically-typed
languages in order for the type-checker to have sufficient type information to work with at
compile-time. When the type system is properly taken into account, designing a clean, comprehensible
and intuitive syntax is easier.

[rustbelt]: https://plv.mpi-sws.org/rustbelt/
[stacked-borrows]: https://plv.mpi-sws.org/rustbelt/stacked-borrows/paper.pdf
[miri]: https://github.com/rust-lang/miri
[law-of-triviality]: https://en.wikipedia.org/wiki/Law_of_triviality
