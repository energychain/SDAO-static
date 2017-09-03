---
title: Zählerstandsgangmessung
category: news
date: 2017-06-29 09:23:36
tags:
- zählerstandsgang
- smartmeter
- businessobject
- abrechnung
- smartcontract
- stromnzv
- entwicklung
---
# Einführung Teil 1

Erhalten Sie eine praktische Einführung in die Verwendung der Blockchain Technologie für die Energiewirtschaft. Es werden die Smart Contracts, sowie die Business Logik vorgestellt. 

Mit Hilfe von praktischen Snappins können Sie direkt in den Maschinenraum schauen und lernen so die Besonderheiten der Blockchain als Konsensraum näher kennen. 

## § 12 Abs. 4 der StromNZV

> **Soweit es für die Umsetzung eines variablen Tarifs im Sinne von § 40 Absatz 5 Satz 1 des Energiewirtschaftsgesetzes erforderlich ist, haben Netzbetreiber Netznutzern eine Bilanzierung und Abrechnung auf Basis von Zählerstandsgängen für diejenigen Einspeise- und Entnahmestellen zu ermöglichen, deren Einspeise- und Entnahmeverhalten mit intelligenten Messsystemen im Sinne des Messstellenbetriebsgesetzes ermittelt wird.**

(Quelle: https://www.gesetze-im-internet.de/stromnzv/__12.html)

Die **STROM**DAO hat im Business Object für die Energy Blockchain die geeigneten Verfahren geschaffen, um eine zeitnahe Bilanzierung von Stromverbrauchs oder Stromerzeugung gewährleisten. Eine Sammlung von Smart Contracts werden mit Hilfe von Business-Regeln in die bestehenden Prozesse integriert oder bilden eine neue Wertschöpfungskette im autarken Betrieb.

## Zählerdaten
In der Energy Blockchain der **STROM**DAO haben Zählpunkte die Möglichkeit selbständig ihre Werte zu setzen. Hierzu wird eine Transaktion ausgeführt, die mit dem privaten Schlüssel des Zählpunktes signiert wird. 

Diese Transaktion kann ausgeführt werden von:
- Messdatensystem
- Simulationsumgebung
- Letztverbraucher / Erzeuger
- MS CONS (Metered Services Consumption report message)
- Abrechnungssystem (nicht empfohlen!)
- Externer Messdienstleister 
- SmartMeter Gateway 

Im folgenden wird das Business Object verwendet, um zunächst Zählerstände in die Blockchain zu schreiben. Dies soll Sie vertraut im Umgang mit den Werkzeugen machen.

Zählerdaten Demo (Snappin): [JS Fiddle öffnen](https://jsfiddle.net/zoernert/86kug7uy/31/?utm_source=website&utm_medium=embed&utm_campaign=86kug7uy)

### Was im Hintergrund geschieht

Sobald Sie die Demo Seite für die Zählerdaten geladen haben, wurde im Hintergrund ein neues Schlüsselpaar (Privater Schlüssel/Öffentlicher Schlüssel) erstellt. Aus dem öffentlichen Schlüssel wurde eine Ethereum Adresse abgeleitet, welche nun im Feld *BC Address* angzeigt wird, mit 0x beginnt und insgesamt 42 Zeichen lang ist. 

Es ist sichergestellt, dass nur Sie mit ihrem privaten Schlüssel eine Transaktion signieren können, die zu dieser öffentlichen Adresse passt. Jeder Teilnehmer der Blockchain kann somit Transaktionen eindeutig einem privaten Schlüssel zuordnen, ohne diesen selbst zu kennen.

### Zählerstand schreiben/abrufen

Tragen Sie nun unter *Reading* im Eingabefeld einen Zahlenwert ein und klicken Sie auf *Update*. Etwa 30 Sekunden später wird Eine neue Box erscheinen, welche einen Transaktionshash enthält. Ein Transaktionshash kann als Nachweis für die Durchführung einer Transaktion gesehen werden. Alle Teilnehmer der Blockchain können prüfen, ob dieser Hash in der Blockchain als Konsens eingearbeitet wurde - oder nicht. 

Mit der Übermittlung der ersten Ablesung, haben Sie bereits den Konsens verändert, der durch die Blockchain sichergestellt wird. Smart Contracts, Nodes, User der Blockchain wissen nun, dass jemand einen Messwert geschrieben hat. Wer dieser *Jemand* ist, kann man nicht nachvollziehen.

Klicken Sie nun erneut auf Lookup. Es sollte Ihr Zählerstand und der Zeitstempel angezeigt werden. 

Probieren Sie nun mit einmal einen Lookup mit folgenden Adressen aus:
- 0xAb93aA1C714FeB6D3B16DeF77cB9D25b291E5c9C
- 0x83F8B15eb816284ddcF2ff005Db7a19196d86ae1
- 0xeDF09275b593F44E896b0deee40FAdED91d76585

### Fragen zur Vertiefung
- Wie können Sie herausbekommen, wer 0xAb93aA1C714FeB6D3B16DeF77cB9D25b291E5c9C ist?
- Können Sie selbst Messwerte als 0xAb93aA1C714FeB6D3B16DeF77cB9D25b291E5c9C schreiben? (Probieren Sie es aus...)
- Wie sieht der Algorithmus aus, um aus Zählerstandsdaten einen abrechenbaren Wert zu machen?


***

# Einführung Teil 2

Im Teil 1 dieser Einführung wurden die Grundlagen geschaffen, mit denen Zählerstände sicher und unveränderbar in die **STROM**DAO Blockchain geschrieben werden. Verwendet wurde das Business Object, welches eine Abstraktion zwischen dem Protokoll der Blockchain Technologie als Konsensinstrument und den Prozessen (Ablesung, Protokollierung,...) als Werkzeug zur Veränderung des Konsens. 

## Settlement

Im Kontext der Energy Blockchain wird die Bestimmung der abrechnungsrelevanten Strommenge beschrieben durch die Differenz von zwei Zählerständen des gleichen Zählers.

`Settlement = Zählerstand 2 - Zählerstand 1`

Zu beachten ist, dass folgende Settlements nicht mehr einen Zählerstand beachten dürfen, die vor `Zählerstand 2` geschrieben wurden. Dies ist bei Verwendung der Blockchain Technologie gegeben, da die gebildeten Blöcke immer eine aufsteigende Reihenfolge haben und somit die Zählerstände in chronologischer Reihenfolge vorliegen.

## Clearing

Dem Settlement (der Bestimmung der Energiemenge) angeschlossen ist das eigentliche Clearing. Aus der Energiemenge wird ein Geldbetrag ermittelt, welcher in der Gegenrichtung zur Stromlieferung erfolgen.

## SmartContract

Transaktionen, welche in die Blockchain aufgenommen werden, haben immer das Ziel, den Konsens zu verändern. Welche Veränderung eine bestimmte Transaktion tatsächlich bewirkt, bestimmen die Regeln in einem SmartContract.

```javascript
contract SingleMeterClearing is owned {
	
	mapping(address=>uint256) public share;
	uint256 public total_shares=0;
	TxHandler public stromkonto;
	MPReading public reading;
	address public meterpoint;
	uint256 public last_reading;
	uint256 public energyCost;
	bool public becomeTo;
	
	function SingleMeterClearing(TxHandler _stromkonto,MPReading _reading,address _meterpoint,uint256 _cost,bool _becomeTo) {
		stromkonto=_stromkonto;
		meterpoint=_meterpoint;
		reading=_reading;
		energyCost=_cost;
		becomeTo=_becomeTo;
	}
	

	function clearing() onlyOwner {
			uint256 time;
			uint256 power;		
			(time,power)=reading.readings(meterpoint);
			for(uint256 i=0;i<accounts.length;i++) {
				uint256 factor=share[accounts[i]];
				if(becomeTo) {
					stromkonto.addTx(accounts[i],address(this),((power-last_reading)*energyCost)*factor,(power-last_reading)*factor);
				} else {
					stromkonto.addTx(address(this),accounts[i],((power-last_reading)*energyCost)*factor,(power-last_reading)*factor);
				}			
			}
			last_reading=power;
			Cleared(power,accounts.length);
	}
	
}
```

Der vollständige Vertrag ist auf [GitHub](https://github.com/energychain/StromDAO-BusinessObject/blob/master/smart_contracts/StromDAO-BO-SC-Commissioning.sol) veröffentlicht. 

## Factory Contracts

In der **STROM**DAO Energy Blockchain existieren einige spezielle SmartContracts, welche lediglich das Ziel haben, dass ein bestimmter anderer SmartContract damit erstellt werden kann. 

Als Nutzer der Energy Blockchain kann man durch Verwendung der Factory SmartContracts sicherstellen, dass die Regeln der resultierenden Verträge immer dem Regelwerk der Factory entsprechen.

```javascript
contract SingleMeterClearingFactory {

	MPReading public reading;
	
	function SingleMeterClearingFactory(MPReading _reading) {
		reading=_reading;		
	}
	
	function build(TxHandler _stromkonto,address _meterpoint,uint256 _cost,bool _becomeTo) returns(SingleMeterClearing) {
			SingleMeterClearing smc = new SingleMeterClearing(_stromkonto,reading,_meterpoint,_cost,_becomeTo);
			smc.transferOwnership(msg.sender);			
			return smc;		
	}
	
}

```

Diese SingleMeterClearingFactory wurde vom der **STROM**DAO unter der Adresse `0x7b49a618D88949C8f594149616Ce155b314DfbE5` veröffentlicht und wird vom Business Objekt verwerndet.

## Stromkonto SmartContract

Aufgabe des Stromkonto SmartContract ist es Buchungssätze entsprechend Konten zuzuordnen. Jeder Buchugssatz besteht mindestens aus einem `Von`, einem `An` und einem `Betrag`, wobei `Von`/`An` eine beliebige Blockchain Adresse sein kann. 

Der Stromkonto SmartContract führt für jede Adresse eine Soll und eine Haben Summe, die zu beide zu Beginn auf 0 gesetzt sind. 

Buchungssatz:
`Von AdresseA an AdresseB Betrag X`

Wird folgender Code ausgeführt:
```javascript
...
		balancesSoll[_von]+=_betrag;		
		balancesHaben[_an]+=_betrag;		
...
```

D.h. gelöst wird die Herausforderung, dass eine Blockchain keine negativen Werte (Besitz) anzeigen kann, da in einem Konsenssystem etwas nicht-nicht vorhanden sein kann. 

### Fragen zur Vertiefung
- Wie kann man den Saldo eines Stromkonto ermitteln?
- Entspricht eine Adresse des Zählers immer auch der Adresse des Stromkontos? 
- Benötigt man historische Messdaten? 
- Können Verbräuche geschätzt werden? (Welche Konsequenz hat dies?)

***

# Einführung Teil 3

Im Teil 2 dieser Einführung wurden SmartContracts als Regelwerke vorgestellt, welche den Konsens in der  **STROM**DAO Energy Blockchain verändern. 

In diesem Teil wird nun das [Business Object](https://www.npmjs.com/package/stromdao-businessobject) verwendet, um aus den Zählerständen (Teil1) unter Anwendung der SmartContracts (Teil2) tatsächliche Buchungen zu machen.

## Stromkonto (optional)

Damit wir die Buchungen für die Stromkunden vornehmen können, wird ein Stromkonto benötigt. Hierzu existiert ein Factory Smart Contract, der das Anlegen eines Stromkontovertrages übernimmt und Sie im Anschluss zum Eigentümer des Vertrages macht.

Stromkonto anlegen (Snappin): [JS Fiddle öffnen](https://jsfiddle.net/zoernert/dhrf18um/5/?utm_source=website&utm_medium=embed&utm_campaign=dhrf18um)

**Hinweis:**
Für diese vereinfachte Einführung wird ein fester Stromkontovertrag mit der Addresse `0x19BF166624F485f191d82900a5B7bc22Be569895` verwendet. Dieser spezielle Stromkontovertrag besitzt einige zusätzliche Merkmale für Entwickler und benötigt _keine Berechtigungen_! (Der Aufbau von Berechtigungsstrukturen ist nicht Bestandteil dieser Einführung).


## Settlement/Clearing anlegen

In dieser Einführung verwenden wir eine vereinfachte Abrechnung, bei der eine direkte Umrechnung von Strommenge in Abrechnungsbetrag angenommen wird. 


Clearing anlegen (Snappin): [JS Fiddle öffnen](https://jsfiddle.net/smuemd/ma4kwx8e/)

Merken Sie sich nach dem Anlegen Ihres Clearing auch diese Adresse. Selbstverständlich können Sie alternativ zu Ihrer eigenen Adresse (s.h. Teil 1), auch eine andere (gültige) Adresse als `MeterPoint` angeben.


## Zwischenstand

Sie sollten jetzt insgesamt 3 Adressen und deren Bedeutung kennen:
1. Stromkonto
2. Settlement/Clearing
3. MeterPoint

Diese 3 Adressen sind nun *verdrahtet* über das Regelwerk, das sich hinter den jeweiligen SmartContracts verbirgt. Sie haben das **STROM**DAO Business Object verwendet, um diese Verdrahtung vorzunehmen. 

## Dokumentation

Die Dokumentation zum Business Object finden Sie unter http://docs.stromdao.de/code/ . Bislang zum Einsatz kamen die Objekte:
- **MPR** = MeterPointReading (in Teil 1)
- **Stromkonto** 
- **SingleClearing**
- **StromkontoProxyFactory**
- **SingleClearingFactory**

## Introspect

Neben der Verwendung in eigenen Anwendungen, können die Objekte und Methoden des Business Objects auch über die [Introspect Seite](https://demo.stromdao.de/introspect.html) aufgerufen werden. Theoretisch könnte der gesamte End-To-End Test damit realisiert werden. 

Da die Introspect Seite auf einem Server der **STROM**DAO gehostet ist; zur Veranschaulichung der Beispiele jedoch der Dienst von *JS Fiddle* genutzt wurde, wird ihr privater Schlüssel beim Aufruf ein anderer sein. 

Dies führt dazu, dass Sie Zählerstände mit einer anderen Adresse signieren und nicht Eigentümer des Stromkonto sowie des Clearings sind. 

Probieren Sie die Objekte und Methoden gerne noch einmal mit Introspect aus, um mit einer der wichtigsten Eigenschaften der Blockchain vertraut zu werden: Dezentraler Konsens. 

## End-To-End Test
End-To-End Test (Snappin): [JS Fiddle öffnen](https://jsfiddle.net/zoernert/rr90uqdq/6/?utm_source=website&utm_medium=embed&utm_campaign=rr90uqdq)

Auf dieser Seite können Sie nun Zählerstände eingeben. Dann ein Settlement/Clearing durchführen und letztendlich einzelne Transaktionen zwischen zwei Adressen verbuchen.

**TIPP** Es wird keine automatische Aktualisierung durchgeführt. Sie müssen auf aktualisieren klicken :)

