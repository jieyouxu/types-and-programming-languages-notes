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

4. $R'$ is the **smallest reflexive relation** on $S$ that contains $R$ by
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
