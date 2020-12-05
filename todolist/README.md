READ ME
=======

## 變數

1. 輸入項目
```javascript
const input =document.getElementById('todo-input');
```
2. 待辦事項的上層node，就是list層
```javascript
var nodeOfAll=document.getElementById('todo-list')
```
3. 管理待辦事項的array
```javascript
var itemlist=[];
```
4. 賦予每個項目獨特id的參數。
```javascript
var markcounter=0;
```


## 創造node並且push進array：addlist()
輸入待辦事項按下enter後製造一個node並將他push進itemlist（array）管理，`create()`負責產生node並且append給上層。
在global的變數有一個`var markcounter`每生產一個新的事項就會+1，就算刪掉事項也不會減少，功能在賦予每個事項有獨特的id。
```javascript
function addlist(event){
	if(event.code==="Enter" && event.target.value !== ''){
  	
  	obj=create();
  	itemlist.push(obj);
  	input.value="";
  	}
  	handelcounter();
};
```


## 單項刪除：buttonx()
透過markcounter找到對應的事項，分別在`itemlist`和node移除（這裡直接刪除不呼叫display function）
```javascript
function buttonx(a){
	var i;
	itemlist.find(function(item,index,array){ if(item.mark===a.parentNode.mark){i=index} });
 	itemlist.splice(i,1);
	
	a.parentNode.remove();
	handelcounter();

};
```


## 剩餘事項計算：handelcounter()
在新增項目、刪除項目、完成項目的時候分別呼叫，以filter找到還沒完成的項目數量。

```javascript
function handelcounter(){
	todoCount = document.getElementById("todo-count");
	todoCount.innerHTML= itemlist.filter(ele => !ele.complete).length;
};
```


## 完成勾選：checkboxOnclick()

主要是改變顯示的style`handelcounter();`也會在最後被呼叫一次。
```javascript
	node.style["textDecoration"] ="line-through";
	node.style["opacity"] =0.5;
```



## 更新顯示：display()
先移除所有的項目再更新成傳入的node array，在選擇按鈕：all、active、completed、clear completed的時候會被呼叫，傳入什麼就顯示什麼。
```javascript
function display(targetlist){
	while (nodeOfAll.firstChild) {
    nodeOfAll.removeChild(nodeOfAll.lastChild);
	}
	for(i=0;i<targetlist.length;i++){
		nodeOfAll.appendChild(targetlist[i])
	}
};
```


## 顯示所有的項目：original()
顯示原本的list即可。
```javascript
function original(){
	display(itemlist)
};
```

## 顯示未完成：active()
運用filter找到未完成的項目產生一個暫時的array傳進display。。
```javascript
function active(){
	var active=itemlist.filter(ele => !ele.complete);
	display(active);
};
```

## 顯示完成：done()
運用filter找到完成的項目產生一個暫時的array傳進display。和active()同理。
```javascript
function done(){
	var done=itemlist.filter(ele => ele.complete);
	display(done);
};
```

## 清除已完成：clearComplete()

運用filter找到完成的項目直接覆蓋回原本的array。
```javascript
function clearComplete(){
	itemlist=itemlist.filter(ele => !ele.complete);
	display(itemlist)
};
```

## 清除所有：cleanAll()
刪掉所有的選項，直接用一個空陣列覆蓋itemlist，再呼叫handelcounter()跟display()。
```javascript
function cleanAll(){
	itemlist=[];
	handelcounter()
	display(itemlist);
}
```
