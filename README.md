# Financ-et-vous

Application web permettant la gestion et le remboursement de frais dans un milieu professionnel.

Un employé se connecte, accède à son compte. Il a à sa disposition la liste des frais qu’il a déclaré.
Il dispose d’une fonctionnalité permettant d’enregistrer une note de frais : titre, description et preuve de frais (ticket de caisse, justificatif, facture…) qui seront stockés dans une base de données.

Le comptable accède à son compte par connexion également. Il arrive sur une interface lui permettant de gérer les différentes demandes qui lui ont été soumises. Il peut choisir de valider la demande, la refuser ou la mettre en attente. Une fois ce choix effectué, un e-mail est envoyé automatiquement à l’utilisateur lié à la demande. La demande est enregistrée sur la base de données, et sera retransmise à l’utilisateur à sa prochaine connexion via une notification (sous réserve qu’une modification ait été faite).
