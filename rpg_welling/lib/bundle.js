(()=>{var sh=0,Rl=1,rh=2;var Cl=1,Ca=2,On=3,Kn=0,qt=1,an=2,ti=0,Pi=1,_i=2,Pl=3,Il=4,ah=5,fi=100,oh=101,lh=102,ch=103,hh=104,uh=200,dh=201,fh=202,ph=203,ia=204,sa=205,mh=206,gh=207,_h=208,xh=209,yh=210,vh=211,Mh=212,Sh=213,bh=214,Pa=0,Ia=1,La=2,Ii=3,Da=4,Ua=5,Na=6,Fa=7,Oa=0,Eh=1,Th=2,ni=0,wh=1,Ah=2,Rh=3,Ba=4,Ch=5,Ph=6,Ih=7;var Ll=300,Oi=301,Bi=302,za=303,ka=304,pr=306,dn=1e3,ui=1001,ra=1002,$t=1003,Lh=1004;var mr=1005;var Sn=1006,Ha=1007;var xi=1008;var Tn=1009,Dl=1010,Ul=1011,vs=1012,Va=1013,yi=1014,wn=1015,Ms=1016,Ga=1017,Wa=1018,Ss=1020,Nl=35902,Fl=35899,Ol=1021,Bl=1022,pn=1023,us=1026,bs=1027,Xa=1028,qa=1029,zl=1030,Ya=1031;var Za=1033,gr=33776,_r=33777,xr=33778,yr=33779,$a=35840,Ja=35841,Ka=35842,ja=35843,Qa=36196,eo=37492,to=37496,no=37808,io=37809,so=37810,ro=37811,ao=37812,oo=37813,lo=37814,co=37815,ho=37816,uo=37817,fo=37818,po=37819,mo=37820,go=37821,_o=36492,xo=36494,yo=36495,vo=36283,Mo=36284,So=36285,bo=36286;var Ws=2300,aa=2301,na=2302,vl=2400,Ml=2401,Sl=2402;var Dh=3200,Uh=3201;var kl=0,Nh=1,ii="",kt="srgb",Li="srgb-linear",Xs="linear",Qe="srgb";var Ci=7680;var bl=519,Fh=512,Oh=513,Bh=514,Hl=515,zh=516,kh=517,Hh=518,Vh=519,oa=35044;var Vl="300 es",Mn=2e3,qs=2001;var jn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Zo=Math.PI/180,la=180/Math.PI;function di(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Bt[i&255]+Bt[i>>8&255]+Bt[i>>16&255]+Bt[i>>24&255]+"-"+Bt[e&255]+Bt[e>>8&255]+"-"+Bt[e>>16&15|64]+Bt[e>>24&255]+"-"+Bt[t&63|128]+Bt[t>>8&255]+"-"+Bt[t>>16&255]+Bt[t>>24&255]+Bt[n&255]+Bt[n>>8&255]+Bt[n>>16&255]+Bt[n>>24&255]).toLowerCase()}function Xe(i,e,t){return Math.max(e,Math.min(t,i))}function cd(i,e){return(i%e+e)%e}function $o(i,e,t){return(1-t)*i+t*e}function Pn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function st(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Fe=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Xe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Qn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[a+0],p=r[a+1],g=r[a+2],x=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=x;return}if(u!==x||c!==f||l!==p||h!==g){let m=1-o,d=c*f+l*p+h*g+u*x,E=d>=0?1:-1,T=1-d*d;if(T>Number.EPSILON){let A=Math.sqrt(T),w=Math.atan2(A,d*E);m=Math.sin(m*w)/A,o=Math.sin(o*w)/A}let S=o*E;if(c=c*m+f*S,l=l*m+p*S,h=h*m+g*S,u=u*m+x*S,m===1-o){let A=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=A,l*=A,h*=A,u*=A}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[a],f=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+h*u+c*p-l*f,e[t+1]=c*g+h*f+l*u-o*p,e[t+2]=l*g+h*p+o*f-c*u,e[t+3]=h*g-o*u-c*f-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),u=o(r/2),f=c(n/2),p=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=f*h*u+l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u-f*p*g;break;case"YXZ":this._x=f*h*u+l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u+f*p*g;break;case"ZXY":this._x=f*h*u-l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u-f*p*g;break;case"ZYX":this._x=f*h*u-l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u+f*p*g;break;case"YZX":this._x=f*h*u+l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u-f*p*g;break;case"XZY":this._x=f*h*u-l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=n+o+u;if(f>0){let p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(a-s)*p}else if(n>o&&n>u){let p=2*Math.sqrt(1+n-o-u);this._w=(h-c)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+l)/p}else if(o>u){let p=2*Math.sqrt(1+o-n-u);this._w=(r-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+u-n-o);this._w=(a-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xe(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let c=1-o*o;if(c<=Number.EPSILON){let p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,f=Math.sin(t*h)/l;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Lc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Lc.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),h=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=s+c*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Jo.copy(this).projectOnVector(e),this.sub(Jo)}reflect(e){return this.sub(Jo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Xe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Jo=new L,Lc=new Qn,ze=class i{constructor(e,t,n,s,r,a,o,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],p=n[5],g=n[8],x=s[0],m=s[3],d=s[6],E=s[1],T=s[4],S=s[7],A=s[2],w=s[5],P=s[8];return r[0]=a*x+o*E+c*A,r[3]=a*m+o*T+c*w,r[6]=a*d+o*S+c*P,r[1]=l*x+h*E+u*A,r[4]=l*m+h*T+u*w,r[7]=l*d+h*S+u*P,r[2]=f*x+p*E+g*A,r[5]=f*m+p*T+g*w,r[8]=f*d+p*S+g*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,f=o*c-h*r,p=l*r-a*c,g=t*u+n*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=u*x,e[1]=(s*l-h*n)*x,e[2]=(o*n-s*a)*x,e[3]=f*x,e[4]=(h*t-s*c)*x,e[5]=(s*r-o*t)*x,e[6]=p*x,e[7]=(n*c-l*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ko.makeScale(e,t)),this}rotate(e){return this.premultiply(Ko.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ko.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ko=new ze;function Gl(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ys(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Gh(){let i=Ys("canvas");return i.style.display="block",i}var Dc={};function ds(i){i in Dc||(Dc[i]=!0,console.warn(i))}function Wh(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Uc=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nc=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hd(){let i={enabled:!0,workingColorSpace:Li,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Qe&&(s.r=Jn(s.r),s.g=Jn(s.g),s.b=Jn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Qe&&(s.r=hs(s.r),s.g=hs(s.g),s.b=hs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ii?Xs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ds("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ds("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Li]:{primaries:e,whitePoint:n,transfer:Xs,toXYZ:Uc,fromXYZ:Nc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:kt},outputColorSpaceConfig:{drawingBufferColorSpace:kt}},[kt]:{primaries:e,whitePoint:n,transfer:Qe,toXYZ:Uc,fromXYZ:Nc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:kt}}}),i}var Ze=hd();function Jn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function hs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Yi,ca=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Yi===void 0&&(Yi=Ys("canvas")),Yi.width=e.width,Yi.height=e.height;let s=Yi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Yi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ys("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Jn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Jn(t[n]/255)*255):t[n]=Jn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},ud=0,fs=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ud++}),this.uuid=di(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(jo(s[a].image)):r.push(jo(s[a]))}else r=jo(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function jo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ca.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var dd=0,Qo=new L,Xt=class i extends jn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=ui,s=ui,r=Sn,a=xi,o=pn,c=Tn,l=i.DEFAULT_ANISOTROPY,h=ii){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dd++}),this.uuid=di(),this.name="",this.source=new fs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Fe(0,0),this.repeat=new Fe(1,1),this.center=new Fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Qo).x}get height(){return this.source.getSize(Qo).y}get depth(){return this.source.getSize(Qo).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ll)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case dn:e.x=e.x-Math.floor(e.x);break;case ui:e.x=e.x<0?0:1;break;case ra:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case dn:e.y=e.y-Math.floor(e.y);break;case ui:e.y=e.y<0?0:1;break;case ra:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Xt.DEFAULT_IMAGE=null;Xt.DEFAULT_MAPPING=Ll;Xt.DEFAULT_ANISOTROPY=1;var je=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],p=c[5],g=c[9],x=c[2],m=c[6],d=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let T=(l+1)/2,S=(p+1)/2,A=(d+1)/2,w=(h+f)/4,P=(u+x)/4,N=(g+m)/4;return T>S&&T>A?T<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(T),s=w/n,r=P/n):S>A?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=w/s,r=N/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=P/r,s=N/r),this.set(n,s,r,t),this}let E=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(f-h)*(f-h));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(u-x)/E,this.z=(f-h)/E,this.w=Math.acos((l+p+d-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this.w=Xe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this.w=Xe(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Xe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ha=class extends jn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Sn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new je(0,0,e,t),this.scissorTest=!1,this.viewport=new je(0,0,e,t);let s={width:e,height:t,depth:n.depth},r=new Xt(s);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:Sn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new fs(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},In=class extends ha{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Zs=class extends Xt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=$t,this.minFilter=$t,this.wrapR=ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ua=class extends Xt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=$t,this.minFilter=$t,this.wrapR=ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ln=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,xn):xn.fromBufferAttribute(r,a),xn.applyMatrix4(e.matrixWorld),this.expandByPoint(xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Lr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Lr.copy(n.boundingBox)),Lr.applyMatrix4(e.matrixWorld),this.union(Lr)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,xn),xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Us),Dr.subVectors(this.max,Us),Zi.subVectors(e.a,Us),$i.subVectors(e.b,Us),Ji.subVectors(e.c,Us),ri.subVectors($i,Zi),ai.subVectors(Ji,$i),Ti.subVectors(Zi,Ji);let t=[0,-ri.z,ri.y,0,-ai.z,ai.y,0,-Ti.z,Ti.y,ri.z,0,-ri.x,ai.z,0,-ai.x,Ti.z,0,-Ti.x,-ri.y,ri.x,0,-ai.y,ai.x,0,-Ti.y,Ti.x,0];return!el(t,Zi,$i,Ji,Dr)||(t=[1,0,0,0,1,0,0,0,1],!el(t,Zi,$i,Ji,Dr))?!1:(Ur.crossVectors(ri,ai),t=[Ur.x,Ur.y,Ur.z],el(t,Zi,$i,Ji,Dr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Wn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Wn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Wn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Wn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Wn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Wn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Wn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Wn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Wn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Wn=[new L,new L,new L,new L,new L,new L,new L,new L],xn=new L,Lr=new Ln,Zi=new L,$i=new L,Ji=new L,ri=new L,ai=new L,Ti=new L,Us=new L,Dr=new L,Ur=new L,wi=new L;function el(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){wi.fromArray(i,r);let o=s.x*Math.abs(wi.x)+s.y*Math.abs(wi.y)+s.z*Math.abs(wi.z),c=e.dot(wi),l=t.dot(wi),h=n.dot(wi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var fd=new Ln,Ns=new L,tl=new L,ei=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):fd.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ns.subVectors(e,this.center);let t=Ns.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ns,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(tl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ns.copy(e.center).add(tl)),this.expandByPoint(Ns.copy(e.center).sub(tl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Xn=new L,nl=new L,Nr=new L,oi=new L,il=new L,Fr=new L,sl=new L,$s=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Xn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Xn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Xn.copy(this.origin).addScaledVector(this.direction,t),Xn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){nl.copy(e).add(t).multiplyScalar(.5),Nr.copy(t).sub(e).normalize(),oi.copy(this.origin).sub(nl);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Nr),o=oi.dot(this.direction),c=-oi.dot(Nr),l=oi.lengthSq(),h=Math.abs(1-a*a),u,f,p,g;if(h>0)if(u=a*c-o,f=a*o-c,g=r*h,u>=0)if(f>=-g)if(f<=g){let x=1/h;u*=x,f*=x,p=u*(u+a*f+2*o)+f*(a*u+f+2*c)+l}else f=r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(nl).addScaledVector(Nr,f),p}intersectSphere(e,t){Xn.subVectors(e.center,this.origin);let n=Xn.dot(this.direction),s=Xn.dot(Xn)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(o=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Xn)!==null}intersectTriangle(e,t,n,s,r){il.subVectors(t,e),Fr.subVectors(n,e),sl.crossVectors(il,Fr);let a=this.direction.dot(sl),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;oi.subVectors(this.origin,e);let c=o*this.direction.dot(Fr.crossVectors(oi,Fr));if(c<0)return null;let l=o*this.direction.dot(il.cross(oi));if(l<0||c+l>a)return null;let h=-o*oi.dot(sl);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},et=class i{constructor(e,t,n,s,r,a,o,c,l,h,u,f,p,g,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,h,u,f,p,g,x,m)}set(e,t,n,s,r,a,o,c,l,h,u,f,p,g,x,m){let d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=g,d[11]=x,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/Ki.setFromMatrixColumn(e,0).length(),r=1/Ki.setFromMatrixColumn(e,1).length(),a=1/Ki.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let f=a*h,p=a*u,g=o*h,x=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=p+g*l,t[5]=f-x*l,t[9]=-o*c,t[2]=x-f*l,t[6]=g+p*l,t[10]=a*c}else if(e.order==="YXZ"){let f=c*h,p=c*u,g=l*h,x=l*u;t[0]=f+x*o,t[4]=g*o-p,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=p*o-g,t[6]=x+f*o,t[10]=a*c}else if(e.order==="ZXY"){let f=c*h,p=c*u,g=l*h,x=l*u;t[0]=f-x*o,t[4]=-a*u,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*h,t[9]=x-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let f=a*h,p=a*u,g=o*h,x=o*u;t[0]=c*h,t[4]=g*l-p,t[8]=f*l+x,t[1]=c*u,t[5]=x*l+f,t[9]=p*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let f=a*c,p=a*l,g=o*c,x=o*l;t[0]=c*h,t[4]=x-f*u,t[8]=g*u+p,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=p*u+g,t[10]=f-x*u}else if(e.order==="XZY"){let f=a*c,p=a*l,g=o*c,x=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+x,t[5]=a*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=o*h,t[10]=x*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(pd,e,md)}lookAt(e,t,n){let s=this.elements;return nn.subVectors(e,t),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),li.crossVectors(n,nn),li.lengthSq()===0&&(Math.abs(n.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),li.crossVectors(n,nn)),li.normalize(),Or.crossVectors(nn,li),s[0]=li.x,s[4]=Or.x,s[8]=nn.x,s[1]=li.y,s[5]=Or.y,s[9]=nn.y,s[2]=li.z,s[6]=Or.z,s[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],p=n[13],g=n[2],x=n[6],m=n[10],d=n[14],E=n[3],T=n[7],S=n[11],A=n[15],w=s[0],P=s[4],N=s[8],M=s[12],v=s[1],C=s[5],B=s[9],O=s[13],z=s[2],W=s[6],G=s[10],te=s[14],D=s[3],Y=s[7],J=s[11],ce=s[15];return r[0]=a*w+o*v+c*z+l*D,r[4]=a*P+o*C+c*W+l*Y,r[8]=a*N+o*B+c*G+l*J,r[12]=a*M+o*O+c*te+l*ce,r[1]=h*w+u*v+f*z+p*D,r[5]=h*P+u*C+f*W+p*Y,r[9]=h*N+u*B+f*G+p*J,r[13]=h*M+u*O+f*te+p*ce,r[2]=g*w+x*v+m*z+d*D,r[6]=g*P+x*C+m*W+d*Y,r[10]=g*N+x*B+m*G+d*J,r[14]=g*M+x*O+m*te+d*ce,r[3]=E*w+T*v+S*z+A*D,r[7]=E*P+T*C+S*W+A*Y,r[11]=E*N+T*B+S*G+A*J,r[15]=E*M+T*O+S*te+A*ce,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],p=e[14],g=e[3],x=e[7],m=e[11],d=e[15];return g*(+r*c*u-s*l*u-r*o*f+n*l*f+s*o*p-n*c*p)+x*(+t*c*p-t*l*f+r*a*f-s*a*p+s*l*h-r*c*h)+m*(+t*l*u-t*o*p-r*a*u+n*a*p+r*o*h-n*l*h)+d*(-s*o*h-t*c*u+t*o*f+s*a*u-n*a*f+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],p=e[11],g=e[12],x=e[13],m=e[14],d=e[15],E=u*m*l-x*f*l+x*c*p-o*m*p-u*c*d+o*f*d,T=g*f*l-h*m*l-g*c*p+a*m*p+h*c*d-a*f*d,S=h*x*l-g*u*l+g*o*p-a*x*p-h*o*d+a*u*d,A=g*u*c-h*x*c-g*o*f+a*x*f+h*o*m-a*u*m,w=t*E+n*T+s*S+r*A;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let P=1/w;return e[0]=E*P,e[1]=(x*f*r-u*m*r-x*s*p+n*m*p+u*s*d-n*f*d)*P,e[2]=(o*m*r-x*c*r+x*s*l-n*m*l-o*s*d+n*c*d)*P,e[3]=(u*c*r-o*f*r-u*s*l+n*f*l+o*s*p-n*c*p)*P,e[4]=T*P,e[5]=(h*m*r-g*f*r+g*s*p-t*m*p-h*s*d+t*f*d)*P,e[6]=(g*c*r-a*m*r-g*s*l+t*m*l+a*s*d-t*c*d)*P,e[7]=(a*f*r-h*c*r+h*s*l-t*f*l-a*s*p+t*c*p)*P,e[8]=S*P,e[9]=(g*u*r-h*x*r-g*n*p+t*x*p+h*n*d-t*u*d)*P,e[10]=(a*x*r-g*o*r+g*n*l-t*x*l-a*n*d+t*o*d)*P,e[11]=(h*o*r-a*u*r-h*n*l+t*u*l+a*n*p-t*o*p)*P,e[12]=A*P,e[13]=(h*x*s-g*u*s+g*n*f-t*x*f-h*n*m+t*u*m)*P,e[14]=(g*o*s-a*x*s-g*n*c+t*x*c+a*n*m-t*o*m)*P,e[15]=(a*u*s-h*o*s+h*n*c-t*u*c-a*n*f+t*o*f)*P,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,u=o+o,f=r*l,p=r*h,g=r*u,x=a*h,m=a*u,d=o*u,E=c*l,T=c*h,S=c*u,A=n.x,w=n.y,P=n.z;return s[0]=(1-(x+d))*A,s[1]=(p+S)*A,s[2]=(g-T)*A,s[3]=0,s[4]=(p-S)*w,s[5]=(1-(f+d))*w,s[6]=(m+E)*w,s[7]=0,s[8]=(g+T)*P,s[9]=(m-E)*P,s[10]=(1-(f+x))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=Ki.set(s[0],s[1],s[2]).length(),a=Ki.set(s[4],s[5],s[6]).length(),o=Ki.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],yn.copy(this);let l=1/r,h=1/a,u=1/o;return yn.elements[0]*=l,yn.elements[1]*=l,yn.elements[2]*=l,yn.elements[4]*=h,yn.elements[5]*=h,yn.elements[6]*=h,yn.elements[8]*=u,yn.elements[9]*=u,yn.elements[10]*=u,t.setFromRotationMatrix(yn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=Mn,c=!1){let l=this.elements,h=2*r/(t-e),u=2*r/(n-s),f=(t+e)/(t-e),p=(n+s)/(n-s),g,x;if(c)g=r/(a-r),x=a*r/(a-r);else if(o===Mn)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===qs)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Mn,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-s),f=-(t+e)/(t-e),p=-(n+s)/(n-s),g,x;if(c)g=1/(a-r),x=a/(a-r);else if(o===Mn)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===qs)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ki=new L,yn=new et,pd=new L(0,0,0),md=new L(1,1,1),li=new L,Or=new L,nn=new L,Fc=new et,Oc=new Qn,bn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Xe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Xe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Fc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Fc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Oc.setFromEuler(this),this.setFromQuaternion(Oc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};bn.DEFAULT_ORDER="XYZ";var Js=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},gd=0,Bc=new L,ji=new Qn,qn=new et,Br=new L,Fs=new L,_d=new L,xd=new Qn,zc=new L(1,0,0),kc=new L(0,1,0),Hc=new L(0,0,1),Vc={type:"added"},yd={type:"removed"},Qi={type:"childadded",child:null},rl={type:"childremoved",child:null},It=class i extends jn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gd++}),this.uuid=di(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new L,t=new bn,n=new Qn,s=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new et},normalMatrix:{value:new ze}}),this.matrix=new et,this.matrixWorld=new et,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Js,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ji.setFromAxisAngle(e,t),this.quaternion.multiply(ji),this}rotateOnWorldAxis(e,t){return ji.setFromAxisAngle(e,t),this.quaternion.premultiply(ji),this}rotateX(e){return this.rotateOnAxis(zc,e)}rotateY(e){return this.rotateOnAxis(kc,e)}rotateZ(e){return this.rotateOnAxis(Hc,e)}translateOnAxis(e,t){return Bc.copy(e).applyQuaternion(this.quaternion),this.position.add(Bc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zc,e)}translateY(e){return this.translateOnAxis(kc,e)}translateZ(e){return this.translateOnAxis(Hc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(qn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Br.copy(e):Br.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Fs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qn.lookAt(Fs,Br,this.up):qn.lookAt(Br,Fs,this.up),this.quaternion.setFromRotationMatrix(qn),s&&(qn.extractRotation(s.matrixWorld),ji.setFromRotationMatrix(qn),this.quaternion.premultiply(ji.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Vc),Qi.child=e,this.dispatchEvent(Qi),Qi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(yd),rl.child=e,this.dispatchEvent(rl),rl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),qn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),qn.multiply(e.parent.matrixWorld)),e.applyMatrix4(qn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Vc),Qi.child=e,this.dispatchEvent(Qi),Qi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fs,e,_d),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fs,xd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),f=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};It.DEFAULT_UP=new L(0,1,0);It.DEFAULT_MATRIX_AUTO_UPDATE=!0;It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var vn=new L,Yn=new L,al=new L,Zn=new L,es=new L,ts=new L,Gc=new L,ol=new L,ll=new L,cl=new L,hl=new je,ul=new je,dl=new je,$n=class i{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),vn.subVectors(e,t),s.cross(vn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){vn.subVectors(s,t),Yn.subVectors(n,t),al.subVectors(e,t);let a=vn.dot(vn),o=vn.dot(Yn),c=vn.dot(al),l=Yn.dot(Yn),h=Yn.dot(al),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;let f=1/u,p=(l*c-o*h)*f,g=(a*h-o*c)*f;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Zn)===null?!1:Zn.x>=0&&Zn.y>=0&&Zn.x+Zn.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,Zn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Zn.x),c.addScaledVector(a,Zn.y),c.addScaledVector(o,Zn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return hl.setScalar(0),ul.setScalar(0),dl.setScalar(0),hl.fromBufferAttribute(e,t),ul.fromBufferAttribute(e,n),dl.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(hl,r.x),a.addScaledVector(ul,r.y),a.addScaledVector(dl,r.z),a}static isFrontFacing(e,t,n,s){return vn.subVectors(n,t),Yn.subVectors(e,t),vn.cross(Yn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return vn.subVectors(this.c,this.b),Yn.subVectors(this.a,this.b),vn.cross(Yn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;es.subVectors(s,n),ts.subVectors(r,n),ol.subVectors(e,n);let c=es.dot(ol),l=ts.dot(ol);if(c<=0&&l<=0)return t.copy(n);ll.subVectors(e,s);let h=es.dot(ll),u=ts.dot(ll);if(h>=0&&u<=h)return t.copy(s);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(es,a);cl.subVectors(e,r);let p=es.dot(cl),g=ts.dot(cl);if(g>=0&&p<=g)return t.copy(r);let x=p*l-c*g;if(x<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(ts,o);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return Gc.subVectors(r,s),o=(u-h)/(u-h+(p-g)),t.copy(s).addScaledVector(Gc,o);let d=1/(m+x+f);return a=x*d,o=f*d,t.copy(n).addScaledVector(es,a).addScaledVector(ts,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Xh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ci={h:0,s:0,l:0},zr={h:0,s:0,l:0};function fl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Oe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ze.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Ze.workingColorSpace){if(e=cd(e,1),t=Xe(t,0,1),n=Xe(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=fl(a,r,e+1/3),this.g=fl(a,r,e),this.b=fl(a,r,e-1/3)}return Ze.colorSpaceToWorking(this,s),this}setStyle(e,t=kt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=kt){let n=Xh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Jn(e.r),this.g=Jn(e.g),this.b=Jn(e.b),this}copyLinearToSRGB(e){return this.r=hs(e.r),this.g=hs(e.g),this.b=hs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=kt){return Ze.workingToColorSpace(zt.copy(this),e),Math.round(Xe(zt.r*255,0,255))*65536+Math.round(Xe(zt.g*255,0,255))*256+Math.round(Xe(zt.b*255,0,255))}getHexString(e=kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.workingToColorSpace(zt.copy(this),t);let n=zt.r,s=zt.g,r=zt.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ze.workingColorSpace){return Ze.workingToColorSpace(zt.copy(this),t),e.r=zt.r,e.g=zt.g,e.b=zt.b,e}getStyle(e=kt){Ze.workingToColorSpace(zt.copy(this),e);let t=zt.r,n=zt.g,s=zt.b;return e!==kt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(ci),this.setHSL(ci.h+e,ci.s+t,ci.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ci),e.getHSL(zr);let n=$o(ci.h,zr.h,t),s=$o(ci.s,zr.s,t),r=$o(ci.l,zr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},zt=new Oe;Oe.NAMES=Xh;var vd=0,Dn=class extends jn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:vd++}),this.uuid=di(),this.name="",this.type="Material",this.blending=Pi,this.side=Kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ia,this.blendDst=sa,this.blendEquation=fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Oe(0,0,0),this.blendAlpha=0,this.depthFunc=Ii,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=bl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ci,this.stencilZFail=Ci,this.stencilZPass=Ci,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Pi&&(n.blending=this.blending),this.side!==Kn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ia&&(n.blendSrc=this.blendSrc),this.blendDst!==sa&&(n.blendDst=this.blendDst),this.blendEquation!==fi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ii&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==bl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ci&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ci&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ci&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},fn=class extends Dn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=Oa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Mt=new L,kr=new Fe,Md=0,Pt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Md++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=oa,this.updateRanges=[],this.gpuType=wn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)kr.fromBufferAttribute(this,t),kr.applyMatrix3(e),this.setXY(t,kr.x,kr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix3(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix4(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyNormalMatrix(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.transformDirection(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Pn(t,this.array)),t}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Pn(t,this.array)),t}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Pn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Pn(t,this.array)),t}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array),r=st(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==oa&&(e.usage=this.usage),e}};var Ks=class extends Pt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var js=class extends Pt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var rt=class extends Pt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Sd=0,un=new et,pl=new It,ns=new L,sn=new Ln,Os=new Ln,Ct=new L,Tt=class i extends jn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sd++}),this.uuid=di(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Gl(e)?js:Ks)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new ze().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return un.makeRotationFromQuaternion(e),this.applyMatrix4(un),this}rotateX(e){return un.makeRotationX(e),this.applyMatrix4(un),this}rotateY(e){return un.makeRotationY(e),this.applyMatrix4(un),this}rotateZ(e){return un.makeRotationZ(e),this.applyMatrix4(un),this}translate(e,t,n){return un.makeTranslation(e,t,n),this.applyMatrix4(un),this}scale(e,t,n){return un.makeScale(e,t,n),this.applyMatrix4(un),this}lookAt(e){return pl.lookAt(e),pl.updateMatrix(),this.applyMatrix4(pl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ns).negate(),this.translate(ns.x,ns.y,ns.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new rt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ln);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];sn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ct.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(Ct),Ct.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(Ct)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ei);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){let n=this.boundingSphere.center;if(sn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Os.setFromBufferAttribute(o),this.morphTargetsRelative?(Ct.addVectors(sn.min,Os.min),sn.expandByPoint(Ct),Ct.addVectors(sn.max,Os.max),sn.expandByPoint(Ct)):(sn.expandByPoint(Os.min),sn.expandByPoint(Os.max))}sn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Ct.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ct));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Ct.fromBufferAttribute(o,l),c&&(ns.fromBufferAttribute(e,l),Ct.add(ns)),s=Math.max(s,n.distanceToSquared(Ct))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pt(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let N=0;N<n.count;N++)o[N]=new L,c[N]=new L;let l=new L,h=new L,u=new L,f=new Fe,p=new Fe,g=new Fe,x=new L,m=new L;function d(N,M,v){l.fromBufferAttribute(n,N),h.fromBufferAttribute(n,M),u.fromBufferAttribute(n,v),f.fromBufferAttribute(r,N),p.fromBufferAttribute(r,M),g.fromBufferAttribute(r,v),h.sub(l),u.sub(l),p.sub(f),g.sub(f);let C=1/(p.x*g.y-g.x*p.y);isFinite(C)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(C),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(C),o[N].add(x),o[M].add(x),o[v].add(x),c[N].add(m),c[M].add(m),c[v].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let N=0,M=E.length;N<M;++N){let v=E[N],C=v.start,B=v.count;for(let O=C,z=C+B;O<z;O+=3)d(e.getX(O+0),e.getX(O+1),e.getX(O+2))}let T=new L,S=new L,A=new L,w=new L;function P(N){A.fromBufferAttribute(s,N),w.copy(A);let M=o[N];T.copy(M),T.sub(A.multiplyScalar(A.dot(M))).normalize(),S.crossVectors(w,M);let C=S.dot(c[N])<0?-1:1;a.setXYZW(N,T.x,T.y,T.z,C)}for(let N=0,M=E.length;N<M;++N){let v=E[N],C=v.start,B=v.count;for(let O=C,z=C+B;O<z;O+=3)P(e.getX(O+0)),P(e.getX(O+1)),P(e.getX(O+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Pt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);let s=new L,r=new L,a=new L,o=new L,c=new L,l=new L,h=new L,u=new L;if(e)for(let f=0,p=e.count;f<p;f+=3){let g=e.getX(f+0),x=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ct.fromBufferAttribute(e,t),Ct.normalize(),e.setXYZ(t,Ct.x,Ct.y,Ct.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,f=new l.constructor(c.length*h),p=0,g=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?p=c[x]*o.data.stride+o.offset:p=c[x]*h;for(let d=0;d<h;d++)f[g++]=l[p++]}return new Pt(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){let f=l[h],p=e(f,n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let p=l[u];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Wc=new et,Ai=new $s,Hr=new ei,Xc=new L,Vr=new L,Gr=new L,Wr=new L,ml=new L,Xr=new L,qc=new L,qr=new L,Q=class extends It{constructor(e=new Tt,t=new fn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Xr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],u=r[c];h!==0&&(ml.fromBufferAttribute(u,e),a?Xr.addScaledVector(ml,h):Xr.addScaledVector(ml.sub(t),h))}t.add(Xr)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere),Hr.applyMatrix4(r),Ai.copy(e.ray).recast(e.near),!(Hr.containsPoint(Ai.origin)===!1&&(Ai.intersectSphere(Hr,Xc)===null||Ai.origin.distanceToSquared(Xc)>(e.far-e.near)**2))&&(Wc.copy(r).invert(),Ai.copy(e.ray).applyMatrix4(Wc),!(n.boundingBox!==null&&Ai.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ai)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=f.length;g<x;g++){let m=f[g],d=a[m.materialIndex],E=Math.max(m.start,p.start),T=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let S=E,A=T;S<A;S+=3){let w=o.getX(S),P=o.getX(S+1),N=o.getX(S+2);s=Yr(this,d,e,n,l,h,u,w,P,N),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=g,d=x;m<d;m+=3){let E=o.getX(m),T=o.getX(m+1),S=o.getX(m+2);s=Yr(this,a,e,n,l,h,u,E,T,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,x=f.length;g<x;g++){let m=f[g],d=a[m.materialIndex],E=Math.max(m.start,p.start),T=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let S=E,A=T;S<A;S+=3){let w=S,P=S+1,N=S+2;s=Yr(this,d,e,n,l,h,u,w,P,N),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let m=g,d=x;m<d;m+=3){let E=m,T=m+1,S=m+2;s=Yr(this,a,e,n,l,h,u,E,T,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function bd(i,e,t,n,s,r,a,o){let c;if(e.side===qt?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===Kn,o),c===null)return null;qr.copy(o),qr.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(qr);return l<t.near||l>t.far?null:{distance:l,point:qr.clone(),object:i}}function Yr(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,Vr),i.getVertexPosition(c,Gr),i.getVertexPosition(l,Wr);let h=bd(i,e,t,n,Vr,Gr,Wr,qc);if(h){let u=new L;$n.getBarycoord(qc,Vr,Gr,Wr,u),s&&(h.uv=$n.getInterpolatedAttribute(s,o,c,l,u,new Fe)),r&&(h.uv1=$n.getInterpolatedAttribute(r,o,c,l,u,new Fe)),a&&(h.normal=$n.getInterpolatedAttribute(a,o,c,l,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a:o,b:c,c:l,normal:new L,materialIndex:0};$n.getNormal(Vr,Gr,Wr,f.normal),h.face=f,h.barycoord=u}return h}var yt=class i extends Tt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],u=[],f=0,p=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new rt(l,3)),this.setAttribute("normal",new rt(h,3)),this.setAttribute("uv",new rt(u,2));function g(x,m,d,E,T,S,A,w,P,N,M){let v=S/P,C=A/N,B=S/2,O=A/2,z=w/2,W=P+1,G=N+1,te=0,D=0,Y=new L;for(let J=0;J<G;J++){let ce=J*C-O;for(let we=0;we<W;we++){let qe=we*v-B;Y[x]=qe*E,Y[m]=ce*T,Y[d]=z,l.push(Y.x,Y.y,Y.z),Y[x]=0,Y[m]=0,Y[d]=w>0?1:-1,h.push(Y.x,Y.y,Y.z),u.push(we/P),u.push(1-J/N),te+=1}}for(let J=0;J<N;J++)for(let ce=0;ce<P;ce++){let we=f+ce+W*J,qe=f+ce+W*(J+1),nt=f+(ce+1)+W*(J+1),$e=f+(ce+1)+W*J;c.push(we,qe,$e),c.push(qe,nt,$e),D+=6}o.addGroup(p,D,M),p+=D,f+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function zi(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Vt(i){let e={};for(let t=0;t<i.length;t++){let n=zi(i[t]);for(let s in n)e[s]=n[s]}return e}function Ed(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Wl(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}var qh={clone:zi,merge:Vt},Td=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,En=class extends Dn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Td,this.fragmentShader=wd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=zi(e.uniforms),this.uniformsGroups=Ed(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Qs=class extends It{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new et,this.projectionMatrix=new et,this.projectionMatrixInverse=new et,this.coordinateSystem=Mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},hi=new L,Yc=new Fe,Zc=new Fe,Ut=class extends Qs{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=la*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Zo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return la*2*Math.atan(Math.tan(Zo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(hi.x,hi.y).multiplyScalar(-e/hi.z),hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(hi.x,hi.y).multiplyScalar(-e/hi.z)}getViewSize(e,t){return this.getViewBounds(e,Yc,Zc),t.subVectors(Zc,Yc)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Zo*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},is=-90,ss=1,da=class extends It{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ut(is,ss,e,t);s.layers=this.layers,this.add(s);let r=new Ut(is,ss,e,t);r.layers=this.layers,this.add(r);let a=new Ut(is,ss,e,t);a.layers=this.layers,this.add(a);let o=new Ut(is,ss,e,t);o.layers=this.layers,this.add(o);let c=new Ut(is,ss,e,t);c.layers=this.layers,this.add(c);let l=new Ut(is,ss,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===Mn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===qs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,f,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},er=class extends Xt{constructor(e=[],t=Oi,n,s,r,a,o,c,l,h){super(e,t,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},fa=class extends In{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new er(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new yt(5,5,5),r=new En({name:"CubemapFromEquirect",uniforms:zi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qt,blending:ti});r.uniforms.tEquirect.value=t;let a=new Q(s,r),o=t.minFilter;return t.minFilter===xi&&(t.minFilter=Sn),new da(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}},Zt=class extends It{constructor(){super(),this.isGroup=!0,this.type="Group"}},Ad={type:"move"},ps=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Zt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Zt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Zt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),d=this._getHandJoint(l,x);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&f>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ad)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Zt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var tr=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Oe(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},nr=class extends It{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bn,this.environmentIntensity=1,this.environmentRotation=new bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},pa=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=oa,this.updateRanges=[],this.version=0,this.uuid=di()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=di()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=di()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Wt=new L,ir=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix4(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyNormalMatrix(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.transformDirection(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Pn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Pn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Pn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Pn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array),r=st(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Pt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Di=class extends Dn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Oe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},rs,Bs=new L,as=new L,os=new L,ls=new Fe,zs=new Fe,Yh=new et,Zr=new L,ks=new L,$r=new L,$c=new Fe,gl=new Fe,Jc=new Fe,ms=class extends It{constructor(e=new Di){if(super(),this.isSprite=!0,this.type="Sprite",rs===void 0){rs=new Tt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new pa(t,5);rs.setIndex([0,1,2,0,2,3]),rs.setAttribute("position",new ir(n,3,0,!1)),rs.setAttribute("uv",new ir(n,2,3,!1))}this.geometry=rs,this.material=e,this.center=new Fe(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),as.setFromMatrixScale(this.matrixWorld),Yh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),os.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&as.multiplyScalar(-os.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;Jr(Zr.set(-.5,-.5,0),os,a,as,s,r),Jr(ks.set(.5,-.5,0),os,a,as,s,r),Jr($r.set(.5,.5,0),os,a,as,s,r),$c.set(0,0),gl.set(1,0),Jc.set(1,1);let o=e.ray.intersectTriangle(Zr,ks,$r,!1,Bs);if(o===null&&(Jr(ks.set(-.5,.5,0),os,a,as,s,r),gl.set(0,1),o=e.ray.intersectTriangle(Zr,$r,ks,!1,Bs),o===null))return;let c=e.ray.origin.distanceTo(Bs);c<e.near||c>e.far||t.push({distance:c,point:Bs.clone(),uv:$n.getInterpolation(Bs,Zr,ks,$r,$c,gl,Jc,new Fe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Jr(i,e,t,n,s,r){ls.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(zs.x=r*ls.x-s*ls.y,zs.y=s*ls.x+r*ls.y):zs.copy(ls),i.copy(e),i.x+=zs.x,i.y+=zs.y,i.applyMatrix4(Yh)}var ma=class extends Xt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=$t,h=$t,u,f){super(null,a,o,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var sr=class extends Pt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},cs=new et,Kc=new et,Kr=[],jc=new Ln,Rd=new et,Hs=new Q,Vs=new ei,rr=class extends Q{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new sr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Rd)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ln),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,cs),jc.copy(e.boundingBox).applyMatrix4(cs),this.boundingBox.union(jc)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ei),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,cs),Vs.copy(e.boundingSphere).applyMatrix4(cs),this.boundingSphere.union(Vs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Hs.geometry=this.geometry,Hs.material=this.material,Hs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Vs.copy(this.boundingSphere),Vs.applyMatrix4(n),e.ray.intersectsSphere(Vs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,cs),Kc.multiplyMatrices(n,cs),Hs.matrixWorld=Kc,Hs.raycast(e,Kr);for(let a=0,o=Kr.length;a<o;a++){let c=Kr[a];c.instanceId=r,c.object=this,t.push(c)}Kr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new sr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new ma(new Float32Array(s*this.count),s,this.count,Xa,wn));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},_l=new L,Cd=new L,Pd=new ze,Cn=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=_l.subVectors(n,t).cross(Cd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(_l),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Pd.getNormalMatrix(e),s=this.coplanarPoint(_l).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ri=new ei,Id=new Fe(.5,.5),jr=new L,gs=class{constructor(e=new Cn,t=new Cn,n=new Cn,s=new Cn,r=new Cn,a=new Cn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Mn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],p=r[7],g=r[8],x=r[9],m=r[10],d=r[11],E=r[12],T=r[13],S=r[14],A=r[15];if(s[0].setComponents(l-a,p-h,d-g,A-E).normalize(),s[1].setComponents(l+a,p+h,d+g,A+E).normalize(),s[2].setComponents(l+o,p+u,d+x,A+T).normalize(),s[3].setComponents(l-o,p-u,d-x,A-T).normalize(),n)s[4].setComponents(c,f,m,S).normalize(),s[5].setComponents(l-c,p-f,d-m,A-S).normalize();else if(s[4].setComponents(l-c,p-f,d-m,A-S).normalize(),t===Mn)s[5].setComponents(l+c,p+f,d+m,A+S).normalize();else if(t===qs)s[5].setComponents(c,f,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ri.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ri.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ri)}intersectsSprite(e){Ri.center.set(0,0,0);let t=Id.distanceTo(e.center);return Ri.radius=.7071067811865476+t,Ri.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ri)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(jr.x=s.normal.x>0?e.max.x:e.min.x,jr.y=s.normal.y>0?e.max.y:e.min.y,jr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(jr)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ui=class extends Dn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Oe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Qc=new et,El=new $s,Qr=new ei,ea=new L,_s=class extends It{constructor(e=new Tt,t=new Ui){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Qr.copy(n.boundingSphere),Qr.applyMatrix4(s),Qr.radius+=r,e.ray.intersectsSphere(Qr)===!1)return;Qc.copy(s).invert(),El.copy(e.ray).applyMatrix4(Qc);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){let f=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let g=f,x=p;g<x;g++){let m=l.getX(g);ea.fromBufferAttribute(u,m),eh(ea,m,c,s,e,t,this)}}else{let f=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let g=f,x=p;g<x;g++)ea.fromBufferAttribute(u,g),eh(ea,g,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function eh(i,e,t,n,s,r,a){let o=El.distanceSqToPoint(i);if(o<t){let c=new L;El.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var xs=class extends Xt{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},ar=class extends Xt{constructor(e,t,n=yi,s,r,a,o=$t,c=$t,l,h=us,u=1){if(h!==us&&h!==bs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:u};super(f,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new fs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},or=class extends Xt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Un=class i extends Tt{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let a=[],o=[],c=[],l=[],h=t/2,u=Math.PI/2*e,f=t,p=2*u+f,g=n*2+r,x=s+1,m=new L,d=new L;for(let E=0;E<=g;E++){let T=0,S=0,A=0,w=0;if(E<=n){let M=E/n,v=M*Math.PI/2;S=-h-e*Math.cos(v),A=e*Math.sin(v),w=-e*Math.cos(v),T=M*u}else if(E<=n+r){let M=(E-n)/r;S=-h+M*t,A=e,w=0,T=u+M*f}else{let M=(E-n-r)/n,v=M*Math.PI/2;S=h+e*Math.sin(v),A=e*Math.cos(v),w=e*Math.sin(v),T=u+f+M*u}let P=Math.max(0,Math.min(1,T/p)),N=0;E===0?N=.5/s:E===g&&(N=-.5/s);for(let M=0;M<=s;M++){let v=M/s,C=v*Math.PI*2,B=Math.sin(C),O=Math.cos(C);d.x=-A*O,d.y=S,d.z=A*B,o.push(d.x,d.y,d.z),m.set(-A*O,w,A*B),m.normalize(),c.push(m.x,m.y,m.z),l.push(v+N,P)}if(E>0){let M=(E-1)*x;for(let v=0;v<s;v++){let C=M+v,B=M+v+1,O=E*x+v,z=E*x+v+1;a.push(C,B,O),a.push(B,z,O)}}}this.setIndex(a),this.setAttribute("position",new rt(o,3)),this.setAttribute("normal",new rt(c,3)),this.setAttribute("uv",new rt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Nn=class i extends Tt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],a=[],o=[],c=[],l=new L,h=new Fe;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){let p=n+u/t*s;l.x=e*Math.cos(p),l.y=e*Math.sin(p),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[f]/e+1)/2,h.y=(a[f+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new rt(a,3)),this.setAttribute("normal",new rt(o,3)),this.setAttribute("uv",new rt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Ht=class i extends Tt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],p=[],g=0,x=[],m=n/2,d=0;E(),a===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new rt(u,3)),this.setAttribute("normal",new rt(f,3)),this.setAttribute("uv",new rt(p,2));function E(){let S=new L,A=new L,w=0,P=(t-e)/n;for(let N=0;N<=r;N++){let M=[],v=N/r,C=v*(t-e)+e;for(let B=0;B<=s;B++){let O=B/s,z=O*c+o,W=Math.sin(z),G=Math.cos(z);A.x=C*W,A.y=-v*n+m,A.z=C*G,u.push(A.x,A.y,A.z),S.set(W,P,G).normalize(),f.push(S.x,S.y,S.z),p.push(O,1-v),M.push(g++)}x.push(M)}for(let N=0;N<s;N++)for(let M=0;M<r;M++){let v=x[M][N],C=x[M+1][N],B=x[M+1][N+1],O=x[M][N+1];(e>0||M!==0)&&(h.push(v,C,O),w+=3),(t>0||M!==r-1)&&(h.push(C,B,O),w+=3)}l.addGroup(d,w,0),d+=w}function T(S){let A=g,w=new Fe,P=new L,N=0,M=S===!0?e:t,v=S===!0?1:-1;for(let B=1;B<=s;B++)u.push(0,m*v,0),f.push(0,v,0),p.push(.5,.5),g++;let C=g;for(let B=0;B<=s;B++){let z=B/s*c+o,W=Math.cos(z),G=Math.sin(z);P.x=M*G,P.y=m*v,P.z=M*W,u.push(P.x,P.y,P.z),f.push(0,v,0),w.x=W*.5+.5,w.y=G*.5*v+.5,p.push(w.x,w.y),g++}for(let B=0;B<s;B++){let O=A+B,z=C+B;S===!0?h.push(z,z+1,O):h.push(z+1,z,O),N+=3}l.addGroup(d,N,S===!0?1:2),d+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Fn=class i extends Ht{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var vt=class i extends Tt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,u=e/o,f=t/c,p=[],g=[],x=[],m=[];for(let d=0;d<h;d++){let E=d*f-a;for(let T=0;T<l;T++){let S=T*u-r;g.push(S,-E,0),x.push(0,0,1),m.push(T/o),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let E=0;E<o;E++){let T=E+l*d,S=E+l*(d+1),A=E+1+l*(d+1),w=E+1+l*d;p.push(T,S,w),p.push(S,A,w)}this.setIndex(p),this.setAttribute("position",new rt(g,3)),this.setAttribute("normal",new rt(x,3)),this.setAttribute("uv",new rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},lr=class i extends Tt{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);let o=[],c=[],l=[],h=[],u=e,f=(t-e)/s,p=new L,g=new Fe;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){let d=r+m/n*a;p.x=u*Math.cos(d),p.y=u*Math.sin(d),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,h.push(g.x,g.y)}u+=f}for(let x=0;x<s;x++){let m=x*(n+1);for(let d=0;d<n;d++){let E=d+m,T=E,S=E+n+1,A=E+n+2,w=E+1;o.push(T,S,w),o.push(S,A,w)}}this.setIndex(o),this.setAttribute("position",new rt(c,3)),this.setAttribute("normal",new rt(l,3)),this.setAttribute("uv",new rt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var St=class i extends Tt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new L,f=new L,p=[],g=[],x=[],m=[];for(let d=0;d<=n;d++){let E=[],T=d/n,S=0;d===0&&a===0?S=.5/t:d===n&&c===Math.PI&&(S=-.5/t);for(let A=0;A<=t;A++){let w=A/t;u.x=-e*Math.cos(s+w*r)*Math.sin(a+T*o),u.y=e*Math.cos(a+T*o),u.z=e*Math.sin(s+w*r)*Math.sin(a+T*o),g.push(u.x,u.y,u.z),f.copy(u).normalize(),x.push(f.x,f.y,f.z),m.push(w+S,1-T),E.push(l++)}h.push(E)}for(let d=0;d<n;d++)for(let E=0;E<t;E++){let T=h[d][E+1],S=h[d][E],A=h[d+1][E],w=h[d+1][E+1];(d!==0||a>0)&&p.push(T,S,w),(d!==n-1||c<Math.PI)&&p.push(S,A,w)}this.setIndex(p),this.setAttribute("position",new rt(g,3)),this.setAttribute("normal",new rt(x,3)),this.setAttribute("uv",new rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Ni=class i extends Tt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let a=[],o=[],c=[],l=[],h=new L,u=new L,f=new L;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){let x=g/s*r,m=p/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(x),u.y=(e+t*Math.cos(m))*Math.sin(x),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(g/s),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){let x=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,d=(s+1)*(p-1)+g,E=(s+1)*p+g;a.push(x,m,E),a.push(m,d,E)}this.setIndex(a),this.setAttribute("position",new rt(o,3)),this.setAttribute("normal",new rt(c,3)),this.setAttribute("uv",new rt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Nt=class extends Dn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=kl,this.normalScale=new Fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=Oa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ga=class extends Dn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Dh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},_a=class extends Dn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ta(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Ld(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Fi=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},xa=class extends Fi{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:vl,endingEnd:vl}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ml:r=e,o=2*t-n;break;case Sl:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ml:a=e,c=2*n-t;break;case Sl:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,p=this._weightNext,g=(n-t)/(s-t),x=g*g,m=x*g,d=-f*m+2*f*x-f*g,E=(1+f)*m+(-1.5-2*f)*x+(-.5+f)*g+1,T=(-1-p)*m+(1.5+p)*x+.5*g,S=p*m-p*x;for(let A=0;A!==o;++A)r[A]=d*a[h+A]+E*a[l+A]+T*a[c+A]+S*a[u+A];return r}},ya=class extends Fi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(s-t),u=1-h;for(let f=0;f!==o;++f)r[f]=a[l+f]*u+a[c+f]*h;return r}},va=class extends Fi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},rn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ta(t,this.TimeBufferType),this.values=ta(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ta(e.times,Array),values:ta(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new va(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ya(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new xa(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ws:t=this.InterpolantFactoryMethodDiscrete;break;case aa:t=this.InterpolantFactoryMethodLinear;break;case na:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ws;case this.InterpolantFactoryMethodLinear:return aa;case this.InterpolantFactoryMethodSmooth:return na}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&Ld(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===na,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(s)c=!0;else{let u=o*n,f=u-n,p=u+n;for(let g=0;g!==n;++g){let x=t[u+g];if(x!==t[f+g]||x!==t[p+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let u=o*n,f=a*n;for(let p=0;p!==n;++p)t[f+p]=t[u+p]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};rn.prototype.ValueTypeName="";rn.prototype.TimeBufferType=Float32Array;rn.prototype.ValueBufferType=Float32Array;rn.prototype.DefaultInterpolation=aa;var pi=class extends rn{constructor(e,t,n){super(e,t,n)}};pi.prototype.ValueTypeName="bool";pi.prototype.ValueBufferType=Array;pi.prototype.DefaultInterpolation=Ws;pi.prototype.InterpolantFactoryMethodLinear=void 0;pi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ma=class extends rn{constructor(e,t,n,s){super(e,t,n,s)}};Ma.prototype.ValueTypeName="color";var Sa=class extends rn{constructor(e,t,n,s){super(e,t,n,s)}};Sa.prototype.ValueTypeName="number";var ba=class extends Fi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t),l=e*o;for(let h=l+o;l!==h;l+=4)Qn.slerpFlat(r,0,a,l-o,a,l,c);return r}},cr=class extends rn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new ba(this.times,this.values,this.getValueSize(),e)}};cr.prototype.ValueTypeName="quaternion";cr.prototype.InterpolantFactoryMethodSmooth=void 0;var mi=class extends rn{constructor(e,t,n){super(e,t,n)}};mi.prototype.ValueTypeName="string";mi.prototype.ValueBufferType=Array;mi.prototype.DefaultInterpolation=Ws;mi.prototype.InterpolantFactoryMethodLinear=void 0;mi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ea=class extends rn{constructor(e,t,n,s){super(e,t,n,s)}};Ea.prototype.ValueTypeName="vector";var Ta=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let p=l[u],g=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Zh=new Ta,wa=class{constructor(e){this.manager=e!==void 0?e:Zh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};wa.DEFAULT_MATERIAL_NAME="__DEFAULT";var ys=class extends It{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Oe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},hr=class extends ys{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(It.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Oe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},xl=new et,th=new L,nh=new L,Aa=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Fe(512,512),this.mapType=Tn,this.map=null,this.mapPass=null,this.matrix=new et,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new gs,this._frameExtents=new Fe(1,1),this._viewportCount=1,this._viewports=[new je(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;th.setFromMatrixPosition(e.matrixWorld),t.position.copy(th),nh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(nh),t.updateMatrixWorld(),xl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xl,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(xl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var ih=new et,Gs=new L,yl=new L,Tl=class extends Aa{constructor(){super(new Ut(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Fe(4,2),this._viewportCount=6,this._viewports=[new je(2,1,1,1),new je(0,1,1,1),new je(3,1,1,1),new je(1,1,1,1),new je(3,0,1,1),new je(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Gs.setFromMatrixPosition(e.matrixWorld),n.position.copy(Gs),yl.copy(n.position),yl.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(yl),n.updateMatrixWorld(),s.makeTranslation(-Gs.x,-Gs.y,-Gs.z),ih.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ih,n.coordinateSystem,n.reversedDepth)}},gi=class extends ys{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Tl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},ur=class extends Qs{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},wl=class extends Aa{constructor(){super(new ur(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},dr=class extends ys{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(It.DEFAULT_UP),this.updateMatrix(),this.target=new It,this.shadow=new wl}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Ra=class extends Ut{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},fr=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};var Xl="\\[\\]\\.:\\/",Dd=new RegExp("["+Xl+"]","g"),ql="[^"+Xl+"]",Ud="[^"+Xl.replace("\\.","")+"]",Nd=/((?:WC+[\/:])*)/.source.replace("WC",ql),Fd=/(WCOD+)?/.source.replace("WCOD",Ud),Od=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ql),Bd=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ql),zd=new RegExp("^"+Nd+Fd+Od+Bd+"$"),kd=["material","materials","bones","map"],Al=class{constructor(e,t,n){let s=n||ht.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ht=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Dd,"")}static parseTrackName(e){let t=zd.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);kd.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ht.Composite=Al;ht.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ht.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ht.prototype.GetterByBindingType=[ht.prototype._getValue_direct,ht.prototype._getValue_array,ht.prototype._getValue_arrayElement,ht.prototype._getValue_toArray];ht.prototype.SetterByBindingTypeAndVersioning=[[ht.prototype._setValue_direct,ht.prototype._setValue_direct_setNeedsUpdate,ht.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_array,ht.prototype._setValue_array_setNeedsUpdate,ht.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_arrayElement,ht.prototype._setValue_arrayElement_setNeedsUpdate,ht.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_fromArray,ht.prototype._setValue_fromArray_setNeedsUpdate,ht.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Q0=new Float32Array(1);function Yl(i,e,t,n){let s=Hd(n);switch(t){case Ol:return i*e;case Xa:return i*e/s.components*s.byteLength;case qa:return i*e/s.components*s.byteLength;case zl:return i*e*2/s.components*s.byteLength;case Ya:return i*e*2/s.components*s.byteLength;case Bl:return i*e*3/s.components*s.byteLength;case pn:return i*e*4/s.components*s.byteLength;case Za:return i*e*4/s.components*s.byteLength;case gr:case _r:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case xr:case yr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ja:case ja:return Math.max(i,16)*Math.max(e,8)/4;case $a:case Ka:return Math.max(i,8)*Math.max(e,8)/2;case Qa:case eo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case to:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case no:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case io:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case so:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ro:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ao:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case oo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case lo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case co:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ho:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case uo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case fo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case po:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case mo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case go:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case _o:case xo:case yo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case vo:case Mo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case So:case bo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Hd(i){switch(i){case Tn:case Dl:return{byteLength:1,components:1};case vs:case Ul:case Ms:return{byteLength:2,components:1};case Ga:case Wa:return{byteLength:2,components:4};case yi:case Va:case wn:return{byteLength:4,components:1};case Nl:case Fl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function xu(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Gd(i){let e=new WeakMap;function t(o,c){let l=o.array,h=o.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,h);else{u.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<u.length;p++){let g=u[f],x=u[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,u[f]=x)}u.length=f+1;for(let p=0,g=u.length;p<g;p++){let x=u[p];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Wd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Xd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,qd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Yd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$d=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Jd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Kd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,jd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Qd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ef=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,tf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,nf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,sf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,rf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,af=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,of=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,lf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,uf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,df=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ff=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,pf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,mf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,gf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,_f=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,vf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Mf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Sf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,bf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ef=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Tf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,wf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Af=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Rf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Cf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Pf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,If=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Lf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Df=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Uf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Nf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ff=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Of=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Bf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,zf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,kf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Vf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Gf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Wf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Xf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,qf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Yf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Zf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$f=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Kf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ep=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,np=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ip=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,sp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,rp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ap=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,op=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,cp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,hp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,up=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,fp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,pp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,_p=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,vp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Mp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Sp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ep=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Tp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Ap=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Rp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Cp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Pp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ip=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Lp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Dp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Up=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Np=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Fp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Op=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Bp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,zp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,kp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Gp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Wp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Xp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$p=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Kp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,jp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Qp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,tm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,im=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,rm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,am=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,om=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,cm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,um=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,dm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,mm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_m=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ym=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Sm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,bm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ge={alphahash_fragment:Wd,alphahash_pars_fragment:Xd,alphamap_fragment:qd,alphamap_pars_fragment:Yd,alphatest_fragment:Zd,alphatest_pars_fragment:$d,aomap_fragment:Jd,aomap_pars_fragment:Kd,batching_pars_vertex:jd,batching_vertex:Qd,begin_vertex:ef,beginnormal_vertex:tf,bsdfs:nf,iridescence_fragment:sf,bumpmap_pars_fragment:rf,clipping_planes_fragment:af,clipping_planes_pars_fragment:of,clipping_planes_pars_vertex:lf,clipping_planes_vertex:cf,color_fragment:hf,color_pars_fragment:uf,color_pars_vertex:df,color_vertex:ff,common:pf,cube_uv_reflection_fragment:mf,defaultnormal_vertex:gf,displacementmap_pars_vertex:_f,displacementmap_vertex:xf,emissivemap_fragment:yf,emissivemap_pars_fragment:vf,colorspace_fragment:Mf,colorspace_pars_fragment:Sf,envmap_fragment:bf,envmap_common_pars_fragment:Ef,envmap_pars_fragment:Tf,envmap_pars_vertex:wf,envmap_physical_pars_fragment:Of,envmap_vertex:Af,fog_vertex:Rf,fog_pars_vertex:Cf,fog_fragment:Pf,fog_pars_fragment:If,gradientmap_pars_fragment:Lf,lightmap_pars_fragment:Df,lights_lambert_fragment:Uf,lights_lambert_pars_fragment:Nf,lights_pars_begin:Ff,lights_toon_fragment:Bf,lights_toon_pars_fragment:zf,lights_phong_fragment:kf,lights_phong_pars_fragment:Hf,lights_physical_fragment:Vf,lights_physical_pars_fragment:Gf,lights_fragment_begin:Wf,lights_fragment_maps:Xf,lights_fragment_end:qf,logdepthbuf_fragment:Yf,logdepthbuf_pars_fragment:Zf,logdepthbuf_pars_vertex:$f,logdepthbuf_vertex:Jf,map_fragment:Kf,map_pars_fragment:jf,map_particle_fragment:Qf,map_particle_pars_fragment:ep,metalnessmap_fragment:tp,metalnessmap_pars_fragment:np,morphinstance_vertex:ip,morphcolor_vertex:sp,morphnormal_vertex:rp,morphtarget_pars_vertex:ap,morphtarget_vertex:op,normal_fragment_begin:lp,normal_fragment_maps:cp,normal_pars_fragment:hp,normal_pars_vertex:up,normal_vertex:dp,normalmap_pars_fragment:fp,clearcoat_normal_fragment_begin:pp,clearcoat_normal_fragment_maps:mp,clearcoat_pars_fragment:gp,iridescence_pars_fragment:_p,opaque_fragment:xp,packing:yp,premultiplied_alpha_fragment:vp,project_vertex:Mp,dithering_fragment:Sp,dithering_pars_fragment:bp,roughnessmap_fragment:Ep,roughnessmap_pars_fragment:Tp,shadowmap_pars_fragment:wp,shadowmap_pars_vertex:Ap,shadowmap_vertex:Rp,shadowmask_pars_fragment:Cp,skinbase_vertex:Pp,skinning_pars_vertex:Ip,skinning_vertex:Lp,skinnormal_vertex:Dp,specularmap_fragment:Up,specularmap_pars_fragment:Np,tonemapping_fragment:Fp,tonemapping_pars_fragment:Op,transmission_fragment:Bp,transmission_pars_fragment:zp,uv_pars_fragment:kp,uv_pars_vertex:Hp,uv_vertex:Vp,worldpos_vertex:Gp,background_vert:Wp,background_frag:Xp,backgroundCube_vert:qp,backgroundCube_frag:Yp,cube_vert:Zp,cube_frag:$p,depth_vert:Jp,depth_frag:Kp,distanceRGBA_vert:jp,distanceRGBA_frag:Qp,equirect_vert:em,equirect_frag:tm,linedashed_vert:nm,linedashed_frag:im,meshbasic_vert:sm,meshbasic_frag:rm,meshlambert_vert:am,meshlambert_frag:om,meshmatcap_vert:lm,meshmatcap_frag:cm,meshnormal_vert:hm,meshnormal_frag:um,meshphong_vert:dm,meshphong_frag:fm,meshphysical_vert:pm,meshphysical_frag:mm,meshtoon_vert:gm,meshtoon_frag:_m,points_vert:xm,points_frag:ym,shadow_vert:vm,shadow_frag:Mm,sprite_vert:Sm,sprite_frag:bm},oe={common:{diffuse:{value:new Oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new Fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new Oe(16777215)},opacity:{value:1},center:{value:new Fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},Bn={basic:{uniforms:Vt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Vt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Oe(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Vt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Oe(0)},specular:{value:new Oe(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Vt([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new Oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Vt([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new Oe(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Vt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Vt([oe.points,oe.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Vt([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Vt([oe.common,oe.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Vt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Vt([oe.sprite,oe.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:Vt([oe.common,oe.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:Vt([oe.lights,oe.fog,{color:{value:new Oe(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};Bn.physical={uniforms:Vt([Bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new Fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new Oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new Fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new Oe(0)},specularColor:{value:new Oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new Fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};var Eo={r:0,b:0,g:0},ki=new bn,Em=new et;function Tm(i,e,t,n,s,r,a){let o=new Oe(0),c=r===!0?0:1,l,h,u=null,f=0,p=null;function g(T){let S=T.isScene===!0?T.background:null;return S&&S.isTexture&&(S=(T.backgroundBlurriness>0?t:e).get(S)),S}function x(T){let S=!1,A=g(T);A===null?d(o,c):A&&A.isColor&&(d(A,1),S=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(T,S){let A=g(S);A&&(A.isCubeTexture||A.mapping===pr)?(h===void 0&&(h=new Q(new yt(1,1,1),new En({name:"BackgroundCubeMaterial",uniforms:zi(Bn.backgroundCube.uniforms),vertexShader:Bn.backgroundCube.vertexShader,fragmentShader:Bn.backgroundCube.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,P,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ki.copy(S.backgroundRotation),ki.x*=-1,ki.y*=-1,ki.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(ki.y*=-1,ki.z*=-1),h.material.uniforms.envMap.value=A,h.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Em.makeRotationFromEuler(ki)),h.material.toneMapped=Ze.getTransfer(A.colorSpace)!==Qe,(u!==A||f!==A.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=A,f=A.version,p=i.toneMapping),h.layers.enableAll(),T.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(l===void 0&&(l=new Q(new vt(2,2),new En({name:"BackgroundMaterial",uniforms:zi(Bn.background.uniforms),vertexShader:Bn.background.vertexShader,fragmentShader:Bn.background.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=A,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=Ze.getTransfer(A.colorSpace)!==Qe,A.matrixAutoUpdate===!0&&A.updateMatrix(),l.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||f!==A.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,u=A,f=A.version,p=i.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null))}function d(T,S){T.getRGB(Eo,Wl(i)),n.buffers.color.setClear(Eo.r,Eo.g,Eo.b,S,a)}function E(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(T,S=1){o.set(T),c=S,d(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(T){c=T,d(o,c)},render:x,addToRenderList:m,dispose:E}}function wm(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,a=!1;function o(v,C,B,O,z){let W=!1,G=u(O,B,C);r!==G&&(r=G,l(r.object)),W=p(v,O,B,z),W&&g(v,O,B,z),z!==null&&e.update(z,i.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,S(v,C,B,O),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function c(){return i.createVertexArray()}function l(v){return i.bindVertexArray(v)}function h(v){return i.deleteVertexArray(v)}function u(v,C,B){let O=B.wireframe===!0,z=n[v.id];z===void 0&&(z={},n[v.id]=z);let W=z[C.id];W===void 0&&(W={},z[C.id]=W);let G=W[O];return G===void 0&&(G=f(c()),W[O]=G),G}function f(v){let C=[],B=[],O=[];for(let z=0;z<t;z++)C[z]=0,B[z]=0,O[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:B,attributeDivisors:O,object:v,attributes:{},index:null}}function p(v,C,B,O){let z=r.attributes,W=C.attributes,G=0,te=B.getAttributes();for(let D in te)if(te[D].location>=0){let J=z[D],ce=W[D];if(ce===void 0&&(D==="instanceMatrix"&&v.instanceMatrix&&(ce=v.instanceMatrix),D==="instanceColor"&&v.instanceColor&&(ce=v.instanceColor)),J===void 0||J.attribute!==ce||ce&&J.data!==ce.data)return!0;G++}return r.attributesNum!==G||r.index!==O}function g(v,C,B,O){let z={},W=C.attributes,G=0,te=B.getAttributes();for(let D in te)if(te[D].location>=0){let J=W[D];J===void 0&&(D==="instanceMatrix"&&v.instanceMatrix&&(J=v.instanceMatrix),D==="instanceColor"&&v.instanceColor&&(J=v.instanceColor));let ce={};ce.attribute=J,J&&J.data&&(ce.data=J.data),z[D]=ce,G++}r.attributes=z,r.attributesNum=G,r.index=O}function x(){let v=r.newAttributes;for(let C=0,B=v.length;C<B;C++)v[C]=0}function m(v){d(v,0)}function d(v,C){let B=r.newAttributes,O=r.enabledAttributes,z=r.attributeDivisors;B[v]=1,O[v]===0&&(i.enableVertexAttribArray(v),O[v]=1),z[v]!==C&&(i.vertexAttribDivisor(v,C),z[v]=C)}function E(){let v=r.newAttributes,C=r.enabledAttributes;for(let B=0,O=C.length;B<O;B++)C[B]!==v[B]&&(i.disableVertexAttribArray(B),C[B]=0)}function T(v,C,B,O,z,W,G){G===!0?i.vertexAttribIPointer(v,C,B,z,W):i.vertexAttribPointer(v,C,B,O,z,W)}function S(v,C,B,O){x();let z=O.attributes,W=B.getAttributes(),G=C.defaultAttributeValues;for(let te in W){let D=W[te];if(D.location>=0){let Y=z[te];if(Y===void 0&&(te==="instanceMatrix"&&v.instanceMatrix&&(Y=v.instanceMatrix),te==="instanceColor"&&v.instanceColor&&(Y=v.instanceColor)),Y!==void 0){let J=Y.normalized,ce=Y.itemSize,we=e.get(Y);if(we===void 0)continue;let qe=we.buffer,nt=we.type,$e=we.bytesPerElement,Z=nt===i.INT||nt===i.UNSIGNED_INT||Y.gpuType===Va;if(Y.isInterleavedBufferAttribute){let K=Y.data,fe=K.stride,De=Y.offset;if(K.isInstancedInterleavedBuffer){for(let Ee=0;Ee<D.locationSize;Ee++)d(D.location+Ee,K.meshPerAttribute);v.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let Ee=0;Ee<D.locationSize;Ee++)m(D.location+Ee);i.bindBuffer(i.ARRAY_BUFFER,qe);for(let Ee=0;Ee<D.locationSize;Ee++)T(D.location+Ee,ce/D.locationSize,nt,J,fe*$e,(De+ce/D.locationSize*Ee)*$e,Z)}else{if(Y.isInstancedBufferAttribute){for(let K=0;K<D.locationSize;K++)d(D.location+K,Y.meshPerAttribute);v.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let K=0;K<D.locationSize;K++)m(D.location+K);i.bindBuffer(i.ARRAY_BUFFER,qe);for(let K=0;K<D.locationSize;K++)T(D.location+K,ce/D.locationSize,nt,J,ce*$e,ce/D.locationSize*K*$e,Z)}}else if(G!==void 0){let J=G[te];if(J!==void 0)switch(J.length){case 2:i.vertexAttrib2fv(D.location,J);break;case 3:i.vertexAttrib3fv(D.location,J);break;case 4:i.vertexAttrib4fv(D.location,J);break;default:i.vertexAttrib1fv(D.location,J)}}}}E()}function A(){N();for(let v in n){let C=n[v];for(let B in C){let O=C[B];for(let z in O)h(O[z].object),delete O[z];delete C[B]}delete n[v]}}function w(v){if(n[v.id]===void 0)return;let C=n[v.id];for(let B in C){let O=C[B];for(let z in O)h(O[z].object),delete O[z];delete C[B]}delete n[v.id]}function P(v){for(let C in n){let B=n[C];if(B[v.id]===void 0)continue;let O=B[v.id];for(let z in O)h(O[z].object),delete O[z];delete B[v.id]}}function N(){M(),a=!0,r!==s&&(r=s,l(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:N,resetDefaultState:M,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:m,disableUnusedAttributes:E}}function Am(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function a(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function o(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];t.update(p,n,1)}function c(l,h,u,f){if(u===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)a(l[g],h[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*f[x];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Rm(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==pn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){let N=P===Ms&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Tn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==wn&&!N)}function c(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:E,maxVaryings:T,maxFragmentUniforms:S,vertexTextures:A,maxSamples:w}}function Cm(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Cn,o=new ze,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let p=u.length!==0||f||n!==0||s;return s=f,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,p){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,d=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let E=r?0:n,T=E*4,S=d.clippingState||null;c.value=S,S=h(g,f,T,p);for(let A=0;A!==T;++A)S[A]=t[A];d.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,p,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let d=p+x*4,E=f.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<d)&&(m=new Float32Array(d));for(let T=0,S=p;T!==x;++T,S+=4)a.copy(u[T]).applyMatrix4(E,o),a.normal.toArray(m,S),m[S+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function Pm(i){let e=new WeakMap;function t(a,o){return o===za?a.mapping=Oi:o===ka&&(a.mapping=Bi),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===za||o===ka)if(e.has(a)){let c=e.get(a).texture;return t(c,a.mapping)}else{let c=a.image;if(c&&c.height>0){let l=new fa(c.height);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Ts=4,$h=[.125,.215,.35,.446,.526,.582],Gi=20,Zl=new ur,Jh=new Oe,$l=null,Jl=0,Kl=0,jl=!1,Vi=(1+Math.sqrt(5))/2,Es=1/Vi,Kh=[new L(-Vi,Es,0),new L(Vi,Es,0),new L(-Es,0,Vi),new L(Es,0,Vi),new L(0,Vi,-Es),new L(0,Vi,Es),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],Im=new L,Ao=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=Im}=r;$l=this._renderer.getRenderTarget(),Jl=this._renderer.getActiveCubeFace(),Kl=this._renderer.getActiveMipmapLevel(),jl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=eu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Qh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget($l,Jl,Kl),this._renderer.xr.enabled=jl,e.scissorTest=!1,To(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Oi||e.mapping===Bi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),$l=this._renderer.getRenderTarget(),Jl=this._renderer.getActiveCubeFace(),Kl=this._renderer.getActiveMipmapLevel(),jl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Sn,minFilter:Sn,generateMipmaps:!1,type:Ms,format:pn,colorSpace:Li,depthBuffer:!1},s=jh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=jh(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Lm(r)),this._blurMaterial=Dm(r,e,t)}return s}_compileMaterial(e){let t=new Q(this._lodPlanes[0],e);this._renderer.compile(t,Zl)}_sceneToCubeUV(e,t,n,s,r){let c=new Ut(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,p=u.toneMapping;u.getClearColor(Jh),u.toneMapping=ni,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));let x=new fn({name:"PMREM.Background",side:qt,depthWrite:!1,depthTest:!1}),m=new Q(new yt,x),d=!1,E=e.background;E?E.isColor&&(x.color.copy(E),e.background=null,d=!0):(x.color.copy(Jh),d=!0);for(let T=0;T<6;T++){let S=T%3;S===0?(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[T],r.y,r.z)):S===1?(c.up.set(0,0,l[T]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[T],r.z)):(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[T]));let A=this._cubeSize;To(s,S*A,T>2?A:0,A,A),u.setRenderTarget(s),d&&u.render(m,c),u.render(e,c)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=p,u.autoClear=f,e.background=E}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Oi||e.mapping===Bi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=eu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Qh());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new Q(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;To(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Zl)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Kh[(s-r-1)%Kh.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Q(this._lodPlanes[s],l),f=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Gi-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):Gi;m>Gi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Gi}`);let d=[],E=0;for(let P=0;P<Gi;++P){let N=P/x,M=Math.exp(-N*N/2);d.push(M),P===0?E+=M:P<m&&(E+=2*M)}for(let P=0;P<d.length;P++)d[P]=d[P]/E;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:T}=this;f.dTheta.value=g,f.mipInt.value=T-n;let S=this._sizeLods[s],A=3*S*(s>T-Ts?s-T+Ts:0),w=4*(this._cubeSize-S);To(t,A,w,3*S,2*S),c.setRenderTarget(t),c.render(u,Zl)}};function Lm(i){let e=[],t=[],n=[],s=i,r=i-Ts+1+$h.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let c=1/o;a>i-Ts?c=$h[a-i+Ts-1]:a===0&&(c=0),n.push(c);let l=1/(o-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,x=3,m=2,d=1,E=new Float32Array(x*g*p),T=new Float32Array(m*g*p),S=new Float32Array(d*g*p);for(let w=0;w<p;w++){let P=w%3*2/3-1,N=w>2?0:-1,M=[P,N,0,P+2/3,N,0,P+2/3,N+1,0,P,N,0,P+2/3,N+1,0,P,N+1,0];E.set(M,x*g*w),T.set(f,m*g*w);let v=[w,w,w,w,w,w];S.set(v,d*g*w)}let A=new Tt;A.setAttribute("position",new Pt(E,x)),A.setAttribute("uv",new Pt(T,m)),A.setAttribute("faceIndex",new Pt(S,d)),e.push(A),s>Ts&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function jh(i,e,t){let n=new In(i,e,t);return n.texture.mapping=pr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function To(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Dm(i,e,t){let n=new Float32Array(Gi),s=new L(0,1,0);return new En({name:"SphericalGaussianBlur",defines:{n:Gi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:lc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function Qh(){return new En({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function eu(){return new En({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function lc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Um(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let c=o.mapping,l=c===za||c===ka,h=c===Oi||c===Bi;if(l||h){let u=e.get(o),f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new Ao(i)),u=l?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{let p=o.image;return l&&p&&p.height>0||h&&p&&s(p)?(t===null&&(t=new Ao(i)),u=l?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let c=0,l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){let c=o.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Nm(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&ds("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Fm(i,e,t,n){let s={},r=new WeakMap;function a(u){let f=u.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete s[f.id];let p=r.get(f);p&&(e.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function c(u){let f=u.attributes;for(let p in f)e.update(f[p],i.ARRAY_BUFFER)}function l(u){let f=[],p=u.index,g=u.attributes.position,x=0;if(p!==null){let E=p.array;x=p.version;for(let T=0,S=E.length;T<S;T+=3){let A=E[T+0],w=E[T+1],P=E[T+2];f.push(A,w,w,P,P,A)}}else if(g!==void 0){let E=g.array;x=g.version;for(let T=0,S=E.length/3-1;T<S;T+=3){let A=T+0,w=T+1,P=T+2;f.push(A,w,w,P,P,A)}}else return;let m=new(Gl(f)?js:Ks)(f,1);m.version=x;let d=r.get(u);d&&e.remove(d),r.set(u,m)}function h(u){let f=r.get(u);if(f){let p=u.index;p!==null&&f.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function Om(i,e,t){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,p){i.drawElements(n,p,r,f*a),t.update(p,n,1)}function l(f,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,f*a,g),t.update(p,n,g))}function h(f,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];t.update(m,n,1)}function u(f,p,g,x){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)l(f[d]/a,p[d],x[d]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,x,0,g);let d=0;for(let E=0;E<g;E++)d+=p[E]*x[E];t.update(d,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Bm(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function zm(i,e,t){let n=new WeakMap,s=new je;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(o);if(f===void 0||f.count!==u){let M=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",M)};f!==void 0&&f.texture.dispose();let p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],E=o.morphAttributes.color||[],T=0;p===!0&&(T=1),g===!0&&(T=2),x===!0&&(T=3);let S=o.attributes.position.count*T,A=1;S>e.maxTextureSize&&(A=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);let w=new Float32Array(S*A*4*u),P=new Zs(w,S,A,u);P.type=wn,P.needsUpdate=!0;let N=T*4;for(let v=0;v<u;v++){let C=m[v],B=d[v],O=E[v],z=S*A*4*v;for(let W=0;W<C.count;W++){let G=W*N;p===!0&&(s.fromBufferAttribute(C,W),w[z+G+0]=s.x,w[z+G+1]=s.y,w[z+G+2]=s.z,w[z+G+3]=0),g===!0&&(s.fromBufferAttribute(B,W),w[z+G+4]=s.x,w[z+G+5]=s.y,w[z+G+6]=s.z,w[z+G+7]=0),x===!0&&(s.fromBufferAttribute(O,W),w[z+G+8]=s.x,w[z+G+9]=s.y,w[z+G+10]=s.z,w[z+G+11]=O.itemSize===4?s.w:1)}}f={count:u,texture:P,size:new Fe(S,A)},n.set(o,f),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let x=0;x<l.length;x++)p+=l[x];let g=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function km(i,e,t,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function a(){s=new WeakMap}function o(c){let l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}var yu=new Xt,tu=new ar(1,1),vu=new Zs,Mu=new ua,Su=new er,nu=[],iu=[],su=new Float32Array(16),ru=new Float32Array(9),au=new Float32Array(4);function As(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=nu[s];if(r===void 0&&(r=new Float32Array(s),nu[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function wt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function At(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Co(i,e){let t=iu[e];t===void 0&&(t=new Int32Array(e),iu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Hm(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Vm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;i.uniform2fv(this.addr,e),At(t,e)}}function Gm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(wt(t,e))return;i.uniform3fv(this.addr,e),At(t,e)}}function Wm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;i.uniform4fv(this.addr,e),At(t,e)}}function Xm(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(wt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),At(t,e)}else{if(wt(t,n))return;au.set(n),i.uniformMatrix2fv(this.addr,!1,au),At(t,n)}}function qm(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(wt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),At(t,e)}else{if(wt(t,n))return;ru.set(n),i.uniformMatrix3fv(this.addr,!1,ru),At(t,n)}}function Ym(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(wt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),At(t,e)}else{if(wt(t,n))return;su.set(n),i.uniformMatrix4fv(this.addr,!1,su),At(t,n)}}function Zm(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function $m(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;i.uniform2iv(this.addr,e),At(t,e)}}function Jm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;i.uniform3iv(this.addr,e),At(t,e)}}function Km(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;i.uniform4iv(this.addr,e),At(t,e)}}function jm(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Qm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;i.uniform2uiv(this.addr,e),At(t,e)}}function eg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;i.uniform3uiv(this.addr,e),At(t,e)}}function tg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;i.uniform4uiv(this.addr,e),At(t,e)}}function ng(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(tu.compareFunction=Hl,r=tu):r=yu,t.setTexture2D(e||r,s)}function ig(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Mu,s)}function sg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Su,s)}function rg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||vu,s)}function ag(i){switch(i){case 5126:return Hm;case 35664:return Vm;case 35665:return Gm;case 35666:return Wm;case 35674:return Xm;case 35675:return qm;case 35676:return Ym;case 5124:case 35670:return Zm;case 35667:case 35671:return $m;case 35668:case 35672:return Jm;case 35669:case 35673:return Km;case 5125:return jm;case 36294:return Qm;case 36295:return eg;case 36296:return tg;case 35678:case 36198:case 36298:case 36306:case 35682:return ng;case 35679:case 36299:case 36307:return ig;case 35680:case 36300:case 36308:case 36293:return sg;case 36289:case 36303:case 36311:case 36292:return rg}}function og(i,e){i.uniform1fv(this.addr,e)}function lg(i,e){let t=As(e,this.size,2);i.uniform2fv(this.addr,t)}function cg(i,e){let t=As(e,this.size,3);i.uniform3fv(this.addr,t)}function hg(i,e){let t=As(e,this.size,4);i.uniform4fv(this.addr,t)}function ug(i,e){let t=As(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function dg(i,e){let t=As(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function fg(i,e){let t=As(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function pg(i,e){i.uniform1iv(this.addr,e)}function mg(i,e){i.uniform2iv(this.addr,e)}function gg(i,e){i.uniform3iv(this.addr,e)}function _g(i,e){i.uniform4iv(this.addr,e)}function xg(i,e){i.uniform1uiv(this.addr,e)}function yg(i,e){i.uniform2uiv(this.addr,e)}function vg(i,e){i.uniform3uiv(this.addr,e)}function Mg(i,e){i.uniform4uiv(this.addr,e)}function Sg(i,e,t){let n=this.cache,s=e.length,r=Co(t,s);wt(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||yu,r[a])}function bg(i,e,t){let n=this.cache,s=e.length,r=Co(t,s);wt(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Mu,r[a])}function Eg(i,e,t){let n=this.cache,s=e.length,r=Co(t,s);wt(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Su,r[a])}function Tg(i,e,t){let n=this.cache,s=e.length,r=Co(t,s);wt(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||vu,r[a])}function wg(i){switch(i){case 5126:return og;case 35664:return lg;case 35665:return cg;case 35666:return hg;case 35674:return ug;case 35675:return dg;case 35676:return fg;case 5124:case 35670:return pg;case 35667:case 35671:return mg;case 35668:case 35672:return gg;case 35669:case 35673:return _g;case 5125:return xg;case 36294:return yg;case 36295:return vg;case 36296:return Mg;case 35678:case 36198:case 36298:case 36306:case 35682:return Sg;case 35679:case 36299:case 36307:return bg;case 35680:case 36300:case 36308:case 36293:return Eg;case 36289:case 36303:case 36311:case 36292:return Tg}}var ec=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ag(t.type)}},tc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=wg(t.type)}},nc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},Ql=/(\w+)(\])?(\[|\.)?/g;function ou(i,e){i.seq.push(e),i.map[e.id]=e}function Ag(i,e,t){let n=i.name,s=n.length;for(Ql.lastIndex=0;;){let r=Ql.exec(n),a=Ql.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){ou(t,l===void 0?new ec(o,i,e):new tc(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new nc(o),ou(t,u)),t=u}}}var ws=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);Ag(r,a,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function lu(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Rg=37297,Cg=0;function Pg(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var cu=new ze;function Ig(i){Ze._getMatrix(cu,Ze.workingColorSpace,i);let e=`mat3( ${cu.elements.map(t=>t.toFixed(4))} )`;switch(Ze.getTransfer(i)){case Xs:return[e,"LinearTransferOETF"];case Qe:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function hu(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Pg(i.getShaderSource(e),o)}else return r}function Lg(i,e){let t=Ig(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Dg(i,e){let t;switch(e){case wh:t="Linear";break;case Ah:t="Reinhard";break;case Rh:t="Cineon";break;case Ba:t="ACESFilmic";break;case Ph:t="AgX";break;case Ih:t="Neutral";break;case Ch:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var wo=new L;function Ug(){Ze.getLuminanceCoefficients(wo);let i=wo.x.toFixed(4),e=wo.y.toFixed(4),t=wo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ng(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(vr).join(`
`)}function Fg(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Og(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function vr(i){return i!==""}function uu(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function du(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Bg=/^[ \t]*#include +<([\w\d./]+)>/gm;function ic(i){return i.replace(Bg,kg)}var zg=new Map;function kg(i,e){let t=Ge[e];if(t===void 0){let n=zg.get(e);if(n!==void 0)t=Ge[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ic(t)}var Hg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fu(i){return i.replace(Hg,Vg)}function Vg(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function pu(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Gg(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Cl?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ca?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===On&&(e="SHADOWMAP_TYPE_VSM"),e}function Wg(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Oi:case Bi:e="ENVMAP_TYPE_CUBE";break;case pr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Xg(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Bi&&(e="ENVMAP_MODE_REFRACTION"),e}function qg(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Oa:e="ENVMAP_BLENDING_MULTIPLY";break;case Eh:e="ENVMAP_BLENDING_MIX";break;case Th:e="ENVMAP_BLENDING_ADD";break}return e}function Yg(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Zg(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=Gg(t),l=Wg(t),h=Xg(t),u=qg(t),f=Yg(t),p=Ng(t),g=Fg(r),x=s.createProgram(),m,d,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(vr).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(vr).join(`
`),d.length>0&&(d+=`
`)):(m=[pu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vr).join(`
`),d=[pu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ni?"#define TONE_MAPPING":"",t.toneMapping!==ni?Ge.tonemapping_pars_fragment:"",t.toneMapping!==ni?Dg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,Lg("linearToOutputTexel",t.outputColorSpace),Ug(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(vr).join(`
`)),a=ic(a),a=uu(a,t),a=du(a,t),o=ic(o),o=uu(o,t),o=du(o,t),a=fu(a),o=fu(o),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===Vl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Vl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let T=E+m+a,S=E+d+o,A=lu(s,s.VERTEX_SHADER,T),w=lu(s,s.FRAGMENT_SHADER,S);s.attachShader(x,A),s.attachShader(x,w),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function P(C){if(i.debug.checkShaderErrors){let B=s.getProgramInfoLog(x)||"",O=s.getShaderInfoLog(A)||"",z=s.getShaderInfoLog(w)||"",W=B.trim(),G=O.trim(),te=z.trim(),D=!0,Y=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(D=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,A,w);else{let J=hu(s,A,"vertex"),ce=hu(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+W+`
`+J+`
`+ce)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(G===""||te==="")&&(Y=!1);Y&&(C.diagnostics={runnable:D,programLog:W,vertexShader:{log:G,prefix:m},fragmentShader:{log:te,prefix:d}})}s.deleteShader(A),s.deleteShader(w),N=new ws(s,x),M=Og(s,x)}let N;this.getUniforms=function(){return N===void 0&&P(this),N};let M;this.getAttributes=function(){return M===void 0&&P(this),M};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(x,Rg)),v},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Cg++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=A,this.fragmentShader=w,this}var $g=0,sc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new rc(e),t.set(e,n)),n}},rc=class{constructor(e){this.id=$g++,this.code=e,this.usedTimes=0}};function Jg(i,e,t,n,s,r,a){let o=new Js,c=new sc,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return l.add(M),M===0?"uv":`uv${M}`}function m(M,v,C,B,O){let z=B.fog,W=O.geometry,G=M.isMeshStandardMaterial?B.environment:null,te=(M.isMeshStandardMaterial?t:e).get(M.envMap||G),D=te&&te.mapping===pr?te.image.height:null,Y=g[M.type];M.precision!==null&&(p=s.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));let J=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ce=J!==void 0?J.length:0,we=0;W.morphAttributes.position!==void 0&&(we=1),W.morphAttributes.normal!==void 0&&(we=2),W.morphAttributes.color!==void 0&&(we=3);let qe,nt,$e,Z;if(Y){let Ke=Bn[Y];qe=Ke.vertexShader,nt=Ke.fragmentShader}else qe=M.vertexShader,nt=M.fragmentShader,c.update(M),$e=c.getVertexShaderID(M),Z=c.getFragmentShaderID(M);let K=i.getRenderTarget(),fe=i.state.buffers.depth.getReversed(),De=O.isInstancedMesh===!0,Ee=O.isBatchedMesh===!0,Ye=!!M.map,Ot=!!M.matcap,R=!!te,ut=!!M.aoMap,Be=!!M.lightMap,Ie=!!M.bumpMap,xe=!!M.normalMap,dt=!!M.displacementMap,ye=!!M.emissiveMap,Ve=!!M.metalnessMap,Rt=!!M.roughnessMap,xt=M.anisotropy>0,b=M.clearcoat>0,_=M.dispersion>0,k=M.iridescence>0,q=M.sheen>0,j=M.transmission>0,X=xt&&!!M.anisotropyMap,be=b&&!!M.clearcoatMap,re=b&&!!M.clearcoatNormalMap,ve=b&&!!M.clearcoatRoughnessMap,Me=k&&!!M.iridescenceMap,ie=k&&!!M.iridescenceThicknessMap,ue=q&&!!M.sheenColorMap,Ce=q&&!!M.sheenRoughnessMap,Se=!!M.specularMap,le=!!M.specularColorMap,He=!!M.specularIntensityMap,I=j&&!!M.transmissionMap,se=j&&!!M.thicknessMap,ae=!!M.gradientMap,me=!!M.alphaMap,ee=M.alphaTest>0,$=!!M.alphaHash,_e=!!M.extensions,Ne=ni;M.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Ne=i.toneMapping);let lt={shaderID:Y,shaderType:M.type,shaderName:M.name,vertexShader:qe,fragmentShader:nt,defines:M.defines,customVertexShaderID:$e,customFragmentShaderID:Z,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:Ee,batchingColor:Ee&&O._colorsTexture!==null,instancing:De,instancingColor:De&&O.instanceColor!==null,instancingMorph:De&&O.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:K===null?i.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Li,alphaToCoverage:!!M.alphaToCoverage,map:Ye,matcap:Ot,envMap:R,envMapMode:R&&te.mapping,envMapCubeUVHeight:D,aoMap:ut,lightMap:Be,bumpMap:Ie,normalMap:xe,displacementMap:f&&dt,emissiveMap:ye,normalMapObjectSpace:xe&&M.normalMapType===Nh,normalMapTangentSpace:xe&&M.normalMapType===kl,metalnessMap:Ve,roughnessMap:Rt,anisotropy:xt,anisotropyMap:X,clearcoat:b,clearcoatMap:be,clearcoatNormalMap:re,clearcoatRoughnessMap:ve,dispersion:_,iridescence:k,iridescenceMap:Me,iridescenceThicknessMap:ie,sheen:q,sheenColorMap:ue,sheenRoughnessMap:Ce,specularMap:Se,specularColorMap:le,specularIntensityMap:He,transmission:j,transmissionMap:I,thicknessMap:se,gradientMap:ae,opaque:M.transparent===!1&&M.blending===Pi&&M.alphaToCoverage===!1,alphaMap:me,alphaTest:ee,alphaHash:$,combine:M.combine,mapUv:Ye&&x(M.map.channel),aoMapUv:ut&&x(M.aoMap.channel),lightMapUv:Be&&x(M.lightMap.channel),bumpMapUv:Ie&&x(M.bumpMap.channel),normalMapUv:xe&&x(M.normalMap.channel),displacementMapUv:dt&&x(M.displacementMap.channel),emissiveMapUv:ye&&x(M.emissiveMap.channel),metalnessMapUv:Ve&&x(M.metalnessMap.channel),roughnessMapUv:Rt&&x(M.roughnessMap.channel),anisotropyMapUv:X&&x(M.anisotropyMap.channel),clearcoatMapUv:be&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:re&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Me&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&x(M.sheenRoughnessMap.channel),specularMapUv:Se&&x(M.specularMap.channel),specularColorMapUv:le&&x(M.specularColorMap.channel),specularIntensityMapUv:He&&x(M.specularIntensityMap.channel),transmissionMapUv:I&&x(M.transmissionMap.channel),thicknessMapUv:se&&x(M.thicknessMap.channel),alphaMapUv:me&&x(M.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(xe||xt),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!W.attributes.uv&&(Ye||me),fog:!!z,useFog:M.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:fe,skinning:O.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:ce,morphTextureStride:we,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ne,decodeVideoTexture:Ye&&M.map.isVideoTexture===!0&&Ze.getTransfer(M.map.colorSpace)===Qe,decodeVideoTextureEmissive:ye&&M.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(M.emissiveMap.colorSpace)===Qe,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===an,flipSided:M.side===qt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:_e&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&M.extensions.multiDraw===!0||Ee)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return lt.vertexUv1s=l.has(1),lt.vertexUv2s=l.has(2),lt.vertexUv3s=l.has(3),l.clear(),lt}function d(M){let v=[];if(M.shaderID?v.push(M.shaderID):(v.push(M.customVertexShaderID),v.push(M.customFragmentShaderID)),M.defines!==void 0)for(let C in M.defines)v.push(C),v.push(M.defines[C]);return M.isRawShaderMaterial===!1&&(E(v,M),T(v,M),v.push(i.outputColorSpace)),v.push(M.customProgramCacheKey),v.join()}function E(M,v){M.push(v.precision),M.push(v.outputColorSpace),M.push(v.envMapMode),M.push(v.envMapCubeUVHeight),M.push(v.mapUv),M.push(v.alphaMapUv),M.push(v.lightMapUv),M.push(v.aoMapUv),M.push(v.bumpMapUv),M.push(v.normalMapUv),M.push(v.displacementMapUv),M.push(v.emissiveMapUv),M.push(v.metalnessMapUv),M.push(v.roughnessMapUv),M.push(v.anisotropyMapUv),M.push(v.clearcoatMapUv),M.push(v.clearcoatNormalMapUv),M.push(v.clearcoatRoughnessMapUv),M.push(v.iridescenceMapUv),M.push(v.iridescenceThicknessMapUv),M.push(v.sheenColorMapUv),M.push(v.sheenRoughnessMapUv),M.push(v.specularMapUv),M.push(v.specularColorMapUv),M.push(v.specularIntensityMapUv),M.push(v.transmissionMapUv),M.push(v.thicknessMapUv),M.push(v.combine),M.push(v.fogExp2),M.push(v.sizeAttenuation),M.push(v.morphTargetsCount),M.push(v.morphAttributeCount),M.push(v.numDirLights),M.push(v.numPointLights),M.push(v.numSpotLights),M.push(v.numSpotLightMaps),M.push(v.numHemiLights),M.push(v.numRectAreaLights),M.push(v.numDirLightShadows),M.push(v.numPointLightShadows),M.push(v.numSpotLightShadows),M.push(v.numSpotLightShadowsWithMaps),M.push(v.numLightProbes),M.push(v.shadowMapType),M.push(v.toneMapping),M.push(v.numClippingPlanes),M.push(v.numClipIntersection),M.push(v.depthPacking)}function T(M,v){o.disableAll(),v.supportsVertexTextures&&o.enable(0),v.instancing&&o.enable(1),v.instancingColor&&o.enable(2),v.instancingMorph&&o.enable(3),v.matcap&&o.enable(4),v.envMap&&o.enable(5),v.normalMapObjectSpace&&o.enable(6),v.normalMapTangentSpace&&o.enable(7),v.clearcoat&&o.enable(8),v.iridescence&&o.enable(9),v.alphaTest&&o.enable(10),v.vertexColors&&o.enable(11),v.vertexAlphas&&o.enable(12),v.vertexUv1s&&o.enable(13),v.vertexUv2s&&o.enable(14),v.vertexUv3s&&o.enable(15),v.vertexTangents&&o.enable(16),v.anisotropy&&o.enable(17),v.alphaHash&&o.enable(18),v.batching&&o.enable(19),v.dispersion&&o.enable(20),v.batchingColor&&o.enable(21),v.gradientMap&&o.enable(22),M.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.reversedDepthBuffer&&o.enable(4),v.skinning&&o.enable(5),v.morphTargets&&o.enable(6),v.morphNormals&&o.enable(7),v.morphColors&&o.enable(8),v.premultipliedAlpha&&o.enable(9),v.shadowMapEnabled&&o.enable(10),v.doubleSided&&o.enable(11),v.flipSided&&o.enable(12),v.useDepthPacking&&o.enable(13),v.dithering&&o.enable(14),v.transmission&&o.enable(15),v.sheen&&o.enable(16),v.opaque&&o.enable(17),v.pointsUvs&&o.enable(18),v.decodeVideoTexture&&o.enable(19),v.decodeVideoTextureEmissive&&o.enable(20),v.alphaToCoverage&&o.enable(21),M.push(o.mask)}function S(M){let v=g[M.type],C;if(v){let B=Bn[v];C=qh.clone(B.uniforms)}else C=M.uniforms;return C}function A(M,v){let C;for(let B=0,O=h.length;B<O;B++){let z=h[B];if(z.cacheKey===v){C=z,++C.usedTimes;break}}return C===void 0&&(C=new Zg(i,v,M,r),h.push(C)),C}function w(M){if(--M.usedTimes===0){let v=h.indexOf(M);h[v]=h[h.length-1],h.pop(),M.destroy()}}function P(M){c.remove(M)}function N(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:S,acquireProgram:A,releaseProgram:w,releaseShaderCache:P,programs:h,dispose:N}}function Kg(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function jg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function mu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function gu(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,f,p,g,x,m){let d=i[e];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},i[e]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=x,d.group=m),e++,d}function o(u,f,p,g,x,m){let d=a(u,f,p,g,x,m);p.transmission>0?n.push(d):p.transparent===!0?s.push(d):t.push(d)}function c(u,f,p,g,x,m){let d=a(u,f,p,g,x,m);p.transmission>0?n.unshift(d):p.transparent===!0?s.unshift(d):t.unshift(d)}function l(u,f){t.length>1&&t.sort(u||jg),n.length>1&&n.sort(f||mu),s.length>1&&s.sort(f||mu)}function h(){for(let u=e,f=i.length;u<f;u++){let p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function Qg(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new gu,i.set(n,[a])):s>=r.length?(a=new gu,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function e0(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Oe};break;case"SpotLight":t={position:new L,direction:new L,color:new Oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Oe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Oe,groundColor:new Oe};break;case"RectAreaLight":t={color:new Oe,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function t0(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var n0=0;function i0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function s0(i){let e=new e0,t=t0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);let s=new L,r=new et,a=new et;function o(l){let h=0,u=0,f=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let p=0,g=0,x=0,m=0,d=0,E=0,T=0,S=0,A=0,w=0,P=0;l.sort(i0);for(let M=0,v=l.length;M<v;M++){let C=l[M],B=C.color,O=C.intensity,z=C.distance,W=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=B.r*O,u+=B.g*O,f+=B.b*O;else if(C.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(C.sh.coefficients[G],O);P++}else if(C.isDirectionalLight){let G=e.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let te=C.shadow,D=t.get(C);D.shadowIntensity=te.intensity,D.shadowBias=te.bias,D.shadowNormalBias=te.normalBias,D.shadowRadius=te.radius,D.shadowMapSize=te.mapSize,n.directionalShadow[p]=D,n.directionalShadowMap[p]=W,n.directionalShadowMatrix[p]=C.shadow.matrix,E++}n.directional[p]=G,p++}else if(C.isSpotLight){let G=e.get(C);G.position.setFromMatrixPosition(C.matrixWorld),G.color.copy(B).multiplyScalar(O),G.distance=z,G.coneCos=Math.cos(C.angle),G.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),G.decay=C.decay,n.spot[x]=G;let te=C.shadow;if(C.map&&(n.spotLightMap[A]=C.map,A++,te.updateMatrices(C),C.castShadow&&w++),n.spotLightMatrix[x]=te.matrix,C.castShadow){let D=t.get(C);D.shadowIntensity=te.intensity,D.shadowBias=te.bias,D.shadowNormalBias=te.normalBias,D.shadowRadius=te.radius,D.shadowMapSize=te.mapSize,n.spotShadow[x]=D,n.spotShadowMap[x]=W,S++}x++}else if(C.isRectAreaLight){let G=e.get(C);G.color.copy(B).multiplyScalar(O),G.halfWidth.set(C.width*.5,0,0),G.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=G,m++}else if(C.isPointLight){let G=e.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),G.distance=C.distance,G.decay=C.decay,C.castShadow){let te=C.shadow,D=t.get(C);D.shadowIntensity=te.intensity,D.shadowBias=te.bias,D.shadowNormalBias=te.normalBias,D.shadowRadius=te.radius,D.shadowMapSize=te.mapSize,D.shadowCameraNear=te.camera.near,D.shadowCameraFar=te.camera.far,n.pointShadow[g]=D,n.pointShadowMap[g]=W,n.pointShadowMatrix[g]=C.shadow.matrix,T++}n.point[g]=G,g++}else if(C.isHemisphereLight){let G=e.get(C);G.skyColor.copy(C.color).multiplyScalar(O),G.groundColor.copy(C.groundColor).multiplyScalar(O),n.hemi[d]=G,d++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=oe.LTC_FLOAT_1,n.rectAreaLTC2=oe.LTC_FLOAT_2):(n.rectAreaLTC1=oe.LTC_HALF_1,n.rectAreaLTC2=oe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let N=n.hash;(N.directionalLength!==p||N.pointLength!==g||N.spotLength!==x||N.rectAreaLength!==m||N.hemiLength!==d||N.numDirectionalShadows!==E||N.numPointShadows!==T||N.numSpotShadows!==S||N.numSpotMaps!==A||N.numLightProbes!==P)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=T,n.pointShadowMap.length=T,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=T,n.spotLightMatrix.length=S+A-w,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=P,N.directionalLength=p,N.pointLength=g,N.spotLength=x,N.rectAreaLength=m,N.hemiLength=d,N.numDirectionalShadows=E,N.numPointShadows=T,N.numSpotShadows=S,N.numSpotMaps=A,N.numLightProbes=P,n.version=n0++)}function c(l,h){let u=0,f=0,p=0,g=0,x=0,m=h.matrixWorldInverse;for(let d=0,E=l.length;d<E;d++){let T=l[d];if(T.isDirectionalLight){let S=n.directional[u];S.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),u++}else if(T.isSpotLight){let S=n.spot[p];S.position.setFromMatrixPosition(T.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),p++}else if(T.isRectAreaLight){let S=n.rectArea[g];S.position.setFromMatrixPosition(T.matrixWorld),S.position.applyMatrix4(m),a.identity(),r.copy(T.matrixWorld),r.premultiply(m),a.extractRotation(r),S.halfWidth.set(T.width*.5,0,0),S.halfHeight.set(0,T.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),g++}else if(T.isPointLight){let S=n.point[f];S.position.setFromMatrixPosition(T.matrixWorld),S.position.applyMatrix4(m),f++}else if(T.isHemisphereLight){let S=n.hemi[x];S.direction.setFromMatrixPosition(T.matrixWorld),S.direction.transformDirection(m),x++}}}return{setup:o,setupView:c,state:n}}function _u(i){let e=new s0(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function c(h){e.setupView(t,h)}let l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function r0(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new _u(i),e.set(s,[o])):r>=a.length?(o=new _u(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var a0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,o0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function l0(i,e,t){let n=new gs,s=new Fe,r=new Fe,a=new je,o=new ga({depthPacking:Uh}),c=new _a,l={},h=t.maxTextureSize,u={[Kn]:qt,[qt]:Kn,[an]:an},f=new En({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Fe},radius:{value:4}},vertexShader:a0,fragmentShader:o0}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let g=new Tt;g.setAttribute("position",new Pt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Q(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cl;let d=this.type;this.render=function(w,P,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;let M=i.getRenderTarget(),v=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),B=i.state;B.setBlending(ti),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let O=d!==On&&this.type===On,z=d===On&&this.type!==On;for(let W=0,G=w.length;W<G;W++){let te=w[W],D=te.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;s.copy(D.mapSize);let Y=D.getFrameExtents();if(s.multiply(Y),r.copy(D.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Y.x),s.x=r.x*Y.x,D.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Y.y),s.y=r.y*Y.y,D.mapSize.y=r.y)),D.map===null||O===!0||z===!0){let ce=this.type!==On?{minFilter:$t,magFilter:$t}:{};D.map!==null&&D.map.dispose(),D.map=new In(s.x,s.y,ce),D.map.texture.name=te.name+".shadowMap",D.camera.updateProjectionMatrix()}i.setRenderTarget(D.map),i.clear();let J=D.getViewportCount();for(let ce=0;ce<J;ce++){let we=D.getViewport(ce);a.set(r.x*we.x,r.y*we.y,r.x*we.z,r.y*we.w),B.viewport(a),D.updateMatrices(te,ce),n=D.getFrustum(),S(P,N,D.camera,te,this.type)}D.isPointLightShadow!==!0&&this.type===On&&E(D,N),D.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(M,v,C)};function E(w,P){let N=e.update(x);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new In(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(P,null,N,f,x,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(P,null,N,p,x,null)}function T(w,P,N,M){let v=null,C=N.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)v=C;else if(v=N.isPointLight===!0?c:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let B=v.uuid,O=P.uuid,z=l[B];z===void 0&&(z={},l[B]=z);let W=z[O];W===void 0&&(W=v.clone(),z[O]=W,P.addEventListener("dispose",A)),v=W}if(v.visible=P.visible,v.wireframe=P.wireframe,M===On?v.side=P.shadowSide!==null?P.shadowSide:P.side:v.side=P.shadowSide!==null?P.shadowSide:u[P.side],v.alphaMap=P.alphaMap,v.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,v.map=P.map,v.clipShadows=P.clipShadows,v.clippingPlanes=P.clippingPlanes,v.clipIntersection=P.clipIntersection,v.displacementMap=P.displacementMap,v.displacementScale=P.displacementScale,v.displacementBias=P.displacementBias,v.wireframeLinewidth=P.wireframeLinewidth,v.linewidth=P.linewidth,N.isPointLight===!0&&v.isMeshDistanceMaterial===!0){let B=i.properties.get(v);B.light=N}return v}function S(w,P,N,M,v){if(w.visible===!1)return;if(w.layers.test(P.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&v===On)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,w.matrixWorld);let O=e.update(w),z=w.material;if(Array.isArray(z)){let W=O.groups;for(let G=0,te=W.length;G<te;G++){let D=W[G],Y=z[D.materialIndex];if(Y&&Y.visible){let J=T(w,Y,M,v);w.onBeforeShadow(i,w,P,N,O,J,D),i.renderBufferDirect(N,null,O,J,w,D),w.onAfterShadow(i,w,P,N,O,J,D)}}}else if(z.visible){let W=T(w,z,M,v);w.onBeforeShadow(i,w,P,N,O,W,null),i.renderBufferDirect(N,null,O,W,w,null),w.onAfterShadow(i,w,P,N,O,W,null)}}let B=w.children;for(let O=0,z=B.length;O<z;O++)S(B[O],P,N,M,v)}function A(w){w.target.removeEventListener("dispose",A);for(let N in l){let M=l[N],v=w.target.uuid;v in M&&(M[v].dispose(),delete M[v])}}}var c0={[Pa]:Ia,[La]:Na,[Da]:Fa,[Ii]:Ua,[Ia]:Pa,[Na]:La,[Fa]:Da,[Ua]:Ii};function h0(i,e){function t(){let I=!1,se=new je,ae=null,me=new je(0,0,0,0);return{setMask:function(ee){ae!==ee&&!I&&(i.colorMask(ee,ee,ee,ee),ae=ee)},setLocked:function(ee){I=ee},setClear:function(ee,$,_e,Ne,lt){lt===!0&&(ee*=Ne,$*=Ne,_e*=Ne),se.set(ee,$,_e,Ne),me.equals(se)===!1&&(i.clearColor(ee,$,_e,Ne),me.copy(se))},reset:function(){I=!1,ae=null,me.set(-1,0,0,0)}}}function n(){let I=!1,se=!1,ae=null,me=null,ee=null;return{setReversed:function($){if(se!==$){let _e=e.get("EXT_clip_control");$?_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.ZERO_TO_ONE_EXT):_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.NEGATIVE_ONE_TO_ONE_EXT),se=$;let Ne=ee;ee=null,this.setClear(Ne)}},getReversed:function(){return se},setTest:function($){$?K(i.DEPTH_TEST):fe(i.DEPTH_TEST)},setMask:function($){ae!==$&&!I&&(i.depthMask($),ae=$)},setFunc:function($){if(se&&($=c0[$]),me!==$){switch($){case Pa:i.depthFunc(i.NEVER);break;case Ia:i.depthFunc(i.ALWAYS);break;case La:i.depthFunc(i.LESS);break;case Ii:i.depthFunc(i.LEQUAL);break;case Da:i.depthFunc(i.EQUAL);break;case Ua:i.depthFunc(i.GEQUAL);break;case Na:i.depthFunc(i.GREATER);break;case Fa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}me=$}},setLocked:function($){I=$},setClear:function($){ee!==$&&(se&&($=1-$),i.clearDepth($),ee=$)},reset:function(){I=!1,ae=null,me=null,ee=null,se=!1}}}function s(){let I=!1,se=null,ae=null,me=null,ee=null,$=null,_e=null,Ne=null,lt=null;return{setTest:function(Ke){I||(Ke?K(i.STENCIL_TEST):fe(i.STENCIL_TEST))},setMask:function(Ke){se!==Ke&&!I&&(i.stencilMask(Ke),se=Ke)},setFunc:function(Ke,Gn,Rn){(ae!==Ke||me!==Gn||ee!==Rn)&&(i.stencilFunc(Ke,Gn,Rn),ae=Ke,me=Gn,ee=Rn)},setOp:function(Ke,Gn,Rn){($!==Ke||_e!==Gn||Ne!==Rn)&&(i.stencilOp(Ke,Gn,Rn),$=Ke,_e=Gn,Ne=Rn)},setLocked:function(Ke){I=Ke},setClear:function(Ke){lt!==Ke&&(i.clearStencil(Ke),lt=Ke)},reset:function(){I=!1,se=null,ae=null,me=null,ee=null,$=null,_e=null,Ne=null,lt=null}}}let r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap,h={},u={},f=new WeakMap,p=[],g=null,x=!1,m=null,d=null,E=null,T=null,S=null,A=null,w=null,P=new Oe(0,0,0),N=0,M=!1,v=null,C=null,B=null,O=null,z=null,W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,te=0,D=i.getParameter(i.VERSION);D.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(D)[1]),G=te>=1):D.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(D)[1]),G=te>=2);let Y=null,J={},ce=i.getParameter(i.SCISSOR_BOX),we=i.getParameter(i.VIEWPORT),qe=new je().fromArray(ce),nt=new je().fromArray(we);function $e(I,se,ae,me){let ee=new Uint8Array(4),$=i.createTexture();i.bindTexture(I,$),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let _e=0;_e<ae;_e++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(se,0,i.RGBA,1,1,me,0,i.RGBA,i.UNSIGNED_BYTE,ee):i.texImage2D(se+_e,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ee);return $}let Z={};Z[i.TEXTURE_2D]=$e(i.TEXTURE_2D,i.TEXTURE_2D,1),Z[i.TEXTURE_CUBE_MAP]=$e(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[i.TEXTURE_2D_ARRAY]=$e(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Z[i.TEXTURE_3D]=$e(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),K(i.DEPTH_TEST),a.setFunc(Ii),Ie(!1),xe(Rl),K(i.CULL_FACE),ut(ti);function K(I){h[I]!==!0&&(i.enable(I),h[I]=!0)}function fe(I){h[I]!==!1&&(i.disable(I),h[I]=!1)}function De(I,se){return u[I]!==se?(i.bindFramebuffer(I,se),u[I]=se,I===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=se),I===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=se),!0):!1}function Ee(I,se){let ae=p,me=!1;if(I){ae=f.get(se),ae===void 0&&(ae=[],f.set(se,ae));let ee=I.textures;if(ae.length!==ee.length||ae[0]!==i.COLOR_ATTACHMENT0){for(let $=0,_e=ee.length;$<_e;$++)ae[$]=i.COLOR_ATTACHMENT0+$;ae.length=ee.length,me=!0}}else ae[0]!==i.BACK&&(ae[0]=i.BACK,me=!0);me&&i.drawBuffers(ae)}function Ye(I){return g!==I?(i.useProgram(I),g=I,!0):!1}let Ot={[fi]:i.FUNC_ADD,[oh]:i.FUNC_SUBTRACT,[lh]:i.FUNC_REVERSE_SUBTRACT};Ot[ch]=i.MIN,Ot[hh]=i.MAX;let R={[uh]:i.ZERO,[dh]:i.ONE,[fh]:i.SRC_COLOR,[ia]:i.SRC_ALPHA,[yh]:i.SRC_ALPHA_SATURATE,[_h]:i.DST_COLOR,[mh]:i.DST_ALPHA,[ph]:i.ONE_MINUS_SRC_COLOR,[sa]:i.ONE_MINUS_SRC_ALPHA,[xh]:i.ONE_MINUS_DST_COLOR,[gh]:i.ONE_MINUS_DST_ALPHA,[vh]:i.CONSTANT_COLOR,[Mh]:i.ONE_MINUS_CONSTANT_COLOR,[Sh]:i.CONSTANT_ALPHA,[bh]:i.ONE_MINUS_CONSTANT_ALPHA};function ut(I,se,ae,me,ee,$,_e,Ne,lt,Ke){if(I===ti){x===!0&&(fe(i.BLEND),x=!1);return}if(x===!1&&(K(i.BLEND),x=!0),I!==ah){if(I!==m||Ke!==M){if((d!==fi||S!==fi)&&(i.blendEquation(i.FUNC_ADD),d=fi,S=fi),Ke)switch(I){case Pi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _i:i.blendFunc(i.ONE,i.ONE);break;case Pl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Il:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Pi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _i:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Pl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Il:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}E=null,T=null,A=null,w=null,P.set(0,0,0),N=0,m=I,M=Ke}return}ee=ee||se,$=$||ae,_e=_e||me,(se!==d||ee!==S)&&(i.blendEquationSeparate(Ot[se],Ot[ee]),d=se,S=ee),(ae!==E||me!==T||$!==A||_e!==w)&&(i.blendFuncSeparate(R[ae],R[me],R[$],R[_e]),E=ae,T=me,A=$,w=_e),(Ne.equals(P)===!1||lt!==N)&&(i.blendColor(Ne.r,Ne.g,Ne.b,lt),P.copy(Ne),N=lt),m=I,M=!1}function Be(I,se){I.side===an?fe(i.CULL_FACE):K(i.CULL_FACE);let ae=I.side===qt;se&&(ae=!ae),Ie(ae),I.blending===Pi&&I.transparent===!1?ut(ti):ut(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);let me=I.stencilWrite;o.setTest(me),me&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),ye(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?K(i.SAMPLE_ALPHA_TO_COVERAGE):fe(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ie(I){v!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),v=I)}function xe(I){I!==sh?(K(i.CULL_FACE),I!==C&&(I===Rl?i.cullFace(i.BACK):I===rh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):fe(i.CULL_FACE),C=I}function dt(I){I!==B&&(G&&i.lineWidth(I),B=I)}function ye(I,se,ae){I?(K(i.POLYGON_OFFSET_FILL),(O!==se||z!==ae)&&(i.polygonOffset(se,ae),O=se,z=ae)):fe(i.POLYGON_OFFSET_FILL)}function Ve(I){I?K(i.SCISSOR_TEST):fe(i.SCISSOR_TEST)}function Rt(I){I===void 0&&(I=i.TEXTURE0+W-1),Y!==I&&(i.activeTexture(I),Y=I)}function xt(I,se,ae){ae===void 0&&(Y===null?ae=i.TEXTURE0+W-1:ae=Y);let me=J[ae];me===void 0&&(me={type:void 0,texture:void 0},J[ae]=me),(me.type!==I||me.texture!==se)&&(Y!==ae&&(i.activeTexture(ae),Y=ae),i.bindTexture(I,se||Z[I]),me.type=I,me.texture=se)}function b(){let I=J[Y];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function _(){try{i.compressedTexImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function k(){try{i.compressedTexImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function q(){try{i.texSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function j(){try{i.texSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function be(){try{i.compressedTexSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function re(){try{i.texStorage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ve(){try{i.texStorage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Me(){try{i.texImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ie(){try{i.texImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ue(I){qe.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),qe.copy(I))}function Ce(I){nt.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),nt.copy(I))}function Se(I,se){let ae=l.get(se);ae===void 0&&(ae=new WeakMap,l.set(se,ae));let me=ae.get(I);me===void 0&&(me=i.getUniformBlockIndex(se,I.name),ae.set(I,me))}function le(I,se){let me=l.get(se).get(I);c.get(se)!==me&&(i.uniformBlockBinding(se,me,I.__bindingPointIndex),c.set(se,me))}function He(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Y=null,J={},u={},f=new WeakMap,p=[],g=null,x=!1,m=null,d=null,E=null,T=null,S=null,A=null,w=null,P=new Oe(0,0,0),N=0,M=!1,v=null,C=null,B=null,O=null,z=null,qe.set(0,0,i.canvas.width,i.canvas.height),nt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:K,disable:fe,bindFramebuffer:De,drawBuffers:Ee,useProgram:Ye,setBlending:ut,setMaterial:Be,setFlipSided:Ie,setCullFace:xe,setLineWidth:dt,setPolygonOffset:ye,setScissorTest:Ve,activeTexture:Rt,bindTexture:xt,unbindTexture:b,compressedTexImage2D:_,compressedTexImage3D:k,texImage2D:Me,texImage3D:ie,updateUBOMapping:Se,uniformBlockBinding:le,texStorage2D:re,texStorage3D:ve,texSubImage2D:q,texSubImage3D:j,compressedTexSubImage2D:X,compressedTexSubImage3D:be,scissor:ue,viewport:Ce,reset:He}}function u0(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Fe,h=new WeakMap,u,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,_){return p?new OffscreenCanvas(b,_):Ys("canvas")}function x(b,_,k){let q=1,j=xt(b);if((j.width>k||j.height>k)&&(q=k/Math.max(j.width,j.height)),q<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){let X=Math.floor(q*j.width),be=Math.floor(q*j.height);u===void 0&&(u=g(X,be));let re=_?g(X,be):u;return re.width=X,re.height=be,re.getContext("2d").drawImage(b,0,0,X,be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+X+"x"+be+")."),re}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),b;return b}function m(b){return b.generateMipmaps}function d(b){i.generateMipmap(b)}function E(b){return b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?i.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(b,_,k,q,j=!1){if(b!==null){if(i[b]!==void 0)return i[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let X=_;if(_===i.RED&&(k===i.FLOAT&&(X=i.R32F),k===i.HALF_FLOAT&&(X=i.R16F),k===i.UNSIGNED_BYTE&&(X=i.R8)),_===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(X=i.R8UI),k===i.UNSIGNED_SHORT&&(X=i.R16UI),k===i.UNSIGNED_INT&&(X=i.R32UI),k===i.BYTE&&(X=i.R8I),k===i.SHORT&&(X=i.R16I),k===i.INT&&(X=i.R32I)),_===i.RG&&(k===i.FLOAT&&(X=i.RG32F),k===i.HALF_FLOAT&&(X=i.RG16F),k===i.UNSIGNED_BYTE&&(X=i.RG8)),_===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(X=i.RG8UI),k===i.UNSIGNED_SHORT&&(X=i.RG16UI),k===i.UNSIGNED_INT&&(X=i.RG32UI),k===i.BYTE&&(X=i.RG8I),k===i.SHORT&&(X=i.RG16I),k===i.INT&&(X=i.RG32I)),_===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(X=i.RGB8UI),k===i.UNSIGNED_SHORT&&(X=i.RGB16UI),k===i.UNSIGNED_INT&&(X=i.RGB32UI),k===i.BYTE&&(X=i.RGB8I),k===i.SHORT&&(X=i.RGB16I),k===i.INT&&(X=i.RGB32I)),_===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),k===i.UNSIGNED_INT&&(X=i.RGBA32UI),k===i.BYTE&&(X=i.RGBA8I),k===i.SHORT&&(X=i.RGBA16I),k===i.INT&&(X=i.RGBA32I)),_===i.RGB&&(k===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(X=i.R11F_G11F_B10F)),_===i.RGBA){let be=j?Xs:Ze.getTransfer(q);k===i.FLOAT&&(X=i.RGBA32F),k===i.HALF_FLOAT&&(X=i.RGBA16F),k===i.UNSIGNED_BYTE&&(X=be===Qe?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function S(b,_){let k;return b?_===null||_===yi||_===Ss?k=i.DEPTH24_STENCIL8:_===wn?k=i.DEPTH32F_STENCIL8:_===vs&&(k=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===yi||_===Ss?k=i.DEPTH_COMPONENT24:_===wn?k=i.DEPTH_COMPONENT32F:_===vs&&(k=i.DEPTH_COMPONENT16),k}function A(b,_){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==$t&&b.minFilter!==Sn?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function w(b){let _=b.target;_.removeEventListener("dispose",w),N(_),_.isVideoTexture&&h.delete(_)}function P(b){let _=b.target;_.removeEventListener("dispose",P),v(_)}function N(b){let _=n.get(b);if(_.__webglInit===void 0)return;let k=b.source,q=f.get(k);if(q){let j=q[_.__cacheKey];j.usedTimes--,j.usedTimes===0&&M(b),Object.keys(q).length===0&&f.delete(k)}n.remove(b)}function M(b){let _=n.get(b);i.deleteTexture(_.__webglTexture);let k=b.source,q=f.get(k);delete q[_.__cacheKey],a.memory.textures--}function v(b){let _=n.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),n.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(_.__webglFramebuffer[q]))for(let j=0;j<_.__webglFramebuffer[q].length;j++)i.deleteFramebuffer(_.__webglFramebuffer[q][j]);else i.deleteFramebuffer(_.__webglFramebuffer[q]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[q])}else{if(Array.isArray(_.__webglFramebuffer))for(let q=0;q<_.__webglFramebuffer.length;q++)i.deleteFramebuffer(_.__webglFramebuffer[q]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let q=0;q<_.__webglColorRenderbuffer.length;q++)_.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[q]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let k=b.textures;for(let q=0,j=k.length;q<j;q++){let X=n.get(k[q]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),a.memory.textures--),n.remove(k[q])}n.remove(b)}let C=0;function B(){C=0}function O(){let b=C;return b>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),C+=1,b}function z(b){let _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function W(b,_){let k=n.get(b);if(b.isVideoTexture&&Ve(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&k.__version!==b.version){let q=b.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(k,b,_);return}}else b.isExternalTexture&&(k.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+_)}function G(b,_){let k=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&k.__version!==b.version){Z(k,b,_);return}t.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+_)}function te(b,_){let k=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&k.__version!==b.version){Z(k,b,_);return}t.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+_)}function D(b,_){let k=n.get(b);if(b.version>0&&k.__version!==b.version){K(k,b,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+_)}let Y={[dn]:i.REPEAT,[ui]:i.CLAMP_TO_EDGE,[ra]:i.MIRRORED_REPEAT},J={[$t]:i.NEAREST,[Lh]:i.NEAREST_MIPMAP_NEAREST,[mr]:i.NEAREST_MIPMAP_LINEAR,[Sn]:i.LINEAR,[Ha]:i.LINEAR_MIPMAP_NEAREST,[xi]:i.LINEAR_MIPMAP_LINEAR},ce={[Fh]:i.NEVER,[Vh]:i.ALWAYS,[Oh]:i.LESS,[Hl]:i.LEQUAL,[Bh]:i.EQUAL,[Hh]:i.GEQUAL,[zh]:i.GREATER,[kh]:i.NOTEQUAL};function we(b,_){if(_.type===wn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Sn||_.magFilter===Ha||_.magFilter===mr||_.magFilter===xi||_.minFilter===Sn||_.minFilter===Ha||_.minFilter===mr||_.minFilter===xi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,Y[_.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,Y[_.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,Y[_.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,J[_.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,J[_.minFilter]),_.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,ce[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===$t||_.minFilter!==mr&&_.minFilter!==xi||_.type===wn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let k=e.get("EXT_texture_filter_anisotropic");i.texParameterf(b,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function qe(b,_){let k=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",w));let q=_.source,j=f.get(q);j===void 0&&(j={},f.set(q,j));let X=z(_);if(X!==b.__cacheKey){j[X]===void 0&&(j[X]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),j[X].usedTimes++;let be=j[b.__cacheKey];be!==void 0&&(j[b.__cacheKey].usedTimes--,be.usedTimes===0&&M(_)),b.__cacheKey=X,b.__webglTexture=j[X].texture}return k}function nt(b,_,k){return Math.floor(Math.floor(b/k)/_)}function $e(b,_,k,q){let X=b.updateRanges;if(X.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,k,q,_.data);else{X.sort((ie,ue)=>ie.start-ue.start);let be=0;for(let ie=1;ie<X.length;ie++){let ue=X[be],Ce=X[ie],Se=ue.start+ue.count,le=nt(Ce.start,_.width,4),He=nt(ue.start,_.width,4);Ce.start<=Se+1&&le===He&&nt(Ce.start+Ce.count-1,_.width,4)===le?ue.count=Math.max(ue.count,Ce.start+Ce.count-ue.start):(++be,X[be]=Ce)}X.length=be+1;let re=i.getParameter(i.UNPACK_ROW_LENGTH),ve=i.getParameter(i.UNPACK_SKIP_PIXELS),Me=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let ie=0,ue=X.length;ie<ue;ie++){let Ce=X[ie],Se=Math.floor(Ce.start/4),le=Math.ceil(Ce.count/4),He=Se%_.width,I=Math.floor(Se/_.width),se=le,ae=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,He),i.pixelStorei(i.UNPACK_SKIP_ROWS,I),t.texSubImage2D(i.TEXTURE_2D,0,He,I,se,ae,k,q,_.data)}b.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,re),i.pixelStorei(i.UNPACK_SKIP_PIXELS,ve),i.pixelStorei(i.UNPACK_SKIP_ROWS,Me)}}function Z(b,_,k){let q=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(q=i.TEXTURE_3D);let j=qe(b,_),X=_.source;t.bindTexture(q,b.__webglTexture,i.TEXTURE0+k);let be=n.get(X);if(X.version!==be.__version||j===!0){t.activeTexture(i.TEXTURE0+k);let re=Ze.getPrimaries(Ze.workingColorSpace),ve=_.colorSpace===ii?null:Ze.getPrimaries(_.colorSpace),Me=_.colorSpace===ii||re===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);let ie=x(_.image,!1,s.maxTextureSize);ie=Rt(_,ie);let ue=r.convert(_.format,_.colorSpace),Ce=r.convert(_.type),Se=T(_.internalFormat,ue,Ce,_.colorSpace,_.isVideoTexture);we(q,_);let le,He=_.mipmaps,I=_.isVideoTexture!==!0,se=be.__version===void 0||j===!0,ae=X.dataReady,me=A(_,ie);if(_.isDepthTexture)Se=S(_.format===bs,_.type),se&&(I?t.texStorage2D(i.TEXTURE_2D,1,Se,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,Se,ie.width,ie.height,0,ue,Ce,null));else if(_.isDataTexture)if(He.length>0){I&&se&&t.texStorage2D(i.TEXTURE_2D,me,Se,He[0].width,He[0].height);for(let ee=0,$=He.length;ee<$;ee++)le=He[ee],I?ae&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,le.width,le.height,ue,Ce,le.data):t.texImage2D(i.TEXTURE_2D,ee,Se,le.width,le.height,0,ue,Ce,le.data);_.generateMipmaps=!1}else I?(se&&t.texStorage2D(i.TEXTURE_2D,me,Se,ie.width,ie.height),ae&&$e(_,ie,ue,Ce)):t.texImage2D(i.TEXTURE_2D,0,Se,ie.width,ie.height,0,ue,Ce,ie.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){I&&se&&t.texStorage3D(i.TEXTURE_2D_ARRAY,me,Se,He[0].width,He[0].height,ie.depth);for(let ee=0,$=He.length;ee<$;ee++)if(le=He[ee],_.format!==pn)if(ue!==null)if(I){if(ae)if(_.layerUpdates.size>0){let _e=Yl(le.width,le.height,_.format,_.type);for(let Ne of _.layerUpdates){let lt=le.data.subarray(Ne*_e/le.data.BYTES_PER_ELEMENT,(Ne+1)*_e/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,Ne,le.width,le.height,1,ue,lt)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,le.width,le.height,ie.depth,ue,le.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ee,Se,le.width,le.height,ie.depth,0,le.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?ae&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,le.width,le.height,ie.depth,ue,Ce,le.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ee,Se,le.width,le.height,ie.depth,0,ue,Ce,le.data)}else{I&&se&&t.texStorage2D(i.TEXTURE_2D,me,Se,He[0].width,He[0].height);for(let ee=0,$=He.length;ee<$;ee++)le=He[ee],_.format!==pn?ue!==null?I?ae&&t.compressedTexSubImage2D(i.TEXTURE_2D,ee,0,0,le.width,le.height,ue,le.data):t.compressedTexImage2D(i.TEXTURE_2D,ee,Se,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?ae&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,le.width,le.height,ue,Ce,le.data):t.texImage2D(i.TEXTURE_2D,ee,Se,le.width,le.height,0,ue,Ce,le.data)}else if(_.isDataArrayTexture)if(I){if(se&&t.texStorage3D(i.TEXTURE_2D_ARRAY,me,Se,ie.width,ie.height,ie.depth),ae)if(_.layerUpdates.size>0){let ee=Yl(ie.width,ie.height,_.format,_.type);for(let $ of _.layerUpdates){let _e=ie.data.subarray($*ee/ie.data.BYTES_PER_ELEMENT,($+1)*ee/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,$,ie.width,ie.height,1,ue,Ce,_e)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,ue,Ce,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Se,ie.width,ie.height,ie.depth,0,ue,Ce,ie.data);else if(_.isData3DTexture)I?(se&&t.texStorage3D(i.TEXTURE_3D,me,Se,ie.width,ie.height,ie.depth),ae&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,ue,Ce,ie.data)):t.texImage3D(i.TEXTURE_3D,0,Se,ie.width,ie.height,ie.depth,0,ue,Ce,ie.data);else if(_.isFramebufferTexture){if(se)if(I)t.texStorage2D(i.TEXTURE_2D,me,Se,ie.width,ie.height);else{let ee=ie.width,$=ie.height;for(let _e=0;_e<me;_e++)t.texImage2D(i.TEXTURE_2D,_e,Se,ee,$,0,ue,Ce,null),ee>>=1,$>>=1}}else if(He.length>0){if(I&&se){let ee=xt(He[0]);t.texStorage2D(i.TEXTURE_2D,me,Se,ee.width,ee.height)}for(let ee=0,$=He.length;ee<$;ee++)le=He[ee],I?ae&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,ue,Ce,le):t.texImage2D(i.TEXTURE_2D,ee,Se,ue,Ce,le);_.generateMipmaps=!1}else if(I){if(se){let ee=xt(ie);t.texStorage2D(i.TEXTURE_2D,me,Se,ee.width,ee.height)}ae&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ue,Ce,ie)}else t.texImage2D(i.TEXTURE_2D,0,Se,ue,Ce,ie);m(_)&&d(q),be.__version=X.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function K(b,_,k){if(_.image.length!==6)return;let q=qe(b,_),j=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+k);let X=n.get(j);if(j.version!==X.__version||q===!0){t.activeTexture(i.TEXTURE0+k);let be=Ze.getPrimaries(Ze.workingColorSpace),re=_.colorSpace===ii?null:Ze.getPrimaries(_.colorSpace),ve=_.colorSpace===ii||be===re?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);let Me=_.isCompressedTexture||_.image[0].isCompressedTexture,ie=_.image[0]&&_.image[0].isDataTexture,ue=[];for(let $=0;$<6;$++)!Me&&!ie?ue[$]=x(_.image[$],!0,s.maxCubemapSize):ue[$]=ie?_.image[$].image:_.image[$],ue[$]=Rt(_,ue[$]);let Ce=ue[0],Se=r.convert(_.format,_.colorSpace),le=r.convert(_.type),He=T(_.internalFormat,Se,le,_.colorSpace),I=_.isVideoTexture!==!0,se=X.__version===void 0||q===!0,ae=j.dataReady,me=A(_,Ce);we(i.TEXTURE_CUBE_MAP,_);let ee;if(Me){I&&se&&t.texStorage2D(i.TEXTURE_CUBE_MAP,me,He,Ce.width,Ce.height);for(let $=0;$<6;$++){ee=ue[$].mipmaps;for(let _e=0;_e<ee.length;_e++){let Ne=ee[_e];_.format!==pn?Se!==null?I?ae&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e,0,0,Ne.width,Ne.height,Se,Ne.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e,He,Ne.width,Ne.height,0,Ne.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e,0,0,Ne.width,Ne.height,Se,le,Ne.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e,He,Ne.width,Ne.height,0,Se,le,Ne.data)}}}else{if(ee=_.mipmaps,I&&se){ee.length>0&&me++;let $=xt(ue[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,me,He,$.width,$.height)}for(let $=0;$<6;$++)if(ie){I?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,ue[$].width,ue[$].height,Se,le,ue[$].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,He,ue[$].width,ue[$].height,0,Se,le,ue[$].data);for(let _e=0;_e<ee.length;_e++){let lt=ee[_e].image[$].image;I?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e+1,0,0,lt.width,lt.height,Se,le,lt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e+1,He,lt.width,lt.height,0,Se,le,lt.data)}}else{I?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Se,le,ue[$]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,He,Se,le,ue[$]);for(let _e=0;_e<ee.length;_e++){let Ne=ee[_e];I?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e+1,0,0,Se,le,Ne.image[$]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,_e+1,He,Se,le,Ne.image[$])}}}m(_)&&d(i.TEXTURE_CUBE_MAP),X.__version=j.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function fe(b,_,k,q,j,X){let be=r.convert(k.format,k.colorSpace),re=r.convert(k.type),ve=T(k.internalFormat,be,re,k.colorSpace),Me=n.get(_),ie=n.get(k);if(ie.__renderTarget=_,!Me.__hasExternalTextures){let ue=Math.max(1,_.width>>X),Ce=Math.max(1,_.height>>X);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?t.texImage3D(j,X,ve,ue,Ce,_.depth,0,be,re,null):t.texImage2D(j,X,ve,ue,Ce,0,be,re,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),ye(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,j,ie.__webglTexture,0,dt(_)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,j,ie.__webglTexture,X),t.bindFramebuffer(i.FRAMEBUFFER,null)}function De(b,_,k){if(i.bindRenderbuffer(i.RENDERBUFFER,b),_.depthBuffer){let q=_.depthTexture,j=q&&q.isDepthTexture?q.type:null,X=S(_.stencilBuffer,j),be=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=dt(_);ye(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,re,X,_.width,_.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,re,X,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,X,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,be,i.RENDERBUFFER,b)}else{let q=_.textures;for(let j=0;j<q.length;j++){let X=q[j],be=r.convert(X.format,X.colorSpace),re=r.convert(X.type),ve=T(X.internalFormat,be,re,X.colorSpace),Me=dt(_);k&&ye(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Me,ve,_.width,_.height):ye(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Me,ve,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ve,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ee(b,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let q=n.get(_.depthTexture);q.__renderTarget=_,(!q.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),W(_.depthTexture,0);let j=q.__webglTexture,X=dt(_);if(_.depthTexture.format===us)ye(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0);else if(_.depthTexture.format===bs)ye(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Ye(b){let _=n.get(b),k=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){let q=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),q){let j=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,q.removeEventListener("dispose",j)};q.addEventListener("dispose",j),_.__depthDisposeCallback=j}_.__boundDepthTexture=q}if(b.depthTexture&&!_.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");let q=b.texture.mipmaps;q&&q.length>0?Ee(_.__webglFramebuffer[0],b):Ee(_.__webglFramebuffer,b)}else if(k){_.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[q]),_.__webglDepthbuffer[q]===void 0)_.__webglDepthbuffer[q]=i.createRenderbuffer(),De(_.__webglDepthbuffer[q],b,!1);else{let j=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=_.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,X)}}else{let q=b.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),De(_.__webglDepthbuffer,b,!1);else{let j=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,X)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ot(b,_,k){let q=n.get(b);_!==void 0&&fe(q.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&Ye(b)}function R(b){let _=b.texture,k=n.get(b),q=n.get(_);b.addEventListener("dispose",P);let j=b.textures,X=b.isWebGLCubeRenderTarget===!0,be=j.length>1;if(be||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=_.version,a.memory.textures++),X){k.__webglFramebuffer=[];for(let re=0;re<6;re++)if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer[re]=[];for(let ve=0;ve<_.mipmaps.length;ve++)k.__webglFramebuffer[re][ve]=i.createFramebuffer()}else k.__webglFramebuffer[re]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer=[];for(let re=0;re<_.mipmaps.length;re++)k.__webglFramebuffer[re]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(be)for(let re=0,ve=j.length;re<ve;re++){let Me=n.get(j[re]);Me.__webglTexture===void 0&&(Me.__webglTexture=i.createTexture(),a.memory.textures++)}if(b.samples>0&&ye(b)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let re=0;re<j.length;re++){let ve=j[re];k.__webglColorRenderbuffer[re]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[re]);let Me=r.convert(ve.format,ve.colorSpace),ie=r.convert(ve.type),ue=T(ve.internalFormat,Me,ie,ve.colorSpace,b.isXRRenderTarget===!0),Ce=dt(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ce,ue,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,k.__webglColorRenderbuffer[re])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),De(k.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),we(i.TEXTURE_CUBE_MAP,_);for(let re=0;re<6;re++)if(_.mipmaps&&_.mipmaps.length>0)for(let ve=0;ve<_.mipmaps.length;ve++)fe(k.__webglFramebuffer[re][ve],b,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,ve);else fe(k.__webglFramebuffer[re],b,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);m(_)&&d(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let re=0,ve=j.length;re<ve;re++){let Me=j[re],ie=n.get(Me),ue=i.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ue=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,ie.__webglTexture),we(ue,Me),fe(k.__webglFramebuffer,b,Me,i.COLOR_ATTACHMENT0+re,ue,0),m(Me)&&d(ue)}t.unbindTexture()}else{let re=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(re=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(re,q.__webglTexture),we(re,_),_.mipmaps&&_.mipmaps.length>0)for(let ve=0;ve<_.mipmaps.length;ve++)fe(k.__webglFramebuffer[ve],b,_,i.COLOR_ATTACHMENT0,re,ve);else fe(k.__webglFramebuffer,b,_,i.COLOR_ATTACHMENT0,re,0);m(_)&&d(re),t.unbindTexture()}b.depthBuffer&&Ye(b)}function ut(b){let _=b.textures;for(let k=0,q=_.length;k<q;k++){let j=_[k];if(m(j)){let X=E(b),be=n.get(j).__webglTexture;t.bindTexture(X,be),d(X),t.unbindTexture()}}}let Be=[],Ie=[];function xe(b){if(b.samples>0){if(ye(b)===!1){let _=b.textures,k=b.width,q=b.height,j=i.COLOR_BUFFER_BIT,X=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,be=n.get(b),re=_.length>1;if(re)for(let Me=0;Me<_.length;Me++)t.bindFramebuffer(i.FRAMEBUFFER,be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer);let ve=b.texture.mipmaps;ve&&ve.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let Me=0;Me<_.length;Me++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),re){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,be.__webglColorRenderbuffer[Me]);let ie=n.get(_[Me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ie,0)}i.blitFramebuffer(0,0,k,q,0,0,k,q,j,i.NEAREST),c===!0&&(Be.length=0,Ie.length=0,Be.push(i.COLOR_ATTACHMENT0+Me),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Be.push(X),Ie.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ie)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Be))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),re)for(let Me=0;Me<_.length;Me++){t.bindFramebuffer(i.FRAMEBUFFER,be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,be.__webglColorRenderbuffer[Me]);let ie=n.get(_[Me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,ie,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){let _=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function dt(b){return Math.min(s.maxSamples,b.samples)}function ye(b){let _=n.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Ve(b){let _=a.render.frame;h.get(b)!==_&&(h.set(b,_),b.update())}function Rt(b,_){let k=b.colorSpace,q=b.format,j=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||k!==Li&&k!==ii&&(Ze.getTransfer(k)===Qe?(q!==pn||j!==Tn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),_}function xt(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=O,this.resetTextureUnits=B,this.setTexture2D=W,this.setTexture2DArray=G,this.setTexture3D=te,this.setTextureCube=D,this.rebindTextures=Ot,this.setupRenderTarget=R,this.updateRenderTargetMipmap=ut,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=Ye,this.setupFrameBufferTexture=fe,this.useMultisampledRTT=ye}function d0(i,e){function t(n,s=ii){let r,a=Ze.getTransfer(s);if(n===Tn)return i.UNSIGNED_BYTE;if(n===Ga)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Wa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Nl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Fl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Dl)return i.BYTE;if(n===Ul)return i.SHORT;if(n===vs)return i.UNSIGNED_SHORT;if(n===Va)return i.INT;if(n===yi)return i.UNSIGNED_INT;if(n===wn)return i.FLOAT;if(n===Ms)return i.HALF_FLOAT;if(n===Ol)return i.ALPHA;if(n===Bl)return i.RGB;if(n===pn)return i.RGBA;if(n===us)return i.DEPTH_COMPONENT;if(n===bs)return i.DEPTH_STENCIL;if(n===Xa)return i.RED;if(n===qa)return i.RED_INTEGER;if(n===zl)return i.RG;if(n===Ya)return i.RG_INTEGER;if(n===Za)return i.RGBA_INTEGER;if(n===gr||n===_r||n===xr||n===yr)if(a===Qe)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===gr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===_r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===gr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===_r)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===xr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===yr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===$a||n===Ja||n===Ka||n===ja)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===$a)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ja)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ka)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ja)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Qa||n===eo||n===to)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Qa||n===eo)return a===Qe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===to)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===no||n===io||n===so||n===ro||n===ao||n===oo||n===lo||n===co||n===ho||n===uo||n===fo||n===po||n===mo||n===go)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===no)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===io)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===so)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ro)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ao)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===oo)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===lo)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===co)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ho)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===uo)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===fo)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===po)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===mo)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===go)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===_o||n===xo||n===yo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===_o)return a===Qe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===xo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===yo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===vo||n===Mo||n===So||n===bo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===vo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Mo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===So)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===bo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ss?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var f0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,p0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,ac=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new or(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new En({vertexShader:f0,fragmentShader:p0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Q(new vt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},oc=class extends jn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,f=null,p=null,g=null,x=typeof XRWebGLBinding<"u",m=new ac,d={},E=t.getContextAttributes(),T=null,S=null,A=[],w=[],P=new Fe,N=null,M=new Ut;M.viewport=new je;let v=new Ut;v.viewport=new je;let C=[M,v],B=new Ra,O=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let K=A[Z];return K===void 0&&(K=new ps,A[Z]=K),K.getTargetRaySpace()},this.getControllerGrip=function(Z){let K=A[Z];return K===void 0&&(K=new ps,A[Z]=K),K.getGripSpace()},this.getHand=function(Z){let K=A[Z];return K===void 0&&(K=new ps,A[Z]=K),K.getHandSpace()};function W(Z){let K=w.indexOf(Z.inputSource);if(K===-1)return;let fe=A[K];fe!==void 0&&(fe.update(Z.inputSource,Z.frame,l||a),fe.dispatchEvent({type:Z.type,data:Z.inputSource}))}function G(){s.removeEventListener("select",W),s.removeEventListener("selectstart",W),s.removeEventListener("selectend",W),s.removeEventListener("squeeze",W),s.removeEventListener("squeezestart",W),s.removeEventListener("squeezeend",W),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",te);for(let Z=0;Z<A.length;Z++){let K=w[Z];K!==null&&(w[Z]=null,A[Z].disconnect(K))}O=null,z=null,m.reset();for(let Z in d)delete d[Z];e.setRenderTarget(T),p=null,f=null,u=null,s=null,S=null,$e.stop(),n.isPresenting=!1,e.setPixelRatio(N),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(T=e.getRenderTarget(),s.addEventListener("select",W),s.addEventListener("selectstart",W),s.addEventListener("selectend",W),s.addEventListener("squeeze",W),s.addEventListener("squeezestart",W),s.addEventListener("squeezeend",W),s.addEventListener("end",G),s.addEventListener("inputsourceschange",te),E.xrCompatible!==!0&&await t.makeXRCompatible(),N=e.getPixelRatio(),e.getSize(P),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let fe=null,De=null,Ee=null;E.depth&&(Ee=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,fe=E.stencil?bs:us,De=E.stencil?Ss:yi);let Ye={colorFormat:t.RGBA8,depthFormat:Ee,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Ye),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new In(f.textureWidth,f.textureHeight,{format:pn,type:Tn,depthTexture:new ar(f.textureWidth,f.textureHeight,De,void 0,void 0,void 0,void 0,void 0,void 0,fe),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let fe={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,fe),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new In(p.framebufferWidth,p.framebufferHeight,{format:pn,type:Tn,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),$e.setContext(s),$e.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function te(Z){for(let K=0;K<Z.removed.length;K++){let fe=Z.removed[K],De=w.indexOf(fe);De>=0&&(w[De]=null,A[De].disconnect(fe))}for(let K=0;K<Z.added.length;K++){let fe=Z.added[K],De=w.indexOf(fe);if(De===-1){for(let Ye=0;Ye<A.length;Ye++)if(Ye>=w.length){w.push(fe),De=Ye;break}else if(w[Ye]===null){w[Ye]=fe,De=Ye;break}if(De===-1)break}let Ee=A[De];Ee&&Ee.connect(fe)}}let D=new L,Y=new L;function J(Z,K,fe){D.setFromMatrixPosition(K.matrixWorld),Y.setFromMatrixPosition(fe.matrixWorld);let De=D.distanceTo(Y),Ee=K.projectionMatrix.elements,Ye=fe.projectionMatrix.elements,Ot=Ee[14]/(Ee[10]-1),R=Ee[14]/(Ee[10]+1),ut=(Ee[9]+1)/Ee[5],Be=(Ee[9]-1)/Ee[5],Ie=(Ee[8]-1)/Ee[0],xe=(Ye[8]+1)/Ye[0],dt=Ot*Ie,ye=Ot*xe,Ve=De/(-Ie+xe),Rt=Ve*-Ie;if(K.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Rt),Z.translateZ(Ve),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ee[10]===-1)Z.projectionMatrix.copy(K.projectionMatrix),Z.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{let xt=Ot+Ve,b=R+Ve,_=dt-Rt,k=ye+(De-Rt),q=ut*R/b*xt,j=Be*R/b*xt;Z.projectionMatrix.makePerspective(_,k,q,j,xt,b),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function ce(Z,K){K===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(K.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let K=Z.near,fe=Z.far;m.texture!==null&&(m.depthNear>0&&(K=m.depthNear),m.depthFar>0&&(fe=m.depthFar)),B.near=v.near=M.near=K,B.far=v.far=M.far=fe,(O!==B.near||z!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),O=B.near,z=B.far),B.layers.mask=Z.layers.mask|6,M.layers.mask=B.layers.mask&3,v.layers.mask=B.layers.mask&5;let De=Z.parent,Ee=B.cameras;ce(B,De);for(let Ye=0;Ye<Ee.length;Ye++)ce(Ee[Ye],De);Ee.length===2?J(B,M,v):B.projectionMatrix.copy(M.projectionMatrix),we(Z,B,De)};function we(Z,K,fe){fe===null?Z.matrix.copy(K.matrixWorld):(Z.matrix.copy(fe.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(K.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(K.projectionMatrix),Z.projectionMatrixInverse.copy(K.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=la*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(Z){c=Z,f!==null&&(f.fixedFoveation=Z),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(Z){return d[Z]};let qe=null;function nt(Z,K){if(h=K.getViewerPose(l||a),g=K,h!==null){let fe=h.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let De=!1;fe.length!==B.cameras.length&&(B.cameras.length=0,De=!0);for(let R=0;R<fe.length;R++){let ut=fe[R],Be=null;if(p!==null)Be=p.getViewport(ut);else{let xe=u.getViewSubImage(f,ut);Be=xe.viewport,R===0&&(e.setRenderTargetTextures(S,xe.colorTexture,xe.depthStencilTexture),e.setRenderTarget(S))}let Ie=C[R];Ie===void 0&&(Ie=new Ut,Ie.layers.enable(R),Ie.viewport=new je,C[R]=Ie),Ie.matrix.fromArray(ut.transform.matrix),Ie.matrix.decompose(Ie.position,Ie.quaternion,Ie.scale),Ie.projectionMatrix.fromArray(ut.projectionMatrix),Ie.projectionMatrixInverse.copy(Ie.projectionMatrix).invert(),Ie.viewport.set(Be.x,Be.y,Be.width,Be.height),R===0&&(B.matrix.copy(Ie.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),De===!0&&B.cameras.push(Ie)}let Ee=s.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){u=n.getBinding();let R=u.getDepthInformation(fe[0]);R&&R.isValid&&R.texture&&m.init(R,s.renderState)}if(Ee&&Ee.includes("camera-access")&&x){e.state.unbindTexture(),u=n.getBinding();for(let R=0;R<fe.length;R++){let ut=fe[R].camera;if(ut){let Be=d[ut];Be||(Be=new or,d[ut]=Be);let Ie=u.getCameraImage(ut);Be.sourceTexture=Ie}}}}for(let fe=0;fe<A.length;fe++){let De=w[fe],Ee=A[fe];De!==null&&Ee!==void 0&&Ee.update(De,K,l||a)}qe&&qe(Z,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),g=null}let $e=new xu;$e.setAnimationLoop(nt),this.setAnimationLoop=function(Z){qe=Z},this.dispose=function(){}}},Hi=new bn,m0=new et;function g0(i,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,Wl(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,E,T,S){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),u(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,S)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),x(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?c(m,d,E,T):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===qt&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===qt&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let E=e.get(d),T=E.envMap,S=E.envMapRotation;T&&(m.envMap.value=T,Hi.copy(S),Hi.x*=-1,Hi.y*=-1,Hi.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Hi.y*=-1,Hi.z*=-1),m.envMapRotation.value.setFromMatrix4(m0.makeRotationFromEuler(Hi)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,E,T){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*E,m.scale.value=T*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,E){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===qt&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function x(m,d){let E=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function _0(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,T){let S=T.program;n.uniformBlockBinding(E,S)}function l(E,T){let S=s[E.id];S===void 0&&(g(E),S=h(E),s[E.id]=S,E.addEventListener("dispose",m));let A=T.program;n.updateUBOMapping(E,A);let w=e.render.frame;r[E.id]!==w&&(f(E),r[E.id]=w)}function h(E){let T=u();E.__bindingPointIndex=T;let S=i.createBuffer(),A=E.__size,w=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,A,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,S),S}function u(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(E){let T=s[E.id],S=E.uniforms,A=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let w=0,P=S.length;w<P;w++){let N=Array.isArray(S[w])?S[w]:[S[w]];for(let M=0,v=N.length;M<v;M++){let C=N[M];if(p(C,w,M,A)===!0){let B=C.__offset,O=Array.isArray(C.value)?C.value:[C.value],z=0;for(let W=0;W<O.length;W++){let G=O[W],te=x(G);typeof G=="number"||typeof G=="boolean"?(C.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,B+z,C.__data)):G.isMatrix3?(C.__data[0]=G.elements[0],C.__data[1]=G.elements[1],C.__data[2]=G.elements[2],C.__data[3]=0,C.__data[4]=G.elements[3],C.__data[5]=G.elements[4],C.__data[6]=G.elements[5],C.__data[7]=0,C.__data[8]=G.elements[6],C.__data[9]=G.elements[7],C.__data[10]=G.elements[8],C.__data[11]=0):(G.toArray(C.__data,z),z+=te.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(E,T,S,A){let w=E.value,P=T+"_"+S;if(A[P]===void 0)return typeof w=="number"||typeof w=="boolean"?A[P]=w:A[P]=w.clone(),!0;{let N=A[P];if(typeof w=="number"||typeof w=="boolean"){if(N!==w)return A[P]=w,!0}else if(N.equals(w)===!1)return N.copy(w),!0}return!1}function g(E){let T=E.uniforms,S=0,A=16;for(let P=0,N=T.length;P<N;P++){let M=Array.isArray(T[P])?T[P]:[T[P]];for(let v=0,C=M.length;v<C;v++){let B=M[v],O=Array.isArray(B.value)?B.value:[B.value];for(let z=0,W=O.length;z<W;z++){let G=O[z],te=x(G),D=S%A,Y=D%te.boundary,J=D+Y;S+=Y,J!==0&&A-J<te.storage&&(S+=A-J),B.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=S,S+=te.storage}}}let w=S%A;return w>0&&(S+=A-w),E.__size=S,E.__cache={},this}function x(E){let T={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(T.boundary=4,T.storage=4):E.isVector2?(T.boundary=8,T.storage=8):E.isVector3||E.isColor?(T.boundary=16,T.storage=12):E.isVector4?(T.boundary=16,T.storage=16):E.isMatrix3?(T.boundary=48,T.storage=48):E.isMatrix4?(T.boundary=64,T.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),T}function m(E){let T=E.target;T.removeEventListener("dispose",m);let S=a.indexOf(T.__bindingPointIndex);a.splice(S,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function d(){for(let E in s)i.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:c,update:l,dispose:d}}var Ro=class{constructor(e={}){let{canvas:t=Gh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let g=new Uint32Array(4),x=new Int32Array(4),m=null,d=null,E=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ni,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let S=this,A=!1;this._outputColorSpace=kt;let w=0,P=0,N=null,M=-1,v=null,C=new je,B=new je,O=null,z=new Oe(0),W=0,G=t.width,te=t.height,D=1,Y=null,J=null,ce=new je(0,0,G,te),we=new je(0,0,G,te),qe=!1,nt=new gs,$e=!1,Z=!1,K=new et,fe=new L,De=new je,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ye=!1;function Ot(){return N===null?D:1}let R=n;function ut(y,U){return t.getContext(y,U)}try{let y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",me,!1),t.addEventListener("webglcontextcreationerror",ee,!1),R===null){let U="webgl2";if(R=ut(U,y),R===null)throw ut(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Be,Ie,xe,dt,ye,Ve,Rt,xt,b,_,k,q,j,X,be,re,ve,Me,ie,ue,Ce,Se,le,He;function I(){Be=new Nm(R),Be.init(),Se=new d0(R,Be),Ie=new Rm(R,Be,e,Se),xe=new h0(R,Be),Ie.reversedDepthBuffer&&f&&xe.buffers.depth.setReversed(!0),dt=new Bm(R),ye=new Kg,Ve=new u0(R,Be,xe,ye,Ie,Se,dt),Rt=new Pm(S),xt=new Um(S),b=new Gd(R),le=new wm(R,b),_=new Fm(R,b,dt,le),k=new km(R,_,b,dt),ie=new zm(R,Ie,Ve),re=new Cm(ye),q=new Jg(S,Rt,xt,Be,Ie,le,re),j=new g0(S,ye),X=new Qg,be=new r0(Be),Me=new Tm(S,Rt,xt,xe,k,p,c),ve=new l0(S,k,Ie),He=new _0(R,dt,Ie,xe),ue=new Am(R,Be,dt),Ce=new Om(R,Be,dt),dt.programs=q.programs,S.capabilities=Ie,S.extensions=Be,S.properties=ye,S.renderLists=X,S.shadowMap=ve,S.state=xe,S.info=dt}I();let se=new oc(S,R);this.xr=se,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let y=Be.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){let y=Be.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return D},this.setPixelRatio=function(y){y!==void 0&&(D=y,this.setSize(G,te,!1))},this.getSize=function(y){return y.set(G,te)},this.setSize=function(y,U,H=!0){if(se.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=y,te=U,t.width=Math.floor(y*D),t.height=Math.floor(U*D),H===!0&&(t.style.width=y+"px",t.style.height=U+"px"),this.setViewport(0,0,y,U)},this.getDrawingBufferSize=function(y){return y.set(G*D,te*D).floor()},this.setDrawingBufferSize=function(y,U,H){G=y,te=U,D=H,t.width=Math.floor(y*H),t.height=Math.floor(U*H),this.setViewport(0,0,y,U)},this.getCurrentViewport=function(y){return y.copy(C)},this.getViewport=function(y){return y.copy(ce)},this.setViewport=function(y,U,H,V){y.isVector4?ce.set(y.x,y.y,y.z,y.w):ce.set(y,U,H,V),xe.viewport(C.copy(ce).multiplyScalar(D).round())},this.getScissor=function(y){return y.copy(we)},this.setScissor=function(y,U,H,V){y.isVector4?we.set(y.x,y.y,y.z,y.w):we.set(y,U,H,V),xe.scissor(B.copy(we).multiplyScalar(D).round())},this.getScissorTest=function(){return qe},this.setScissorTest=function(y){xe.setScissorTest(qe=y)},this.setOpaqueSort=function(y){Y=y},this.setTransparentSort=function(y){J=y},this.getClearColor=function(y){return y.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor(...arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha(...arguments)},this.clear=function(y=!0,U=!0,H=!0){let V=0;if(y){let F=!1;if(N!==null){let ne=N.texture.format;F=ne===Za||ne===Ya||ne===qa}if(F){let ne=N.texture.type,he=ne===Tn||ne===yi||ne===vs||ne===Ss||ne===Ga||ne===Wa,ge=Me.getClearColor(),pe=Me.getClearAlpha(),Re=ge.r,Le=ge.g,Te=ge.b;he?(g[0]=Re,g[1]=Le,g[2]=Te,g[3]=pe,R.clearBufferuiv(R.COLOR,0,g)):(x[0]=Re,x[1]=Le,x[2]=Te,x[3]=pe,R.clearBufferiv(R.COLOR,0,x))}else V|=R.COLOR_BUFFER_BIT}U&&(V|=R.DEPTH_BUFFER_BIT),H&&(V|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",me,!1),t.removeEventListener("webglcontextcreationerror",ee,!1),Me.dispose(),X.dispose(),be.dispose(),ye.dispose(),Rt.dispose(),xt.dispose(),k.dispose(),le.dispose(),He.dispose(),q.dispose(),se.dispose(),se.removeEventListener("sessionstart",Rn),se.removeEventListener("sessionend",wc),bi.stop()};function ae(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function me(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;let y=dt.autoReset,U=ve.enabled,H=ve.autoUpdate,V=ve.needsUpdate,F=ve.type;I(),dt.autoReset=y,ve.enabled=U,ve.autoUpdate=H,ve.needsUpdate=V,ve.type=F}function ee(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function $(y){let U=y.target;U.removeEventListener("dispose",$),_e(U)}function _e(y){Ne(y),ye.remove(y)}function Ne(y){let U=ye.get(y).programs;U!==void 0&&(U.forEach(function(H){q.releaseProgram(H)}),y.isShaderMaterial&&q.releaseShaderCache(y))}this.renderBufferDirect=function(y,U,H,V,F,ne){U===null&&(U=Ee);let he=F.isMesh&&F.matrixWorld.determinant()<0,ge=id(y,U,H,V,F);xe.setMaterial(V,he);let pe=H.index,Re=1;if(V.wireframe===!0){if(pe=_.getWireframeAttribute(H),pe===void 0)return;Re=2}let Le=H.drawRange,Te=H.attributes.position,We=Le.start*Re,it=(Le.start+Le.count)*Re;ne!==null&&(We=Math.max(We,ne.start*Re),it=Math.min(it,(ne.start+ne.count)*Re)),pe!==null?(We=Math.max(We,0),it=Math.min(it,pe.count)):Te!=null&&(We=Math.max(We,0),it=Math.min(it,Te.count));let gt=it-We;if(gt<0||gt===1/0)return;le.setup(F,V,ge,H,pe);let ct,at=ue;if(pe!==null&&(ct=b.get(pe),at=Ce,at.setIndex(ct)),F.isMesh)V.wireframe===!0?(xe.setLineWidth(V.wireframeLinewidth*Ot()),at.setMode(R.LINES)):at.setMode(R.TRIANGLES);else if(F.isLine){let Ae=V.linewidth;Ae===void 0&&(Ae=1),xe.setLineWidth(Ae*Ot()),F.isLineSegments?at.setMode(R.LINES):F.isLineLoop?at.setMode(R.LINE_LOOP):at.setMode(R.LINE_STRIP)}else F.isPoints?at.setMode(R.POINTS):F.isSprite&&at.setMode(R.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ds("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),at.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Be.get("WEBGL_multi_draw"))at.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{let Ae=F._multiDrawStarts,ft=F._multiDrawCounts,Je=F._multiDrawCount,en=pe?b.get(pe).bytesPerElement:1,qi=ye.get(V).currentProgram.getUniforms();for(let tn=0;tn<Je;tn++)qi.setValue(R,"_gl_DrawID",tn),at.render(Ae[tn]/en,ft[tn])}else if(F.isInstancedMesh)at.renderInstances(We,gt,F.count);else if(H.isInstancedBufferGeometry){let Ae=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,ft=Math.min(H.instanceCount,Ae);at.renderInstances(We,gt,ft)}else at.render(We,gt)};function lt(y,U,H){y.transparent===!0&&y.side===an&&y.forceSinglePass===!1?(y.side=qt,y.needsUpdate=!0,Ir(y,U,H),y.side=Kn,y.needsUpdate=!0,Ir(y,U,H),y.side=an):Ir(y,U,H)}this.compile=function(y,U,H=null){H===null&&(H=y),d=be.get(H),d.init(U),T.push(d),H.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(d.pushLight(F),F.castShadow&&d.pushShadow(F))}),y!==H&&y.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(d.pushLight(F),F.castShadow&&d.pushShadow(F))}),d.setupLights();let V=new Set;return y.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;let ne=F.material;if(ne)if(Array.isArray(ne))for(let he=0;he<ne.length;he++){let ge=ne[he];lt(ge,H,F),V.add(ge)}else lt(ne,H,F),V.add(ne)}),d=T.pop(),V},this.compileAsync=function(y,U,H=null){let V=this.compile(y,U,H);return new Promise(F=>{function ne(){if(V.forEach(function(he){ye.get(he).currentProgram.isReady()&&V.delete(he)}),V.size===0){F(y);return}setTimeout(ne,10)}Be.get("KHR_parallel_shader_compile")!==null?ne():setTimeout(ne,10)})};let Ke=null;function Gn(y){Ke&&Ke(y)}function Rn(){bi.stop()}function wc(){bi.start()}let bi=new xu;bi.setAnimationLoop(Gn),typeof self<"u"&&bi.setContext(self),this.setAnimationLoop=function(y){Ke=y,se.setAnimationLoop(y),y===null?bi.stop():bi.start()},se.addEventListener("sessionstart",Rn),se.addEventListener("sessionend",wc),this.render=function(y,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(se.cameraAutoUpdate===!0&&se.updateCamera(U),U=se.getCamera()),y.isScene===!0&&y.onBeforeRender(S,y,U,N),d=be.get(y,T.length),d.init(U),T.push(d),K.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),nt.setFromProjectionMatrix(K,Mn,U.reversedDepth),Z=this.localClippingEnabled,$e=re.init(this.clippingPlanes,Z),m=X.get(y,E.length),m.init(),E.push(m),se.enabled===!0&&se.isPresenting===!0){let ne=S.xr.getDepthSensingMesh();ne!==null&&qo(ne,U,-1/0,S.sortObjects)}qo(y,U,0,S.sortObjects),m.finish(),S.sortObjects===!0&&m.sort(Y,J),Ye=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,Ye&&Me.addToRenderList(m,y),this.info.render.frame++,$e===!0&&re.beginShadows();let H=d.state.shadowsArray;ve.render(H,y,U),$e===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();let V=m.opaque,F=m.transmissive;if(d.setupLights(),U.isArrayCamera){let ne=U.cameras;if(F.length>0)for(let he=0,ge=ne.length;he<ge;he++){let pe=ne[he];Rc(V,F,y,pe)}Ye&&Me.render(y);for(let he=0,ge=ne.length;he<ge;he++){let pe=ne[he];Ac(m,y,pe,pe.viewport)}}else F.length>0&&Rc(V,F,y,U),Ye&&Me.render(y),Ac(m,y,U);N!==null&&P===0&&(Ve.updateMultisampleRenderTarget(N),Ve.updateRenderTargetMipmap(N)),y.isScene===!0&&y.onAfterRender(S,y,U),le.resetDefaultState(),M=-1,v=null,T.pop(),T.length>0?(d=T[T.length-1],$e===!0&&re.setGlobalState(S.clippingPlanes,d.state.camera)):d=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function qo(y,U,H,V){if(y.visible===!1)return;if(y.layers.test(U.layers)){if(y.isGroup)H=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(U);else if(y.isLight)d.pushLight(y),y.castShadow&&d.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||nt.intersectsSprite(y)){V&&De.setFromMatrixPosition(y.matrixWorld).applyMatrix4(K);let he=k.update(y),ge=y.material;ge.visible&&m.push(y,he,ge,H,De.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||nt.intersectsObject(y))){let he=k.update(y),ge=y.material;if(V&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),De.copy(y.boundingSphere.center)):(he.boundingSphere===null&&he.computeBoundingSphere(),De.copy(he.boundingSphere.center)),De.applyMatrix4(y.matrixWorld).applyMatrix4(K)),Array.isArray(ge)){let pe=he.groups;for(let Re=0,Le=pe.length;Re<Le;Re++){let Te=pe[Re],We=ge[Te.materialIndex];We&&We.visible&&m.push(y,he,We,H,De.z,Te)}}else ge.visible&&m.push(y,he,ge,H,De.z,null)}}let ne=y.children;for(let he=0,ge=ne.length;he<ge;he++)qo(ne[he],U,H,V)}function Ac(y,U,H,V){let F=y.opaque,ne=y.transmissive,he=y.transparent;d.setupLightsView(H),$e===!0&&re.setGlobalState(S.clippingPlanes,H),V&&xe.viewport(C.copy(V)),F.length>0&&Pr(F,U,H),ne.length>0&&Pr(ne,U,H),he.length>0&&Pr(he,U,H),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function Rc(y,U,H,V){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[V.id]===void 0&&(d.state.transmissionRenderTarget[V.id]=new In(1,1,{generateMipmaps:!0,type:Be.has("EXT_color_buffer_half_float")||Be.has("EXT_color_buffer_float")?Ms:Tn,minFilter:xi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ze.workingColorSpace}));let ne=d.state.transmissionRenderTarget[V.id],he=V.viewport||C;ne.setSize(he.z*S.transmissionResolutionScale,he.w*S.transmissionResolutionScale);let ge=S.getRenderTarget(),pe=S.getActiveCubeFace(),Re=S.getActiveMipmapLevel();S.setRenderTarget(ne),S.getClearColor(z),W=S.getClearAlpha(),W<1&&S.setClearColor(16777215,.5),S.clear(),Ye&&Me.render(H);let Le=S.toneMapping;S.toneMapping=ni;let Te=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),d.setupLightsView(V),$e===!0&&re.setGlobalState(S.clippingPlanes,V),Pr(y,H,V),Ve.updateMultisampleRenderTarget(ne),Ve.updateRenderTargetMipmap(ne),Be.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let it=0,gt=U.length;it<gt;it++){let ct=U[it],at=ct.object,Ae=ct.geometry,ft=ct.material,Je=ct.group;if(ft.side===an&&at.layers.test(V.layers)){let en=ft.side;ft.side=qt,ft.needsUpdate=!0,Cc(at,H,V,Ae,ft,Je),ft.side=en,ft.needsUpdate=!0,We=!0}}We===!0&&(Ve.updateMultisampleRenderTarget(ne),Ve.updateRenderTargetMipmap(ne))}S.setRenderTarget(ge,pe,Re),S.setClearColor(z,W),Te!==void 0&&(V.viewport=Te),S.toneMapping=Le}function Pr(y,U,H){let V=U.isScene===!0?U.overrideMaterial:null;for(let F=0,ne=y.length;F<ne;F++){let he=y[F],ge=he.object,pe=he.geometry,Re=he.group,Le=he.material;Le.allowOverride===!0&&V!==null&&(Le=V),ge.layers.test(H.layers)&&Cc(ge,U,H,pe,Le,Re)}}function Cc(y,U,H,V,F,ne){y.onBeforeRender(S,U,H,V,F,ne),y.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),F.onBeforeRender(S,U,H,V,y,ne),F.transparent===!0&&F.side===an&&F.forceSinglePass===!1?(F.side=qt,F.needsUpdate=!0,S.renderBufferDirect(H,U,V,F,y,ne),F.side=Kn,F.needsUpdate=!0,S.renderBufferDirect(H,U,V,F,y,ne),F.side=an):S.renderBufferDirect(H,U,V,F,y,ne),y.onAfterRender(S,U,H,V,F,ne)}function Ir(y,U,H){U.isScene!==!0&&(U=Ee);let V=ye.get(y),F=d.state.lights,ne=d.state.shadowsArray,he=F.state.version,ge=q.getParameters(y,F.state,ne,U,H),pe=q.getProgramCacheKey(ge),Re=V.programs;V.environment=y.isMeshStandardMaterial?U.environment:null,V.fog=U.fog,V.envMap=(y.isMeshStandardMaterial?xt:Rt).get(y.envMap||V.environment),V.envMapRotation=V.environment!==null&&y.envMap===null?U.environmentRotation:y.envMapRotation,Re===void 0&&(y.addEventListener("dispose",$),Re=new Map,V.programs=Re);let Le=Re.get(pe);if(Le!==void 0){if(V.currentProgram===Le&&V.lightsStateVersion===he)return Ic(y,ge),Le}else ge.uniforms=q.getUniforms(y),y.onBeforeCompile(ge,S),Le=q.acquireProgram(ge,pe),Re.set(pe,Le),V.uniforms=ge.uniforms;let Te=V.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Te.clippingPlanes=re.uniform),Ic(y,ge),V.needsLights=rd(y),V.lightsStateVersion=he,V.needsLights&&(Te.ambientLightColor.value=F.state.ambient,Te.lightProbe.value=F.state.probe,Te.directionalLights.value=F.state.directional,Te.directionalLightShadows.value=F.state.directionalShadow,Te.spotLights.value=F.state.spot,Te.spotLightShadows.value=F.state.spotShadow,Te.rectAreaLights.value=F.state.rectArea,Te.ltc_1.value=F.state.rectAreaLTC1,Te.ltc_2.value=F.state.rectAreaLTC2,Te.pointLights.value=F.state.point,Te.pointLightShadows.value=F.state.pointShadow,Te.hemisphereLights.value=F.state.hemi,Te.directionalShadowMap.value=F.state.directionalShadowMap,Te.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Te.spotShadowMap.value=F.state.spotShadowMap,Te.spotLightMatrix.value=F.state.spotLightMatrix,Te.spotLightMap.value=F.state.spotLightMap,Te.pointShadowMap.value=F.state.pointShadowMap,Te.pointShadowMatrix.value=F.state.pointShadowMatrix),V.currentProgram=Le,V.uniformsList=null,Le}function Pc(y){if(y.uniformsList===null){let U=y.currentProgram.getUniforms();y.uniformsList=ws.seqWithValue(U.seq,y.uniforms)}return y.uniformsList}function Ic(y,U){let H=ye.get(y);H.outputColorSpace=U.outputColorSpace,H.batching=U.batching,H.batchingColor=U.batchingColor,H.instancing=U.instancing,H.instancingColor=U.instancingColor,H.instancingMorph=U.instancingMorph,H.skinning=U.skinning,H.morphTargets=U.morphTargets,H.morphNormals=U.morphNormals,H.morphColors=U.morphColors,H.morphTargetsCount=U.morphTargetsCount,H.numClippingPlanes=U.numClippingPlanes,H.numIntersection=U.numClipIntersection,H.vertexAlphas=U.vertexAlphas,H.vertexTangents=U.vertexTangents,H.toneMapping=U.toneMapping}function id(y,U,H,V,F){U.isScene!==!0&&(U=Ee),Ve.resetTextureUnits();let ne=U.fog,he=V.isMeshStandardMaterial?U.environment:null,ge=N===null?S.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Li,pe=(V.isMeshStandardMaterial?xt:Rt).get(V.envMap||he),Re=V.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Le=!!H.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Te=!!H.morphAttributes.position,We=!!H.morphAttributes.normal,it=!!H.morphAttributes.color,gt=ni;V.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(gt=S.toneMapping);let ct=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,at=ct!==void 0?ct.length:0,Ae=ye.get(V),ft=d.state.lights;if($e===!0&&(Z===!0||y!==v)){let Gt=y===v&&V.id===M;re.setState(V,y,Gt)}let Je=!1;V.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==ft.state.version||Ae.outputColorSpace!==ge||F.isBatchedMesh&&Ae.batching===!1||!F.isBatchedMesh&&Ae.batching===!0||F.isBatchedMesh&&Ae.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ae.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ae.instancing===!1||!F.isInstancedMesh&&Ae.instancing===!0||F.isSkinnedMesh&&Ae.skinning===!1||!F.isSkinnedMesh&&Ae.skinning===!0||F.isInstancedMesh&&Ae.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ae.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ae.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ae.instancingMorph===!1&&F.morphTexture!==null||Ae.envMap!==pe||V.fog===!0&&Ae.fog!==ne||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==re.numPlanes||Ae.numIntersection!==re.numIntersection)||Ae.vertexAlphas!==Re||Ae.vertexTangents!==Le||Ae.morphTargets!==Te||Ae.morphNormals!==We||Ae.morphColors!==it||Ae.toneMapping!==gt||Ae.morphTargetsCount!==at)&&(Je=!0):(Je=!0,Ae.__version=V.version);let en=Ae.currentProgram;Je===!0&&(en=Ir(V,U,F));let qi=!1,tn=!1,Ds=!1,pt=en.getUniforms(),cn=Ae.uniforms;if(xe.useProgram(en.program)&&(qi=!0,tn=!0,Ds=!0),V.id!==M&&(M=V.id,tn=!0),qi||v!==y){xe.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),pt.setValue(R,"projectionMatrix",y.projectionMatrix),pt.setValue(R,"viewMatrix",y.matrixWorldInverse);let Yt=pt.map.cameraPosition;Yt!==void 0&&Yt.setValue(R,fe.setFromMatrixPosition(y.matrixWorld)),Ie.logarithmicDepthBuffer&&pt.setValue(R,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&pt.setValue(R,"isOrthographic",y.isOrthographicCamera===!0),v!==y&&(v=y,tn=!0,Ds=!0)}if(F.isSkinnedMesh){pt.setOptional(R,F,"bindMatrix"),pt.setOptional(R,F,"bindMatrixInverse");let Gt=F.skeleton;Gt&&(Gt.boneTexture===null&&Gt.computeBoneTexture(),pt.setValue(R,"boneTexture",Gt.boneTexture,Ve))}F.isBatchedMesh&&(pt.setOptional(R,F,"batchingTexture"),pt.setValue(R,"batchingTexture",F._matricesTexture,Ve),pt.setOptional(R,F,"batchingIdTexture"),pt.setValue(R,"batchingIdTexture",F._indirectTexture,Ve),pt.setOptional(R,F,"batchingColorTexture"),F._colorsTexture!==null&&pt.setValue(R,"batchingColorTexture",F._colorsTexture,Ve));let hn=H.morphAttributes;if((hn.position!==void 0||hn.normal!==void 0||hn.color!==void 0)&&ie.update(F,H,en),(tn||Ae.receiveShadow!==F.receiveShadow)&&(Ae.receiveShadow=F.receiveShadow,pt.setValue(R,"receiveShadow",F.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(cn.envMap.value=pe,cn.flipEnvMap.value=pe.isCubeTexture&&pe.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&U.environment!==null&&(cn.envMapIntensity.value=U.environmentIntensity),tn&&(pt.setValue(R,"toneMappingExposure",S.toneMappingExposure),Ae.needsLights&&sd(cn,Ds),ne&&V.fog===!0&&j.refreshFogUniforms(cn,ne),j.refreshMaterialUniforms(cn,V,D,te,d.state.transmissionRenderTarget[y.id]),ws.upload(R,Pc(Ae),cn,Ve)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(ws.upload(R,Pc(Ae),cn,Ve),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&pt.setValue(R,"center",F.center),pt.setValue(R,"modelViewMatrix",F.modelViewMatrix),pt.setValue(R,"normalMatrix",F.normalMatrix),pt.setValue(R,"modelMatrix",F.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){let Gt=V.uniformsGroups;for(let Yt=0,Yo=Gt.length;Yt<Yo;Yt++){let Ei=Gt[Yt];He.update(Ei,en),He.bind(Ei,en)}}return en}function sd(y,U){y.ambientLightColor.needsUpdate=U,y.lightProbe.needsUpdate=U,y.directionalLights.needsUpdate=U,y.directionalLightShadows.needsUpdate=U,y.pointLights.needsUpdate=U,y.pointLightShadows.needsUpdate=U,y.spotLights.needsUpdate=U,y.spotLightShadows.needsUpdate=U,y.rectAreaLights.needsUpdate=U,y.hemisphereLights.needsUpdate=U}function rd(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(y,U,H){let V=ye.get(y);V.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),ye.get(y.texture).__webglTexture=U,ye.get(y.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:H,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,U){let H=ye.get(y);H.__webglFramebuffer=U,H.__useDefaultFramebuffer=U===void 0};let ad=R.createFramebuffer();this.setRenderTarget=function(y,U=0,H=0){N=y,w=U,P=H;let V=!0,F=null,ne=!1,he=!1;if(y){let pe=ye.get(y);if(pe.__useDefaultFramebuffer!==void 0)xe.bindFramebuffer(R.FRAMEBUFFER,null),V=!1;else if(pe.__webglFramebuffer===void 0)Ve.setupRenderTarget(y);else if(pe.__hasExternalTextures)Ve.rebindTextures(y,ye.get(y.texture).__webglTexture,ye.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){let Te=y.depthTexture;if(pe.__boundDepthTexture!==Te){if(Te!==null&&ye.has(Te)&&(y.width!==Te.image.width||y.height!==Te.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ve.setupDepthRenderbuffer(y)}}let Re=y.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(he=!0);let Le=ye.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Le[U])?F=Le[U][H]:F=Le[U],ne=!0):y.samples>0&&Ve.useMultisampledRTT(y)===!1?F=ye.get(y).__webglMultisampledFramebuffer:Array.isArray(Le)?F=Le[H]:F=Le,C.copy(y.viewport),B.copy(y.scissor),O=y.scissorTest}else C.copy(ce).multiplyScalar(D).floor(),B.copy(we).multiplyScalar(D).floor(),O=qe;if(H!==0&&(F=ad),xe.bindFramebuffer(R.FRAMEBUFFER,F)&&V&&xe.drawBuffers(y,F),xe.viewport(C),xe.scissor(B),xe.setScissorTest(O),ne){let pe=ye.get(y.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+U,pe.__webglTexture,H)}else if(he){let pe=U;for(let Re=0;Re<y.textures.length;Re++){let Le=ye.get(y.textures[Re]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+Re,Le.__webglTexture,H,pe)}}else if(y!==null&&H!==0){let pe=ye.get(y.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,pe.__webglTexture,H)}M=-1},this.readRenderTargetPixels=function(y,U,H,V,F,ne,he,ge=0){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pe=ye.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&he!==void 0&&(pe=pe[he]),pe){xe.bindFramebuffer(R.FRAMEBUFFER,pe);try{let Re=y.textures[ge],Le=Re.format,Te=Re.type;if(!Ie.textureFormatReadable(Le)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ie.textureTypeReadable(Te)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=y.width-V&&H>=0&&H<=y.height-F&&(y.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+ge),R.readPixels(U,H,V,F,Se.convert(Le),Se.convert(Te),ne))}finally{let Re=N!==null?ye.get(N).__webglFramebuffer:null;xe.bindFramebuffer(R.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(y,U,H,V,F,ne,he,ge=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pe=ye.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&he!==void 0&&(pe=pe[he]),pe)if(U>=0&&U<=y.width-V&&H>=0&&H<=y.height-F){xe.bindFramebuffer(R.FRAMEBUFFER,pe);let Re=y.textures[ge],Le=Re.format,Te=Re.type;if(!Ie.textureFormatReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ie.textureTypeReadable(Te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let We=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,We),R.bufferData(R.PIXEL_PACK_BUFFER,ne.byteLength,R.STREAM_READ),y.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+ge),R.readPixels(U,H,V,F,Se.convert(Le),Se.convert(Te),0);let it=N!==null?ye.get(N).__webglFramebuffer:null;xe.bindFramebuffer(R.FRAMEBUFFER,it);let gt=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await Wh(R,gt,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,We),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,ne),R.deleteBuffer(We),R.deleteSync(gt),ne}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,U=null,H=0){let V=Math.pow(2,-H),F=Math.floor(y.image.width*V),ne=Math.floor(y.image.height*V),he=U!==null?U.x:0,ge=U!==null?U.y:0;Ve.setTexture2D(y,0),R.copyTexSubImage2D(R.TEXTURE_2D,H,0,0,he,ge,F,ne),xe.unbindTexture()};let od=R.createFramebuffer(),ld=R.createFramebuffer();this.copyTextureToTexture=function(y,U,H=null,V=null,F=0,ne=null){ne===null&&(F!==0?(ds("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ne=F,F=0):ne=0);let he,ge,pe,Re,Le,Te,We,it,gt,ct=y.isCompressedTexture?y.mipmaps[ne]:y.image;if(H!==null)he=H.max.x-H.min.x,ge=H.max.y-H.min.y,pe=H.isBox3?H.max.z-H.min.z:1,Re=H.min.x,Le=H.min.y,Te=H.isBox3?H.min.z:0;else{let hn=Math.pow(2,-F);he=Math.floor(ct.width*hn),ge=Math.floor(ct.height*hn),y.isDataArrayTexture?pe=ct.depth:y.isData3DTexture?pe=Math.floor(ct.depth*hn):pe=1,Re=0,Le=0,Te=0}V!==null?(We=V.x,it=V.y,gt=V.z):(We=0,it=0,gt=0);let at=Se.convert(U.format),Ae=Se.convert(U.type),ft;U.isData3DTexture?(Ve.setTexture3D(U,0),ft=R.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Ve.setTexture2DArray(U,0),ft=R.TEXTURE_2D_ARRAY):(Ve.setTexture2D(U,0),ft=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,U.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,U.unpackAlignment);let Je=R.getParameter(R.UNPACK_ROW_LENGTH),en=R.getParameter(R.UNPACK_IMAGE_HEIGHT),qi=R.getParameter(R.UNPACK_SKIP_PIXELS),tn=R.getParameter(R.UNPACK_SKIP_ROWS),Ds=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,ct.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ct.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Re),R.pixelStorei(R.UNPACK_SKIP_ROWS,Le),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Te);let pt=y.isDataArrayTexture||y.isData3DTexture,cn=U.isDataArrayTexture||U.isData3DTexture;if(y.isDepthTexture){let hn=ye.get(y),Gt=ye.get(U),Yt=ye.get(hn.__renderTarget),Yo=ye.get(Gt.__renderTarget);xe.bindFramebuffer(R.READ_FRAMEBUFFER,Yt.__webglFramebuffer),xe.bindFramebuffer(R.DRAW_FRAMEBUFFER,Yo.__webglFramebuffer);for(let Ei=0;Ei<pe;Ei++)pt&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,ye.get(y).__webglTexture,F,Te+Ei),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,ye.get(U).__webglTexture,ne,gt+Ei)),R.blitFramebuffer(Re,Le,he,ge,We,it,he,ge,R.DEPTH_BUFFER_BIT,R.NEAREST);xe.bindFramebuffer(R.READ_FRAMEBUFFER,null),xe.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(F!==0||y.isRenderTargetTexture||ye.has(y)){let hn=ye.get(y),Gt=ye.get(U);xe.bindFramebuffer(R.READ_FRAMEBUFFER,od),xe.bindFramebuffer(R.DRAW_FRAMEBUFFER,ld);for(let Yt=0;Yt<pe;Yt++)pt?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,hn.__webglTexture,F,Te+Yt):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,hn.__webglTexture,F),cn?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Gt.__webglTexture,ne,gt+Yt):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Gt.__webglTexture,ne),F!==0?R.blitFramebuffer(Re,Le,he,ge,We,it,he,ge,R.COLOR_BUFFER_BIT,R.NEAREST):cn?R.copyTexSubImage3D(ft,ne,We,it,gt+Yt,Re,Le,he,ge):R.copyTexSubImage2D(ft,ne,We,it,Re,Le,he,ge);xe.bindFramebuffer(R.READ_FRAMEBUFFER,null),xe.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else cn?y.isDataTexture||y.isData3DTexture?R.texSubImage3D(ft,ne,We,it,gt,he,ge,pe,at,Ae,ct.data):U.isCompressedArrayTexture?R.compressedTexSubImage3D(ft,ne,We,it,gt,he,ge,pe,at,ct.data):R.texSubImage3D(ft,ne,We,it,gt,he,ge,pe,at,Ae,ct):y.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,ne,We,it,he,ge,at,Ae,ct.data):y.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,ne,We,it,ct.width,ct.height,at,ct.data):R.texSubImage2D(R.TEXTURE_2D,ne,We,it,he,ge,at,Ae,ct);R.pixelStorei(R.UNPACK_ROW_LENGTH,Je),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,en),R.pixelStorei(R.UNPACK_SKIP_PIXELS,qi),R.pixelStorei(R.UNPACK_SKIP_ROWS,tn),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Ds),ne===0&&U.generateMipmaps&&R.generateMipmap(ft),xe.unbindTexture()},this.initRenderTarget=function(y){ye.get(y).__webglFramebuffer===void 0&&Ve.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Ve.setTextureCube(y,0):y.isData3DTexture?Ve.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Ve.setTexture2DArray(y,0):Ve.setTexture2D(y,0),xe.unbindTexture()},this.resetState=function(){w=0,P=0,N=null,xe.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}};var Po={title:"RPG Welling",loading:"Carregando a aventura\u2026",webglFail:"Este navegador n\xE3o conseguiu abrir o 3D. Tente em um Chrome mais novo!",chooseCharacter:"Quem vai explorar?",characterIvy:"Ivy, a irm\xE3 mais velha. Curiosa, leva a Pip, a coruja corajosa.",characterOakley:"Oakley, o irm\xE3o. Observador, leva o Marlow, a coruja pensadora.",start:"Come\xE7ar a aventura",skip:"Pular",next:"Continuar",home:"Menu",sound:"Som",hint:"Dica da coruja",journal:"Miss\xE3o",pieces:"partes do mapa",objTalk:"Fale com o Sr. Finch e a Sra. Page",objFind:"Encontre as partes do mapa antigo ({count}/4)",objAssemble:"Junte o mapa na porta de heras",objToWoods:"Entre na trilha secreta",objCross:"Atravesse o riacho pelas pedras certas",objGate:"Abra o port\xE3o secreto",objDone:"Aventura conclu\xEDda! \u{1F3F0}",continueLabel:"Continuar",close:"Fechar",correct:"Isso mesmo! \u{1F604}",tryAgain:"Quase! A coruja acha que d\xE1 outra chance. \u{1F642}",toastPiece:"\u{1F5FA}\uFE0F Parte do mapa encontrada ({count}/4)!",toastClue:"\u{1F4DC} P\xE1gina de hist\xF3ria guardada!",toastAlready:"Voc\xEA j\xE1 olhou aqui.",warpDebug:"Modo explora\xE7\xE3o r\xE1pida",theEnd:"Continua\u2026",endCard:"O port\xE3o se abriu para os Caminhos de A\xE7\xFAcar! Essa hist\xF3ria continua no pr\xF3ximo cap\xEDtulo.",badgeEarned:"\u{1F3C5} Chave dos Bosques",playAgain:"Voltar ao menu",hintNoPieces:'\u{1F989} Pip pousa no seu ombro: "Comecem falando com os adultos da escola. O zelador achou algo varrendo\u2026"',hintFind:'\u{1F989} "Brilha, brilha! Procure coisas brilhantes perto dos livros e do carrinho de livros."',hintAssemble:'\u{1F989} "Quatro partes fazem um mapa inteiro. A porta de heras est\xE1 esperando!"',hintCross:'\u{1F989} "Olhe o padr\xE3o das pedras: 2, 4, 6\u2026 qual vem depois?"',hintGate:'\u{1F989} "O mapa na sua m\xE3o combina com a \xE1rvore do port\xE3o. Toque no port\xE3o!"',hintDone:'\u{1F989} "Que aventura! Tomara que o castelo tenha petiscos."'},x0={loading:"Loading the adventure\u2026",webglFail:"This browser could not start 3D. Try a newer Chrome!",chooseCharacter:"Who is going to explore?",characterIvy:"Ivy, the older sister. Curious, with Pip the bold owl.",characterOakley:"Oakley, the brother. Watchful, with Marlow the thoughtful owl.",start:"Start the adventure",skip:"Skip",next:"Next",home:"Menu",sound:"Sound",hint:"Owl hint",journal:"Quest",pieces:"map pieces",objTalk:"Talk to Mr Finch and Ms Page",objFind:"Find the old map pieces ({count}/4)",objAssemble:"Put the map together at the ivy door",objToWoods:"Step into the secret trail",objCross:"Cross the stream on the right stones",objGate:"Open the secret gate",objDone:"Adventure complete! \u{1F3F0}",continueLabel:"Continue",close:"Close",correct:"That's right! \u{1F604}",tryAgain:"Almost! The owl thinks you deserve another try. \u{1F642}",toastPiece:"\u{1F5FA}\uFE0F Map piece found ({count}/4)!",toastClue:"\u{1F4DC} Storybook page saved!",toastAlready:"You already looked here.",theEnd:"To be continued\u2026",endCard:"The gate opened to the Sugar Paths! This story continues in the next chapter.",badgeEarned:"\u{1F3C5} Woodland Key",playAgain:"Back to menu",hintNoPieces:'\u{1F989} Pip lands on your shoulder: "Start by talking to the school grown-ups. The caretaker found something while sweeping\u2026"',hintFind:'\u{1F989} "Shiny, shiny! Look for glimmering things near the books and the book trolley."',hintAssemble:'\u{1F989} "Four pieces make one whole map. The ivy door is waiting!"',hintCross:'\u{1F989} "Look at the stone pattern: 2, 4, 6\u2026 which comes next?"',hintGate:'\u{1F989} "The map in your hand matches the tree on the gate. Tap the gate!"',hintDone:'\u{1F989} "What an adventure! I hope the castle has snacks."'},y0={loading:"Cargando la aventura\u2026",webglFail:"\xA1Este navegador no pudo abrir el 3D! Prueba en un Chrome m\xE1s nuevo.",chooseCharacter:"\xBFQui\xE9n va a explorar?",characterIvy:"Ivy, la hermana mayor. Curiosa, lleva a Pip, el b\xFAho valiente.",characterOakley:"Oakley, el hermano. Observador, lleva a Marlow, el b\xFAho pensador.",start:"Empezar la aventura",skip:"Saltar",next:"Seguir",home:"Men\xFA",sound:"Sonido",hint:"Pista del b\xFAho",journal:"Misi\xF3n",pieces:"partes del mapa",objTalk:"Habla con el Sr. Finch y la Sra. Page",objFind:"Encuentra las partes del mapa antiguo ({count}/4)",objAssemble:"Une el mapa en la puerta de hiedra",objToWoods:"Entra en el sendero secreto",objCross:"Cruza el arroyo por las piedras correctas",objGate:"Abre la puerta secreta",objDone:"\xA1Aventura completada! \u{1F3F0}",continueLabel:"Continuar",close:"Cerrar",correct:"\xA1Eso es! \u{1F604}",tryAgain:"\xA1Casi! El b\xFAho cree que mereces otra oportunidad. \u{1F642}",toastPiece:"\u{1F5FA}\uFE0F \xA1Parte del mapa encontrada ({count}/4)!",toastClue:"\u{1F4DC} \xA1P\xE1gina de historia guardada!",toastAlready:"Ya miraste aqu\xED.",theEnd:"Continuar\xE1\u2026",endCard:"\xA1La puerta se abri\xF3 a los Caminos de Az\xFAcar! Esta historia sigue en el pr\xF3ximo cap\xEDtulo.",badgeEarned:"\u{1F3C5} Llave del Bosque",playAgain:"Volver al men\xFA",hintNoPieces:'\u{1F989} Pip aterriza en tu hombro: "Empiecen hablando con los adultos de la escuela. El conserje encontr\xF3 algo barriendo\u2026"',hintFind:'\u{1F989} "\xA1Brilla, brilla! Busquen cosas brillantes cerca de los libros y del carrito de libros."',hintAssemble:'\u{1F989} "Cuatro partes hacen un mapa entero. \xA1La puerta de hiedra est\xE1 esperando!"',hintCross:'\u{1F989} "Mira el patr\xF3n de las piedras: 2, 4, 6\u2026 \xBFcu\xE1l viene despu\xE9s?"',hintGate:'\u{1F989} "El mapa en tu mano coincide con el \xE1rbol de la puerta. \xA1Toca la puerta!"',hintDone:'\u{1F989} "\xA1Qu\xE9 aventura! Ojal\xE1 el castello tenga meriendas."'};function bt(i,e,t={}){let n=Po;i==="en"?n={...Po,...x0}:i==="es"&&(n={...Po,...y0});let s=n[e]??Po[e]??e;for(let[r,a]of Object.entries(t))s=s.replaceAll(`{${r}}`,a);return s}function An(i,e="pt"){return i&&typeof i=="object"?i[e]??i.pt??i.en??"":i??""}var Mr=null,cc=!1;function Rs(){return Mr||(Mr=new(window.AudioContext||window.webkitAudioContext)),Mr.state==="suspended"&&Mr.resume(),Mr}function hc(i){cc=!!i}function si(){return Rs().currentTime}function Jt(i,e,t,n="sine",s=.15){if(cc)return;let r=Rs(),a=r.createOscillator(),o=r.createGain();a.type=n,a.frequency.setValueAtTime(i,e),o.gain.setValueAtTime(0,e),o.gain.linearRampToValueAtTime(s,e+.02),o.gain.exponentialRampToValueAtTime(1e-4,e+t),a.connect(o).connect(r.destination),a.start(e),a.stop(e+t+.02)}function Eu(i,e,t=.08){if(cc)return;let n=Rs(),s=Math.floor(n.sampleRate*e),r=n.createBuffer(1,s,n.sampleRate),a=r.getChannelData(0);for(let l=0;l<s;l+=1)a[l]=(Math.random()*2-1)*(1-l/s);let o=n.createBufferSource(),c=n.createGain();o.buffer=r,c.gain.setValueAtTime(t,i),o.connect(c).connect(n.destination),o.start(i)}var Et={tap(){Jt(660,si(),.08)},pickup(){let i=si();Jt(784,i,.09,"triangle",.18),Jt(1175,i+.08,.14,"triangle",.18)},correct(){let i=si();Jt(523.25,i,.12,"triangle",.2),Jt(659.25,i+.1,.12,"triangle",.2),Jt(783.99,i+.2,.22,"triangle",.2)},wrong(){let i=si();Jt(311,i,.16,"sawtooth",.06),Jt(233,i+.14,.2,"sawtooth",.06)},hoot(){let i=si();Jt(392,i,.16,"sine",.22),Jt(330,i+.18,.26,"sine",.22)},magic(){let i=si();[523,659,784,1047,1319].forEach((e,t)=>Jt(e,i+t*.07,.3,"sine",.14)),Eu(i,.5,.03)},door(){let i=si();Jt(98,i,.3,"sine",.3),Eu(i+.05,.25,.05)},star(){let i=si();[784,988,1175,1568].forEach((e,t)=>Jt(e,i+t*.09,.18,"triangle",.18))},fanfare(){let i=si();[523.25,659.25,783.99,1046.5,1318.5].forEach((e,t)=>Jt(e,i+t*.13,.32,"triangle",.2))}};var uc="mundo-da-julia.rpgwelling.v1",Lo=[{id:"ivy",emoji:"\u{1F467}",owl:"Pip"},{id:"oakley",emoji:"\u{1F9D2}",owl:"Marlow"}],Cs=["finch","page","shelf","trolley"],v0=["school","woods"];function M0(){return{version:1,character:"",zone:"school",position:null,mapPieces:[],flags:{},clues:[],challenges:{},sound:!0}}function Io(i={}){let e=i&&typeof i=="object"?i:{},t=M0();if(t.character=Lo.some(n=>n.id===e.character)?e.character:"",t.zone=v0.includes(e.zone)?e.zone:"school",Array.isArray(e.position)&&e.position.length===2){let[n,s]=e.position.map(r=>Number.isFinite(r)?Math.max(-60,Math.min(60,r)):0);t.position=[n,s]}if(t.mapPieces=(Array.isArray(e.mapPieces)?e.mapPieces:[]).filter(n=>Cs.includes(n)),t.mapPieces=Cs.filter(n=>t.mapPieces.includes(n)),e.flags&&typeof e.flags=="object")for(let[n,s]of Object.entries(e.flags))typeof n=="string"&&n.length<=40&&(t.flags[n]=!!s);if(t.clues=(Array.isArray(e.clues)?e.clues:[]).filter(n=>typeof n=="string"&&n.length<=40).slice(0,50),e.challenges&&typeof e.challenges=="object")for(let[n,s]of Object.entries(e.challenges))typeof n=="string"&&n.length<=40&&(t.challenges[n]=!!s);return t.sound=e.sound!==!1&&e.sound!==0,t}function Tu(i){return String(i||"").trim().toLowerCase().slice(0,32)}function wu(i,e){let t=Tu(e);if(!t)return Io();try{let n=JSON.parse(i.getItem(uc)||"{}")||{};return Io(n[t])}catch{return Io()}}function Kt(i,e,t){let n=Tu(e);if(n)try{let s=JSON.parse(i.getItem(uc)||"{}")||{};s[n]=Io(t),i.setItem(uc,JSON.stringify(s))}catch{}}var S0=8;function vi(i){return i.mapPieces.length}function Do(i){return vi(i)===Cs.length}function b0(i){return!!i.flags.mapAssembled}function Au(i){return i===S0}function dc(i){return i.flags.gateOpen?{id:"done"}:i.zone==="woods"?i.flags.stonesCrossed?{id:"gate"}:{id:"cross"}:b0(i)?{id:"toWoods"}:Do(i)?{id:"assemble"}:vi(i)===0?{id:"talk",progress:!!i.flags.finchMet+!!i.flags.pageMet}:{id:"find",progress:vi(i)}}function Ru(i){let e=dc(i);return e.id==="done"?"hintDone":e.id==="gate"?"hintGate":e.id==="cross"?"hintCross":e.id==="assemble"?"hintAssemble":e.id==="find"?"hintFind":"hintNoPieces"}var fc=new Map;function Ue(i){return fc.has(i)||fc.set(i,new Nt({color:i})),fc.get(i)}function ln(i,e=1){return new fn({color:i,transparent:e<1,opacity:e})}function jt(i,e,t){let n=document.createElement("canvas");n.width=i,n.height=e,t(n.getContext("2d"),i,e);let s=new xs(n);return s.colorSpace=kt,s}function Lt(i,e,t,n,s,r,a,o,{collider:c,rotY:l=0,cast:h=!0,receive:u=!0}={}){let f=new Q(new yt(e,t,n),Ue(s));return f.position.set(r,a,o),f.rotation.y=l,f.castShadow=h,f.receiveShadow=u,i.add(f),c&&Sr(i,r,o,e,n),f}function Sr(i,e,t,n,s){let r=i.userData.zone?.colliders;r&&r.push({minX:e-n/2,maxX:e+n/2,minZ:t-s/2,maxZ:t+s/2})}function on(i,e,t,n,s,r=2.2,a=null){let o=Math.abs(n-e)||.3,c=Math.abs(s-t)||.3,l=(e+n)/2,h=(t+s)/2,u=new Q(new yt(o,r,c),a||Ue(15260867));u.position.set(l,r/2,h),u.castShadow=!0,u.receiveShadow=!0,i.add(u),Sr(i,l,h,o,c);let f=new Q(new yt(o+.06,.32,c+.06),Ue(7031342));f.position.set(l,.16,h),i.add(f)}function Cu(i,e,t,n){Lt(i,.5,.45,.5,10833966,e,.225,t,{collider:!0});let s=new Q(new St(.42,10,8),Ue(4160826));s.position.set(e,.9,t),s.scale.y=1.2,s.castShadow=!0,i.add(s);for(let r=0;r<5;r+=1){let a=br(n,.34);a.position.set(e+(Math.random()-.5)*.5,1.15+Math.random()*.25,t+(Math.random()-.5)*.5),a.rotation.y=Math.random()*Math.PI,i.add(a)}}function br(i,e){let t=new Q(new vt(e,e),new Nt({map:i,transparent:!0,side:an,depthWrite:!1}));return t.castShadow=!1,t}function Ft(i,e,t,n,s,r,a,{opacity:o=.5,amp:c=.18,speed:l=2.2}={}){Ft.texture||(Ft.texture=jt(128,128,u=>{let f=u.createRadialGradient(64,64,4,64,64,62);f.addColorStop(0,"rgba(255,255,255,1)"),f.addColorStop(.4,"rgba(255,255,255,.45)"),f.addColorStop(1,"rgba(255,255,255,0)"),u.fillStyle=f,u.fillRect(0,0,128,128)}));let h=new ms(new Di({map:Ft.texture,color:t,transparent:!0,opacity:o,blending:_i,depthWrite:!1}));return h.position.set(s,r,a),h.scale.set(n,n,1),i.add(h),(e.pulses||=[]).push({obj:h.material,base:o,amp:c,speed:l,phase:Math.random()*6}),h}function E0(){return jt(512,512,i=>{i.fillStyle="#cbb9a4",i.fillRect(0,0,512,512);let e=128,t=64;for(let n=0;n<8;n+=1){let s=n%2*e/2;for(let r=-1;r<5;r+=1){let a=165+Math.random()*40;i.fillStyle=`rgb(${a+25}, ${a*.62}, ${a*.45})`,i.fillRect(r*e+s+3,n*t+3,e-6,t-6)}}})}function T0(){return jt(256,256,i=>{i.fillStyle="#efe3c8",i.fillRect(0,0,256,256);for(let e=0;e<700;e+=1)i.fillStyle=`rgba(${180+Math.random()*60|0}, ${165+Math.random()*55|0}, ${120+Math.random()*40|0}, .12)`,i.fillRect(Math.random()*256,Math.random()*256,2,2)})}function w0(){return jt(512,512,i=>{for(let e=0;e<8;e+=1){let t=150+Math.random()*30;i.fillStyle=`rgb(${t+30}, ${t*.82}, ${t*.52})`,i.fillRect(e*64,0,64,512),i.strokeStyle="rgba(90, 58, 28, .35)",i.lineWidth=2;for(let n=0;n<5;n+=1){i.beginPath();let s=e*64+8+Math.random()*48;i.moveTo(s,0),i.bezierCurveTo(s+6,170,s-6,340,s+4,512),i.stroke()}i.fillStyle="rgba(70, 44, 20, .8)",i.fillRect(e*64,0,3,512)}})}function A0(){return jt(512,512,i=>{for(let e=0;e<4;e+=1)for(let t=0;t<4;t+=1){let n=(e+t)%2===0;i.fillStyle=n?"#9a6a48":"#d9c49a",i.fillRect(t*128,e*128,128,128),i.fillStyle="rgba(0,0,0,.08)";for(let s=0;s<14;s+=1)i.fillRect(t*128+Math.random()*128,e*128+Math.random()*128,3,3)}})}function R0(){return jt(256,256,i=>{i.fillStyle="#8e3b46",i.fillRect(0,0,256,256);for(let e=0;e<900;e+=1)i.fillStyle=Math.random()>.5?"rgba(60, 20, 26, .18)":"rgba(220, 150, 150, .1)",i.fillRect(Math.random()*256,Math.random()*256,2,2)})}function C0(){return jt(512,512,i=>{i.fillStyle="#3c7a40",i.fillRect(0,0,512,512);for(let e=0;e<2400;e+=1)i.fillStyle=Math.random()>.5?"rgba(30, 70, 32, .25)":"rgba(120, 190, 100, .16)",i.fillRect(Math.random()*512,Math.random()*512,3,3+Math.random()*4)})}function P0(){return jt(256,256,i=>{i.fillStyle="#8a6a42",i.fillRect(0,0,256,256);for(let n=0;n<500;n+=1){i.fillStyle=Math.random()>.5?"rgba(70, 50, 28, .3)":"rgba(190, 160, 110, .25)";let s=2+Math.random()*6;i.beginPath(),i.arc(Math.random()*256,Math.random()*256,s,0,7),i.fill()}i.globalCompositeOperation="destination-out";let e=i.createLinearGradient(0,0,60,0);e.addColorStop(0,"rgba(0,0,0,1)"),e.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=e,i.fillRect(0,0,60,256);let t=i.createLinearGradient(256,0,196,0);t.addColorStop(0,"rgba(0,0,0,1)"),t.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=t,i.fillRect(196,0,60,256)})}function mc(){return jt(128,128,i=>{i.clearRect(0,0,128,128);for(let e=0;e<9;e+=1){let t=20+Math.random()*88,n=14+Math.random()*30,s=(Math.random()-.5)*30;i.strokeStyle=Math.random()>.5?"#4d8f45":"#67a851",i.lineWidth=5,i.lineCap="round",i.beginPath(),i.moveTo(t,124),i.quadraticCurveTo(t+s,70,t+s*1.6,n),i.stroke()}})}function Iu(){return jt(128,128,i=>{i.clearRect(0,0,128,128),i.strokeStyle="#3f6b34",i.lineWidth=4,i.beginPath(),i.moveTo(10,120),i.bezierCurveTo(40,90,60,60,100,14),i.stroke();for(let e=0;e<9;e+=1){let t=18+Math.random()*96,n=20+Math.random()*96,s=10+Math.random()*9;i.fillStyle=Math.random()>.5?"#4d8f45":"#3c7a40",i.beginPath(),i.ellipse(t,n,s,s*.72,Math.random()*3,0,7),i.fill(),i.fillStyle="rgba(200, 240, 160, .25)",i.beginPath(),i.ellipse(t-s*.25,n-s*.25,s*.4,s*.28,0,0,7),i.fill()}})}function I0(){return jt(128,160,i=>{i.fillStyle="#fdf6e4",i.fillRect(0,0,128,160),i.strokeStyle="#b9ad92",i.lineWidth=4;for(let e=0;e<7;e+=1)i.beginPath(),i.moveTo(16,30+e*18),i.lineTo(112-Math.random()*30,30+e*18),i.stroke();i.fillStyle="#d4506a",i.beginPath(),i.arc(64,14,8,0,7),i.fill()})}function Pu(){return jt(256,256,i=>{i.fillStyle="#8d8a80",i.fillRect(0,0,256,256);for(let e=0;e<700;e+=1)i.fillStyle=Math.random()>.5?"rgba(50, 48, 44, .2)":"rgba(200, 198, 188, .2)",i.fillRect(Math.random()*256,Math.random()*256,3,3)})}function Uo({blink:i=!1,mustache:e=!1,glasses:t=!1}={}){return jt(256,256,n=>{n.clearRect(0,0,256,256);let s=r=>{if(i){n.strokeStyle="#3a2a20",n.lineWidth=8,n.lineCap="round",n.beginPath(),n.arc(r,116,17,.2*Math.PI,.8*Math.PI),n.stroke();return}n.fillStyle="#fff",n.beginPath(),n.ellipse(r,114,20,25,0,0,7),n.fill(),n.fillStyle="#5a3a22",n.beginPath(),n.arc(r,119,11.5,0,7),n.fill(),n.fillStyle="#241812",n.beginPath(),n.arc(r,120,6.5,0,7),n.fill(),n.fillStyle="#fff",n.beginPath(),n.arc(r-4,112,3.4,0,7),n.fill()};s(86),s(170),n.strokeStyle="#a4552f",n.lineWidth=9,n.lineCap="round",n.beginPath(),n.arc(128,164,27,.18*Math.PI,.82*Math.PI),n.stroke(),n.fillStyle="rgba(242, 130, 110, .38)",n.beginPath(),n.ellipse(56,156,17,11,0,0,7),n.fill(),n.beginPath(),n.ellipse(200,156,17,11,0,0,7),n.fill(),e&&(n.strokeStyle="#d8d3cc",n.lineWidth=13,n.beginPath(),n.arc(128,152,26,.25*Math.PI,.75*Math.PI),n.stroke()),t&&(n.strokeStyle="#3d4a50",n.lineWidth=7,n.beginPath(),n.arc(86,114,34,0,7),n.stroke(),n.beginPath(),n.arc(170,114,34,0,7),n.stroke(),n.beginPath(),n.moveTo(120,112),n.lineTo(136,112),n.stroke())})}var pc=null;function Er(){return pc||(pc={open:Uo(),blink:Uo({blink:!0}),mustache:Uo({mustache:!0}),glasses:Uo({glasses:!0})}),pc}function _c(i,e,t){let n=new Q(new Nn(t,24),new fn({map:e,transparent:!0}));return n.position.z=t*1.18,i.add(n),n}function xc(i){let e=new Zt,t={},n=Ue(16175012),s=Ue(2897248),r=i==="ivy"?7029286:5124120;t.body=new Zt,e.add(t.body);let a=new Q(new Un(.25,.4,4,12),s);if(a.position.y=.78,a.castShadow=!0,t.body.add(a),i==="ivy"){let p=new Q(new Fn(.35,.36,14,1,!0),Ue(2304594));p.position.y=.55,p.castShadow=!0,t.body.add(p)}else{let p=new Q(new Ht(.27,.27,.1,12),Ue(2304594));p.position.y=.56,t.body.add(p)}let o=new Q(new Ht(.13,.16,.06,12),Ue(15920608));o.position.y=1.02,t.body.add(o);let c=new Q(new St(.245,18,14),n);c.position.y=1.3,c.castShadow=!0,t.body.add(c),t.face=_c(c,Er().open,.2),t.face.position.set(0,-.01,.208);let l=new Q(new St(.27,18,12,0,Math.PI*2,0,Math.PI*.52),Ue(r));l.position.set(0,1.31,-.015),l.rotation.x=-.22,l.castShadow=!0,t.body.add(l);let h=new Q(new St(.22,14,10),Ue(r));if(h.position.set(0,1.22,-.12),h.scale.set(1,1.1,.9),t.body.add(h),i==="ivy"){t.ponytail=new Q(new Un(.09,.3,4,8),Ue(r)),t.ponytail.position.set(0,1.06,-.3),t.ponytail.rotation.x=.35,t.ponytail.castShadow=!0,t.body.add(t.ponytail);let p=new Q(new Ni(.075,.03,8,14),Ue(13914218));p.position.set(0,1.24,-.27),p.rotation.x=Math.PI/2.4,t.body.add(p)}else{let p=new Q(new St(.16,12,8),Ue(r));p.position.set(0,1.42,.14),p.scale.set(1.5,.55,.7),t.body.add(p)}let u=new Q(new yt(.32,.38,.17),Ue(5979428));u.position.set(0,.85,-.28),u.castShadow=!0,t.body.add(u);for(let p of[-1,1]){let g=new Q(new yt(.06,.34,.02),Ue(4861976));g.position.set(p*.12,.9,.24),t.body.add(g)}let f=Is(.075);f.position.set(0,.9,-.375),f.rotation.y=Math.PI,t.body.add(f),t.legs=[];for(let p of[-1,1]){let g=new Q(new Un(.085,.26,4,10),Ue(i==="ivy"?16184044:3357278));g.position.set(p*.12,.27,0),g.castShadow=!0,e.add(g),t.legs.push(g);let x=new Q(new St(.095,10,8),Ue(2760984));x.position.set(p*.12,.05,.03),x.scale.set(1,.6,1.35),e.add(x),t.legs.push(x)}t.arms=[];for(let p of[-1,1]){let g=new Q(new Un(.065,.3,4,10),s);g.position.set(p*.31,.85,0),g.castShadow=!0,t.body.add(g),t.arms.push(g);let x=new Q(new St(.07,10,8),n);x.position.set(p*.31,.64,0),t.body.add(x)}return e.userData.animate=(p,g)=>{let x=Math.min(1,g),m=Math.sin(p*9)*x*.55;t.legs[0].rotation.x=m,t.legs[1].rotation.x=-m,t.arms[0].rotation.x=-m*.8,t.arms[1].rotation.x=m*.8,t.body.position.y=Math.abs(Math.sin(p*9))*.05*x,t.body.rotation.z=Math.sin(p*9)*.03*x,t.ponytail&&(t.ponytail.rotation.z=Math.sin(p*3)*.12);let E=(p+1.7)%3.4<.14?Er().blink:Er().open;t.face.material.map!==E&&(t.face.material.map=E,t.face.material.needsUpdate=!0)},e}function L0(i=0){return jt(256,256,e=>{e.clearRect(0,0,256,256);let t=i===0?"#f4ecd8":"#d9cbb2";for(let n of[82,174])e.fillStyle=t,e.beginPath(),e.ellipse(n,128,58,66,0,0,7),e.fill();for(let n of[82,174])e.fillStyle="#e8a83d",e.beginPath(),e.arc(n,124,26,0,7),e.fill(),e.fillStyle="#241812",e.beginPath(),e.arc(n,124,17,0,7),e.fill(),e.fillStyle="#fff",e.beginPath(),e.arc(n-6,116,6,0,7),e.fill();e.fillStyle="#241812",e.beginPath(),e.ellipse(128,178,12,8,0,0,7),e.fill()})}function yc(i=0){let e=new Zt,t=i===0?14272936:9072982,n=new Q(new St(.17,14,12),Ue(t));n.scale.set(1,1.12,.9),n.castShadow=!0,e.add(n);let s=_c(e,L0(i),.2);s.position.set(0,.06,.1);for(let c of[-1,1]){let l=new Q(new Fn(.045,.11,6),Ue(t));l.position.set(c*.09,.22,.02),l.rotation.z=-c*.5,e.add(l)}let r=new Q(new Fn(.032,.07,6),Ue(15242285));r.rotation.x=Math.PI/2,r.position.set(0,.02,.21),e.add(r);let a=[];for(let c of[-1,1]){let l=new Q(new St(.15,10,8),Ue(t));l.scale.set(.26,.95,1),l.position.set(c*.16,-.01,0),l.castShadow=!0,e.add(l),a.push(l)}let o=new Q(new Fn(.08,.16,6),Ue(t));return o.position.set(0,-.14,-.1),o.rotation.x=-2.5,e.add(o),e.userData.animate=(c,l)=>{let h=Math.sin(c*(l?14:2.2))*(l?.9:.12);a[0].rotation.z=h,a[1].rotation.z=-h,n.rotation.z=Math.sin(c*(l?7:1.8))*(l?.15:.05),s.position.y=.06+Math.sin(c*2.4)*.006},e}function Lu(i,e="mustache"){let t=new Zt,n=new Q(new Un(.3,.62,4,12),Ue(i));n.position.y=1.05,n.castShadow=!0,t.add(n);let s=new Q(new yt(.4,.5,.05),Ue(13218954));s.position.set(0,.95,.3),t.add(s);let r=new Q(new St(.24,18,14),Ue(15911328));r.position.y=1.66,r.castShadow=!0,t.add(r),_c(r,Er()[e]||Er().mustache,.2).position.set(0,-.01,.208);let o=new Q(new St(.25,16,12),Ue(14209996));o.position.set(0,1.73,-.03),o.scale.set(1,.9,1),t.add(o);for(let c of[-1,1]){let l=new Q(new Un(.1,.42,4,10),Ue(3816002));l.position.set(c*.15,.32,0),l.castShadow=!0,t.add(l)}return t}function No(i){let e=new Q(new Nn(.4,20),new fn({color:0,transparent:!0,opacity:.14,depthWrite:!1}));return e.rotation.x=-Math.PI/2,e.position.y=.02,i.add(e),e}function Is(i=1){let e=new Zt,t=new Q(new Nn(i,32),ln(9067024));e.add(t);let n=new Q(new Nn(i*.86,32),ln(16106818));n.position.z=.001,e.add(n);let s=ln(8014344),r=new Q(new Ht(i*.05,i*.08,i*.62,6),s);r.position.y=-i*.24,r.position.z=.002,e.add(r);for(let[a,o]of[[.5,.5],[-.5,.5],[0,.62]]){let c=new Q(new Ht(i*.03,i*.045,i*o,5),s);c.position.set(Math.sin(a)*i*o*.5,i*(.18+Math.cos(a)*o*.4),.002),c.rotation.z=-a,e.add(c)}for(let[a,o,c]of[[-.34,.32,.2],[.34,.32,.2],[0,.5,.24],[-.16,.14,.15],[.16,.14,.15]]){let l=new Q(new St(i*c,8,6),ln(16768634));l.position.set(i*a,i*o,.003),e.add(l)}return e}function D0(i){let e=document.createElement("canvas");e.width=128,e.height=128;let t=e.getContext("2d");t.fillStyle="rgba(24, 20, 44, 0.9)",t.beginPath(),t.roundRect(10,10,108,108,26),t.fill(),t.strokeStyle="#f5c542",t.lineWidth=7,t.beginPath(),t.roundRect(10,10,108,108,26),t.stroke(),t.fillStyle="#fff6dd",t.font="bold 62px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText(i,64,70);let n=new xs(e);n.colorSpace=kt;let s=new ms(new Di({map:n,transparent:!0}));return s.scale.set(.62,.62,1),s}function Ps(i,e,t,n,s,r="s"){Lt(i,n,2.3,s,6111014,e,1.15,t,{collider:!0});let a=[.55,1.2,1.85],o=[11551038,4091056,4102751,13208109,8015567,13914218,5164484],c=n>s,l=c?n:s,h=r==="ns"?["s","n"]:[r];for(let u of h){let f=c?{x:0,z:(u==="s"?1:-1)*(s/2+.02)}:{x:(u==="e"?1:-1)*(n/2+.02),z:0},p=Math.min(.42,(c?s:n)-.2);for(let g of a){let x=Math.max(6,Math.round(l/.16)),m=new rr(new yt(1,1,1),new Nt,x),d=new et;for(let E=0;E<x;E+=1){let T=.09+Math.random()*.08,S=.34+Math.random()*.14;d.makeScale(c?T:p,S,c?p:T);let A=-(l/2-.1)+(E+.5)*(l-.2)/x;d.setPosition(c?e+A:e+f.x,g-.18+S/2,c?t+f.z:t+A),m.setMatrixAt(E,d),m.setColorAt(E,new Oe(o[Math.random()*o.length|0]))}m.castShadow=!0,i.add(m)}}}function Du(i,e){for(let t of i.pulses||[])t.obj.opacity=t.base+t.amp*Math.sin(e*t.speed+t.phase)}function gc(i,e,t,n,{radius:s=1.5,height:r=11,tilt:a=.2,opacity:o=.1,color:c=16769704}={}){let l=new Q(new Fn(s,r,14,1,!0),new fn({color:c,transparent:!0,opacity:o,side:an,depthWrite:!1,blending:_i}));return l.position.set(e,t,n),l.rotation.z=a,i.add(l),l}function Uu(i){let e={name:"school",spawn:[0,.6],bounds:{minX:-6.5,maxX:6.5,minZ:-27.4,maxZ:2.9},colliders:[],interactables:[],hemi:[16773849,7035460,1.15],sun:{color:16769192,intensity:1.95,pos:[8,14,6]},background:2367288,fog:[2367288,34,90],npcSpots:{finch:[-4.3,.8],page:[-4.8,-25.1]}};i.userData.zone=e;let t=(O,z,W,G=1.6)=>e.interactables.push({id:O,x:z,z:W,radius:G}),n=T0();n.wrapS=n.wrapT=dn;let s=new Nt({map:n}),r=E0();r.wrapS=r.wrapT=dn,r.repeat.set(2,.7);let a=new Nt({map:r}),o=w0();o.wrapS=o.wrapT=dn,o.repeat.set(4,3);let c=new Q(new vt(14.4,10.4),new Nt({map:o}));c.rotation.x=-Math.PI/2,c.position.set(0,0,-1),c.receiveShadow=!0,i.add(c);let l=A0();l.wrapS=l.wrapT=dn,l.repeat.set(1.4,3.4);let h=new Q(new vt(4.2,10.4),new Nt({map:l}));h.rotation.x=-Math.PI/2,h.position.set(0,.001,-11),h.receiveShadow=!0,i.add(h);let u=R0();u.wrapS=u.wrapT=dn,u.repeat.set(5,4);let f=new Q(new vt(16.4,12.4),new Nt({map:u}));f.rotation.x=-Math.PI/2,f.position.set(0,.001,-22),f.receiveShadow=!0,i.add(f);let p=new Q(new Nn(2.6,32),Ue(10370898));p.rotation.x=-Math.PI/2,p.position.set(.5,.02,-21.5),p.receiveShadow=!0,i.add(p);let g=new Q(new lr(2.35,2.6,32),Ue(13215850));g.rotation.x=-Math.PI/2,g.position.set(.5,.022,-21.5),i.add(g),on(i,-7,4,-1,4,2.2,a),on(i,1,4,7,4,2.2,a),on(i,-7,-6,-7,4,2.2,s),on(i,7,-6,7,4,2.2,s),on(i,-7,-6,-1.8,-6,2.2,s),on(i,1.8,-6,7,-6,2.2,s),on(i,-1.8,-16,-1.8,-6,2.2,s),on(i,1.8,-16,1.8,-6,2.2,s),on(i,-8,-16,-1.8,-16,2.2,s),on(i,1.8,-16,8,-16,2.2,s),on(i,-8,-28,-8,-16,2.2,s),on(i,8,-28,8,-16,2.2,s),on(i,-8,-28,8,-28,2.2,s),Lt(i,1.9,2.1,.14,5125408,0,1.05,4.05);let x=new Q(new Ht(.95,.95,.14,20,1,!1,0,Math.PI),Ue(5125408));x.rotation.set(Math.PI/2,0,0),x.position.set(0,2.1,4.05),i.add(x);let m=Is(.3);m.position.set(0,2.1,4.16),i.add(m),Ft(i,e,16765286,1.3,0,2.1,4.3,{opacity:.35,amp:.12});for(let O of[-3.4,-.6,2.2]){let z=new Q(new vt(1.5,1.4),ln(16771512,.95));z.position.set(6.82,1.5,O),z.rotation.y=-Math.PI/2,i.add(z);for(let W of[-.5,0,.5]){let G=new Q(new yt(.05,1.4,.06),Ue(15721416));G.position.set(6.78,1.5,O+W),i.add(G)}Ft(i,e,16767114,2.2,6.2,1.5,O,{opacity:.28,amp:.08,speed:1.4}),gc(i,5.4,1.4,O,{radius:1.1,height:4.4,tilt:-.9,opacity:.09})}for(let O of[-8.5,-11.5,-14.5]){let z=new Q(new vt(1.1,1.2),ln(16771512,.9));z.position.set(1.68,1.5,O),z.rotation.y=-Math.PI/2,i.add(z),Ft(i,e,16767114,1.7,1.2,1.5,O,{opacity:.24,amp:.08,speed:1.6}),gc(i,-.2,1.4,O,{radius:.9,height:4,tilt:-1.1,opacity:.08})}Lt(i,.12,1.5,2.4,7031338,6.85,1.6,.2),Lt(i,.05,1.2,2.1,13215850,6.76,1.6,.2);for(let[O,z]of[[-.5,.08],[.2,-.05],[.9,.06]]){let W=new Q(new vt(.34,.42),new Nt({map:I0()}));W.position.set(6.72,1.62,O),W.rotation.y=-Math.PI/2+z,i.add(W)}t("board",5.9,.2,1.7),Lt(i,.9,.65,.6,5925490,-5.6,.42,-.6,{collider:!0}),Lt(i,.9,.08,.6,4016720,-5.6,.8,-.6);let d=new Q(new Ht(.035,.035,1.5,6),Ue(9067050));d.position.set(-5,.75,-1.3),d.rotation.z=.35,d.castShadow=!0,i.add(d);let E=new Q(new yt(.2,2.6,2.6),a);E.position.set(-6.9,1.3,-2.2),i.add(E),Lt(i,.18,2.1,1.7,3104051,-6.88,1.05,-2.2);let T=Is(.38);T.position.set(-6.76,1.3,-2.2),T.rotation.y=Math.PI/2,i.add(T);let S=Iu();for(let O=0;O<14;O+=1){let z=br(S,.4+Math.random()*.25);z.position.set(-6.72+Math.random()*.1,.5+Math.random()*1.8,-2.2+(Math.random()-.5)*1.9),z.rotation.y=Math.PI/2+(Math.random()-.5)*.4,i.add(z)}let A=new gi(16106818,7,5.5);A.position.set(-6.1,1.5,-2.2),i.add(A),Ft(i,e,16765286,1.7,-6.5,1.35,-2.2,{opacity:.4,amp:.15}),t("ivyDoor",-5.9,-2.2,1.7),Cu(i,-6.2,3.1,mc()),Cu(i,6.2,-5.2,mc()),Lt(i,1.6,.42,.55,8018484,4.6,.21,-3.2,{collider:!0});for(let O of[-7.2,-9.2,-11.2,-13.2,-15]){Lt(i,.45,1.9,1.7,2897248,-1.55,.95,O,{collider:!0});let z=new Q(new yt(.03,.4,1.1),Ue(1909829));z.position.set(-1.31,1.25,O),i.add(z);let W=new Q(new St(.035,8,6),Ue(16106818));W.position.set(-1.29,1,O-.55),i.add(W)}let w=new Q(new vt(1.3,1.5),ln(4020864,.55));w.position.set(1.7,1.5,-8.5),w.rotation.y=-Math.PI/2,i.add(w);let P=Is(.34);P.position.set(1.62,1.5,-8.5),P.rotation.y=-Math.PI/2,i.add(P);let N=new gi(16106818,6,5);N.position.set(1,1.5,-8.5),i.add(N),Ft(i,e,16765286,1.5,1.35,1.5,-8.5,{opacity:.4,amp:.14}),t("signTree",.9,-8.5,1.4),Lt(i,1.1,.7,.55,8014378,-.9,.45,-12.5,{collider:!0}),Lt(i,1,.3,.45,12597547,-.9,.95,-12.5),Lt(i,.16,.24,.3,4091056,-1.1,1.25,-12.5),t("pieceTrolley",-.6,-11.9,1.5),Ps(i,-3.2,-27.55,4.4,.7,"s"),Ps(i,3.2,-27.55,4.4,.7,"s"),Ps(i,-7.55,-21.5,.7,7.4,"e"),Ps(i,7.55,-21.5,.7,7.4,"w"),Ps(i,2.9,-19.6,2.6,.8,"ns"),Ps(i,-3.4,-23.4,2.6,.8,"ns");let M=new Q(new vt(.3,.38),ln(16774064));M.position.set(7.12,1.25,-22.5),M.rotation.y=-Math.PI/2,i.add(M),e.glint=M,Ft(i,e,16774064,.9,7,1.25,-22.5,{opacity:.5,amp:.25,speed:3}),t("pieceShelf",6.6,-22.5,1.6),Lt(i,3.2,.5,1.5,7031338,.5,.5,-21.5,{collider:!0});let v=new Q(new yt(.5,.05,.36),Ue(15920608));v.position.set(.2,.79,-21.4),v.rotation.y=.3,i.add(v);for(let[O,z]of[[-.8,-20.4],[1.8,-20.4],[-.8,-22.6],[1.8,-22.6]])Lt(i,.4,.45,.4,9067060,O,.22,z);for(let[O,z]of[[-.9,-22.2],[1.9,-20.8]]){let W=new Q(new Ht(.05,.07,.24,8),Ue(9067050));W.position.set(O,.62,z),i.add(W);let G=new Q(new Fn(.18,.16,10),ln(16767114));G.position.set(O,.8,z),i.add(G);let te=new gi(16761706,3.5,3.5);te.position.set(O,.85,z),i.add(te),Ft(i,e,16761706,.8,O,.85,z,{opacity:.3,amp:.06,speed:1.2})}t("clueTable",.5,-21.5,2.1),Lt(i,1.9,.75,.9,6111014,-5.5,.375,-26.4,{collider:!0});let C=new Q(new St(.22,14,12),Ue(4091056));C.position.set(-6,.98,-26.3),C.castShadow=!0,i.add(C);let B=new Q(new Ht(.06,.1,.18,8),Ue(9067050));return B.position.set(-6,.84,-26.3),i.add(B),t("page",-4.8,-25.1,1.9),t("finch",-4.3,.8,1.9),e.update=(O,z)=>{Du(e,z),e.glint&&(e.glint.material.opacity=.55+.45*Math.sin(z*3.2)),T.scale.setScalar(1+.04*Math.sin(z*2.4))},e}function Nu(i){let e={name:"woods",spawn:[0,25],bounds:{minX:-5.2,maxX:5.2,minZ:-17.4,maxZ:26.4},colliders:[],interactables:[],hemi:[13625544,2375711,1],sun:{color:16767370,intensity:1.75,pos:[-7,16,-4]},background:1848612,fog:[1848612,22,75],npcSpots:{}};i.userData.zone=e;let t=(D,Y,J,ce=1.6)=>e.interactables.push({id:D,x:Y,z:J,radius:ce}),n=C0();n.wrapS=n.wrapT=dn,n.repeat.set(10,13);let s=new Q(new vt(44,60),new Nt({map:n}));s.rotation.x=-Math.PI/2,s.position.set(0,0,4),s.receiveShadow=!0,i.add(s);let r=P0();r.wrapS=r.wrapT=dn,r.repeat.set(1,7);let a=new Q(new vt(5.6,46),new Nt({map:r,transparent:!0}));a.rotation.x=-Math.PI/2,a.position.set(0,.005,4),a.receiveShadow=!0,i.add(a);let o=mc(),c=Iu();for(let D=0;D<46;D+=1){let J=(Math.random()>.5?1:-1)*(2.6+Math.random()*2.4),ce=26-Math.random()*43,we=br(o,.42+Math.random()*.3);we.position.set(J,.18,ce),we.rotation.y=Math.random()*Math.PI,i.add(we)}for(let[D,Y]of[[2,-7.4],[2.6,-7],[1.7,-6.8]]){let J=new Q(new Ht(.05,.07,.14,8),Ue(15920608));J.position.set(D,.07,Y),i.add(J);let ce=new Q(new St(.11,10,8,0,Math.PI*2,0,Math.PI/2),Ue(12597547));ce.position.set(D,.13,Y),i.add(ce)}let l=(D,Y,J=1,ce=!0)=>{let we=new Zt,qe=new Q(new Ht(.2*J,.36*J,2.4*J,8),Ue(6112038));qe.position.y=1.2*J,qe.castShadow=!0,we.add(qe);let nt=[3042100,3833150,4886856];for(let[$e,Z,K]of[[2.5,1.2,nt[0]],[3.3,.95,nt[1]],[3.95,.62,nt[2]]]){let fe=new Q(new St(Z*J,10,9),Ue(K));fe.position.set((Math.random()-.5)*.5*J,$e*J,(Math.random()-.5)*.5*J),fe.castShadow=!0,we.add(fe)}return we.position.set(D,0,Y),i.add(we),ce&&Sr(i,D,Y,.8*J,.8*J),we};for(let[D,Y,J]of[[-4.4,22,1.2],[4.6,18.5,1.1],[-4.7,14,1.3],[4.5,9.5,1.2],[-4.3,5.5,1.1],[4.8,3.2,1.25],[-4.6,-2.5,1.2],[5,-6.5,1.1],[-4.5,-10.5,1.2],[4.5,-13.5,1.15],[-10,20,1.8],[9.5,12,2],[-9.5,2,1.9],[10,-4,2.2],[-10.5,-12,2],[8.5,-16,1.8]])l(D,Y,J,Math.abs(D)<6);let h=new Q(new vt(44,2.6),ln(5214152,.9));h.rotation.x=-Math.PI/2,h.position.set(0,.03,0),i.add(h);for(let[D,Y]of[[0,1.28],[0,-1.28]]){let J=new Q(new vt(44,.1),ln(14676223,.5));J.rotation.x=-Math.PI/2,J.position.set(D,.045,Y),i.add(J)}let u=[];for(let D=0;D<10;D+=1){let Y=new Q(new vt(.24,.05),ln(12575743,.85));Y.rotation.x=-Math.PI/2,Y.position.set(-7+D*1.5,.06,(D%3-1)*.6),i.add(Y),u.push(Y)}let f={minX:-5.4,maxX:5.4,minZ:-1.3,maxZ:1.3};e.colliders.push(f),e.streamCollider=f;let p=[8,2,6,4];e.stones=[],p.forEach((D,Y)=>{let J=-2.4+Y*1.6,ce=new Q(new Ht(.62,.7,.3,10),Ue(10130314));ce.position.set(J,.15,0),ce.castShadow=!0,ce.receiveShadow=!0,i.add(ce);let we=new Q(new Nn(.5,10),Ue(5082949));we.rotation.x=-Math.PI/2,we.position.set(J,.301,0),i.add(we);let qe=D0(String(D));qe.position.set(J,1.05,0),i.add(qe),e.stones.push({number:D,x:J,mesh:ce,label:qe}),t(`stone${D}`,J,0,1.9)});let g=new Nt({map:Pu()}),x=new Q(new yt(.9,1.5,.4),g);x.position.set(3.1,.75,-8.2),x.castShadow=!0,i.add(x),Sr(i,3.1,-8.2,.9,.4);let m=Is(.34);m.position.set(3.1,1,-7.97),i.add(m);for(let D=0;D<7;D+=1){let Y=br(c,.3);Y.position.set(3.1+(Math.random()-.5)*.8,.35+Math.random()*1.1,-8+(Math.random()-.5)*.15),i.add(Y)}Ft(i,e,16765286,.9,3.1,1,-7.9,{opacity:.3,amp:.12}),t("marker",2.4,-8,1.6),l(4.1,-5.4,1.6,!1);let d=new Q(new vt(.3,.4),ln(16774064));d.position.set(3.55,1.4,-5.1),d.rotation.y=-.5,i.add(d),e.glint=d,Ft(i,e,16774064,.8,3.55,1.4,-5,{opacity:.45,amp:.22,speed:3}),t("clueOak",3.3,-5.4,1.5);let E=new Nt({map:Pu()});for(let D of[-1.7,1.7]){let Y=new Q(new yt(.7,3.2,.7),E);Y.position.set(D,1.6,-16),Y.castShadow=!0,i.add(Y),Sr(i,D,-16,.7,.7);for(let J=0;J<5;J+=1){let ce=br(c,.38);ce.position.set(D+(Math.random()-.5)*.55,.5+Math.random()*2.2,-15.62),i.add(ce)}}let T=new Q(new yt(4.1,.6,.8),E);T.position.set(0,3.4,-16),T.castShadow=!0,i.add(T);let S=Lt(i,1.55,2.3,.16,5126942,-.79,1.15,-16),A=Lt(i,1.55,2.3,.16,5126942,.79,1.15,-16);for(let D of[-.55,.55]){let Y=Is(.3);Y.position.set(D,1.5,-15.9),i.add(Y)}let w=new gi(16106818,7,7);w.position.set(0,1.8,-15),i.add(w),Ft(i,e,16765286,3.2,0,1.7,-15.7,{opacity:.35,amp:.12}),e.gateDoors=[S,A];let P={minX:-1.7,maxX:1.7,minZ:-16.5,maxZ:-15.5};e.colliders.push(P),e.gateCollider=P,t("gate",0,-14.5,1.8);for(let[D,Y,J]of[[-2.5,12,.22],[2.2,5,-.18],[-1.8,-6,.15]])gc(i,D,4.6,Y,{radius:.85,height:9,tilt:J,opacity:.055});Ft.texture||Ft(i,e,0,.01,0,-50,0,{opacity:0});let N=60,M=new Float32Array(N*3);for(let D=0;D<N;D+=1)M[D*3]=(Math.random()-.5)*9,M[D*3+1]=.4+Math.random()*4.5,M[D*3+2]=24-Math.random()*40;let v=new Tt;v.setAttribute("position",new Pt(M,3));let C=new Ui({color:16771248,size:.09,transparent:!0,opacity:.5,map:Ft.texture,depthWrite:!1,blending:_i}),B=new _s(v,C);i.add(B);let O=40,z=new Float32Array(O*3);for(let D=0;D<O;D+=1)z[D*3]=(Math.random()-.5)*11,z[D*3+1]=.6+Math.random()*2.6,z[D*3+2]=24-Math.random()*40;let W=new Tt;W.setAttribute("position",new Pt(z,3));let G=new Ui({color:16769162,size:.3,transparent:!0,opacity:.9,map:Ft.texture,depthWrite:!1,blending:_i}),te=new _s(W,G);return i.add(te),e.update=(D,Y)=>{Du(e,Y),e.glint&&(e.glint.material.opacity=.55+.45*Math.sin(Y*3)),te.rotation.y=Y*.04,G.opacity=.6+.3*Math.sin(Y*2.1),B.rotation.y=-Y*.015;for(let J=0;J<u.length;J+=1)u[J].position.y=.06+.03*Math.sin(Y*2+J)},e}var Tr={finch:{name:{pt:"Sr. Finch",en:"Mr Finch",es:"Sr. Finch"},emoji:"\u{1F9F9}",color:8016432},page:{name:{pt:"Sra. Page",en:"Ms Page",es:"Sra. Page"},emoji:"\u{1F4DA}",color:9063022}},Fu=[{image:"assets/panel-gate.jpg",text:{pt:"Segundo dia de aula. Ivy e Oakley cruzam os port\xF5es da escola \u2014 e desta vez as corujas v\xEAm junto!",en:"Second day of school. Ivy and Oakley walk through the school gates \u2014 and this time the owls come too!",es:"Segundo d\xEDa de clase. \xA1Ivy y Oakley cruzan las puertas de la escuela y esta vez los b\xFAhos vienen tambi\xE9n!"}},{image:"assets/panel-sign.jpg",text:{pt:"De repente, Pip e Marlow se empoleiram e piaram: na placa de vidro, uma \xE1rvore dourada est\xE1 brilhando.",en:"Suddenly, Pip and Marlow perch and hoot: on the glass sign, a golden tree is glowing.",es:"De repente, Pip y Marlow se posan y graznan: en el letrero de vidrio, un \xE1rbol dorado brilla."}},{image:"assets/panel-street.jpg",text:{pt:"Depois da aula, na rua de Welling, a mesma \xE1rvore dourada aparece na vitrine de uma loja antiga\u2026",en:"After school, on the Welling high street, the same golden tree appears in an old shop window\u2026",es:"Despu\xE9s de clase, en la calle de Welling, el mismo \xE1rbol dorado aparece en el escaparate de una tienda antigua\u2026"}},{image:"assets/panel-pillar.jpg",text:{pt:"Marlow pousa no pilar do port\xE3o e puxa um pergaminho enrolado. \xC9 o come\xE7o de um mapa!",en:"Marlow lands on the gate pillar and tugs a rolled parchment. It is the start of a map!",es:"Marlow se posa en el pilar del port\xF3n y tira de un pergamino enrollado. \xA1Es el comienzo de un mapa!"}},{image:"assets/panel-woods.jpg",text:{pt:"As corujas voam na frente, at\xE9 a mata de Oxleas. Entre as \xE1rvores, um caminho escondido espera\u2026",en:"The owls fly ahead, all the way to Oxleas Woods. Among the trees, a hidden path waits\u2026",es:"Los b\xFAhos vuelan adelante, hasta el bosque de Oxleas. Entre los \xE1rboles, un sendero escondido espera\u2026"}}],Fo={finch:[{who:"finch",text:{pt:"Bom dia! Sou o Sr. Finch, o zelador. Esta escola \xE9 muito peculiar, sabem?",en:"Morning! I'm Mr Finch, the caretaker. This school is quite peculiar, you know?",es:"\xA1Buenos d\xEDas! Soy el Sr. Finch, el conserje. Esta escuela es muy peculiar, \xBFsaben?"}},{gloss:"peculiar"},{choice:{challengeId:"vocabFinch",prompt:{pt:'"Peculiar" quer dizer\u2026',en:'"Peculiar" means\u2026',es:'"Peculiar" significa\u2026'},options:[{id:"loud",label:{pt:"barulhenta",en:"loud",es:"ruidosa"}},{id:"strange",label:{pt:"diferente, esquisita",en:"strange, unusual",es:"extra\xF1a, rara"},correct:!0},{id:"tall",label:{pt:"muito alta",en:"very tall",es:"muy alta"}}],success:{pt:"Isso! T\xE3o peculiar que, varrendo o sal\xE3o, achei isto enrolado num cantinho: uma parte de um mapa antigo!",en:"Right! So peculiar that, sweeping the hall, I found this tucked in a corner: a piece of an old map!",es:"\xA1Eso! Tan peculiar que, barriendo el sal\xF3n, encontr\xE9 esto en un rinc\xF3n: \xA1una parte de un mapa antiguo!"},fail:{pt:"Quase! Peculiar \xE9 coisa esquisita, diferente. Pense de novo\u2026",en:"Almost! Peculiar means strange, unusual. Think again\u2026",es:"\xA1Casi! Peculiar es algo extra\xF1o, raro. Piensen otra vez\u2026"}}}],finchAfter:[{who:"finch",text:{pt:"J\xE1 acharam muitas coisas por aqui? Os livros guardam segredos \u2014 \xE9 s\xF3 procurar bem!",en:"Found lots of things around here yet? Books keep secrets \u2014 just look carefully!",es:"\xBFYa encontraron muchas cosas por aqu\xED? \xA1Los libros guardan secretos, solo miren bien!"}}],page:[{who:"page",text:{pt:"Bem-vindos \xE0 biblioteca! A Sra. Page, \xE0 disposi\xE7\xE3o. Ontem algu\xE9m devolveu um livro velho\u2026 com isto dentro.",en:"Welcome to the library! Ms Page, at your service. Yesterday someone returned an old book\u2026 with this inside.",es:"Bienvenidos a la biblioteca. La Sra. Page, a su servicio. Ayer alguien devolvi\xF3 un libro viejo\u2026 con esto adentro."}},{who:"page",text:{pt:'Havia uma carta junto. Escutem com aten\xE7\xE3o: "Sa\xED antes do \xFAltimo sinal porque ouvi asas sobre o p\xE1tio\u2026"',en:'There was a letter with it. Listen carefully: "I left before the final bell because I heard wings above the courtyard\u2026"',es:'Hab\xEDa una carta junto. Escuchen con atenci\xF3n: "Sal\xED antes de la \xFAltima campana porque o\xED alas sobre el patio\u2026"'}},{choice:{challengeId:"compPage",prompt:{pt:"Onde a pessoa ouviu asas?",en:"Where did the person hear wings?",es:"\xBFD\xF3nde oy\xF3 alas la persona?"},options:[{id:"courtyard",label:{pt:"no p\xE1tio",en:"in the courtyard",es:"en el patio"},correct:!0},{id:"library",label:{pt:"na biblioteca",en:"in the library",es:"en la biblioteca"}},{id:"busstop",label:{pt:"no ponto de \xF4nibus",en:"at the bus stop",es:"en la parada del autob\xFAs"}}],success:{pt:"Exato \u2014 a carta responde sozinha quando lemos com calma. Fique com esta parte do mapa. Volto ao p\xE1tio\u2026 digo, ao trabalho!",en:"Exactly \u2014 the letter answers itself when we read calmly. Take this map piece. Back to the courtyard\u2026 I mean, to work!",es:"Exacto: la carta responde sola cuando leemos con calma. Quedense con esta parte del mapa. \xA1Al patio\u2026 digo, al trabajo!"},fail:{pt:'Releiam a frase da carta: "ouvi asas sobre\u2026" Qual era o lugar?',en:`Read the letter's sentence again: "I heard wings above\u2026" Which place was it?`,es:'Relean la frase de la carta: "o\xED alas sobre\u2026" \xBFCu\xE1l era el lugar?'}}}],pageAfter:[{who:"page",text:{pt:"Esta biblioteca \xE9 antiga. Dizem que tem passagem concealed\u2026 quer dizer, escondida. Quem procura, acha!",en:"This library is old. They say it has a concealed passage\u2026 that is, a hidden one. Seek and you shall find!",es:"Esta biblioteca es antigua. Dicen que tiene un pasaje concealed\u2026 o sea, escondido. \xA1Quien busca, encuentra!"}},{gloss:"concealed"}],assemble:[{choice:{challengeId:"fractionMap",prompt:{pt:"As 4 partes juntas fazem 1 mapa inteiro. Uma parte sozinha \xE9 que fra\xE7\xE3o do mapa?",en:"The 4 pieces together make 1 whole map. One piece alone is what fraction of the map?",es:"Las 4 partes juntas hacen 1 mapa entero. Una parte sola es qu\xE9 fracci\xF3n del mapa?"},options:[{id:"half",label:{pt:"1/2 (metade)",en:"1/2 (a half)",es:"1/2 (la mitad)"}},{id:"third",label:{pt:"1/3 (um ter\xE7o)",en:"1/3 (a third)",es:"1/3 (un tercio)"}},{id:"quarter",label:{pt:"1/4 (um quarto)",en:"1/4 (a quarter)",es:"1/4 (un cuarto)"},correct:!0}],success:{pt:"Um quarto de 4 partes! As bordas se encaixam\u2026 e o mapa inteiro brilha: uma trilha at\xE9 os bosques de Oxleas!",en:"A quarter, of four pieces! The edges fit\u2026 and the whole map glows: a trail into Oxleas Woods!",es:"\xA1Un cuarto, de 4 partes! \xA1Los bordes encajan\u2026 y el mapa entero brilla: un sendero hacia el bosque de Oxleas!"},fail:{pt:"Conte as partes: se 4 fazem o inteiro, cada uma vale\u2026?",en:"Count the pieces: if 4 make the whole, each one is worth\u2026?",es:"Cuenta las partes: si 4 hacen el entero, \xBFcada una vale\u2026?"}}}],gate:[{who:"owl",text:{pt:"A \xE1rvore do mapa combina com a \xE1rvore do port\xE3o. Toque no port\xE3o para abrir!",en:"The tree on the map matches the tree on the gate. Tap the gate to open it!",es:"El \xE1rbol del mapa coincide con el \xE1rbol de la puerta. \xA1Toca la puerta para abrirla!"}}]},Oo={board:{pt:'Mural: "Clube de Xadrez quinta-feira" \xB7 "Fotos da excurs\xE3o \xE0 padaria" \xB7 e um rabisco antigo de\u2026 uma \xE1rvore dourada?',en:'Notice board: "Chess Club Thursday" \xB7 "Bakery trip photos" \xB7 and an old doodle of\u2026 a golden tree?',es:'Mural: "Club de Ajedrez el jueves" \xB7 "Fotos del paseo a la panader\xEDa" \xB7 \xBFy un garabato antiguo de\u2026 un \xE1rbol dorado?'},signTree:{pt:"A \xE1rvore dourada no vidro pulsa devagar, como se respirasse. As corujas adoram ela.",en:"The golden tree on the glass pulses slowly, as if breathing. The owls love it.",es:"El \xE1rbol dorado del vidrio late despacio, como si respirara. A los b\xFAhos le encanta."},marker:{pt:'Pedra antiga com a \xE1rvore entalhada. Do outro lado, letras pequenas: "Quem l\xEA o mapa, v\xEA o caminho."',en:'Old stone with the tree carved in. On the back, small letters: "Who reads the map sees the way."',es:'Piedra antigua con el \xE1rbol tallado. Del otro lado, letras peque\xF1as: "Quien lee el mapa ve el camino."'}},Ou={libraryTable:{pt:'P\xE1gina rasgada de um livro de hist\xF3rias: "\u2026e o Castelo de A\xE7\xFAcar dava frutas a quem provava legumes primeiro."',en:'A torn page from a storybook: "\u2026and the Candy Castle gave fruit to anyone who tasted vegetables first."',es:'P\xE1gina rasgada de un cuento: "\u2026y el Castillo de Az\xFAcar daba frutas a quien probaba verduras primero."'},oak:{pt:'P\xE1gina presa no carvalho: "O port\xE3o s\xF3 abre para quem entende o mundo \u2014 nunca para quem tem pressa."',en:'A page stuck on the oak: "The gate only opens for those who understand the world \u2014 never for those in a hurry."',es:'P\xE1gina pegada al roble: "La puerta solo se abre para quien entiende el mundo, nunca para quien tiene prisa."'}},Bu={finch:{pt:"do zelador",en:"from the caretaker",es:"del conserje"},page:{pt:"da bibliotec\xE1ria",en:"from the librarian",es:"de la bibliotecaria"},shelf:{pt:"da estante",en:"from the shelf",es:"del estante"},trolley:{pt:"do carrinho de livros",en:"from the book trolley",es:"del carrito de libros"}},zu={peculiar:{pt:"peculiar = esquisito, diferente das outras",en:"peculiar = strange, unusual",es:"peculiar = extra\xF1o, poco com\xFAn"},concealed:{pt:"concealed = escondido",en:"concealed = hidden",es:"concealed = escondido"}};function ot(i,e,t){let n=document.createElement(i);return e&&(n.className=e),t!==void 0&&(n.textContent=t),n}function zn(i,e,{duration:t=2600}={}){let n=ot("div","rpg-toast",e);i.appendChild(n),requestAnimationFrame(()=>n.classList.add("show")),setTimeout(()=>{n.classList.remove("show"),setTimeout(()=>n.remove(),400)},t)}function Bo(i,e=70,t=1600){let n=["#ffd166","#ff5e7e","#4ecdc4","#7a4ecf","#58cc72","#fff"],s=ot("div","rpg-confetti");for(let r=0;r<e;r+=1){let a=ot("span");a.style.left=`${Math.random()*100}%`,a.style.background=n[r%n.length],a.style.animationDelay=`${Math.random()*.35}s`,a.style.animationDuration=`${.9+Math.random()*.9}s`;let o=7+Math.random()*7;a.style.width=`${o}px`,a.style.height=`${o*.6}px`,s.appendChild(a)}i.appendChild(s),setTimeout(()=>s.remove(),t+800)}function vc(i,{toBlack:e=!0,duration:t=450}={}){let n=ot("div","rpg-fade");return i.appendChild(n),requestAnimationFrame(()=>n.classList.add(e?"on":"off")),{cover:()=>new Promise(s=>setTimeout(s,t)),remove:()=>n.remove()}}function ku(i,e,{next:t,skip:n,done:s,onDone:r}){let a=ot("div","rpg-story"),o=ot("img","rpg-story-art"),c=ot("p","rpg-story-text"),l=ot("div","rpg-story-buttons"),h=ot("button","rpg-button ghost",n);h.type="button";let u=ot("button","rpg-button primary",t);u.type="button",l.append(h,u),a.append(o,c,l),i.appendChild(a);let f=0,p=!1;function g(){p||(p=!0,a.remove(),r?.())}function x(){o.src=e[f].image,o.alt="",c.textContent=e[f].text,u.textContent=f===e.length-1?s:t}return u.addEventListener("click",()=>{f>=e.length-1?g():(f+=1,x())}),h.addEventListener("click",g),x(),a}var Rr=new URLSearchParams(location.search),Qt=(Rr.get("name")||"Exploradora").trim().slice(0,32),tt=["pt","en","es"].includes(Rr.get("language"))?Rr.get("language"):"pt",wr=["woods","school"].includes(Rr.get("zone"))?Rr.get("zone"):null,de=wu(localStorage,Qt);wr&&(de={...de,character:de.character||"ivy",zone:wr,flags:{...de.flags,introSeen:!0,mapAssembled:!0}});var mt=i=>document.getElementById(i),Dt=mt("rpg"),U0={finch:{pt:"\u{1F5E3}\uFE0F Falar com o Sr. Finch",en:"\u{1F5E3}\uFE0F Talk to Mr Finch",es:"\u{1F5E3}\uFE0F Hablar con el Sr. Finch"},page:{pt:"\u{1F5E3}\uFE0F Falar com a Sra. Page",en:"\u{1F5E3}\uFE0F Talk to Ms Page",es:"\u{1F5E3}\uFE0F Hablar con la Sra. Page"},board:{pt:"\u{1F50D} Olhar o mural",en:"\u{1F50D} Look at the board",es:"\u{1F50D} Mirar el mural"},signTree:{pt:"\u{1F50D} Olhar a \xE1rvore dourada",en:"\u{1F50D} Look at the golden tree",es:"\u{1F50D} Mirar el \xE1rbol dorado"},pieceShelf:{pt:"\u{1F50D} Procurar na estante",en:"\u{1F50D} Search the shelf",es:"\u{1F50D} Buscar en el estante"},pieceTrolley:{pt:"\u{1F50D} Procurar no carrinho",en:"\u{1F50D} Search the trolley",es:"\u{1F50D} Buscar en el carrito"},clueTable:{pt:"\u{1F50D} Olhar embaixo da mesa",en:"\u{1F50D} Look under the table",es:"\u{1F50D} Mirar bajo la mesa"},clueOak:{pt:"\u{1F50D} Olhar o carvalho",en:"\u{1F50D} Look at the oak",es:"\u{1F50D} Mirar el roble"},ivyDoor:{pt:"\u{1F333} Porta de heras",en:"\u{1F333} Ivy door",es:"\u{1F333} Puerta de hiedra"},marker:{pt:"\u{1F50D} Ler a pedra antiga",en:"\u{1F50D} Read the old stone",es:"\u{1F50D} Leer la piedra antigua"},gate:{pt:"\u{1F6AA} Port\xE3o secreto",en:"\u{1F6AA} Secret gate",es:"\u{1F6AA} Puerta secreta"}},N0={talk:"objTalk",find:"objFind",assemble:"objAssemble",toWoods:"objToWoods",cross:"objCross",gate:"objGate",done:"objDone"},kn,_t,Si,Sc,ke=null,Pe=null,Ar=null,mn=null,zo=null,F0={},Mi=null,_n=0,bc=!1;function O0(){kn=new Ro({antialias:!0}),kn.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),kn.setSize(window.innerWidth,window.innerHeight),kn.shadowMap.enabled=!0,kn.shadowMap.type=Ca,kn.toneMapping=Ba,kn.toneMappingExposure=1.06,Dt.prepend(kn.domElement),Si=new Ut(50,window.innerWidth/window.innerHeight,.1,200),Sc=new fr,window.addEventListener("resize",()=>{Si.aspect=window.innerWidth/window.innerHeight,Si.updateProjectionMatrix(),kn.setSize(window.innerWidth,window.innerHeight)})}function B0(){_t&&(_t.traverse(i=>{i.geometry&&i.geometry.dispose(),i.material?.map&&i.material.map.dispose()}),_t.clear(),_t=null)}function qu(i){B0(),_t=new nr,_t.background=new Oe(2367288),_t.userData.zone={colliders:[]},ke=i==="woods"?Nu(_t):Uu(_t),_t.background=new Oe(ke.background),_t.fog=new tr(ke.fog[0],ke.fog[1],ke.fog[2]);let e=new hr(ke.hemi[0],ke.hemi[1],ke.hemi[2]);_t.add(e);let t=new dr(ke.sun.color,ke.sun.intensity);t.position.set(...ke.sun.pos),t.castShadow=!0,t.shadow.mapSize.set(1024,1024),t.shadow.camera.left=-13,t.shadow.camera.right=13,t.shadow.camera.top=13,t.shadow.camera.bottom=-13,t.shadow.camera.near=1,t.shadow.camera.far=60,t.shadow.bias=-8e-4,t.shadow.normalBias=.02,_t.add(t),_t.add(t.target),_t.userData.sun=t;let n=de.zone===i&&Array.isArray(de.position)?de.position:null;Pe=xc(de.character||"ivy"),No(Pe),Pe.position.set(n?.[0]??ke.spawn[0],0,n?.[1]??ke.spawn[1]),_t.add(Pe);let s=de.character==="oakley"?1:0;Ar=yc(s),_t.add(Ar);let r=de.character==="ivy"?"oakley":"ivy";mn=xc(r),No(mn),mn.position.set(Pe.position.x-.9,0,Pe.position.z+.4),_t.add(mn),zo=yc(r==="oakley"?1:0),mn.add(zo),zo.position.set(.24,1.62,-.08);for(let a of Object.keys(Tr)){let o=ke.npcSpots?.[a];if(!o)continue;let c=Lu(Tr[a].color);No(c,.5),c.position.set(o[0],0,o[1]),c.rotation.y=a==="finch"?Math.PI/2:.95,_t.add(c),F0[a]=c}if(Mi=new Q(new Ni(.66,.055,8,32),new fn({color:16765286,transparent:!0,opacity:.9})),Mi.rotation.x=-Math.PI/2,Mi.visible=!1,_t.add(Mi),Si.position.set(Pe.position.x,7.5,Pe.position.z+8.5),Si.lookAt(Pe.position.x,.6,Pe.position.z),i==="woods"){if(de.flags.stonesCrossed){let a=ke.colliders.indexOf(ke.streamCollider);a>=0&&ke.colliders.splice(a,1)}if(de.flags.gateOpen&&ke.gateCollider){let a=ke.colliders.indexOf(ke.gateCollider);a>=0&&ke.colliders.splice(a,1);let[o,c]=ke.gateDoors;o.rotation.y=-1.9,o.position.x=-1.69,c.rotation.y=1.9,c.position.x=1.69}}}var Hn=new Set;window.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&Go?.(),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(i.key)&&i.preventDefault(),Hn.add(i.key.toLowerCase()),i.key.toLowerCase()==="e"&&ed()});window.addEventListener("keyup",i=>Hn.delete(i.key.toLowerCase()));var gn={active:!1,x:0,y:0,id:null},Ls=mt("joy"),z0=mt("joyKnob");function Yu(i,e){z0.style.transform=`translate(${i}px, ${e}px)`}Ls.addEventListener("pointerdown",i=>{gn.active=!0,gn.id=i.pointerId,Ls.setPointerCapture(i.pointerId)});Ls.addEventListener("pointermove",i=>{if(!gn.active||i.pointerId!==gn.id)return;let e=Ls.getBoundingClientRect(),t=e.left+e.width/2,n=e.top+e.height/2,s=i.clientX-t,r=i.clientY-n,a=e.width/2,o=Math.hypot(s,r);o>a&&(s=s/o*a,r=r/o*a),Yu(s,r),gn.x=s/a,gn.y=r/a});function Zu(i){i.pointerId===gn.id&&(gn.active=!1,gn.x=0,gn.y=0,Yu(0,0))}Ls.addEventListener("pointerup",Zu);Ls.addEventListener("pointercancel",Zu);function k0(){let i=gn.x,e=gn.y;(Hn.has("w")||Hn.has("arrowup"))&&(e-=1),(Hn.has("s")||Hn.has("arrowdown"))&&(e+=1),(Hn.has("a")||Hn.has("arrowleft"))&&(i-=1),(Hn.has("d")||Hn.has("arrowright"))&&(i+=1);let t=Math.hypot(i,e);return t>1&&(i/=t,e/=t),[i,e]}var Hu=.35;function Vu(i,e,t){let n=Math.max(t.minX,Math.min(i,t.maxX)),s=Math.max(t.minZ,Math.min(e,t.maxZ)),r=i-n,a=e-s;return r*r+a*a<Hu*Hu}function H0(i,e,t,n){let s=i+t;ke.colliders.some(a=>Vu(s,e,a))&&(s=i);let r=e+n;return ke.colliders.some(a=>Vu(s,r,a))&&(r=e),s=Math.max(ke.bounds.minX,Math.min(s,ke.bounds.maxX)),r=Math.max(ke.bounds.minZ,Math.min(r,ke.bounds.maxZ)),[s,r]}var Go=null,Cr=mt("dialog"),$u=mt("dialogName"),Ec=mt("dialogText"),ko=mt("dialogVoice"),Ho=mt("dialogButtons");function V0(){Cr.classList.contains("hidden")&&(Cr.classList.remove("hidden"),_n+=1,Xo())}function Ju(){Cr.classList.contains("hidden")||(Cr.classList.add("hidden"),_n=Math.max(0,_n-1))}var Wo=null,Tc=!1;mt("dialogClose").addEventListener("click",()=>{if(Cr.classList.contains("hidden"))return;Et.tap(),Tc=!0;let i=Wo;Ju(),i?.()});function Ku(i){if(!de.sound||!i||!window.speechSynthesis)return;let e=window.speechSynthesis;e.cancel();let t=new SpeechSynthesisUtterance(i);t.lang="en-GB",t.rate=.92;let n=e.getVoices(),s=n.find(r=>r.lang.replace("_","-")==="en-GB")||n.find(r=>r.lang.startsWith("en"));s&&(t.voice=s),e.speak(t)}function G0(i){return i==="owl"?`\u{1F989} ${Lo.find(e=>e.id===(de.character||"ivy"))?.owl||"Pip"}`:`${Tr[i]?.emoji||""} ${An(Tr[i]?.name,tt)}`}function ju(i,e){return new Promise(t=>{Wo=t,$u.textContent=G0(i),Ec.textContent=An(e,tt),ko.classList.remove("hidden"),ko.onclick=()=>Ku(e.en),Ho.replaceChildren();let n=ot("button","rpg-button primary",bt(tt,"continueLabel"));n.type="button",n.addEventListener("click",s=>{s.stopPropagation(),Et.tap(),t()}),Ho.appendChild(n),Go=()=>n.click()})}function W0(i){let e=zu[i];e&&zn(Dt,`\u2728 ${An(e,tt)}`,{duration:3400})}function X0(i){return new Promise(e=>{Wo=()=>e(!1),$u.textContent=`\u{1F3AF} ${An(i.prompt,tt)}`,Ec.textContent="",ko.classList.add("hidden"),ko.onclick=()=>Ku(i.prompt.en);function t(){Ho.replaceChildren();for(let n of i.options){let s=ot("button","rpg-choice",An(n.label,tt));s.type="button",s.addEventListener("click",async()=>{n.correct?(Et.correct(),await ju("owl",i.success),e(!0)):(Et.wrong(),Ec.textContent=An(i.fail,tt),t())}),Ho.appendChild(s)}}t(),Go=null})}async function Wi(i){Tc=!1,V0();for(let e of i)if(e.choice?await X0(e.choice)&&q0(e.choice.challengeId):e.gloss?W0(e.gloss):await ju(e.who,e.text),Tc)break;Ju(),Go=null,Wo=null}function q0(i){!i||de.challenges[i]||(de.challenges[i]=!0,Kt(localStorage,Qt,de))}function Xi(){let i=dc(de);mt("questChip").textContent=`\u{1F4DC} ${bt(tt,N0[i.id],{count:i.progress??0})}`,mt("soundButton").textContent=de.sound?"\u{1F50A}":"\u{1F507}"}function Qu(){let i=mt("journal");if(i.classList.contains("hidden")){let e=mt("journalPieces");e.replaceChildren();for(let t of Cs){let n=de.mapPieces.includes(t);e.appendChild(ot("li",void 0,`${n?"\u2705":"\u2B1C"} ${An(Bu[t],tt)}`))}mt("journalObjective").textContent=mt("questChip").textContent,i.classList.remove("hidden")}else i.classList.add("hidden")}mt("questChip").addEventListener("click",Qu);mt("journalClose").addEventListener("click",Qu);mt("homeButton").addEventListener("click",()=>{location.href="../index.html"});mt("soundButton").addEventListener("click",()=>{de.sound=!de.sound,hc(!de.sound),Kt(localStorage,Qt,de),Xi(),Et.tap()});mt("hintButton").addEventListener("click",()=>{Et.hoot(),zn(Dt,bt(tt,Ru(de)),{duration:4600})});var Vo=mt("prompt"),Vn=null;function Xo(){Vo.classList.add("hidden")}function Y0(i){Vo.textContent=i,Vo.classList.remove("hidden")}Vo.addEventListener("click",()=>ed());function ed(){Vn&&_n===0&&td(Vn.id)}async function Mc(i){if(de.mapPieces.includes(i)){zn(Dt,bt(tt,"toastAlready"));return}de.mapPieces.push(i),Kt(localStorage,Qt,de),Et.pickup(),Bo(Dt,40),zn(Dt,bt(tt,"toastPiece",{count:vi(de)})),Do(de)&&setTimeout(()=>{Et.magic(),zn(Dt,`\u{1F333} ${bt(tt,"objAssemble")}`,{duration:3600})},500),Xi()}async function Gu(i){if(de.clues.includes(i)){zn(Dt,bt(tt,"toastAlready"));return}de.clues.push(i),Kt(localStorage,Qt,de),Et.pickup(),zn(Dt,bt(tt,"toastClue")),await Wi([{who:"owl",text:Ou[i]}])}async function Wu(i){_n+=1,Xo();let e=vc(Dt);await e.cover(),Et.door(),qu(i),de.zone=i,de.position=null,Kt(localStorage,Qt,de),e.remove(),Xi(),_n-=1}async function Z0(){de.flags.gateOpen=!0,Kt(localStorage,Qt,de);let i=ke.colliders.indexOf(ke.gateCollider);i>=0&&ke.colliders.splice(i,1),Et.door(),Et.magic();let[e,t]=ke.gateDoors,n=performance.now();function s(r){let a=Math.min(1,(r-n)/900);e.rotation.y=-a*1.9,t.rotation.y=a*1.9,e.position.x=-.79-a*.9,t.position.x=.79+a*.9,a<1&&requestAnimationFrame(s)}requestAnimationFrame(s),Xi()}function $0(){if(bc)return;bc=!0,_n+=1,Xo(),Et.fanfare();let i=ot("div","rpg-ending");i.append(ot("div","rpg-ending-castle","\u{1F3F0}"),ot("h2","rpg-ending-title",bt(tt,"theEnd")),ot("p","rpg-ending-text",bt(tt,"endCard")),ot("div","rpg-ending-badge",bt(tt,"badgeEarned")));let e=ot("button","rpg-button primary",bt(tt,"playAgain"));e.type="button",e.addEventListener("click",()=>{location.href="../index.html"}),i.appendChild(e),Dt.appendChild(i),Bo(Dt,120,2400)}async function td(i){if(i==="finch"||i==="page"){let e=i==="finch"?"vocabFinch":"compPage",t=!de.challenges[e];if(await Wi(t?Fo[i]:Fo[`${i}After`]),t){let n=i==="finch"?"finch":"page";de.flags[`${i}Met`]=!0,await Mc(n),Kt(localStorage,Qt,de),Xi()}return}if(i==="board")return void Wi([{who:"owl",text:Oo.board}]);if(i==="signTree")return Et.hoot(),void Wi([{who:"owl",text:Oo.signTree}]);if(i==="marker")return void Wi([{who:"owl",text:Oo.marker}]);if(i==="pieceShelf")return void Mc("shelf");if(i==="pieceTrolley")return void Mc("trolley");if(i==="clueTable")return void Gu("libraryTable");if(i==="clueOak")return void Gu("oak");if(i==="ivyDoor"){if(!Do(de))return Et.hoot(),void Wi([{who:"owl",text:{pt:`Ainda faltam partes do mapa! Temos ${vi(de)} de 4.`,en:`We still need map pieces! We have ${vi(de)} of 4.`,es:`\xA1Todav\xEDa faltan partes del mapa! Tenemos ${vi(de)} de 4.`}}]);if(!de.flags.mapAssembled){await Wi(Fo.assemble),de.challenges.fractionMap&&(de.flags.mapAssembled=!0,Kt(localStorage,Qt,de),Et.magic(),Bo(Dt,80),await Wu("woods"));return}return void Wu("woods")}if(i.startsWith("stone")){let e=Number(i.replace("stone","")),t=ke.stones.find(n=>n.number===e);if(de.flags.stonesCrossed)return;if(Au(e)){Et.magic(),de.flags.stonesCrossed=!0,Kt(localStorage,Qt,de);let n=ke.colliders.indexOf(ke.streamCollider);n>=0&&ke.colliders.splice(n,1);let s=vc(Dt);await s.cover(),Pe.position.z=-2.6,mn.position.z=-2,de.position=[Pe.position.x,Pe.position.z],s.remove(),Xi(),zn(Dt,`\u2728 ${An({pt:"Pedra certa! Atravessaram o riacho.",en:"Right stone! You crossed the stream.",es:"\xA1Piedra correcta! Cruzaron el arroyo."},tt)}`)}else{let r=function(a){let o=(a-n)/600;t.mesh.rotation.x=s+Math.sin(o*14)*.12*Math.max(0,1-o),o<1?requestAnimationFrame(r):t.mesh.rotation.x=s};Et.wrong();let n=performance.now(),s=t.mesh.rotation.x;requestAnimationFrame(r),zn(Dt,bt(tt,"hintCross"),{duration:3200})}return}if(i==="gate"){de.flags.gateOpen||await Z0();return}}function J0(){return new Promise(i=>{let e=ot("div","rpg-select");e.appendChild(ot("h2","rpg-select-title",bt(tt,"chooseCharacter")));let t=ot("div","rpg-select-row");e.appendChild(t);for(let n of Lo){let s=ot("button","rpg-select-card");s.type="button",s.append(ot("div","rpg-select-emoji",n.emoji),ot("div","rpg-select-name",n.id==="ivy"?"Ivy":"Oakley"),ot("p","rpg-select-desc",bt(tt,n.id==="ivy"?"characterIvy":"characterOakley"))),s.addEventListener("click",()=>{Et.tap(),e.remove(),_n-=1,i(n.id)}),t.appendChild(s)}Dt.appendChild(e),_n+=1})}var K0=new L(0,8.6,7.2),Xu=new L;function nd(){requestAnimationFrame(nd);let i=Math.min(.05,Sc.getDelta()),e=Sc.elapsedTime,[t,n]=_n>0?[0,0]:k0(),s=3.8,r=t*s*i,a=n*s*i,o=Math.abs(t)+Math.abs(n)>.05;if(Pe){let[c,l]=H0(Pe.position.x,Pe.position.z,r,a),h=Math.hypot(c-Pe.position.x,l-Pe.position.z);if(Pe.position.set(c,0,l),o&&h>5e-4){let x=Math.atan2(t,n)-Pe.rotation.y;for(;x>Math.PI;)x-=Math.PI*2;for(;x<-Math.PI;)x+=Math.PI*2;Pe.rotation.y+=x*Math.min(1,i*12)}Pe.userData.animate?.(e,o?1:0);let u=e*1.5;Ar.position.set(Pe.position.x+Math.cos(u)*.85,1.85+Math.sin(e*2.2)*.1,Pe.position.z+Math.sin(u)*.85),Ar.rotation.y=-u+Math.PI/2,Ar.userData.animate?.(e,o);let f=mn.position.distanceTo(Pe.position);if(f>1.05){let g=Pe.position.clone().sub(mn.position).normalize(),x=Math.min(f-.95,4.6*i);mn.position.addScaledVector(g,x),mn.rotation.y=Math.atan2(g.x,g.z),mn.userData.animate?.(e,1)}else mn.userData.animate?.(e,0);zo.userData.animate?.(e,f>2),Si.position.lerp(new L().copy(Pe.position).add(K0),1-Math.exp(-i*5)),Xu.set(Pe.position.x,.6,Pe.position.z),Si.lookAt(Xu);let p=_t.userData.sun;p&&(p.position.set(Pe.position.x+ke.sun.pos[0]*.5,ke.sun.pos[1]*.75,Pe.position.z+ke.sun.pos[2]*.5),p.target.position.set(Pe.position.x,0,Pe.position.z))}if(Vn=null,_n===0&&Pe){let c=1/0;for(let l of ke.interactables){if(l.id.startsWith("stone")&&de.flags.stonesCrossed)continue;let h=Math.hypot(l.x-Pe.position.x,l.z-Pe.position.z);h<=l.radius&&h<c&&(c=h,Vn=l)}}if(Vn){let l={...U0}[Vn.id];if(Vn.id.startsWith("stone")){let h=Number(Vn.id.replace("stone",""));l={pt:`\u{1FAA8} Pisar na pedra ${h}`,en:`\u{1FAA8} Step on stone ${h}`,es:`\u{1FAA8} Pisar la piedra ${h}`}}Y0(An(l,tt)),Mi.visible=!0,Mi.position.set(Vn.x,.06,Vn.z),Mi.scale.setScalar(1+.08*Math.sin(e*4))}else Xo(),Mi.visible=!1;ke?.update?.(i,e),ke?.name==="woods"&&de.flags.gateOpen&&!bc&&Pe.position.z<-16.6&&$0(),kn.render(_t,Si)}async function j0(){try{O0()}catch{mt("fatal").textContent=bt(tt,"webglFail"),mt("fatal").classList.add("show");return}hc(!de.sound),Rs(),window.addEventListener("pointerdown",()=>Rs(),{once:!0}),Xi(),de.character||(de.character=await J0()),Kt(localStorage,Qt,de),qu(de.zone),nd(),!de.flags.introSeen&&!wr&&(await new Promise(i=>{ku(Dt,Fu.map(e=>({...e,text:An(e.text,tt)})),{next:bt(tt,"next"),skip:bt(tt,"skip"),done:bt(tt,"start"),onDone:i})}),de.flags.introSeen=!0,Kt(localStorage,Qt,de)),wr||window.setInterval(()=>{Pe&&_n===0&&(de.position=[Pe.position.x,Pe.position.z],Kt(localStorage,Qt,de))},4e3),window.addEventListener("beforeunload",()=>{Pe&&!wr&&(de.position=[Pe.position.x,Pe.position.z],Kt(localStorage,Qt,de))})}window.__rpgWelling={position:()=>Pe?[Pe.position.x,Pe.position.z]:null,setPos:(i,e)=>{Pe&&Pe.position.set(i,0,e)},state:()=>de,interact:i=>td(i)};j0();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
