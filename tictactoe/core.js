var field=new Array(9);
for(var i=0;i<9;i++)
		field[i]=0;

function drawMove(caller) {
	var div=document.getElementById(caller);
	if(div.innerHTML=="") {
		div.innerHTML="X";
		field[parseInt(caller.substring(1,2))]=-1;
		v=checkField(field);
		if(v==-10)
			showResult("You Win!");
		else if(v==0)
			showResult("Draft");
		else {
			var c=minimax(field,1);
			//var c=negamax(field,1);
			//var c=alpha_beta_pruning(field,1,-Infinity,Infinity);
			document.getElementById("e"+c[1]).innerHTML="O";
			field[c[1]]=1;
			if(checkField(field)==10)
				showResult("You Lose!");
		}
	}
}

function minimax(field,turn) {
	var info=[-turn*Infinity,-1];
	var r=checkField(field);
	if(r!=Infinity)
		info[0]=r;
	else {
		for(var i=0;i<9;i++) {
			if(field[i]==0) {
				field[i]=turn;
				var c=minimax(field,-turn);
				if(turn==1) {
					if(c[0]>info[0]) {
						info[1]=i;
						info[0]=c[0];
					}
				} else {
					if(c[0]<info[0]) {
						info[1]=i;
						info[0]=c[0];
					}
				}
				field[i]=0;
			}
		}
	}
	return info;
}

function negamax(field,turn) {
	var info=[-Infinity,-1];
	var r=checkField(field);
	if(r!=Infinity)
		info[0]=turn*r;
	else {
		for(var i=0;i<9;i++) {
			if(field[i]==0) {
				field[i]=turn;
				var c=negamax(field,-turn);
				if(-c[0]>info[0]) {
					info[1]=i;
					info[0]=-c[0];
				}
				field[i]=0;
			}
		}
	}
	return info;
}

function alpha_beta_pruning(field,turn,alpha,beta) {
	var info=[-turn*Infinity,-1];
	var r=checkField(field);
	if(r!=Infinity)
		info[0]=r;
	else {
		for(var i=0;i<9;i++) {
			if(field[i]==0) {
				field[i]=turn;
				var c=alpha_beta_pruning(field,-turn,alpha,beta);
				if(turn==1) {
					if(c[0]>info[0]) {
						info[1]=i;
						info[0]=c[0];
					}
					if(alpha<c[0])
						alpha=c[0];
				} else {
					if(c[0]<info[0]) {
						info[1]=i;
						info[0]=c[0];
					}
					if(beta>c[0])
						beta=c[0];
				}
				field[i]=0;
				if(beta<=alpha)
					break;
			}
		}
	}
	return info;
}

function checkField(field) {
	for(var i=0;i<3;i++)
		if(field[3*i]==field[3*i+1] && field[3*i]==field[3*i+2] && field[3*i]!=0)
			return field[3*i]*10
	for(var i=0;i<3;i++)
		if(field[i]==field[i+3] && field[i]==field[i+6] && field[i]!=0)
			return field[i]*10
	if(field[0]==field[4] && field[0]==field[8] && field[0]!=0)
		return field[0]*10
	if(field[2]==field[4] && field[2]==field[6] && field[2]!=0)
		return field[2]*10
	for(var i=0;i<9;i++)
		if(field[i]==0)
			return Infinity;
	return 0;
}

function showResult(text) {
	document.getElementById("back").style.display="block";
	var div=document.getElementById("result");
	div.innerHTML=text;
	div.style.display="block";
}

function restartGame() {
	location.reload();
}