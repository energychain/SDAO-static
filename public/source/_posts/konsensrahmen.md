---
title: Marktregeln Konsensrahmen
category: news
date: 2017-04-26 09:14:39
tags:
- konsens
- energiewirtschaft
- strommarkt
- marktkommunikation
---
## Hintergrund

Für den Konsens der Energiebranche muss sichergestellt sein, dass Einigkeit (Konsens) über die eingespeiste und entnommenen Strommengen besteht. Geeichte Zählwerke garantieren den Marktteilnehmern, dass keine Strommenge doppelt berechnet wird, die Leitungsverluste kompensiert und keine Entnahme ohne Messung möglich ist. 

## Konsens

Die Akteure haben Einigkeit über die zu berechnende Strommenge. Hierbei gilt, dass durch die physikalischen Eigenschaften der elektrischen Energie es nicht möglich ist, dass eine Summengleichheit aus Einspeisung und Entnahme besteht. Vielmehr gilt, dass die Einspeisung zu jedem Zeitpunkt höher ist als die Entnahme. 

Zählwerke messen nur an den jeweiligen Netzanschlusspunkten. Zur Vereinfachung der Marktprozesse wird als handelbare Strommenge jedoch angenommen, dass die Einspeisemenge gleich der Entnahmemenge ist (ausgeglichene Bilanz). Die physikalisch entstehenden Ungleichheiten in der Bilanz werden durch Allgemeinkosten (Netzentgelte) kompensiert. 

Die Netzstabilität schreibt vor, dass die Bilanz aus Einspeisung=Entnahme(+Netzverluste) zu jedem Zeitpunkt ausgeglichen sein muss, um die Netzfrequenz von 50 Herz stabil zu halten. Zur Herstellung der Bedingung Einspeisung=Entnahme ist somit eine Fristenkongruenz notwendig (Mittelherkunft => Mittelverwendung).

### Definition: Konsens bei nachträglicher Fakturierung

Ist in einer Zeitdauer das Stromnetz betrieben worden (=50 Hz gehalten) und es hat eine Einspeisung und eine Entnahme stattgefunden, so kann nach dem Lieferzeitpunkt aus den Zählerständen eine gültige Abrechnung erstellt werden. Eine eingespeiste Strommenge (Watt-Stunden beim Einspeisezähler) kann eindeutig einer entnommenen Strommenge (Watt-Stunden beim Entnahmezähler) zugeordnet werden.

### Definition: Rolle der Blockchain im Strommarkt

Die Blockchain Technologie dient zur Sicherstellung der Konsensregeln. Durch die physikalischen Eigenschaften von Strom (kann im Netz nicht gespeichert werden, es entstehen Verluste beim Transport,...) müssen einige Eigenschafen der konventionellen Blockchain-Technologie modifiziert werden, damit sie im Strommarkt angewendet werden können.

Es kommen sogenannte SmartContracts zum Einsatz. Jeder SmartContract hat zwei Akteure, entsprechend der Beziehung für Lieferung und Abnahme, sowie eine Zeitdauer in der Vergangenheit und eine Liefermenge. 

```javascript
contract PowerDelivery {
    ...
    address from;
    address to;

    datetime start;
    datetime duration;
    
    uint quantity;
    ...
}
```

Für einen Konsens muss sichergestellt sein:
* Für jede Stromlieferung existiert ein gültiger SmartContract
* Hat ein SmartContract einen Lieferant/Abnehmer, so kann dieser zwar geändert, aber nicht gelöscht werden (=> Vertrag ist nur gültig, wenn Lieferant und Abnehmer gesetzt sind).
* Startzeitpunkt, Dauer und Liefermengen können geändert werden, allerdings nicht nicht nach dem Zeitpunkt des Startes plus Dauer. 
* Die Akteure müssen sich darauf verlassen können, dass es alle Zählerstandsveränderungen durch SmartContracts zur Stromlieferung abgedeckt sind.
* Die Akteure müssen sich darauf verlassen können, dass nur geeichte Stromzähler (=Gültigkeit) zum Einsatz kommen.

## Digital Asset des Strommarktes

Im Kontext der Blockchain bildet ein gültiger SmartContract für eine Stromlieferung ein digitales Gut, welches einen Besitzer hat, der sich ändern kann. Das digitale Gut hat einen Lebenszyklus, welcher sich von der Vertragserstellung bis zur Vertragserfüllung erstreckt. Der Vertrag ist erst erfüllt, sobald die Lieferbedingungen eingehalten wurden (Konsens) und der vereinbarte Wert/Preis bezahlt wurde. 

```javascript
// Erweitert um Eigentümer und Preis

contract PowerDelivery {
    ...
    address owner;
    address from;
    address to;

    datetime start;
    datetime duration;
    
    uint quantity;
    
    uint price;
    ...
}
```

Da Preis und Strommenge maßgeblich von den anderen Parametern (Dauer, Zeitpunkt) abhängig sind, muss das digitale Gut "PowerDelivery" (Stromlieferung) immer als Einheit aus allen Parametern betrachtet werden.

Bei der Implementierung im StromDAO-BusinessObject handelt es sich bei einem PowerDelivery SmartContract daher um einen elementaren (atomaren) Vertrag mit einem autonomen Lebenszyklus.
