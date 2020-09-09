# Ordered Sets

## Reflexive, symmetric, transitive and antisymmetric binary relations

- A binary relation \\(R\\) on set \\(S\\) is **reflexive** iff
  \\[ \forall s \in S \colon (s, s) \in R \\]

- \\(R\\) is **symmetric** iff
  \\[ \forall s, t \in S \colon (s, t) \in R \to (t, s) \in R \\]

- \\(R\\) is **transitive** iff
  \\[ \forall s, t, u \in S \colon
  (s, t) \in R \land (t, u)\in R \to (s, u) \in R \\]

- \\(R\\) is **antisymmetric** iff
  \\[ \forall s, t \in S \colon (s, t) \in R \land (t, s) \in R \to s = t \\]

## Preorder, partial order and total order

- A **reflexive** *and* **transitive** relation \\(R\\) on set \\(S\\) is a
  **preorder** on \\(S\\).
  \\[ \text{preorder} \triangleq \text{reflexive} \land \text{transitive} \\]

  - Typically written using symbols such as \\( \leq \\) or \\( \sqsubseteq \\).
    Then,
    \\[s < t \Longleftrightarrow s \leq t \land s \ne t\\]

- A **preorder** that is *also* **antisymmetric** is a **partial order** on
  \\(S\\).
  \\[ \text{partial order} \triangleq
  \text{reflexive} \land \text{transitive} \land \text{antisymmetric} \\]

- A **partial order** \\( \leq \\) is a **total order** iff
  \\[ \forall s, t \in S \colon s \leq t \lor t \leq s \\]

## Join and meet

Given *partial order* \\(\leq\\) on set \\(S\\), and elements
\\(s, t \in S\\):

- An element \\(j \in S\\) is a **join** (aka **least upper bound**) of \\(s\\)
  and \\(t\\) iff

  1. \\( s \leq j \land t \leq j \\); and
  2. \\( \forall k \in S \colon s \leq k \land t \leq k \to j \leq k \\).

- An element \\(m \in S\\) is a **meet** (aka **greatest lower bound**) of
  \\(s\\) and \\(t\\) iff

  1. \\( m \leq s \land m \leq t \\); and
  2. \\( \forall n \in S \colon n \leq s \land n \leq t \to n \leq m \\).

## Equivalence

- A *reflexive*, *transitive* and *symmetric* relation on set \\(S\\) is
  an **equivalence** on \\(S\\).
  \\[ \text{equivalence} \triangleq
  \text{reflextive} \land \text{transitive} \land \text{symmetric} \\]

## Reflexive and transitive closure

Let \\(R\\) be a binary relation on set \\(S\\).

- The **reflexive closure** of \\(R\\) is the **smallest reflexive relation
  \\(R'\\) that contains \\(R\\)**.

  - "Smallest" means if \\(R''\\) is another reflexive relation that contains
    all pairs in \\(R\\), then \\(R' \subseteq R''\\).

- The **transitive closure** of \\(R\\) is the **smallest transitive relation
  \\(R'\\) that contains \\(R\\)**.

  - Often written \\(R^+\\).

- The **reflexive and transtive closure** of \\(R\\) is the **smallest reflexive
  and transitive relation that contains \\(R\\)**.

  - Often written \\(R^\ast\\).
