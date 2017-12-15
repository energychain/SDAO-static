---
title: Stromtarif - Privatkunden
date: 2017-09-02 16:47:07
---
<HTML>
		<div class="form-group">
		    <label for="plz">Ihre Postleitzahl</label>
		    <input type="text" name="plz" id="plz" size="5" class="form-control terms">
		    <button id="getTarif" class="btn btn-default" style="margin-top:10px;" disabled="disabled">Tarif abrufen</button>
		</div>		
		<div id="tarifinfo" style="display:none">
			<h3>Unser Tarif in <span id="city"></span></h3>				
			<div class="row">				
				<div class="col-md-6">
					<h3>Arbeitspreis</h3>
					<h2 id="ap"></h2>
					<p>je Kilo-Watt-Stunde</p>
				</div>
				<div class="col-md-6">					
					<h3>Grundpreis</h3>
					<h2 id="mp"></h2>
					<p>pro Monat (<span id="gp"></span> Euro im Jahr)</p>				
				</div>						
			</div>
			<div>
			<table class="table table-striped"><tbody><tr><th>Energie-Mix</th><td>Ökostrom</td></tr><tr><th>eingeschränkte Preisgarantie</th><td>3 Monate</td></tr><tr><th>Zahlung Abschläge</th><td>monatlich</td></tr><tr><th>Vertragslaufzeit</th><td>3 Monate</td></tr><tr><th>Vertragsverlängerung</th><td>3 Monate</td></tr><tr><th>Kündigungsfrist</th><td>1 Woche</td></tr><tr><th><a href='https://stromkonto.net/' target='_blank'>Stromkonto</a></th><td>inklusive</td></tr></tbody></table>
			</div>
			<div id="terms" style="display:none"></div>
			<hr/>		
			<h2><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Vertragsnehmer/Stromkunde</h2>			
				 <div class="form-group">
					<label for="profileVorname">Vorname</label>
					<input type="text" class="form-control terms" id="profileVorname" placeholder="Ihr Vorname">
				 </div>					
				 <div class="form-group">
					<label for="profileNachname">Nachname</label>
					<input type="text" class="form-control terms" id="profileNachname" placeholder="Ihr Nachname">
				 </div>		
				<div class="form-group">
					<label for="street">Straße und Hausnummer</label>
					<input type="text" class="form-control terms" id="street" placeholder="Lieferanschrift">
				 </div>									 
				<div class="form-group">
					<label for="street">Straße und Hausnummer</label>
					<input type="text" class="form-control terms" id="street" placeholder="Lieferanschrift">
				 </div>									  
				 <div class="form-group">
					<label for="profileEmail">E-Mail</label>
					<input type="email" class="form-control terms" id="profileEmail" placeholder="Ihre Email Anschrift">
				 </div>		
				<div class="form-group">
					<label for="profilePhone">Telefonnummer</label>
					<input type="tel" class="form-control terms" id="profilePhone" placeholder="01234-567789">
				 </div>									
			<button type="submit" class="btn btn-danger" id="orderNow">jetzt wechseln &raquo;&raquo;</button>					
		 </div>
		 <div id="danke" style="display:none">
			<h2>Vielen Danke!</h2>
			<p>Ihr Stromliefervertrag ist nun in Bearbeitung. Sobald er durch den Lieferanten angenommen wurde, erhalten Sie eine Nachricht.</p>
			<h3>Referenz ID</h3>
			<h2 id="txhash"></h2>
			<p>Bitte geben Sie bei Rückfragen immer Ihre persönliche Referenz ID an.</p>
		 </div>
</HTML>
