---
title: Blockchain Privacy und Energiewirtschaft (Blog)
category: news
date: 2017-09-10 10:28:28
tags:
- blockchain
- privacy
- energiewirtschaft
- ipfs
---

(von Thorsten Zoerner)
[Original in Englisch](https://medium.com/@zoerner/blockchain-privacy-and-energy-markets-8bc2311f99cf/)


_Beim Schreiben dieses Artikels sitze ich am Müritzsee und beobachte den Sonnenuntergang. Okay, es gibt in der Ferienzeit sicher bessere Dinge zu tun als die Verarbeitung einiger Kundendatensätze, die wir in den letzten Tagen bei **STROM**DAO erhalten haben. Aber selbst wenn ich die Bestellungen bearbeiten wollte, ich kann es nicht, und niemand sonst könnte es._

Das Problem, mit dem ich konfrontiert bin, ist ein Datenschutzkonzept, das wir für **STROM**DAO geschaffen haben, um alle Aspekte der Privatsphäre in einem Konsens-System zu schützen.

**Unsere Datenschutzbestimmungen lauten im Allgemeinen**
- Konsens ist ein öffentlicher Zustand
- Persönliche Daten sind privat
- Benutzer müssen sich niemals um die Privatsphäre sorgen
- Die Kommunikation zwischen zwei Marktpartnern ist privat
- Kommunikation (Daten) endet immer in einem öffentlichen Zustand (bzw. in dessen Änderung)

## Wettbewerbsnachteil

Andere Marktteilnehmer setzen andere Regeln um und haben zu Beginn einen großen Vorteil. Um sich für einen Stromtarif anzumelden, werden Sie viele Ihrer persönlichen Daten abgefragt. Ihr Name, Ihr Geburtstag für Bonitätsprüfungen, E-Mail, etc... etc... etc..... 

In einer modernen IT-Welt werden diese Datenbestände in einer Cloud gespeichert. Sie als Urheber haben nun Lesezugriff und derjenige, mit dem Sie sich angemeldet haben, hat Vollzugriff. Generell könnte der Anbieter alles mit den Daten machen. Wobei Datenalalysen oder Kundenwertberechnungen noch die harmloseren Möglichkeiten sind. Persönliche Daten in 'der Cloud' könnten kopiert, an Dritte übertragen, wieder neu zusammengefügt werden usw.... Sobald personenbezogene Daten in der 'dort draußen' unterwegs sind, sind diese nicht länger unter der Kontrolle ihres Besitzers (oder Urhebers).

Die Umsetzung unserer Regeln hat das geändert. Personenbezogene Daten werden als 'Asset' angesehen, das immer dem Urheber/Eigentümer gehört. Wenn Sie sich also für einen Stromtarif anmelden, erstellt Ihr Browser für Sie ein RSA-Schlüsselpaar. Parallel dazu holen Sie sich von uns als Ihren Vertragspartner einen öffentlichen Schlüssel abgeholt. Die Blockchain-Technologie und ihr Adressschema ermöglichen es, zwei Parteien zustandslos (stateless) zu identifizieren und den richtigen öffentlichen Schlüssel zu erhalten. Im Falle eines neuen Tarifs können Sie immer sehen, welche Geräte gerade über den zum Lesen der Daten jeweils notwendigen Schlüssel verfügen.

Bevor ich in die Ferien fuhr, habe ich einfach vergessen, einem Kollegen den Zugang zu unserem "Tarif-Schlüssel-Asset" zu gestatten oder diesen einfach auf mein Handy zu legen. Die neuen Aufträge, die hereinkommen, können wir jetzt bis ich wieder zuhause bin nicht bearbeiten. Denn ohne den Schlüssel sehen wir nur bedeutungslose Bytes...

Der wesentiche Unterschied bei unserem Unternehmen besteht darin, dass wir uns mehr um die Sichtbarkeit bzw. Nicht-Sichtbarkeit von Kundendaten kümmern müssen als andere Marktteilnehmer. Andererseits haben wir den Vorteil, dass es keinen zentralen Data-Lake gibt, den jemand kontrollieren könnte. Die Privatsphäre wird vom Design her an den Endanwender und dessen spezifischen Anwendungsfall delegiert (z. B. an mich zur Bearbeitung von neuen Aufträgen).

## Datenspeicherung

Bei STROMDAO verwenden wir IPFS, um alle Daten zu speichern. Sobald die persönlichen Daten erfasst sind, verschlüsselt der Benutzer sie und erstellt ein digitales Asset, das in IPFS gespeichert wird. Dies erlaubt den Zugriff auf die Bits und Bytes von jedem Computer auf der Erde, aber Sie müssen den richtigen privaten Schlüssel haben, um die Informationen zu entschlüsseln. Erst dann ergeben diese einen Sinn. Theoretisch konnte also jeder auf die verschlüsselten Daten zugreifen, aber nur einige wenige mit den richtigen Schlüsseln können die auch zielführend Daten verarbeiten.

Wie bereits erwähnt, liegt die Kontrolle beim Endanwender. Die Verwendung von IPFS bedeutet, dass der Endanwender für die Speicherung und Archivierung von Daten verantwortlich ist, solange sie für eine Aufgabe benötigt werden. Andernfalls wird es keine Kopie der Daten im IPFS-Netz vorgehalten, die für den Zugriff auf den entschlüsselten Datensatz verwendet werden könnten.

Bei unseren neuen Kunden sehen wir nur die IPFS Hashes, aber ohne den Schlüssel konnte ich meine Arbeit nicht erledigen, sie zu validieren und an unseren Stromtarif anzuschließen. Ich werde das zu Hause machen und den Kundenstatus in der STROMDAO Energie-Blockchain auf "verbunden" ändern. Dies markiert die Zustandsänderung, die erforderlich ist, wenn die Datenschutzbestimmungen befolgt werden.

## Blockchain

Blockchain-Technologie schafft Konsens. Sobald der Status des Anwenders sich geändert hat, kann jeder, der die Energie-Blockchain nutzt, auf meine Validierung zurückgreifen, ohne weitere persönliche Daten sammeln zu müssen. Dies ist eine wichtige Änderung der Spielregeln, da nun auch kleine Marktteilnehmer "Consensus as a Service" nutzen können, anstatt eine eigene Infrastruktur aufzubauen.
Die Kombination der Vorteile von IPFS sowie der Energie-Blockchain ermöglicht den Aufbau einer echten dezentralen Plattform für das Hosting von Mikrodiensten für den Energiemarkt.


