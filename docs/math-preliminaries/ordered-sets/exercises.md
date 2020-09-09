# Exercises

## Q1

> Given relation \\(R\\) on set \\(S\\); define relation \\(R'\\) as
> \\[ R' \triangleq R \cup \\{ (s, s) \mid s \in S \\} \\]
>
> That is, \\(R'\\) contains all pairs in \\(R\\) plus all pairs of the form
> \\((s, s)\\). Show \\(R'\\) is reflexive closure of \\(R\\).

\\(R'\\) is the reflexive closure of \\(R\\) iff it is the "smallest reflexive
relation \\(R'\\) that contains \\(R\\)."

Since \\(R'\\) is the union of \\(R\\) and the set
\\(\\{ (s, s) \mid s \in S \\}\\), we necessarily have the condition \\(R'\\)
contains \\(R\\).

\\[ R' = R \cup \\{ (s, s) \mid s \in S \\} \implies R' \supseteq R \\]

Now, for \\(R'\\) to be **reflexive** on \\(S\\), it must be the case that
\\[ \forall s \in S \colon (s, s) \in R' \\]

We see that this is also given by the union, since

\\[ R' = R \cup \\{ (s, s) \mid s \in S \\}
\implies R' \supseteq \\{ (s, s) \mid s \in S \\}  \\]

As \\(R'\\) contains \\( \\{ (s, s) \mid s \in S \\} \\), it necessarily
contains

\\[
\begin{mathpar}
\inferrule[Foo]{A \\ B \\\\ C}{D}
\and
\inferrule[Bar]{X}{Y}
\end{mathpar}
\\]
