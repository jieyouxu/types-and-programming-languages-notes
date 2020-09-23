# Ordered Sets

## Properties of Binary Relations

### Reflexive Binary Relation

A binary relation $R$ on set $S$ is **reflexive** iff

$$
\forall x \in S \colon (x, x) \in R
$$

### Symmetric Binary Relation

$R$ is **symmetric** iff

$$
\forall x, y \in S \colon (x, y) \in R \to (y, x) \in R
$$

### Transitive Binary Relation

A binary relation $R$ on set $S$ is **transitive** iff

$$
\forall x, y, z \in S \colon (x, y) \in R \land (y, z)\in R \to (x, z) \in R
$$

### Antisymmetric Binary Relation

A binary relation $R$ on set $S$ is **antisymmetric** iff

$$
\forall x, y \in S \colon (x, y) \in R \land (y, x) \in R \to x = y
$$

## Preorder, Partial Order and Total Order

### Preorder

A **reflexive** *and* **transitive** relation $R$ on set $S$ is a **preorder**
on $S$.

$$
\text{preorder} \triangleq \text{reflexive} \land \text{transitive}
$$

- Typically written using symbols such as $\leq$ or $\sqsubseteq$.

    $$
    x < y \leftrightarrow x \leq y \land x \ne y
    $$

### Partial Order

A **preorder** that is *also* **antisymmetric** is a **partial order** on $S$.

$$
\text{partial order} \triangleq
    \text{reflexive} \land \text{transitive} \land \text{antisymmetric}
$$

### Total Order

A **partial order** $\leq$ is a **total order** iff

$$
\forall x, y \in S \colon x \leq y \lor y \leq x
$$

## Join and Meet

Given a *partial order* $\leq$ on set $S$, and elements $s, t \in S$:

### Join

An element $j \in S$ is a **join** (aka **least upper bound**) of $s$ and $t$
iff

1. $s \leq j \land t \leq j$; and
2. $\forall k \in S \colon s \leq k \land t \leq k \to j \leq k$.

### Meet

An element $m \in S$ is a **meet** (aka **greatest lower bound**) of $s$ and $t$
iff

1. $m \leq s \land m \leq t$; and
2. $\forall n \in S \colon n \leq s \land n \leq t \to n \leq m$.

## Equivalence

- A *reflexive*, *transitive* and *symmetric* relation on set $S$ is
  an **equivalence** on $S$.

    $$
    \text{equivalence} \triangleq
        \text{reflextive} \land \text{transitive} \land \text{symmetric}
    $$

## Closures

Let $R$ be a binary relation on set $S$.

### Closure for a Property

For some **property** $\mathbf{P}$ of relations, the closure of the relation
$R$ (on the set $S$) for property $\mathbf{P}$ is a relation $R^{\mathbf{P}}$
such that:

1. $R^{\mathbf{P}}$ has the property $\mathbf{P}$ (closure has property).
2. $R \subseteq R^{\mathbf{P}}$ (closure contains $R$).
3. For *every* relation $R'$ where $R \subseteq R'$, if $R'$ has property
   $\mathbf{P}$ then $R^{\mathbf{P}} \subseteq R'$ (closure is smallest
   relation).

### Reflexive Closure

The **reflexive closure** of $R$ is the
**smallest reflexive relation $R^{=}$ that contains $R$**.

The **reflexive closure** $R^{=}$ of a relation $R$ on a set $S$ is given by

$$
\begin{align}
    R^{=} &= R \cup \{ (x, x) \mid x \in S \} \\
       &\triangleq \Delta_S
\end{align}
$$

- Note that $\Delta_S \triangleq \{ (x, x) \mid x \in S \}$ is used as a
  shorthand, and is called the "*diagonal relation*", "*identity relation*" or
  the "*equality relation*" for the set $S$.

!!! example "Proof Idea"

    Any *reflexive* relation containing $R^{=}$ must contain $R \cup \Delta_S$.

- If $R$ is a **reflexive** relation, then the reflexive closure of $R$ is $R$.

    - If $R$ is reflexive, then necessarily $\Delta_S \subseteq R$, so
      $R \cup \Delta_S = R$.

### Transitive Closure

The **transitive closure** of $R$ is the
**smallest transitive relation $R^{+}$ that contains $R$**.

The **transitive closure** $R^{+}$ of a relation $R$ on a set $S$
(i.e. $R \subseteq S \times S$) can be given by an inductive construction.
Let us define $R^i$ where $i \in \mathbb{N}$:

$$
\begin{align}
    R^0     &= R \\
    R^{n+1} &= R^n \circ R \\
            &= \{ (x, y) \in S \times S \mid
                \exists z \in S \colon (x, z) \in R^n \land (z, y) \in R^n \}
\end{align}
$$

And define the **transitive closure** $R^{+}$ now by

$$
\begin{align}
R^{+} &= \bigcup \limits_{i=0}^{\infty} R^i \\
      &= \{ (x, y) \mid \exists i \colon (x, y) \in R^i \}
\end{align}
$$

!!! example "Proof Idea"

    1. Prove by induction on $n$ that

        $$
        (x, y) \in R^n \land (y, z) \in R^m \to (x, z) \in R^{m + n}
        $$

    2. Use (1) to show that $R^{+}$ is transitive because

        $$
        (x, y) \in R^{+} \land (y, z) \in R^{+} \to (x, z) \in R^{+}
        $$

### Reflexive and Transitive Closure

The **reflexive and transtive closure** of $R$ is the
**smallest reflexive and transitive relation $R^{\ast}$ that contains $R$**.

We define $R^{\ast}$ through inductive construction. Let us define $R^i$ where
$i \in \mathbb{N}$:

$$
\begin{align}
    R^0     &= R \\
    R^{n+1} &= \{ (x, y) \mid
        \exists z \colon (x, z) \in R^n \land (z, y) \in R^n \}
\end{align}
$$

Then

$$
\begin{align}
    R^{\ast} &\triangleq \Delta_S \cup \left( \bigcup_i R_i \right) \\
             &= \{ (x, x) \mid x \in S \} \cup \left( \bigcup_i R_i \right)
\end{align}
$$
