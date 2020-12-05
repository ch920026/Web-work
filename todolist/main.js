const input =document.getElementById('todo-input');
var nodeOfAll=document.getElementById('todo-list')
var itemlist=[];
var markcounter=0;


input.addEventListener("keyup", addlist);


function addlist(event){
	if(event.code==="Enter" && event.target.value !== ''){
  	obj=create();
  	itemlist.push(obj);
  	input.value="";
  	}
  	handlecounter();
};

function create(item){
	var newitem =document.createElement('li');
	var button =document.createElement('div');
	var word =document.createElement('h1');
	var cancel =document.createElement('img');
	var content =document.createTextNode(event.target.value);
	console.log(item)
	var buttoninput=document.createElement('input');
	var buttonlabel=document.createElement('label');
	newitem.className="todo-app__item";
	button.className="todo-app__checkbox";
	word.className="todo-app__item-detail";
	cancel.className="todo-app__item-x";
	cancel.setAttribute('src',"./img/x.png");
	cancel.setAttribute('onclick','buttonx(this)');
	buttoninput.setAttribute('id',markcounter);
	buttoninput.setAttribute('type','checkbox');
	buttoninput.setAttribute('onclick','checkboxOnclick(this)');
	buttonlabel.setAttribute('for',markcounter);
	word.appendChild(content);
	button.appendChild(buttoninput);
	button.appendChild(buttonlabel);
	
	newitem.appendChild(button);
	newitem.appendChild(word);
	newitem.appendChild(cancel);
	newitem.node=event.target.value;
	newitem.complete=false;
	newitem.mark=markcounter;
	markcounter+=1;

	var element = document.getElementById("todo-list");
	element.appendChild(newitem);
	return newitem;
};

function buttonx(a){
	var i;
	itemlist.find(function(item,index,array){ if(item.mark===a.parentNode.mark){i=index} })
 	itemlist.splice(i,1)
	
	a.parentNode.remove();
	handlecounter();

};

function checkboxOnclick(a){
	var node=a.parentNode.parentNode;
	var i;
	
	itemlist.find(function(item,index,array){ if(item.mark===node.mark){i=index} })
	if(itemlist[i].complete===false){
	itemlist[i].complete=true;
	node.style["textDecoration"] ="line-through";
	node.style["color"] ="rgba(150,150,150,0.4)";
		}
		else {
			itemlist[i].complete=false;
			node.style["textDecoration"] ='';
			node.style["color"] ="#4d4d4d";
			}
	handlecounter();
};

function handlecounter(){
	todoCount = document.getElementById("todo-count");
	todoCount.innerHTML= itemlist.filter(ele => !ele.complete).length;
};

function original(){
	display(itemlist)
};

function active(){
	var active=itemlist.filter(ele => !ele.complete);
	display(active);
};

function done(){
	var done=itemlist.filter(ele => ele.complete);
	display(done);

};
function clearComplete(){
	itemlist=itemlist.filter(ele => !ele.complete);
	display(itemlist)
};
function cleanAll(){
	itemlist=[];
	handlecounter()
	display(itemlist);
}

function display(targetlist){
	while (nodeOfAll.firstChild) {
    nodeOfAll.removeChild(nodeOfAll.lastChild);
	}
	for(i=0;i<targetlist.length;i++){
		nodeOfAll.appendChild(targetlist[i])
	}
};
