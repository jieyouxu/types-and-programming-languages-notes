# Sets, Relations and Functions

## Sets

- Curly braces to list the **elements** a set explicitly: \\(\\{\dots\\}\\)
- Set comprehension by construction: \\( \\{ x \in S \mid \dots \\} \\)
- Empty set: \\( \varnothing \\)
- Set difference of \\( S \\) and \\( T \\): \\( S \setminus T \\)
- Cardinality of set \\( S \\): \\( \lvert S \rvert \\)
- Powerset of set \\( S \\): \\( \mathcal{P}(S) \\)

## Natural numbers

- Set of natural numbers denoted by \\( \mathbb{N} = \\{ 0, 1, \dots \\} \\)
- A set is **countable** iff its elements can form an injective mapping into
  the elements of the natural numbers.
- A set is **countably infinite** iff its elements can form a bijection to the
  elements of the natural numbers.

## \\(n\\)-place relation

- An **\\(n\\)-place relation** on the collection of sets
  \\( S_1, \dots, S_n \\) is a set of tuples
  \\( R \subseteq S_1 \times \cdots \times S_n \\) of elements from each of the
  \\( S_i \\) sets.

  - The elements \\( s_1 \in S_1 \\) to \\(s_n \in S_n \\) are *related by
    \\( R \\)* \\( \Longleftrightarrow (s_1, \dots, s_n) \in R \\)

- A **one-place relation** on a set \\(S\\) is a **predicate** on \\(S\\).

  - \\( P \\) is true for an element \\( s \in S \\)
    \\( \Longleftrightarrow s \in P \\).
  - Often written as \\( P(s) \\) where
    \\( P \colon S \to \\{ \top, \bot \\} \\).

- A **two-place relation** \\(R\\) on a two sets \\(S\\) and \\(T\\) is a
  **binary relation**.

  - Often written \\( s R t\\) instead of \\((s, t) \in R)\\) for elements
    \\(s \in S\\) and \\(t \in T\\).
  - If \\(S = U \land T = U\\), \\(R\\) is a binary relation on \\(U\\).

## Domain and range

- The **domain** \\(dom(R)\\) of relation \\(R\\) on sets \\(S\\) and \\(T\\)
  is
  \\[ \\{ s \in S \mid \exists t \in T \colon (s, t) \in R \\} \\]
- The **range** \\(range(R)\\) of relation \\(R\\) on sets \\(S\\) and \\(T\\)
  is
  \\[ \\{ t \in T \mid \exists s \in S \colon (s, t) \in R \\} \\]

## Partial function and total function

- The relation \\(R\\) on sets \\(S\\) and \\(T\\) is a **partial function**
  from \\(S\\) to \\(T\\) iff
  \\[ \forall s \in S, t_1, t_2 \in T \colon
      (s, t_1) \in R \land (s, t_2) \in R \rightarrow t_1 = t_2 \\]

- Iff \\( dom(R) = S \\) in addition, \\(R\\) is a **total function**
  (or simply function) from \\(S\\) to \\(T\\).

## Defined and undefined

- For the **partial function** \\(R\\) from \\(S\\) to \\(T\\), \\(R\\) is
  **defined** on argument \\(s \in S\\) iff \\(s \in dom(R)\\), and
  **undefined** otherwise.

- \\( f(x)\uparrow \\) or \\( f(x) = \uparrow \\) means \\(f\\) is **undefined**
  on input \\(x\\); and
- \\( f(x)\downarrow \\) means \\(f\\) is **defined** on input \\(x\\).

> It is important to distinguish between **undefined** versus
> **failure**. Some functions may **fail** for certain inputs, which is a legit
> and observable result, versus **divergence**.
>
> A function that can fail can be either partial (i.e. can also diverge) or
> total (either return a result or fail explicitly). It is written
> \\( f(x) = fail \\) when \\(f\\) returns a failure result on input \\(x\\).
>
> A function from \\(S\\) to \\(T\\) that may fail is really a function from
> \\(S\\) to \\(T \cup \\{ fail \\}\\), where \\( fail \\) is NOT an element
> of \\(T\\). [*]

[*]: There *may be* optimization tricks such as `Option<NonZeroU32>`
     that make use of the invariant of `NonZeroU32` that it can never be `0`
     to use that special value to indicate the `Option` is `None`. This is sound
     *precisely* because the cardinality of `Option<NonZeroU32>` matches the
     cardinality of `u32`. Here, `0u32` is NOT an element of `NonZeroU32`!

## Perservance of predicate

- Given binary relation \\(R\\) on set \\(S\\) and predicate \\(P\\) on \\(S\\),
  \\(P\\) is **preserved by** \\(R\\) iff
  \\[ \forall s, s' \in S \colon (s, s') \in R \land P(s) \to P(s') \\]
