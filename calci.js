function generateButtons(s,i,c) {
    buttonsHTML = s.split(' ').map(inp =>
        `
        <td colspan="`+c+`">
        <button
        id = ` + inp + ` 
        class = numbtns
        onClick = shifting('` + inp + `')>
        ` + inp + `
        </button>
        </td>
        `).join('');
        document.getElementById('keys'+i).innerHTML = buttonsHTML;
}



var s = '';
var l = '';
var count = 0;
let symbols = ['*','/','+','-'];
let num = ['1','2','3','4','5','6','7','8','9','0','.'];
var mnplte = [];


function shifting(inp) {
  
    if(num.includes(inp)){
        if(l.includes('.') && inp === '.'){

        }
        else{
        l=l+inp;
        s=s+inp;
        }               
    }
    if(symbols.includes(inp)){
        if(count === 1){
            s=s+inp;
            mnplte.push(inp);
            count = 0; 
        }
        if(symbols.includes(s.charAt(s.length-1))){
            console.log('hello');
            mnplte.pop();
            mnplte.push(inp);
            console.log(s.substring(0,s.length-1));
            s = s.substring(0,s.length-1) + inp;
        }
        else{
        console.log('hel2');
        mnplte.push(l);
        mnplte.push(inp);
        l='';
        s=s+inp;        
        }
    }
    

    if(inp === 'Back'){
        if(symbols.includes(s[s.length-1])){
            console.log('1');
            s = s.substring(0,s.length-1);
            mnplte.pop();
            count = 1;
        }
        else{
            console.log('2');
            if(l===''){
                s = s.substring(0,s.length-1);
                console.log(mnplte[mnplte.length-1],typeof(mnplte[mnplte.length-1]));
                mnplte[mnplte.length-1] = mnplte[mnplte.length-1].substring(0,mnplte[mnplte.length-1].length-1);
                if(mnplte[mnplte.length-1].length==0){
                    mnplte.pop();
                }
            }
            else{
            l = l.substring(0,l.length-1);
            s = s.substring(0,s.length-1);
            }
        }
    }
    


    if(inp === 'Clear'){
        s = s-'Clear';
        initiate();
    }
    document.getElementById('display').innerHTML = s;
    if(inp === '='){
        if(s === ''){
            console.log('eq');
            document.getElementById('display').innerHTML = s;
        }
        else{
        mnplte.push(l);
        calculate();
        }
    }

}

function calculate() {    
    if(mnplte.indexOf('*') > mnplte.indexOf('/')){
        symbols[0] = '/';
        symbols[1] = '*';
    }
    if(mnplte.indexOf('+') > mnplte.indexOf('-')){
        symbols[2] = '-';
        symbols[3] = '+';
    }
    for(k=0; k<4; k++){
        i = mnplte.indexOf(symbols[k]);
        while(i != -1){
            switch(symbols[k]){
                case '*': subans = parseFloat(mnplte[i-1],3) * parseFloat(mnplte[i+1]);
                break;
                case '/': subans = parseFloat(mnplte[i-1]) / parseFloat(mnplte[i+1]);
                break;
                case '+': subans = parseFloat(mnplte[i-1]) + parseFloat(mnplte[i+1]);
                break;
                case '-': subans = parseFloat(mnplte[i-1])- parseFloat(mnplte[i+1]);
                break;
            }
            mnplte[i-1] = subans.toFixed(8);            
            mnplte.splice(i,2);            
            i = mnplte.indexOf(symbols[k]);
            //console.log(mnplte);
        }   
    }
    console.log(mnplte[0]);
    s = parseFloat(mnplte[0]).toString();
    l = s;
    count=0;
    mnplte.pop();

    if(isNaN(s)){
        document.getElementById('display').innerHTML = 'Syntax Error';
        initiate();    
    }
    else{
        document.getElementById('display').innerHTML = s;
    }
    
}

function initiate() {
    s = '';
    l = '';
    mnplte = []; 
}




generateButtons('Clear Back','0',2);
generateButtons('7 8 9 /','1');
generateButtons('4 5 6 *','2');
generateButtons('1 2 3 -','3');
generateButtons('. 0 = +','4');
