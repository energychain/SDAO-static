var api="https://fury.network/";

function auth() {	
	$.post( api+"api/auth",{extid:node.wallet.address,secret:node.wallet.privateKey.substr(0,10)},function( data ) {
		data=JSON.parse(data);		
		token=data.token;	
		console.log(token);
		if($.qparams("hash")!=null) {			
			  loadOrder($.qparams("hash"));
		}
		$('#getTarif').removeAttr('disabled');
		if($.qparams("plz")!=null) {
			$('#plz').val($.qparams("plz"));
			getTarif();
		}
	});	
}

function loadOrder(ipfsHash) {
	$.get(api+"ipfs/"+ipfsHash+"/vertrag.consumer.rsa.txt",function(data) {
		var extkey = node._key(node.RSAPrivateKey);
		order=JSON.parse(atob(extkey.decrypt(data,'base64')));
		if(order) {
			$.each(order,function(a,b) {
					$("#"+a).val(b);			
			});
			$('#ap').html((order.arbeitspreis).toLocaleString());
			$('#gp').html((order.grundpreis).toLocaleString());
			$('#tarifinfo').show();
			console.log(order);
		}
	});	
	$.get(api+"ipfs/"+ipfsHash+"/vertrag.provider.rsa.txt",function(data) {
		var extkey = node._key(node.RSAPrivateKey);
		order=JSON.parse(atob(extkey.decrypt(data,'base64')));
		if(order) {
			$.each(order,function(a,b) {
					$("#"+a).val(b);			
			});
			$('#ap').html((order.arbeitspreis).toLocaleString());
			$('#gp').html((order.grundpreis).toLocaleString());
			$('#tarifinfo').show();
			console.log(order);
		}
	});		
}
function orderNow() {
	var targetkey="-----BEGIN PUBLIC KEY-----\n";
	targetkey+="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCW7sa/HfTmCSD/68ZZmEz50X04\n";
	targetkey+="oiA2LYGirgOr0OUBnqokDjQkAzk+zIJ8Te3Xe7GaeunDhJzilzwQkS51JOuHoKvk\n";
	targetkey+="NlcXyqGUZtafevkeg0qYZDMmJjRg2X/EBlXY8UyWwU4dp6zW446LRbrn7JvcIhqp\n";
	targetkey+="rAHwYD84zRynHqXn/QIDAQAB\n";
	targetkey+="-----END PUBLIC KEY-----";
	var extkey = node._key(targetkey);
	var terms={};
	var sharedSecret={};
	sharedSecret.account=node.wallet.address;
	sharedSecret.secret=node.wallet.privateKey;
	sharedSecret.RSAPublicKey=node.RSAPublicKey;
	
	$.each($('.terms'),function(a,b) {
			terms[b.id]=$(b).val();	
	});	
	var content= extkey.encrypt(JSON.stringify(terms),'base64');
	var shared=extkey.encrypt(JSON.stringify(sharedSecret),'base64');
	
	targetkey=node.RSAPublicKey;
	extkey = node._key(targetkey);
	var private= extkey.encrypt(JSON.stringify(terms),'base64');
	
	
	$.post( api+"api/auth",{extid:node.wallet.address,secret:node.wallet.privateKey.substr(0,10)},function( data ) {
		data=JSON.parse(data);		
		token=data.token;	

		files=[]
		files.push( {
			 name:"vertrag.provider.rsa.txt",
			 content:btoa(content)
		});
		files.push( {
			 name:"vertrag.consumer.rsa.txt",
			 content:btoa(private)
		});	
		files.push( {
			 name:"shared.rsa.txt",
			 content:btoa(shared)
		});		
		files.push( {
			 name:"node.info.txt",
			 content:btoa(JSON.stringify({account:node.wallet.address,pk:node.wallet.privateKey,rsa:node.RSAPublicKey}))
		});
		
		$.post(api+"api/ipfs/set?token="+token,{bucket:"liefervertrag",obj:JSON.stringify(files),token:token},function(data) {
					data=JSON.parse(data);			
					console.log("Gespeichert unter",data.ipfsroot);			
					$('#tarifinfo').hide();
					$('#txhash').html(data.ipfsroot);
					$('#danke').show();						
		});	
	});	
}
function getTarif() {
	$('#tarifinfo').hide();
	$('#getTarif').attr('disabled','disabled');
	if($('#plz').val().length!=5) return;
	$.get( api+"prices/"+$('#plz').val()+"/3020?token="+token,function(data) {		
		
		data=JSON.parse(data);
		if(data.Price.length<1) {
			location.href="https://kleinerracker.de/tarife-iframe?Reseller=c3ec23a16304f8d6c8692dcac2343c05&Dynamic=1&products=PP_dynamisch_eingeschr_3;&a=;&b=PPE02V06;&c=PPE10V01;&d=PPE07V02;&e=PPE04V06;&f=PPE05V04;&g=PPE03V01;&h=PPE08V01;&i=PPE01V02;&j=PPE12V01;&k=PPE11V0001;&l=PPE13V01;&m=PPE14V0;&n=PPE15V0;&o=PPE16V0;&z=;";
		}
		$.each(data.Price,function(a,b) {
				$('#ap').html((b.UpGross).toLocaleString());
				$('#ap').attr('data-p',b.UpGross);
				$('#mp').html((Math.round((b.BpGross/12)*100)/100).toLocaleString());
				$('#gp').html((Math.round(b.BpGross*100)/100).toLocaleString());
				$('#gp').attr('data-p',Math.round(b.BpGross*100)/100);
				$('#city').html(b.City);
				$('#tarifinfo').show();	
		});
		var terms="<table class='table table-striped'>";
		terms+="<tr><th>"+data.Elements["PPE01"].Name+"</th><td>"+data.Elements["PPE01"].Value+"</td></tr>";		
		terms+="<tr><th>"+data.Elements["PPE02"].Name+"</th><td>"+data.Elements["PPE02"].Value+"</td></tr>";	
		terms+="<tr><th>"+data.Elements["PPE03"].Name+"</th><td>"+data.Elements["PPE03"].Value+"</td></tr>";
		terms+="<tr><th>"+data.Elements["PPE04"].Name+"</th><td>"+data.Elements["PPE04"].Value+"</td></tr>";		
		terms+="<tr><th>"+data.Elements["PPE05"].Name+"</th><td>"+data.Elements["PPE05"].Value+"</td></tr>";	
		terms+="<tr><th>"+data.Elements["PPE07"].Name+"</th><td>"+data.Elements["PPE07"].Value+"</td></tr>";			
		terms+="</table>";
		terms+="<input type='hidden' class='terms' id='"+data.Elements["PPE01"].Name+"' value='"+data.Elements["PPE01"].Value+"'>";
		terms+="<input type='hidden' class='terms' id='"+data.Elements["PPE02"].Name+"' value='"+data.Elements["PPE02"].Value+"'>";
		terms+="<input type='hidden' class='terms' id='"+data.Elements["PPE03"].Name+"' value='"+data.Elements["PPE03"].Value+"'>";
		terms+="<input type='hidden' class='terms' id='"+data.Elements["PPE04"].Name+"' value='"+data.Elements["PPE04"].Value+"'>";
		terms+="<input type='hidden' class='terms' id='"+data.Elements["PPE05"].Name+"' value='"+data.Elements["PPE05"].Value+"'>";
		terms+="<input type='hidden' class='terms' id='"+data.Elements["PPE07"].Name+"' value='"+data.Elements["PPE07"].Value+"'>";
		terms+="<input type='hidden' class='terms' id='arbeitspreis' value='"+$('#ap').attr('data-p')+"'>";
		terms+="<input type='hidden' class='terms' id='grundpreis' value='"+$('#gp').attr('data-p')+"'>";
		$('#terms').html(terms);
		$('#getTarif').removeAttr('disabled');
		
	});	
}

$.qparams = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results==null){
	   return null;
	}
	else{
	   return decodeURI(results[1]) || 0;
	}
}

var extid="1234";
var token="";

if($.qparams("extid")!=null) {
		extid=$.qparams("extid");
}


var node = new document.StromDAOBO.Node({external_id:extid,testMode:true,rpc:"https://fury.network/rpc",abilocation:"https://cdn.rawgit.com/energychain/StromDAO-BusinessObject/master/smart_contracts/"});

// Fill View (HTML) using JQuery
$('.account').html(node.wallet.address);

$('#orderNow').click(function() {
		$('#orderNow').attr('disabled','disabled');
		orderNow();
});

$('#plz').change(function() {
	getTarif();
	
});

$('#getTarif').click(function() {
	getTarif();
});

auth();
