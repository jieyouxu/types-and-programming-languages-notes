# Exercises

## Q1

> Given relation $R$ on set $S$; define relation $R'$ as
>
> $$
> R' \triangleq R \cup \{ (s, s) \mid s \in S \}
> $$
>
> That is, $R'$ contains all pairs in $R$ plus all pairs of the form
> $(s, s)$. Show $R'$ is reflexive closure of $R$ [TaPL].

Let $\Delta_S \triangleq \{ (s, s) \mid s \in S \}$ be the **diagonal relation**
on $S$, so that

$$
R' \equiv R \cup \Delta_S
$$

??? info "Diagonal Relation"

    Let $S$ be a set, then the **diagonal relation** on $S$, $\Delta_S$, is
    defined as

    $$
    \Delta_S \triangleq \{ (x, x) \mid x \in S \} \subseteq S \times S
    $$

1. At most one *relation* on $S$ can be the **smallest reflexive superset** of
   $R$, by **Smallest Element is Unique** theorem.

    ??? info "Smallest Element is Unique"

        ### Theorem

        - Let $(S, \leq)$ be an **partially ordered** set.
        - If $S$ has a *smallest* element, then there can only be one (**unique
          smallest element**).

        ### Proof

        Let $a, b \in S$ and both be smallest element of $S$ and, since we have
        the partial order $\leq$ (let's call it relation $R$ instead).

        Recall that partial order gives us **antisymmetry**:

        $$
        \forall x, y \in S \colon (x, y) \in R \land (y, x) \in R \to x = y
        $$

        $$
        \begin{prooftree}
            \AxiomC{$\forall x, y \in S \colon (x, y) \in R
                \land (y, x) \in R \to x = y$}
            \AxiomC{$\forall y \in S \colon a \leq y$}
            \AxiomC{$\forall y \in S \colon b \leq y$}
            \BinaryInfC{$a \leq b \land b \leq a$}
            \BinaryInfC{$a = b$}
        \end{prooftree}
        $$

2. $R'$ is a **reflexive relation** containing $R$, from

    $$
    \begin{prooftree}
        \AxiomC{$R' = R \cup \Delta_S$}
        \UnaryInfC{$R \subseteq R' \land \Delta_S \subseteq R'$}
    \end{prooftree}
    $$

    We have $R'$ is **reflexive** by **Relation Contains Diagonal Relation**
    theorem.

    ??? info "Relation Contains Diagonal Relation iff Reflexive"

        ### Theorem

        We have two equivalent definitions of a **reflexive relation**.

        #### Definition 1

        $R$ is **reflexive** iff:

        $$
        \forall x \in S \colon (x, x) \in R
        $$

        #### Definition 2

        $R$ is **reflexive** iff it is a *superset* of the
        **diagonal relation**:

        $$
        \Delta_S \subseteq R
        $$

        ### Proof

        Let $D_1$ denote definition 1 and $D_2$ denote definition 2.

        **Definition 1 $\implies$ Definition 2**:

        Proof by contraposition. Required to prove that

        $$
        \Delta_s \not\subseteq R \to \exists x \in S \colon
            (x, x) \not\in R
        $$

        Suppose that $\Delta_s \not\subseteq R$.

        $$
        \begin{prooftree}
            \AxiomC{$\Delta_S \not\subseteq R$}
            \RightLabel{(diagonal relation defn.)}
            \UnaryInfC{$\exists (x, x) \in S \times S \colon (x, x) \not\in R$}
            \UnaryInfC{$\exists x \in S \colon (x, x) \not\in S$}
            \RightLabel{(transposition)}
            \UnaryInfC{$\forall x \in S \colon (x, x) \in R$}
            \UnaryInfC{$\Delta_S \subseteq R$}
        \end{prooftree}
        $$

        **Definition 2 $\implies$ Definition 1**:

        Let $R$ be the relation that fulfills condition that
        $\Delta_S \subseteq R$.

        $$
        \begin{prooftree}
            \AxiomC{$\Delta_S \subseteq R$}
            \RightLabel{(diagonal relation defn.)}
            \UnaryInfC{$\forall x \in S \colon (x, x) \in \Delta_S$}
            \RightLabel{(subset)}
            \UnaryInfC{$\forall x \in S \colon (x, x) \in R$}
        \end{prooftree}
        $$

        Which demonstrates that $R$ is in fact **reflexive** by definition 1.

        ---

        And so the two definitions are *equivalent*.

        $$
        \begin{prooftree}
            \AxiomC{$D_1 \to D_2$}
            \AxiomC{$D_2 \to D_1$}
            \BinaryInfC{$D_1 \leftrightarrow D_2$}
        \end{prooftree}
        $$

    This means that $R'$ is a **reflexive relation containing $R$**.

3. **Every** reflexive relation containing $R$ must trivially also contain
   $\Delta_S$, by the **Relation Containing Diagonal Relation iff Reflexive**
   theorem.

4. $R'$ is the **smallest** reflexive relation on $S$ that contains $R$ by
   the **Union is Smallest Superset** theorem.

    ??? info "Union is Smallest Superset"

        ### Theorem

        Let $S_1, S_2$ be two sets. Then $S_1 \cup S_2$ is the **smallest set**
        containing both $S_1$ and $S_2$. So for any set $T$:

        $$
        (S_1 \subseteq T) \land (S_2 \subseteq T) \leftrightarrow
            (S_1 \cup S_2) \subseteq T
        $$

        ### Proof

        Prove by $A \to B \land B \to A \iff A \leftrightarrow B$:

        **Condition 1**: $(S_1 \subseteq T) \land (S_2 \subseteq T) \to
        (S_1 \cup S_2) \subseteq T$:

        $$
        \begin{prooftree}
            \AxiomC{$(S_1 \subseteq T) \land (S_2 \subseteq T)$}
            \RightLabel{(union preserves subsets)}
            \UnaryInfC{$(S_1 \cup S_2) \subseteq (T \cup T)$}
            \RightLabel{(union idempotence)}
            \UnaryInfC{$(S_1 \cup S_2) \subseteq T$}
        \end{prooftree}
        $$

        **Condition 2**: $(S_1 \cup S_2) \subseteq T \to
           (S_1 \subseteq T) \land (S_2 \subseteq T)$:

        Assume $(S_1 \cup S_2) \subseteq T$.

        $$
        \begin{prooftree}
            \AxiomC{$S_1 \subseteq (S_1 \cup S_2)$}
            \UnaryInfC{$(S_1 \cup S_2) \subseteq T$}
            \UnaryInfC{$S_1 \subseteq T$}
            \AxiomC{$S_2 \subseteq (S_1 \cup S_2)$}
            \UnaryInfC{$(S_1 \cup S_2) \subseteq T$}
            \UnaryInfC{$S_2 \subseteq T$}
            \BinaryInfC{$(S_1 \cup S_2) \subseteq T$}
            \UnaryInfC{$(S_1 \subseteq T) \land (S_2 \subseteq T)$}
        \end{prooftree}
        $$

        So, by **equivalence**, we have

        $$
        \begin{prooftree}
            \AxiomC{$(S_1 \subseteq T) \land (S_2 \subseteq T) \to
                (S_1 \cup S_2) \subseteq T$}
            \AxiomC{$(S_1 \cup S_2) \subseteq T \to
                (S_1 \subseteq T) \land (S_2 \subseteq T)$}
            \BinaryInfC{$(S_1 \subseteq T) \land (S_2 \subseteq T)
                \leftrightarrow (S_1 \cup S_2) \subseteq T$}
        \end{prooftree}
        $$

## Q2

> Here is a more constructive definition of the transitive closure of a relation
> $R$. First, we define the following sequence of sets of pairs:
>
> $$
> \begin{align}
>     R_0     &= R \\
>     R_{i+1} &= R_i \cup \{ (s, u) \mid
>         \exists t \in S \colon (s, t) \in R_i \land (t, u) \in R_i \}
> \end{align}
> $$
>
> That is, we construct each $R_{i+1}$ by adding to $R_i$ all the pairs that can
> be obtained by "one step of transitivity" from pairs already in $R_i$.
> Finally, define the relation $R^{+}$ as the union of all $R_i$s.
>
> $$
> R^{+} = \bigcup_{i} R_i
> $$
>
> Show that this $R^{+}$ is really the transitive closure of $R$.

1. At most one *relation* on $S$ can be the **smallest transitive superset**
   of $R$, by **Smallest Element is Unique** theorem.

2. $R^{+}$ is a **transitive relation** containing $R$, since by the principle
   of one-step mathematical induction. We demonstrate the proof for the
   proposition $P(i)$ that every $R_i$ (hence $R^{+}$) contains $R$, for
   $i \in \mathbb{N}$.

    1. We first show that $R^{+}$ **contains** $R$, which is trivial because by
        definition:

        $$
        R \subseteq R_0 \cup \bigcup_{i > 0} R_i = R^{+}
        $$

    2. Then we need to show that the relation is in fact **transitive**. We use
       complete induction to show this, for some $j \in \mathbb{N}$, we show
       that $\forall i, j \in \mathbb{N} \colon R_i \subseteq R_j$.

        - Assume $\exists (a, b), (b, c) \in R^{+}$.

        $$
        \begin{prooftree}
            \AxiomC{$\exists (a, b), (b, c) \in R^{+}$}
            \UnaryInfC{$\exists i \in \mathbb{N} \colon (a, b) \in R_i \land
                \exists j \in \mathbb{N} \colon (b, c) \in R_j$}
            \UnaryInfC{$(a, b), (b, c) \in R_{\max{(i, j)}}$}
            \UnaryInfC{$(a, c) \in R_{\max{(i, j) + 1}} \subseteq R^{+}$}
        \end{prooftree}
        $$

3. To show that $R^{+}$ is the **smallest** transitive relation on $S$. Let $R'$
   be some transitive relation on $S$ that contains $R$, we need to show that
   $\forall n \in \mathbb{N} \colon R_n \subseteq R'$ which means
   $R^{+} \subseteq R'$.

    - Trivially, $R_0 = R \subseteq R'$.

    - Assume that $R_n \subseteq R'$ and that $(x, z) \in R_{n+1}$:

        $$
        R_n \subseteq R' \land (x, z) \in R_{n+1} \to
            \exists y \colon (x, y) \in R_n \land (y, z) \in R_n
        $$

    - Since $R_n \subseteq R'$ these pairs are too in $R'$, and since $R'$ is
      transitive we have $(x, z) \in R'$, meaning $R^{+}$ is in fact the
      **smallest transitive relation** on $S$.

## Q3

> Suppose $R$ is a binary relation on a set $S$ and $P$ is a predicate on $S$
> that is preserved by $R$. Show that $P$ is also preserved by $R^{\ast}$.

To show that $P$ is also preserved by the **transitive and reflexive closure**
$R^{\ast}$ of $R$.

Recall that $R^{\ast}$ is the **transitive and reflexive closure** of $R$, and
is constructed by

$$
\begin{align}
    R^0      &= R \\
    R^{n+1}  &= \{ (x, y) \in S \times S \mid
        \exists z \colon (x, z) \in R^n \land (z, y) \in R^n \} \\
    R^{\ast} &= \{ (x, x) \mid x \in S \} \cup \left( \bigcup_i R^i \right)
\end{align}
$$

So, to show that $P$ is preserved by $R^{\ast}$, we need to show that
$P$ is preserved by:

1. The diagonal relation, that $P$ is preserved by $\{ (x, x) \mid x \in S \}$.
2. The transitive closure, that $P$ is preserved by
   $\left( \bigcup_i R^i \right)$.

For (1), since the diagonal relation is trivially the identity relation, since
$x = y$, if $P(x)$ holds then $P(y)$ certainly holds, and so $P$ is preserved.

For (2), $P$ is preserved by $R^0$ since $R^0 = R$. Assume, for induction, that
$P$ is preserved by $R^k$. For some pair $(x, y) \in R^{k+1}$, there must
exist some $z$ such that $(x, z), (z, y) \in R_k$. By the induction hypothesis,
$P(x)$ implies $P(z)$, which implies $P(y)$. Hence, $P$ is preserved by $R^i$
for all $i \in \mathbb{N}$, and so $P$ is preserved by $\bigcup_i R^i$ as well.
