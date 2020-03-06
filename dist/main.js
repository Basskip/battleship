!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){const r=n(1),o=n(2),i=document.getElementById("player-1"),s=document.getElementById("player-2"),u=function(){const t=document.querySelector("#status");return{renderBoard:function(t,e,n){!function(t,e,n){const[r,o]=e.getDimensions();for(;t.firstChild;)t.removeChild(t.lastChild);for(let i=0;i<r;i++)for(let r=0;r<o;r++){const o=document.createElement("div");switch(o.classList.add("square"),e.squareStatus(i,r)){case e.SQUARE.MISS:o.textContent="O";break;case e.SQUARE.HIT:o.textContent="X"}o.setAttribute("style",`grid-area: ${i+1} / ${r+1} / span 1 / span 1`),o.addEventListener("click",()=>{n(i,r)}),t.appendChild(o)}}(t,e,n),function(t,e){const n=e.shipPositions;for(shipPos of n)if(shipPos.ship.isSunk()){let e=document.createElement("div");e.classList.add("ship");const n=shipPos.x,r=shipPos.y,o=n+shipPos.ship.length*shipPos.dir[0],i=r+shipPos.ship.length*shipPos.dir[1];e.setAttribute("style",`grid-area: ${n+1} / ${r+1} / ${o+1} / ${i+1};`),t.appendChild(e)}}(t,e)},setStatus:function(e){t.textContent=e}}}();(function(){let t=!1,e=r(),n=r(),l=o(),a=o(),c=1;e.setBoard(l),e.setEnemy(a),n.setBoard(a),n.setEnemy(l),e.setupBoard(),n.setupBoard();const f=(r,o,i)=>{if(r!=c&&!t){let r=1==c?e:n;r.getEnemy().squareStatus(o,i)==r.getBoard().SQUARE.NONE&&(r.attack(o,i),d(),n.getBoard().allSunk()?(t=!0,u.setStatus("You win!")):(n.attack(...n.nextAttack()),d(),e.getBoard().allSunk()&&(t=!0,u.setStatus("Computer wins!"))))}};function d(){u.renderBoard(i,l,f.bind(null,1)),u.renderBoard(s,a,f.bind(null,2))}return{renderBoards:d}})().renderBoards()},function(t,e){function n(t){return Math.floor(Math.random()*Math.floor(t))}t.exports=()=>{let t,e;function r(t){let e=[];const[n,r]=t.getDimensions();for(let o=0;o<n;o++)for(let n=0;n<r;n++)t.squareStatus(o,n)==t.SQUARE.NONE&&e.push([o,n]);return e}return{attack:function(t,n){e.recieveAttack(t,n)},setBoard:function(e){t=e},setEnemy:function(t){e=t},nextAttack:function(){let t=r(e);return t[Math.floor(Math.random()*t.length)]},validAttacks:r,getBoard:function(){return t},getEnemy:function(){return e},setupBoard:function(){let e,r,o=[5,4,3,3,2],i=[[1,0],[0,1]],[s,u]=t.getDimensions();for(;o.length>0;)for(e=o.pop(),r=!1;!r;)r=t.placeShip(n(s),n(u),e,i[n(i.length)])}}}},function(t,e,n){const r=n(3);t.exports=(t=10,e=10)=>{const n=t,o=e,i={NONE:"none",MISS:"miss",HIT:"hit"};let s=new Array(t);for(let n=0;n<t;n++)s[n]=new Array(e).fill(i.NONE);let u=[];function l(t,e){for(const n of u)if(null!=a(n,t,e))return n;return null}function a(t,e,n){let r=t.x,o=t.y,i=t.dir[0],s=t.dir[1];for(let u=0;u<t.ship.length;u++){let t=o+u*s;if(r+u*i==e&&t==n)return u}return null}return{SQUARE:i,placeShip:(t,e,i,s)=>{const a={x:t,y:e,ship:r(i),dir:s},c=function(t){let e=[],n=t.x,r=t.y,o=t.dir[0],i=t.dir[1];for(let s=0;s<t.ship.length;s++){let t=n+s*o,u=r+s*i;e.push([t,u])}return e}(a);for(square of c){let[t,e]=square;if(t>n-1||e>o-1||l(t,e))return!1}return u.push(a),!0},recieveAttack:(t,e)=>{let n=l(t,e);if(null!=n){const r=a(n,t,e);n.ship.hit(r),s[t][e]=i.HIT}else s[t][e]=i.MISS},squareStatus:(t,e)=>s[t][e],shipInSquare:l,positionOnShip:a,allSunk:function(){return u.every(t=>t.ship.isSunk())},getDimensions:()=>[t,e],shipPositions:u}}},function(t,e){t.exports=(t=1)=>{let e=new Array(t);e.fill(!1);return{length:t,hit:t=>{e[t]=!0},isSunk:()=>e.every(t=>1==t)}}}]);