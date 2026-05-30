//太空漫步2 陳啟仁 2026/5/30 v3

var map=new Array;
var px=new Array; // player position
var py=new Array;

var miniSteps, moves, timer, timer2, cnt;
var info, playern, player, L=1;

border();


// 鍵盤 --------------------------------
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

  else if (code==65) gotoLevel(0); // A
  else if (code==78) gotoLevel(1); // N
  else if (code==66) gotoLevel(-1); // B
  else if (code==83) gotoLevel(2); // S
}


//------------------------------

// n=0 重玩本關, n=1 下一關, n=-1 上一關. n=2 選關
function gotoLevel(n)
{
  L+=n;
  if (n==2) L=Number(prompt("select level=",""));
  setlevel();
}

// 外圍設-1
function border()
{
  for (i=1; i<=5; i++)
  {
     map[0+7*i]=-1;
     map[6+7*i]=-1;
     map[i+7*0]=-1;
     map[i+7*6]=-1;
  }
}

// 換圖片
function putPic(x,y,v)
{
  document.getElementById("pic"+x+y).src=v+".png";
}

// 顯示本關------------------------
function setlevel()
{
  if (L<1) L=1;
  if (L>maxLevel) L=maxLevel;

  // 清空棋盤
  for (y=1; y<=5; y=y+1)
  {
    for (x=1; x<=5; x=x+1)
    {
      v=0;
      map[x+7*y]=v;
      if ((x==3)&&(y==3)) v=7;
      putPic(x,y,v);
    }
  }

  // 讀取棋子位置xy，放置棋子
  var x,y,v;
  playern=0;
  for (v=1; v<=6; v++)
  {
    var level$=level[L-1];  // ex. "412131224334"
    x=Number(level$[v*2-2]);
    y=Number(level$[v*2-1]);
    px[v]=x; // 紀錄棋子 x,y
    py[v]=y;
    if (x>0) { 
      map[x+7*y]=v;
      playern++;  // count
      putPic(x,y,v);
    }
  }

  // initial var
  player=1;
  moves=0;
  miniSteps=Math.floor((L-1)/100)+3;

  info="第"+L+"關  限步:"+miniSteps;
  document.getElementById("label2").innerHTML=info;
  clearInterval(timer2); // 停止 timer2
  cnt=0;
  document.getElementById("label3").innerHTML="經過"+cnt+"秒";
  // 啟動 timer2 間隔=1000 毫秒
  timer2=setInterval("com2()",1000);
}

//------- 移動棋子 ------------
function move(xa,ya)
{
  if (player>playern) player=1;

  var x, y, x1, y1;
  var i, m2, slideStep=0, v0=0, v=player;

  var x=px[v];
  var y=py[v];
  x1=x+xa;
  y1=y+ya;

  // 旁邊
  if (map[x1+7*y1]==0)
  {
    for(i=2; i<=5; i++) // 尋找阻擋物
    {
      x1+=xa;
      y1+=ya;
      m2=map[x1+7*y1];

      if (m2<0) break; // -1 外圍

      else if (m2>0) // 阻擋物
      {
        slideStep=i-1; // 滑行步
        break;
      }
    }

    // 滑行
    if (slideStep>0)
    {
      xnew=x+xa*slideStep;
      ynew=y+ya*slideStep;

      px[v]=xnew;
      py[v]=ynew;
      map[xnew+7*ynew]=v;
      putPic(xnew,ynew,v);

      map[x+7*y]=0;
      if (x==3 && y==3) putPic(x,y,7);
      else putPic(x,y,0);

      moves++;
      var info1="經過"+cnt+"秒  你走了"+moves+"步";
      document.getElementById("label3").innerHTML=info1;
    }
  }

  if (map[3+7*3]==1)
  {
    info += " 恭喜 過關了!";
    document.getElementById("label2").innerHTML=info;
    clearInterval(timer2); // 停止 timer2
    if (moves<=miniSteps) delay(10);
  }
}

function delay(n)
{
  cnt=n;
  // 啟動 timer 間隔=100 毫秒
  timer=setInterval("com()",100);
}

// 計時器 timer
function com()
{
  cnt--;
  if (cnt==0)
  {
    L++;
    setlevel();

    clearInterval(timer); // 停止 timer
  }
}

// 計時器2 timer2
function com2()
{
  cnt++;
  document.getElementById("label3").innerHTML="經過"+cnt+"秒  你走了"+moves+"步";
}
