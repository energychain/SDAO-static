---
title: Offene Marktkommunikation – MSCONS für den Peer-To-Peer Stromhandel
date: 2017-08-24 12:33:52
category: news
tags:
- edifact
- mscons
- marktkommunikation
- businessobject
---
**Warum noch mal kann ich meinen Strom nicht mit meinem Nachbarn tauschen? Physikalisch passiert dies ja bereits ganz gut, nur im realen Stromhandel leider nicht. Das größte Problem ist, dass das man zwar alles machen kann, es aber nicht kommunizieren kann. Anders ausgedrückt, selbst wenn mir der Nachbar einige Cent für den Strom geben sollte, müsste er diesen noch einmal bei seinem Versorger bezahlen, denn dieser wird mit ihm die Strommenge abrechnen, die der Zähler anzeigt. Also auch die Strommenge, die aus der Nachbarschaft stammt.**

*„Mit der MSCONS ist u. a. ein diskriminierungsfreies Energie-Daten-Management (EDM) möglich“* – steht auf der [Wikipedia Seite](https://de.wikipedia.org/wiki/MSCONS) für die Marktkommunikation. Die Marktkommunikation ist verantwortlich, dass aus Zählerständen letztendlich Euro-Beträge auf der Rechnung des Kunden werden.

Die Blockchaintechnologie hat das Potential den Zugang zur Marktkommunikation tatsächlich frei von Diskriminierung zu gestalten. Der [Showcase des MSCONS Moduls](https://fury.network/ipfs/QmSfJjVJVvZhZKoKh1sgrhxQjZUvBY3xRFPWTdLfEFCs2Q/base.html) der **STROM**DAO zeigt, wie jeder (der es will) frei von Diskriminierung und Zugangshürden auch mit der gewachsenen [Handelswelt des BDEW](http://www.edi-energy.de/) kommunizieren kann.  Der Strom kann mit dem Nachbarn getauscht werden, weil man es jetzt auch kommunizieren kann.

Alle Transaktionen werden bei einer Blockchain öffentlich gemacht unter den Teilnehmern. Man kann zwar den Teilnehmer nicht direkt identifizieren, die Technologie stellt allerdings sicher, dass man nur dann eine Transaktion machen kann, wenn man auch das notwendige (digitale) Gut besitzt. Ein großer Unterschied zu klassischen Währungssystemen und den damit verbundenen Geldgeschäften. In der konventionellen Finanzwelt bringt man einen Überweisungsbeleg zur Bank, damit diese das Geld transferieren kann. Bei einer Blockchain macht man den Transfer öffentlich, was soviel bedeutet, wie das jeder weiß, dass Konto X an Konto Y etwas überwiesen hat. Die Blockchain ist in ihren Daten ein großes Verzeichnis von Transaktionen (Kontobewegungen), welches diskriminierungsfrei für alle Teilnehmer einsehbar ist. Die Blockchain ist damit ein Medium zur Kommunikation von Bewegungsdaten.

In der Stromwelt kann man diese Eigenschaft noch effizienter nutzen, da die Marktkommunikation ohnehin einen Anspruch hat offen für alle zu sein, um die Zuständigkeiten im Netzbetrieb sauber abgebildet zu bekommen. Der Tausch des Stroms mit dem Nachbarn kann als reiner Tokentausch verstanden werden, wie es Sebnem in [ihrem Beitrag](https://medium.com/@sebnem/token-model-for-energy-part-2-review-of-the-grid-token-model-4b3ecefe286c) beschreibt. Genau so ist es in Brooklyn beim dortigen Micro Grid passiert. Wenn alle das gleiche Kommunikationsmedium verwenden, dann ist der Stromhandel auch kein Problem.

Bei der **STROM**DAO mussten wir allerdings feststellen, dass für eine Öffnung der Marktkommunikation an alle Teilnehmer des Stromnetzes, es auch notwendig ist, die bestehenden Strukturen und Verfahren zu bedienen. Als Schnittstelle fungiert das sogenannte [BusinessObject](https://www.npmjs.com/package/stromdao-businessobject), welches mit über 10.000 Downloads von Entwicklern im Juli 2017, bereits heute die weltweit am häufigsten eingesetzte Verbindung zwischen Blockchain und Energiemarkt ist.
