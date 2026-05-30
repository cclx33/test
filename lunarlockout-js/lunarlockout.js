//太空漫步 陳啟仁 2026/5/27

var timer,cnt,moves;
var board=new Array;
var px=new Array; // player position
var py=new Array;
var win,playern,player;
var L=1;
border();

// 鍵盤
document.onkeydown=function(e)
{
  if (window.event) e=window.event;
  var code=e.keyCode? e.keyCode : e.charCode;
  if (code==73) move(0,-1); // I
  else if (code==74) move(-1,0); // J
  else if (code==75) move(0,1);  // K
  else if (code==76) move(1,0);  // L
  else if (code==49) player=1;
  else if (code==50) player=2;
  else if (code==51) player=3;
  else if (code==52) player=4;
  else if (code==53) player=5;
  else if (code==54) player=6;
  else if (code==78) nextlevel(); // N
  else if (code==65) restart(); // A
  else if (code==66) prevlevel(); // B
  else if (code==83) selectlevel(); // S
}

// 重玩本關
function restart()
{
  setlevel();
}

// 選關
function selectlevel()
{
  L=prompt("select level=","");
  setlevel();
}

// 上一關
function prevlevel()
{
  L--;
  setlevel();
}

// 下一關
function nextlevel()
{
  L++;
  setlevel();
}

// 換圖片
function putPic(x,y,v)
{
  document.getElementById("pic"+x+y).src=v+".png";
}

// 外圍設-1
function border()
{
  for (y=1; y<=5; y=y+1)
  {
     board[0+y*7]=-1;
     board[6+y*7]=-1;
     board[y+0]=-1;
     board[y+6*7]=-1;
  }
}

// 顯示本關
function setlevel()
{
  if (L<1) L=1;
  var x,y,v,steps;
  var i=0,playern=0;
  for (y=1; y<=5; y=y+1)
  {
    for (x=1; x<=5; x=x+1)
    {
      v=level[L-1][i];
      board[x+7*y]=v;
      if (v>0) {
        playern++;
        px[v]=x; // 紀錄棋子 x,y
        py[v]=y;
      }
      if ((x==3)&&(y==3)&&(v==0)) v=7;
      putPic(x,y,v);
      i++;
    }
  }
  player=1;
  win=0;
  moves=0;
  steps=Math.floor((L-1)/100)+3; // 最少步數 
  document.getElementById("bbb").innerHTML="level="+L+" <br>steps="+steps+" <br> use I J K L to move <br> 1~6 select actor";
}

//------- 移動棋子 ------------
function move(xa,ya)
{
  if (player>playern) player=1;
  var v0=0,x1,y1,v=player;
  var x=px[v];
  var y=py[v];
  var i,x2,y2,a2,slideStep=0;
  x1=x+xa;
  y1=y+ya;
//   alert("player="+v+" xy="+x+y+" add="+xa+ya+" beside="+board[x1+7*y1]); // debug
  if (board[x1+7*y1]==0) // 旁邊
  {
    for(i=2; i<=5; i++) // 尋找阻擋物
    {
      x2=x+xa*i;
      y2=y+ya*i;
      a2=board[x2+7*y2]
      if (a2<0) break; // 外圍，中斷尋找
      else if (a2>0) // 阻擋物，設滑行步
      {
        slideStep=i-1;
        i=6;
      }
    }
    if (slideStep>0) // 滑行
    {
      x1=x+xa*slideStep; // new position
      y1=y+ya*slideStep;
      px[v]=x1;
      py[v]=y1;
      board[x1+7*y1]=v;
      putPic(x1,y1,v);

      board[x+7*y]=0; // old position
      if ((x==3)&&(y==3)) v0=7 // center
      putPic(x,y,v0);

      moves++; // 步數+1
      // 滑行完畢
    }
  }
  win=board[3+7*3];
  if (win==1)
  {
    // 過關了，顯示走了幾步
    document.getElementById("bbb").innerHTML="good <br> your steps="+moves;
    delay(10);
  }
}

// 延遲
function delay(n)
{
  cnt=n;
  timer=setInterval("com()",100);
}

// 計時器 timer
function com()
{
  cnt=cnt-1;
  if (cnt==0)
  {
    L++;
    setlevel();
    clearInterval(timer);
  }
}
