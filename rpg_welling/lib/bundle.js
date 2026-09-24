(()=>{var rp=0,ch=1,op=2;var uh=1,Dl=2,Mi=3,ei=0,nn=1,yn=2,ii=0,Ds=1,wi=2,hh=3,dh=4,ap=5,os=100,lp=101,cp=102,up=103,hp=104,dp=200,fp=201,pp=202,mp=203,fl=204,pl=205,gp=206,xp=207,yp=208,vp=209,_p=210,bp=211,Mp=212,wp=213,Sp=214,Nl=0,Ol=1,Ul=2,Ns=3,Fl=4,Bl=5,kl=6,Hl=7,ea=0,Ep=1,Tp=2,Yi=0,zl=1,Gl=2,Vl=3,Wr=4,Wl=5,Xl=6,ql=7,eh="attached",Ap="detached",fh=300,js=301,Zs=302,Yl=303,jl=304,ta=306,jt=1e3,pi=1001,Lr=1002,qt=1003,Zl=1004;var Ks=1005;var an=1006,Xr=1007;var si=1008;var ri=1009,ph=1010,mh=1011,qr=1012,Kl=1013,ds=1014,Gn=1015,vn=1016,Jl=1017,Ql=1018,Yr=1020,gh=35902,xh=35899,yh=1021,vh=1022,On=1023,Dr=1026,jr=1027,$l=1028,ec=1029,_h=1030,tc=1031;var nc=1033,na=33776,ia=33777,sa=33778,ra=33779,ic=35840,sc=35841,rc=35842,oc=35843,ac=36196,lc=37492,cc=37496,uc=37808,hc=37809,dc=37810,fc=37811,pc=37812,mc=37813,gc=37814,xc=37815,yc=37816,vc=37817,_c=37818,bc=37819,Mc=37820,wc=37821,Sc=36492,Ec=36494,Tc=36495,Ac=36283,Rc=36284,Cc=36285,Pc=36286,Rp=2200,Cp=2201,Pp=2202,Os=2300,Us=2301,dl=2302,Is=2400,Ls=2401,Ro=2402,Ic=2500,Ip=2501,bh=0,oa=1,Zr=2,Lp=3200,Dp=3201;var aa=0,Np=1,Vn="",Dt="srgb",ln="srgb-linear",Co="linear",pt="srgb";var Ps=7680;var th=519,Op=512,Up=513,Fp=514,Mh=515,Bp=516,kp=517,Hp=518,zp=519,ml=35044;var wh="300 es",Qn=2e3,Po=2001;var gi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},hn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],vf=1234567,To=Math.PI/180,Fs=180/Math.PI;function $n(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(hn[i&255]+hn[i>>8&255]+hn[i>>16&255]+hn[i>>24&255]+"-"+hn[e&255]+hn[e>>8&255]+"-"+hn[e>>16&15|64]+hn[e>>24&255]+"-"+hn[t&63|128]+hn[t>>8&255]+"-"+hn[t>>16&255]+hn[t>>24&255]+hn[n&255]+hn[n>>8&255]+hn[n>>16&255]+hn[n>>24&255]).toLowerCase()}function st(i,e,t){return Math.max(e,Math.min(t,i))}function Sh(i,e){return(i%e+e)%e}function e0(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function t0(i,e,t){return i!==e?(t-i)/(e-i):0}function Ao(i,e,t){return(1-t)*i+t*e}function n0(i,e,t,n){return Ao(i,e,1-Math.exp(-t*n))}function i0(i,e=1){return e-Math.abs(Sh(i,e*2)-e)}function s0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function r0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function o0(i,e){return i+Math.floor(Math.random()*(e-i+1))}function a0(i,e){return i+Math.random()*(e-i)}function l0(i){return i*(.5-Math.random())}function c0(i){i!==void 0&&(vf=i);let e=vf+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function u0(i){return i*To}function h0(i){return i*Fs}function d0(i){return(i&i-1)===0&&i!==0}function f0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function p0(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function m0(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),u=o((e+n)/2),h=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*u,l*h,l*d,a*c);break;case"YZY":i.set(l*d,a*u,l*h,a*c);break;case"ZXZ":i.set(l*h,l*d,a*u,a*c);break;case"XZX":i.set(a*u,l*g,l*f,a*c);break;case"YXY":i.set(l*f,a*u,l*g,a*c);break;case"ZYZ":i.set(l*g,l*f,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Jn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function bt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Kr={DEG2RAD:To,RAD2DEG:Fs,generateUUID:$n,clamp:st,euclideanModulo:Sh,mapLinear:e0,inverseLerp:t0,lerp:Ao,damp:n0,pingpong:i0,smoothstep:s0,smootherstep:r0,randInt:o0,randFloat:a0,randFloatSpread:l0,seededRandom:c0,degToRad:u0,radToDeg:h0,isPowerOfTwo:d0,ceilPowerOfTwo:f0,floorPowerOfTwo:p0,setQuaternionFromProperEuler:m0,normalize:bt,denormalize:Jn},be=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},xn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],u=n[s+2],h=n[s+3],d=r[o+0],f=r[o+1],g=r[o+2],x=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=x;return}if(h!==x||l!==d||c!==f||u!==g){let m=1-a,p=l*d+c*f+u*g+h*x,b=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){let T=Math.sqrt(M),A=Math.atan2(T,p*b);m=Math.sin(m*A)/T,a=Math.sin(a*A)/T}let v=a*b;if(l=l*m+d*v,c=c*m+f*v,u=u*m+g*v,h=h*m+x*v,m===1-a){let T=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=T,c*=T,u*=T,h*=T}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],u=n[s+3],h=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+u*h+l*f-c*d,e[t+1]=l*g+u*d+c*h-a*f,e[t+2]=c*g+u*f+a*d-l*h,e[t+3]=u*g-a*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(s/2),h=a(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"YZX":this._x=d*u*h+c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h-d*f*g;break;case"XZY":this._x=d*u*h-c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+a+h;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>h){let f=2*Math.sqrt(1+n-a-h);this._w=(u-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>h){let f=2*Math.sqrt(1+a-n-h);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+h-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(st(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-s*a,this._w=o*u-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=o*h+this._w*d,this._x=n*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_f.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_f.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),u=2*(a*t-r*s),h=2*(r*n-o*t);return this.x=t+l*c+o*h-a*u,this.y=n+l*u+a*c-r*h,this.z=s+l*h+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Tu.copy(this).projectOnVector(e),this.sub(Tu)}reflect(e){return this.sub(Tu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Tu=new L,_f=new xn,Ke=class i{constructor(e,t,n,s,r,o,a,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],g=n[8],x=s[0],m=s[3],p=s[6],b=s[1],M=s[4],v=s[7],T=s[2],A=s[5],R=s[8];return r[0]=o*x+a*b+l*T,r[3]=o*m+a*M+l*A,r[6]=o*p+a*v+l*R,r[1]=c*x+u*b+h*T,r[4]=c*m+u*M+h*A,r[7]=c*p+u*v+h*R,r[2]=d*x+f*b+g*T,r[5]=d*m+f*M+g*A,r[8]=d*p+f*v+g*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*r*u+n*a*l+s*r*c-s*o*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,d=a*l-u*r,f=c*r-o*l,g=t*h+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=h*x,e[1]=(s*c-u*n)*x,e[2]=(a*n-s*o)*x,e[3]=d*x,e[4]=(u*t-s*l)*x,e[5]=(s*r-a*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Au.makeScale(e,t)),this}rotate(e){return this.premultiply(Au.makeRotation(-e)),this}translate(e,t){return this.premultiply(Au.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Au=new Ke;function Eh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Nr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Gp(){let i=Nr("canvas");return i.style.display="block",i}var bf={};function Or(i){i in bf||(bf[i]=!0,console.warn(i))}function Vp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Mf=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),wf=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function g0(){let i={enabled:!0,workingColorSpace:ln,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===pt&&(s.r=Fi(s.r),s.g=Fi(s.g),s.b=Fi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===pt&&(s.r=Ir(s.r),s.g=Ir(s.g),s.b=Ir(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Vn?Co:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Or("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Or("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ln]:{primaries:e,whitePoint:n,transfer:Co,toXYZ:Mf,fromXYZ:wf,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Dt},outputColorSpaceConfig:{drawingBufferColorSpace:Dt}},[Dt]:{primaries:e,whitePoint:n,transfer:pt,toXYZ:Mf,fromXYZ:wf,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Dt}}}),i}var it=g0();function Fi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ir(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var fr,gl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{fr===void 0&&(fr=Nr("canvas")),fr.width=e.width,fr.height=e.height;let s=fr.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=fr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Nr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Fi(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Fi(t[n]/255)*255):t[n]=Fi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},x0=0,Ur=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:x0++}),this.uuid=$n(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ru(s[o].image)):r.push(Ru(s[o]))}else r=Ru(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Ru(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?gl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var y0=0,Cu=new L,Gt=class i extends gi{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=pi,s=pi,r=an,o=si,a=On,l=ri,c=i.DEFAULT_ANISOTROPY,u=Vn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:y0++}),this.uuid=$n(),this.name="",this.source=new Ur(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new be(0,0),this.repeat=new be(1,1),this.center=new be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Cu).x}get height(){return this.source.getSize(Cu).y}get depth(){return this.source.getSize(Cu).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==fh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case jt:e.x=e.x-Math.floor(e.x);break;case pi:e.x=e.x<0?0:1;break;case Lr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case jt:e.y=e.y-Math.floor(e.y);break;case pi:e.y=e.y<0?0:1;break;case Lr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=fh;Gt.DEFAULT_ANISOTROPY=1;var dt=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(c+1)/2,v=(f+1)/2,T=(p+1)/2,A=(u+d)/4,R=(h+x)/4,I=(g+m)/4;return M>v&&M>T?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=A/n,r=R/n):v>T?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=A/s,r=I/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=R/r,s=I/r),this.set(n,s,r,t),this}let b=Math.sqrt((m-g)*(m-g)+(h-x)*(h-x)+(d-u)*(d-u));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(h-x)/b,this.z=(d-u)/b,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this.w=st(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this.w=st(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},xl=class extends gi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:an,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t);let s={width:e,height:t,depth:n.depth},r=new Gt(s);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:an,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ur(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Zt=class extends xl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Io=class extends Gt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=qt,this.minFilter=qt,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var yl=class extends Gt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=qt,this.minFilter=qt,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Dn=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,jn):jn.fromBufferAttribute(r,o),jn.applyMatrix4(e.matrixWorld),this.expandByPoint(jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ka.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ka.copy(n.boundingBox)),ka.applyMatrix4(e.matrixWorld),this.union(ka)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,jn),jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(mo),Ha.subVectors(this.max,mo),pr.subVectors(e.a,mo),mr.subVectors(e.b,mo),gr.subVectors(e.c,mo),es.subVectors(mr,pr),ts.subVectors(gr,mr),Ts.subVectors(pr,gr);let t=[0,-es.z,es.y,0,-ts.z,ts.y,0,-Ts.z,Ts.y,es.z,0,-es.x,ts.z,0,-ts.x,Ts.z,0,-Ts.x,-es.y,es.x,0,-ts.y,ts.x,0,-Ts.y,Ts.x,0];return!Pu(t,pr,mr,gr,Ha)||(t=[1,0,0,0,1,0,0,0,1],!Pu(t,pr,mr,gr,Ha))?!1:(za.crossVectors(es,ts),t=[za.x,za.y,za.z],Pu(t,pr,mr,gr,Ha))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Pi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Pi=[new L,new L,new L,new L,new L,new L,new L,new L],jn=new L,ka=new Dn,pr=new L,mr=new L,gr=new L,es=new L,ts=new L,Ts=new L,mo=new L,Ha=new L,za=new L,As=new L;function Pu(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){As.fromArray(i,r);let a=s.x*Math.abs(As.x)+s.y*Math.abs(As.y)+s.z*Math.abs(As.z),l=e.dot(As),c=t.dot(As),u=n.dot(As);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}var v0=new Dn,go=new L,Iu=new L,Sn=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):v0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;go.subVectors(e,this.center);let t=go.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(go,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Iu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(go.copy(e.center).add(Iu)),this.expandByPoint(go.copy(e.center).sub(Iu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Ii=new L,Lu=new L,Ga=new L,ns=new L,Du=new L,Va=new L,Nu=new L,as=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ii)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ii.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ii.copy(this.origin).addScaledVector(this.direction,t),Ii.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Lu.copy(e).add(t).multiplyScalar(.5),Ga.copy(t).sub(e).normalize(),ns.copy(this.origin).sub(Lu);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Ga),a=ns.dot(this.direction),l=-ns.dot(Ga),c=ns.lengthSq(),u=Math.abs(1-o*o),h,d,f,g;if(u>0)if(h=o*l-a,d=o*a-l,g=r*u,h>=0)if(d>=-g)if(d<=g){let x=1/u;h*=x,d*=x,f=h*(h+o*d+2*a)+d*(o*h+d+2*l)+c}else d=r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d=-r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d<=-g?(h=Math.max(0,-(-o*r+a)),d=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c):d<=g?(h=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(h=Math.max(0,-(o*r+a)),d=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c);else d=o>0?-r:r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Lu).addScaledVector(Ga,d),f}intersectSphere(e,t){Ii.subVectors(e.center,this.origin);let n=Ii.dot(this.direction),s=Ii.dot(Ii)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Ii)!==null}intersectTriangle(e,t,n,s,r){Du.subVectors(t,e),Va.subVectors(n,e),Nu.crossVectors(Du,Va);let o=this.direction.dot(Nu),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ns.subVectors(this.origin,e);let l=a*this.direction.dot(Va.crossVectors(ns,Va));if(l<0)return null;let c=a*this.direction.dot(Du.cross(ns));if(c<0||l+c>o)return null;let u=-a*ns.dot(Nu);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ye=class i{constructor(e,t,n,s,r,o,a,l,c,u,h,d,f,g,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,u,h,d,f,g,x,m)}set(e,t,n,s,r,o,a,l,c,u,h,d,f,g,x,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/xr.setFromMatrixColumn(e,0).length(),r=1/xr.setFromMatrixColumn(e,1).length(),o=1/xr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let d=o*u,f=o*h,g=a*u,x=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+g*c,t[5]=d-x*c,t[9]=-a*l,t[2]=x-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){let d=l*u,f=l*h,g=c*u,x=c*h;t[0]=d+x*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=f*a-g,t[6]=x+d*a,t[10]=o*l}else if(e.order==="ZXY"){let d=l*u,f=l*h,g=c*u,x=c*h;t[0]=d-x*a,t[4]=-o*h,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*u,t[9]=x-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let d=o*u,f=o*h,g=a*u,x=a*h;t[0]=l*u,t[4]=g*c-f,t[8]=d*c+x,t[1]=l*h,t[5]=x*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let d=o*l,f=o*c,g=a*l,x=a*c;t[0]=l*u,t[4]=x-d*h,t[8]=g*h+f,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=f*h+g,t[10]=d-x*h}else if(e.order==="XZY"){let d=o*l,f=o*c,g=a*l,x=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+x,t[5]=o*u,t[9]=f*h-g,t[2]=g*h-f,t[6]=a*u,t[10]=x*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(_0,e,b0)}lookAt(e,t,n){let s=this.elements;return In.subVectors(e,t),In.lengthSq()===0&&(In.z=1),In.normalize(),is.crossVectors(n,In),is.lengthSq()===0&&(Math.abs(n.z)===1?In.x+=1e-4:In.z+=1e-4,In.normalize(),is.crossVectors(n,In)),is.normalize(),Wa.crossVectors(In,is),s[0]=is.x,s[4]=Wa.x,s[8]=In.x,s[1]=is.y,s[5]=Wa.y,s[9]=In.y,s[2]=is.z,s[6]=Wa.z,s[10]=In.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],b=n[3],M=n[7],v=n[11],T=n[15],A=s[0],R=s[4],I=s[8],w=s[12],_=s[1],P=s[5],O=s[9],z=s[13],G=s[2],Q=s[6],Z=s[10],re=s[14],X=s[3],he=s[7],ge=s[11],Re=s[15];return r[0]=o*A+a*_+l*G+c*X,r[4]=o*R+a*P+l*Q+c*he,r[8]=o*I+a*O+l*Z+c*ge,r[12]=o*w+a*z+l*re+c*Re,r[1]=u*A+h*_+d*G+f*X,r[5]=u*R+h*P+d*Q+f*he,r[9]=u*I+h*O+d*Z+f*ge,r[13]=u*w+h*z+d*re+f*Re,r[2]=g*A+x*_+m*G+p*X,r[6]=g*R+x*P+m*Q+p*he,r[10]=g*I+x*O+m*Z+p*ge,r[14]=g*w+x*z+m*re+p*Re,r[3]=b*A+M*_+v*G+T*X,r[7]=b*R+M*P+v*Q+T*he,r[11]=b*I+M*O+v*Z+T*ge,r[15]=b*w+M*z+v*re+T*Re,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],g=e[3],x=e[7],m=e[11],p=e[15];return g*(+r*l*h-s*c*h-r*a*d+n*c*d+s*a*f-n*l*f)+x*(+t*l*f-t*c*d+r*o*d-s*o*f+s*c*u-r*l*u)+m*(+t*c*h-t*a*f-r*o*h+n*o*f+r*a*u-n*c*u)+p*(-s*a*u-t*l*h+t*a*d+s*o*h-n*o*d+n*l*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],g=e[12],x=e[13],m=e[14],p=e[15],b=h*m*c-x*d*c+x*l*f-a*m*f-h*l*p+a*d*p,M=g*d*c-u*m*c-g*l*f+o*m*f+u*l*p-o*d*p,v=u*x*c-g*h*c+g*a*f-o*x*f-u*a*p+o*h*p,T=g*h*l-u*x*l-g*a*d+o*x*d+u*a*m-o*h*m,A=t*b+n*M+s*v+r*T;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/A;return e[0]=b*R,e[1]=(x*d*r-h*m*r-x*s*f+n*m*f+h*s*p-n*d*p)*R,e[2]=(a*m*r-x*l*r+x*s*c-n*m*c-a*s*p+n*l*p)*R,e[3]=(h*l*r-a*d*r-h*s*c+n*d*c+a*s*f-n*l*f)*R,e[4]=M*R,e[5]=(u*m*r-g*d*r+g*s*f-t*m*f-u*s*p+t*d*p)*R,e[6]=(g*l*r-o*m*r-g*s*c+t*m*c+o*s*p-t*l*p)*R,e[7]=(o*d*r-u*l*r+u*s*c-t*d*c-o*s*f+t*l*f)*R,e[8]=v*R,e[9]=(g*h*r-u*x*r-g*n*f+t*x*f+u*n*p-t*h*p)*R,e[10]=(o*x*r-g*a*r+g*n*c-t*x*c-o*n*p+t*a*p)*R,e[11]=(u*a*r-o*h*r-u*n*c+t*h*c+o*n*f-t*a*f)*R,e[12]=T*R,e[13]=(u*x*s-g*h*s+g*n*d-t*x*d-u*n*m+t*h*m)*R,e[14]=(g*a*s-o*x*s-g*n*l+t*x*l+o*n*m-t*a*m)*R,e[15]=(o*h*s-u*a*s+u*n*l-t*h*l-o*n*d+t*a*d)*R,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+n,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,h=a+a,d=r*c,f=r*u,g=r*h,x=o*u,m=o*h,p=a*h,b=l*c,M=l*u,v=l*h,T=n.x,A=n.y,R=n.z;return s[0]=(1-(x+p))*T,s[1]=(f+v)*T,s[2]=(g-M)*T,s[3]=0,s[4]=(f-v)*A,s[5]=(1-(d+p))*A,s[6]=(m+b)*A,s[7]=0,s[8]=(g+M)*R,s[9]=(m-b)*R,s[10]=(1-(d+x))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=xr.set(s[0],s[1],s[2]).length(),o=xr.set(s[4],s[5],s[6]).length(),a=xr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Zn.copy(this);let c=1/r,u=1/o,h=1/a;return Zn.elements[0]*=c,Zn.elements[1]*=c,Zn.elements[2]*=c,Zn.elements[4]*=u,Zn.elements[5]*=u,Zn.elements[6]*=u,Zn.elements[8]*=h,Zn.elements[9]*=h,Zn.elements[10]*=h,t.setFromRotationMatrix(Zn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=Qn,l=!1){let c=this.elements,u=2*r/(t-e),h=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s),g,x;if(l)g=r/(o-r),x=o*r/(o-r);else if(a===Qn)g=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===Po)g=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Qn,l=!1){let c=this.elements,u=2/(t-e),h=2/(n-s),d=-(t+e)/(t-e),f=-(n+s)/(n-s),g,x;if(l)g=1/(o-r),x=o/(o-r);else if(a===Qn)g=-2/(o-r),x=-(o+r)/(o-r);else if(a===Po)g=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},xr=new L,Zn=new Ye,_0=new L(0,0,0),b0=new L(1,1,1),is=new L,Wa=new L,In=new L,Sf=new Ye,Ef=new xn,Nn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],h=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(st(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-st(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(st(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-st(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(st(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-st(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Sf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Sf,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ef.setFromEuler(this),this.setFromQuaternion(Ef,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Nn.DEFAULT_ORDER="XYZ";var Fr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},M0=0,Tf=new L,yr=new xn,Li=new Ye,Xa=new L,xo=new L,w0=new L,S0=new xn,Af=new L(1,0,0),Rf=new L(0,1,0),Cf=new L(0,0,1),Pf={type:"added"},E0={type:"removed"},vr={type:"childadded",child:null},Ou={type:"childremoved",child:null},At=class i extends gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:M0++}),this.uuid=$n(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new L,t=new Nn,n=new xn,s=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ye},normalMatrix:{value:new Ke}}),this.matrix=new Ye,this.matrixWorld=new Ye,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return yr.setFromAxisAngle(e,t),this.quaternion.multiply(yr),this}rotateOnWorldAxis(e,t){return yr.setFromAxisAngle(e,t),this.quaternion.premultiply(yr),this}rotateX(e){return this.rotateOnAxis(Af,e)}rotateY(e){return this.rotateOnAxis(Rf,e)}rotateZ(e){return this.rotateOnAxis(Cf,e)}translateOnAxis(e,t){return Tf.copy(e).applyQuaternion(this.quaternion),this.position.add(Tf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Af,e)}translateY(e){return this.translateOnAxis(Rf,e)}translateZ(e){return this.translateOnAxis(Cf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Li.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Xa.copy(e):Xa.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),xo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Li.lookAt(xo,Xa,this.up):Li.lookAt(Xa,xo,this.up),this.quaternion.setFromRotationMatrix(Li),s&&(Li.extractRotation(s.matrixWorld),yr.setFromRotationMatrix(Li),this.quaternion.premultiply(yr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Pf),vr.child=e,this.dispatchEvent(vr),vr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(E0),Ou.child=e,this.dispatchEvent(Ou),Ou.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Li.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Li.multiply(e.parent.matrixWorld)),e.applyMatrix4(Li),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Pf),vr.child=e,this.dispatchEvent(vr),vr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xo,e,w0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xo,S0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let l=[];for(let c in a){let u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};At.DEFAULT_UP=new L(0,1,0);At.DEFAULT_MATRIX_AUTO_UPDATE=!0;At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Kn=new L,Di=new L,Uu=new L,Ni=new L,_r=new L,br=new L,If=new L,Fu=new L,Bu=new L,ku=new L,Hu=new dt,zu=new dt,Gu=new dt,Ui=class i{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Kn.subVectors(e,t),s.cross(Kn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Kn.subVectors(s,t),Di.subVectors(n,t),Uu.subVectors(e,t);let o=Kn.dot(Kn),a=Kn.dot(Di),l=Kn.dot(Uu),c=Di.dot(Di),u=Di.dot(Uu),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;let d=1/h,f=(c*l-a*u)*d,g=(o*u-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Ni)===null?!1:Ni.x>=0&&Ni.y>=0&&Ni.x+Ni.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,Ni)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ni.x),l.addScaledVector(o,Ni.y),l.addScaledVector(a,Ni.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return Hu.setScalar(0),zu.setScalar(0),Gu.setScalar(0),Hu.fromBufferAttribute(e,t),zu.fromBufferAttribute(e,n),Gu.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Hu,r.x),o.addScaledVector(zu,r.y),o.addScaledVector(Gu,r.z),o}static isFrontFacing(e,t,n,s){return Kn.subVectors(n,t),Di.subVectors(e,t),Kn.cross(Di).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Kn.subVectors(this.c,this.b),Di.subVectors(this.a,this.b),Kn.cross(Di).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;_r.subVectors(s,n),br.subVectors(r,n),Fu.subVectors(e,n);let l=_r.dot(Fu),c=br.dot(Fu);if(l<=0&&c<=0)return t.copy(n);Bu.subVectors(e,s);let u=_r.dot(Bu),h=br.dot(Bu);if(u>=0&&h<=u)return t.copy(s);let d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(_r,o);ku.subVectors(e,r);let f=_r.dot(ku),g=br.dot(ku);if(g>=0&&f<=g)return t.copy(r);let x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(br,a);let m=u*g-f*h;if(m<=0&&h-u>=0&&f-g>=0)return If.subVectors(r,s),a=(h-u)/(h-u+(f-g)),t.copy(s).addScaledVector(If,a);let p=1/(m+x+d);return o=x*p,a=d*p,t.copy(n).addScaledVector(_r,o).addScaledVector(br,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Wp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ss={h:0,s:0,l:0},qa={h:0,s:0,l:0};function Vu(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var we=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=it.workingColorSpace){return this.r=e,this.g=t,this.b=n,it.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=it.workingColorSpace){if(e=Sh(e,1),t=st(t,0,1),n=st(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Vu(o,r,e+1/3),this.g=Vu(o,r,e),this.b=Vu(o,r,e-1/3)}return it.colorSpaceToWorking(this,s),this}setStyle(e,t=Dt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Dt){let n=Wp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Fi(e.r),this.g=Fi(e.g),this.b=Fi(e.b),this}copyLinearToSRGB(e){return this.r=Ir(e.r),this.g=Ir(e.g),this.b=Ir(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Dt){return it.workingToColorSpace(dn.copy(this),e),Math.round(st(dn.r*255,0,255))*65536+Math.round(st(dn.g*255,0,255))*256+Math.round(st(dn.b*255,0,255))}getHexString(e=Dt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.workingToColorSpace(dn.copy(this),t);let n=dn.r,s=dn.g,r=dn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,u=(a+o)/2;if(a===o)l=0,c=0;else{let h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=it.workingColorSpace){return it.workingToColorSpace(dn.copy(this),t),e.r=dn.r,e.g=dn.g,e.b=dn.b,e}getStyle(e=Dt){it.workingToColorSpace(dn.copy(this),e);let t=dn.r,n=dn.g,s=dn.b;return e!==Dt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(ss),this.setHSL(ss.h+e,ss.s+t,ss.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ss),e.getHSL(qa);let n=Ao(ss.h,qa.h,t),s=Ao(ss.s,qa.s,t),r=Ao(ss.l,qa.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},dn=new we;we.NAMES=Wp;var T0=0,cn=class extends gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:T0++}),this.uuid=$n(),this.name="",this.type="Material",this.blending=Ds,this.side=ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fl,this.blendDst=pl,this.blendEquation=os,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new we(0,0,0),this.blendAlpha=0,this.depthFunc=Ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=th,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ps,this.stencilZFail=Ps,this.stencilZPass=Ps,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ds&&(n.blending=this.blending),this.side!==ei&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==fl&&(n.blendSrc=this.blendSrc),this.blendDst!==pl&&(n.blendDst=this.blendDst),this.blendEquation!==os&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ns&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==th&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ps&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ps&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ps&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Pt=class extends cn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.combine=ea,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Wt=new L,Ya=new be,A0=0,kt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:A0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ml,this.updateRanges=[],this.gpuType=Gn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ya.fromBufferAttribute(this,t),Ya.applyMatrix3(e),this.setXY(t,Ya.x,Ya.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix3(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix4(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyNormalMatrix(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.transformDirection(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Jn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=bt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Jn(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Jn(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Jn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Jn(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),s=bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),s=bt(s,this.array),r=bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ml&&(e.usage=this.usage),e}};var Lo=class extends kt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Do=class extends kt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var lt=class extends kt{constructor(e,t,n){super(new Float32Array(e),t,n)}},R0=0,kn=new Ye,Wu=new At,Mr=new L,Ln=new Dn,yo=new Dn,en=new L,Nt=class i extends gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:R0++}),this.uuid=$n(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Eh(e)?Do:Lo)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return kn.makeRotationFromQuaternion(e),this.applyMatrix4(kn),this}rotateX(e){return kn.makeRotationX(e),this.applyMatrix4(kn),this}rotateY(e){return kn.makeRotationY(e),this.applyMatrix4(kn),this}rotateZ(e){return kn.makeRotationZ(e),this.applyMatrix4(kn),this}translate(e,t,n){return kn.makeTranslation(e,t,n),this.applyMatrix4(kn),this}scale(e,t,n){return kn.makeScale(e,t,n),this.applyMatrix4(kn),this}lookAt(e){return Wu.lookAt(e),Wu.updateMatrix(),this.applyMatrix4(Wu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Mr).negate(),this.translate(Mr.x,Mr.y,Mr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new lt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Dn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];Ln.setFromBufferAttribute(r),this.morphTargetsRelative?(en.addVectors(this.boundingBox.min,Ln.min),this.boundingBox.expandByPoint(en),en.addVectors(this.boundingBox.max,Ln.max),this.boundingBox.expandByPoint(en)):(this.boundingBox.expandByPoint(Ln.min),this.boundingBox.expandByPoint(Ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Sn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){let n=this.boundingSphere.center;if(Ln.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];yo.setFromBufferAttribute(a),this.morphTargetsRelative?(en.addVectors(Ln.min,yo.min),Ln.expandByPoint(en),en.addVectors(Ln.max,yo.max),Ln.expandByPoint(en)):(Ln.expandByPoint(yo.min),Ln.expandByPoint(yo.max))}Ln.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)en.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(en));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)en.fromBufferAttribute(a,c),l&&(Mr.fromBufferAttribute(e,c),en.add(Mr)),s=Math.max(s,n.distanceToSquared(en))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new kt(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let I=0;I<n.count;I++)a[I]=new L,l[I]=new L;let c=new L,u=new L,h=new L,d=new be,f=new be,g=new be,x=new L,m=new L;function p(I,w,_){c.fromBufferAttribute(n,I),u.fromBufferAttribute(n,w),h.fromBufferAttribute(n,_),d.fromBufferAttribute(r,I),f.fromBufferAttribute(r,w),g.fromBufferAttribute(r,_),u.sub(c),h.sub(c),f.sub(d),g.sub(d);let P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(P),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(P),a[I].add(x),a[w].add(x),a[_].add(x),l[I].add(m),l[w].add(m),l[_].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let I=0,w=b.length;I<w;++I){let _=b[I],P=_.start,O=_.count;for(let z=P,G=P+O;z<G;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}let M=new L,v=new L,T=new L,A=new L;function R(I){T.fromBufferAttribute(s,I),A.copy(T);let w=a[I];M.copy(w),M.sub(T.multiplyScalar(T.dot(w))).normalize(),v.crossVectors(A,w);let P=v.dot(l[I])<0?-1:1;o.setXYZW(I,M.x,M.y,M.z,P)}for(let I=0,w=b.length;I<w;++I){let _=b[I],P=_.start,O=_.count;for(let z=P,G=P+O;z<G;z+=3)R(e.getX(z+0)),R(e.getX(z+1)),R(e.getX(z+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new kt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new L,r=new L,o=new L,a=new L,l=new L,c=new L,u=new L,h=new L;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)en.fromBufferAttribute(e,t),en.normalize(),e.setXYZ(t,en.x,en.y,en.z)}toNonIndexed(){function e(a,l){let c=a.array,u=a.itemSize,h=a.normalized,d=new c.constructor(l.length*u),f=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*u;for(let p=0;p<u;p++)d[g++]=c[f++]}return new kt(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){let d=c[u],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){let f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],h=r[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,u=o.length;c<u;c++){let h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Lf=new Ye,Rs=new as,ja=new Sn,Df=new L,Za=new L,Ka=new L,Ja=new L,Xu=new L,Qa=new L,Nf=new L,$a=new L,D=class extends At{constructor(e=new Nt,t=new Pt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){Qa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=a[l],h=r[l];u!==0&&(Xu.fromBufferAttribute(h,e),o?Qa.addScaledVector(Xu,u):Qa.addScaledVector(Xu.sub(t),u))}t.add(Qa)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ja.copy(n.boundingSphere),ja.applyMatrix4(r),Rs.copy(e.ray).recast(e.near),!(ja.containsPoint(Rs.origin)===!1&&(Rs.intersectSphere(ja,Df)===null||Rs.origin.distanceToSquared(Df)>(e.far-e.near)**2))&&(Lf.copy(r).invert(),Rs.copy(e.ray).applyMatrix4(Lf),!(n.boundingBox!==null&&Rs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Rs)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=o[m.materialIndex],b=Math.max(m.start,f.start),M=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let v=b,T=M;v<T;v+=3){let A=a.getX(v),R=a.getX(v+1),I=a.getX(v+2);s=el(this,p,e,n,c,u,h,A,R,I),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let b=a.getX(m),M=a.getX(m+1),v=a.getX(m+2);s=el(this,o,e,n,c,u,h,b,M,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=o[m.materialIndex],b=Math.max(m.start,f.start),M=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=b,T=M;v<T;v+=3){let A=v,R=v+1,I=v+2;s=el(this,p,e,n,c,u,h,A,R,I),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let b=m,M=m+1,v=m+2;s=el(this,o,e,n,c,u,h,b,M,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function C0(i,e,t,n,s,r,o,a){let l;if(e.side===nn?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===ei,a),l===null)return null;$a.copy(a),$a.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo($a);return c<t.near||c>t.far?null:{distance:c,point:$a.clone(),object:i}}function el(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,Za),i.getVertexPosition(l,Ka),i.getVertexPosition(c,Ja);let u=C0(i,e,t,n,Za,Ka,Ja,Nf);if(u){let h=new L;Ui.getBarycoord(Nf,Za,Ka,Ja,h),s&&(u.uv=Ui.getInterpolatedAttribute(s,a,l,c,h,new be)),r&&(u.uv1=Ui.getInterpolatedAttribute(r,a,l,c,h,new be)),o&&(u.normal=Ui.getInterpolatedAttribute(o,a,l,c,h,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new L,materialIndex:0};Ui.getNormal(Za,Ka,Ja,d.normal),u.face=d,u.barycoord=h}return u}var Se=class i extends Nt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],u=[],h=[],d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new lt(c,3)),this.setAttribute("normal",new lt(u,3)),this.setAttribute("uv",new lt(h,2));function g(x,m,p,b,M,v,T,A,R,I,w){let _=v/R,P=T/I,O=v/2,z=T/2,G=A/2,Q=R+1,Z=I+1,re=0,X=0,he=new L;for(let ge=0;ge<Z;ge++){let Re=ge*P-z;for(let qe=0;qe<Q;qe++){let ct=qe*_-O;he[x]=ct*b,he[m]=Re*M,he[p]=G,c.push(he.x,he.y,he.z),he[x]=0,he[m]=0,he[p]=A>0?1:-1,u.push(he.x,he.y,he.z),h.push(qe/R),h.push(1-ge/I),re+=1}}for(let ge=0;ge<I;ge++)for(let Re=0;Re<R;Re++){let qe=d+Re+Q*ge,ct=d+Re+Q*(ge+1),ut=d+(Re+1)+Q*(ge+1),$e=d+(Re+1)+Q*ge;l.push(qe,ct,$e),l.push(ct,ut,$e),X+=6}a.addGroup(f,X,w),f+=X,d+=re}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Js(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function fn(i){let e={};for(let t=0;t<i.length;t++){let n=Js(i[t]);for(let s in n)e[s]=n[s]}return e}function P0(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Th(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}var Un={clone:Js,merge:fn},I0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,L0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ot=class extends cn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=I0,this.fragmentShader=L0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Js(e.uniforms),this.uniformsGroups=P0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},No=class extends At{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ye,this.projectionMatrix=new Ye,this.projectionMatrixInverse=new Ye,this.coordinateSystem=Qn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},rs=new L,Of=new be,Uf=new be,Xt=class extends No{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Fs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(To*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Fs*2*Math.atan(Math.tan(To*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){rs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(rs.x,rs.y).multiplyScalar(-e/rs.z),rs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(rs.x,rs.y).multiplyScalar(-e/rs.z)}getViewSize(e,t){return this.getViewBounds(e,Of,Uf),t.subVectors(Uf,Of)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(To*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},wr=-90,Sr=1,vl=class extends At{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Xt(wr,Sr,e,t);s.layers=this.layers,this.add(s);let r=new Xt(wr,Sr,e,t);r.layers=this.layers,this.add(r);let o=new Xt(wr,Sr,e,t);o.layers=this.layers,this.add(o);let a=new Xt(wr,Sr,e,t);a.layers=this.layers,this.add(a);let l=new Xt(wr,Sr,e,t);l.layers=this.layers,this.add(l);let c=new Xt(wr,Sr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===Qn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Po)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Oo=class extends Gt{constructor(e=[],t=js,n,s,r,o,a,l,c,u){super(e,t,n,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},_l=class extends Zt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Oo(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Se(5,5,5),r=new Ot({name:"CubemapFromEquirect",uniforms:Js(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:nn,blending:ii});r.uniforms.tEquirect.value=t;let o=new D(s,r),a=t.minFilter;return t.minFilter===si&&(t.minFilter=an),new vl(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},Mt=class extends At{constructor(){super(),this.isGroup=!0,this.type="Group"}},D0={type:"move"},Br=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(D0)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Mt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var Uo=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new we(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Fo=class extends At{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Nn,this.environmentIntensity=1,this.environmentRotation=new Nn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Bs=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ml,this.updateRanges=[],this.version=0,this.uuid=$n()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},gn=new L,ls=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.applyMatrix4(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.applyNormalMatrix(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.transformDirection(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Jn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=bt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Jn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Jn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Jn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Jn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),s=bt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),s=bt(s,this.array),r=bt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new kt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},ks=class extends cn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new we(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Er,vo=new L,Tr=new L,Ar=new L,Rr=new be,_o=new be,Xp=new Ye,tl=new L,bo=new L,nl=new L,Ff=new be,qu=new be,Bf=new be,kr=class extends At{constructor(e=new ks){if(super(),this.isSprite=!0,this.type="Sprite",Er===void 0){Er=new Nt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Bs(t,5);Er.setIndex([0,1,2,0,2,3]),Er.setAttribute("position",new ls(n,3,0,!1)),Er.setAttribute("uv",new ls(n,2,3,!1))}this.geometry=Er,this.material=e,this.center=new be(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Tr.setFromMatrixScale(this.matrixWorld),Xp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ar.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Tr.multiplyScalar(-Ar.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;il(tl.set(-.5,-.5,0),Ar,o,Tr,s,r),il(bo.set(.5,-.5,0),Ar,o,Tr,s,r),il(nl.set(.5,.5,0),Ar,o,Tr,s,r),Ff.set(0,0),qu.set(1,0),Bf.set(1,1);let a=e.ray.intersectTriangle(tl,bo,nl,!1,vo);if(a===null&&(il(bo.set(-.5,.5,0),Ar,o,Tr,s,r),qu.set(0,1),a=e.ray.intersectTriangle(tl,nl,bo,!1,vo),a===null))return;let l=e.ray.origin.distanceTo(vo);l<e.near||l>e.far||t.push({distance:l,point:vo.clone(),uv:Ui.getInterpolation(vo,tl,bo,nl,Ff,qu,Bf,new be),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function il(i,e,t,n,s,r){Rr.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(_o.x=r*Rr.x-s*Rr.y,_o.y=s*Rr.x+r*Rr.y):_o.copy(Rr),i.copy(e),i.x+=_o.x,i.y+=_o.y,i.applyMatrix4(Xp)}var kf=new L,Hf=new dt,zf=new dt,N0=new L,Gf=new Ye,sl=new L,Yu=new Sn,Vf=new Ye,ju=new as,Bo=class extends D{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=eh,this.bindMatrix=new Ye,this.bindMatrixInverse=new Ye,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Dn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,sl),this.boundingBox.expandByPoint(sl)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Sn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,sl),this.boundingSphere.expandByPoint(sl)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Yu.copy(this.boundingSphere),Yu.applyMatrix4(s),e.ray.intersectsSphere(Yu)!==!1&&(Vf.copy(s).invert(),ju.copy(e.ray).applyMatrix4(Vf),!(this.boundingBox!==null&&ju.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ju)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new dt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===eh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Ap?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Hf.fromBufferAttribute(s.attributes.skinIndex,e),zf.fromBufferAttribute(s.attributes.skinWeight,e),kf.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=zf.getComponent(r);if(o!==0){let a=Hf.getComponent(r);Gf.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(N0.copy(kf).applyMatrix4(Gf),o)}}return t.applyMatrix4(this.bindMatrixInverse)}},Hr=class extends At{constructor(){super(),this.isBone=!0,this.type="Bone"}},ko=class extends Gt{constructor(e=null,t=1,n=1,s,r,o,a,l,c=qt,u=qt,h,d){super(null,o,a,l,c,u,s,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Wf=new Ye,O0=new Ye,Ho=class i{constructor(e=[],t=[]){this.uuid=$n(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ye)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ye;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:O0;Wf.multiplyMatrices(a,t[r]),Wf.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new ko(t,e,e,On,Gn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Hr),this.bones.push(o),this.boneInverses.push(new Ye().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let o=t[s];e.bones.push(o.uuid);let a=n[s];e.boneInverses.push(a.toArray())}return e}},cs=class extends kt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Cr=new Ye,Xf=new Ye,rl=[],qf=new Dn,U0=new Ye,Mo=new D,wo=new Sn,us=class extends D{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new cs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,U0)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Dn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Cr),qf.copy(e.boundingBox).applyMatrix4(Cr),this.boundingBox.union(qf)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Sn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Cr),wo.copy(e.boundingSphere).applyMatrix4(Cr),this.boundingSphere.union(wo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Mo.geometry=this.geometry,Mo.material=this.material,Mo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wo.copy(this.boundingSphere),wo.applyMatrix4(n),e.ray.intersectsSphere(wo)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Cr),Xf.multiplyMatrices(n,Cr),Mo.matrixWorld=Xf,Mo.raycast(e,rl);for(let o=0,a=rl.length;o<a;o++){let l=rl[o];l.instanceId=r,l.object=this,t.push(l)}rl.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new cs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new ko(new Float32Array(s*this.count),s,this.count,$l,Gn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Zu=new L,F0=new L,B0=new Ke,Hn=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Zu.subVectors(n,t).cross(F0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Zu),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||B0.getNormalMatrix(e),s=this.coplanarPoint(Zu).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Cs=new Sn,k0=new be(.5,.5),ol=new L,zr=class{constructor(e=new Hn,t=new Hn,n=new Hn,s=new Hn,r=new Hn,o=new Hn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Qn,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],u=r[4],h=r[5],d=r[6],f=r[7],g=r[8],x=r[9],m=r[10],p=r[11],b=r[12],M=r[13],v=r[14],T=r[15];if(s[0].setComponents(c-o,f-u,p-g,T-b).normalize(),s[1].setComponents(c+o,f+u,p+g,T+b).normalize(),s[2].setComponents(c+a,f+h,p+x,T+M).normalize(),s[3].setComponents(c-a,f-h,p-x,T-M).normalize(),n)s[4].setComponents(l,d,m,v).normalize(),s[5].setComponents(c-l,f-d,p-m,T-v).normalize();else if(s[4].setComponents(c-l,f-d,p-m,T-v).normalize(),t===Qn)s[5].setComponents(c+l,f+d,p+m,T+v).normalize();else if(t===Po)s[5].setComponents(l,d,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Cs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Cs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Cs)}intersectsSprite(e){Cs.center.set(0,0,0);let t=k0.distanceTo(e.center);return Cs.radius=.7071067811865476+t,Cs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Cs)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(ol.x=s.normal.x>0?e.max.x:e.min.x,ol.y=s.normal.y>0?e.max.y:e.min.y,ol.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ol)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Gr=class extends cn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new we(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},bl=new L,Ml=new L,Yf=new Ye,So=new as,al=new Sn,Ku=new L,jf=new L,Hs=class extends At{constructor(e=new Nt,t=new Gr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)bl.fromBufferAttribute(t,s-1),Ml.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=bl.distanceTo(Ml);e.setAttribute("lineDistance",new lt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),al.copy(n.boundingSphere),al.applyMatrix4(s),al.radius+=r,e.ray.intersectsSphere(al)===!1)return;Yf.copy(s).invert(),So.copy(e.ray).applyMatrix4(Yf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){let f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=c){let p=u.getX(x),b=u.getX(x+1),M=ll(this,e,So,l,p,b,x);M&&t.push(M)}if(this.isLineLoop){let x=u.getX(g-1),m=u.getX(f),p=ll(this,e,So,l,x,m,g-1);p&&t.push(p)}}else{let f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=c){let p=ll(this,e,So,l,x,x+1,x);p&&t.push(p)}if(this.isLineLoop){let x=ll(this,e,So,l,g-1,f,g-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function ll(i,e,t,n,s,r,o){let a=i.geometry.attributes.position;if(bl.fromBufferAttribute(a,s),Ml.fromBufferAttribute(a,r),t.distanceSqToSegment(bl,Ml,Ku,jf)>n)return;Ku.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Ku);if(!(c<e.near||c>e.far))return{distance:c,point:jf.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var Zf=new L,Kf=new L,zo=class extends Hs{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Zf.fromBufferAttribute(t,s),Kf.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Zf.distanceTo(Kf);e.setAttribute("lineDistance",new lt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Go=class extends Hs{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Bi=class extends cn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new we(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Jf=new Ye,nh=new as,cl=new Sn,ul=new L,hs=class extends At{constructor(e=new Nt,t=new Bi){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),cl.copy(n.boundingSphere),cl.applyMatrix4(s),cl.radius+=r,e.ray.intersectsSphere(cl)===!1)return;Jf.copy(s).invert(),nh.copy(e.ray).applyMatrix4(Jf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){let d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,x=f;g<x;g++){let m=c.getX(g);ul.fromBufferAttribute(h,m),Qf(ul,m,l,s,e,t,this)}}else{let d=Math.max(0,o.start),f=Math.min(h.count,o.start+o.count);for(let g=d,x=f;g<x;g++)ul.fromBufferAttribute(h,g),Qf(ul,g,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Qf(i,e,t,n,s,r,o){let a=nh.distanceSqToPoint(i);if(a<t){let l=new L;nh.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var ti=class extends Gt{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Vo=class extends Gt{constructor(e,t,n=ds,s,r,o,a=qt,l=qt,c,u=Dr,h=1){if(u!==Dr&&u!==jr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:h};super(d,s,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ur(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Wo=class extends Gt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},xi=class i extends Nt{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let o=[],a=[],l=[],c=[],u=t/2,h=Math.PI/2*e,d=t,f=2*h+d,g=n*2+r,x=s+1,m=new L,p=new L;for(let b=0;b<=g;b++){let M=0,v=0,T=0,A=0;if(b<=n){let w=b/n,_=w*Math.PI/2;v=-u-e*Math.cos(_),T=e*Math.sin(_),A=-e*Math.cos(_),M=w*h}else if(b<=n+r){let w=(b-n)/r;v=-u+w*t,T=e,A=0,M=h+w*d}else{let w=(b-n-r)/n,_=w*Math.PI/2;v=u+e*Math.sin(_),T=e*Math.cos(_),A=e*Math.sin(_),M=h+d+w*h}let R=Math.max(0,Math.min(1,M/f)),I=0;b===0?I=.5/s:b===g&&(I=-.5/s);for(let w=0;w<=s;w++){let _=w/s,P=_*Math.PI*2,O=Math.sin(P),z=Math.cos(P);p.x=-T*z,p.y=v,p.z=T*O,a.push(p.x,p.y,p.z),m.set(-T*z,A,T*O),m.normalize(),l.push(m.x,m.y,m.z),c.push(_+I,R)}if(b>0){let w=(b-1)*x;for(let _=0;_<s;_++){let P=w+_,O=w+_+1,z=b*x+_,G=b*x+_+1;o.push(P,O,z),o.push(O,G,z)}}}this.setIndex(o),this.setAttribute("position",new lt(a,3)),this.setAttribute("normal",new lt(l,3)),this.setAttribute("uv",new lt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},ni=class i extends Nt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],o=[],a=[],l=[],c=new L,u=new be;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){let f=n+h/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[d]/e+1)/2,u.y=(o[d+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new lt(o,3)),this.setAttribute("normal",new lt(a,3)),this.setAttribute("uv",new lt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},mt=class i extends Nt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],h=[],d=[],f=[],g=0,x=[],m=n/2,p=0;b(),o===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new lt(h,3)),this.setAttribute("normal",new lt(d,3)),this.setAttribute("uv",new lt(f,2));function b(){let v=new L,T=new L,A=0,R=(t-e)/n;for(let I=0;I<=r;I++){let w=[],_=I/r,P=_*(t-e)+e;for(let O=0;O<=s;O++){let z=O/s,G=z*l+a,Q=Math.sin(G),Z=Math.cos(G);T.x=P*Q,T.y=-_*n+m,T.z=P*Z,h.push(T.x,T.y,T.z),v.set(Q,R,Z).normalize(),d.push(v.x,v.y,v.z),f.push(z,1-_),w.push(g++)}x.push(w)}for(let I=0;I<s;I++)for(let w=0;w<r;w++){let _=x[w][I],P=x[w+1][I],O=x[w+1][I+1],z=x[w][I+1];(e>0||w!==0)&&(u.push(_,P,z),A+=3),(t>0||w!==r-1)&&(u.push(P,O,z),A+=3)}c.addGroup(p,A,0),p+=A}function M(v){let T=g,A=new be,R=new L,I=0,w=v===!0?e:t,_=v===!0?1:-1;for(let O=1;O<=s;O++)h.push(0,m*_,0),d.push(0,_,0),f.push(.5,.5),g++;let P=g;for(let O=0;O<=s;O++){let G=O/s*l+a,Q=Math.cos(G),Z=Math.sin(G);R.x=w*Z,R.y=m*_,R.z=w*Q,h.push(R.x,R.y,R.z),d.push(0,_,0),A.x=Q*.5+.5,A.y=Z*.5*_+.5,f.push(A.x,A.y),g++}for(let O=0;O<s;O++){let z=T+O,G=P+O;v===!0?u.push(G,G+1,z):u.push(G+1,G,z),I+=3}c.addGroup(p,I,v===!0?1:2),p+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},tn=class i extends mt{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var tt=class i extends Nt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,u=l+1,h=e/a,d=t/l,f=[],g=[],x=[],m=[];for(let p=0;p<u;p++){let b=p*d-o;for(let M=0;M<c;M++){let v=M*h-r;g.push(v,-b,0),x.push(0,0,1),m.push(M/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<a;b++){let M=b+c*p,v=b+c*(p+1),T=b+1+c*(p+1),A=b+1+c*p;f.push(M,v,A),f.push(v,T,A)}this.setIndex(f),this.setAttribute("position",new lt(g,3)),this.setAttribute("normal",new lt(x,3)),this.setAttribute("uv",new lt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},ki=class i extends Nt{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],l=[],c=[],u=[],h=e,d=(t-e)/s,f=new L,g=new be;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){let p=r+m/n*o;f.x=h*Math.cos(p),f.y=h*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,u.push(g.x,g.y)}h+=d}for(let x=0;x<s;x++){let m=x*(n+1);for(let p=0;p<n;p++){let b=p+m,M=b,v=b+n+1,T=b+n+2,A=b+1;a.push(M,v,A),a.push(v,T,A)}}this.setIndex(a),this.setAttribute("position",new lt(l,3)),this.setAttribute("normal",new lt(c,3)),this.setAttribute("uv",new lt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var gt=class i extends Nt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,u=[],h=new L,d=new L,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){let b=[],M=p/n,v=0;p===0&&o===0?v=.5/t:p===n&&l===Math.PI&&(v=-.5/t);for(let T=0;T<=t;T++){let A=T/t;h.x=-e*Math.cos(s+A*r)*Math.sin(o+M*a),h.y=e*Math.cos(o+M*a),h.z=e*Math.sin(s+A*r)*Math.sin(o+M*a),g.push(h.x,h.y,h.z),d.copy(h).normalize(),x.push(d.x,d.y,d.z),m.push(A+v,1-M),b.push(c++)}u.push(b)}for(let p=0;p<n;p++)for(let b=0;b<t;b++){let M=u[p][b+1],v=u[p][b],T=u[p+1][b],A=u[p+1][b+1];(p!==0||o>0)&&f.push(M,v,A),(p!==n-1||l<Math.PI)&&f.push(v,T,A)}this.setIndex(f),this.setAttribute("position",new lt(g,3)),this.setAttribute("normal",new lt(x,3)),this.setAttribute("uv",new lt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var zs=class i extends Nt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],l=[],c=[],u=new L,h=new L,d=new L;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){let x=g/s*r,m=f/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(x),h.y=(e+t*Math.cos(m))*Math.sin(x),h.z=t*Math.sin(m),a.push(h.x,h.y,h.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),d.subVectors(h,u).normalize(),l.push(d.x,d.y,d.z),c.push(g/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){let x=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,b=(s+1)*f+g;o.push(x,m,b),o.push(m,p,b)}this.setIndex(o),this.setAttribute("position",new lt(a,3)),this.setAttribute("normal",new lt(l,3)),this.setAttribute("uv",new lt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Xo=class extends Ot{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Hi=class extends cn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new we(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=aa,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},En=class extends Hi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new be(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return st(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new we(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new we(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new we(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},qo=class extends cn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new we(16777215),this.specular=new we(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=aa,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.combine=ea,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var zi=class extends cn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=aa,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.combine=ea,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},wl=class extends cn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Lp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Sl=class extends cn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function hl(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function H0(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function z0(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function $f(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let l=0;l!==e;++l)s[o++]=i[a+l]}return s}function qp(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}var Gi=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},El=class extends Gi{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Is,endingEnd:Is}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ls:r=e,a=2*t-n;break;case Ro:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ls:o=e,l=2*n-t;break;case Ro:o=1,l=n+s[1]-s[0];break;default:o=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),x=g*g,m=x*g,p=-d*m+2*d*x-d*g,b=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,M=(-1-f)*m+(1.5+f)*x+.5*g,v=f*m-f*x;for(let T=0;T!==a;++T)r[T]=p*o[u+T]+b*o[c+T]+M*o[l+T]+v*o[h+T];return r}},Yo=class extends Gi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(s-t),h=1-u;for(let d=0;d!==a;++d)r[d]=o[c+d]*h+o[l+d]*u;return r}},Tl=class extends Gi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Tn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=hl(t,this.TimeBufferType),this.values=hl(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:hl(e.times,Array),values:hl(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Tl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Yo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new El(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Os:t=this.InterpolantFactoryMethodDiscrete;break;case Us:t=this.InterpolantFactoryMethodLinear;break;case dl:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Os;case this.InterpolantFactoryMethodLinear:return Us;case this.InterpolantFactoryMethodSmooth:return dl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&H0(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===dl,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(s)l=!0;else{let h=a*n,d=h-n,f=h+n;for(let g=0;g!==n;++g){let x=t[h+g];if(x!==t[d+g]||x!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let h=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};Tn.prototype.ValueTypeName="";Tn.prototype.TimeBufferType=Float32Array;Tn.prototype.ValueBufferType=Float32Array;Tn.prototype.DefaultInterpolation=Us;var Vi=class extends Tn{constructor(e,t,n){super(e,t,n)}};Vi.prototype.ValueTypeName="bool";Vi.prototype.ValueBufferType=Array;Vi.prototype.DefaultInterpolation=Os;Vi.prototype.InterpolantFactoryMethodLinear=void 0;Vi.prototype.InterpolantFactoryMethodSmooth=void 0;var jo=class extends Tn{constructor(e,t,n,s){super(e,t,n,s)}};jo.prototype.ValueTypeName="color";var yi=class extends Tn{constructor(e,t,n,s){super(e,t,n,s)}};yi.prototype.ValueTypeName="number";var Al=class extends Gi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(s-t),c=e*a;for(let u=c+a;c!==u;c+=4)xn.slerpFlat(r,0,o,c-a,o,c,l);return r}},vi=class extends Tn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Al(this.times,this.values,this.getValueSize(),e)}};vi.prototype.ValueTypeName="quaternion";vi.prototype.InterpolantFactoryMethodSmooth=void 0;var Wi=class extends Tn{constructor(e,t,n){super(e,t,n)}};Wi.prototype.ValueTypeName="string";Wi.prototype.ValueBufferType=Array;Wi.prototype.DefaultInterpolation=Os;Wi.prototype.InterpolantFactoryMethodLinear=void 0;Wi.prototype.InterpolantFactoryMethodSmooth=void 0;var _i=class extends Tn{constructor(e,t,n,s){super(e,t,n,s)}};_i.prototype.ValueTypeName="vector";var Gs=class{constructor(e="",t=-1,n=[],s=Ic){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=$n(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(V0(n[o]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(Tn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let u=z0(l);l=$f(l,1,u),c=$f(c,1,u),!s&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new yi(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){let c=e[a],u=c.name.match(r);if(u&&u.length>1){let h=u[1],d=s[h];d||(s[h]=d=[]),d.push(c)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,d,f,g,x){if(f.length!==0){let m=[],p=[];qp(f,m,p,g),m.length!==0&&x.push(new h(d,m,p))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let h=0;h<c.length;h++){let d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let x=0;x<d[g].morphTargets.length;x++)f[d[g].morphTargets[x]]=-1;for(let x in f){let m=[],p=[];for(let b=0;b!==d[g].morphTargets.length;++b){let M=d[g];m.push(M.time),p.push(M.morphTarget===x?1:0)}s.push(new yi(".morphTargetInfluence["+x+"]",m,p))}l=f.length*o}else{let f=".bones["+t[h].name+"]";n(_i,f+".position",d,"pos",s),n(vi,f+".quaternion",d,"rot",s),n(_i,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,l,s,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function G0(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return yi;case"vector":case"vector2":case"vector3":case"vector4":return _i;case"color":return jo;case"quaternion":return vi;case"bool":case"boolean":return Vi;case"string":return Wi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function V0(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=G0(i.type);if(i.times===void 0){let t=[],n=[];qp(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var mi={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},Rl=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){let f=c[h],g=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},la=new Rl,bi=class{constructor(e){this.manager=e!==void 0?e:la,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};bi.DEFAULT_MATERIAL_NAME="__DEFAULT";var Oi={},ih=class extends Error{constructor(e,t){super(e),this.response=t}},Vr=class extends bi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=mi.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Oi[e]!==void 0){Oi[e].push({onLoad:t,onProgress:n,onError:s});return}Oi[e]=[],Oi[e].push({onLoad:t,onProgress:n,onError:s});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let u=Oi[e],h=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0,x=0,m=new ReadableStream({start(p){b();function b(){h.read().then(({done:M,value:v})=>{if(M)p.close();else{x+=v.byteLength;let T=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:f});for(let A=0,R=u.length;A<R;A++){let I=u[A];I.onProgress&&I.onProgress(T)}p.enqueue(v),b()}},M=>{p.error(M)})}}});return new Response(m)}else throw new ih(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{let h=/charset="?([^;"\s]*)"?/i.exec(a),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{mi.add(`file:${e}`,c);let u=Oi[e];delete Oi[e];for(let h=0,d=u.length;h<d;h++){let f=u[h];f.onLoad&&f.onLoad(c)}}).catch(c=>{let u=Oi[e];if(u===void 0)throw this.manager.itemError(e),c;delete Oi[e];for(let h=0,d=u.length;h<d;h++){let f=u[h];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Pr=new WeakMap,Cl=class extends bi{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=mi.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let h=Pr.get(o);h===void 0&&(h=[],Pr.set(o,h)),h.push({onLoad:t,onError:s})}return o}let a=Nr("img");function l(){u(),t&&t(this);let h=Pr.get(this)||[];for(let d=0;d<h.length;d++){let f=h[d];f.onLoad&&f.onLoad(this)}Pr.delete(this),r.manager.itemEnd(e)}function c(h){u(),s&&s(h),mi.remove(`image:${e}`);let d=Pr.get(this)||[];for(let f=0;f<d.length;f++){let g=d[f];g.onError&&g.onError(h)}Pr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),mi.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}};var Vs=class extends bi{constructor(e){super(e)}load(e,t,n,s){let r=new Gt,o=new Cl(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},Ws=class extends At{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new we(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Zo=class extends Ws{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.groundColor=new we(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Ju=new Ye,ep=new L,tp=new L,Ko=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new be(512,512),this.mapType=ri,this.map=null,this.mapPass=null,this.matrix=new Ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new zr,this._frameExtents=new be(1,1),this._viewportCount=1,this._viewports=[new dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;ep.setFromMatrixPosition(e.matrixWorld),t.position.copy(ep),tp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(tp),t.updateMatrixWorld(),Ju.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ju,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ju)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},sh=class extends Ko{constructor(){super(new Xt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Fs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Jo=class extends Ws{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new sh}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},np=new Ye,Eo=new L,Qu=new L,rh=class extends Ko{constructor(){super(new Xt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new be(4,2),this._viewportCount=6,this._viewports=[new dt(2,1,1,1),new dt(0,1,1,1),new dt(3,1,1,1),new dt(1,1,1,1),new dt(3,0,1,1),new dt(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Eo.setFromMatrixPosition(e.matrixWorld),n.position.copy(Eo),Qu.copy(n.position),Qu.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Qu),n.updateMatrixWorld(),s.makeTranslation(-Eo.x,-Eo.y,-Eo.z),np.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(np,n.coordinateSystem,n.reversedDepth)}},zn=class extends Ws{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new rh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Xi=class extends No{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},oh=class extends Ko{constructor(){super(new Xi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Xs=class extends Ws{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.shadow=new oh}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var qi=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var $u=new WeakMap,Qo=class extends bi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=mi.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{if($u.has(o)===!0)s&&s($u.get(o)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(c),r.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return mi.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),$u.set(l,c),mi.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});mi.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Pl=class extends Xt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},qs=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};var Il=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,o;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,s=this.valueSize,r=e*s+s,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==s;++a)n[r+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,r,0,a,s)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(n,s,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,o=s;r!==o;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,s){xn.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){let o=this._workIndex*r;xn.multiplyQuaternionsFlat(e,o,e,t,e,n),xn.slerpFlat(e,t,e,t,e,o,s)}_lerp(e,t,n,s,r){let o=1-s;for(let a=0;a!==r;++a){let l=t+a;e[l]=e[l]*o+e[n+a]*s}}_lerpAdditive(e,t,n,s,r){for(let o=0;o!==r;++o){let a=t+o;e[a]=e[a]+e[n+o]*s}}},Ah="\\[\\]\\.:\\/",W0=new RegExp("["+Ah+"]","g"),Rh="[^"+Ah+"]",X0="[^"+Ah.replace("\\.","")+"]",q0=/((?:WC+[\/:])*)/.source.replace("WC",Rh),Y0=/(WCOD+)?/.source.replace("WCOD",X0),j0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Rh),Z0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Rh),K0=new RegExp("^"+q0+Y0+j0+Z0+"$"),J0=["material","materials","bones","map"],ah=class{constructor(e,t,n){let s=n||Et.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Et=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(W0,"")}static parseTrackName(e){let t=K0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);J0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[s];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Et.Composite=ah;Et.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Et.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Et.prototype.GetterByBindingType=[Et.prototype._getValue_direct,Et.prototype._getValue_array,Et.prototype._getValue_arrayElement,Et.prototype._getValue_toArray];Et.prototype.SetterByBindingTypeAndVersioning=[[Et.prototype._setValue_direct,Et.prototype._setValue_direct_setNeedsUpdate,Et.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_array,Et.prototype._setValue_array_setNeedsUpdate,Et.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_arrayElement,Et.prototype._setValue_arrayElement_setNeedsUpdate,Et.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_fromArray,Et.prototype._setValue_fromArray_setNeedsUpdate,Et.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ll=class{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;let r=t.tracks,o=r.length,a=new Array(o),l={endingStart:Is,endingEnd:Is};for(let c=0;c!==o;++c){let u=r[c].createInterpolant(null);a[c]=u,u.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Cp,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let s=this._clip.duration,r=e._clip.duration,o=r/s,a=s/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let s=this._mixer,r=s.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=s._lendControlInterpolant(),this._timeScaleInterpolant=a);let l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Ip:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(o),c[u].accumulateAdditive(a);break;case Ic:default:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(o),c[u].accumulate(s,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,s=this.time+e,r=this._loopCount,o=n===Pp;if(e===0)return r===-1?s:o&&(r&1)===1?t-s:s;if(n===Rp){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),s>=t||s<0){let a=Math.floor(s/t);s-=t*a,r+=Math.abs(a);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=s;if(o&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){let s=this._interpolantSettings;n?(s.endingStart=Ls,s.endingEnd=Ls):(e?s.endingStart=this.zeroSlopeAtStart?Ls:Is:s.endingStart=Ro,t?s.endingEnd=this.zeroSlopeAtEnd?Ls:Is:s.endingEnd=Ro)}_scheduleFading(e,t,n){let s=this._mixer,r=s.time,o=this._weightInterpolant;o===null&&(o=s._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=n,this}},Q0=new Float32Array(1),Ys=class extends gi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,u=c[l];u===void 0&&(u={},c[l]=u);for(let h=0;h!==r;++h){let d=s[h],f=d.name,g=u[f];if(g!==void 0)++g.referenceCount,o[h]=g;else{if(g=o[h],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,f));continue}let x=t&&t._propertyBindings[h].binding.parsedPath;g=new Il(Et.create(n,f,x),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,f),o[h]=g}a[h].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let s=this._actions,r=this._actionsByClip,o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=s.length,s.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;let h=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete h[d],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let s=this._bindingsByRootAndName,r=this._bindings,o=s[t];o===void 0&&(o={},s[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[s],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[s]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new Yo(new Float32Array(2),new Float32Array(2),1,Q0),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let s=t||this._root,r=s.uuid,o=typeof e=="string"?Gs.findByName(s,e):e,a=o!==null?o.uuid:e,l=this._actionsByClip[a],c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Ic),l!==void 0){let h=l.actionByRoot[r];if(h!==void 0&&h.blendMode===n)return h;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;let u=new Ll(this,o,t,n);return this._bindAction(u,c),this._addInactiveAction(u,a,r),u}existingAction(e,t){let n=t||this._root,s=n.uuid,r=typeof e=="string"?Gs.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(s,e,r,o);let a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){let o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){let c=o[a];this._deactivateAction(c);let u=c._cacheIndex,h=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(c)}delete s[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var ip=new Ye,$o=class{constructor(e,t,n=0,s=1/0){this.ray=new as(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Fr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ip.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ip),this}intersectObject(e,t=!0,n=[]){return lh(e,this,n,t),n.sort(sp),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)lh(e[s],this,n,t);return n.sort(sp),n}};function sp(i,e){return i.distance-e.distance}function lh(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)lh(r[o],e,t,!0)}}function Ch(i,e,t,n){let s=$0(n);switch(t){case yh:return i*e;case $l:return i*e/s.components*s.byteLength;case ec:return i*e/s.components*s.byteLength;case _h:return i*e*2/s.components*s.byteLength;case tc:return i*e*2/s.components*s.byteLength;case vh:return i*e*3/s.components*s.byteLength;case On:return i*e*4/s.components*s.byteLength;case nc:return i*e*4/s.components*s.byteLength;case na:case ia:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case sa:case ra:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case sc:case oc:return Math.max(i,16)*Math.max(e,8)/4;case ic:case rc:return Math.max(i,8)*Math.max(e,8)/2;case ac:case lc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case cc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case uc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case hc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case dc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case fc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case pc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case mc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case gc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case xc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case yc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case vc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case _c:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case bc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Mc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case wc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Sc:case Ec:case Tc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ac:case Rc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Cc:case Pc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function $0(i){switch(i){case ri:case ph:return{byteLength:1,components:1};case qr:case mh:case vn:return{byteLength:2,components:1};case Jl:case Ql:return{byteLength:2,components:4};case ds:case Kl:case Gn:return{byteLength:4,components:1};case gh:case xh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function gm(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function tx(i){let e=new WeakMap;function t(a,l){let c=a.array,u=a.usage,h=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){let u=l.array,h=l.updateRanges;if(i.bindBuffer(c,a),h.length===0)i.bufferSubData(c,0,u);else{h.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<h.length;f++){let g=h[d],x=h[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,h[d]=x)}h.length=d+1;for(let f=0,g=h.length;f<g;f++){let x=h[f];i.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var nx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ix=`#ifdef USE_ALPHAHASH
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
#endif`,sx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,rx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ox=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ax=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,lx=`#ifdef USE_AOMAP
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
#endif`,cx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ux=`#ifdef USE_BATCHING
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
#endif`,hx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,dx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,fx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,px=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,mx=`#ifdef USE_IRIDESCENCE
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
#endif`,gx=`#ifdef USE_BUMPMAP
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
#endif`,xx=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,yx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_x=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Mx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,wx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Sx=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ex=`#define PI 3.141592653589793
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
} // validated`,Tx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ax=`vec3 transformedNormal = objectNormal;
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
#endif`,Rx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Px=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ix=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Lx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Dx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Nx=`#ifdef USE_ENVMAP
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
#endif`,Ox=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ux=`#ifdef USE_ENVMAP
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
#endif`,Fx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Bx=`#ifdef USE_ENVMAP
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
#endif`,kx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Hx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vx=`#ifdef USE_GRADIENTMAP
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
}`,Wx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Xx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yx=`uniform bool receiveShadow;
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
#endif`,jx=`#ifdef USE_ENVMAP
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
#endif`,Zx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Kx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Jx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Qx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,$x=`PhysicalMaterial material;
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
#endif`,ey=`struct PhysicalMaterial {
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
}`,ty=`
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
#endif`,ny=`#if defined( RE_IndirectDiffuse )
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
#endif`,iy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,sy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ry=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,oy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ay=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ly=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,uy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,hy=`#if defined( USE_POINTS_UV )
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
#endif`,dy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,py=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,my=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xy=`#ifdef USE_MORPHTARGETS
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
#endif`,yy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,_y=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,by=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,My=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Sy=`#ifdef USE_NORMALMAP
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
#endif`,Ey=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ty=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ay=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ry=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Cy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Py=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Iy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ly=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Dy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ny=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Oy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Uy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,By=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ky=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Hy=`float getShadowMask() {
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
}`,zy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gy=`#ifdef USE_SKINNING
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
#endif`,Vy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Wy=`#ifdef USE_SKINNING
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
#endif`,Xy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Yy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,jy=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zy=`#ifdef USE_TRANSMISSION
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
#endif`,Ky=`#ifdef USE_TRANSMISSION
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
#endif`,Jy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$y=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ev=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,tv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nv=`uniform sampler2D t2D;
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
}`,iv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,rv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ov=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,av=`#include <common>
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
}`,lv=`#if DEPTH_PACKING == 3200
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
}`,cv=`#define DISTANCE
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
}`,uv=`#define DISTANCE
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
}`,hv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,dv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fv=`uniform float scale;
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
}`,pv=`uniform vec3 diffuse;
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
}`,mv=`#include <common>
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
}`,gv=`uniform vec3 diffuse;
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
}`,xv=`#define LAMBERT
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
}`,yv=`#define LAMBERT
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
}`,vv=`#define MATCAP
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
}`,_v=`#define MATCAP
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
}`,bv=`#define NORMAL
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
}`,Mv=`#define NORMAL
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
}`,wv=`#define PHONG
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
}`,Sv=`#define PHONG
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
}`,Ev=`#define STANDARD
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
}`,Tv=`#define STANDARD
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
}`,Av=`#define TOON
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
}`,Rv=`#define TOON
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
}`,Cv=`uniform float size;
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
}`,Pv=`uniform vec3 diffuse;
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
}`,Iv=`#include <common>
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
}`,Lv=`uniform vec3 color;
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
}`,Dv=`uniform float rotation;
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
}`,Nv=`uniform vec3 diffuse;
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
}`,nt={alphahash_fragment:nx,alphahash_pars_fragment:ix,alphamap_fragment:sx,alphamap_pars_fragment:rx,alphatest_fragment:ox,alphatest_pars_fragment:ax,aomap_fragment:lx,aomap_pars_fragment:cx,batching_pars_vertex:ux,batching_vertex:hx,begin_vertex:dx,beginnormal_vertex:fx,bsdfs:px,iridescence_fragment:mx,bumpmap_pars_fragment:gx,clipping_planes_fragment:xx,clipping_planes_pars_fragment:yx,clipping_planes_pars_vertex:vx,clipping_planes_vertex:_x,color_fragment:bx,color_pars_fragment:Mx,color_pars_vertex:wx,color_vertex:Sx,common:Ex,cube_uv_reflection_fragment:Tx,defaultnormal_vertex:Ax,displacementmap_pars_vertex:Rx,displacementmap_vertex:Cx,emissivemap_fragment:Px,emissivemap_pars_fragment:Ix,colorspace_fragment:Lx,colorspace_pars_fragment:Dx,envmap_fragment:Nx,envmap_common_pars_fragment:Ox,envmap_pars_fragment:Ux,envmap_pars_vertex:Fx,envmap_physical_pars_fragment:jx,envmap_vertex:Bx,fog_vertex:kx,fog_pars_vertex:Hx,fog_fragment:zx,fog_pars_fragment:Gx,gradientmap_pars_fragment:Vx,lightmap_pars_fragment:Wx,lights_lambert_fragment:Xx,lights_lambert_pars_fragment:qx,lights_pars_begin:Yx,lights_toon_fragment:Zx,lights_toon_pars_fragment:Kx,lights_phong_fragment:Jx,lights_phong_pars_fragment:Qx,lights_physical_fragment:$x,lights_physical_pars_fragment:ey,lights_fragment_begin:ty,lights_fragment_maps:ny,lights_fragment_end:iy,logdepthbuf_fragment:sy,logdepthbuf_pars_fragment:ry,logdepthbuf_pars_vertex:oy,logdepthbuf_vertex:ay,map_fragment:ly,map_pars_fragment:cy,map_particle_fragment:uy,map_particle_pars_fragment:hy,metalnessmap_fragment:dy,metalnessmap_pars_fragment:fy,morphinstance_vertex:py,morphcolor_vertex:my,morphnormal_vertex:gy,morphtarget_pars_vertex:xy,morphtarget_vertex:yy,normal_fragment_begin:vy,normal_fragment_maps:_y,normal_pars_fragment:by,normal_pars_vertex:My,normal_vertex:wy,normalmap_pars_fragment:Sy,clearcoat_normal_fragment_begin:Ey,clearcoat_normal_fragment_maps:Ty,clearcoat_pars_fragment:Ay,iridescence_pars_fragment:Ry,opaque_fragment:Cy,packing:Py,premultiplied_alpha_fragment:Iy,project_vertex:Ly,dithering_fragment:Dy,dithering_pars_fragment:Ny,roughnessmap_fragment:Oy,roughnessmap_pars_fragment:Uy,shadowmap_pars_fragment:Fy,shadowmap_pars_vertex:By,shadowmap_vertex:ky,shadowmask_pars_fragment:Hy,skinbase_vertex:zy,skinning_pars_vertex:Gy,skinning_vertex:Vy,skinnormal_vertex:Wy,specularmap_fragment:Xy,specularmap_pars_fragment:qy,tonemapping_fragment:Yy,tonemapping_pars_fragment:jy,transmission_fragment:Zy,transmission_pars_fragment:Ky,uv_pars_fragment:Jy,uv_pars_vertex:Qy,uv_vertex:$y,worldpos_vertex:ev,background_vert:tv,background_frag:nv,backgroundCube_vert:iv,backgroundCube_frag:sv,cube_vert:rv,cube_frag:ov,depth_vert:av,depth_frag:lv,distanceRGBA_vert:cv,distanceRGBA_frag:uv,equirect_vert:hv,equirect_frag:dv,linedashed_vert:fv,linedashed_frag:pv,meshbasic_vert:mv,meshbasic_frag:gv,meshlambert_vert:xv,meshlambert_frag:yv,meshmatcap_vert:vv,meshmatcap_frag:_v,meshnormal_vert:bv,meshnormal_frag:Mv,meshphong_vert:wv,meshphong_frag:Sv,meshphysical_vert:Ev,meshphysical_frag:Tv,meshtoon_vert:Av,meshtoon_frag:Rv,points_vert:Cv,points_frag:Pv,shadow_vert:Iv,shadow_frag:Lv,sprite_vert:Dv,sprite_frag:Nv},me={common:{diffuse:{value:new we(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new we(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new we(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new we(16777215)},opacity:{value:1},center:{value:new be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},Si={basic:{uniforms:fn([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:nt.meshbasic_vert,fragmentShader:nt.meshbasic_frag},lambert:{uniforms:fn([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new we(0)}}]),vertexShader:nt.meshlambert_vert,fragmentShader:nt.meshlambert_frag},phong:{uniforms:fn([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new we(0)},specular:{value:new we(1118481)},shininess:{value:30}}]),vertexShader:nt.meshphong_vert,fragmentShader:nt.meshphong_frag},standard:{uniforms:fn([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new we(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag},toon:{uniforms:fn([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new we(0)}}]),vertexShader:nt.meshtoon_vert,fragmentShader:nt.meshtoon_frag},matcap:{uniforms:fn([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:nt.meshmatcap_vert,fragmentShader:nt.meshmatcap_frag},points:{uniforms:fn([me.points,me.fog]),vertexShader:nt.points_vert,fragmentShader:nt.points_frag},dashed:{uniforms:fn([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:nt.linedashed_vert,fragmentShader:nt.linedashed_frag},depth:{uniforms:fn([me.common,me.displacementmap]),vertexShader:nt.depth_vert,fragmentShader:nt.depth_frag},normal:{uniforms:fn([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:nt.meshnormal_vert,fragmentShader:nt.meshnormal_frag},sprite:{uniforms:fn([me.sprite,me.fog]),vertexShader:nt.sprite_vert,fragmentShader:nt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:nt.background_vert,fragmentShader:nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:nt.backgroundCube_vert,fragmentShader:nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:nt.cube_vert,fragmentShader:nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:nt.equirect_vert,fragmentShader:nt.equirect_frag},distanceRGBA:{uniforms:fn([me.common,me.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:nt.distanceRGBA_vert,fragmentShader:nt.distanceRGBA_frag},shadow:{uniforms:fn([me.lights,me.fog,{color:{value:new we(0)},opacity:{value:1}}]),vertexShader:nt.shadow_vert,fragmentShader:nt.shadow_frag}};Si.physical={uniforms:fn([Si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new we(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new we(0)},specularColor:{value:new we(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag};var Lc={r:0,b:0,g:0},Qs=new Nn,Ov=new Ye;function Uv(i,e,t,n,s,r,o){let a=new we(0),l=r===!0?0:1,c,u,h=null,d=0,f=null;function g(M){let v=M.isScene===!0?M.background:null;return v&&v.isTexture&&(v=(M.backgroundBlurriness>0?t:e).get(v)),v}function x(M){let v=!1,T=g(M);T===null?p(a,l):T&&T.isColor&&(p(T,1),v=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(M,v){let T=g(v);T&&(T.isCubeTexture||T.mapping===ta)?(u===void 0&&(u=new D(new Se(1,1,1),new Ot({name:"BackgroundCubeMaterial",uniforms:Js(Si.backgroundCube.uniforms),vertexShader:Si.backgroundCube.vertexShader,fragmentShader:Si.backgroundCube.fragmentShader,side:nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,R,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Qs.copy(v.backgroundRotation),Qs.x*=-1,Qs.y*=-1,Qs.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Qs.y*=-1,Qs.z*=-1),u.material.uniforms.envMap.value=T,u.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Ov.makeRotationFromEuler(Qs)),u.material.toneMapped=it.getTransfer(T.colorSpace)!==pt,(h!==T||d!==T.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=T,d=T.version,f=i.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new D(new tt(2,2),new Ot({name:"BackgroundMaterial",uniforms:Js(Si.background.uniforms),vertexShader:Si.background.vertexShader,fragmentShader:Si.background.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=it.getTransfer(T.colorSpace)!==pt,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(h!==T||d!==T.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=T,d=T.version,f=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,v){M.getRGB(Lc,Th(i)),n.buffers.color.setClear(Lc.r,Lc.g,Lc.b,v,o)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,v=1){a.set(M),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,p(a,l)},render:x,addToRenderList:m,dispose:b}}function Fv(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(_,P,O,z,G){let Q=!1,Z=h(z,O,P);r!==Z&&(r=Z,c(r.object)),Q=f(_,z,O,G),Q&&g(_,z,O,G),G!==null&&e.update(G,i.ELEMENT_ARRAY_BUFFER),(Q||o)&&(o=!1,v(_,P,O,z),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return i.createVertexArray()}function c(_){return i.bindVertexArray(_)}function u(_){return i.deleteVertexArray(_)}function h(_,P,O){let z=O.wireframe===!0,G=n[_.id];G===void 0&&(G={},n[_.id]=G);let Q=G[P.id];Q===void 0&&(Q={},G[P.id]=Q);let Z=Q[z];return Z===void 0&&(Z=d(l()),Q[z]=Z),Z}function d(_){let P=[],O=[],z=[];for(let G=0;G<t;G++)P[G]=0,O[G]=0,z[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:O,attributeDivisors:z,object:_,attributes:{},index:null}}function f(_,P,O,z){let G=r.attributes,Q=P.attributes,Z=0,re=O.getAttributes();for(let X in re)if(re[X].location>=0){let ge=G[X],Re=Q[X];if(Re===void 0&&(X==="instanceMatrix"&&_.instanceMatrix&&(Re=_.instanceMatrix),X==="instanceColor"&&_.instanceColor&&(Re=_.instanceColor)),ge===void 0||ge.attribute!==Re||Re&&ge.data!==Re.data)return!0;Z++}return r.attributesNum!==Z||r.index!==z}function g(_,P,O,z){let G={},Q=P.attributes,Z=0,re=O.getAttributes();for(let X in re)if(re[X].location>=0){let ge=Q[X];ge===void 0&&(X==="instanceMatrix"&&_.instanceMatrix&&(ge=_.instanceMatrix),X==="instanceColor"&&_.instanceColor&&(ge=_.instanceColor));let Re={};Re.attribute=ge,ge&&ge.data&&(Re.data=ge.data),G[X]=Re,Z++}r.attributes=G,r.attributesNum=Z,r.index=z}function x(){let _=r.newAttributes;for(let P=0,O=_.length;P<O;P++)_[P]=0}function m(_){p(_,0)}function p(_,P){let O=r.newAttributes,z=r.enabledAttributes,G=r.attributeDivisors;O[_]=1,z[_]===0&&(i.enableVertexAttribArray(_),z[_]=1),G[_]!==P&&(i.vertexAttribDivisor(_,P),G[_]=P)}function b(){let _=r.newAttributes,P=r.enabledAttributes;for(let O=0,z=P.length;O<z;O++)P[O]!==_[O]&&(i.disableVertexAttribArray(O),P[O]=0)}function M(_,P,O,z,G,Q,Z){Z===!0?i.vertexAttribIPointer(_,P,O,G,Q):i.vertexAttribPointer(_,P,O,z,G,Q)}function v(_,P,O,z){x();let G=z.attributes,Q=O.getAttributes(),Z=P.defaultAttributeValues;for(let re in Q){let X=Q[re];if(X.location>=0){let he=G[re];if(he===void 0&&(re==="instanceMatrix"&&_.instanceMatrix&&(he=_.instanceMatrix),re==="instanceColor"&&_.instanceColor&&(he=_.instanceColor)),he!==void 0){let ge=he.normalized,Re=he.itemSize,qe=e.get(he);if(qe===void 0)continue;let ct=qe.buffer,ut=qe.type,$e=qe.bytesPerElement,$=ut===i.INT||ut===i.UNSIGNED_INT||he.gpuType===Kl;if(he.isInterleavedBufferAttribute){let se=he.data,xe=se.stride,Be=he.offset;if(se.isInstancedInterleavedBuffer){for(let Ce=0;Ce<X.locationSize;Ce++)p(X.location+Ce,se.meshPerAttribute);_.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Ce=0;Ce<X.locationSize;Ce++)m(X.location+Ce);i.bindBuffer(i.ARRAY_BUFFER,ct);for(let Ce=0;Ce<X.locationSize;Ce++)M(X.location+Ce,Re/X.locationSize,ut,ge,xe*$e,(Be+Re/X.locationSize*Ce)*$e,$)}else{if(he.isInstancedBufferAttribute){for(let se=0;se<X.locationSize;se++)p(X.location+se,he.meshPerAttribute);_.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let se=0;se<X.locationSize;se++)m(X.location+se);i.bindBuffer(i.ARRAY_BUFFER,ct);for(let se=0;se<X.locationSize;se++)M(X.location+se,Re/X.locationSize,ut,ge,Re*$e,Re/X.locationSize*se*$e,$)}}else if(Z!==void 0){let ge=Z[re];if(ge!==void 0)switch(ge.length){case 2:i.vertexAttrib2fv(X.location,ge);break;case 3:i.vertexAttrib3fv(X.location,ge);break;case 4:i.vertexAttrib4fv(X.location,ge);break;default:i.vertexAttrib1fv(X.location,ge)}}}}b()}function T(){I();for(let _ in n){let P=n[_];for(let O in P){let z=P[O];for(let G in z)u(z[G].object),delete z[G];delete P[O]}delete n[_]}}function A(_){if(n[_.id]===void 0)return;let P=n[_.id];for(let O in P){let z=P[O];for(let G in z)u(z[G].object),delete z[G];delete P[O]}delete n[_.id]}function R(_){for(let P in n){let O=n[P];if(O[_.id]===void 0)continue;let z=O[_.id];for(let G in z)u(z[G].object),delete z[G];delete O[_.id]}}function I(){w(),o=!0,r!==s&&(r=s,c(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:I,resetDefaultState:w,dispose:T,releaseStatesOfGeometry:A,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:m,disableUnusedAttributes:b}}function Bv(i,e,t){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,h){h!==0&&(i.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function a(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let f=0;for(let g=0;g<h;g++)f+=u[g];t.update(f,n,1)}function l(c,u,h,d){if(h===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],u[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,d,0,h);let g=0;for(let x=0;x<h;x++)g+=u[x]*d[x];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function kv(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==On&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let I=R===vn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==ri&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Gn&&!I)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=g>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:M,maxFragmentUniforms:v,vertexTextures:T,maxSamples:A}}function Hv(i){let e=this,t=null,n=0,s=!1,r=!1,o=new Hn,a=new Ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let f=h.length!==0||d||n!==0||s;return s=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){let g=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{let b=r?0:n,M=b*4,v=p.clippingState||null;l.value=v,v=u(g,d,M,f);for(let T=0;T!==M;++T)v[T]=t[T];p.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,g){let x=h!==null?h.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let p=f+x*4,b=d.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,v=f;M!==x;++M,v+=4)o.copy(h[M]).applyMatrix4(b,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function zv(i){let e=new WeakMap;function t(o,a){return a===Yl?o.mapping=js:a===jl&&(o.mapping=Zs),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Yl||a===jl)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new _l(l.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Qr=4,Yp=[.125,.215,.35,.446,.526,.582],tr=20,Ph=new Xi,jp=new we,Ih=null,Lh=0,Dh=0,Nh=!1,er=(1+Math.sqrt(5))/2,Jr=1/er,Zp=[new L(-er,Jr,0),new L(er,Jr,0),new L(-Jr,0,er),new L(Jr,0,er),new L(0,er,-Jr),new L(0,er,Jr),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],Gv=new L,Oc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=Gv}=r;Ih=this._renderer.getRenderTarget(),Lh=this._renderer.getActiveCubeFace(),Dh=this._renderer.getActiveMipmapLevel(),Nh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Jp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ih,Lh,Dh),this._renderer.xr.enabled=Nh,e.scissorTest=!1,Dc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===js||e.mapping===Zs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ih=this._renderer.getRenderTarget(),Lh=this._renderer.getActiveCubeFace(),Dh=this._renderer.getActiveMipmapLevel(),Nh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:an,minFilter:an,generateMipmaps:!1,type:vn,format:On,colorSpace:ln,depthBuffer:!1},s=Kp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Kp(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Vv(r)),this._blurMaterial=Wv(r,e,t)}return s}_compileMaterial(e){let t=new D(this._lodPlanes[0],e);this._renderer.compile(t,Ph)}_sceneToCubeUV(e,t,n,s,r){let l=new Xt(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(jp),h.toneMapping=Yi,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null));let x=new Pt({name:"PMREM.Background",side:nn,depthWrite:!1,depthTest:!1}),m=new D(new Se,x),p=!1,b=e.background;b?b.isColor&&(x.color.copy(b),e.background=null,p=!0):(x.color.copy(jp),p=!0);for(let M=0;M<6;M++){let v=M%3;v===0?(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[M],r.y,r.z)):v===1?(l.up.set(0,0,c[M]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[M],r.z)):(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[M]));let T=this._cubeSize;Dc(s,v*T,M>2?T:0,T,T),h.setRenderTarget(s),p&&h.render(m,l),h.render(e,l)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=f,h.autoClear=d,e.background=b}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===js||e.mapping===Zs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Jp());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new D(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;Dc(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Ph)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Zp[(s-r-1)%Zp.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new D(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*tr-1),x=r/g,m=isFinite(r)?1+Math.floor(u*x):tr;m>tr&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${tr}`);let p=[],b=0;for(let R=0;R<tr;++R){let I=R/x,w=Math.exp(-I*I/2);p.push(w),R===0?b+=w:R<m&&(b+=2*w)}for(let R=0;R<p.length;R++)p[R]=p[R]/b;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:M}=this;d.dTheta.value=g,d.mipInt.value=M-n;let v=this._sizeLods[s],T=3*v*(s>M-Qr?s-M+Qr:0),A=4*(this._cubeSize-v);Dc(t,T,A,3*v,2*v),l.setRenderTarget(t),l.render(h,Ph)}};function Vv(i){let e=[],t=[],n=[],s=i,r=i-Qr+1+Yp.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);t.push(a);let l=1/a;o>i-Qr?l=Yp[o-i+Qr-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,x=3,m=2,p=1,b=new Float32Array(x*g*f),M=new Float32Array(m*g*f),v=new Float32Array(p*g*f);for(let A=0;A<f;A++){let R=A%3*2/3-1,I=A>2?0:-1,w=[R,I,0,R+2/3,I,0,R+2/3,I+1,0,R,I,0,R+2/3,I+1,0,R,I+1,0];b.set(w,x*g*A),M.set(d,m*g*A);let _=[A,A,A,A,A,A];v.set(_,p*g*A)}let T=new Nt;T.setAttribute("position",new kt(b,x)),T.setAttribute("uv",new kt(M,m)),T.setAttribute("faceIndex",new kt(v,p)),e.push(T),s>Qr&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Kp(i,e,t){let n=new Zt(i,e,t);return n.texture.mapping=ta,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Dc(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Wv(i,e,t){let n=new Float32Array(tr),s=new L(0,1,0);return new Ot({name:"SphericalGaussianBlur",defines:{n:tr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Wh(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Jp(){return new Ot({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wh(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Qp(){return new Ot({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Wh(){return`

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
	`}function Xv(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===Yl||l===jl,u=l===js||l===Zs;if(c||u){let h=e.get(a),d=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Oc(i)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{let f=a.image;return c&&f&&f.height>0||u&&f&&s(f)?(t===null&&(t=new Oc(i)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let l=0,c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function qv(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Or("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Yv(i,e,t,n){let s={},r=new WeakMap;function o(h){let d=h.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete s[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(h,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function l(h){let d=h.attributes;for(let f in d)e.update(d[f],i.ARRAY_BUFFER)}function c(h){let d=[],f=h.index,g=h.attributes.position,x=0;if(f!==null){let b=f.array;x=f.version;for(let M=0,v=b.length;M<v;M+=3){let T=b[M+0],A=b[M+1],R=b[M+2];d.push(T,A,A,R,R,T)}}else if(g!==void 0){let b=g.array;x=g.version;for(let M=0,v=b.length/3-1;M<v;M+=3){let T=M+0,A=M+1,R=M+2;d.push(T,A,A,R,R,T)}}else return;let m=new(Eh(d)?Do:Lo)(d,1);m.version=x;let p=r.get(h);p&&e.remove(p),r.set(h,m)}function u(h){let d=r.get(h);if(d){let f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function jv(i,e,t){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*o),t.update(f,n,1)}function c(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),t.update(f,n,g))}function u(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function h(d,f,g,x){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,x,0,g);let p=0;for(let b=0;b<g;b++)p+=f[b]*x[b];t.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Zv(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Kv(i,e,t){let n=new WeakMap,s=new dt;function r(o,a,l){let c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0,d=n.get(a);if(d===void 0||d.count!==h){let w=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",w)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],b=a.morphAttributes.color||[],M=0;f===!0&&(M=1),g===!0&&(M=2),x===!0&&(M=3);let v=a.attributes.position.count*M,T=1;v>e.maxTextureSize&&(T=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let A=new Float32Array(v*T*4*h),R=new Io(A,v,T,h);R.type=Gn,R.needsUpdate=!0;let I=M*4;for(let _=0;_<h;_++){let P=m[_],O=p[_],z=b[_],G=v*T*4*_;for(let Q=0;Q<P.count;Q++){let Z=Q*I;f===!0&&(s.fromBufferAttribute(P,Q),A[G+Z+0]=s.x,A[G+Z+1]=s.y,A[G+Z+2]=s.z,A[G+Z+3]=0),g===!0&&(s.fromBufferAttribute(O,Q),A[G+Z+4]=s.x,A[G+Z+5]=s.y,A[G+Z+6]=s.z,A[G+Z+7]=0),x===!0&&(s.fromBufferAttribute(z,Q),A[G+Z+8]=s.x,A[G+Z+9]=s.y,A[G+Z+10]=s.z,A[G+Z+11]=z.itemSize===4?s.w:1)}}d={count:h,texture:R,size:new be(v,T)},n.set(a,d),a.addEventListener("dispose",w)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Jv(i,e,t,n){let s=new WeakMap;function r(l){let c=n.render.frame,u=l.geometry,h=e.get(l,u);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return h}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}var xm=new Gt,$p=new Vo(1,1),ym=new Io,vm=new yl,_m=new Oo,em=[],tm=[],nm=new Float32Array(16),im=new Float32Array(9),sm=new Float32Array(4);function eo(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=em[s];if(r===void 0&&(r=new Float32Array(s),em[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Kt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Jt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Fc(i,e){let t=tm[e];t===void 0&&(t=new Int32Array(e),tm[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Qv(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function $v(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;i.uniform2fv(this.addr,e),Jt(t,e)}}function e_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Kt(t,e))return;i.uniform3fv(this.addr,e),Jt(t,e)}}function t_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;i.uniform4fv(this.addr,e),Jt(t,e)}}function n_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Jt(t,e)}else{if(Kt(t,n))return;sm.set(n),i.uniformMatrix2fv(this.addr,!1,sm),Jt(t,n)}}function i_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Jt(t,e)}else{if(Kt(t,n))return;im.set(n),i.uniformMatrix3fv(this.addr,!1,im),Jt(t,n)}}function s_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Jt(t,e)}else{if(Kt(t,n))return;nm.set(n),i.uniformMatrix4fv(this.addr,!1,nm),Jt(t,n)}}function r_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function o_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;i.uniform2iv(this.addr,e),Jt(t,e)}}function a_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Kt(t,e))return;i.uniform3iv(this.addr,e),Jt(t,e)}}function l_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;i.uniform4iv(this.addr,e),Jt(t,e)}}function c_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function u_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;i.uniform2uiv(this.addr,e),Jt(t,e)}}function h_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Kt(t,e))return;i.uniform3uiv(this.addr,e),Jt(t,e)}}function d_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;i.uniform4uiv(this.addr,e),Jt(t,e)}}function f_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?($p.compareFunction=Mh,r=$p):r=xm,t.setTexture2D(e||r,s)}function p_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||vm,s)}function m_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||_m,s)}function g_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||ym,s)}function x_(i){switch(i){case 5126:return Qv;case 35664:return $v;case 35665:return e_;case 35666:return t_;case 35674:return n_;case 35675:return i_;case 35676:return s_;case 5124:case 35670:return r_;case 35667:case 35671:return o_;case 35668:case 35672:return a_;case 35669:case 35673:return l_;case 5125:return c_;case 36294:return u_;case 36295:return h_;case 36296:return d_;case 35678:case 36198:case 36298:case 36306:case 35682:return f_;case 35679:case 36299:case 36307:return p_;case 35680:case 36300:case 36308:case 36293:return m_;case 36289:case 36303:case 36311:case 36292:return g_}}function y_(i,e){i.uniform1fv(this.addr,e)}function v_(i,e){let t=eo(e,this.size,2);i.uniform2fv(this.addr,t)}function __(i,e){let t=eo(e,this.size,3);i.uniform3fv(this.addr,t)}function b_(i,e){let t=eo(e,this.size,4);i.uniform4fv(this.addr,t)}function M_(i,e){let t=eo(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function w_(i,e){let t=eo(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function S_(i,e){let t=eo(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function E_(i,e){i.uniform1iv(this.addr,e)}function T_(i,e){i.uniform2iv(this.addr,e)}function A_(i,e){i.uniform3iv(this.addr,e)}function R_(i,e){i.uniform4iv(this.addr,e)}function C_(i,e){i.uniform1uiv(this.addr,e)}function P_(i,e){i.uniform2uiv(this.addr,e)}function I_(i,e){i.uniform3uiv(this.addr,e)}function L_(i,e){i.uniform4uiv(this.addr,e)}function D_(i,e,t){let n=this.cache,s=e.length,r=Fc(t,s);Kt(n,r)||(i.uniform1iv(this.addr,r),Jt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||xm,r[o])}function N_(i,e,t){let n=this.cache,s=e.length,r=Fc(t,s);Kt(n,r)||(i.uniform1iv(this.addr,r),Jt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||vm,r[o])}function O_(i,e,t){let n=this.cache,s=e.length,r=Fc(t,s);Kt(n,r)||(i.uniform1iv(this.addr,r),Jt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||_m,r[o])}function U_(i,e,t){let n=this.cache,s=e.length,r=Fc(t,s);Kt(n,r)||(i.uniform1iv(this.addr,r),Jt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||ym,r[o])}function F_(i){switch(i){case 5126:return y_;case 35664:return v_;case 35665:return __;case 35666:return b_;case 35674:return M_;case 35675:return w_;case 35676:return S_;case 5124:case 35670:return E_;case 35667:case 35671:return T_;case 35668:case 35672:return A_;case 35669:case 35673:return R_;case 5125:return C_;case 36294:return P_;case 36295:return I_;case 36296:return L_;case 35678:case 36198:case 36298:case 36306:case 35682:return D_;case 35679:case 36299:case 36307:return N_;case 35680:case 36300:case 36308:case 36293:return O_;case 36289:case 36303:case 36311:case 36292:return U_}}var Uh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=x_(t.type)}},Fh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=F_(t.type)}},Bh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},Oh=/(\w+)(\])?(\[|\.)?/g;function rm(i,e){i.seq.push(e),i.map[e.id]=e}function B_(i,e,t){let n=i.name,s=n.length;for(Oh.lastIndex=0;;){let r=Oh.exec(n),o=Oh.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){rm(t,c===void 0?new Uh(a,i,e):new Fh(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new Bh(a),rm(t,h)),t=h}}}var $r=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);B_(r,o,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function om(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var k_=37297,H_=0;function z_(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var am=new Ke;function G_(i){it._getMatrix(am,it.workingColorSpace,i);let e=`mat3( ${am.elements.map(t=>t.toFixed(4))} )`;switch(it.getTransfer(i)){case Co:return[e,"LinearTransferOETF"];case pt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function lm(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+z_(i.getShaderSource(e),a)}else return r}function V_(i,e){let t=G_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function W_(i,e){let t;switch(e){case zl:t="Linear";break;case Gl:t="Reinhard";break;case Vl:t="Cineon";break;case Wr:t="ACESFilmic";break;case Xl:t="AgX";break;case ql:t="Neutral";break;case Wl:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Nc=new L;function X_(){it.getLuminanceCoefficients(Nc);let i=Nc.x.toFixed(4),e=Nc.y.toFixed(4),t=Nc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function q_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ca).join(`
`)}function Y_(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function j_(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function ca(i){return i!==""}function cm(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function um(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Z_=/^[ \t]*#include +<([\w\d./]+)>/gm;function kh(i){return i.replace(Z_,J_)}var K_=new Map;function J_(i,e){let t=nt[e];if(t===void 0){let n=K_.get(e);if(n!==void 0)t=nt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return kh(t)}var Q_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function hm(i){return i.replace(Q_,$_)}function $_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function dm(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function eb(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===uh?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Dl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Mi&&(e="SHADOWMAP_TYPE_VSM"),e}function tb(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case js:case Zs:e="ENVMAP_TYPE_CUBE";break;case ta:e="ENVMAP_TYPE_CUBE_UV";break}return e}function nb(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Zs&&(e="ENVMAP_MODE_REFRACTION"),e}function ib(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ea:e="ENVMAP_BLENDING_MULTIPLY";break;case Ep:e="ENVMAP_BLENDING_MIX";break;case Tp:e="ENVMAP_BLENDING_ADD";break}return e}function sb(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function rb(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=eb(t),c=tb(t),u=nb(t),h=ib(t),d=sb(t),f=q_(t),g=Y_(r),x=s.createProgram(),m,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ca).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ca).join(`
`),p.length>0&&(p+=`
`)):(m=[dm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ca).join(`
`),p=[dm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Yi?"#define TONE_MAPPING":"",t.toneMapping!==Yi?nt.tonemapping_pars_fragment:"",t.toneMapping!==Yi?W_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",nt.colorspace_pars_fragment,V_("linearToOutputTexel",t.outputColorSpace),X_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ca).join(`
`)),o=kh(o),o=cm(o,t),o=um(o,t),a=kh(a),a=cm(a,t),a=um(a,t),o=hm(o),a=hm(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===wh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===wh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let M=b+m+o,v=b+p+a,T=om(s,s.VERTEX_SHADER,M),A=om(s,s.FRAGMENT_SHADER,v);s.attachShader(x,T),s.attachShader(x,A),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function R(P){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(x)||"",z=s.getShaderInfoLog(T)||"",G=s.getShaderInfoLog(A)||"",Q=O.trim(),Z=z.trim(),re=G.trim(),X=!0,he=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,T,A);else{let ge=lm(s,T,"vertex"),Re=lm(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+Q+`
`+ge+`
`+Re)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(Z===""||re==="")&&(he=!1);he&&(P.diagnostics={runnable:X,programLog:Q,vertexShader:{log:Z,prefix:m},fragmentShader:{log:re,prefix:p}})}s.deleteShader(T),s.deleteShader(A),I=new $r(s,x),w=j_(s,x)}let I;this.getUniforms=function(){return I===void 0&&R(this),I};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(x,k_)),_},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=H_++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=A,this}var ob=0,Hh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new zh(e),t.set(e,n)),n}},zh=class{constructor(e){this.id=ob++,this.code=e,this.usedTimes=0}};function ab(i,e,t,n,s,r,o){let a=new Fr,l=new Hh,c=new Set,u=[],h=s.logarithmicDepthBuffer,d=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,_,P,O,z){let G=O.fog,Q=z.geometry,Z=w.isMeshStandardMaterial?O.environment:null,re=(w.isMeshStandardMaterial?t:e).get(w.envMap||Z),X=re&&re.mapping===ta?re.image.height:null,he=g[w.type];w.precision!==null&&(f=s.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));let ge=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Re=ge!==void 0?ge.length:0,qe=0;Q.morphAttributes.position!==void 0&&(qe=1),Q.morphAttributes.normal!==void 0&&(qe=2),Q.morphAttributes.color!==void 0&&(qe=3);let ct,ut,$e,$;if(he){let yt=Si[he];ct=yt.vertexShader,ut=yt.fragmentShader}else ct=w.vertexShader,ut=w.fragmentShader,l.update(w),$e=l.getVertexShaderID(w),$=l.getFragmentShaderID(w);let se=i.getRenderTarget(),xe=i.state.buffers.depth.getReversed(),Be=z.isInstancedMesh===!0,Ce=z.isBatchedMesh===!0,et=!!w.map,Ut=!!w.matcap,C=!!re,ft=!!w.aoMap,He=!!w.lightMap,Ue=!!w.bumpMap,F=!!w.normalMap,ie=!!w.displacementMap,q=!!w.emissiveMap,fe=!!w.metalnessMap,j=!!w.roughnessMap,ee=w.anisotropy>0,E=w.clearcoat>0,y=w.dispersion>0,U=w.iridescence>0,Y=w.sheen>0,te=w.transmission>0,K=ee&&!!w.anisotropyMap,Fe=E&&!!w.clearcoatMap,de=E&&!!w.clearcoatNormalMap,De=E&&!!w.clearcoatRoughnessMap,Ne=U&&!!w.iridescenceMap,le=U&&!!w.iridescenceThicknessMap,_e=Y&&!!w.sheenColorMap,We=Y&&!!w.sheenRoughnessMap,Oe=!!w.specularMap,ye=!!w.specularColorMap,Je=!!w.specularIntensityMap,N=te&&!!w.transmissionMap,ce=te&&!!w.thicknessMap,pe=!!w.gradientMap,Ae=!!w.alphaMap,oe=w.alphaTest>0,ne=!!w.alphaHash,Ie=!!w.extensions,je=Yi;w.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(je=i.toneMapping);let Ct={shaderID:he,shaderType:w.type,shaderName:w.name,vertexShader:ct,fragmentShader:ut,defines:w.defines,customVertexShaderID:$e,customFragmentShaderID:$,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:Ce,batchingColor:Ce&&z._colorsTexture!==null,instancing:Be,instancingColor:Be&&z.instanceColor!==null,instancingMorph:Be&&z.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:se===null?i.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:ln,alphaToCoverage:!!w.alphaToCoverage,map:et,matcap:Ut,envMap:C,envMapMode:C&&re.mapping,envMapCubeUVHeight:X,aoMap:ft,lightMap:He,bumpMap:Ue,normalMap:F,displacementMap:d&&ie,emissiveMap:q,normalMapObjectSpace:F&&w.normalMapType===Np,normalMapTangentSpace:F&&w.normalMapType===aa,metalnessMap:fe,roughnessMap:j,anisotropy:ee,anisotropyMap:K,clearcoat:E,clearcoatMap:Fe,clearcoatNormalMap:de,clearcoatRoughnessMap:De,dispersion:y,iridescence:U,iridescenceMap:Ne,iridescenceThicknessMap:le,sheen:Y,sheenColorMap:_e,sheenRoughnessMap:We,specularMap:Oe,specularColorMap:ye,specularIntensityMap:Je,transmission:te,transmissionMap:N,thicknessMap:ce,gradientMap:pe,opaque:w.transparent===!1&&w.blending===Ds&&w.alphaToCoverage===!1,alphaMap:Ae,alphaTest:oe,alphaHash:ne,combine:w.combine,mapUv:et&&x(w.map.channel),aoMapUv:ft&&x(w.aoMap.channel),lightMapUv:He&&x(w.lightMap.channel),bumpMapUv:Ue&&x(w.bumpMap.channel),normalMapUv:F&&x(w.normalMap.channel),displacementMapUv:ie&&x(w.displacementMap.channel),emissiveMapUv:q&&x(w.emissiveMap.channel),metalnessMapUv:fe&&x(w.metalnessMap.channel),roughnessMapUv:j&&x(w.roughnessMap.channel),anisotropyMapUv:K&&x(w.anisotropyMap.channel),clearcoatMapUv:Fe&&x(w.clearcoatMap.channel),clearcoatNormalMapUv:de&&x(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:De&&x(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Ne&&x(w.iridescenceMap.channel),iridescenceThicknessMapUv:le&&x(w.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&x(w.sheenColorMap.channel),sheenRoughnessMapUv:We&&x(w.sheenRoughnessMap.channel),specularMapUv:Oe&&x(w.specularMap.channel),specularColorMapUv:ye&&x(w.specularColorMap.channel),specularIntensityMapUv:Je&&x(w.specularIntensityMap.channel),transmissionMapUv:N&&x(w.transmissionMap.channel),thicknessMapUv:ce&&x(w.thicknessMap.channel),alphaMapUv:Ae&&x(w.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(F||ee),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!Q.attributes.uv&&(et||Ae),fog:!!G,useFog:w.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:w.flatShading===!0&&w.wireframe===!1,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:xe,skinning:z.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:Re,morphTextureStride:qe,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:je,decodeVideoTexture:et&&w.map.isVideoTexture===!0&&it.getTransfer(w.map.colorSpace)===pt,decodeVideoTextureEmissive:q&&w.emissiveMap.isVideoTexture===!0&&it.getTransfer(w.emissiveMap.colorSpace)===pt,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===yn,flipSided:w.side===nn,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Ie&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ie&&w.extensions.multiDraw===!0||Ce)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Ct.vertexUv1s=c.has(1),Ct.vertexUv2s=c.has(2),Ct.vertexUv3s=c.has(3),c.clear(),Ct}function p(w){let _=[];if(w.shaderID?_.push(w.shaderID):(_.push(w.customVertexShaderID),_.push(w.customFragmentShaderID)),w.defines!==void 0)for(let P in w.defines)_.push(P),_.push(w.defines[P]);return w.isRawShaderMaterial===!1&&(b(_,w),M(_,w),_.push(i.outputColorSpace)),_.push(w.customProgramCacheKey),_.join()}function b(w,_){w.push(_.precision),w.push(_.outputColorSpace),w.push(_.envMapMode),w.push(_.envMapCubeUVHeight),w.push(_.mapUv),w.push(_.alphaMapUv),w.push(_.lightMapUv),w.push(_.aoMapUv),w.push(_.bumpMapUv),w.push(_.normalMapUv),w.push(_.displacementMapUv),w.push(_.emissiveMapUv),w.push(_.metalnessMapUv),w.push(_.roughnessMapUv),w.push(_.anisotropyMapUv),w.push(_.clearcoatMapUv),w.push(_.clearcoatNormalMapUv),w.push(_.clearcoatRoughnessMapUv),w.push(_.iridescenceMapUv),w.push(_.iridescenceThicknessMapUv),w.push(_.sheenColorMapUv),w.push(_.sheenRoughnessMapUv),w.push(_.specularMapUv),w.push(_.specularColorMapUv),w.push(_.specularIntensityMapUv),w.push(_.transmissionMapUv),w.push(_.thicknessMapUv),w.push(_.combine),w.push(_.fogExp2),w.push(_.sizeAttenuation),w.push(_.morphTargetsCount),w.push(_.morphAttributeCount),w.push(_.numDirLights),w.push(_.numPointLights),w.push(_.numSpotLights),w.push(_.numSpotLightMaps),w.push(_.numHemiLights),w.push(_.numRectAreaLights),w.push(_.numDirLightShadows),w.push(_.numPointLightShadows),w.push(_.numSpotLightShadows),w.push(_.numSpotLightShadowsWithMaps),w.push(_.numLightProbes),w.push(_.shadowMapType),w.push(_.toneMapping),w.push(_.numClippingPlanes),w.push(_.numClipIntersection),w.push(_.depthPacking)}function M(w,_){a.disableAll(),_.supportsVertexTextures&&a.enable(0),_.instancing&&a.enable(1),_.instancingColor&&a.enable(2),_.instancingMorph&&a.enable(3),_.matcap&&a.enable(4),_.envMap&&a.enable(5),_.normalMapObjectSpace&&a.enable(6),_.normalMapTangentSpace&&a.enable(7),_.clearcoat&&a.enable(8),_.iridescence&&a.enable(9),_.alphaTest&&a.enable(10),_.vertexColors&&a.enable(11),_.vertexAlphas&&a.enable(12),_.vertexUv1s&&a.enable(13),_.vertexUv2s&&a.enable(14),_.vertexUv3s&&a.enable(15),_.vertexTangents&&a.enable(16),_.anisotropy&&a.enable(17),_.alphaHash&&a.enable(18),_.batching&&a.enable(19),_.dispersion&&a.enable(20),_.batchingColor&&a.enable(21),_.gradientMap&&a.enable(22),w.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reversedDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),w.push(a.mask)}function v(w){let _=g[w.type],P;if(_){let O=Si[_];P=Un.clone(O.uniforms)}else P=w.uniforms;return P}function T(w,_){let P;for(let O=0,z=u.length;O<z;O++){let G=u[O];if(G.cacheKey===_){P=G,++P.usedTimes;break}}return P===void 0&&(P=new rb(i,_,w,r),u.push(P)),P}function A(w){if(--w.usedTimes===0){let _=u.indexOf(w);u[_]=u[u.length-1],u.pop(),w.destroy()}}function R(w){l.remove(w)}function I(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:T,releaseProgram:A,releaseShaderCache:R,programs:u,dispose:I}}function lb(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function cb(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function fm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function pm(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(h,d,f,g,x,m){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:g,renderOrder:h.renderOrder,z:x,group:m},i[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=x,p.group=m),e++,p}function a(h,d,f,g,x,m){let p=o(h,d,f,g,x,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(h,d,f,g,x,m){let p=o(h,d,f,g,x,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(h,d){t.length>1&&t.sort(h||cb),n.length>1&&n.sort(d||fm),s.length>1&&s.sort(d||fm)}function u(){for(let h=e,d=i.length;h<d;h++){let f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function ub(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new pm,i.set(n,[o])):s>=r.length?(o=new pm,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function hb(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new we};break;case"SpotLight":t={position:new L,direction:new L,color:new we,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new we,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new we,groundColor:new we};break;case"RectAreaLight":t={color:new we,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function db(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var fb=0;function pb(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function mb(i){let e=new hb,t=db(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);let s=new L,r=new Ye,o=new Ye;function a(c){let u=0,h=0,d=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,b=0,M=0,v=0,T=0,A=0,R=0;c.sort(pb);for(let w=0,_=c.length;w<_;w++){let P=c[w],O=P.color,z=P.intensity,G=P.distance,Q=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=O.r*z,h+=O.g*z,d+=O.b*z;else if(P.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(P.sh.coefficients[Z],z);R++}else if(P.isDirectionalLight){let Z=e.get(P);if(Z.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let re=P.shadow,X=t.get(P);X.shadowIntensity=re.intensity,X.shadowBias=re.bias,X.shadowNormalBias=re.normalBias,X.shadowRadius=re.radius,X.shadowMapSize=re.mapSize,n.directionalShadow[f]=X,n.directionalShadowMap[f]=Q,n.directionalShadowMatrix[f]=P.shadow.matrix,b++}n.directional[f]=Z,f++}else if(P.isSpotLight){let Z=e.get(P);Z.position.setFromMatrixPosition(P.matrixWorld),Z.color.copy(O).multiplyScalar(z),Z.distance=G,Z.coneCos=Math.cos(P.angle),Z.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),Z.decay=P.decay,n.spot[x]=Z;let re=P.shadow;if(P.map&&(n.spotLightMap[T]=P.map,T++,re.updateMatrices(P),P.castShadow&&A++),n.spotLightMatrix[x]=re.matrix,P.castShadow){let X=t.get(P);X.shadowIntensity=re.intensity,X.shadowBias=re.bias,X.shadowNormalBias=re.normalBias,X.shadowRadius=re.radius,X.shadowMapSize=re.mapSize,n.spotShadow[x]=X,n.spotShadowMap[x]=Q,v++}x++}else if(P.isRectAreaLight){let Z=e.get(P);Z.color.copy(O).multiplyScalar(z),Z.halfWidth.set(P.width*.5,0,0),Z.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=Z,m++}else if(P.isPointLight){let Z=e.get(P);if(Z.color.copy(P.color).multiplyScalar(P.intensity),Z.distance=P.distance,Z.decay=P.decay,P.castShadow){let re=P.shadow,X=t.get(P);X.shadowIntensity=re.intensity,X.shadowBias=re.bias,X.shadowNormalBias=re.normalBias,X.shadowRadius=re.radius,X.shadowMapSize=re.mapSize,X.shadowCameraNear=re.camera.near,X.shadowCameraFar=re.camera.far,n.pointShadow[g]=X,n.pointShadowMap[g]=Q,n.pointShadowMatrix[g]=P.shadow.matrix,M++}n.point[g]=Z,g++}else if(P.isHemisphereLight){let Z=e.get(P);Z.skyColor.copy(P.color).multiplyScalar(z),Z.groundColor.copy(P.groundColor).multiplyScalar(z),n.hemi[p]=Z,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=me.LTC_FLOAT_1,n.rectAreaLTC2=me.LTC_FLOAT_2):(n.rectAreaLTC1=me.LTC_HALF_1,n.rectAreaLTC2=me.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;let I=n.hash;(I.directionalLength!==f||I.pointLength!==g||I.spotLength!==x||I.rectAreaLength!==m||I.hemiLength!==p||I.numDirectionalShadows!==b||I.numPointShadows!==M||I.numSpotShadows!==v||I.numSpotMaps!==T||I.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=v+T-A,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=R,I.directionalLength=f,I.pointLength=g,I.spotLength=x,I.rectAreaLength=m,I.hemiLength=p,I.numDirectionalShadows=b,I.numPointShadows=M,I.numSpotShadows=v,I.numSpotMaps=T,I.numLightProbes=R,n.version=fb++)}function l(c,u){let h=0,d=0,f=0,g=0,x=0,m=u.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){let M=c[p];if(M.isDirectionalLight){let v=n.directional[h];v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),h++}else if(M.isSpotLight){let v=n.spot[f];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),f++}else if(M.isRectAreaLight){let v=n.rectArea[g];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),o.identity(),r.copy(M.matrixWorld),r.premultiply(m),o.extractRotation(r),v.halfWidth.set(M.width*.5,0,0),v.halfHeight.set(0,M.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){let v=n.point[d];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),d++}else if(M.isHemisphereLight){let v=n.hemi[x];v.direction.setFromMatrixPosition(M.matrixWorld),v.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:n}}function mm(i){let e=new mb(i),t=[],n=[];function s(u){c.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function gb(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new mm(i),e.set(s,[a])):r>=o.length?(a=new mm(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var xb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,yb=`uniform sampler2D shadow_pass;
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
}`;function vb(i,e,t){let n=new zr,s=new be,r=new be,o=new dt,a=new wl({depthPacking:Dp}),l=new Sl,c={},u=t.maxTextureSize,h={[ei]:nn,[nn]:ei,[yn]:yn},d=new Ot({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new be},radius:{value:4}},vertexShader:xb,fragmentShader:yb}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new Nt;g.setAttribute("position",new kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new D(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=uh;let p=this.type;this.render=function(A,R,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;let w=i.getRenderTarget(),_=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),O=i.state;O.setBlending(ii),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let z=p!==Mi&&this.type===Mi,G=p===Mi&&this.type!==Mi;for(let Q=0,Z=A.length;Q<Z;Q++){let re=A[Q],X=re.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",re,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);let he=X.getFrameExtents();if(s.multiply(he),r.copy(X.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/he.x),s.x=r.x*he.x,X.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/he.y),s.y=r.y*he.y,X.mapSize.y=r.y)),X.map===null||z===!0||G===!0){let Re=this.type!==Mi?{minFilter:qt,magFilter:qt}:{};X.map!==null&&X.map.dispose(),X.map=new Zt(s.x,s.y,Re),X.map.texture.name=re.name+".shadowMap",X.camera.updateProjectionMatrix()}i.setRenderTarget(X.map),i.clear();let ge=X.getViewportCount();for(let Re=0;Re<ge;Re++){let qe=X.getViewport(Re);o.set(r.x*qe.x,r.y*qe.y,r.x*qe.z,r.y*qe.w),O.viewport(o),X.updateMatrices(re,Re),n=X.getFrustum(),v(R,I,X.camera,re,this.type)}X.isPointLightShadow!==!0&&this.type===Mi&&b(X,I),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(w,_,P)};function b(A,R){let I=e.update(x);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Zt(s.x,s.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(R,null,I,d,x,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(R,null,I,f,x,null)}function M(A,R,I,w){let _=null,P=I.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)_=P;else if(_=I.isPointLight===!0?l:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let O=_.uuid,z=R.uuid,G=c[O];G===void 0&&(G={},c[O]=G);let Q=G[z];Q===void 0&&(Q=_.clone(),G[z]=Q,R.addEventListener("dispose",T)),_=Q}if(_.visible=R.visible,_.wireframe=R.wireframe,w===Mi?_.side=R.shadowSide!==null?R.shadowSide:R.side:_.side=R.shadowSide!==null?R.shadowSide:h[R.side],_.alphaMap=R.alphaMap,_.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,_.map=R.map,_.clipShadows=R.clipShadows,_.clippingPlanes=R.clippingPlanes,_.clipIntersection=R.clipIntersection,_.displacementMap=R.displacementMap,_.displacementScale=R.displacementScale,_.displacementBias=R.displacementBias,_.wireframeLinewidth=R.wireframeLinewidth,_.linewidth=R.linewidth,I.isPointLight===!0&&_.isMeshDistanceMaterial===!0){let O=i.properties.get(_);O.light=I}return _}function v(A,R,I,w,_){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&_===Mi)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,A.matrixWorld);let z=e.update(A),G=A.material;if(Array.isArray(G)){let Q=z.groups;for(let Z=0,re=Q.length;Z<re;Z++){let X=Q[Z],he=G[X.materialIndex];if(he&&he.visible){let ge=M(A,he,w,_);A.onBeforeShadow(i,A,R,I,z,ge,X),i.renderBufferDirect(I,null,z,ge,A,X),A.onAfterShadow(i,A,R,I,z,ge,X)}}}else if(G.visible){let Q=M(A,G,w,_);A.onBeforeShadow(i,A,R,I,z,Q,null),i.renderBufferDirect(I,null,z,Q,A,null),A.onAfterShadow(i,A,R,I,z,Q,null)}}let O=A.children;for(let z=0,G=O.length;z<G;z++)v(O[z],R,I,w,_)}function T(A){A.target.removeEventListener("dispose",T);for(let I in c){let w=c[I],_=A.target.uuid;_ in w&&(w[_].dispose(),delete w[_])}}}var _b={[Nl]:Ol,[Ul]:kl,[Fl]:Hl,[Ns]:Bl,[Ol]:Nl,[kl]:Ul,[Hl]:Fl,[Bl]:Ns};function bb(i,e){function t(){let N=!1,ce=new dt,pe=null,Ae=new dt(0,0,0,0);return{setMask:function(oe){pe!==oe&&!N&&(i.colorMask(oe,oe,oe,oe),pe=oe)},setLocked:function(oe){N=oe},setClear:function(oe,ne,Ie,je,Ct){Ct===!0&&(oe*=je,ne*=je,Ie*=je),ce.set(oe,ne,Ie,je),Ae.equals(ce)===!1&&(i.clearColor(oe,ne,Ie,je),Ae.copy(ce))},reset:function(){N=!1,pe=null,Ae.set(-1,0,0,0)}}}function n(){let N=!1,ce=!1,pe=null,Ae=null,oe=null;return{setReversed:function(ne){if(ce!==ne){let Ie=e.get("EXT_clip_control");ne?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT),ce=ne;let je=oe;oe=null,this.setClear(je)}},getReversed:function(){return ce},setTest:function(ne){ne?se(i.DEPTH_TEST):xe(i.DEPTH_TEST)},setMask:function(ne){pe!==ne&&!N&&(i.depthMask(ne),pe=ne)},setFunc:function(ne){if(ce&&(ne=_b[ne]),Ae!==ne){switch(ne){case Nl:i.depthFunc(i.NEVER);break;case Ol:i.depthFunc(i.ALWAYS);break;case Ul:i.depthFunc(i.LESS);break;case Ns:i.depthFunc(i.LEQUAL);break;case Fl:i.depthFunc(i.EQUAL);break;case Bl:i.depthFunc(i.GEQUAL);break;case kl:i.depthFunc(i.GREATER);break;case Hl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ae=ne}},setLocked:function(ne){N=ne},setClear:function(ne){oe!==ne&&(ce&&(ne=1-ne),i.clearDepth(ne),oe=ne)},reset:function(){N=!1,pe=null,Ae=null,oe=null,ce=!1}}}function s(){let N=!1,ce=null,pe=null,Ae=null,oe=null,ne=null,Ie=null,je=null,Ct=null;return{setTest:function(yt){N||(yt?se(i.STENCIL_TEST):xe(i.STENCIL_TEST))},setMask:function(yt){ce!==yt&&!N&&(i.stencilMask(yt),ce=yt)},setFunc:function(yt,Ci,fi){(pe!==yt||Ae!==Ci||oe!==fi)&&(i.stencilFunc(yt,Ci,fi),pe=yt,Ae=Ci,oe=fi)},setOp:function(yt,Ci,fi){(ne!==yt||Ie!==Ci||je!==fi)&&(i.stencilOp(yt,Ci,fi),ne=yt,Ie=Ci,je=fi)},setLocked:function(yt){N=yt},setClear:function(yt){Ct!==yt&&(i.clearStencil(yt),Ct=yt)},reset:function(){N=!1,ce=null,pe=null,Ae=null,oe=null,ne=null,Ie=null,je=null,Ct=null}}}let r=new t,o=new n,a=new s,l=new WeakMap,c=new WeakMap,u={},h={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,b=null,M=null,v=null,T=null,A=null,R=new we(0,0,0),I=0,w=!1,_=null,P=null,O=null,z=null,G=null,Q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Z=!1,re=0,X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(re=parseFloat(/^WebGL (\d)/.exec(X)[1]),Z=re>=1):X.indexOf("OpenGL ES")!==-1&&(re=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),Z=re>=2);let he=null,ge={},Re=i.getParameter(i.SCISSOR_BOX),qe=i.getParameter(i.VIEWPORT),ct=new dt().fromArray(Re),ut=new dt().fromArray(qe);function $e(N,ce,pe,Ae){let oe=new Uint8Array(4),ne=i.createTexture();i.bindTexture(N,ne),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ie=0;Ie<pe;Ie++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(ce,0,i.RGBA,1,1,Ae,0,i.RGBA,i.UNSIGNED_BYTE,oe):i.texImage2D(ce+Ie,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,oe);return ne}let $={};$[i.TEXTURE_2D]=$e(i.TEXTURE_2D,i.TEXTURE_2D,1),$[i.TEXTURE_CUBE_MAP]=$e(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[i.TEXTURE_2D_ARRAY]=$e(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),$[i.TEXTURE_3D]=$e(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),se(i.DEPTH_TEST),o.setFunc(Ns),Ue(!1),F(ch),se(i.CULL_FACE),ft(ii);function se(N){u[N]!==!0&&(i.enable(N),u[N]=!0)}function xe(N){u[N]!==!1&&(i.disable(N),u[N]=!1)}function Be(N,ce){return h[N]!==ce?(i.bindFramebuffer(N,ce),h[N]=ce,N===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ce),N===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ce),!0):!1}function Ce(N,ce){let pe=f,Ae=!1;if(N){pe=d.get(ce),pe===void 0&&(pe=[],d.set(ce,pe));let oe=N.textures;if(pe.length!==oe.length||pe[0]!==i.COLOR_ATTACHMENT0){for(let ne=0,Ie=oe.length;ne<Ie;ne++)pe[ne]=i.COLOR_ATTACHMENT0+ne;pe.length=oe.length,Ae=!0}}else pe[0]!==i.BACK&&(pe[0]=i.BACK,Ae=!0);Ae&&i.drawBuffers(pe)}function et(N){return g!==N?(i.useProgram(N),g=N,!0):!1}let Ut={[os]:i.FUNC_ADD,[lp]:i.FUNC_SUBTRACT,[cp]:i.FUNC_REVERSE_SUBTRACT};Ut[up]=i.MIN,Ut[hp]=i.MAX;let C={[dp]:i.ZERO,[fp]:i.ONE,[pp]:i.SRC_COLOR,[fl]:i.SRC_ALPHA,[_p]:i.SRC_ALPHA_SATURATE,[yp]:i.DST_COLOR,[gp]:i.DST_ALPHA,[mp]:i.ONE_MINUS_SRC_COLOR,[pl]:i.ONE_MINUS_SRC_ALPHA,[vp]:i.ONE_MINUS_DST_COLOR,[xp]:i.ONE_MINUS_DST_ALPHA,[bp]:i.CONSTANT_COLOR,[Mp]:i.ONE_MINUS_CONSTANT_COLOR,[wp]:i.CONSTANT_ALPHA,[Sp]:i.ONE_MINUS_CONSTANT_ALPHA};function ft(N,ce,pe,Ae,oe,ne,Ie,je,Ct,yt){if(N===ii){x===!0&&(xe(i.BLEND),x=!1);return}if(x===!1&&(se(i.BLEND),x=!0),N!==ap){if(N!==m||yt!==w){if((p!==os||v!==os)&&(i.blendEquation(i.FUNC_ADD),p=os,v=os),yt)switch(N){case Ds:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case wi:i.blendFunc(i.ONE,i.ONE);break;case hh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case dh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Ds:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case wi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case hh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case dh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}b=null,M=null,T=null,A=null,R.set(0,0,0),I=0,m=N,w=yt}return}oe=oe||ce,ne=ne||pe,Ie=Ie||Ae,(ce!==p||oe!==v)&&(i.blendEquationSeparate(Ut[ce],Ut[oe]),p=ce,v=oe),(pe!==b||Ae!==M||ne!==T||Ie!==A)&&(i.blendFuncSeparate(C[pe],C[Ae],C[ne],C[Ie]),b=pe,M=Ae,T=ne,A=Ie),(je.equals(R)===!1||Ct!==I)&&(i.blendColor(je.r,je.g,je.b,Ct),R.copy(je),I=Ct),m=N,w=!1}function He(N,ce){N.side===yn?xe(i.CULL_FACE):se(i.CULL_FACE);let pe=N.side===nn;ce&&(pe=!pe),Ue(pe),N.blending===Ds&&N.transparent===!1?ft(ii):ft(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);let Ae=N.stencilWrite;a.setTest(Ae),Ae&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),q(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?se(i.SAMPLE_ALPHA_TO_COVERAGE):xe(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ue(N){_!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),_=N)}function F(N){N!==rp?(se(i.CULL_FACE),N!==P&&(N===ch?i.cullFace(i.BACK):N===op?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):xe(i.CULL_FACE),P=N}function ie(N){N!==O&&(Z&&i.lineWidth(N),O=N)}function q(N,ce,pe){N?(se(i.POLYGON_OFFSET_FILL),(z!==ce||G!==pe)&&(i.polygonOffset(ce,pe),z=ce,G=pe)):xe(i.POLYGON_OFFSET_FILL)}function fe(N){N?se(i.SCISSOR_TEST):xe(i.SCISSOR_TEST)}function j(N){N===void 0&&(N=i.TEXTURE0+Q-1),he!==N&&(i.activeTexture(N),he=N)}function ee(N,ce,pe){pe===void 0&&(he===null?pe=i.TEXTURE0+Q-1:pe=he);let Ae=ge[pe];Ae===void 0&&(Ae={type:void 0,texture:void 0},ge[pe]=Ae),(Ae.type!==N||Ae.texture!==ce)&&(he!==pe&&(i.activeTexture(pe),he=pe),i.bindTexture(N,ce||$[N]),Ae.type=N,Ae.texture=ce)}function E(){let N=ge[he];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function y(){try{i.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function U(){try{i.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Y(){try{i.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function te(){try{i.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function K(){try{i.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Fe(){try{i.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function de(){try{i.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function De(){try{i.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ne(){try{i.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function le(){try{i.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function _e(N){ct.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),ct.copy(N))}function We(N){ut.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),ut.copy(N))}function Oe(N,ce){let pe=c.get(ce);pe===void 0&&(pe=new WeakMap,c.set(ce,pe));let Ae=pe.get(N);Ae===void 0&&(Ae=i.getUniformBlockIndex(ce,N.name),pe.set(N,Ae))}function ye(N,ce){let Ae=c.get(ce).get(N);l.get(ce)!==Ae&&(i.uniformBlockBinding(ce,Ae,N.__bindingPointIndex),l.set(ce,Ae))}function Je(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},he=null,ge={},h={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,b=null,M=null,v=null,T=null,A=null,R=new we(0,0,0),I=0,w=!1,_=null,P=null,O=null,z=null,G=null,ct.set(0,0,i.canvas.width,i.canvas.height),ut.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:se,disable:xe,bindFramebuffer:Be,drawBuffers:Ce,useProgram:et,setBlending:ft,setMaterial:He,setFlipSided:Ue,setCullFace:F,setLineWidth:ie,setPolygonOffset:q,setScissorTest:fe,activeTexture:j,bindTexture:ee,unbindTexture:E,compressedTexImage2D:y,compressedTexImage3D:U,texImage2D:Ne,texImage3D:le,updateUBOMapping:Oe,uniformBlockBinding:ye,texStorage2D:de,texStorage3D:De,texSubImage2D:Y,texSubImage3D:te,compressedTexSubImage2D:K,compressedTexSubImage3D:Fe,scissor:_e,viewport:We,reset:Je}}function Mb(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new be,u=new WeakMap,h,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,y){return f?new OffscreenCanvas(E,y):Nr("canvas")}function x(E,y,U){let Y=1,te=ee(E);if((te.width>U||te.height>U)&&(Y=U/Math.max(te.width,te.height)),Y<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let K=Math.floor(Y*te.width),Fe=Math.floor(Y*te.height);h===void 0&&(h=g(K,Fe));let de=y?g(K,Fe):h;return de.width=K,de.height=Fe,de.getContext("2d").drawImage(E,0,0,K,Fe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+K+"x"+Fe+")."),de}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),E;return E}function m(E){return E.generateMipmaps}function p(E){i.generateMipmap(E)}function b(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(E,y,U,Y,te=!1){if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let K=y;if(y===i.RED&&(U===i.FLOAT&&(K=i.R32F),U===i.HALF_FLOAT&&(K=i.R16F),U===i.UNSIGNED_BYTE&&(K=i.R8)),y===i.RED_INTEGER&&(U===i.UNSIGNED_BYTE&&(K=i.R8UI),U===i.UNSIGNED_SHORT&&(K=i.R16UI),U===i.UNSIGNED_INT&&(K=i.R32UI),U===i.BYTE&&(K=i.R8I),U===i.SHORT&&(K=i.R16I),U===i.INT&&(K=i.R32I)),y===i.RG&&(U===i.FLOAT&&(K=i.RG32F),U===i.HALF_FLOAT&&(K=i.RG16F),U===i.UNSIGNED_BYTE&&(K=i.RG8)),y===i.RG_INTEGER&&(U===i.UNSIGNED_BYTE&&(K=i.RG8UI),U===i.UNSIGNED_SHORT&&(K=i.RG16UI),U===i.UNSIGNED_INT&&(K=i.RG32UI),U===i.BYTE&&(K=i.RG8I),U===i.SHORT&&(K=i.RG16I),U===i.INT&&(K=i.RG32I)),y===i.RGB_INTEGER&&(U===i.UNSIGNED_BYTE&&(K=i.RGB8UI),U===i.UNSIGNED_SHORT&&(K=i.RGB16UI),U===i.UNSIGNED_INT&&(K=i.RGB32UI),U===i.BYTE&&(K=i.RGB8I),U===i.SHORT&&(K=i.RGB16I),U===i.INT&&(K=i.RGB32I)),y===i.RGBA_INTEGER&&(U===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),U===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),U===i.UNSIGNED_INT&&(K=i.RGBA32UI),U===i.BYTE&&(K=i.RGBA8I),U===i.SHORT&&(K=i.RGBA16I),U===i.INT&&(K=i.RGBA32I)),y===i.RGB&&(U===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),U===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),y===i.RGBA){let Fe=te?Co:it.getTransfer(Y);U===i.FLOAT&&(K=i.RGBA32F),U===i.HALF_FLOAT&&(K=i.RGBA16F),U===i.UNSIGNED_BYTE&&(K=Fe===pt?i.SRGB8_ALPHA8:i.RGBA8),U===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),U===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function v(E,y){let U;return E?y===null||y===ds||y===Yr?U=i.DEPTH24_STENCIL8:y===Gn?U=i.DEPTH32F_STENCIL8:y===qr&&(U=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===ds||y===Yr?U=i.DEPTH_COMPONENT24:y===Gn?U=i.DEPTH_COMPONENT32F:y===qr&&(U=i.DEPTH_COMPONENT16),U}function T(E,y){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==qt&&E.minFilter!==an?Math.log2(Math.max(y.width,y.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?y.mipmaps.length:1}function A(E){let y=E.target;y.removeEventListener("dispose",A),I(y),y.isVideoTexture&&u.delete(y)}function R(E){let y=E.target;y.removeEventListener("dispose",R),_(y)}function I(E){let y=n.get(E);if(y.__webglInit===void 0)return;let U=E.source,Y=d.get(U);if(Y){let te=Y[y.__cacheKey];te.usedTimes--,te.usedTimes===0&&w(E),Object.keys(Y).length===0&&d.delete(U)}n.remove(E)}function w(E){let y=n.get(E);i.deleteTexture(y.__webglTexture);let U=E.source,Y=d.get(U);delete Y[y.__cacheKey],o.memory.textures--}function _(E){let y=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(y.__webglFramebuffer[Y]))for(let te=0;te<y.__webglFramebuffer[Y].length;te++)i.deleteFramebuffer(y.__webglFramebuffer[Y][te]);else i.deleteFramebuffer(y.__webglFramebuffer[Y]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[Y])}else{if(Array.isArray(y.__webglFramebuffer))for(let Y=0;Y<y.__webglFramebuffer.length;Y++)i.deleteFramebuffer(y.__webglFramebuffer[Y]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let Y=0;Y<y.__webglColorRenderbuffer.length;Y++)y.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[Y]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let U=E.textures;for(let Y=0,te=U.length;Y<te;Y++){let K=n.get(U[Y]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(U[Y])}n.remove(E)}let P=0;function O(){P=0}function z(){let E=P;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),P+=1,E}function G(E){let y=[];return y.push(E.wrapS),y.push(E.wrapT),y.push(E.wrapR||0),y.push(E.magFilter),y.push(E.minFilter),y.push(E.anisotropy),y.push(E.internalFormat),y.push(E.format),y.push(E.type),y.push(E.generateMipmaps),y.push(E.premultiplyAlpha),y.push(E.flipY),y.push(E.unpackAlignment),y.push(E.colorSpace),y.join()}function Q(E,y){let U=n.get(E);if(E.isVideoTexture&&fe(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&U.__version!==E.version){let Y=E.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(U,E,y);return}}else E.isExternalTexture&&(U.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,U.__webglTexture,i.TEXTURE0+y)}function Z(E,y){let U=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&U.__version!==E.version){$(U,E,y);return}t.bindTexture(i.TEXTURE_2D_ARRAY,U.__webglTexture,i.TEXTURE0+y)}function re(E,y){let U=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&U.__version!==E.version){$(U,E,y);return}t.bindTexture(i.TEXTURE_3D,U.__webglTexture,i.TEXTURE0+y)}function X(E,y){let U=n.get(E);if(E.version>0&&U.__version!==E.version){se(U,E,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+y)}let he={[jt]:i.REPEAT,[pi]:i.CLAMP_TO_EDGE,[Lr]:i.MIRRORED_REPEAT},ge={[qt]:i.NEAREST,[Zl]:i.NEAREST_MIPMAP_NEAREST,[Ks]:i.NEAREST_MIPMAP_LINEAR,[an]:i.LINEAR,[Xr]:i.LINEAR_MIPMAP_NEAREST,[si]:i.LINEAR_MIPMAP_LINEAR},Re={[Op]:i.NEVER,[zp]:i.ALWAYS,[Up]:i.LESS,[Mh]:i.LEQUAL,[Fp]:i.EQUAL,[Hp]:i.GEQUAL,[Bp]:i.GREATER,[kp]:i.NOTEQUAL};function qe(E,y){if(y.type===Gn&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===an||y.magFilter===Xr||y.magFilter===Ks||y.magFilter===si||y.minFilter===an||y.minFilter===Xr||y.minFilter===Ks||y.minFilter===si)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,he[y.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,he[y.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,he[y.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,ge[y.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,ge[y.minFilter]),y.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,Re[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===qt||y.minFilter!==Ks&&y.minFilter!==si||y.type===Gn&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let U=e.get("EXT_texture_filter_anisotropic");i.texParameterf(E,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function ct(E,y){let U=!1;E.__webglInit===void 0&&(E.__webglInit=!0,y.addEventListener("dispose",A));let Y=y.source,te=d.get(Y);te===void 0&&(te={},d.set(Y,te));let K=G(y);if(K!==E.__cacheKey){te[K]===void 0&&(te[K]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,U=!0),te[K].usedTimes++;let Fe=te[E.__cacheKey];Fe!==void 0&&(te[E.__cacheKey].usedTimes--,Fe.usedTimes===0&&w(y)),E.__cacheKey=K,E.__webglTexture=te[K].texture}return U}function ut(E,y,U){return Math.floor(Math.floor(E/U)/y)}function $e(E,y,U,Y){let K=E.updateRanges;if(K.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,U,Y,y.data);else{K.sort((le,_e)=>le.start-_e.start);let Fe=0;for(let le=1;le<K.length;le++){let _e=K[Fe],We=K[le],Oe=_e.start+_e.count,ye=ut(We.start,y.width,4),Je=ut(_e.start,y.width,4);We.start<=Oe+1&&ye===Je&&ut(We.start+We.count-1,y.width,4)===ye?_e.count=Math.max(_e.count,We.start+We.count-_e.start):(++Fe,K[Fe]=We)}K.length=Fe+1;let de=i.getParameter(i.UNPACK_ROW_LENGTH),De=i.getParameter(i.UNPACK_SKIP_PIXELS),Ne=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let le=0,_e=K.length;le<_e;le++){let We=K[le],Oe=Math.floor(We.start/4),ye=Math.ceil(We.count/4),Je=Oe%y.width,N=Math.floor(Oe/y.width),ce=ye,pe=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Je),i.pixelStorei(i.UNPACK_SKIP_ROWS,N),t.texSubImage2D(i.TEXTURE_2D,0,Je,N,ce,pe,U,Y,y.data)}E.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,de),i.pixelStorei(i.UNPACK_SKIP_PIXELS,De),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ne)}}function $(E,y,U){let Y=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(Y=i.TEXTURE_3D);let te=ct(E,y),K=y.source;t.bindTexture(Y,E.__webglTexture,i.TEXTURE0+U);let Fe=n.get(K);if(K.version!==Fe.__version||te===!0){t.activeTexture(i.TEXTURE0+U);let de=it.getPrimaries(it.workingColorSpace),De=y.colorSpace===Vn?null:it.getPrimaries(y.colorSpace),Ne=y.colorSpace===Vn||de===De?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);let le=x(y.image,!1,s.maxTextureSize);le=j(y,le);let _e=r.convert(y.format,y.colorSpace),We=r.convert(y.type),Oe=M(y.internalFormat,_e,We,y.colorSpace,y.isVideoTexture);qe(Y,y);let ye,Je=y.mipmaps,N=y.isVideoTexture!==!0,ce=Fe.__version===void 0||te===!0,pe=K.dataReady,Ae=T(y,le);if(y.isDepthTexture)Oe=v(y.format===jr,y.type),ce&&(N?t.texStorage2D(i.TEXTURE_2D,1,Oe,le.width,le.height):t.texImage2D(i.TEXTURE_2D,0,Oe,le.width,le.height,0,_e,We,null));else if(y.isDataTexture)if(Je.length>0){N&&ce&&t.texStorage2D(i.TEXTURE_2D,Ae,Oe,Je[0].width,Je[0].height);for(let oe=0,ne=Je.length;oe<ne;oe++)ye=Je[oe],N?pe&&t.texSubImage2D(i.TEXTURE_2D,oe,0,0,ye.width,ye.height,_e,We,ye.data):t.texImage2D(i.TEXTURE_2D,oe,Oe,ye.width,ye.height,0,_e,We,ye.data);y.generateMipmaps=!1}else N?(ce&&t.texStorage2D(i.TEXTURE_2D,Ae,Oe,le.width,le.height),pe&&$e(y,le,_e,We)):t.texImage2D(i.TEXTURE_2D,0,Oe,le.width,le.height,0,_e,We,le.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){N&&ce&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ae,Oe,Je[0].width,Je[0].height,le.depth);for(let oe=0,ne=Je.length;oe<ne;oe++)if(ye=Je[oe],y.format!==On)if(_e!==null)if(N){if(pe)if(y.layerUpdates.size>0){let Ie=Ch(ye.width,ye.height,y.format,y.type);for(let je of y.layerUpdates){let Ct=ye.data.subarray(je*Ie/ye.data.BYTES_PER_ELEMENT,(je+1)*Ie/ye.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,je,ye.width,ye.height,1,_e,Ct)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,0,ye.width,ye.height,le.depth,_e,ye.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,oe,Oe,ye.width,ye.height,le.depth,0,ye.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?pe&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,0,ye.width,ye.height,le.depth,_e,We,ye.data):t.texImage3D(i.TEXTURE_2D_ARRAY,oe,Oe,ye.width,ye.height,le.depth,0,_e,We,ye.data)}else{N&&ce&&t.texStorage2D(i.TEXTURE_2D,Ae,Oe,Je[0].width,Je[0].height);for(let oe=0,ne=Je.length;oe<ne;oe++)ye=Je[oe],y.format!==On?_e!==null?N?pe&&t.compressedTexSubImage2D(i.TEXTURE_2D,oe,0,0,ye.width,ye.height,_e,ye.data):t.compressedTexImage2D(i.TEXTURE_2D,oe,Oe,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?pe&&t.texSubImage2D(i.TEXTURE_2D,oe,0,0,ye.width,ye.height,_e,We,ye.data):t.texImage2D(i.TEXTURE_2D,oe,Oe,ye.width,ye.height,0,_e,We,ye.data)}else if(y.isDataArrayTexture)if(N){if(ce&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ae,Oe,le.width,le.height,le.depth),pe)if(y.layerUpdates.size>0){let oe=Ch(le.width,le.height,y.format,y.type);for(let ne of y.layerUpdates){let Ie=le.data.subarray(ne*oe/le.data.BYTES_PER_ELEMENT,(ne+1)*oe/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ne,le.width,le.height,1,_e,We,Ie)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,_e,We,le.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Oe,le.width,le.height,le.depth,0,_e,We,le.data);else if(y.isData3DTexture)N?(ce&&t.texStorage3D(i.TEXTURE_3D,Ae,Oe,le.width,le.height,le.depth),pe&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,_e,We,le.data)):t.texImage3D(i.TEXTURE_3D,0,Oe,le.width,le.height,le.depth,0,_e,We,le.data);else if(y.isFramebufferTexture){if(ce)if(N)t.texStorage2D(i.TEXTURE_2D,Ae,Oe,le.width,le.height);else{let oe=le.width,ne=le.height;for(let Ie=0;Ie<Ae;Ie++)t.texImage2D(i.TEXTURE_2D,Ie,Oe,oe,ne,0,_e,We,null),oe>>=1,ne>>=1}}else if(Je.length>0){if(N&&ce){let oe=ee(Je[0]);t.texStorage2D(i.TEXTURE_2D,Ae,Oe,oe.width,oe.height)}for(let oe=0,ne=Je.length;oe<ne;oe++)ye=Je[oe],N?pe&&t.texSubImage2D(i.TEXTURE_2D,oe,0,0,_e,We,ye):t.texImage2D(i.TEXTURE_2D,oe,Oe,_e,We,ye);y.generateMipmaps=!1}else if(N){if(ce){let oe=ee(le);t.texStorage2D(i.TEXTURE_2D,Ae,Oe,oe.width,oe.height)}pe&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,_e,We,le)}else t.texImage2D(i.TEXTURE_2D,0,Oe,_e,We,le);m(y)&&p(Y),Fe.__version=K.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function se(E,y,U){if(y.image.length!==6)return;let Y=ct(E,y),te=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+U);let K=n.get(te);if(te.version!==K.__version||Y===!0){t.activeTexture(i.TEXTURE0+U);let Fe=it.getPrimaries(it.workingColorSpace),de=y.colorSpace===Vn?null:it.getPrimaries(y.colorSpace),De=y.colorSpace===Vn||Fe===de?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);let Ne=y.isCompressedTexture||y.image[0].isCompressedTexture,le=y.image[0]&&y.image[0].isDataTexture,_e=[];for(let ne=0;ne<6;ne++)!Ne&&!le?_e[ne]=x(y.image[ne],!0,s.maxCubemapSize):_e[ne]=le?y.image[ne].image:y.image[ne],_e[ne]=j(y,_e[ne]);let We=_e[0],Oe=r.convert(y.format,y.colorSpace),ye=r.convert(y.type),Je=M(y.internalFormat,Oe,ye,y.colorSpace),N=y.isVideoTexture!==!0,ce=K.__version===void 0||Y===!0,pe=te.dataReady,Ae=T(y,We);qe(i.TEXTURE_CUBE_MAP,y);let oe;if(Ne){N&&ce&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ae,Je,We.width,We.height);for(let ne=0;ne<6;ne++){oe=_e[ne].mipmaps;for(let Ie=0;Ie<oe.length;Ie++){let je=oe[Ie];y.format!==On?Oe!==null?N?pe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie,0,0,je.width,je.height,Oe,je.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie,Je,je.width,je.height,0,je.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie,0,0,je.width,je.height,Oe,ye,je.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie,Je,je.width,je.height,0,Oe,ye,je.data)}}}else{if(oe=y.mipmaps,N&&ce){oe.length>0&&Ae++;let ne=ee(_e[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ae,Je,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(le){N?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,_e[ne].width,_e[ne].height,Oe,ye,_e[ne].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Je,_e[ne].width,_e[ne].height,0,Oe,ye,_e[ne].data);for(let Ie=0;Ie<oe.length;Ie++){let Ct=oe[Ie].image[ne].image;N?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie+1,0,0,Ct.width,Ct.height,Oe,ye,Ct.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie+1,Je,Ct.width,Ct.height,0,Oe,ye,Ct.data)}}else{N?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Oe,ye,_e[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Je,Oe,ye,_e[ne]);for(let Ie=0;Ie<oe.length;Ie++){let je=oe[Ie];N?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie+1,0,0,Oe,ye,je.image[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie+1,Je,Oe,ye,je.image[ne])}}}m(y)&&p(i.TEXTURE_CUBE_MAP),K.__version=te.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function xe(E,y,U,Y,te,K){let Fe=r.convert(U.format,U.colorSpace),de=r.convert(U.type),De=M(U.internalFormat,Fe,de,U.colorSpace),Ne=n.get(y),le=n.get(U);if(le.__renderTarget=y,!Ne.__hasExternalTextures){let _e=Math.max(1,y.width>>K),We=Math.max(1,y.height>>K);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,K,De,_e,We,y.depth,0,Fe,de,null):t.texImage2D(te,K,De,_e,We,0,Fe,de,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),q(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,te,le.__webglTexture,0,ie(y)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,te,le.__webglTexture,K),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Be(E,y,U){if(i.bindRenderbuffer(i.RENDERBUFFER,E),y.depthBuffer){let Y=y.depthTexture,te=Y&&Y.isDepthTexture?Y.type:null,K=v(y.stencilBuffer,te),Fe=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=ie(y);q(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,de,K,y.width,y.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,de,K,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,K,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Fe,i.RENDERBUFFER,E)}else{let Y=y.textures;for(let te=0;te<Y.length;te++){let K=Y[te],Fe=r.convert(K.format,K.colorSpace),de=r.convert(K.type),De=M(K.internalFormat,Fe,de,K.colorSpace),Ne=ie(y);U&&q(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ne,De,y.width,y.height):q(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ne,De,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,De,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ce(E,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Y=n.get(y.depthTexture);Y.__renderTarget=y,(!Y.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),Q(y.depthTexture,0);let te=Y.__webglTexture,K=ie(y);if(y.depthTexture.format===Dr)q(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0);else if(y.depthTexture.format===jr)q(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function et(E){let y=n.get(E),U=E.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==E.depthTexture){let Y=E.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),Y){let te=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,Y.removeEventListener("dispose",te)};Y.addEventListener("dispose",te),y.__depthDisposeCallback=te}y.__boundDepthTexture=Y}if(E.depthTexture&&!y.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");let Y=E.texture.mipmaps;Y&&Y.length>0?Ce(y.__webglFramebuffer[0],E):Ce(y.__webglFramebuffer,E)}else if(U){y.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[Y]),y.__webglDepthbuffer[Y]===void 0)y.__webglDepthbuffer[Y]=i.createRenderbuffer(),Be(y.__webglDepthbuffer[Y],E,!1);else{let te=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=y.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,K)}}else{let Y=E.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),Be(y.__webglDepthbuffer,E,!1);else{let te=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,K)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ut(E,y,U){let Y=n.get(E);y!==void 0&&xe(Y.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),U!==void 0&&et(E)}function C(E){let y=E.texture,U=n.get(E),Y=n.get(y);E.addEventListener("dispose",R);let te=E.textures,K=E.isWebGLCubeRenderTarget===!0,Fe=te.length>1;if(Fe||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=y.version,o.memory.textures++),K){U.__webglFramebuffer=[];for(let de=0;de<6;de++)if(y.mipmaps&&y.mipmaps.length>0){U.__webglFramebuffer[de]=[];for(let De=0;De<y.mipmaps.length;De++)U.__webglFramebuffer[de][De]=i.createFramebuffer()}else U.__webglFramebuffer[de]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){U.__webglFramebuffer=[];for(let de=0;de<y.mipmaps.length;de++)U.__webglFramebuffer[de]=i.createFramebuffer()}else U.__webglFramebuffer=i.createFramebuffer();if(Fe)for(let de=0,De=te.length;de<De;de++){let Ne=n.get(te[de]);Ne.__webglTexture===void 0&&(Ne.__webglTexture=i.createTexture(),o.memory.textures++)}if(E.samples>0&&q(E)===!1){U.__webglMultisampledFramebuffer=i.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let de=0;de<te.length;de++){let De=te[de];U.__webglColorRenderbuffer[de]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,U.__webglColorRenderbuffer[de]);let Ne=r.convert(De.format,De.colorSpace),le=r.convert(De.type),_e=M(De.internalFormat,Ne,le,De.colorSpace,E.isXRRenderTarget===!0),We=ie(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,We,_e,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,U.__webglColorRenderbuffer[de])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(U.__webglDepthRenderbuffer=i.createRenderbuffer(),Be(U.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),qe(i.TEXTURE_CUBE_MAP,y);for(let de=0;de<6;de++)if(y.mipmaps&&y.mipmaps.length>0)for(let De=0;De<y.mipmaps.length;De++)xe(U.__webglFramebuffer[de][De],E,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+de,De);else xe(U.__webglFramebuffer[de],E,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);m(y)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Fe){for(let de=0,De=te.length;de<De;de++){let Ne=te[de],le=n.get(Ne),_e=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(_e=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(_e,le.__webglTexture),qe(_e,Ne),xe(U.__webglFramebuffer,E,Ne,i.COLOR_ATTACHMENT0+de,_e,0),m(Ne)&&p(_e)}t.unbindTexture()}else{let de=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(de=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(de,Y.__webglTexture),qe(de,y),y.mipmaps&&y.mipmaps.length>0)for(let De=0;De<y.mipmaps.length;De++)xe(U.__webglFramebuffer[De],E,y,i.COLOR_ATTACHMENT0,de,De);else xe(U.__webglFramebuffer,E,y,i.COLOR_ATTACHMENT0,de,0);m(y)&&p(de),t.unbindTexture()}E.depthBuffer&&et(E)}function ft(E){let y=E.textures;for(let U=0,Y=y.length;U<Y;U++){let te=y[U];if(m(te)){let K=b(E),Fe=n.get(te).__webglTexture;t.bindTexture(K,Fe),p(K),t.unbindTexture()}}}let He=[],Ue=[];function F(E){if(E.samples>0){if(q(E)===!1){let y=E.textures,U=E.width,Y=E.height,te=i.COLOR_BUFFER_BIT,K=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Fe=n.get(E),de=y.length>1;if(de)for(let Ne=0;Ne<y.length;Ne++)t.bindFramebuffer(i.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ne,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Fe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ne,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer);let De=E.texture.mipmaps;De&&De.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer);for(let Ne=0;Ne<y.length;Ne++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),de){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Fe.__webglColorRenderbuffer[Ne]);let le=n.get(y[Ne]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,le,0)}i.blitFramebuffer(0,0,U,Y,0,0,U,Y,te,i.NEAREST),l===!0&&(He.length=0,Ue.length=0,He.push(i.COLOR_ATTACHMENT0+Ne),E.depthBuffer&&E.resolveDepthBuffer===!1&&(He.push(K),Ue.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ue)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,He))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),de)for(let Ne=0;Ne<y.length;Ne++){t.bindFramebuffer(i.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ne,i.RENDERBUFFER,Fe.__webglColorRenderbuffer[Ne]);let le=n.get(y[Ne]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Fe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ne,i.TEXTURE_2D,le,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){let y=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function ie(E){return Math.min(s.maxSamples,E.samples)}function q(E){let y=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function fe(E){let y=o.render.frame;u.get(E)!==y&&(u.set(E,y),E.update())}function j(E,y){let U=E.colorSpace,Y=E.format,te=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||U!==ln&&U!==Vn&&(it.getTransfer(U)===pt?(Y!==On||te!==ri)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",U)),y}function ee(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=O,this.setTexture2D=Q,this.setTexture2DArray=Z,this.setTexture3D=re,this.setTextureCube=X,this.rebindTextures=Ut,this.setupRenderTarget=C,this.updateRenderTargetMipmap=ft,this.updateMultisampleRenderTarget=F,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=q}function wb(i,e){function t(n,s=Vn){let r,o=it.getTransfer(s);if(n===ri)return i.UNSIGNED_BYTE;if(n===Jl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ql)return i.UNSIGNED_SHORT_5_5_5_1;if(n===gh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===xh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===ph)return i.BYTE;if(n===mh)return i.SHORT;if(n===qr)return i.UNSIGNED_SHORT;if(n===Kl)return i.INT;if(n===ds)return i.UNSIGNED_INT;if(n===Gn)return i.FLOAT;if(n===vn)return i.HALF_FLOAT;if(n===yh)return i.ALPHA;if(n===vh)return i.RGB;if(n===On)return i.RGBA;if(n===Dr)return i.DEPTH_COMPONENT;if(n===jr)return i.DEPTH_STENCIL;if(n===$l)return i.RED;if(n===ec)return i.RED_INTEGER;if(n===_h)return i.RG;if(n===tc)return i.RG_INTEGER;if(n===nc)return i.RGBA_INTEGER;if(n===na||n===ia||n===sa||n===ra)if(o===pt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===na)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===na)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ia)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===sa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ra)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ic||n===sc||n===rc||n===oc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ic)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===sc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===rc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===oc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ac||n===lc||n===cc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ac||n===lc)return o===pt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===cc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===uc||n===hc||n===dc||n===fc||n===pc||n===mc||n===gc||n===xc||n===yc||n===vc||n===_c||n===bc||n===Mc||n===wc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===uc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===hc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===dc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===pc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===mc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===gc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===xc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===yc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===vc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===_c)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===bc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Mc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===wc)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Sc||n===Ec||n===Tc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Sc)return o===pt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ec)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Tc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ac||n===Rc||n===Cc||n===Pc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ac)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Rc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Cc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Pc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Yr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Sb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Eb=`
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

}`,Gh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Wo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ot({vertexShader:Sb,fragmentShader:Eb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new D(new tt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Vh=class extends gi{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,g=null,x=typeof XRWebGLBinding<"u",m=new Gh,p={},b=t.getContextAttributes(),M=null,v=null,T=[],A=[],R=new be,I=null,w=new Xt;w.viewport=new dt;let _=new Xt;_.viewport=new dt;let P=[w,_],O=new Pl,z=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let se=T[$];return se===void 0&&(se=new Br,T[$]=se),se.getTargetRaySpace()},this.getControllerGrip=function($){let se=T[$];return se===void 0&&(se=new Br,T[$]=se),se.getGripSpace()},this.getHand=function($){let se=T[$];return se===void 0&&(se=new Br,T[$]=se),se.getHandSpace()};function Q($){let se=A.indexOf($.inputSource);if(se===-1)return;let xe=T[se];xe!==void 0&&(xe.update($.inputSource,$.frame,c||o),xe.dispatchEvent({type:$.type,data:$.inputSource}))}function Z(){s.removeEventListener("select",Q),s.removeEventListener("selectstart",Q),s.removeEventListener("selectend",Q),s.removeEventListener("squeeze",Q),s.removeEventListener("squeezestart",Q),s.removeEventListener("squeezeend",Q),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",re);for(let $=0;$<T.length;$++){let se=A[$];se!==null&&(A[$]=null,T[$].disconnect(se))}z=null,G=null,m.reset();for(let $ in p)delete p[$];e.setRenderTarget(M),f=null,d=null,h=null,s=null,v=null,$e.stop(),n.isPresenting=!1,e.setPixelRatio(I),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h===null&&x&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(M=e.getRenderTarget(),s.addEventListener("select",Q),s.addEventListener("selectstart",Q),s.addEventListener("selectend",Q),s.addEventListener("squeeze",Q),s.addEventListener("squeezestart",Q),s.addEventListener("squeezeend",Q),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",re),b.xrCompatible!==!0&&await t.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let xe=null,Be=null,Ce=null;b.depth&&(Ce=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,xe=b.stencil?jr:Dr,Be=b.stencil?Yr:ds);let et={colorFormat:t.RGBA8,depthFormat:Ce,scaleFactor:r};h=this.getBinding(),d=h.createProjectionLayer(et),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),v=new Zt(d.textureWidth,d.textureHeight,{format:On,type:ri,depthTexture:new Vo(d.textureWidth,d.textureHeight,Be,void 0,void 0,void 0,void 0,void 0,void 0,xe),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let xe={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,xe),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Zt(f.framebufferWidth,f.framebufferHeight,{format:On,type:ri,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),$e.setContext(s),$e.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function re($){for(let se=0;se<$.removed.length;se++){let xe=$.removed[se],Be=A.indexOf(xe);Be>=0&&(A[Be]=null,T[Be].disconnect(xe))}for(let se=0;se<$.added.length;se++){let xe=$.added[se],Be=A.indexOf(xe);if(Be===-1){for(let et=0;et<T.length;et++)if(et>=A.length){A.push(xe),Be=et;break}else if(A[et]===null){A[et]=xe,Be=et;break}if(Be===-1)break}let Ce=T[Be];Ce&&Ce.connect(xe)}}let X=new L,he=new L;function ge($,se,xe){X.setFromMatrixPosition(se.matrixWorld),he.setFromMatrixPosition(xe.matrixWorld);let Be=X.distanceTo(he),Ce=se.projectionMatrix.elements,et=xe.projectionMatrix.elements,Ut=Ce[14]/(Ce[10]-1),C=Ce[14]/(Ce[10]+1),ft=(Ce[9]+1)/Ce[5],He=(Ce[9]-1)/Ce[5],Ue=(Ce[8]-1)/Ce[0],F=(et[8]+1)/et[0],ie=Ut*Ue,q=Ut*F,fe=Be/(-Ue+F),j=fe*-Ue;if(se.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(j),$.translateZ(fe),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Ce[10]===-1)$.projectionMatrix.copy(se.projectionMatrix),$.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{let ee=Ut+fe,E=C+fe,y=ie-j,U=q+(Be-j),Y=ft*C/E*ee,te=He*C/E*ee;$.projectionMatrix.makePerspective(y,U,Y,te,ee,E),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function Re($,se){se===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(se.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let se=$.near,xe=$.far;m.texture!==null&&(m.depthNear>0&&(se=m.depthNear),m.depthFar>0&&(xe=m.depthFar)),O.near=_.near=w.near=se,O.far=_.far=w.far=xe,(z!==O.near||G!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),z=O.near,G=O.far),O.layers.mask=$.layers.mask|6,w.layers.mask=O.layers.mask&3,_.layers.mask=O.layers.mask&5;let Be=$.parent,Ce=O.cameras;Re(O,Be);for(let et=0;et<Ce.length;et++)Re(Ce[et],Be);Ce.length===2?ge(O,w,_):O.projectionMatrix.copy(w.projectionMatrix),qe($,O,Be)};function qe($,se,xe){xe===null?$.matrix.copy(se.matrixWorld):($.matrix.copy(xe.matrixWorld),$.matrix.invert(),$.matrix.multiply(se.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(se.projectionMatrix),$.projectionMatrixInverse.copy(se.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Fs*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function($){return p[$]};let ct=null;function ut($,se){if(u=se.getViewerPose(c||o),g=se,u!==null){let xe=u.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let Be=!1;xe.length!==O.cameras.length&&(O.cameras.length=0,Be=!0);for(let C=0;C<xe.length;C++){let ft=xe[C],He=null;if(f!==null)He=f.getViewport(ft);else{let F=h.getViewSubImage(d,ft);He=F.viewport,C===0&&(e.setRenderTargetTextures(v,F.colorTexture,F.depthStencilTexture),e.setRenderTarget(v))}let Ue=P[C];Ue===void 0&&(Ue=new Xt,Ue.layers.enable(C),Ue.viewport=new dt,P[C]=Ue),Ue.matrix.fromArray(ft.transform.matrix),Ue.matrix.decompose(Ue.position,Ue.quaternion,Ue.scale),Ue.projectionMatrix.fromArray(ft.projectionMatrix),Ue.projectionMatrixInverse.copy(Ue.projectionMatrix).invert(),Ue.viewport.set(He.x,He.y,He.width,He.height),C===0&&(O.matrix.copy(Ue.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Be===!0&&O.cameras.push(Ue)}let Ce=s.enabledFeatures;if(Ce&&Ce.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){h=n.getBinding();let C=h.getDepthInformation(xe[0]);C&&C.isValid&&C.texture&&m.init(C,s.renderState)}if(Ce&&Ce.includes("camera-access")&&x){e.state.unbindTexture(),h=n.getBinding();for(let C=0;C<xe.length;C++){let ft=xe[C].camera;if(ft){let He=p[ft];He||(He=new Wo,p[ft]=He);let Ue=h.getCameraImage(ft);He.sourceTexture=Ue}}}}for(let xe=0;xe<T.length;xe++){let Be=A[xe],Ce=T[xe];Be!==null&&Ce!==void 0&&Ce.update(Be,se,c||o)}ct&&ct($,se),se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:se}),g=null}let $e=new gm;$e.setAnimationLoop(ut),this.setAnimationLoop=function($){ct=$},this.dispose=function(){}}},$s=new Nn,Tb=new Ye;function Ab(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Th(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,b,M,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,b,M):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===nn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===nn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let b=e.get(p),M=b.envMap,v=b.envMapRotation;M&&(m.envMap.value=M,$s.copy(v),$s.x*=-1,$s.y*=-1,$s.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&($s.y*=-1,$s.z*=-1),m.envMapRotation.value.setFromMatrix4(Tb.makeRotationFromEuler($s)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=M*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===nn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Rb(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,M){let v=M.program;n.uniformBlockBinding(b,v)}function c(b,M){let v=s[b.id];v===void 0&&(g(b),v=u(b),s[b.id]=v,b.addEventListener("dispose",m));let T=M.program;n.updateUBOMapping(b,T);let A=e.render.frame;r[b.id]!==A&&(d(b),r[b.id]=A)}function u(b){let M=h();b.__bindingPointIndex=M;let v=i.createBuffer(),T=b.__size,A=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,T,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,v),v}function h(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){let M=s[b.id],v=b.uniforms,T=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let A=0,R=v.length;A<R;A++){let I=Array.isArray(v[A])?v[A]:[v[A]];for(let w=0,_=I.length;w<_;w++){let P=I[w];if(f(P,A,w,T)===!0){let O=P.__offset,z=Array.isArray(P.value)?P.value:[P.value],G=0;for(let Q=0;Q<z.length;Q++){let Z=z[Q],re=x(Z);typeof Z=="number"||typeof Z=="boolean"?(P.__data[0]=Z,i.bufferSubData(i.UNIFORM_BUFFER,O+G,P.__data)):Z.isMatrix3?(P.__data[0]=Z.elements[0],P.__data[1]=Z.elements[1],P.__data[2]=Z.elements[2],P.__data[3]=0,P.__data[4]=Z.elements[3],P.__data[5]=Z.elements[4],P.__data[6]=Z.elements[5],P.__data[7]=0,P.__data[8]=Z.elements[6],P.__data[9]=Z.elements[7],P.__data[10]=Z.elements[8],P.__data[11]=0):(Z.toArray(P.__data,G),G+=re.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(b,M,v,T){let A=b.value,R=M+"_"+v;if(T[R]===void 0)return typeof A=="number"||typeof A=="boolean"?T[R]=A:T[R]=A.clone(),!0;{let I=T[R];if(typeof A=="number"||typeof A=="boolean"){if(I!==A)return T[R]=A,!0}else if(I.equals(A)===!1)return I.copy(A),!0}return!1}function g(b){let M=b.uniforms,v=0,T=16;for(let R=0,I=M.length;R<I;R++){let w=Array.isArray(M[R])?M[R]:[M[R]];for(let _=0,P=w.length;_<P;_++){let O=w[_],z=Array.isArray(O.value)?O.value:[O.value];for(let G=0,Q=z.length;G<Q;G++){let Z=z[G],re=x(Z),X=v%T,he=X%re.boundary,ge=X+he;v+=he,ge!==0&&T-ge<re.storage&&(v+=T-ge),O.__data=new Float32Array(re.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=v,v+=re.storage}}}let A=v%T;return A>0&&(v+=T-A),b.__size=v,b.__cache={},this}function x(b){let M={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(M.boundary=4,M.storage=4):b.isVector2?(M.boundary=8,M.storage=8):b.isVector3||b.isColor?(M.boundary=16,M.storage=12):b.isVector4?(M.boundary=16,M.storage=16):b.isMatrix3?(M.boundary=48,M.storage=48):b.isMatrix4?(M.boundary=64,M.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),M}function m(b){let M=b.target;M.removeEventListener("dispose",m);let v=o.indexOf(M.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function p(){for(let b in s)i.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}var Uc=class{constructor(e={}){let{canvas:t=Gp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),x=new Int32Array(4),m=null,p=null,b=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Yi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let v=this,T=!1;this._outputColorSpace=Dt;let A=0,R=0,I=null,w=-1,_=null,P=new dt,O=new dt,z=null,G=new we(0),Q=0,Z=t.width,re=t.height,X=1,he=null,ge=null,Re=new dt(0,0,Z,re),qe=new dt(0,0,Z,re),ct=!1,ut=new zr,$e=!1,$=!1,se=new Ye,xe=new L,Be=new dt,Ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},et=!1;function Ut(){return I===null?X:1}let C=n;function ft(S,B){return t.getContext(S,B)}try{let S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",pe,!1),t.addEventListener("webglcontextrestored",Ae,!1),t.addEventListener("webglcontextcreationerror",oe,!1),C===null){let B="webgl2";if(C=ft(B,S),C===null)throw ft(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let He,Ue,F,ie,q,fe,j,ee,E,y,U,Y,te,K,Fe,de,De,Ne,le,_e,We,Oe,ye,Je;function N(){He=new qv(C),He.init(),Oe=new wb(C,He),Ue=new kv(C,He,e,Oe),F=new bb(C,He),Ue.reversedDepthBuffer&&d&&F.buffers.depth.setReversed(!0),ie=new Zv(C),q=new lb,fe=new Mb(C,He,F,q,Ue,Oe,ie),j=new zv(v),ee=new Xv(v),E=new tx(C),ye=new Fv(C,E),y=new Yv(C,E,ie,ye),U=new Jv(C,y,E,ie),le=new Kv(C,Ue,fe),de=new Hv(q),Y=new ab(v,j,ee,He,Ue,ye,de),te=new Ab(v,q),K=new ub,Fe=new gb(He),Ne=new Uv(v,j,ee,F,U,f,l),De=new vb(v,U,Ue),Je=new Rb(C,ie,Ue,F),_e=new Bv(C,He,ie),We=new jv(C,He,ie),ie.programs=Y.programs,v.capabilities=Ue,v.extensions=He,v.properties=q,v.renderLists=K,v.shadowMap=De,v.state=F,v.info=ie}N();let ce=new Vh(v,C);this.xr=ce,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){let S=He.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=He.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(S){S!==void 0&&(X=S,this.setSize(Z,re,!1))},this.getSize=function(S){return S.set(Z,re)},this.setSize=function(S,B,V=!0){if(ce.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=S,re=B,t.width=Math.floor(S*X),t.height=Math.floor(B*X),V===!0&&(t.style.width=S+"px",t.style.height=B+"px"),this.setViewport(0,0,S,B)},this.getDrawingBufferSize=function(S){return S.set(Z*X,re*X).floor()},this.setDrawingBufferSize=function(S,B,V){Z=S,re=B,X=V,t.width=Math.floor(S*V),t.height=Math.floor(B*V),this.setViewport(0,0,S,B)},this.getCurrentViewport=function(S){return S.copy(P)},this.getViewport=function(S){return S.copy(Re)},this.setViewport=function(S,B,V,W){S.isVector4?Re.set(S.x,S.y,S.z,S.w):Re.set(S,B,V,W),F.viewport(P.copy(Re).multiplyScalar(X).round())},this.getScissor=function(S){return S.copy(qe)},this.setScissor=function(S,B,V,W){S.isVector4?qe.set(S.x,S.y,S.z,S.w):qe.set(S,B,V,W),F.scissor(O.copy(qe).multiplyScalar(X).round())},this.getScissorTest=function(){return ct},this.setScissorTest=function(S){F.setScissorTest(ct=S)},this.setOpaqueSort=function(S){he=S},this.setTransparentSort=function(S){ge=S},this.getClearColor=function(S){return S.copy(Ne.getClearColor())},this.setClearColor=function(){Ne.setClearColor(...arguments)},this.getClearAlpha=function(){return Ne.getClearAlpha()},this.setClearAlpha=function(){Ne.setClearAlpha(...arguments)},this.clear=function(S=!0,B=!0,V=!0){let W=0;if(S){let k=!1;if(I!==null){let ae=I.texture.format;k=ae===nc||ae===tc||ae===ec}if(k){let ae=I.texture.type,ve=ae===ri||ae===ds||ae===qr||ae===Yr||ae===Jl||ae===Ql,Pe=Ne.getClearColor(),Ee=Ne.getClearAlpha(),Ve=Pe.r,Xe=Pe.g,ke=Pe.b;ve?(g[0]=Ve,g[1]=Xe,g[2]=ke,g[3]=Ee,C.clearBufferuiv(C.COLOR,0,g)):(x[0]=Ve,x[1]=Xe,x[2]=ke,x[3]=Ee,C.clearBufferiv(C.COLOR,0,x))}else W|=C.COLOR_BUFFER_BIT}B&&(W|=C.DEPTH_BUFFER_BIT),V&&(W|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",pe,!1),t.removeEventListener("webglcontextrestored",Ae,!1),t.removeEventListener("webglcontextcreationerror",oe,!1),Ne.dispose(),K.dispose(),Fe.dispose(),q.dispose(),j.dispose(),ee.dispose(),U.dispose(),ye.dispose(),Je.dispose(),Y.dispose(),ce.dispose(),ce.removeEventListener("sessionstart",fi),ce.removeEventListener("sessionend",ff),Ss.stop()};function pe(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function Ae(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let S=ie.autoReset,B=De.enabled,V=De.autoUpdate,W=De.needsUpdate,k=De.type;N(),ie.autoReset=S,De.enabled=B,De.autoUpdate=V,De.needsUpdate=W,De.type=k}function oe(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function ne(S){let B=S.target;B.removeEventListener("dispose",ne),Ie(B)}function Ie(S){je(S),q.remove(S)}function je(S){let B=q.get(S).programs;B!==void 0&&(B.forEach(function(V){Y.releaseProgram(V)}),S.isShaderMaterial&&Y.releaseShaderCache(S))}this.renderBufferDirect=function(S,B,V,W,k,ae){B===null&&(B=Ce);let ve=k.isMesh&&k.matrixWorld.determinant()<0,Pe=jg(S,B,V,W,k);F.setMaterial(W,ve);let Ee=V.index,Ve=1;if(W.wireframe===!0){if(Ee=y.getWireframeAttribute(V),Ee===void 0)return;Ve=2}let Xe=V.drawRange,ke=V.attributes.position,ot=Xe.start*Ve,St=(Xe.start+Xe.count)*Ve;ae!==null&&(ot=Math.max(ot,ae.start*Ve),St=Math.min(St,(ae.start+ae.count)*Ve)),Ee!==null?(ot=Math.max(ot,0),St=Math.min(St,Ee.count)):ke!=null&&(ot=Math.max(ot,0),St=Math.min(St,ke.count));let zt=St-ot;if(zt<0||zt===1/0)return;ye.setup(k,W,Pe,V,Ee);let Lt,Tt=_e;if(Ee!==null&&(Lt=E.get(Ee),Tt=We,Tt.setIndex(Lt)),k.isMesh)W.wireframe===!0?(F.setLineWidth(W.wireframeLinewidth*Ut()),Tt.setMode(C.LINES)):Tt.setMode(C.TRIANGLES);else if(k.isLine){let ze=W.linewidth;ze===void 0&&(ze=1),F.setLineWidth(ze*Ut()),k.isLineSegments?Tt.setMode(C.LINES):k.isLineLoop?Tt.setMode(C.LINE_LOOP):Tt.setMode(C.LINE_STRIP)}else k.isPoints?Tt.setMode(C.POINTS):k.isSprite&&Tt.setMode(C.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)Or("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Tt.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(He.get("WEBGL_multi_draw"))Tt.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let ze=k._multiDrawStarts,Ft=k._multiDrawCounts,ht=k._multiDrawCount,Cn=Ee?E.get(Ee).bytesPerElement:1,dr=q.get(W).currentProgram.getUniforms();for(let Pn=0;Pn<ht;Pn++)dr.setValue(C,"_gl_DrawID",Pn),Tt.render(ze[Pn]/Cn,Ft[Pn])}else if(k.isInstancedMesh)Tt.renderInstances(ot,zt,k.count);else if(V.isInstancedBufferGeometry){let ze=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Ft=Math.min(V.instanceCount,ze);Tt.renderInstances(ot,zt,Ft)}else Tt.render(ot,zt)};function Ct(S,B,V){S.transparent===!0&&S.side===yn&&S.forceSinglePass===!1?(S.side=nn,S.needsUpdate=!0,Ba(S,B,V),S.side=ei,S.needsUpdate=!0,Ba(S,B,V),S.side=yn):Ba(S,B,V)}this.compile=function(S,B,V=null){V===null&&(V=S),p=Fe.get(V),p.init(B),M.push(p),V.traverseVisible(function(k){k.isLight&&k.layers.test(B.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),S!==V&&S.traverseVisible(function(k){k.isLight&&k.layers.test(B.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();let W=new Set;return S.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let ae=k.material;if(ae)if(Array.isArray(ae))for(let ve=0;ve<ae.length;ve++){let Pe=ae[ve];Ct(Pe,V,k),W.add(Pe)}else Ct(ae,V,k),W.add(ae)}),p=M.pop(),W},this.compileAsync=function(S,B,V=null){let W=this.compile(S,B,V);return new Promise(k=>{function ae(){if(W.forEach(function(ve){q.get(ve).currentProgram.isReady()&&W.delete(ve)}),W.size===0){k(S);return}setTimeout(ae,10)}He.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let yt=null;function Ci(S){yt&&yt(S)}function fi(){Ss.stop()}function ff(){Ss.start()}let Ss=new gm;Ss.setAnimationLoop(Ci),typeof self<"u"&&Ss.setContext(self),this.setAnimationLoop=function(S){yt=S,ce.setAnimationLoop(S),S===null?Ss.stop():Ss.start()},ce.addEventListener("sessionstart",fi),ce.addEventListener("sessionend",ff),this.render=function(S,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),ce.enabled===!0&&ce.isPresenting===!0&&(ce.cameraAutoUpdate===!0&&ce.updateCamera(B),B=ce.getCamera()),S.isScene===!0&&S.onBeforeRender(v,S,B,I),p=Fe.get(S,M.length),p.init(B),M.push(p),se.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),ut.setFromProjectionMatrix(se,Qn,B.reversedDepth),$=this.localClippingEnabled,$e=de.init(this.clippingPlanes,$),m=K.get(S,b.length),m.init(),b.push(m),ce.enabled===!0&&ce.isPresenting===!0){let ae=v.xr.getDepthSensingMesh();ae!==null&&Su(ae,B,-1/0,v.sortObjects)}Su(S,B,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(he,ge),et=ce.enabled===!1||ce.isPresenting===!1||ce.hasDepthSensing()===!1,et&&Ne.addToRenderList(m,S),this.info.render.frame++,$e===!0&&de.beginShadows();let V=p.state.shadowsArray;De.render(V,S,B),$e===!0&&de.endShadows(),this.info.autoReset===!0&&this.info.reset();let W=m.opaque,k=m.transmissive;if(p.setupLights(),B.isArrayCamera){let ae=B.cameras;if(k.length>0)for(let ve=0,Pe=ae.length;ve<Pe;ve++){let Ee=ae[ve];mf(W,k,S,Ee)}et&&Ne.render(S);for(let ve=0,Pe=ae.length;ve<Pe;ve++){let Ee=ae[ve];pf(m,S,Ee,Ee.viewport)}}else k.length>0&&mf(W,k,S,B),et&&Ne.render(S),pf(m,S,B);I!==null&&R===0&&(fe.updateMultisampleRenderTarget(I),fe.updateRenderTargetMipmap(I)),S.isScene===!0&&S.onAfterRender(v,S,B),ye.resetDefaultState(),w=-1,_=null,M.pop(),M.length>0?(p=M[M.length-1],$e===!0&&de.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function Su(S,B,V,W){if(S.visible===!1)return;if(S.layers.test(B.layers)){if(S.isGroup)V=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(B);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||ut.intersectsSprite(S)){W&&Be.setFromMatrixPosition(S.matrixWorld).applyMatrix4(se);let ve=U.update(S),Pe=S.material;Pe.visible&&m.push(S,ve,Pe,V,Be.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||ut.intersectsObject(S))){let ve=U.update(S),Pe=S.material;if(W&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Be.copy(S.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),Be.copy(ve.boundingSphere.center)),Be.applyMatrix4(S.matrixWorld).applyMatrix4(se)),Array.isArray(Pe)){let Ee=ve.groups;for(let Ve=0,Xe=Ee.length;Ve<Xe;Ve++){let ke=Ee[Ve],ot=Pe[ke.materialIndex];ot&&ot.visible&&m.push(S,ve,ot,V,Be.z,ke)}}else Pe.visible&&m.push(S,ve,Pe,V,Be.z,null)}}let ae=S.children;for(let ve=0,Pe=ae.length;ve<Pe;ve++)Su(ae[ve],B,V,W)}function pf(S,B,V,W){let k=S.opaque,ae=S.transmissive,ve=S.transparent;p.setupLightsView(V),$e===!0&&de.setGlobalState(v.clippingPlanes,V),W&&F.viewport(P.copy(W)),k.length>0&&Fa(k,B,V),ae.length>0&&Fa(ae,B,V),ve.length>0&&Fa(ve,B,V),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function mf(S,B,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new Zt(1,1,{generateMipmaps:!0,type:He.has("EXT_color_buffer_half_float")||He.has("EXT_color_buffer_float")?vn:ri,minFilter:si,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:it.workingColorSpace}));let ae=p.state.transmissionRenderTarget[W.id],ve=W.viewport||P;ae.setSize(ve.z*v.transmissionResolutionScale,ve.w*v.transmissionResolutionScale);let Pe=v.getRenderTarget(),Ee=v.getActiveCubeFace(),Ve=v.getActiveMipmapLevel();v.setRenderTarget(ae),v.getClearColor(G),Q=v.getClearAlpha(),Q<1&&v.setClearColor(16777215,.5),v.clear(),et&&Ne.render(V);let Xe=v.toneMapping;v.toneMapping=Yi;let ke=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),$e===!0&&de.setGlobalState(v.clippingPlanes,W),Fa(S,V,W),fe.updateMultisampleRenderTarget(ae),fe.updateRenderTargetMipmap(ae),He.has("WEBGL_multisampled_render_to_texture")===!1){let ot=!1;for(let St=0,zt=B.length;St<zt;St++){let Lt=B[St],Tt=Lt.object,ze=Lt.geometry,Ft=Lt.material,ht=Lt.group;if(Ft.side===yn&&Tt.layers.test(W.layers)){let Cn=Ft.side;Ft.side=nn,Ft.needsUpdate=!0,gf(Tt,V,W,ze,Ft,ht),Ft.side=Cn,Ft.needsUpdate=!0,ot=!0}}ot===!0&&(fe.updateMultisampleRenderTarget(ae),fe.updateRenderTargetMipmap(ae))}v.setRenderTarget(Pe,Ee,Ve),v.setClearColor(G,Q),ke!==void 0&&(W.viewport=ke),v.toneMapping=Xe}function Fa(S,B,V){let W=B.isScene===!0?B.overrideMaterial:null;for(let k=0,ae=S.length;k<ae;k++){let ve=S[k],Pe=ve.object,Ee=ve.geometry,Ve=ve.group,Xe=ve.material;Xe.allowOverride===!0&&W!==null&&(Xe=W),Pe.layers.test(V.layers)&&gf(Pe,B,V,Ee,Xe,Ve)}}function gf(S,B,V,W,k,ae){S.onBeforeRender(v,B,V,W,k,ae),S.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),k.onBeforeRender(v,B,V,W,S,ae),k.transparent===!0&&k.side===yn&&k.forceSinglePass===!1?(k.side=nn,k.needsUpdate=!0,v.renderBufferDirect(V,B,W,k,S,ae),k.side=ei,k.needsUpdate=!0,v.renderBufferDirect(V,B,W,k,S,ae),k.side=yn):v.renderBufferDirect(V,B,W,k,S,ae),S.onAfterRender(v,B,V,W,k,ae)}function Ba(S,B,V){B.isScene!==!0&&(B=Ce);let W=q.get(S),k=p.state.lights,ae=p.state.shadowsArray,ve=k.state.version,Pe=Y.getParameters(S,k.state,ae,B,V),Ee=Y.getProgramCacheKey(Pe),Ve=W.programs;W.environment=S.isMeshStandardMaterial?B.environment:null,W.fog=B.fog,W.envMap=(S.isMeshStandardMaterial?ee:j).get(S.envMap||W.environment),W.envMapRotation=W.environment!==null&&S.envMap===null?B.environmentRotation:S.envMapRotation,Ve===void 0&&(S.addEventListener("dispose",ne),Ve=new Map,W.programs=Ve);let Xe=Ve.get(Ee);if(Xe!==void 0){if(W.currentProgram===Xe&&W.lightsStateVersion===ve)return yf(S,Pe),Xe}else Pe.uniforms=Y.getUniforms(S),S.onBeforeCompile(Pe,v),Xe=Y.acquireProgram(Pe,Ee),Ve.set(Ee,Xe),W.uniforms=Pe.uniforms;let ke=W.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(ke.clippingPlanes=de.uniform),yf(S,Pe),W.needsLights=Kg(S),W.lightsStateVersion=ve,W.needsLights&&(ke.ambientLightColor.value=k.state.ambient,ke.lightProbe.value=k.state.probe,ke.directionalLights.value=k.state.directional,ke.directionalLightShadows.value=k.state.directionalShadow,ke.spotLights.value=k.state.spot,ke.spotLightShadows.value=k.state.spotShadow,ke.rectAreaLights.value=k.state.rectArea,ke.ltc_1.value=k.state.rectAreaLTC1,ke.ltc_2.value=k.state.rectAreaLTC2,ke.pointLights.value=k.state.point,ke.pointLightShadows.value=k.state.pointShadow,ke.hemisphereLights.value=k.state.hemi,ke.directionalShadowMap.value=k.state.directionalShadowMap,ke.directionalShadowMatrix.value=k.state.directionalShadowMatrix,ke.spotShadowMap.value=k.state.spotShadowMap,ke.spotLightMatrix.value=k.state.spotLightMatrix,ke.spotLightMap.value=k.state.spotLightMap,ke.pointShadowMap.value=k.state.pointShadowMap,ke.pointShadowMatrix.value=k.state.pointShadowMatrix),W.currentProgram=Xe,W.uniformsList=null,Xe}function xf(S){if(S.uniformsList===null){let B=S.currentProgram.getUniforms();S.uniformsList=$r.seqWithValue(B.seq,S.uniforms)}return S.uniformsList}function yf(S,B){let V=q.get(S);V.outputColorSpace=B.outputColorSpace,V.batching=B.batching,V.batchingColor=B.batchingColor,V.instancing=B.instancing,V.instancingColor=B.instancingColor,V.instancingMorph=B.instancingMorph,V.skinning=B.skinning,V.morphTargets=B.morphTargets,V.morphNormals=B.morphNormals,V.morphColors=B.morphColors,V.morphTargetsCount=B.morphTargetsCount,V.numClippingPlanes=B.numClippingPlanes,V.numIntersection=B.numClipIntersection,V.vertexAlphas=B.vertexAlphas,V.vertexTangents=B.vertexTangents,V.toneMapping=B.toneMapping}function jg(S,B,V,W,k){B.isScene!==!0&&(B=Ce),fe.resetTextureUnits();let ae=B.fog,ve=W.isMeshStandardMaterial?B.environment:null,Pe=I===null?v.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:ln,Ee=(W.isMeshStandardMaterial?ee:j).get(W.envMap||ve),Ve=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Xe=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),ke=!!V.morphAttributes.position,ot=!!V.morphAttributes.normal,St=!!V.morphAttributes.color,zt=Yi;W.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(zt=v.toneMapping);let Lt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Tt=Lt!==void 0?Lt.length:0,ze=q.get(W),Ft=p.state.lights;if($e===!0&&($===!0||S!==_)){let mn=S===_&&W.id===w;de.setState(W,S,mn)}let ht=!1;W.version===ze.__version?(ze.needsLights&&ze.lightsStateVersion!==Ft.state.version||ze.outputColorSpace!==Pe||k.isBatchedMesh&&ze.batching===!1||!k.isBatchedMesh&&ze.batching===!0||k.isBatchedMesh&&ze.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&ze.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&ze.instancing===!1||!k.isInstancedMesh&&ze.instancing===!0||k.isSkinnedMesh&&ze.skinning===!1||!k.isSkinnedMesh&&ze.skinning===!0||k.isInstancedMesh&&ze.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&ze.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&ze.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&ze.instancingMorph===!1&&k.morphTexture!==null||ze.envMap!==Ee||W.fog===!0&&ze.fog!==ae||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==de.numPlanes||ze.numIntersection!==de.numIntersection)||ze.vertexAlphas!==Ve||ze.vertexTangents!==Xe||ze.morphTargets!==ke||ze.morphNormals!==ot||ze.morphColors!==St||ze.toneMapping!==zt||ze.morphTargetsCount!==Tt)&&(ht=!0):(ht=!0,ze.__version=W.version);let Cn=ze.currentProgram;ht===!0&&(Cn=Ba(W,B,k));let dr=!1,Pn=!1,po=!1,Bt=Cn.getUniforms(),Fn=ze.uniforms;if(F.useProgram(Cn.program)&&(dr=!0,Pn=!0,po=!0),W.id!==w&&(w=W.id,Pn=!0),dr||_!==S){F.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),Bt.setValue(C,"projectionMatrix",S.projectionMatrix),Bt.setValue(C,"viewMatrix",S.matrixWorldInverse);let wn=Bt.map.cameraPosition;wn!==void 0&&wn.setValue(C,xe.setFromMatrixPosition(S.matrixWorld)),Ue.logarithmicDepthBuffer&&Bt.setValue(C,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Bt.setValue(C,"isOrthographic",S.isOrthographicCamera===!0),_!==S&&(_=S,Pn=!0,po=!0)}if(k.isSkinnedMesh){Bt.setOptional(C,k,"bindMatrix"),Bt.setOptional(C,k,"bindMatrixInverse");let mn=k.skeleton;mn&&(mn.boneTexture===null&&mn.computeBoneTexture(),Bt.setValue(C,"boneTexture",mn.boneTexture,fe))}k.isBatchedMesh&&(Bt.setOptional(C,k,"batchingTexture"),Bt.setValue(C,"batchingTexture",k._matricesTexture,fe),Bt.setOptional(C,k,"batchingIdTexture"),Bt.setValue(C,"batchingIdTexture",k._indirectTexture,fe),Bt.setOptional(C,k,"batchingColorTexture"),k._colorsTexture!==null&&Bt.setValue(C,"batchingColorTexture",k._colorsTexture,fe));let Bn=V.morphAttributes;if((Bn.position!==void 0||Bn.normal!==void 0||Bn.color!==void 0)&&le.update(k,V,Cn),(Pn||ze.receiveShadow!==k.receiveShadow)&&(ze.receiveShadow=k.receiveShadow,Bt.setValue(C,"receiveShadow",k.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Fn.envMap.value=Ee,Fn.flipEnvMap.value=Ee.isCubeTexture&&Ee.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&B.environment!==null&&(Fn.envMapIntensity.value=B.environmentIntensity),Pn&&(Bt.setValue(C,"toneMappingExposure",v.toneMappingExposure),ze.needsLights&&Zg(Fn,po),ae&&W.fog===!0&&te.refreshFogUniforms(Fn,ae),te.refreshMaterialUniforms(Fn,W,X,re,p.state.transmissionRenderTarget[S.id]),$r.upload(C,xf(ze),Fn,fe)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&($r.upload(C,xf(ze),Fn,fe),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Bt.setValue(C,"center",k.center),Bt.setValue(C,"modelViewMatrix",k.modelViewMatrix),Bt.setValue(C,"normalMatrix",k.normalMatrix),Bt.setValue(C,"modelMatrix",k.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){let mn=W.uniformsGroups;for(let wn=0,Eu=mn.length;wn<Eu;wn++){let Es=mn[wn];Je.update(Es,Cn),Je.bind(Es,Cn)}}return Cn}function Zg(S,B){S.ambientLightColor.needsUpdate=B,S.lightProbe.needsUpdate=B,S.directionalLights.needsUpdate=B,S.directionalLightShadows.needsUpdate=B,S.pointLights.needsUpdate=B,S.pointLightShadows.needsUpdate=B,S.spotLights.needsUpdate=B,S.spotLightShadows.needsUpdate=B,S.rectAreaLights.needsUpdate=B,S.hemisphereLights.needsUpdate=B}function Kg(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(S,B,V){let W=q.get(S);W.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),q.get(S.texture).__webglTexture=B,q.get(S.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:V,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,B){let V=q.get(S);V.__webglFramebuffer=B,V.__useDefaultFramebuffer=B===void 0};let Jg=C.createFramebuffer();this.setRenderTarget=function(S,B=0,V=0){I=S,A=B,R=V;let W=!0,k=null,ae=!1,ve=!1;if(S){let Ee=q.get(S);if(Ee.__useDefaultFramebuffer!==void 0)F.bindFramebuffer(C.FRAMEBUFFER,null),W=!1;else if(Ee.__webglFramebuffer===void 0)fe.setupRenderTarget(S);else if(Ee.__hasExternalTextures)fe.rebindTextures(S,q.get(S.texture).__webglTexture,q.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let ke=S.depthTexture;if(Ee.__boundDepthTexture!==ke){if(ke!==null&&q.has(ke)&&(S.width!==ke.image.width||S.height!==ke.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");fe.setupDepthRenderbuffer(S)}}let Ve=S.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(ve=!0);let Xe=q.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Xe[B])?k=Xe[B][V]:k=Xe[B],ae=!0):S.samples>0&&fe.useMultisampledRTT(S)===!1?k=q.get(S).__webglMultisampledFramebuffer:Array.isArray(Xe)?k=Xe[V]:k=Xe,P.copy(S.viewport),O.copy(S.scissor),z=S.scissorTest}else P.copy(Re).multiplyScalar(X).floor(),O.copy(qe).multiplyScalar(X).floor(),z=ct;if(V!==0&&(k=Jg),F.bindFramebuffer(C.FRAMEBUFFER,k)&&W&&F.drawBuffers(S,k),F.viewport(P),F.scissor(O),F.setScissorTest(z),ae){let Ee=q.get(S.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+B,Ee.__webglTexture,V)}else if(ve){let Ee=B;for(let Ve=0;Ve<S.textures.length;Ve++){let Xe=q.get(S.textures[Ve]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Ve,Xe.__webglTexture,V,Ee)}}else if(S!==null&&V!==0){let Ee=q.get(S.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Ee.__webglTexture,V)}w=-1},this.readRenderTargetPixels=function(S,B,V,W,k,ae,ve,Pe=0){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=q.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(Ee=Ee[ve]),Ee){F.bindFramebuffer(C.FRAMEBUFFER,Ee);try{let Ve=S.textures[Pe],Xe=Ve.format,ke=Ve.type;if(!Ue.textureFormatReadable(Xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ue.textureTypeReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=S.width-W&&V>=0&&V<=S.height-k&&(S.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Pe),C.readPixels(B,V,W,k,Oe.convert(Xe),Oe.convert(ke),ae))}finally{let Ve=I!==null?q.get(I).__webglFramebuffer:null;F.bindFramebuffer(C.FRAMEBUFFER,Ve)}}},this.readRenderTargetPixelsAsync=async function(S,B,V,W,k,ae,ve,Pe=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=q.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(Ee=Ee[ve]),Ee)if(B>=0&&B<=S.width-W&&V>=0&&V<=S.height-k){F.bindFramebuffer(C.FRAMEBUFFER,Ee);let Ve=S.textures[Pe],Xe=Ve.format,ke=Ve.type;if(!Ue.textureFormatReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ue.textureTypeReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ot=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,ot),C.bufferData(C.PIXEL_PACK_BUFFER,ae.byteLength,C.STREAM_READ),S.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Pe),C.readPixels(B,V,W,k,Oe.convert(Xe),Oe.convert(ke),0);let St=I!==null?q.get(I).__webglFramebuffer:null;F.bindFramebuffer(C.FRAMEBUFFER,St);let zt=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Vp(C,zt,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,ot),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,ae),C.deleteBuffer(ot),C.deleteSync(zt),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,B=null,V=0){let W=Math.pow(2,-V),k=Math.floor(S.image.width*W),ae=Math.floor(S.image.height*W),ve=B!==null?B.x:0,Pe=B!==null?B.y:0;fe.setTexture2D(S,0),C.copyTexSubImage2D(C.TEXTURE_2D,V,0,0,ve,Pe,k,ae),F.unbindTexture()};let Qg=C.createFramebuffer(),$g=C.createFramebuffer();this.copyTextureToTexture=function(S,B,V=null,W=null,k=0,ae=null){ae===null&&(k!==0?(Or("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ae=k,k=0):ae=0);let ve,Pe,Ee,Ve,Xe,ke,ot,St,zt,Lt=S.isCompressedTexture?S.mipmaps[ae]:S.image;if(V!==null)ve=V.max.x-V.min.x,Pe=V.max.y-V.min.y,Ee=V.isBox3?V.max.z-V.min.z:1,Ve=V.min.x,Xe=V.min.y,ke=V.isBox3?V.min.z:0;else{let Bn=Math.pow(2,-k);ve=Math.floor(Lt.width*Bn),Pe=Math.floor(Lt.height*Bn),S.isDataArrayTexture?Ee=Lt.depth:S.isData3DTexture?Ee=Math.floor(Lt.depth*Bn):Ee=1,Ve=0,Xe=0,ke=0}W!==null?(ot=W.x,St=W.y,zt=W.z):(ot=0,St=0,zt=0);let Tt=Oe.convert(B.format),ze=Oe.convert(B.type),Ft;B.isData3DTexture?(fe.setTexture3D(B,0),Ft=C.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(fe.setTexture2DArray(B,0),Ft=C.TEXTURE_2D_ARRAY):(fe.setTexture2D(B,0),Ft=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,B.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,B.unpackAlignment);let ht=C.getParameter(C.UNPACK_ROW_LENGTH),Cn=C.getParameter(C.UNPACK_IMAGE_HEIGHT),dr=C.getParameter(C.UNPACK_SKIP_PIXELS),Pn=C.getParameter(C.UNPACK_SKIP_ROWS),po=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,Lt.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Lt.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ve),C.pixelStorei(C.UNPACK_SKIP_ROWS,Xe),C.pixelStorei(C.UNPACK_SKIP_IMAGES,ke);let Bt=S.isDataArrayTexture||S.isData3DTexture,Fn=B.isDataArrayTexture||B.isData3DTexture;if(S.isDepthTexture){let Bn=q.get(S),mn=q.get(B),wn=q.get(Bn.__renderTarget),Eu=q.get(mn.__renderTarget);F.bindFramebuffer(C.READ_FRAMEBUFFER,wn.__webglFramebuffer),F.bindFramebuffer(C.DRAW_FRAMEBUFFER,Eu.__webglFramebuffer);for(let Es=0;Es<Ee;Es++)Bt&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,q.get(S).__webglTexture,k,ke+Es),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,q.get(B).__webglTexture,ae,zt+Es)),C.blitFramebuffer(Ve,Xe,ve,Pe,ot,St,ve,Pe,C.DEPTH_BUFFER_BIT,C.NEAREST);F.bindFramebuffer(C.READ_FRAMEBUFFER,null),F.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(k!==0||S.isRenderTargetTexture||q.has(S)){let Bn=q.get(S),mn=q.get(B);F.bindFramebuffer(C.READ_FRAMEBUFFER,Qg),F.bindFramebuffer(C.DRAW_FRAMEBUFFER,$g);for(let wn=0;wn<Ee;wn++)Bt?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Bn.__webglTexture,k,ke+wn):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Bn.__webglTexture,k),Fn?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,mn.__webglTexture,ae,zt+wn):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,mn.__webglTexture,ae),k!==0?C.blitFramebuffer(Ve,Xe,ve,Pe,ot,St,ve,Pe,C.COLOR_BUFFER_BIT,C.NEAREST):Fn?C.copyTexSubImage3D(Ft,ae,ot,St,zt+wn,Ve,Xe,ve,Pe):C.copyTexSubImage2D(Ft,ae,ot,St,Ve,Xe,ve,Pe);F.bindFramebuffer(C.READ_FRAMEBUFFER,null),F.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else Fn?S.isDataTexture||S.isData3DTexture?C.texSubImage3D(Ft,ae,ot,St,zt,ve,Pe,Ee,Tt,ze,Lt.data):B.isCompressedArrayTexture?C.compressedTexSubImage3D(Ft,ae,ot,St,zt,ve,Pe,Ee,Tt,Lt.data):C.texSubImage3D(Ft,ae,ot,St,zt,ve,Pe,Ee,Tt,ze,Lt):S.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,ae,ot,St,ve,Pe,Tt,ze,Lt.data):S.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,ae,ot,St,Lt.width,Lt.height,Tt,Lt.data):C.texSubImage2D(C.TEXTURE_2D,ae,ot,St,ve,Pe,Tt,ze,Lt);C.pixelStorei(C.UNPACK_ROW_LENGTH,ht),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Cn),C.pixelStorei(C.UNPACK_SKIP_PIXELS,dr),C.pixelStorei(C.UNPACK_SKIP_ROWS,Pn),C.pixelStorei(C.UNPACK_SKIP_IMAGES,po),ae===0&&B.generateMipmaps&&C.generateMipmap(Ft),F.unbindTexture()},this.initRenderTarget=function(S){q.get(S).__webglFramebuffer===void 0&&fe.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?fe.setTextureCube(S,0):S.isData3DTexture?fe.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?fe.setTexture2DArray(S,0):fe.setTexture2D(S,0),F.unbindTexture()},this.resetState=function(){A=0,R=0,I=null,F.reset(),ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=it._getDrawingBufferColorSpace(e),t.unpackColorSpace=it._getUnpackColorSpace()}};var to={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var _n=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Cb=new Xi(-1,1,1,-1,0,1),Xh=class extends Nt{constructor(){super(),this.setAttribute("position",new lt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new lt([0,2,0,0,2,0],2))}},Pb=new Xh,Ei=class{constructor(e){this._mesh=new D(Pb,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Cb)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Bc=class extends _n{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Ot?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Un.clone(e.uniforms),this.material=new Ot({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ei(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var ua=class extends _n{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},kc=class extends _n{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Hc=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new be);this._width=n.width,this._height=n.height,t=new Zt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:vn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Bc(to),this.copyPass.material.blending=ii,this.clock=new qs}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let s=0,r=this.passes.length;s<r;s++){let o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){let a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}ua!==void 0&&(o instanceof ua?n=!0:o instanceof kc&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new be);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var zc=class extends _n{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new we}render(e,t,n){let s=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}};var Mm={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new we(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var no=class i extends _n{constructor(e,t=1,n,s){super(),this.strength=t,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new be(e.x,e.y):new be(256,256),this.clearColor=new we(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Zt(r,o,{type:vn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){let h=new Zt(r,o,{type:vn});h.texture.name="UnrealBloomPass.h"+u,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);let d=new Zt(r,o,{type:vn});d.texture.name="UnrealBloomPass.v"+u,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),r=Math.round(r/2),o=Math.round(o/2)}let a=Mm;this.highPassUniforms=Un.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ot({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];let l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new be(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Un.clone(to.uniforms),this.blendMaterial=new Ot({uniforms:this.copyUniforms,vertexShader:to.vertexShader,fragmentShader:to.fragmentShader,blending:wi,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new we,this._oldClearAlpha=1,this._basic=new Pt,this._fsQuad=new Ei(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new be(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){let t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Ot({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new be(.5,.5)},direction:{value:new be(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(e){return new Ot({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};no.BlurDirectionX=new be(1,0);no.BlurDirectionY=new be(0,1);var ha={name:"SMAAEdgesShader",defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new be(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		void SMAAEdgeDetectionVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0,  1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4(  1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 2 ] = texcoord.xyxy + resolution.xyxy * vec4( -2.0, 0.0, 0.0,  2.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAAEdgeDetectionVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		vec4 SMAAColorEdgeDetectionPS( vec2 texcoord, vec4 offset[3], sampler2D colorTex ) {
			vec2 threshold = vec2( SMAA_THRESHOLD, SMAA_THRESHOLD );

			// Calculate color deltas:
			vec4 delta;
			vec3 C = texture2D( colorTex, texcoord ).rgb;

			vec3 Cleft = texture2D( colorTex, offset[0].xy ).rgb;
			vec3 t = abs( C - Cleft );
			delta.x = max( max( t.r, t.g ), t.b );

			vec3 Ctop = texture2D( colorTex, offset[0].zw ).rgb;
			t = abs( C - Ctop );
			delta.y = max( max( t.r, t.g ), t.b );

			// We do the usual threshold:
			vec2 edges = step( threshold, delta.xy );

			// Then discard if there is no edge:
			if ( dot( edges, vec2( 1.0, 1.0 ) ) == 0.0 )
				discard;

			// Calculate right and bottom deltas:
			vec3 Cright = texture2D( colorTex, offset[1].xy ).rgb;
			t = abs( C - Cright );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Cbottom  = texture2D( colorTex, offset[1].zw ).rgb;
			t = abs( C - Cbottom );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the maximum delta in the direct neighborhood:
			float maxDelta = max( max( max( delta.x, delta.y ), delta.z ), delta.w );

			// Calculate left-left and top-top deltas:
			vec3 Cleftleft  = texture2D( colorTex, offset[2].xy ).rgb;
			t = abs( C - Cleftleft );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Ctoptop = texture2D( colorTex, offset[2].zw ).rgb;
			t = abs( C - Ctoptop );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the final maximum delta:
			maxDelta = max( max( maxDelta, delta.z ), delta.w );

			// Local contrast adaptation in action:
			edges.xy *= step( 0.5 * maxDelta, delta.xy );

			return vec4( edges, 0.0, 0.0 );
		}

		void main() {

			gl_FragColor = SMAAColorEdgeDetectionPS( vUv, vOffset, tDiffuse );

		}`},da={name:"SMAAWeightsShader",defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new be(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];
		varying vec2 vPixcoord;

		void SMAABlendingWeightCalculationVS( vec2 texcoord ) {
			vPixcoord = texcoord / resolution;

			// We will use these offsets for the searches later on (see @PSEUDO_GATHER4):
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.25, 0.125, 1.25, 0.125 ); // WebGL port note: Changed sign in Y and W components
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.125, 0.25, -0.125, -1.25 ); // WebGL port note: Changed sign in Y and W components

			// And these for the searches, they indicate the ends of the loops:
			vOffset[ 2 ] = vec4( vOffset[ 0 ].xz, vOffset[ 1 ].yw ) + vec4( -2.0, 2.0, -2.0, 2.0 ) * resolution.xxyy * float( SMAA_MAX_SEARCH_STEPS );

		}

		void main() {

			vUv = uv;

			SMAABlendingWeightCalculationVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#define SMAASampleLevelZeroOffset( tex, coord, offset ) texture2D( tex, coord + float( offset ) * resolution, 0.0 )

		uniform sampler2D tDiffuse;
		uniform sampler2D tArea;
		uniform sampler2D tSearch;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[3];
		varying vec2 vPixcoord;

		#if __VERSION__ == 100
		vec2 round( vec2 x ) {
			return sign( x ) * floor( abs( x ) + 0.5 );
		}
		#endif

		float SMAASearchLength( sampler2D searchTex, vec2 e, float bias, float scale ) {
			// Not required if searchTex accesses are set to point:
			// float2 SEARCH_TEX_PIXEL_SIZE = 1.0 / float2(66.0, 33.0);
			// e = float2(bias, 0.0) + 0.5 * SEARCH_TEX_PIXEL_SIZE +
			//     e * float2(scale, 1.0) * float2(64.0, 32.0) * SEARCH_TEX_PIXEL_SIZE;
			e.r = bias + e.r * scale;
			return 255.0 * texture2D( searchTex, e, 0.0 ).r;
		}

		float SMAASearchXLeft( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			/**
				* @PSEUDO_GATHER4
				* This texcoord has been offset by (-0.25, -0.125) in the vertex shader to
				* sample between edge, thus fetching four edges in a row.
				* Sampling with different offsets in each direction allows to disambiguate
				* which edges are active from the four fetched ones.
				*/
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x > end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			// We correct the previous (-0.25, -0.125) offset we applied:
			texcoord.x += 0.25 * resolution.x;

			// The searches are bias by 1, so adjust the coords accordingly:
			texcoord.x += resolution.x;

			// Disambiguate the length added by the last step:
			texcoord.x += 2.0 * resolution.x; // Undo last step
			texcoord.x -= resolution.x * SMAASearchLength(searchTex, e, 0.0, 0.5);

			return texcoord.x;
		}

		float SMAASearchXRight( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x < end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			texcoord.x -= 0.25 * resolution.x;
			texcoord.x -= resolution.x;
			texcoord.x -= 2.0 * resolution.x;
			texcoord.x += resolution.x * SMAASearchLength( searchTex, e, 0.5, 0.5 );

			return texcoord.x;
		}

		float SMAASearchYUp( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y > end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y -= 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y; // WebGL port note: Changed sign
			texcoord.y -= 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y * SMAASearchLength( searchTex, e.gr, 0.0, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		float SMAASearchYDown( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y < end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y += 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y; // WebGL port note: Changed sign
			texcoord.y += 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y * SMAASearchLength( searchTex, e.gr, 0.5, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		vec2 SMAAArea( sampler2D areaTex, vec2 dist, float e1, float e2, float offset ) {
			// Rounding prevents precision errors of bilinear filtering:
			vec2 texcoord = float( SMAA_AREATEX_MAX_DISTANCE ) * round( 4.0 * vec2( e1, e2 ) ) + dist;

			// We do a scale and bias for mapping to texel space:
			texcoord = SMAA_AREATEX_PIXEL_SIZE * texcoord + ( 0.5 * SMAA_AREATEX_PIXEL_SIZE );

			// Move to proper place, according to the subpixel offset:
			texcoord.y += SMAA_AREATEX_SUBTEX_SIZE * offset;

			return texture2D( areaTex, texcoord, 0.0 ).rg;
		}

		vec4 SMAABlendingWeightCalculationPS( vec2 texcoord, vec2 pixcoord, vec4 offset[ 3 ], sampler2D edgesTex, sampler2D areaTex, sampler2D searchTex, ivec4 subsampleIndices ) {
			vec4 weights = vec4( 0.0, 0.0, 0.0, 0.0 );

			vec2 e = texture2D( edgesTex, texcoord ).rg;

			if ( e.g > 0.0 ) { // Edge at north
				vec2 d;

				// Find the distance to the left:
				vec2 coords;
				coords.x = SMAASearchXLeft( edgesTex, searchTex, offset[ 0 ].xy, offset[ 2 ].x );
				coords.y = offset[ 1 ].y; // offset[1].y = texcoord.y - 0.25 * resolution.y (@CROSSING_OFFSET)
				d.x = coords.x;

				// Now fetch the left crossing edges, two at a time using bilinear
				// filtering. Sampling at -0.25 (see @CROSSING_OFFSET) enables to
				// discern what value each edge has:
				float e1 = texture2D( edgesTex, coords, 0.0 ).r;

				// Find the distance to the right:
				coords.x = SMAASearchXRight( edgesTex, searchTex, offset[ 0 ].zw, offset[ 2 ].y );
				d.y = coords.x;

				// We want the distances to be in pixel units (doing this here allow to
				// better interleave arithmetic and memory accesses):
				d = d / resolution.x - pixcoord.x;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the right crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 1, 0 ) ).r;

				// Ok, we know how this pattern looks like, now it is time for getting
				// the actual area:
				weights.rg = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.y ) );
			}

			if ( e.r > 0.0 ) { // Edge at west
				vec2 d;

				// Find the distance to the top:
				vec2 coords;

				coords.y = SMAASearchYUp( edgesTex, searchTex, offset[ 1 ].xy, offset[ 2 ].z );
				coords.x = offset[ 0 ].x; // offset[1].x = texcoord.x - 0.25 * resolution.x;
				d.x = coords.y;

				// Fetch the top crossing edges:
				float e1 = texture2D( edgesTex, coords, 0.0 ).g;

				// Find the distance to the bottom:
				coords.y = SMAASearchYDown( edgesTex, searchTex, offset[ 1 ].zw, offset[ 2 ].w );
				d.y = coords.y;

				// We want the distances to be in pixel units:
				d = d / resolution.y - pixcoord.y;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the bottom crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 0, 1 ) ).g;

				// Get the area for this direction:
				weights.ba = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.x ) );
			}

			return weights;
		}

		void main() {

			gl_FragColor = SMAABlendingWeightCalculationPS( vUv, vPixcoord, vOffset, tDiffuse, tArea, tSearch, ivec4( 0.0 ) );

		}`},Gc={name:"SMAABlendShader",uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new be(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		void SMAANeighborhoodBlendingVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0, 1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( 1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAANeighborhoodBlendingVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform sampler2D tColor;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		vec4 SMAANeighborhoodBlendingPS( vec2 texcoord, vec4 offset[ 2 ], sampler2D colorTex, sampler2D blendTex ) {
			// Fetch the blending weights for current pixel:
			vec4 a;
			a.xz = texture2D( blendTex, texcoord ).xz;
			a.y = texture2D( blendTex, offset[ 1 ].zw ).g;
			a.w = texture2D( blendTex, offset[ 1 ].xy ).a;

			// Is there any blending weight with a value greater than 0.0?
			if ( dot(a, vec4( 1.0, 1.0, 1.0, 1.0 )) < 1e-5 ) {
				return texture2D( colorTex, texcoord, 0.0 );
			} else {
				// Up to 4 lines can be crossing a pixel (one through each edge). We
				// favor blending by choosing the line with the maximum weight for each
				// direction:
				vec2 offset;
				offset.x = a.a > a.b ? a.a : -a.b; // left vs. right
				offset.y = a.g > a.r ? -a.g : a.r; // top vs. bottom // WebGL port note: Changed signs

				// Then we go in the direction that has the maximum weight:
				if ( abs( offset.x ) > abs( offset.y )) { // horizontal vs. vertical
					offset.y = 0.0;
				} else {
					offset.x = 0.0;
				}

				// Fetch the opposite color and lerp by hand:
				vec4 C = texture2D( colorTex, texcoord, 0.0 );
				texcoord += sign( offset ) * resolution;
				vec4 Cop = texture2D( colorTex, texcoord, 0.0 );
				float s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );

				// WebGL port note: Added gamma correction
				C.xyz = pow(C.xyz, vec3(2.2));
				Cop.xyz = pow(Cop.xyz, vec3(2.2));
				vec4 mixed = mix(C, Cop, s);
				mixed.xyz = pow(mixed.xyz, vec3(1.0 / 2.2));

				return mixed;
			}
		}

		void main() {

			gl_FragColor = SMAANeighborhoodBlendingPS( vUv, vOffset, tColor, tDiffuse );

		}`};var Vc=class extends _n{constructor(){super(),this._edgesRT=new Zt(1,1,{depthBuffer:!1,type:vn}),this._edgesRT.texture.name="SMAAPass.edges",this._weightsRT=new Zt(1,1,{depthBuffer:!1,type:vn}),this._weightsRT.texture.name="SMAAPass.weights";let e=this,t=new Image;t.src=this._getAreaTexture(),t.onload=function(){e._areaTexture.needsUpdate=!0},this._areaTexture=new Gt,this._areaTexture.name="SMAAPass.area",this._areaTexture.image=t,this._areaTexture.minFilter=an,this._areaTexture.generateMipmaps=!1,this._areaTexture.flipY=!1;let n=new Image;n.src=this._getSearchTexture(),n.onload=function(){e._searchTexture.needsUpdate=!0},this._searchTexture=new Gt,this._searchTexture.name="SMAAPass.search",this._searchTexture.image=n,this._searchTexture.magFilter=qt,this._searchTexture.minFilter=qt,this._searchTexture.generateMipmaps=!1,this._searchTexture.flipY=!1,this._uniformsEdges=Un.clone(ha.uniforms),this._materialEdges=new Ot({defines:Object.assign({},ha.defines),uniforms:this._uniformsEdges,vertexShader:ha.vertexShader,fragmentShader:ha.fragmentShader}),this._uniformsWeights=Un.clone(da.uniforms),this._uniformsWeights.tDiffuse.value=this._edgesRT.texture,this._uniformsWeights.tArea.value=this._areaTexture,this._uniformsWeights.tSearch.value=this._searchTexture,this._materialWeights=new Ot({defines:Object.assign({},da.defines),uniforms:this._uniformsWeights,vertexShader:da.vertexShader,fragmentShader:da.fragmentShader}),this._uniformsBlend=Un.clone(Gc.uniforms),this._uniformsBlend.tDiffuse.value=this._weightsRT.texture,this._materialBlend=new Ot({uniforms:this._uniformsBlend,vertexShader:Gc.vertexShader,fragmentShader:Gc.fragmentShader}),this._fsQuad=new Ei(null)}render(e,t,n){this._uniformsEdges.tDiffuse.value=n.texture,this._fsQuad.material=this._materialEdges,e.setRenderTarget(this._edgesRT),this.clear&&e.clear(),this._fsQuad.render(e),this._fsQuad.material=this._materialWeights,e.setRenderTarget(this._weightsRT),this.clear&&e.clear(),this._fsQuad.render(e),this._uniformsBlend.tColor.value=n.texture,this._fsQuad.material=this._materialBlend,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this._fsQuad.render(e))}setSize(e,t){this._edgesRT.setSize(e,t),this._weightsRT.setSize(e,t),this._materialEdges.uniforms.resolution.value.set(1/e,1/t),this._materialWeights.uniforms.resolution.value.set(1/e,1/t),this._materialBlend.uniforms.resolution.value.set(1/e,1/t)}dispose(){this._edgesRT.dispose(),this._weightsRT.dispose(),this._areaTexture.dispose(),this._searchTexture.dispose(),this._materialEdges.dispose(),this._materialWeights.dispose(),this._materialBlend.dispose(),this._fsQuad.dispose()}_getAreaTexture(){return"data:image/png;base64,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"}_getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}};var fa={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var Wc=class extends _n{constructor(){super(),this.uniforms=Un.clone(fa.uniforms),this.material=new Xo({name:fa.name,uniforms:this.uniforms,vertexShader:fa.vertexShader,fragmentShader:fa.fragmentShader}),this._fsQuad=new Ei(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},it.getTransfer(this._outputColorSpace)===pt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===zl?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Gl?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Vl?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Wr?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Xl?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ql?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Wl&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Xc={title:"RPG Welling",loading:"Carregando a aventura\u2026",canvasHelp:"Um mapa 3D para explorar a aventura. Use WASD, as setas do teclado ou toque no mapa para andar. Use os bot\xF5es do jogo para conversar e aprender!",webglFail:"Este navegador n\xE3o conseguiu abrir o 3D. Tente em um Chrome mais novo!",chooseCharacter:"Quem vai explorar?",characterIvy:"Ivy, a irm\xE3 mais velha. Curiosa, leva a Pip, a coruja corajosa.",characterOakley:"Oakley, o irm\xE3o. Observador, leva o Marlow, a coruja pensadora.",start:"Come\xE7ar a aventura",skip:"Pular",next:"Continuar",home:"Menu",credits:"Cr\xE9ditos",language:"Idioma",words:"Meu Di\xE1rio de Palavras",progress:"Progresso",listenEnglish:"Ouvir em ingl\xEAs",sound:"Som",soundOn:"Som ligado",soundOff:"Som desligado",languageCurrent:"Idioma atual: {lang}",hintDue:"Dica da coruja: {n} revis\xF5es para hoje",hint:"Dica da coruja",journal:"Miss\xE3o",pieces:"partes do mapa",objTalk:"Fale com o Sr. Finch e a Sra. Page",objFind:"Encontre as partes do mapa antigo ({count}/4)",objAssemble:"Junte o mapa na porta de heras",objToWoods:"Entre na trilha secreta",objCross:"Atravesse o leito do riacho (que s\xF3 corre na chuva) pelas pedras certas",objGate:"Abra o port\xE3o secreto",objDone:"Aventura conclu\xEDda! \u{1F3F0}",objOrder:"\u{1F375} Encomenda da Sra. Page: {n} de {total}",objDuel:"\u2694\uFE0F Vencer o duelo na Academia",objUmbrella:"\u2602\uFE0F Devolva o guarda-chuva roxo da Sra. Page",noPath:"Hmm, n\xE3o achei caminho por aqui. Tenta um pouquinho mais para o lado!",objChest:"\u{1F381} Abrir o ba\xFA de hoje na mata",continueLabel:"Continuar",close:"Fechar",correct:"Isso mesmo! \u{1F604}",tryAgain:"Quase! A coruja acha que d\xE1 outra chance. \u{1F642}",toastPiece:"\u{1F5FA}\uFE0F Parte do mapa encontrada ({count}/4)!",toastClue:"\u{1F4DC} P\xE1gina de hist\xF3ria guardada!",toastAlready:"Voc\xEA j\xE1 olhou aqui.",warpDebug:"Modo explora\xE7\xE3o r\xE1pida",theEnd:"Continua\u2026",endCard:"O port\xE3o se abriu para os Caminhos de A\xE7\xFAcar! Essa hist\xF3ria continua no pr\xF3ximo cap\xEDtulo.",badgeEarned:"\u{1F3C5} Chave dos Bosques",playAgain:"Voltar ao menu",restart:"Reiniciar",keepExploring:"Continuar explorando",quizListen:"\u{1F50A} Ou\xE7a e escolha a tradu\xE7\xE3o",reviewRight:"\u{1F389} Isso! A coruja fica orgulhosa.",reviewWrong:"\u{1F423} Quase! A resposta era \u201C{word}\u201D.",duelRound:"Pergunta {n} de {m} \xB7 placar {score}",duelRight:"\u2728 Acertou! Feiti\xE7o lan\xE7ado!",duelWrong:"\u{1F4A5} Errou! Era \u201C{word}\u201D.",lessonProgress:"Palavra {n} de {m}",restartTitle:"\u{1F504} Reiniciar o jogo?",restartBody:"O progresso desta jogadora no RPG Welling ser\xE1 apagado e voc\xEA volta para a escolha de personagem.",restartCancel:"Cancelar",restartConfirm:"\u{1F504} Reiniciar",creditsTitle:"\u2139\uFE0F Cr\xE9ditos & Atribui\xE7\xF5es",creditsIntro:"Os sete modelos de personagens atuais foram gerados localmente com <strong>Hunyuan3D</strong> e rigados e animados no Blender. Eles n\xE3o v\xEAm do Sketchfab nem t\xEAm licen\xE7a de modelo de terceiro. Os assets externos CC-BY e os fallbacks est\xE3o identificados abaixo.",achievementsTitle:"\u{1F3C5} Conquistas",achievementsEmpty:"Ainda n\xE3o h\xE1 conquistas. Aprender a primeira palavra j\xE1 conta!",wordsTitle:"\u{1F4D6} Meu Di\xE1rio de Palavras",quizTitle:"\u{1F989} A coruja quer saber\u2026",quizLater:"Depois",reportTitle:"\u{1F4CA} Progresso da aventura",journalTitle:"\u{1F5FA}\uFE0F O Mapa Antigo",wordsEmpty:"Nenhuma palavra ainda \u2014 converse com o Sr. Finch e a Sra. Page! \u2728",wordsReviewMark:"\u{1F4CC} revisar",repWords:"\u{1F4D6} Palavras conhecidas",repMastered:"\u{1F3C6} Palavras dominadas (3+ acertos)",repDue:"\u{1F4CC} Revis\xF5es para hoje",repClues:"\u{1F4DC} P\xE1ginas escondidas: {n} de {total}",repPieces:"\u{1F5FA}\uFE0F Partes do mapa: {n} de 4",repChallenges:"\u{1F9E9} Desafios resolvidos",repDuel:"\u2694\uFE0F Duelo vencido",repZones:"\u{1F30D} Zonas descobertas: {n} de {total}",repWeek:"\u{1F4C5} \xDAltimos 7 dias: {added} palavras novas \xB7 {right} acertos de {answers}",repStreak:"\u{1F525} Dias seguidos de estudo: {n}",repMasterHint:"Dominar uma palavra = acertar a revis\xE3o da coruja 3 vezes seguidas.",repYes:"Sim \u{1F3C5}",repNo:"Ainda n\xE3o",repDuelWins:"\u2694\uFE0F Duelos vencidos: {n} {medal}",repChapter:"\u{1F3F0} Cap\xEDtulo 1 conclu\xEDdo",medalEarned:"\u{1F3C5} Nova medalha da Academia: {medal}!",hintNoPieces:'\u{1F989} Pip pousa no seu ombro: "Comecem falando com os adultos da escola. O zelador achou algo varrendo\u2026"',hintFind:'\u{1F989} "Brilha, brilha! Procure coisas brilhantes perto dos livros e do carrinho de livros."',hintAssemble:'\u{1F989} "Quatro partes fazem um mapa inteiro. A porta de heras est\xE1 esperando!"',hintCross:'\u{1F989} "Olhe o padr\xE3o das pedras: 2, 4, 6\u2026 qual vem depois?"',hintGate:'\u{1F989} "O mapa na sua m\xE3o combina com a \xE1rvore do port\xE3o. Toque no port\xE3o!"',hintDone:'\u{1F989} "Que aventura! Tomara que o castelo tenha petiscos."'},Ib={title:"RPG Welling",warpDebug:"Quick exploration mode",loading:"Loading the adventure\u2026",canvasHelp:"A 3D map for exploring the adventure. Use WASD, the arrow keys, or tap the map to move. Use the game buttons to talk and learn!",webglFail:"This browser could not start 3D. Try a newer Chrome!",chooseCharacter:"Who is going to explore?",characterIvy:"Ivy, the older sister. Curious, with Pip the bold owl.",characterOakley:"Oakley, the brother. Watchful, with Marlow the thoughtful owl.",start:"Start the adventure",skip:"Skip",next:"Next",home:"Menu",credits:"Credits",language:"Language",words:"My Word Journal",progress:"Progress",listenEnglish:"Listen in English",sound:"Sound",soundOn:"Sound on",soundOff:"Sound off",languageCurrent:"Current language: {lang}",hintDue:"Owl hint: {n} reviews due today",hint:"Owl hint",journal:"Quest",pieces:"map pieces",objTalk:"Talk to Mr Finch and Ms Page",objFind:"Find the old map pieces ({count}/4)",objAssemble:"Put the map together at the ivy door",objToWoods:"Step into the secret trail",objCross:"Cross the seasonal stream bed on the right stones",objGate:"Open the secret gate",objDone:"Adventure complete! \u{1F3F0}",objOrder:"Ms Page's errand: {n} of {total}",objDuel:"\u2694\uFE0F Win the duel at the Academy",objUmbrella:"\u2602\uFE0F Return Ms Page\u2019s purple umbrella",noPath:"Hmm, I can\u2019t find a way through. Try a little to the side!",objChest:"\u{1F381} Open today\u2019s chest in the woods",continueLabel:"Continue",close:"Close",correct:"That's right! \u{1F604}",tryAgain:"Almost! The owl thinks you deserve another try. \u{1F642}",toastPiece:"\u{1F5FA}\uFE0F Map piece found ({count}/4)!",toastClue:"\u{1F4DC} Storybook page saved!",toastAlready:"You already looked here.",theEnd:"To be continued\u2026",endCard:"The gate opened to the Sugar Paths! This story continues in the next chapter.",badgeEarned:"\u{1F3C5} Woodland Key",playAgain:"Back to menu",restart:"Restart",keepExploring:"Keep exploring",quizListen:"\u{1F50A} Listen and choose the meaning",reviewRight:"\u{1F389} Yes! The owl is proud of you.",reviewWrong:"\u{1F423} Close! The answer was \u201C{word}\u201D.",duelRound:"Question {n} of {m} \xB7 score {score}",duelRight:"\u2728 Right! Spell cast!",duelWrong:"\u{1F4A5} Wrong! It was \u201C{word}\u201D.",lessonProgress:"Word {n} of {m}",restartTitle:"\u{1F504} Restart the game?",restartBody:"This player's progress in RPG Welling will be erased and you'll go back to picking a character.",restartCancel:"Cancel",restartConfirm:"\u{1F504} Restart",creditsTitle:"\u2139\uFE0F Credits & Attribution",creditsIntro:"The seven current character models were generated locally with <strong>Hunyuan3D</strong> and rigged and animated in Blender. They do not come from Sketchfab and carry no third-party model licence. The external CC-BY assets and the fallbacks are listed below.",achievementsTitle:"\u{1F3C5} Achievements",achievementsEmpty:"No achievements yet. Learning your first word already counts!",wordsTitle:"\u{1F4D6} My Word Journal",quizTitle:"\u{1F989} The owl wants to know\u2026",quizLater:"Later",reportTitle:"\u{1F4CA} Adventure progress",journalTitle:"\u{1F5FA}\uFE0F The Old Map",wordsEmpty:"No words yet \u2014 talk to Mr Finch and Ms Page! \u2728",wordsReviewMark:"\u{1F4CC} review",repWords:"\u{1F4D6} Words known",repMastered:"\u{1F3C6} Mastered words (3+ correct)",repDue:"\u{1F4CC} Reviews due today",repClues:"\u{1F4DC} Hidden pages: {n} of {total}",repPieces:"\u{1F5FA}\uFE0F Map pieces: {n} of 4",repChallenges:"\u{1F9E9} Challenges solved",repDuel:"\u2694\uFE0F Duel won",repZones:"\u{1F30D} Zones discovered: {n} of {total}",repWeek:"\u{1F4C5} Last 7 days: {added} new words \xB7 {right} correct of {answers}",repStreak:"\u{1F525} Days in a row studying: {n}",repMasterHint:"Mastering a word = answering the owl\u2019s review correctly 3 times in a row.",repYes:"Yes \u{1F3C5}",repNo:"Not yet",repDuelWins:"\u2694\uFE0F Duels won: {n} {medal}",repChapter:"\u{1F3F0} Chapter 1 completed",medalEarned:"\u{1F3C5} New Academy medal: {medal}!",hintNoPieces:'\u{1F989} Pip lands on your shoulder: "Start by talking to the school grown-ups. The caretaker found something while sweeping\u2026"',hintFind:'\u{1F989} "Shiny, shiny! Look for glimmering things near the books and the book trolley."',hintAssemble:'\u{1F989} "Four pieces make one whole map. The ivy door is waiting!"',hintCross:'\u{1F989} "Look at the stone pattern: 2, 4, 6\u2026 which comes next?"',hintGate:'\u{1F989} "The map in your hand matches the tree on the gate. Tap the gate!"',hintDone:'\u{1F989} "What an adventure! I hope the castle has snacks."'},Lb={title:"RPG Welling",warpDebug:"Modo de exploraci\xF3n r\xE1pida",loading:"Cargando la aventura\u2026",canvasHelp:"Un mapa 3D para explorar la aventura. Usa WASD, las flechas del teclado o toca el mapa para moverte. \xA1Usa los botones del juego para hablar y aprender!",webglFail:"\xA1Este navegador no pudo abrir el 3D! Prueba en un Chrome m\xE1s nuevo.",chooseCharacter:"\xBFQui\xE9n va a explorar?",characterIvy:"Ivy, la hermana mayor. Curiosa, lleva a Pip, el b\xFAho valiente.",characterOakley:"Oakley, el hermano. Observador, lleva a Marlow, el b\xFAho pensador.",start:"Empezar la aventura",skip:"Saltar",next:"Seguir",home:"Men\xFA",credits:"Cr\xE9ditos",language:"Idioma",words:"Mi Diario de Palabras",progress:"Progreso",listenEnglish:"Escuchar en ingl\xE9s",sound:"Sonido",soundOn:"Sonido activado",soundOff:"Sonido desactivado",languageCurrent:"Idioma actual: {lang}",hintDue:"Pista del b\xFAho: {n} repasos para hoy",hint:"Pista del b\xFAho",journal:"Misi\xF3n",pieces:"partes del mapa",objTalk:"Habla con el Sr. Finch y la Sra. Page",objFind:"Encuentra las partes del mapa antiguo ({count}/4)",objAssemble:"Une el mapa en la puerta de hiedra",objToWoods:"Entra en el sendero secreto",objCross:"Cruza el lecho del arroyo de temporada por las piedras correctas",objGate:"Abre la puerta secreta",objDone:"\xA1Aventura completada! \u{1F3F0}",objOrder:"Encargo de la Sra. Page: {n} de {total}",objDuel:"\u2694\uFE0F Ganar el duelo en la Academia",objUmbrella:"\u2602\uFE0F Devuelve el paraguas morado de la Sra. Page",noPath:"Vaya, no encuentro un camino. \xA1Prueba un poquito m\xE1s hacia el lado!",objChest:"\u{1F381} Abrir el cofre de hoy en el bosque",continueLabel:"Continuar",close:"Cerrar",correct:"\xA1Eso es! \u{1F604}",tryAgain:"\xA1Casi! El b\xFAho cree que mereces otra oportunidad. \u{1F642}",toastPiece:"\u{1F5FA}\uFE0F \xA1Parte del mapa encontrada ({count}/4)!",toastClue:"\u{1F4DC} \xA1P\xE1gina de historia guardada!",toastAlready:"Ya miraste aqu\xED.",theEnd:"Continuar\xE1\u2026",endCard:"\xA1La puerta se abri\xF3 a los Caminos de Az\xFAcar! Esta historia sigue en el pr\xF3ximo cap\xEDtulo.",badgeEarned:"\u{1F3C5} Llave del Bosque",playAgain:"Volver al men\xFA",restart:"Reiniciar",keepExploring:"Seguir explorando",quizListen:"\u{1F50A} Escucha y elige el significado",reviewRight:"\u{1F389} \xA1Eso! El b\xFAho est\xE1 orgulloso de ti.",reviewWrong:"\u{1F423} \xA1Casi! La respuesta era \u201C{word}\u201D.",duelRound:"Pregunta {n} de {m} \xB7 marcador {score}",duelRight:"\u2728 \xA1Correcto! Hechizo lanzado.",duelWrong:"\u{1F4A5} \xA1Fall\xF3! Era \u201C{word}\u201D.",lessonProgress:"Palabra {n} de {m}",restartTitle:"\u{1F504} \xBFReiniciar el juego?",restartBody:"El progreso de esta jugadora en RPG Welling se borrar\xE1 y volver\xE1s a la elecci\xF3n de personaje.",restartCancel:"Cancelar",restartConfirm:"\u{1F504} Reiniciar",creditsTitle:"\u2139\uFE0F Cr\xE9ditos y Atribuci\xF3n",creditsIntro:"Los siete modelos de personajes actuales se generaron localmente con <strong>Hunyuan3D</strong> y se riggearon y animaron en Blender. No vienen de Sketchfab ni tienen licencia de modelo de terceros. Abajo se identifican los recursos externos CC-BY y los fallbacks.",achievementsTitle:"\u{1F3C5} Logros",achievementsEmpty:"Todav\xEDa no hay logros. \xA1Aprender tu primera palabra ya cuenta!",wordsTitle:"\u{1F4D6} Mi Diario de Palabras",quizTitle:"\u{1F989} El b\xFAho quiere saber\u2026",quizLater:"Despu\xE9s",reportTitle:"\u{1F4CA} Progreso de la aventura",journalTitle:"\u{1F5FA}\uFE0F El Mapa Viejo",wordsEmpty:"A\xFAn no hay palabras \u2014 \xA1habla con el Sr. Finch y la Sra. Page! \u2728",wordsReviewMark:"\u{1F4CC} repasar",repWords:"\u{1F4D6} Palabras conocidas",repMastered:"\u{1F3C6} Palabras dominadas (3+ aciertos)",repDue:"\u{1F4CC} Repasos para hoy",repClues:"\u{1F4DC} P\xE1ginas escondidas: {n} de {total}",repPieces:"\u{1F5FA}\uFE0F Piezas del mapa: {n} de 4",repChallenges:"\u{1F9E9} Desaf\xEDos resueltos",repDuel:"\u2694\uFE0F Duelo ganado",repZones:"\u{1F30D} Zonas descubiertas: {n} de {total}",repWeek:"\u{1F4C5} \xDAltimos 7 d\xEDas: {added} palabras nuevas \xB7 {right} aciertos de {answers}",repStreak:"\u{1F525} D\xEDas seguidos estudiando: {n}",repMasterHint:"Dominar una palabra = responder bien el repaso del b\xFAho 3 veces seguidas.",repYes:"S\xED \u{1F3C5}",repNo:"Todav\xEDa no",repDuelWins:"\u2694\uFE0F Duelos ganados: {n} {medal}",repChapter:"\u{1F3F0} Cap\xEDtulo 1 completado",medalEarned:"\u{1F3C5} \xA1Nueva medalla de la Academia: {medal}!",hintNoPieces:'\u{1F989} Pip aterriza en tu hombro: "Empiecen hablando con los adultos de la escuela. El conserje encontr\xF3 algo barriendo\u2026"',hintFind:'\u{1F989} "\xA1Brilla, brilla! Busquen cosas brillantes cerca de los libros y del carrito de libros."',hintAssemble:'\u{1F989} "Cuatro partes hacen un mapa entero. \xA1La puerta de hiedra est\xE1 esperando!"',hintCross:'\u{1F989} "Mira el patr\xF3n de las piedras: 2, 4, 6\u2026 \xBFcu\xE1l viene despu\xE9s?"',hintGate:'\u{1F989} "El mapa en tu mano coincide con el \xE1rbol de la puerta. \xA1Toca la puerta!"',hintDone:'\u{1F989} "\xA1Qu\xE9 aventura! Ojal\xE1 el castello tenga meriendas."'};function Ze(i,e,t={}){let n=Xc;i==="en"?n={...Xc,...Ib}:i==="es"&&(n={...Xc,...Lb});let s=n[e]??Xc[e]??e;for(let[r,o]of Object.entries(t))s=s.replaceAll(`{${r}}`,o);return s}function un(i,e="pt"){return i&&typeof i=="object"?i[e]??i.pt??i.en??"":i??""}var pa=null,io=!1;function ps(){return pa||(pa=new(window.AudioContext||window.webkitAudioContext)),pa.state==="suspended"&&pa.resume(),pa}function qh(i){io=!!i,io&&Yh()}function ji(){return ps().currentTime}function pn(i,e,t,n="sine",s=.15){if(io)return;let r=ps(),o=r.createOscillator(),a=r.createGain();o.type=n,o.frequency.setValueAtTime(i,e),a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(s,e+.02),a.gain.exponentialRampToValueAtTime(1e-4,e+t),o.connect(a).connect(r.destination),o.start(e),o.stop(e+t+.02)}function wm(i,e,t=.08){if(io)return;let n=ps(),s=Math.floor(n.sampleRate*e),r=n.createBuffer(1,s,n.sampleRate),o=r.getChannelData(0);for(let c=0;c<s;c+=1)o[c]=(Math.random()*2-1)*(1-c/s);let a=n.createBufferSource(),l=n.createGain();a.buffer=r,l.gain.setValueAtTime(t,i),a.connect(l).connect(n.destination),a.start(i)}var Ge={tap(){pn(660,ji(),.08)},pickup(){let i=ji();pn(784,i,.09,"triangle",.18),pn(1175,i+.08,.14,"triangle",.18)},correct(){let i=ji();pn(523.25,i,.12,"triangle",.2),pn(659.25,i+.1,.12,"triangle",.2),pn(783.99,i+.2,.22,"triangle",.2)},wrong(){let i=ji();pn(311,i,.16,"sawtooth",.06),pn(233,i+.14,.2,"sawtooth",.06)},hoot(){let i=ji();pn(392,i,.16,"sine",.22),pn(330,i+.18,.26,"sine",.22)},magic(){let i=ji();[523,659,784,1047,1319].forEach((e,t)=>pn(e,i+t*.07,.3,"sine",.14)),wm(i,.5,.03)},door(){let i=ji();pn(98,i,.3,"sine",.3),wm(i+.05,.25,.05)},star(){let i=ji();[784,988,1175,1568].forEach((e,t)=>pn(e,i+t*.09,.18,"triangle",.18))},fanfare(){let i=ji();[523.25,659.25,783.99,1046.5,1318.5].forEach((e,t)=>pn(e,i+t*.13,.32,"triangle",.2))}},fs=null;function Yh(){if(fs){for(let i of fs.nodes)try{i.stop?i.stop():i.disconnect()}catch{}fs=null}}function Db(i){Yh();let e=ps(),t=e.createGain();t.gain.value=0,t.gain.linearRampToValueAtTime(1,e.currentTime+2),t.connect(e.destination);let n=[t];if(i==="woods"){let s=e.sampleRate*2,r=e.createBuffer(1,s,e.sampleRate),o=r.getChannelData(0);for(let f=0;f<s;f+=1)o[f]=Math.random()*2-1;let a=e.createBufferSource();a.buffer=r,a.loop=!0;let l=e.createBiquadFilter();l.type="lowpass",l.frequency.value=420;let c=e.createGain();c.gain.value=.05;let u=e.createOscillator();u.frequency.value=.13;let h=e.createGain();h.gain.value=.025,u.connect(h).connect(c.gain),a.connect(l).connect(c).connect(t),a.start(),u.start(),n.push(a,u);let d=()=>{if(!fs||fs.zone!=="woods")return;let f=e.currentTime+.05,g=1800+Math.random()*1400;pn(g,f,.09,"sine",.045),pn(g*1.25,f+.11,.07,"sine",.04),window.setTimeout(d,4e3+Math.random()*5e3)};window.setTimeout(d,2500)}else for(let s of[82,123]){let r=e.createOscillator();r.type="sine",r.frequency.value=s;let o=e.createGain();o.gain.value=.012;let a=e.createOscillator();a.frequency.value=s===82?.09:.07;let l=e.createGain();l.gain.value=.006,a.connect(l).connect(o.gain),r.connect(o).connect(t),r.start(),a.start(),n.push(r,a)}fs={nodes:n,zone:i}}function Sm(i){if(io){Yh();return}fs&&fs.zone===i||Db(i)}function Em(i){if(io)return;let e=ps(),t=e.currentTime,n=Math.floor(e.sampleRate*.09),s=e.createBuffer(1,n,e.sampleRate),r=s.getChannelData(0);for(let c=0;c<n;c+=1)r[c]=(Math.random()*2-1)*(1-c/n);let o=e.createBufferSource();o.buffer=s;let a=e.createBiquadFilter();a.type=i==="woods"?"lowpass":"bandpass",a.frequency.value=i==="woods"?300:950;let l=e.createGain();l.gain.value=i==="woods"?.05:.035,o.connect(a).connect(l).connect(e.destination),o.start(t)}function Am(i,e,t){return!i||!e||!t?!1:i[e]?!0:Object.keys(i).length>=200?!1:(i[e]={pt:t.pt,streak:0,due:Date.now()+864e5},!0)}function nr(i,e=Date.now()){return Object.entries(i||{}).filter(([,t])=>t.due<=e).sort((t,n)=>t[1].due-n[1].due)}function Rm(i,e,t=Date.now()){let n=i[e];n&&(n.streak=Math.min((n.streak||0)+1,30),n.due=t+Math.min(2**n.streak,30)*864e5)}function Cm(i,e,t=Date.now()){let n=i[e];n&&(n.streak=0,n.due=t+600*1e3)}var Tm={pt:["uma parede alta","uma porta baixa","um mapa velho"],en:["a tall wall","a small door","an old map"],es:["una pared alta","una puerta baja","un mapa viejo"]};function jh(i){for(let e=i.length-1;e>0;e-=1){let t=Math.floor(Math.random()*(e+1));[i[e],i[t]]=[i[t],i[e]]}return i}function Zh(i,e=Date.now()){return Object.entries(i||{}).sort(([,t],[,n])=>{let s=t.due<=e?0:1,r=n.due<=e?0:1;return s!==r?s-r:s===0&&t.due!==n.due?t.due-n.due:(t.streak||0)-(n.streak||0)}).map(([t])=>t)}function Kh(i,e,t="pt"){let n=i[e];if(!n)return null;let s=jh(Object.entries(i).filter(([a])=>a!==e).map(([,a])=>a.pt)).filter(a=>a!==n.pt).slice(0,2),r=jh([...Tm[t]||Tm.pt]);for(;s.length<2;){let a=r.pop();a!==n.pt&&s.push(a)}let o=jh([n.pt,...s].map(a=>({text:a,correct:a===n.pt})));return{word:e,options:o}}function Pm(i){let e=i&&typeof i=="object"?i:{},t={};for(let[n,s]of Object.entries(e).slice(0,200))typeof n!="string"||n.length>30||!s||typeof s!="object"||typeof s.pt!="string"||s.pt.length>120||(t[n]={pt:s.pt,streak:Number.isFinite(s.streak)?Math.max(0,Math.min(30,s.streak)):0,due:Number.isFinite(s.due)?s.due:0});return t}function Im(i,e,t){return Object.freeze({pt:i,en:e,es:t})}function sn(i,e,t,n,s){return Object.freeze({id:i,text:Im(...e),hint:Im(...t),tier:n,check:s})}var ga=Object.freeze([sn("first-word",["Primeira palavra","First word","Primera palabra"],["Encontra uma palavra e escreve-a no teu di\xE1rio.","Find a word and add it to your journal.","Encuentra una palabra y ap\xFAntala en tu diario."],"bronze",i=>i.words>=1),sn("word-collector",["Colecionadora de palavras","Word collector","Coleccionista de palabras"],["Encontra 10 palavras diferentes no teu di\xE1rio.","Find 10 different words in your journal.","Encuentra 10 palabras diferentes en tu diario."],"bronze",i=>i.words>=10),sn("word-champion",["Campe\xE3 de palavras","Word champion","Campeona de palabras"],["Encontra 25 palavras diferentes no teu di\xE1rio.","Find 25 different words in your journal.","Encuentra 25 palabras diferentes en tu diario."],"silver",i=>i.words>=25),sn("word-legend",["Lenda das palavras","Word legend","Leyenda de palabras"],["Encontra 90 palavras diferentes no teu di\xE1rio.","Find 90 different words in your journal.","Encuentra 90 palabras diferentes en tu diario."],"gold",i=>i.words>=90),sn("word-master",["Mestre das palavras","Word master","Maestro de palabras"],["Acerta 10 palavras diferentes tr\xEAs vezes cada uma.","Answer 10 different words correctly three times each.","Acierta 10 palabras diferentes tres veces cada una."],"silver",i=>i.mastered>=10),sn("first-clue",["Primeira pista","First clue","Primera pista"],["Encontra uma p\xE1gina de hist\xF3ria escondida na escola, na High Street ou em Oxleas Wood.","Find a hidden story page at school, on the High Street or in Oxleas Wood.","Encuentra una p\xE1gina de historia escondida en la escuela, en la High Street o en Oxleas Wood."],"bronze",i=>i.clues>=1),sn("clue-hunter",["Ca\xE7adora de pistas","Clue hunter","Cazadora de pistas"],["Encontra as 6 p\xE1ginas de hist\xF3ria escondidas.","Find all 6 hidden story pages.","Encuentra las 6 p\xE1ginas de historia escondidas."],"gold",i=>i.clues>=6),sn("puzzle-solver",["Solucionadora de desafios","Puzzle solver","Solucionadora de retos"],["Acerta 3 perguntas r\xE1pidas para personagens e lugares.","Answer 3 quick questions for characters and places.","Acierta 3 preguntas r\xE1pidas para personajes y lugares."],"bronze",i=>i.challenges>=3),sn("map-maker",["Montadora de mapas","Map maker","Constructora de mapas"],["Junta as 4 partes: do Sr. Finch, da Sra. Page, da estante e do carrinho.","Find all 4 map pieces: from Mr Finch, Ms Page, the shelf and the book trolley.","Junta las 4 piezas: del Sr. Finch, de la Sra. Page, del estante y del carrito."],"silver",i=>i.mapPieces>=4),sn("four-places",["Quatro lugares","Four places","Cuatro lugares"],["Entra em Oxleas Wood, na High Street, na Academia Owlburt e na sala de aula.","Step into Oxleas Wood, the High Street, Owlburt Academy and the classroom.","Entra en Oxleas Wood, en la High Street, en la Academia Owlburt y en el aula."],"silver",i=>i.zonesVisited>=4),sn("first-duel",["Primeiro duelo","First duel","Primer duelo"],["Ganha um duelo de feiti\xE7os com a Prof. Raven acertando 2 de 3 perguntas.","Win a spell duel with Prof. Raven by getting 2 of 3 right.","Gana un duelo de hechizos con la Prof. Raven acertando 2 de 3 preguntas."],"bronze",i=>i.duelWins>=1),sn("duel-trio",["Trio de duelos","Duel trio","Tr\xEDo de duelos"],["Ganha 3 duelos de feiti\xE7os com a Prof. Raven.","Win 3 spell duels with Prof. Raven.","Gana 3 duelos de hechizos con la Prof. Raven."],"silver",i=>i.duelWins>=3),sn("duel-champion",["Campe\xE3 de duelos","Duel champion","Campeona de duelos"],["Ganha 10 duelos de feiti\xE7os com a Prof. Raven.","Win 10 spell duels with Prof. Raven.","Gana 10 duelos de hechizos con la Prof. Raven."],"gold",i=>i.duelWins>=10),sn("three-day-learner",["Tr\xEAs dias de estudo","Three days strong","Tres d\xEDas de estudio"],["Pratica ou descobre uma palavra em 3 dias seguidos.","Practise or discover a word on 3 days in a row.","Practica o descubre una palabra 3 d\xEDas seguidos."],"silver",i=>i.studyStreak>=3),sn("week-learner",["Semana de estudo","Week learner","Semana de estudio"],["Pratica ou descobre uma palavra em 7 dias seguidos.","Practise or discover a word on 7 days in a row.","Practica o descubre una palabra 7 d\xEDas seguidos."],"gold",i=>i.studyStreak>=7),sn("five-right",["Cinco dias de acertos","Five right days","Cinco d\xEDas de aciertos"],["Acerta pelo menos uma palavra em 5 dias diferentes.","Get at least one word right on 5 different days.","Acierta al menos una palabra en 5 d\xEDas diferentes."],"silver",i=>i.correctDays>=5),sn("chapter-one",["Cap\xEDtulo conclu\xEDdo","Chapter one","Cap\xEDtulo completado"],["Abre o port\xE3o secreto em Oxleas Wood e passa por ele para ver o final.","Open the secret gate in Oxleas Wood and step through to see the ending.","Abre el port\xF3n secreto en Oxleas Wood y pasa por \xE9l para ver el final."],"gold",i=>i.endingSeen),sn("kind-helper",["Ajudante gentil","Kind helper","Ayudante amable"],["Encontra o guarda-chuva roxo no parquinho e devolve-o \xE0 Sra. Page.","Find the purple umbrella in the playground and return it to Ms Page.","Encuentra el paraguas morado en el parque y devu\xE9lveselo a la Sra. Page."],"bronze",i=>i.helpedTeacher)]),Dm=Object.freeze(ga.map(i=>i.id)),Nb=Object.freeze(["woods","highstreet","academy","classroom"]);function oi(i){return!!i&&typeof i=="object"&&!Array.isArray(i)}function ma(i){return Number.isFinite(i)?Math.max(0,Math.min(1e9,Math.floor(i))):0}function Lm(i){return Array.isArray(i)?new Set(i.filter(e=>typeof e=="string"&&e.length>0)).size:0}function qc(i){let e=t=>String(t).padStart(2,"0");return`${i.getFullYear()}-${e(i.getMonth()+1)}-${e(i.getDate())}`}function Ob(i,e){let t=[];for(let n=6;n>=0;n-=1){let s=new Date(e.getFullYear(),e.getMonth(),e.getDate()-n);t.push({key:qc(s),entry:oi(i[qc(s)])?i[qc(s)]:null})}return t}function Ub(i){return Object.values(i).filter(e=>oi(e)&&ma(e.right)>0).length}function Fb(i,e){let t=0;for(let n=0;;n+=1){let s=new Date(e.getFullYear(),e.getMonth(),e.getDate()-n);if(oi(i[qc(s)])){t+=1;continue}if(n!==0)break}return t}function Bb(i){let e=oi(i)?i:{},t=oi(e.words)?e.words:{},n=Object.values(t),s=oi(e.history)?e.history:{},r=oi(e.flags)?e.flags:{},o=oi(e.challenges)?e.challenges:{},a=new Date,l=new Date(a.getFullYear(),a.getMonth(),a.getDate()),u=Ob(s,l).reduce((d,{entry:f})=>({added:d.added+ma(f?.added),right:d.right+ma(f?.right),wrong:d.wrong+ma(f?.wrong)}),{added:0,right:0,wrong:0}),h=Nb.filter(d=>!!r[`visited_${d}`]).length;return{words:n.length,mastered:n.filter(d=>oi(d)&&Number.isFinite(d.streak)&&d.streak>=3).length,due:n.filter(d=>oi(d)&&Number.isFinite(d.due)&&d.due<=a.getTime()).length,clues:Lm(e.clues),mapPieces:Lm(e.mapPieces),challenges:Object.values(o).filter(Boolean).length,duelWins:ma(e.duelWins),zonesVisited:h,history:u,studyStreak:Fb(s,l),daysPlayed:Object.values(s).filter(oi).length,correctDays:Ub(s),endingSeen:!!r.endingSeen,helpedTeacher:!!r.umbrellaDone}}function Nm(i,e){let t=new Set(Array.isArray(i)?i.filter(s=>typeof s=="string"):[]),n=Bb(e);return ga.filter(s=>!t.has(s.id)&&s.check(n)).map(s=>s.id)}function Om(i){return ga.find(e=>e.id===i)}var Jh="mundo-da-julia.rpgwelling.v1",Qh="mundo-da-julia.rpgwelling.gen";function $h(){try{let i=localStorage.getItem(Qh);return i?`${Jh}.g${i}`:Jh}catch{return Jh}}function Um(){try{let i=Number(localStorage.getItem(Qh)||"1")+1;localStorage.setItem(Qh,String(i))}catch{}}var jc=[{id:"ivy",emoji:"\u{1F467}",owl:"Pip"},{id:"oakley",emoji:"\u{1F9D2}",owl:"Marlow"}],so=["finch","page","shelf","trolley"],kb=["school","woods","highstreet","academy","classroom"];function Hb(){return{version:1,character:"",zone:"school",position:null,mapPieces:[],flags:{},clues:[],challenges:{},words:{},sound:!0,language:"",history:{},duelWins:0,achievements:[]}}function Yc(i={}){let e=i&&typeof i=="object"?i:{},t=Hb();if(t.character=jc.some(n=>n.id===e.character)?e.character:"",t.zone=kb.includes(e.zone)?e.zone:"school",Array.isArray(e.position)&&e.position.length===2){let[n,s]=e.position.map(r=>Number.isFinite(r)?Math.max(-60,Math.min(60,r)):0);t.position=[n,s]}if(t.mapPieces=(Array.isArray(e.mapPieces)?e.mapPieces:[]).filter(n=>so.includes(n)),t.mapPieces=so.filter(n=>t.mapPieces.includes(n)),e.flags&&typeof e.flags=="object")for(let[n,s]of Object.entries(e.flags))typeof n=="string"&&n.length<=40&&(t.flags[n]=!!s);if(t.clues=(Array.isArray(e.clues)?e.clues:[]).filter(n=>typeof n=="string"&&n.length<=40).slice(0,50),t.achievements=[...new Set((Array.isArray(e.achievements)?e.achievements:[]).filter(n=>Dm.includes(n)))],e.challenges&&typeof e.challenges=="object")for(let[n,s]of Object.entries(e.challenges))typeof n=="string"&&n.length<=40&&(t.challenges[n]=!!s);if(t.sound=e.sound!==!1&&e.sound!==0,t.language=["pt","en","es"].includes(e.language)?e.language:"",t.duelWins=Number.isFinite(e.duelWins)?Math.max(0,Math.min(999,Math.floor(e.duelWins))):0,e.history&&typeof e.history=="object"){let n=r=>Number.isFinite(r)?Math.max(0,Math.min(1e6,Math.floor(r))):0;for(let[r,o]of Object.entries(e.history))!/^\d{4}-\d{2}-\d{2}$/.test(r)||!o||typeof o!="object"||(t.history[r]={added:n(o.added),right:n(o.right),wrong:n(o.wrong)});let s=Object.keys(t.history).sort().slice(-60);t.history=Object.fromEntries(s.map(r=>[r,t.history[r]]))}return t.words=Pm(e.words),t}function Fm(i){return String(i||"").trim().toLowerCase().slice(0,32)}function xa(i){let e=t=>String(t).padStart(2,"0");return`${i.getFullYear()}-${e(i.getMonth()+1)}-${e(i.getDate())}`}function Zc(i,e,t=1){let n=xa(new Date),s=i.history[n]||(i.history[n]={added:0,right:0,wrong:0});s[e]=(s[e]||0)+t}function Bm(i,e=new Date,t=7){let n={added:0,right:0,wrong:0,active:0};for(let s=0;s<t;s+=1){let r=i?.[xa(new Date(e.getFullYear(),e.getMonth(),e.getDate()-s))];r&&(n.added+=r.added||0,n.right+=r.right||0,n.wrong+=r.wrong||0,n.active+=1)}return n}function km(i,e=new Date){let t=0,n=new Date(e.getFullYear(),e.getMonth(),e.getDate());for(let s=0;;s+=1){if(i?.[xa(new Date(n.getFullYear(),n.getMonth(),n.getDate()-s))]){t+=1;continue}if(s!==0)break}return t}function Hm(i,e){let t=Fm(e);if(!t)return Yc();try{let n=JSON.parse(i.getItem($h())||"{}")||{};return Yc(n[t])}catch{return Yc()}}function vt(i,e,t){let n=Fm(e);if(n)try{let s=JSON.parse(i.getItem($h())||"{}")||{};s[n]=Yc(t),i.setItem($h(),JSON.stringify(s))}catch{}}var zb=8;function Zi(i){return i.mapPieces.length}function Kc(i){return Zi(i)===so.length}function Gb(i){return!!i.flags.mapAssembled}function Gm(i){return i===zb}function ed(i){return i.flags.gateOpen?{id:"done"}:i.zone==="woods"?i.flags.stonesCrossed?{id:"gate"}:{id:"cross"}:Gb(i)?{id:"toWoods"}:Kc(i)?{id:"assemble"}:Zi(i)===0?{id:"talk",progress:!!i.flags.finchMet+!!i.flags.pageMet}:{id:"find",progress:Zi(i)}}function Vm(i){let e=ed(i);return e.id==="done"?"hintDone":e.id==="gate"?"hintGate":e.id==="cross"?"hintCross":e.id==="assemble"?"hintAssemble":e.id==="find"?"hintFind":"hintNoPieces"}var Vb=[3,6,10],td=[" ","\u{1F949}","\u{1F948}","\u{1F947}"];function Jc(i){let e=0;for(let t of Vb)i>=t&&(e+=1);return e}var zm=["orderMint","orderBun","orderFeather"];function Wm(i,{wordCount:e=0,today:t=""}={}){let n=i.flags||{},s=[];return n.orderStarted&&!n.orderDone&&s.push({id:"order",key:"objOrder",progress:zm.filter(r=>n[r]).length,total:zm.length}),e>=3&&!n.duelWon&&s.push({id:"duel",key:"objDuel"}),n.umbrellaAsked&&!n.umbrellaDone&&s.push({id:"umbrella",key:"objUmbrella"}),t&&n.chestDay!==t&&s.push({id:"chest",key:"objChest"}),s}function nd(i,e){if(e===bh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Zr||e===oa){let t=i.getIndex();if(t===null){let o=[],a=i.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===Zr)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}var Qc=class extends bi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new cd(t)}),this.register(function(t){return new ud(t)}),this.register(function(t){return new vd(t)}),this.register(function(t){return new _d(t)}),this.register(function(t){return new bd(t)}),this.register(function(t){return new dd(t)}),this.register(function(t){return new fd(t)}),this.register(function(t){return new pd(t)}),this.register(function(t){return new md(t)}),this.register(function(t){return new ld(t)}),this.register(function(t){return new gd(t)}),this.register(function(t){return new hd(t)}),this.register(function(t){return new yd(t)}),this.register(function(t){return new xd(t)}),this.register(function(t){return new od(t)}),this.register(function(t){return new Md(t)}),this.register(function(t){return new wd(t)})}load(e,t,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let c=qi.extractUrlBase(e);o=qi.resolveURL(c,this.path)}else o=qi.extractUrlBase(e);this.manager.itemStart(e);let a=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Vr(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Zm){try{o[rt.KHR_BINARY_GLTF]=new Sd(e)}catch(h){s&&s(h);return}r=JSON.parse(o[rt.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new Id(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let h=this.pluginCallbacks[u](c);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let h=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(h){case rt.KHR_MATERIALS_UNLIT:o[h]=new ad;break;case rt.KHR_DRACO_MESH_COMPRESSION:o[h]=new Ed(r,this.dracoLoader);break;case rt.KHR_TEXTURE_TRANSFORM:o[h]=new Td;break;case rt.KHR_MESH_QUANTIZATION:o[h]=new Ad;break;default:d.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function Wb(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}var rt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},od=class{constructor(e){this.parser=e,this.name=rt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,u=new we(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],ln);let h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Xs(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new zn(u),c.distance=h;break;case"spot":c=new Jo(u),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Ti(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}},ad=class{constructor(){this.name=rt.KHR_MATERIALS_UNLIT}getMaterialType(){return Pt}extendParams(e,t,n){let s=[];e.color=new we(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],ln),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Dt))}return Promise.all(s)}},ld=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},cd=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new be(a,a)}return Promise.all(r)}},ud=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},hd=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},dd=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new we(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],ln)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Dt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},fd=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},pd=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new we().setRGB(a[0],a[1],a[2],ln),Promise.all(r)}},md=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},gd=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new we().setRGB(a[0],a[1],a[2],ln),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Dt)),Promise.all(r)}},xd=class{constructor(e){this.parser=e,this.name=rt.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},yd=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},vd=class{constructor(e){this.parser=e,this.name=rt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},_d=class{constructor(e){this.parser=e,this.name=rt.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}},bd=class{constructor(e){this.parser=e,this.name=rt.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}},Md=class{constructor(e){this.name=rt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let l=s.byteOffset||0,c=s.byteLength||0,u=s.count,h=s.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,d,s.mode,s.filter).then(function(f){return f.buffer}):o.ready.then(function(){let f=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(f),u,h,d,s.mode,s.filter),f})})}else return null}},wd=class{constructor(e){this.name=rt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let c of s.primitives)if(c.mode!==Wn.TRIANGLES&&c.mode!==Wn.TRIANGLE_STRIP&&c.mode!==Wn.TRIANGLE_FAN&&c.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],l={};for(let c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{let u=c.pop(),h=u.isGroup?u.children:[u],d=c[0].count,f=[];for(let g of h){let x=new Ye,m=new L,p=new xn,b=new L(1,1,1),M=new us(g.geometry,g.material,d);for(let v=0;v<d;v++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,v),l.SCALE&&b.fromBufferAttribute(l.SCALE,v),M.setMatrixAt(v,x.compose(m,p,b));for(let v in l)if(v==="_COLOR_0"){let T=l[v];M.instanceColor=new cs(T.array,T.itemSize,T.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&g.geometry.setAttribute(v,l[v]);At.prototype.copy.call(M,g),this.parser.assignFinalMaterial(M),f.push(M)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}},Zm="glTF",ya=12,Xm={JSON:1313821514,BIN:5130562},Sd=class{constructor(e){this.name=rt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,ya),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Zm)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-ya,r=new DataView(e,ya),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let l=r.getUint32(o,!0);if(o+=4,l===Xm.JSON){let c=new Uint8Array(e,ya+o,a);this.content=n.decode(c)}else if(l===Xm.BIN){let c=ya+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Ed=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=rt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(let u in o){let h=Cd[u]||u.toLowerCase();a[h]=o[u]}for(let u in e.attributes){let h=Cd[u]||u.toLowerCase();if(o[u]!==void 0){let d=n.accessors[e.attributes[u]],f=ro[d.componentType];c[h]=f.name,l[h]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,d){s.decodeDracoFile(u,function(f){for(let g in f.attributes){let x=f.attributes[g],m=l[g];m!==void 0&&(x.normalized=m)}h(f)},a,c,ln,d)})})}},Td=class{constructor(){this.name=rt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Ad=class{constructor(){this.name=rt.KHR_MESH_QUANTIZATION}},$c=class extends Gi{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=s-t,h=(n-t)/u,d=h*h,f=d*h,g=e*c,x=g-c,m=-2*f+3*d,p=f-d,b=1-m,M=p-d+h;for(let v=0;v!==a;v++){let T=o[x+v+a],A=o[x+v+l]*u,R=o[g+v+a],I=o[g+v]*u;r[v]=b*T+M*A+m*R+p*I}return r}},Xb=new xn,Rd=class extends $c{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return Xb.fromArray(r).normalize().toArray(r),r}},Wn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ro={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},qm={9728:qt,9729:an,9984:Zl,9985:Xr,9986:Ks,9987:si},Ym={33071:pi,33648:Lr,10497:jt},id={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Cd={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ms={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},qb={CUBICSPLINE:void 0,LINEAR:Us,STEP:Os},sd={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Yb(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Hi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ei})),i.DefaultMaterial}function ir(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Ti(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function jb(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,u=e.length;c<u;c++){let h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){let h=e[c];if(n){let d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;o.push(d)}if(s){let d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;a.push(d)}if(r){let d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){let u=c[0],h=c[1],d=c[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=h),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function Zb(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Kb(i){let e,t=i.extensions&&i.extensions[rt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+rd(t.attributes):e=i.indices+":"+rd(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+rd(i.targets[n]);return e}function rd(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Pd(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Jb(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var Qb=new Ye,Id=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Wb,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let l=a.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new Vs(this.options.manager):this.textureLoader=new Qo(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Vr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return ir(r,a,s),Ti(a,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(let l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let o=t[s].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(o,a)=>{let l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(let[c,u]of o.children.entries())r(u,a.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[rt.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(qi.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let o=id[s.type],a=ro[s.componentType],l=s.normalized===!0,c=new a(s.count*o);return Promise.resolve(new kt(c,o,l))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],l=id[s.type],c=ro[s.componentType],u=c.BYTES_PER_ELEMENT,h=u*l,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,x,m;if(f&&f!==h){let p=Math.floor(d/f),b="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count,M=t.cache.get(b);M||(x=new c(a,p*f,s.count*f/u),M=new Bs(x,f/u),t.cache.add(b,M)),m=new ls(M,l,d%f/u,g)}else a===null?x=new c(s.count*l):x=new c(a,d,s.count*l),m=new kt(x,l,g);if(s.sparse!==void 0){let p=id.SCALAR,b=ro[s.sparse.indices.componentType],M=s.sparse.indices.byteOffset||0,v=s.sparse.values.byteOffset||0,T=new b(o[1],M,s.sparse.count*p),A=new c(o[2],v,s.sparse.count*l);a!==null&&(m=new kt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let R=0,I=T.length;R<I;R++){let w=T[R];if(m.setX(w,A[R*l]),l>=2&&m.setY(w,A[R*l+1]),l>=3&&m.setZ(w,A[R*l+2]),l>=4&&m.setW(w,A[R*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let s=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);let d=(r.samplers||{})[o.sampler]||{};return u.magFilter=qm[d.magFilter]||an,u.minFilter=qm[d.minFilter]||si,u.wrapS=Ym[d.wrapS]||jt,u.wrapT=Ym[d.wrapT]||jt,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==qt&&u.minFilter!==an,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let o=s.images[e],a=self.URL||self.webkitURL,l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(h){c=!0;let d=new Blob([h],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(l).then(function(h){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(x){let m=new Gt(x);m.needsUpdate=!0,d(m)}),t.load(qi.resolveURL(h,r.path),g,void 0,f)})}).then(function(h){return c===!0&&a.revokeObjectURL(l),Ti(h,o),h.userData.mimeType=o.mimeType||Jb(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[rt.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[rt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let l=r.associations.get(o);o=r.extensions[rt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new Bi,cn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new Gr,cn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Hi}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],o,a={},l=r.extensions||{},c=[];if(l[rt.KHR_MATERIALS_UNLIT]){let h=s[rt.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),c.push(h.extendParams(a,r,t))}else{let h=r.pbrMetallicRoughness||{};if(a.color=new we(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){let d=h.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],ln),a.opacity=d[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",h.baseColorTexture,Dt)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=yn);let u=r.alphaMode||sd.OPAQUE;if(u===sd.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===sd.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Pt&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new be(1,1),r.normalTexture.scale!==void 0)){let h=r.normalTexture.scale;a.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&o!==Pt&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Pt){let h=r.emissiveFactor;a.emissive=new we().setRGB(h[0],h[1],h[2],ln)}return r.emissiveTexture!==void 0&&o!==Pt&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Dt)),Promise.all(c).then(function(){let h=new o(a);return r.name&&(h.name=r.name),Ti(h,r),t.associations.set(h,{materials:e}),r.extensions&&ir(s,h,r),h})}createUniqueName(e){let t=Et.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[rt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return jm(l,a,t)})}let o=[];for(let a=0,l=e.length;a<l;a++){let c=e[a],u=Kb(c),h=s[u];if(h)o.push(h.promise);else{let d;c.extensions&&c.extensions[rt.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=jm(new Nt,c,t),s[u]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){let u=o[l].material===void 0?Yb(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){let c=l.slice(0,l.length-1),u=l[l.length-1],h=[];for(let f=0,g=u.length;f<g;f++){let x=u[f],m=o[f],p,b=c[f];if(m.mode===Wn.TRIANGLES||m.mode===Wn.TRIANGLE_STRIP||m.mode===Wn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Bo(x,b):new D(x,b),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Wn.TRIANGLE_STRIP?p.geometry=nd(p.geometry,oa):m.mode===Wn.TRIANGLE_FAN&&(p.geometry=nd(p.geometry,Zr));else if(m.mode===Wn.LINES)p=new zo(x,b);else if(m.mode===Wn.LINE_STRIP)p=new Hs(x,b);else if(m.mode===Wn.LINE_LOOP)p=new Go(x,b);else if(m.mode===Wn.POINTS)p=new hs(x,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&Zb(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Ti(p,r),m.extensions&&ir(s,p,m),t.assignFinalMaterial(p),h.push(p)}for(let f=0,g=h.length;f<g;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return r.extensions&&ir(s,h[0],r),h[0];let d=new Mt;r.extensions&&ir(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=h.length;f<g;f++)d.add(h[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Xt(Kr.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Xi(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Ti(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],l=[];for(let c=0,u=o.length;c<u;c++){let h=o[c];if(h){a.push(h);let d=new Ye;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Ho(a,l)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let h=0,d=s.channels.length;h<d;h++){let f=s.channels[h],g=s.samplers[f.sampler],x=f.target,m=x.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,b=s.parameters!==void 0?s.parameters[g.output]:g.output;x.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",b)),c.push(g),u.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(h){let d=h[0],f=h[1],g=h[2],x=h[3],m=h[4],p=[];for(let M=0,v=d.length;M<v;M++){let T=d[M],A=f[M],R=g[M],I=x[M],w=m[M];if(T===void 0)continue;T.updateMatrix&&T.updateMatrix();let _=n._createAnimationTracks(T,A,R,I,w);if(_)for(let P=0;P<_.length;P++)p.push(_[P])}let b=new Gs(r,void 0,p);return Ti(b,s),b})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=s.weights.length;l<c;l++)a.morphTargetInfluences[l]=s.weights[l]}),o})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));let l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){let u=c[0],h=c[1],d=c[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Qb)});for(let f=0,g=h.length;f<g;f++)u.add(h[f]);return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(r.isBone===!0?u=new Hr:c.length>1?u=new Mt:c.length===1?u=c[0]:u=new At,u!==c[0])for(let h=0,d=c.length;h<d;h++)u.add(c[h]);if(r.name&&(u.userData.name=r.name,u.name=o),Ti(u,r),r.extensions&&ir(n,u,r),r.matrix!==void 0){let h=new Ye;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let h=s.associations.get(u);s.associations.set(u,{...h})}return s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new Mt;n.name&&(r.name=s.createUniqueName(n.name)),Ti(r,n),n.extensions&&ir(t,r,n);let o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(s.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,h=l.length;u<h;u++)r.add(l[u]);let c=u=>{let h=new Map;for(let[d,f]of s.associations)(d instanceof cn||d instanceof Gt)&&h.set(d,f);return u.traverse(d=>{let f=s.associations.get(d);f!=null&&h.set(d,f)}),h};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){let o=[],a=e.name?e.name:e.uuid,l=[];ms[r.path]===ms.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(ms[r.path]){case ms.weights:c=yi;break;case ms.rotation:c=vi;break;case ms.translation:case ms.scale:c=_i;break;default:n.itemSize===1?c=yi:c=_i;break}let u=s.interpolation!==void 0?qb[s.interpolation]:Us,h=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){let g=new c(l[d]+"."+ms[r.path],t.array,h,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Pd(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof vi?Rd:$c;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function $b(i,e,t){let n=e.attributes,s=new Dn;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(s.set(new L(l[0],l[1],l[2]),new L(c[0],c[1],c[2])),a.normalized){let u=Pd(ro[a.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new L,l=new L;for(let c=0,u=r.length;c<u;c++){let h=r[c];if(h.POSITION!==void 0){let d=t.json.accessors[h.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){let x=Pd(ro[d.componentType]);l.multiplyScalar(x)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new Sn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function jm(i,e,t){let n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){i.setAttribute(a,l)})}for(let o in n){let a=Cd[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){let o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return it.workingColorSpace!==ln&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${it.workingColorSpace}" not supported.`),Ti(i,e),$b(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?jb(i,e.targets,t):i})}function Ld(i){let e=new Map,t=new Map,n=i.clone();return Km(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,o=e.get(s),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Km(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)Km(i.children[n],e.children[n],t)}var tM=new Qc,Dd=new Map,$m=new Map,nM="./assets/",Hd=null;function eg(i){Hd=i}la.onProgress=(i,e,t)=>{t&&Hd?.(e/t)};la.onLoad=()=>Hd?.(1);function iM(i){return Dd.has(i)||Dd.set(i,new Promise((e,t)=>{tM.load(nM+i,n=>e({scene:n.scene,animations:n.animations||[]}),void 0,n=>t(n))})),Dd.get(i)}async function tg(){let i=["ivy-rigged.glb","oakley-rigged.glb","finch-rigged.glb","page-rigged.glb","raven-rigged.glb","crumb-rigged.glb","willow-rigged.glb","owl.glb","npc.glb","trees.glb","kid-animated.glb","kid.glb","chest.glb","books.glb","bush.glb"],e=await Promise.allSettled(i.map(iM));i.forEach((t,n)=>{let s=e[n];s.status==="fulfilled"?$m.set(t,s.value):console.warn(`preloadModels: falha ao carregar ${t}`,s.reason)})}function ai(i){return $m.get(i)||null}var Nd=new Map;function J(i){return Nd.has(i)||Nd.set(i,new zi({color:i})),Nd.get(i)}function rn(i,e=1){return new Pt({color:i,transparent:e<1,opacity:e})}function sM(i,e="#ffffff"){return typeof i=="string"?i:typeof i=="number"?`#${i.toString(16).padStart(6,"0")}`:i&&typeof i.getHexString=="function"?`#${i.getHexString()}`:e}function xs(i,e,t){let n=document.createElement("canvas");n.width=i,n.height=e,t(n.getContext("2d"),i,e);let s=new ti(n);return s.colorSpace=Dt,s}function ys(i,e,t){let n=document.createElement("canvas");n.width=i,n.height=e,t(n.getContext("2d"),i,e);let s=new ti(n);return s.colorSpace=Dt,{texture:s,canvas:n}}function rM(i,e=1.6){let t=i.width,n=i.height,s=i.getContext("2d").getImageData(0,0,t,n).data,r=document.createElement("canvas");r.width=t,r.height=n;let o=r.getContext("2d"),a=o.createImageData(t,n);for(let c=0;c<n;c+=1)for(let u=0;u<t;u+=1){let h=(u-1+t)%t,d=(u+1)%t,f=(c-1+n)%n,g=(c+1)%n,x=s[(c*t+h)*4]/255,m=s[(c*t+d)*4]/255,p=s[(f*t+u)*4]/255,b=s[(g*t+u)*4]/255,M=(m-x)*e,v=(b-p)*e,T=1/Math.sqrt(M*M+v*v+1),A=-M*T,R=-v*T,I=(c*t+u)*4;a.data[I]=(A*.5+.5)*255|0,a.data[I+1]=(R*.5+.5)*255|0,a.data[I+2]=(T*.5+.5)*255|0,a.data[I+3]=255}o.putImageData(a,0,0);let l=new ti(r);return l.colorSpace=Vn,l.wrapS=l.wrapT=jt,l}function Qt({texture:i,canvas:e},t,n=1,s=[.65,1]){i.wrapS=i.wrapT=jt,t&&i.repeat.set(t[0],t[1]);let r=rM(e,1.4);t&&r.repeat.set(t[0],t[1]);let o=oM(e,s[0],s[1]);return t&&o.repeat.set(t[0],t[1]),new Hi({map:i,normalMap:r,normalScale:new be(n,n),roughnessMap:o,metalness:0})}function oM(i,e=.65,t=1){let n=i.width,s=i.height,r=i.getContext("2d").getImageData(0,0,n,s).data,o=document.createElement("canvas");o.width=n,o.height=s;let a=o.getContext("2d"),l=a.createImageData(n,s);for(let u=0;u<n*s;u+=1){let h=r[u*4]/255,d=r[u*4+1]/255,f=r[u*4+2]/255,g=.299*h+.587*d+.114*f,x=(e+(1-g)*(t-e))*255|0;l.data[u*4]=l.data[u*4+1]=l.data[u*4+2]=x,l.data[u*4+3]=255}a.putImageData(l,0,0);let c=new ti(o);return c.colorSpace=Vn,c.wrapS=c.wrapT=jt,c}function It(i,e,t,n,s,r,o,a,{collider:l,rotY:c=0,cast:u=!0,receive:h=!0}={}){let d=new D(new Se(e,t,n),J(s));return d.position.set(r,o,a),d.rotation.y=c,d.castShadow=u,d.receiveShadow=h,i.add(d),l&&bn(i,r,a,e,n),d}function bn(i,e,t,n,s){let r=i.userData.zone?.colliders;r&&r.push({minX:e-n/2,maxX:e+n/2,minZ:t-s/2,maxZ:t+s/2})}function Vt(i,e,t,n,s,r=2.2,o=null){let a=Math.abs(n-e)||.3,l=Math.abs(s-t)||.3,c=(e+n)/2,u=(t+s)/2,h=new D(new Se(a,r,l),o||J(15260867));h.position.set(c,r/2,u),h.castShadow=!0,h.receiveShadow=!0,i.add(h),bn(i,c,u,a,l);let d=new D(new Se(a+.06,.32,l+.06),J(7031342));d.position.set(c,.16,u),i.add(d)}function Od(i,e,t,n){It(i,.5,.45,.5,10833966,e,.225,t,{collider:!0});let s=new D(new gt(.42,10,8),J(4160826));s.position.set(e,.9,t),s.scale.y=1.2,s.castShadow=!0,i.add(s);for(let r=0;r<5;r+=1){let o=va(n,.34);o.position.set(e+(Math.random()-.5)*.5,1.15+Math.random()*.25,t+(Math.random()-.5)*.5),o.rotation.y=Math.random()*Math.PI,i.add(o)}}function va(i,e){let t=new D(new tt(e,e),new zi({map:i,transparent:!0,side:yn,depthWrite:!1}));return t.castShadow=!1,t}function wt(i,e,t,n,s,r,o,{opacity:a=.5,amp:l=.18,speed:c=2.2}={}){wt.texture||(wt.texture=xs(128,128,h=>{let d=h.createRadialGradient(64,64,4,64,64,62);d.addColorStop(0,"rgba(255,255,255,1)"),d.addColorStop(.4,"rgba(255,255,255,.45)"),d.addColorStop(1,"rgba(255,255,255,0)"),h.fillStyle=d,h.fillRect(0,0,128,128)}));let u=new kr(new ks({map:wt.texture,color:t,transparent:!0,opacity:a,blending:wi,depthWrite:!1}));return u.position.set(s,r,o),u.scale.set(n,n,1),i.add(u),(e.pulses||=[]).push({obj:u.material,base:a,amp:l,speed:c,phase:Math.random()*6}),u}function aM(){return ys(1024,1024,i=>{i.fillStyle="#cbb9a4",i.fillRect(0,0,1024,1024);let e=128,t=64;for(let n=0;n<16;n+=1){let s=n%2*e/2;for(let r=-1;r<9;r+=1){let o=165+Math.random()*40;i.fillStyle=`rgb(${o+25}, ${o*.62}, ${o*.45})`,i.fillRect(r*e+s+3,n*t+3,e-6,t-6)}}})}function lM(){return ys(1024,1024,i=>{i.fillStyle="#efe3c8",i.fillRect(0,0,1024,1024);for(let e=0;e<3e3;e+=1)i.fillStyle=`rgba(${180+Math.random()*60|0}, ${165+Math.random()*55|0}, ${120+Math.random()*40|0}, .12)`,i.fillRect(Math.random()*256,Math.random()*256,2,2)})}function ng(){return ys(1024,1024,i=>{for(let e=0;e<16;e+=1){let t=150+Math.random()*30;i.fillStyle=`rgb(${t+30}, ${t*.82}, ${t*.52})`,i.fillRect(e*64,0,64,1024);for(let n=0;n<9;n+=1){i.strokeStyle=`rgba(90, 58, 28, ${.08+Math.random()*.1})`,i.lineWidth=1,i.beginPath();let s=e*64+4+Math.random()*56,r=Math.random()*1024;i.moveTo(s,r),i.bezierCurveTo(s+(Math.random()-.5)*18,r+80+Math.random()*200,s+(Math.random()-.5)*18,r+160+Math.random()*200,s+(Math.random()-.5)*12,r+240+Math.random()*600),i.stroke()}i.fillStyle="rgba(40, 26, 14, .8)",i.fillRect(e*64+62,0,2,1024)}})}function cM(){return ys(1024,1024,i=>{for(let e=0;e<8;e+=1)for(let t=0;t<8;t+=1){let n=(e+t)%2===0;i.fillStyle=n?"#9a6a48":"#d9c49a",i.fillRect(t*128,e*128,128,128),i.fillStyle="rgba(0,0,0,.08)";for(let s=0;s<28;s+=1)i.fillRect(t*128+Math.random()*128,e*128+Math.random()*128,3,3)}})}function uM(){return ys(1024,1024,i=>{i.fillStyle="#8e3b46",i.fillRect(0,0,1024,1024);for(let e=0;e<4e3;e+=1)i.fillStyle=Math.random()>.5?"rgba(60, 20, 26, .18)":"rgba(220, 150, 150, .1)",i.fillRect(Math.random()*256,Math.random()*256,2,2)})}function ig(){return ys(1024,1024,i=>{i.fillStyle="#3c7a40",i.fillRect(0,0,1024,1024);for(let e=0;e<9e3;e+=1)i.fillStyle=Math.random()>.5?"rgba(30, 70, 32, .25)":"rgba(120, 190, 100, .16)",i.fillRect(Math.random()*1024,Math.random()*1024,3,3+Math.random()*4)})}function Fd(){return ys(512,512,i=>{i.fillStyle="#8a6a42",i.fillRect(0,0,512,512);for(let n=0;n<2e3;n+=1){i.fillStyle=Math.random()>.5?"rgba(70, 50, 28, .3)":"rgba(190, 160, 110, .25)";let s=2+Math.random()*6;i.beginPath(),i.arc(Math.random()*512,Math.random()*512,s,0,7),i.fill()}i.globalCompositeOperation="destination-out";let e=i.createLinearGradient(0,0,120,0);e.addColorStop(0,"rgba(0,0,0,1)"),e.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=e,i.fillRect(0,0,120,512);let t=i.createLinearGradient(512,0,392,0);t.addColorStop(0,"rgba(0,0,0,1)"),t.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=t,i.fillRect(392,0,120,512)})}function su(){return xs(128,128,i=>{i.clearRect(0,0,128,128);for(let e=0;e<9;e+=1){let t=20+Math.random()*88,n=14+Math.random()*30,s=(Math.random()-.5)*30;i.strokeStyle=Math.random()>.5?"#4d8f45":"#67a851",i.lineWidth=5,i.lineCap="round",i.beginPath(),i.moveTo(t,124),i.quadraticCurveTo(t+s,70,t+s*1.6,n),i.stroke()}})}function sg(){return xs(128,128,i=>{i.clearRect(0,0,128,128),i.strokeStyle="#3f6b34",i.lineWidth=4,i.beginPath(),i.moveTo(10,120),i.bezierCurveTo(40,90,60,60,100,14),i.stroke();for(let e=0;e<9;e+=1){let t=18+Math.random()*96,n=20+Math.random()*96,s=10+Math.random()*9;i.fillStyle=Math.random()>.5?"#4d8f45":"#3c7a40",i.beginPath(),i.ellipse(t,n,s,s*.72,Math.random()*3,0,7),i.fill(),i.fillStyle="rgba(200, 240, 160, .25)",i.beginPath(),i.ellipse(t-s*.25,n-s*.25,s*.4,s*.28,0,0,7),i.fill()}})}function hM(){return xs(128,160,i=>{i.fillStyle="#fdf6e4",i.fillRect(0,0,128,160),i.strokeStyle="#b9ad92",i.lineWidth=4;for(let e=0;e<7;e+=1)i.beginPath(),i.moveTo(16,30+e*18),i.lineTo(112-Math.random()*30,30+e*18),i.stroke();i.fillStyle="#d4506a",i.beginPath(),i.arc(64,14,8,0,7),i.fill()})}function gs(){return ys(512,512,i=>{i.fillStyle="#8d8a80",i.fillRect(0,0,512,512);for(let e=0;e<2e3;e+=1)i.fillStyle=Math.random()>.5?"rgba(50, 48, 44, .2)":"rgba(200, 198, 188, .2)",i.fillRect(Math.random()*512,Math.random()*512,3,3)})}function eu({blink:i=!1,mustache:e=!1,glasses:t=!1}={}){return xs(256,256,n=>{n.clearRect(0,0,256,256);let s=r=>{if(i){n.strokeStyle="#3a2a20",n.lineWidth=8,n.lineCap="round",n.beginPath(),n.arc(r,116,17,.2*Math.PI,.8*Math.PI),n.stroke();return}n.fillStyle="#fff",n.beginPath(),n.ellipse(r,114,20,25,0,0,7),n.fill(),n.fillStyle="#5a3a22",n.beginPath(),n.arc(r,119,11.5,0,7),n.fill(),n.fillStyle="#241812",n.beginPath(),n.arc(r,120,6.5,0,7),n.fill(),n.fillStyle="#fff",n.beginPath(),n.arc(r-4,112,3.4,0,7),n.fill()};s(86),s(170),n.strokeStyle="#a4552f",n.lineWidth=9,n.lineCap="round",n.beginPath(),n.arc(128,164,27,.18*Math.PI,.82*Math.PI),n.stroke(),n.fillStyle="rgba(242, 130, 110, .38)",n.beginPath(),n.ellipse(56,156,17,11,0,0,7),n.fill(),n.beginPath(),n.ellipse(200,156,17,11,0,0,7),n.fill(),e&&(n.strokeStyle="#d8d3cc",n.lineWidth=13,n.beginPath(),n.arc(128,152,26,.25*Math.PI,.75*Math.PI),n.stroke()),t&&(n.strokeStyle="#3d4a50",n.lineWidth=7,n.beginPath(),n.arc(86,114,34,0,7),n.stroke(),n.beginPath(),n.arc(170,114,34,0,7),n.stroke(),n.beginPath(),n.moveTo(120,112),n.lineTo(136,112),n.stroke())})}var Ud=null;function _a(){return Ud||(Ud={open:eu(),blink:eu({blink:!0}),mustache:eu({mustache:!0}),glasses:eu({glasses:!0})}),Ud}function zd(i,e,t){let n=new D(new ni(t,24),new Pt({map:e,transparent:!0}));return n.position.z=t*1.18,i.add(n),n}function Gd(i){let e=i==="oakley"?ai("oakley-rigged.glb"):null,t=e||ai("ivy-rigged.glb");if(t&&t.animations&&t.animations.length){let m=new Mt,p=Ld(t.scene);p.traverse(O=>{if(O.isMesh){O.castShadow=!0,O.receiveShadow=!0;let z=Array.isArray(O.material)?O.material:[O.material];for(let G of z)G&&G.map&&G.emissive&&(G.emissiveMap=G.map,G.emissive=new we(6974058),G.emissiveIntensity=.9,G.toneMapped=!0)}}),p.scale.setScalar(1.18),i==="oakley"&&!e&&p.traverse(O=>{if(O.isMesh&&O.material){let z=Array.isArray(O.material)?O.material:[O.material];for(let G of z)G.color&&G.color.offsetHSL(.55,.1,.05)}}),m.add(p);let b=new Ys(p),M=(O,z)=>t.animations.find(G=>O.test(G.name))||(z?t.animations.find(G=>z.test(G.name)):null),v=M(/^idle$/i,/idle/i),T=M(/^walk$/i,/walk/i),A=M(/^run$/i,/run/i),R=null,I=null,w=null,_=null;v&&(R=b.clipAction(v),R.play(),_=R),T&&(I=b.clipAction(T),I.play(),I.enabled=!1,I.setEffectiveWeight(0)),A&&(w=b.clipAction(A),w.play(),w.enabled=!1,w.setEffectiveWeight(0));let P=0;return m.userData.animate=(O,z)=>{let G=Math.max(0,Math.min(.1,O-P));if(P=O,R&&I){let Q=z>.5,re=z>1.5&&w?w:Q?I:R;_!==re&&(re.enabled=!0,re.setEffectiveTimeScale(1),re.fadeIn(.15),_&&_.fadeOut(.15),_=re)}b.update(G)},m}let n=ai("kid-animated.glb");if(n&&n.animations&&n.animations.length){let m=new Mt,p=n.scene.clone(!0);p.traverse(_=>{_.isMesh&&(_.castShadow=!0,_.receiveShadow=!0)}),i==="oakley"&&p.traverse(_=>{if(_.isMesh&&/cap/i.test(_.name||"")&&_.material){let P=Array.isArray(_.material)?_.material:[_.material];for(let O of P)O.color&&O.color.set(4020894)}}),m.add(p);let b=new Ys(p),M=(_,P)=>n.animations.find(O=>_.test(O.name))||(P?n.animations.find(O=>P.test(O.name)):null),v=M(/rig\|idle/i,/idle/i),T=M(/rig\|walk(?!ing)/i,/walk/i),A=null,R=null,I=null;v&&(A=b.clipAction(v),A.play(),I=A),T&&(R=b.clipAction(T),R.play(),R.enabled=!1,R.setEffectiveWeight(0));let w=0;return m.userData.animate=(_,P)=>{if(!b)return;let O=Math.max(0,Math.min(.1,_-w));if(w=_,A&&R){let z=P>.5,G=z?R:A,Q=z?A:R;I!==G&&(G.enabled=!0,G.setEffectiveTimeScale(1),G.fadeIn(.18),Q.fadeOut(.18),I=G)}b.update(O)},m}let s=new Mt,r={},o=J(16175012),a=J(2897248),l=i==="ivy"?7029286:5124120;r.body=new Mt,s.add(r.body);let c=new D(new xi(.25,.4,4,12),a);if(c.position.y=.78,c.castShadow=!0,r.body.add(c),i==="ivy"){let m=new D(new tn(.35,.36,14,1,!0),J(2304594));m.position.y=.55,m.castShadow=!0,r.body.add(m)}else{let m=new D(new mt(.27,.27,.1,12),J(2304594));m.position.y=.56,r.body.add(m)}let u=new D(new mt(.13,.16,.06,12),J(15920608));u.position.y=1.02,r.body.add(u);let h=new D(new gt(.245,18,14),o);h.position.y=1.3,h.castShadow=!0,r.body.add(h),r.face=zd(h,_a().open,.2),r.face.position.set(0,-.01,.208);let d=new D(new gt(.27,18,12,0,Math.PI*2,0,Math.PI*.52),J(l));d.position.set(0,1.31,-.015),d.rotation.x=-.22,d.castShadow=!0,r.body.add(d);let f=new D(new gt(.22,14,10),J(l));if(f.position.set(0,1.22,-.12),f.scale.set(1,1.1,.9),r.body.add(f),i==="ivy"){r.ponytail=new D(new xi(.09,.3,4,8),J(l)),r.ponytail.position.set(0,1.06,-.3),r.ponytail.rotation.x=.35,r.ponytail.castShadow=!0,r.body.add(r.ponytail);let m=new D(new zs(.075,.03,8,14),J(13914218));m.position.set(0,1.24,-.27),m.rotation.x=Math.PI/2.4,r.body.add(m)}else{let m=new D(new gt(.16,12,8),J(l));m.position.set(0,1.42,.14),m.scale.set(1.5,.55,.7),r.body.add(m)}let g=new D(new Se(.32,.38,.17),J(5979428));g.position.set(0,.85,-.28),g.castShadow=!0,r.body.add(g);for(let m of[-1,1]){let p=new D(new Se(.06,.34,.02),J(4861976));p.position.set(m*.12,.9,.24),r.body.add(p)}let x=or(.075);x.position.set(0,.9,-.375),x.rotation.y=Math.PI,r.body.add(x),r.legs=[];for(let m of[-1,1]){let p=new D(new xi(.085,.26,4,10),J(i==="ivy"?16184044:3357278));p.position.set(m*.12,.27,0),p.castShadow=!0,s.add(p),r.legs.push(p);let b=new D(new gt(.095,10,8),J(2760984));b.position.set(m*.12,.05,.03),b.scale.set(1,.6,1.35),s.add(b),r.legs.push(b)}r.arms=[];for(let m of[-1,1]){let p=new D(new xi(.065,.3,4,10),a);p.position.set(m*.31,.85,0),p.castShadow=!0,r.body.add(p),r.arms.push(p);let b=new D(new gt(.07,10,8),o);b.position.set(m*.31,.64,0),r.body.add(b)}return s.userData.animate=(m,p)=>{let b=Math.min(1,p),M=Math.sin(m*9)*b*.55;r.legs[0].rotation.x=M,r.legs[1].rotation.x=-M,r.arms[0].rotation.x=-M*.8,r.arms[1].rotation.x=M*.8,r.body.position.y=Math.abs(Math.sin(m*9))*.05*b,r.body.rotation.z=Math.sin(m*9)*.03*b,r.ponytail&&(r.ponytail.rotation.z=Math.sin(m*3)*.12);let T=(m+1.7)%3.4<.14?_a().blink:_a().open;r.face.material.map!==T&&(r.face.material.map=T,r.face.material.needsUpdate=!0)},s}function dM(i=0){return xs(256,256,e=>{e.clearRect(0,0,256,256);let t=i===0?"#f4ecd8":"#d9cbb2";for(let n of[82,174])e.fillStyle=t,e.beginPath(),e.ellipse(n,128,58,66,0,0,7),e.fill();for(let n of[82,174])e.fillStyle="#e8a83d",e.beginPath(),e.arc(n,124,26,0,7),e.fill(),e.fillStyle="#241812",e.beginPath(),e.arc(n,124,17,0,7),e.fill(),e.fillStyle="#fff",e.beginPath(),e.arc(n-6,116,6,0,7),e.fill();e.fillStyle="#241812",e.beginPath(),e.ellipse(128,178,12,8,0,0,7),e.fill()})}function Vd(i=0){let e=ai("owl.glb");if(e){let c=new Mt,u=e.scene.clone(!0);return u.traverse(h=>{h.isMesh&&(h.castShadow=!0,h.receiveShadow=!0)}),u.scale.setScalar(.85),c.add(u),c.userData.animate=(h,d)=>{let f=d?1.6:1.62;c.position.y=f+Math.sin(h*(d?6:2.4))*(d?.18:.04),c.rotation.z=Math.sin(h*(d?4:1.5))*(d?.18:.04),c.rotation.y=Math.sin(h*1.2)*.08},c}let t=new Mt,n=i===0?14272936:9072982,s=new D(new gt(.17,14,12),J(n));s.scale.set(1,1.12,.9),s.castShadow=!0,t.add(s);let r=zd(t,dM(i),.2);r.position.set(0,.06,.1);for(let c of[-1,1]){let u=new D(new tn(.045,.11,6),J(n));u.position.set(c*.09,.22,.02),u.rotation.z=-c*.5,t.add(u)}let o=new D(new tn(.032,.07,6),J(15242285));o.rotation.x=Math.PI/2,o.position.set(0,.02,.21),t.add(o);let a=[];for(let c of[-1,1]){let u=new D(new gt(.15,10,8),J(n));u.scale.set(.26,.95,1),u.position.set(c*.16,-.01,0),u.castShadow=!0,t.add(u),a.push(u)}let l=new D(new tn(.08,.16,6),J(n));return l.position.set(0,-.14,-.1),l.rotation.x=-2.5,t.add(l),t.userData.animate=(c,u)=>{let h=Math.sin(c*(u?14:2.2))*(u?.9:.12);a[0].rotation.z=h,a[1].rotation.z=-h,s.rotation.z=Math.sin(c*(u?7:1.8))*(u?.15:.05),r.position.y=.06+Math.sin(c*2.4)*.006},t}function ba(i,e="mustache"){let n=ai({finch:"finch-rigged.glb",page:"page-rigged.glb",baker:"crumb-rigged.glb",raven:"raven-rigged.glb",willow:"willow-rigged.glb"}[e]||"__none__");if(n){let h=new Mt,d=Ld(n.scene);d.traverse(m=>{if(m.isMesh){m.castShadow=!0,m.receiveShadow=!0;let p=Array.isArray(m.material)?m.material:[m.material];for(let b of p)b&&b.map&&b.emissive&&(b.emissiveMap=b.map,b.emissive=new we(6974058),b.emissiveIntensity=.9)}}),h.add(d);let f=new Ys(d),g=n.animations.find(m=>/idle/i.test(m.name));g&&f.clipAction(g).play();let x=0;return h.userData.animate=m=>{let p=Math.max(0,Math.min(.1,m-x));x=m,f.update(p)},h}let s=ai("npc.glb");if(s){let h=new Mt,d=s.scene.clone(!0);return d.traverse(f=>{f.isMesh&&(f.castShadow=!0,f.receiveShadow=!0)}),d.rotation.x=Math.PI/2,h.add(d),h}let r=new Mt,o=new D(new xi(.3,.62,4,12),J(i));o.position.y=1.05,o.castShadow=!0,r.add(o);let a=new D(new Se(.4,.5,.05),J(13218954));a.position.set(0,.95,.3),r.add(a);let l=new D(new gt(.24,18,14),J(15911328));l.position.y=1.66,l.castShadow=!0,r.add(l),zd(l,_a()[e]||_a().mustache,.2).position.set(0,-.01,.208);let u=new D(new gt(.25,16,12),J(14209996));u.position.set(0,1.73,-.03),u.scale.set(1,.9,1),r.add(u);for(let h of[-1,1]){let d=new D(new xi(.1,.42,4,10),J(3816002));d.position.set(h*.15,.32,0),d.castShadow=!0,r.add(d)}return r}function ar(i){let e=new D(new ni(.4,20),new Pt({color:0,transparent:!0,opacity:.14,depthWrite:!1}));return e.rotation.x=-Math.PI/2,e.position.y=.02,i.add(e),e}function or(i=1){let e=new Mt,t=new D(new ni(i,32),rn(9067024));e.add(t);let n=new D(new ni(i*.86,32),rn(16106818));n.position.z=.001,e.add(n);let s=rn(8014344),r=new D(new mt(i*.05,i*.08,i*.62,6),s);r.position.y=-i*.24,r.position.z=.002,e.add(r);for(let[o,a]of[[.5,.5],[-.5,.5],[0,.62]]){let l=new D(new mt(i*.03,i*.045,i*a,5),s);l.position.set(Math.sin(o)*i*a*.5,i*(.18+Math.cos(o)*a*.4),.002),l.rotation.z=-o,e.add(l)}for(let[o,a,l]of[[-.34,.32,.2],[.34,.32,.2],[0,.5,.24],[-.16,.14,.15],[.16,.14,.15]]){let c=new D(new gt(i*l,8,6),rn(16768634));c.position.set(i*o,i*a,.003),e.add(c)}return e}function rr(i){let e=document.createElement("canvas");e.width=128,e.height=128;let t=e.getContext("2d");t.fillStyle="rgba(24, 20, 44, 0.9)",t.beginPath(),t.roundRect(10,10,108,108,26),t.fill(),t.strokeStyle="#f5c542",t.lineWidth=7,t.beginPath(),t.roundRect(10,10,108,108,26),t.stroke(),t.fillStyle="#fff6dd",t.font="bold 62px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText(i,64,70);let n=new ti(e);n.colorSpace=Dt;let s=new kr(new ks({map:n,transparent:!0}));return s.scale.set(.62,.62,1),s}function oo(i,e,t,n,s,r="s"){It(i,n,2.3,s,6111014,e,1.15,t,{collider:!0});let o=[.55,1.2,1.85],a=[11551038,4091056,4102751,13208109,8015567,13914218,5164484],l=n>s,c=l?n:s,u=r==="ns"?["s","n"]:[r];for(let h of u){let d=l?{x:0,z:(h==="s"?1:-1)*(s/2+.02)}:{x:(h==="e"?1:-1)*(n/2+.02),z:0},f=Math.min(.42,(l?s:n)-.2);for(let g of o){let x=Math.max(6,Math.round(c/.16)),m=new us(new Se(1,1,1),new zi,x),p=new Ye;for(let b=0;b<x;b+=1){let M=.09+Math.random()*.08,v=.34+Math.random()*.14;p.makeScale(l?M:f,v,l?f:M);let T=-(c/2-.1)+(b+.5)*(c-.2)/x;p.setPosition(l?e+T:e+d.x,g-.18+v/2,l?t+d.z:t+T),m.setMatrixAt(b,p),m.setColorAt(b,new we(a[Math.random()*a.length|0]))}m.castShadow=!0,i.add(m)}}}function ou(i,e){for(let t of i.pulses||[])t.obj.opacity=t.base+t.amp*Math.sin(e*t.speed+t.phase)}function Bd(i,e,t,n,{radius:s=1.5,height:r=11,tilt:o=.2,opacity:a=.1,color:l=16769704}={}){let c=new D(new tn(s,r,14,1,!0),new Pt({color:l,transparent:!0,opacity:a,side:yn,depthWrite:!1,blending:wi}));return c.position.set(e,t,n),c.rotation.z=o,i.add(c),c}function au(i,e,{top:t,horizon:n,glow:s="#ffe6b0",stars:r=!1,hills:o="green"}={}){let a=xs(32,256,(g,x,m)=>{let p=g.createLinearGradient(0,0,0,m),b=sM(e?.fog?.[0],n);if(p.addColorStop(0,t),p.addColorStop(.3,t),p.addColorStop(.44,n),p.addColorStop(.49,s),p.addColorStop(.53,n),p.addColorStop(.62,b),p.addColorStop(1,b),g.fillStyle=p,g.fillRect(0,0,x,m),r)for(let M=0;M<90;M+=1){let v=Math.random()*x,T=Math.random()*m*.42;g.fillStyle=`rgba(255,255,235,${.35+Math.random()*.6})`,g.fillRect(v,T,1.4,1.4)}}),l=new D(new gt(170,24,16),new Pt({map:a,side:nn,fog:!1,depthWrite:!1}));i.add(l),e.skyDome=l;let c=[],u=new zi({color:16775920,transparent:!0,opacity:.92,fog:!1,depthWrite:!1});for(let g=0;g<7;g+=1){let x=new Mt,m=3+Math.floor(Math.random()*3);for(let v=0;v<m;v+=1){let T=new D(new gt(1,10,8),u);T.position.set((v-m/2)*1.6,Math.random()*.5,Math.random()*.8),T.scale.set(1.7,.7,1.1),x.add(T)}let p=Math.random()*Math.PI*2,b=70+Math.random()*45,M=3.5+Math.random()*3.5;x.scale.setScalar(M),x.position.set(Math.cos(p)*b,26+Math.random()*16,Math.sin(p)*b),i.add(x),c.push(x)}let h=o==="city";if(o==="none")return e.clouds=c,e;let d=new Pt({color:h?4610159:4153416,fog:!1,depthWrite:!1,transparent:!0,opacity:.95}),f=new Mt;for(let g=0;g<26;g+=1){let x=g/26*Math.PI*2+Math.random()*.1,m=95+Math.random()*30,p=h?8+Math.random()*16:10+Math.random()*18,b;if(h){if(b=new D(new Se(8+Math.random()*10,p,8),d),Math.random()>.6){let M=new D(new tn(6,5,4),d);M.position.y=p/2+2.5,M.rotation.y=Math.PI/4,b.add(M)}}else b=new D(new gt(12+Math.random()*10,10,7),d),b.scale.y=.5+Math.random()*.4;b.position.set(Math.cos(x)*m,p/2-2,Math.sin(x)*m),b.lookAt(0,b.position.y,0),f.add(b)}return i.add(f),e.clouds=c,e}function fM(i,e,{url:t,radius:n=125,height:s=55,centerY:r=10,crop:o=[.08,.88],sky:a="207, 230, 216",haze:l="135, 183, 160"}={}){let c=xs(16,128,(d,f,g)=>{let x=d.createLinearGradient(0,0,0,g);x.addColorStop(0,`rgba(${a}, 0)`),x.addColorStop(.3,"rgba(93, 126, 86, 0.92)"),x.addColorStop(.62,"rgba(70, 100, 64, 1)"),x.addColorStop(1,`rgba(${l}, 1)`),d.fillStyle=x,d.fillRect(0,0,f,g)}),u=new Pt({map:c,side:nn,transparent:!0,fog:!1,depthWrite:!1}),h=new D(new mt(n,n,s,48,1,!0),u);return h.position.y=r,h.renderOrder=-1,i.add(h),e.photoBand=h,new Vs().load(t,d=>{let f=d.image,g=Math.round(f.height*o[0]),x=Math.round(f.height*o[1]),m=document.createElement("canvas");m.width=f.width,m.height=x-g;let p=m.getContext("2d");p.drawImage(f,0,g,f.width,x-g,0,0,f.width,x-g),p.fillStyle="rgba(112, 142, 112, 0.16)",p.fillRect(0,0,m.width,m.height);let b=p.createLinearGradient(0,0,0,m.height*.44);b.addColorStop(0,"rgba(0, 0, 0, 1)"),b.addColorStop(1,"rgba(0, 0, 0, 0)"),p.globalCompositeOperation="destination-out",p.fillStyle=b,p.fillRect(0,0,m.width,m.height*.44),p.globalCompositeOperation="source-over";let M=p.createLinearGradient(0,m.height,0,m.height*.58);M.addColorStop(0,`rgba(${l}, 1)`),M.addColorStop(1,`rgba(${l}, 0)`),p.fillStyle=M,p.fillRect(0,m.height*.58,m.width,m.height*.42);let v=new ti(m);v.colorSpace=Dt,u.map=v,u.needsUpdate=!0,d.dispose()},void 0,()=>{}),e}function Wd(i,e,t,n,s,r,o=14){let a=wt(i,e,t,o,n,s,r,{opacity:.55,amp:.05,speed:.6});return a.material.fog=!1,a}function Xn(i,e,t,n,s,{height:r=.9,color:o=3042100,spacing:a=1.1}={}){let l=Math.hypot(n-e,s-t),c=Math.max(1,Math.round(l/a));for(let u=0;u<=c;u+=1){let h=u/c,d=e+(n-e)*h,f=t+(s-t)*h,g=new D(new gt(r*.62,8,7),J(o));g.position.set(d,r*.55,f),g.scale.y=1.15,g.castShadow=!0,i.add(g)}}function tu(i,e,t,n,s,r=1){for(let a of[t,n])It(i,.34,2.5,.34,15260867,e,1.25,a);It(i,.3,.26,Math.abs(n-t)+.34,14207400,e,2.6,(t+n)/2);let o=rr(s);o.position.set(e+r*.25,2.95,(t+n)/2),o.scale.set(1.7,.42,1),i.add(o),wt(i,i.userData.zone,16771512,1.1,e+r*.3,2.6,(t+n)/2,{opacity:.22,amp:.07,speed:1.2})}function sr(i,e,t,n,s,{height:r=.9,color:o=3095108}={}){let a=Math.hypot(n-e,s-t),l=(e+n)/2,c=(t+s)/2,u=Math.abs(n-e)>Math.abs(s-t),h=new D(new Se(u?a:.08,.08,u?.08:a),J(o));h.position.set(l,r,c),i.add(h);let d=h.clone();d.position.y=r*.5,i.add(d);let f=Math.max(2,Math.round(a/1.6));for(let g=0;g<=f;g+=1){let x=g/f,m=new D(new Se(.09,r,.09),J(o));m.position.set(e+(n-e)*x,r/2,t+(s-t)*x),m.castShadow=!0,i.add(m)}}function Jm(i,e,t,n=0){let s=new D(new mt(.06,.08,1.7,8),J(7031342));s.position.set(e,.85,t),s.castShadow=!0,i.add(s);for(let[r,o]of[[0,.35],[1,Math.PI-.4]].entries()){let a=new D(new Se(.85,.14,.05),J(4880954));a.position.set(e+Math.cos(o)*.38,1.5-r*.28,t),a.rotation.y=o+n,i.add(a)}return s}var pM=15921382,mM=8826562,ru=4672596,gM=2.36,kd=4.3;function xM(i,e,t,n,s,r,o=gM,a=kd){let l=(Math.abs(n-e)||.3)+.28,c=(Math.abs(s-t)||.3)+.28,u=new D(new Se(l,a-o,c),r);u.position.set((e+n)/2,(o+a)/2,(t+s)/2),u.castShadow=!1,u.receiveShadow=!0,i.add(u)}function yM(i,e,t,n,s,r,o,a=.3,l=.42){let c=[[(e+n)/2,t,n-e+a,a],[(e+n)/2,s,n-e+a,a],[e,(t+s)/2,a,s-t-a],[n,(t+s)/2,a,s-t-a]];for(let[u,h,d,f]of c){let g=new D(new Se(d,l,f),o);g.position.set(u,r+l/2,h),g.castShadow=!1,g.receiveShadow=!0,i.add(g)}}function nu(i,e,[t,n,s,r],o,{storey:a=!0}={}){for(let[g,x,m,p]of e)xM(i,g,x,m,p,o);let l=s-t+.58,c=r-n+.58,u=(t+s)/2,h=(n+r)/2,d=new D(new Se(l,.16,c),J(ru));if(d.position.set(u,2.28,h),d.castShadow=!1,i.add(d),!a)return;let f=new D(new Se(l,.18,c),J(ru));f.position.set(u,kd+.09,h),f.castShadow=!1,f.receiveShadow=!0,i.add(f),yM(i,t-.29,n-.29,s+.29,r+.29,kd+.18,o)}function vM(i,e){let t=[],n=[],s=new At,r=(a,l,c,u,h,d,f)=>{s.position.set(l,c,u),s.scale.set(h,d,f),s.updateMatrix(),a.push(s.matrix.clone())};for(let a of e){let{face:l,fixed:c,along:u,y:h,width:d=1.05,height:f=1.2}=a,g=l==="e"||l==="w",x=l==="e"||l==="s"?1:-1;r(t,g?c+.045*x:u,h,g?u:c+.045*x,g?.1:d+.22,f+.22,g?d+.22:.1),r(n,g?c+.1*x:u,h,g?u:c+.1*x,g?.1:d,f,g?d:.1),r(t,g?c+.13*x:u,h,g?u:c+.13*x,g?.12:.07,f,g?.07:.12)}let o=(a,l)=>{let c=new us(new Se(1,1,1),J(l),a.length);a.forEach((u,h)=>c.setMatrixAt(h,u)),c.instanceMatrix.needsUpdate=!0,c.castShadow=!1,c.receiveShadow=!1,i.add(c)};o(t,pM),o(n,mM)}function iu(i,{width:e=3.6,height:t=.66,bg:n="#1f3a5f",fg:s="#fdf7e6"}={}){let r=document.createElement("canvas");r.width=1024,r.height=160;let o=r.getContext("2d");o.fillStyle=n,o.beginPath(),o.roundRect(8,8,1008,144,18),o.fill(),o.strokeStyle="#f5c542",o.lineWidth=6,o.beginPath(),o.roundRect(8,8,1008,144,18),o.stroke(),o.fillStyle=s,o.font="bold 60px sans-serif",o.textAlign="center",o.textBaseline="middle",o.fillText(i,512,86,960);let a=new ti(r);return a.colorSpace=Dt,new D(new tt(e,t),new Pt({map:a}))}function Qm(i,e,t,n=1.8){let s=new D(new mt(.12*n,.2*n,2*n,6),J(4863526));s.position.set(e,n,t),i.add(s);for(let[r,o,a,l,c]of[[2.5,1.15,0,0,3104051],[3.2,.82,.5*n,.3*n,3828540]]){let u=new D(new gt(o*n,8,7),J(c));u.position.set(e+a,r*n,t+l),u.scale.y=.85,i.add(u)}}function rg(i){let e={name:"school",spawn:[0,.6],bounds:{minX:-12,maxX:12,minZ:-37,maxZ:3.2},colliders:[],interactables:[],hemi:[16773849,7035460,1.15],sun:{color:16769192,intensity:1.95,pos:[8,14,6]},background:9423336,fog:[9423336,46,150],npcSpots:{finch:[-4.3,.8],page:[-4.8,-25.1]},exits:[{x:0,z:3,radius:1.7,target:"highstreet",spawn:[0,-14.6]},{x:-5.9,z:-12,radius:1.6,target:"classroom",spawn:[0,6.5]}]};i.userData.zone=e;let t=(j,ee,E,y=1.6)=>e.interactables.push({id:j,x:ee,z:E,radius:y});au(i,e,{top:"#4a8fd4",horizon:"#bfe3f2",glow:"#ffe9c0",hills:"city"}),Wd(i,e,16773312,-40,34,60,18);let n=Qt(lM(),[3,2]),s=Qt(aM(),[2,.7],1.2),r=ig();r.texture.wrapS=r.texture.wrapT=jt,r.texture.repeat.set(8,12);let o=new D(new tt(26,42),Qt(r,[8,12],1.3,[.75,1]));o.rotation.x=-Math.PI/2,o.position.set(0,-.01,-16.5),o.receiveShadow=!0,i.add(o);let a=new D(new tt(15,9),Qt(gs(),[5,3],1.2,[.7,1]));a.rotation.x=-Math.PI/2,a.position.set(0,0,-.5),a.receiveShadow=!0,i.add(a);let l=new D(new tt(14.4,10.4),Qt(ng(),[4,3],.45,[.55,.95]));l.rotation.x=-Math.PI/2,l.position.set(0,0,-1),l.receiveShadow=!0,i.add(l);let c=new D(new tt(4.2,10.4),Qt(cM(),[1.4,3.4],1,[.5,.9]));c.rotation.x=-Math.PI/2,c.position.set(0,.001,-11),c.receiveShadow=!0,i.add(c);let u=new D(new tt(16.4,12.4),Qt(uM(),[5,4],.4,[.7,1]));u.rotation.x=-Math.PI/2,u.position.set(0,.001,-22),u.receiveShadow=!0,i.add(u);let h=new D(new ni(2.6,32),J(10370898));h.rotation.x=-Math.PI/2,h.position.set(.5,.02,-21.5),h.receiveShadow=!0,i.add(h);let d=new D(new ki(2.35,2.6,32),J(13215850));d.rotation.x=-Math.PI/2,d.position.set(.5,.022,-21.5),i.add(d),Vt(i,-7,4,-1,4,2.2,s),Vt(i,1,4,7,4,2.2,s),Vt(i,-7,-6,-7,.2,2.2,n),Vt(i,-7,2.4,-7,4,2.2,n),Vt(i,7,-6,7,.2,2.2,n),Vt(i,7,2.4,7,4,2.2,n),Vt(i,-7,-6,-1.8,-6,2.2,n),Vt(i,1.8,-6,7,-6,2.2,n),Vt(i,-1.8,-16,-1.8,-12.8,2.2,n),Vt(i,-1.8,-11.2,-1.8,-6,2.2,n),Vt(i,1.8,-16,1.8,-12.8,2.2,n),Vt(i,1.8,-11.2,1.8,-6,2.2,n),Vt(i,-8,-16,-1.8,-16,2.2,n),Vt(i,1.8,-16,8,-16,2.2,n),Vt(i,-8,-28,-8,-16,2.2,n),Vt(i,8,-28,8,-16,2.2,n),Vt(i,-8,-28,8,-28,2.2,n),tu(i,-7,.2,2.4,"GARDEN",-1),tu(i,7,.2,2.4,"PLAYGROUND",1),tu(i,-1.8,-12.8,-11.2,"CLASSROOM",-1),tu(i,1.8,-12.8,-11.2,"SPORTS",1),nu(i,[[-7,-6,7,-6],[7,-6,7,0],[7,2.4,7,4],[-7,-6,-7,0],[-7,2.4,-7,4],[-7,4,7,4]],[-7,-6,7,4],n),nu(i,[[1.8,-16,1.8,-13.1],[1.8,-10.9,1.8,-6],[-1.8,-16,-1.8,-13.1],[-1.8,-10.9,-1.8,-6],[-1.8,-16,1.8,-16],[-1.8,-6,1.8,-6]],[-1.8,-16,1.8,-6],n),nu(i,[[-8,-28,8,-28],[8,-28,8,-16],[-8,-28,-8,-16],[-8,-16,8,-16]],[-8,-28,8,-16],n),nu(i,[[-7.6,-13.4,-7.6,-10.6],[-7.6,-13.4,-4.3,-13.4],[-4.3,-13.4,-4.3,-12.8],[-4.3,-11.2,-4.3,-10.6],[-7.6,-10.6,-4.3,-10.6]],[-7.6,-13.4,-4.3,-10.6],n,{storey:!1});let f=[],g=(j,ee,E,y)=>{for(let U of E)f.push({face:j,fixed:ee,along:U,y:1.3});for(let U of y)f.push({face:j,fixed:ee,along:U,y:3.33})};g("e",7.29,[-5.2,-3,-.8,3.3],[-5.2,-3,-.8,3.3]),g("w",-7.29,[-4.8,3.3],[-5.2,-3,-.8,3.3]),g("e",2.09,[-15.4,-13.6,-10.6,-8.8,-7],[-15.4,-13.6,-10.4,-8.2,-6.6]),g("w",-2.09,[-15.4,-13.6,-10.6,-8.8,-7],[-15.4,-13.6,-10.4,-8.2,-6.6]),g("e",8.29,[-27,-24.8,-22.6,-20.4,-18.2,-16.8],[-27,-24.8,-22.6,-20.4,-18.2,-16.8]),g("w",-8.29,[-27,-24.8,-22.6,-20.4,-18.2,-16.8],[-27,-24.8,-22.6,-20.4,-18.2,-16.8]),g("n",-28.29,[-6.6,-4.4,-2.2,2.2,4.4,6.6],[-6.6,-4.4,-2.2,0,2.2,4.4,6.6]),g("s",-15.71,[2.8,5,7.2],[2.8,5,7.2]),g("s",-15.71,[-2.8,-5,-7.2],[-2.8,-5,-7.2]),g("w",-7.75,[-12],[-12]),g("s",-10.45,[-5.95],[-5.95]),vM(i,f);let x=iu("LEIGH STATIONERS' PRIMARY ACADEMY",{width:4.2});x.position.set(7.33,3.9,-2.7),x.rotation.y=Math.PI/2,i.add(x);let m=iu("LEIGH STATIONERS' PRIMARY",{width:3.4});m.position.set(-7.33,3.9,-3),m.rotation.y=-Math.PI/2,i.add(m),It(i,2.2,1.3,2.2,n,4.6,5.05,-22,{cast:!1}),It(i,2.4,.16,2.4,J(ru),4.6,5.78,-22,{cast:!1});for(let j of[-4.4,2.2])It(i,.7,.5,.7,J(ru),j,4.73,-1,{cast:!1});It(i,1.9,2.1,.14,5125408,0,1.05,4.05);let p=new D(new mt(.95,.95,.14,20,1,!1,0,Math.PI),J(5125408));p.rotation.set(Math.PI/2,0,0),p.position.set(0,2.1,4.05),i.add(p);let b=or(.3);b.position.set(0,2.1,4.16),i.add(b),wt(i,e,16765286,1.3,0,2.1,4.3,{opacity:.35,amp:.12});let M=iu("LEIGH STATIONERS' PRIMARY ACADEMY",{width:3.4});M.position.set(-3.3,1.5,3.92),M.rotation.y=Math.PI,i.add(M);let v=iu("EASTCOTE ROAD",{width:1.7,height:.42,bg:"#2b2b2b"});v.position.set(3.1,1.55,3.92),v.rotation.y=Math.PI,i.add(v);for(let j of[-3.4,-.6,2.2]){let ee=new D(new tt(1.5,1.4),rn(16771512,.95));ee.position.set(6.82,1.5,j),ee.rotation.y=-Math.PI/2,i.add(ee);for(let E of[-.5,0,.5]){let y=new D(new Se(.05,1.4,.06),J(15721416));y.position.set(6.78,1.5,j+E),i.add(y)}wt(i,e,16767114,2.2,6.2,1.5,j,{opacity:.28,amp:.08,speed:1.4}),Bd(i,5.4,1.4,j,{radius:1.1,height:4.4,tilt:-.9,opacity:.09})}for(let j of[-8.5,-11.5,-14.5]){let ee=new D(new tt(1.1,1.2),rn(16771512,.9));ee.position.set(1.68,1.5,j),ee.rotation.y=-Math.PI/2,i.add(ee),wt(i,e,16767114,1.7,1.2,1.5,j,{opacity:.24,amp:.08,speed:1.6}),Bd(i,-.2,1.4,j,{radius:.9,height:4,tilt:-1.1,opacity:.08})}It(i,.12,1.5,2.4,7031338,6.85,1.6,.2),It(i,.05,1.2,2.1,13215850,6.76,1.6,.2);for(let[j,ee]of[[-.5,.08],[.2,-.05],[.9,.06]]){let E=new D(new tt(.34,.42),new zi({map:hM()}));E.position.set(6.72,1.62,j),E.rotation.y=-Math.PI/2+ee,i.add(E)}t("board",5.9,.2,1.7),It(i,.9,.65,.6,5925490,-5.6,.42,-.6,{collider:!0}),It(i,.9,.08,.6,4016720,-5.6,.8,-.6);let T=new D(new mt(.035,.035,1.5,6),J(9067050));T.position.set(-5,.75,-1.3),T.rotation.z=.35,T.castShadow=!0,i.add(T);let A=new D(new Se(.2,2.6,2.6),s);A.position.set(-6.9,1.3,-2.2),i.add(A),It(i,.18,2.1,1.7,3104051,-6.88,1.05,-2.2);let R=or(.38);R.position.set(-6.76,1.3,-2.2),R.rotation.y=Math.PI/2,i.add(R);let I=sg();for(let j=0;j<14;j+=1){let ee=va(I,.4+Math.random()*.25);ee.position.set(-6.72+Math.random()*.1,.5+Math.random()*1.8,-2.2+(Math.random()-.5)*1.9),ee.rotation.y=Math.PI/2+(Math.random()-.5)*.4,i.add(ee)}let w=new zn(16106818,7,5.5);w.position.set(-6.1,1.5,-2.2),i.add(w),wt(i,e,16765286,1.7,-6.5,1.35,-2.2,{opacity:.4,amp:.15}),t("ivyDoor",-5.9,-2.2,1.7),Od(i,-6.2,3.1,su()),Od(i,6.2,-5.2,su()),It(i,1.6,.42,.55,8018484,4.6,.21,-3.2,{collider:!0});for(let j of[-7.2,-9.2,-15]){It(i,.45,1.9,1.7,2897248,-1.55,.95,j,{collider:!0});let ee=new D(new Se(.03,.4,1.1),J(1909829));ee.position.set(-1.31,1.25,j),i.add(ee);let E=new D(new gt(.035,8,6),J(16106818));E.position.set(-1.29,1,j-.55),i.add(E)}let _=new D(new tt(1.3,1.5),rn(4020864,.55));_.position.set(1.7,1.5,-8.5),_.rotation.y=-Math.PI/2,i.add(_);let P=or(.34);P.position.set(1.62,1.5,-8.5),P.rotation.y=-Math.PI/2,i.add(P);let O=new zn(16106818,6,5);O.position.set(1,1.5,-8.5),i.add(O),wt(i,e,16765286,1.5,1.35,1.5,-8.5,{opacity:.4,amp:.14}),t("signTree",.9,-8.5,1.4),It(i,1.1,.7,.55,8014378,-5.4,.45,-19.3,{collider:!0}),It(i,1,.3,.45,12597547,-5.4,.95,-19.3),It(i,.16,.24,.3,4091056,-5.6,1.25,-19.3),t("pieceTrolley",-4.8,-18.8,1.5),oo(i,-3.2,-27.55,4.4,.7,"s"),oo(i,3.2,-27.55,4.4,.7,"s"),oo(i,-7.55,-21.5,.7,7.4,"e"),oo(i,7.55,-21.5,.7,7.4,"w"),oo(i,2.9,-19.6,2.6,.8,"ns"),oo(i,-3.4,-23.4,2.6,.8,"ns");let z=new D(new tt(.3,.38),rn(16774064));z.position.set(7.12,1.25,-22.5),z.rotation.y=-Math.PI/2,i.add(z),e.glint=z,wt(i,e,16774064,.9,7,1.25,-22.5,{opacity:.5,amp:.25,speed:3}),t("pieceShelf",6.6,-22.5,1.6),It(i,3.2,.5,1.5,7031338,.5,.5,-21.5,{collider:!0});let G=new D(new Se(.5,.05,.36),J(15920608));G.position.set(.2,.79,-21.4),G.rotation.y=.3,i.add(G);for(let[j,ee]of[[-.8,-20.4],[1.8,-20.4],[-.8,-22.6],[1.8,-22.6]])It(i,.4,.45,.4,9067060,j,.22,ee);for(let[j,ee]of[[-.9,-22.2],[1.9,-20.8]]){let E=new D(new mt(.05,.07,.24,8),J(9067050));E.position.set(j,.62,ee),i.add(E);let y=new D(new tn(.18,.16,10),rn(16767114));y.position.set(j,.8,ee),i.add(y);let U=new zn(16761706,3.5,3.5);U.position.set(j,.85,ee),i.add(U),wt(i,e,16761706,.8,j,.85,ee,{opacity:.3,amp:.06,speed:1.2})}t("clueTable",.5,-21.5,2.1),t("orderStart",-5.5,-26.4,1.8),t("orderFeather",3.3,-5.6,1.5);let Q=ai("books.glb");if(Q)for(let[j,ee,E,y,U]of[[2.7,.78,-21.6,.4,1],[3.6,.78,-21.3,2.2,.8],[.9,.045,-20.2,1.1,.9],[-2.4,.045,-20.8,.2,.7],[6.9,.045,-24,2.8,1]]){let Y=Q.scene.clone(!0);Y.traverse(te=>{te.isMesh&&(te.castShadow=!0,te.receiveShadow=!0)}),Y.position.set(j,ee,E),Y.rotation.y=y,Y.scale.setScalar(U*1.6),i.add(Y)}It(i,1.9,.75,.9,6111014,-5.5,.375,-26.4,{collider:!0});let Z=new D(new gt(.22,14,12),J(4091056));Z.position.set(-6,.98,-26.3),Z.castShadow=!0,i.add(Z);let re=new D(new mt(.06,.1,.18,8),J(9067050));re.position.set(-6,.84,-26.3),i.add(re),t("page",-4.8,-25.1,1.9),t("finch",-4.3,.8,1.9);let X=(j,ee,E=1.2,y=!0)=>{let U=ai("trees.glb");if(!U)return;let Y=U.scene.clone(!0);Y.traverse(te=>{te.isMesh&&(te.castShadow=!0,te.receiveShadow=!0)}),Y.position.set(j,0,ee),Y.rotation.y=Math.random()*Math.PI*2,Y.scale.setScalar(E*1.5),i.add(Y),y&&bn(i,j,ee,.7*E,.7*E)};Vt(i,-7.6,-13.4,-7.6,-10.6,2.2,s),Vt(i,-7.6,-13.4,-4.3,-13.4,2.2,n),Vt(i,-7.6,-10.6,-4.3,-10.6,2.2,n),Vt(i,-4.3,-13.4,-4.3,-12.8,2.2,n),Vt(i,-4.3,-11.2,-4.3,-10.6,2.2,n),It(i,.14,.6,1.6,n,-4.3,1.9,-12);let he=rr("CLASSROOM");he.position.set(-4.35,1.75,-12),he.rotation.y=Math.PI/2,he.scale.set(1.5,.38,1),i.add(he),X(-9.4,.8,1.4),X(-10.6,-1.8,1);for(let[j,ee]of[[-8.2,2.2],[-10.9,1.6]]){let E=new D(new Se(.5,.42,1.7),J(7031338));E.position.set(j,.21,ee),E.castShadow=!0,i.add(E),bn(i,j,ee,.3,.9)}for(let[j,ee]of[[-7.9,.4],[-7.9,-1.4],[-11.4,-.4]])Od(i,j,ee,su());let ge=new D(new tt(4.2,6.6),J(12607551));ge.rotation.x=-Math.PI/2,ge.position.set(9.6,.01,-.6),ge.receiveShadow=!0,i.add(ge),sr(i,7.5,-3.9,11.7,-3.9,{height:.8}),sr(i,11.7,-3.9,11.7,2.7,{height:.8}),sr(i,7.5,2.7,11.7,2.7,{height:.8});let Re=new D(new Se(.9,.5,.9),J(4160874));Re.position.set(8.5,.9,.8),Re.castShadow=!0,i.add(Re),bn(i,8.5,.8,.5,.5);let qe=new D(new Se(.9,.1,2.4),J(15909198));qe.position.set(8.5,.55,-.9),qe.rotation.x=.5,qe.castShadow=!0,i.add(qe);for(let j of[10.4,11.2]){let ee=new D(new Se(.1,1.8,.1),J(3095108));ee.position.set(j,.9,-1.6),ee.rotation.z=j<11?-.22:.22,ee.castShadow=!0,i.add(ee)}let ct=new D(new Se(1.4,.08,.08),J(3095108));ct.position.set(10.8,1.75,-1.6),i.add(ct);for(let j of[10.55,11.05]){let ee=new D(new Se(.03,1.1,.03),J(15260867));ee.position.set(j,1.2,-1.6),i.add(ee);let E=new D(new Se(.4,.06,.24),J(12597547));E.position.set(j,.62,-1.6),i.add(E)}bn(i,10.8,-1.6,.8,.3),It(i,2,.25,1.6,7031342,9.3,.12,-3,{collider:!0});let ut=new D(new Se(1.8,.1,1.4),J(15260064));ut.position.set(9.3,.27,-3),i.add(ut);let $e=new Mt,$=new D(new mt(.03,.03,.8),J(3811866));$.position.y=.4,$e.add($);let se=new D(new tn(.28,.4,8),J(9322347));se.position.y=.85,$e.add(se),$e.position.set(11.3,0,2),$e.rotation.z=.5,i.add($e),wt(i,e,16752098,1,11.3,.7,2,{opacity:.4,amp:.18,speed:2.4}),t("umbrellaSpot",11,2,1.5),t("playground",9.4,-1.2,2);let xe=new D(new tt(3.4,8.4),J(7031342));xe.rotation.x=-Math.PI/2,xe.position.set(-9.6,.012,-9.4),xe.receiveShadow=!0,i.add(xe);let Be=new D(new Se(2.6,.9,3),J(10390122));Be.position.set(-9.6,.45,-12.2),Be.castShadow=!0,i.add(Be),bn(i,-9.6,-12.2,1.3,1.5);let Ce=new D(new Se(2.5,1.3,2.9),new qo({color:13625560,transparent:!0,opacity:.32,shininess:90}));Ce.position.set(-9.6,1.55,-12.2),i.add(Ce);for(let[j,ee]of[[-10.8,-13.6],[-8.4,-13.6],[-10.8,-10.8],[-8.4,-10.8]]){let E=new D(new Se(.08,2.1,.08),J(4880954));E.position.set(j,1.05,ee),i.add(E)}wt(i,e,12582864,1.6,-9.6,1.5,-12.2,{opacity:.22,amp:.06,speed:1.2});for(let[j,ee]of[[-9.6,-7.4],[-9.6,-5.4]]){It(i,2.4,.35,1.4,9067060,j,.18,ee,{collider:!0});for(let E=0;E<2;E+=1)for(let y=0;y<3;y+=1){let U=new D(new gt(.13,8,7),J(E===0?4886856:12607551));U.position.set(j-.7+y*.7,.42,ee-.3+E*.6),U.scale.y=.8,i.add(U)}}let et=new D(new mt(.14,.17,.3,10),J(4156592));et.position.set(-8.6,.15,-8.6),i.add(et);let Ut=new D(new mt(.05,.06,1.5,8),J(7031342));Ut.position.set(-11,.75,-10),i.add(Ut);let C=new D(new gt(.24,10,8),J(15260064));C.position.set(-11,1.6,-10),C.castShadow=!0,i.add(C);let ft=new D(new tn(.3,.3,8),J(11889226));ft.position.set(-11,1.9,-10),i.add(ft),t("garden",-9.4,-8.6,2);let He=new D(new tt(4,14),J(4156554));He.rotation.x=-Math.PI/2,He.position.set(9.6,.012,-14),He.receiveShadow=!0,i.add(He);for(let j of[-14,-20,-8]){let ee=new D(new tt(3.8,.08),J(15920608));ee.rotation.x=-Math.PI/2,ee.position.set(9.6,.025,j),i.add(ee)}let Ue=new D(new tt(.08,13.6),J(15920608));Ue.rotation.x=-Math.PI/2,Ue.position.set(9.6,.025,-14),i.add(Ue);for(let j of[-19.6,-8.4]){let ee=new Mt;for(let y of[-.6,.6]){let U=new D(new Se(.08,1.1,.08),J(15920608));U.position.set(y,.55,0),ee.add(U)}let E=new D(new Se(1.28,.08,.08),J(15920608));E.position.set(0,1.1,0),ee.add(E),ee.position.set(9.6,0,j),i.add(ee)}let F=new D(new Se(.08,.9,1.3),J(4864554));F.position.set(11.5,1.1,-18.4),F.castShadow=!0,i.add(F),wt(i,e,16774064,.8,11.3,1.3,-18.4,{opacity:.4,amp:.2,speed:2.4}),t("clueTimetable",11.2,-18.4,1.4),t("sports",9.6,-14,2.2),sr(i,7.5,-21.2,11.7,-21.2,{height:1.1}),sr(i,7.5,-21.2,7.5,-6.8,{height:1.1}),sr(i,11.7,-21.2,11.7,-6.8,{height:1.1}),sr(i,7.5,-6.8,11.7,-6.8,{height:1.1});let ie=new D(new tt(22,8),J(4160826));ie.rotation.x=-Math.PI/2,ie.position.set(0,.008,-32.5),ie.receiveShadow=!0,i.add(ie);let q=new D(new ki(1.4,1.55,32),J(15920608));q.rotation.x=-Math.PI/2,q.position.set(0,.02,-32.5),i.add(q);for(let j of[-36.3,-28.7]){let ee=new Mt;for(let y of[-.9,.9]){let U=new D(new Se(.1,1.3,.1),J(15920608));U.position.set(y,.65,0),ee.add(U)}let E=new D(new Se(1.9,.1,.1),J(15920608));E.position.set(0,1.3,0),ee.add(E),ee.position.set(0,0,j),i.add(ee)}let fe=new D(new tt(24,1.6),Qt(Fd(),[8,1],1,[.75,1]));fe.rotation.x=-Math.PI/2,fe.position.set(0,.006,-28.2),i.add(fe);for(let j of[-8,8]){let ee=new D(new Se(.5,.42,1.7),J(7031338));ee.position.set(j,.21,-28.6),ee.castShadow=!0,i.add(ee),bn(i,j,-28.6,.3,.9)}t("field",0,-32.5,2.4);for(let j=0;j<11;j+=1)X(-11+j*2.2,-36.3-j%2*.4,1.5+j%3*.3,!1);for(let j=0;j<9;j+=1)Qm(i,-11+j*2.7,-37.2,1.9+j%3*.4);for(let j=0;j<5;j+=1)X(-11.6,-2-j*8,1.3,!1),X(11.6,-2-j*8,1.3,!1);for(let[j,ee]of[[-12.1,-3],[12.1,-3],[-12.1,-19],[12.1,-19],[-12.1,-35],[12.1,-35]])Qm(i,j,ee,1.7);return Xn(i,-11.8,3,-11.8,-36.8,{height:1}),Xn(i,11.8,3,11.8,-36.8,{height:1}),Xn(i,-11.8,-36.9,11.8,-36.9,{height:1.1}),Xn(i,-11.8,3,-2.2,3,{height:.8}),Xn(i,2.2,3,11.8,3,{height:.8}),e.update=(j,ee)=>{ou(e,ee),e.glint&&(e.glint.material.opacity=.55+.45*Math.sin(ee*3.2)),R.scale.setScalar(1+.04*Math.sin(ee*2.4));for(let E of e.clouds)E.position.x+=j*.35},e}function og(i){let e={name:"highstreet",spawn:[0,12.4],bounds:{minX:-7,maxX:7,minZ:-16,maxZ:16},colliders:[],interactables:[],hemi:[16773849,5921390,1.2],sun:{color:16769712,intensity:1.8,pos:[6,15,8]},background:8042712,fog:[8042712,40,130],npcSpots:{baker:[2.2,-6]},exits:[{x:0,z:15.4,radius:1.6,target:"woods",spawn:[0,-14],flag:"gateOpen"},{x:0,z:-15.4,radius:1.6,target:"school",spawn:[0,1.2]},{x:5.9,z:-3,radius:1.5,target:"academy",spawn:[0,10.5]}]};i.userData.zone=e;let t=(u,h,d,f=1.6)=>e.interactables.push({id:u,x:h,z:d,radius:f});au(i,e,{top:"#3f86c9",horizon:"#cfe3ee",glow:"#ffe9c0",hills:"city"}),Wd(i,e,16773312,55,38,40,16);let n=gs();n.texture.wrapS=n.texture.wrapT=jt,n.texture.repeat.set(5,12);let s=new D(new tt(15,34),Qt(n,[5,12],1.5,[.7,1]));s.rotation.x=-Math.PI/2,s.position.set(0,-.01,0),s.receiveShadow=!0,i.add(s);for(let u of[-1,1])for(let h=0;h<6;h+=1){let d=new D(new Se(.6,.45,1.4),J(9067060));d.position.set(u*6.7,.22,-13+h*5.2),d.castShadow=!0,i.add(d);for(let f=0;f<3;f+=1){let g=new D(new gt(.12,8,7),J([12597547,15909198,12114175][(h+f)%3]));g.position.set(u*6.7,.55,-13.4+h*5.2+f*.45),i.add(g)}}let r=gs();r.texture.wrapS=r.texture.wrapT=jt,r.texture.repeat.set(4,12);let o=new D(new tt(9,36),Qt(r,[4,12],1.5,[.7,1]));o.rotation.x=-Math.PI/2,o.position.set(0,0,0),o.receiveShadow=!0,i.add(o);let a=(u,h,d,f)=>e.colliders.push({minX:u-d,maxX:u+d,minZ:h-f,maxZ:h+f}),l=[{x:-4.2,z:-8,w:4.5,color:11889226,sign:"BAKERY",signColor:"#ffd166"},{x:4.2,z:-8,w:4.5,color:5929630,sign:"BOOKSHOP",signColor:"#b8d8ff"},{x:-4.2,z:2,w:4.5,color:6982234,sign:"POST",signColor:"#c9e8c9"},{x:4.2,z:2,w:4.5,color:10377850,sign:"TEA ROOM",signColor:"#f2c9d8"}];for(let u of l){let h=new D(new Se(u.w,4.2,3.4),J(u.color));h.position.set(u.x,2.1,u.z),h.castShadow=!0,i.add(h),a(u.x,u.z,u.w/2,1.7);let d=new D(new Se(u.w*.9,.08,1.1),J(15920608));d.position.set(u.x,2.6,u.z+(u.z<0?2.2:-2.2)),d.rotation.x=u.z<0?.16:-.16,i.add(d);let f=rr(u.sign);f.position.set(u.x,3.1,u.z+(u.z<0?2.35:-2.35)),f.scale.set(2.4,.6,1),i.add(f)}for(let[u,h]of[[-3.4,8],[3.4,8],[-3.4,-2],[3.4,-2],[-3.4,-12],[3.4,-12]]){let d=new D(new mt(.06,.09,3.4,8),J(2763316));d.position.set(u,1.7,h),d.castShadow=!0,i.add(d);let f=new D(new gt(.16,10,8),rn(16767114));f.position.set(u,3.5,h),i.add(f);let g=new zn(16761706,4,6);g.position.set(u,3.4,h),i.add(g),a(u,h,.15,.15)}for(let[u,h,d]of[[-2.9,5,Math.PI/2],[2.9,-4,-Math.PI/2]]){let f=new D(new Se(.5,.42,1.6),J(7031338));f.position.set(u,.21,h),f.rotation.y=d,f.castShadow=!0,i.add(f),a(u,h,.3,.85)}let c=new D(new Se(2.4,.9,.7),J(9067060));if(c.position.set(-2.2,.45,-5.9),i.add(c),t("orderBun",-2.2,-5.2,1.6),e.npcSpots.baker){let[u,h]=e.npcSpots.baker,d=ba(9067060,"baker");ar(d,.5),d.position.set(u,0,h),d.rotation.y=Math.PI,i.add(d),e.baker=d}return t("baker",2.2,-6,1.7),t("bookshop",4.3,-5.6,1.4),t("postOffice",-4.1,-.4,1.4),t("teaRoom",4.1,-.4,1.4),t("clueBench",-2.9,4.3,1.2),wt(i,e,16774064,.8,-2.9,1,5,{opacity:.4,amp:.2,speed:2.4}),e.update=(u,h)=>{ou(e,h);for(let d of e.clouds)d.position.x+=u*.35},e}function ag(i){let e={name:"academy",spawn:[0,9.5],bounds:{minX:-6,maxX:6,minZ:-14,maxZ:12},colliders:[],interactables:[],hemi:[14280959,2763344,1.1],sun:{color:13228287,intensity:1.5,pos:[-6,14,6]},background:1053486,fog:[1053486,30,110],npcSpots:{raven:[0,-8]},exits:[{x:0,z:11.4,radius:1.6,target:"highstreet",spawn:[5.9,-3]}]};i.userData.zone=e;let t=(h,d,f,g=1.6)=>e.interactables.push({id:h,x:d,z:f,radius:g});au(i,e,{top:"#0b0e26",horizon:"#3a3a6e",glow:"#8a7ab8",stars:!0,hills:"city"}),Wd(i,e,15921407,-45,40,55,13),Xn(i,-5.9,11.8,5.9,11.8,{height:.8,color:2574894,spacing:1.4}),Xn(i,-5.9,-13.8,-5.9,11.8,{height:.8,color:2574894,spacing:1.4}),Xn(i,5.9,-13.8,5.9,11.8,{height:.8,color:2574894,spacing:1.4});let n=(h,d,f,g)=>e.colliders.push({minX:h-f,maxX:h+f,minZ:d-g,maxZ:d+g}),s=gs();s.texture.wrapS=s.texture.wrapT=jt,s.texture.repeat.set(4,6);let r=new D(new tt(13,28),Qt(s,[4,6],1.5,[.7,1]));r.rotation.x=-Math.PI/2,r.receiveShadow=!0,i.add(r);let o=new D(new Se(10,7,4),J(4020864));o.position.set(0,3.5,-12),o.castShadow=!0,i.add(o),n(0,-12,5,2);let a=new D(new mt(1.2,1.4,9,10),J(3097704));a.position.set(4,4.5,-10),a.castShadow=!0,i.add(a),n(4,-10,1.4,1.4);let l=new D(new tn(1.6,2,10),J(9056047));l.position.set(4,10,-10),i.add(l);let c=or(.9);c.position.set(0,4.6,-9.95),i.add(c);for(let[h,d]of[[-4.5,-4],[4.5,-4],[-4.5,1],[4.5,1]]){let f=new D(new mt(.35,.4,3.6,10),J(9413568));f.position.set(h,1.8,d),f.castShadow=!0,i.add(f),n(h,d,.45,.45)}let u=new D(new ki(1.6,1.9,40),rn(10406911,.7));if(u.rotation.x=-Math.PI/2,u.position.set(0,.04,-8),i.add(u),e.duelRing=u,t("duel",0,-8,2.2),wt(i,e,10406911,.9,0,.4,-8,{opacity:.25,amp:.12,speed:1.6}),e.npcSpots.raven){let[h,d]=e.npcSpots.raven,f=ba(9413568,"raven");ar(f,.5),f.position.set(h,0,d),f.rotation.y=Math.PI,i.add(f),e.raven=f}return t("raven",0,-7,1.7),t("clueScroll",4.2,-8.6,1.3),wt(i,e,16774064,.8,4.2,1,-8.6,{opacity:.4,amp:.2,speed:2.4}),e.update=(h,d)=>{ou(e,d);for(let f of e.clouds)f.position.x+=h*.2;e.duelRing&&(e.duelRing.material.opacity=.55+.3*Math.sin(d*2.4))},e}function lg(i){let e={name:"classroom",spawn:[0,6],bounds:{minX:-5.5,maxX:5.5,minZ:-8.5,maxZ:8.5},colliders:[],interactables:[],hemi:[16774880,4864554,1.2],sun:{color:16771264,intensity:1.4,pos:[4,10,6]},background:2761776,fog:[2761776,14,40],npcSpots:{willow:[-2.2,-6.6]},exits:[{x:0,z:7.9,radius:1.5,target:"school",spawn:[0,-24.5]}]};i.userData.zone=e;let t=(d,f,g,x=1.6)=>e.interactables.push({id:d,x:f,z:g,radius:x}),n=(d,f,g,x)=>e.colliders.push({minX:d-g,maxX:d+g,minZ:f-x,maxZ:f+x}),s=ng();s.texture.wrapS=s.texture.wrapT=jt,s.texture.repeat.set(4,4);let r=new D(new tt(12,18),Qt(s,[4,4],1.2,[.75,1]));r.rotation.x=-Math.PI/2,r.receiveShadow=!0,i.add(r);let o=J(13219990),a=new D(new Se(12,5,.4),o);a.position.set(0,2.5,-8.8),i.add(a),n(0,-8.8,6,.3);for(let d of[-1,1]){let f=new D(new Se(.4,5,18),o);f.position.set(d*5.8,2.5,0),i.add(f),n(d*5.8,0,.3,9)}for(let d of[-3,3]){let f=new D(new tt(1.6,2.2),rn(16773312));f.position.set(d,2.9,-8.58),i.add(f);let g=new D(new tn(1.4,5.5,4,1,!0),new Pt({color:16773312,transparent:!0,opacity:.08,depthWrite:!1}));g.position.set(d,1.2,-6),g.rotation.z=Math.PI,i.add(g)}let l=new D(new Se(5,2.2,.12),J(7031338));l.position.set(0,2.3,-8.55),i.add(l);let c=new D(new tt(4.6,1.8),J(3033658));c.position.set(0,2.3,-8.47),i.add(c);let u=new D(new tt(2.6,.08),rn(15920608));u.position.set(-.3,2.6,-8.45),i.add(u),t("blackboard",0,-7.2,2);let h=new D(new Se(2.2,.85,.9),J(7031338));h.position.set(-3.4,.425,-6.8),h.castShadow=!0,i.add(h),n(-3.4,-6.8,1.1,.5);for(let d of[2,0,-2])for(let f of[-1.7,1.7]){let g=new D(new Se(1.1,.72,.75),J(9067060));g.position.set(f,.36,d),g.castShadow=!0,i.add(g),n(f,d,.6,.42)}if(e.npcSpots.willow){let[d,f]=e.npcSpots.willow,g=ba(4876890,"willow");ar(g,.5),g.position.set(d,0,f),g.rotation.y=.4,i.add(g),e.willow=g}return t("willow",-2.2,-5.6,1.7),t("clueChalk",3,-7.5,1.2),wt(i,e,16774064,.8,3,2.2,-8.4,{opacity:.4,amp:.2,speed:2.4}),e.update=()=>{},e}function cg(i){let e={name:"woods",spawn:[0,32],bounds:{minX:-15,maxX:15,minZ:-21,maxZ:34},colliders:[],interactables:[],exits:[{x:0,z:-20.4,radius:1,target:"highstreet",spawn:[0,14.6]}],hemi:[13625544,2375711,1],sun:{color:16767370,intensity:1.75,pos:[-7,16,-4]},background:8894368,fog:[8894368,34,130],npcSpots:{}};i.userData.zone=e;let t=(F,ie,q,fe=1.6)=>e.interactables.push({id:F,x:ie,z:q,radius:fe});au(i,e,{top:"#5b9fd0",horizon:"#cfe6d8",glow:"#ffe9c0",hills:"none"}),fM(i,e,{url:"assets/oxleas-backdrop.jpg"});let n=ig();n.texture.wrapS=n.texture.wrapT=jt,n.texture.repeat.set(14,16);let s=new D(new tt(90,100),Qt(n,[14,16],1.4,[.75,1]));s.rotation.x=-Math.PI/2,s.position.set(0,0,6),s.receiveShadow=!0,i.add(s);let r=Fd();r.texture.wrapS=r.texture.wrapT=jt,r.texture.repeat.set(1,9);let o=Qt(r,[1,9],1,[.75,1]);o.transparent=!0;let a=new D(new tt(5.6,56),o);a.rotation.x=-Math.PI/2,a.position.set(0,.005,6),a.receiveShadow=!0,i.add(a);let l=su(),c=sg();for(let F=0;F<90;F+=1){let q=(Math.random()>.5?1:-1)*(2.6+Math.random()*5.5),fe=34-Math.random()*54,j=va(l,.42+Math.random()*.3);j.position.set(q,.18,fe),j.rotation.y=Math.random()*Math.PI,i.add(j)}for(let[F,ie]of[[2,-7.4],[2.6,-7],[1.7,-6.8]]){let q=new D(new mt(.05,.07,.14,8),J(15920608));q.position.set(F,.07,ie),i.add(q);let fe=new D(new gt(.11,10,8,0,Math.PI*2,0,Math.PI/2),J(12597547));fe.position.set(F,.13,ie),i.add(fe)}t("orderMint",2.1,-6.4,1.5);let u=ai("trees.glb"),h=(F,ie,q=1,fe=!0)=>{let j=new Mt;if(u){let ee=u.scene.clone(!0);ee.traverse(E=>{E.isMesh&&(E.castShadow=!0,E.receiveShadow=!0)}),ee.scale.setScalar(q*1.5),ee.rotation.y=Math.random()*Math.PI*2,j.add(ee)}else{let ee=new D(new mt(.2*q,.36*q,2.4*q,8),J(6112038));ee.position.y=1.2*q,ee.castShadow=!0,j.add(ee);let E=[3042100,3833150,4886856];for(let[y,U,Y]of[[2.5,1.2,E[0]],[3.3,.95,E[1]],[3.95,.62,E[2]]]){let te=new D(new gt(U*q,10,9),J(Y));te.position.set((Math.random()-.5)*.5*q,y*q,(Math.random()-.5)*.5*q),te.castShadow=!0,j.add(te)}}return j.position.set(F,0,ie),i.add(j),fe&&bn(i,F,ie,.8*q,.8*q),j};for(let[F,ie,q]of[[-4.4,30,1.2],[4.6,27,1.1],[-4.7,22,1.3],[4.5,17,1.2],[-4.3,12,1.1],[4.8,8,1.25],[-4.6,2,1.2],[5,-3.5,1.1],[-4.5,-9,1.2],[4.5,-14.5,1.15],[-4.4,-18,1.1],[4.7,-18.5,1.15],[-10,30,1.8],[9.5,26,2],[-9.5,18,1.9],[10,8,2.2],[-10.5,4,2],[8.5,-9,1.8],[-12.5,30,2.1],[12.5,24,2],[-13,14,2.2],[13,6,2],[-13,-2,2.1],[12.5,-10,2.2],[-8,24,1.6],[7.5,20,1.5],[-6,-13,1.5],[6.5,-17,1.5]])h(F,ie,q,Math.abs(F)<6);let d=new D(new tt(44,2.6),rn(5214152,.9));d.rotation.x=-Math.PI/2,d.position.set(0,.03,0),i.add(d);for(let[F,ie]of[[0,1.28],[0,-1.28]]){let q=new D(new tt(44,.1),rn(14676223,.5));q.rotation.x=-Math.PI/2,q.position.set(F,.045,ie),i.add(q)}let f=[];for(let F=0;F<10;F+=1){let ie=new D(new tt(.24,.05),rn(12575743,.85));ie.rotation.x=-Math.PI/2,ie.position.set(-7+F*1.5,.06,(F%3-1)*.6),i.add(ie),f.push(ie)}let g={minX:-5.4,maxX:5.4,minZ:-1.3,maxZ:1.3};e.colliders.push(g),e.streamCollider=g;let x=[8,2,6,4];e.stones=[],x.forEach((F,ie)=>{let q=-2.4+ie*1.6,fe=new D(new mt(.62,.7,.3,10),J(10130314));fe.position.set(q,.15,0),fe.castShadow=!0,fe.receiveShadow=!0,i.add(fe);let j=new D(new ni(.5,10),J(5082949));j.rotation.x=-Math.PI/2,j.position.set(q,.301,0),i.add(j);let ee=rr(String(F));ee.position.set(q,1.05,0),i.add(ee),e.stones.push({number:F,x:q,mesh:fe,label:ee}),t(`stone${F}`,q,0,1.9)});let m=ai("bush.glb");if(m)for(let[F,ie,q]of[[2.6,29.5,1],[-2.7,25,.8],[2.8,20.5,1.1],[-2.6,16,.9],[2.7,11.5,1],[-2.8,6.5,.8],[2.6,.5,1],[-2.7,-4,.9],[2.5,-9,1.1],[3,-13.5,.7],[-3,-16,1],[-2.6,22.5,.9],[2.7,15,.8],[3,32,.9],[-3,-18.5,.8]]){let fe=m.scene.clone(!0);fe.traverse(j=>{j.isMesh&&(j.castShadow=!0,j.receiveShadow=!0)}),fe.position.set(F,0,ie),fe.rotation.y=Math.random()*Math.PI*2,fe.scale.setScalar(q*.9),i.add(fe)}let p=ai("chest.glb");if(p){let F=p.scene.clone(!0);F.traverse(ie=>{ie.isMesh&&(ie.castShadow=!0,ie.receiveShadow=!0)}),F.position.set(4.1,0,-9.4),F.rotation.y=-.9,F.scale.setScalar(1.35),i.add(F),wt(i,e,16765286,.7,4.1,.45,-9.4,{opacity:.35,amp:.15,speed:2}),t("chest",4.1,-9.4,1.6)}let b=Qt(gs(),[1,1],1.6,[.7,1]),M=new D(new Se(.9,1.5,.4),b);M.position.set(3.1,.75,-8.2),M.castShadow=!0,i.add(M),bn(i,3.1,-8.2,.9,.4);let v=or(.34);v.position.set(3.1,1,-7.97),i.add(v);for(let F=0;F<7;F+=1){let ie=va(c,.3);ie.position.set(3.1+(Math.random()-.5)*.8,.35+Math.random()*1.1,-8+(Math.random()-.5)*.15),i.add(ie)}wt(i,e,16765286,.9,3.1,1,-7.9,{opacity:.3,amp:.12}),t("marker",2.4,-8,1.6),h(4.1,-5.4,1.6,!1);let T=new D(new tt(.3,.4),rn(16774064));T.position.set(3.55,1.4,-5.1),T.rotation.y=-.5,i.add(T),e.glint=T,wt(i,e,16774064,.8,3.55,1.4,-5,{opacity:.45,amp:.22,speed:3}),t("clueOak",3.3,-5.4,1.5);let A=Qt(gs(),[1,2],1.6,[.7,1]);for(let F of[-1.7,1.7]){let ie=new D(new Se(.7,3.2,.7),A);ie.position.set(F,1.6,-19),ie.castShadow=!0,i.add(ie),bn(i,F,-19,.7,.7);for(let q=0;q<5;q+=1){let fe=va(c,.38);fe.position.set(F+(Math.random()-.5)*.55,.5+Math.random()*2.2,-18.62),i.add(fe)}}let R=new D(new Se(4.1,.6,.8),A);R.position.set(0,3.4,-19),R.castShadow=!0,i.add(R);let I=It(i,1.55,2.3,.16,5126942,-.79,1.15,-19),w=It(i,1.55,2.3,.16,5126942,.79,1.15,-19);for(let F of[-.55,.55]){let ie=or(.3);ie.position.set(F,1.5,-18.9),i.add(ie)}let _=new zn(16106818,7,7);_.position.set(0,1.8,-18),i.add(_),wt(i,e,16765286,3.2,0,1.7,-18.7,{opacity:.35,amp:.12}),e.gateDoors=[I,w];let P={minX:-1.7,maxX:1.7,minZ:-19.5,maxZ:-18.5};e.colliders.push(P),e.gateCollider=P,t("gate",0,-17.5,1.8);for(let[F,ie,q]of[[-2.5,12,.22],[2.2,5,-.18],[-1.8,-6,.15]])Bd(i,F,4.6,ie,{radius:.85,height:9,tilt:q,opacity:.055});wt.texture||wt(i,e,0,.01,0,-50,0,{opacity:0});let O=60,z=new Float32Array(O*3);for(let F=0;F<O;F+=1)z[F*3]=(Math.random()-.5)*9,z[F*3+1]=.4+Math.random()*4.5,z[F*3+2]=34-Math.random()*54;let G=new Nt;G.setAttribute("position",new kt(z,3));let Q=new Bi({color:16771248,size:.09,transparent:!0,opacity:.5,map:wt.texture,depthWrite:!1,blending:wi}),Z=new hs(G,Q);i.add(Z);let re=40,X=new Float32Array(re*3);for(let F=0;F<re;F+=1)X[F*3]=(Math.random()-.5)*11,X[F*3+1]=.6+Math.random()*2.6,X[F*3+2]=34-Math.random()*54;let he=new Nt;he.setAttribute("position",new kt(X,3));let ge=new Bi({color:16769162,size:.3,transparent:!0,opacity:.9,map:wt.texture,depthWrite:!1,blending:wi}),Re=new hs(he,ge);i.add(Re);let qe=(F,ie,q,fe,j=0)=>{let ee=Qt(Fd(),[2,2],1,[.75,1]);ee.transparent=!0;let E=new D(new tt(q,fe),ee);E.rotation.x=-Math.PI/2,E.rotation.z=j,E.position.set(F,.004,ie),E.receiveShadow=!0,i.add(E)};qe(4.5,15,3,12,.35),qe(-4.5,27,3,8,-.3),qe(-5.5,3,3,10,-.5);let ct=new D(new Se(4.2,2.6,3.2),J(9067060));ct.position.set(10.5,1.3,18.5),ct.castShadow=!0,i.add(ct),bn(i,10.5,18.5,2.1,1.6);let ut=new D(new tn(3.4,1.6,4),J(4876858));ut.position.set(10.5,3.4,18.5),ut.rotation.y=Math.PI/4,ut.castShadow=!0,i.add(ut);let $e=new D(new Se(4.4,.1,1.6),J(12597547));$e.position.set(10.5,2.4,16.4),$e.rotation.x=.2,i.add($e);let $=rr("OXLEAS WOOD CAF\xC9");$.position.set(10.5,2.9,16.2),$.scale.set(2.6,.62,1),i.add($);let se=new zn(16761706,4.5,7);se.position.set(10.5,2.2,16.8),i.add(se),wt(i,e,16761706,2.2,10.5,2.2,16.6,{opacity:.3,amp:.08,speed:1.2});for(let[F,ie]of[[8.2,15.4],[11.4,14.6],[9.2,13.2]]){let q=new D(new mt(.42,.42,.08,12),J(15920608));q.position.set(F,.5,ie),q.castShadow=!0,i.add(q);let fe=new D(new mt(.05,.05,.5,8),J(7031338));fe.position.set(F,.25,ie),i.add(fe);let j=new D(new tn(.9,.4,8),J(15909198));j.position.set(F,1.5,ie),j.castShadow=!0,i.add(j),bn(i,F,ie,.5,.5)}t("woodCafe",8.6,16.4,2.2);let xe=new Mt,Be=new D(new mt(2.4,2.8,4.2,12),Qt(gs(),[3,2],1.5,[.7,1]));Be.position.y=2.1,Be.castShadow=!0,xe.add(Be);let Ce=new D(new mt(2.2,2.4,1.4,12),Qt(gs(),[3,1],1.5,[.7,1]));Ce.position.y=4.9,xe.add(Ce);for(let F=0;F<10;F+=1){let ie=F/10*Math.PI*2,q=new D(new Se(.5,.6,.5),J(10130314));q.position.set(Math.cos(ie)*2.1,5.9,Math.sin(ie)*2.1),q.castShadow=!0,xe.add(q)}let et=new D(new Se(1.6,1.8,.3),J(3813158));et.position.set(0,1.2,2.35),xe.add(et);for(let F=0;F<4;F+=1){let ie=new D(new Se(1.6,.35,.5),J(10130314));ie.position.set(0,.2+F*.35,3.4-F*.5),xe.add(ie)}xe.position.set(-10.5,0,2),i.add(xe),bn(i,-10.5,2,2.6,2.6);let Ut=rr("SEVERNDROOG CASTLE");Ut.position.set(-10.5,6.6,2),Ut.scale.set(2.8,.6,1),i.add(Ut),wt(i,e,12575743,2,-10.5,3,2,{opacity:.18,amp:.06,speed:1}),t("severndroog",-10.2,4.6,2.4);let C=new D(new ni(3.4,28),rn(5214152,.85));C.rotation.x=-Math.PI/2,C.scale.set(1.25,1,.8),C.position.set(-6.5,.03,27.5),i.add(C);for(let F=0;F<18;F+=1){let ie=F/18*Math.PI*2,q=new D(new mt(.02,.03,.5+Math.random()*.4,6),J(4880954));q.position.set(-6.5+Math.cos(ie)*4.3,.3,27.5+Math.sin(ie)*2.8),i.add(q)}for(let[F,ie]of[[-7.2,27],[-5.9,28.2]]){let q=new D(new gt(.16,10,8),J(15920608));q.scale.set(1.3,.8,1),q.position.set(F,.1,ie),q.castShadow=!0,i.add(q);let fe=new D(new gt(.09,8,7),J(15920608));fe.position.set(F+.16,.2,ie),i.add(fe);let j=new D(new tn(.04,.1,6),J(15903035));j.rotation.z=-Math.PI/2,j.position.set(F+.26,.2,ie),i.add(j)}let ft=new D(new Se(.5,.42,1.7),J(7031338));ft.position.set(-10.2,.21,27.5),ft.castShadow=!0,i.add(ft),bn(i,-10.2,27.5,.3,.9),e.pondCollider={minX:-10.9,maxX:-2.1,minZ:24.7,maxZ:30.3},e.colliders.push(e.pondCollider),t("pond",-8.6,26.2,2.2),Jm(i,3.6,12);let He=rr("GREEN CHAIN WALK");He.position.set(3.6,1.85,11.7),He.scale.set(1.7,.4,1),i.add(He),t("greenChain",3.2,11,2);for(let[F,ie,q]of[[-3.6,20,.6],[3.6,-6,2.4],[-3.6,-12,.2],[3.6,28,1.1]])Jm(i,F,ie,q);let Ue=new D(new tt(6,8),J(9067060));Ue.rotation.x=-Math.PI/2,Ue.position.set(10,.014,-3),Ue.receiveShadow=!0,i.add(Ue);for(let F=0;F<4;F+=1){let ie=new D(new mt(.04,.04,1.2,8),J(3095108));ie.rotation.z=Math.PI/2,ie.position.set(10,.6+F*.35,-5.5),ie.castShadow=!0,i.add(ie);for(let q of[-.55,.55]){let fe=new D(new Se(.08,.6+F*.35,.08),J(3095108));fe.position.set(10+q,(.6+F*.35)/2,-5.5),i.add(fe)}}for(let F of[8.6,11.4])for(let ie=0;ie<3;ie+=1){let q=new D(new Se(.08,.08,2.2),J(3095108));q.position.set(F,.5+ie*.3,-1.5),q.castShadow=!0,i.add(q)}t("outdoorGym",10,-3,2.2);for(let F=0;F<12;F+=1)h(-14+F%6*5.6,-20.5-F%2*.8,1.6+F%3*.3,!1);for(let F=0;F<12;F+=1)h(-14+F%6*5.6,33.5+F%2*.8,1.6+F%3*.3,!1);for(let F=0;F<8;F+=1)h(-14.6,-18+F*6.5,1.5+F%3*.3,!1);for(let F=0;F<8;F+=1)h(14.6,-18+F*6.5,1.5+F%2*.3,!1);return Xn(i,-14.8,33.8,14.8,33.8,{height:1.2}),Xn(i,-14.8,-20.8,14.8,-20.8,{height:1.2}),Xn(i,-14.8,-20.5,-14.8,33.5,{height:1.2}),Xn(i,14.8,-20.5,14.8,33.5,{height:1.2}),e.update=(F,ie)=>{ou(e,ie),e.glint&&(e.glint.material.opacity=.55+.45*Math.sin(ie*3));for(let q of e.clouds)q.position.x+=F*.35;Re.rotation.y=ie*.04,ge.opacity=.6+.3*Math.sin(ie*2.1),Z.rotation.y=-ie*.015;for(let q=0;q<f.length;q+=1)f[q].position.y=.06+.03*Math.sin(ie*2+q)},e}var Ma={finch:{name:{pt:"Sr. Finch",en:"Mr Finch",es:"Sr. Finch"},emoji:"\u{1F9F9}",color:8016432},page:{name:{pt:"Sra. Page",en:"Ms Page",es:"Sra. Page"},emoji:"\u{1F4DA}",color:9063022},baker:{name:{pt:"Sr. Crumb",en:"Mr Crumb",es:"Sr. Crumb"},emoji:"\u{1F950}",color:11889226},raven:{name:{pt:"Prof. Raven",en:"Prof. Raven",es:"Prof. Raven"},emoji:"\u{1F5E1}\uFE0F",color:5929630},willow:{name:{pt:"Prof. Willow",en:"Prof. Willow",es:"Prof. Willow"},emoji:"\u{1F33F}",color:4876890}},ug=[{image:"assets/panel-gate.jpg",text:{pt:"Segundo dia de aula. Ivy e Oakley cruzam os port\xF5es da escola \u2014 e desta vez as corujas v\xEAm junto!",en:"Second day of school. Ivy and Oakley walk through the school gates \u2014 and this time the owls come too!",es:"Segundo d\xEDa de clase. \xA1Ivy y Oakley cruzan las puertas de la escuela y esta vez los b\xFAhos vienen tambi\xE9n!"}},{image:"assets/panel-sign.jpg",text:{pt:"De repente, Pip e Marlow se empoleiram e piaram: na placa de vidro, uma \xE1rvore dourada est\xE1 brilhando.",en:"Suddenly, Pip and Marlow perch and hoot: on the glass sign, a golden tree is glowing.",es:"De repente, Pip y Marlow se posan y graznan: en el letrero de vidrio, un \xE1rbol dorado brilla."}},{image:"assets/panel-street.jpg",text:{pt:"Depois da aula, na rua de Welling, a mesma \xE1rvore dourada aparece na vitrine de uma loja antiga\u2026",en:"After school, on the Welling high street, the same golden tree appears in an old shop window\u2026",es:"Despu\xE9s de clase, en la calle de Welling, el mismo \xE1rbol dorado aparece en el escaparate de una tienda antigua\u2026"}},{image:"assets/panel-pillar.jpg",text:{pt:"Marlow pousa no pilar do port\xE3o e puxa um pergaminho enrolado. \xC9 o come\xE7o de um mapa!",en:"Marlow lands on the gate pillar and tugs a rolled parchment. It is the start of a map!",es:"Marlow se posa en el pilar del port\xF3n y tira de un pergamino enrollado. \xA1Es el comienzo de un mapa!"}},{image:"assets/panel-woods.jpg",text:{pt:"As corujas voam na frente, at\xE9 a mata de Oxleas. Entre as \xE1rvores, um caminho escondido espera\u2026",en:"The owls fly ahead, all the way to Oxleas Wood. Among the trees, a hidden path waits\u2026",es:"Los b\xFAhos vuelan adelante, hasta el bosque de Oxleas. Entre los \xE1rboles, un sendero escondido espera\u2026"}}],lu={finch:[{who:"finch",text:{pt:"Bom dia! Sou o Sr. Finch, o zelador. Esta escola \xE9 muito peculiar, sabem?",en:"Morning! I'm Mr Finch, the caretaker. This school is quite peculiar, you know?",es:"\xA1Buenos d\xEDas! Soy el Sr. Finch, el conserje. Esta escuela es muy peculiar, \xBFsaben?"}},{gloss:"peculiar"},{choice:{challengeId:"vocabFinch",prompt:{pt:'"Peculiar" quer dizer\u2026',en:'"Peculiar" means\u2026',es:'"Peculiar" significa\u2026'},options:[{id:"loud",label:{pt:"barulhenta",en:"loud",es:"ruidosa"}},{id:"strange",label:{pt:"diferente, esquisita",en:"strange, unusual",es:"extra\xF1a, rara"},correct:!0},{id:"tall",label:{pt:"muito alta",en:"very tall",es:"muy alta"}}],success:{pt:"Isso! T\xE3o peculiar que, varrendo o sal\xE3o, achei isto enrolado num cantinho: uma parte de um mapa antigo!",en:"Right! So peculiar that, sweeping the hall, I found this tucked in a corner: a piece of an old map!",es:"\xA1Eso! Tan peculiar que, barriendo el sal\xF3n, encontr\xE9 esto en un rinc\xF3n: \xA1una parte de un mapa antiguo!"},fail:{pt:"Quase! Peculiar \xE9 coisa esquisita, diferente. Pense de novo\u2026",en:"Almost! Peculiar means strange, unusual. Think again\u2026",es:"\xA1Casi! Peculiar es algo extra\xF1o, raro. Piensen otra vez\u2026"}}},{gloss:"map"},{who:"finch",text:{pt:"A vassoura acordou uma fita brilhante no cabo. Vou tocar cada palavra da escola que encontrei nela.",en:"The broom woke a shiny strip on its handle. I will touch each school word I found there.",es:"La escoba despert\xF3 una cinta secreta en el mango. Voy a tocar cada palabra de la escuela que encontr\xE9 all\xED."}},{gloss:"teacher"},{gloss:"student"},{gloss:"class"},{gloss:"book"},{gloss:"pencil"},{gloss:"bag"},{gloss:"read"},{gloss:"write"},{gloss:"question"},{gloss:"child"},{gloss:"room"},{gloss:"gate"},{gloss:"curious"},{gloss:"roots"},{gloss:"tree"},{gloss:"leaf"},{gloss:"rock"},{gloss:"star"}],finchAfter:[{who:"finch",text:{pt:"J\xE1 acharam muitas coisas por aqui? Os livros guardam segredos \u2014 \xE9 s\xF3 procurar bem!",en:"Found lots of things around here yet? Books keep secrets \u2014 just look carefully!",es:"\xBFYa encontraron muchas cosas por aqu\xED? \xA1Los libros guardan secretos, solo miren bien!"}},{gloss:"broom"},{who:"finch",text:{pt:"No arm\xE1rio de achados e perdidos havia um retrato de fam\xEDlia, uma chave de casa, um crach\xE1 de quarto, bonecos do corpo e roupas para guardar. Vamos aprender os nomes juntos!",en:"In the lost-and-found cupboard were a family photo, a house key, a room tag, body puppets and clothes to put away. Let us learn their names together!",es:"En el armario de objetos perdidos hab\xEDa una foto de familia, una llave de casa, una etiqueta de cuarto, mu\xF1ecos del cuerpo y ropa para guardar. \xA1Aprendamos sus nombres juntos!"}},{gloss:"mother"},{gloss:"father"},{gloss:"sister"},{gloss:"brother"},{gloss:"house"},{gloss:"bed"},{gloss:"head"},{gloss:"hair"},{gloss:"eye"},{gloss:"ear"},{gloss:"nose"},{gloss:"mouth"},{gloss:"hand"},{gloss:"foot"},{gloss:"shoulder"},{gloss:"knee"},{gloss:"arm"},{gloss:"face"},{gloss:"hat"},{gloss:"trousers"}],page:[{who:"page",text:{pt:"Bem-vindos \xE0 biblioteca! A Sra. Page, \xE0 disposi\xE7\xE3o. Ontem algu\xE9m devolveu um livro velho\u2026 com isto dentro.",en:"Welcome to the library! Ms Page, at your service. Yesterday someone returned an old book\u2026 with this inside.",es:"Bienvenidos a la biblioteca. La Sra. Page, a su servicio. Ayer alguien devolvi\xF3 un libro viejo\u2026 con esto adentro."}},{who:"page",text:{pt:'Havia uma carta junto. Escutem com aten\xE7\xE3o: "Sa\xED antes do \xFAltimo sinal porque ouvi asas sobre o p\xE1tio\u2026"',en:'There was a letter with it. Listen carefully: "I left before the final bell because I heard wings above the courtyard\u2026"',es:'Hab\xEDa una carta junto. Escuchen con atenci\xF3n: "Sal\xED antes de la \xFAltima campana porque o\xED alas sobre el patio\u2026"'}},{choice:{challengeId:"compPage",prompt:{pt:"Onde a pessoa ouviu asas?",en:"Where did the person hear wings?",es:"\xBFD\xF3nde oy\xF3 alas la persona?"},options:[{id:"courtyard",label:{pt:"no p\xE1tio",en:"in the courtyard",es:"en el patio"},correct:!0},{id:"library",label:{pt:"na biblioteca",en:"in the library",es:"en la biblioteca"}},{id:"busstop",label:{pt:"no ponto de \xF4nibus",en:"at the bus stop",es:"en la parada del autob\xFAs"}}],success:{pt:"Exato \u2014 a carta responde sozinha quando lemos com calma. Fique com esta parte do mapa. Volto ao p\xE1tio\u2026 digo, ao trabalho!",en:"Exactly \u2014 the letter answers itself when we read calmly. Take this map piece. Back to the courtyard\u2026 I mean, to work!",es:"Exacto: la carta responde sola cuando leemos con calma. Quedense con esta parte del mapa. \xA1Al patio\u2026 digo, al trabajo!"},fail:{pt:'Releiam a frase da carta: "ouvi asas sobre\u2026" Qual era o lugar?',en:`Read the letter's sentence again: "I heard wings above\u2026" Which place was it?`,es:'Relean la frase de la carta: "o\xED alas sobre\u2026" \xBFCu\xE1l era el lugar?'}}},{gloss:"library"},{who:"page",text:{pt:"O livro velho abriu p\xE1ginas que viraram paisagem. A biblioteca brotou palavras do tamanho das \xE1rvores enquanto os p\xE1ssaros acordavam!",en:"The old book opened pages that became landscapes. Words grew as big as trees while the birds woke!",es:"El libro viejo abri\xF3 p\xE1ginas que se convirtieron en paisajes. \xA1Las palabras crecieron como \xE1rboles mientras despertaban los p\xE1jaros!"}},{gloss:"story"},{gloss:"letter"},{gloss:"tea"},{gloss:"ancient"},{gloss:"woods"},{gloss:"warm"},{gloss:"kind"},{gloss:"secret"},{gloss:"practice"},{gloss:"golden"},{gloss:"grateful"},{gloss:"meadow"},{gloss:"hill"},{gloss:"castle"},{gloss:"pond"},{gloss:"greenhouse"},{gloss:"swing"},{gloss:"pitch"},{gloss:"path"},{gloss:"climb"}],pageAfter:[{who:"page",text:{pt:"Esta biblioteca \xE9 antiga. Dizem que tem passagem concealed\u2026 quer dizer, escondida. Quem procura, acha!",en:"This library is old. They say it has a concealed passage\u2026 that is, a hidden one. Seek and you shall find!",es:"Esta biblioteca es antigua. Dicen que tiene un pasaje concealed\u2026 o sea, escondido. \xA1Quien busca, encuentra!"}},{gloss:"concealed"},{who:"page",text:{pt:"E uma coisa eu aprendo com as corujas todos os dias: elas trust em quem escuta com calma. Trust \u2014 confie!",en:"And one thing the owls teach me every day: they trust those who listen patiently. Trust!",es:"Y algo que las b\xFAhos me ense\xF1an cada d\xEDa: ellos conf\xEDan en quien escucha con calma. \xA1Trust, conf\xEDa!"}},{gloss:"trust"},{who:"page",text:{pt:"Na \xFAltima p\xE1gina, um mapa de uma cidade ganhou vida: um museu, um parque, um piquenique com ma\xE7\xE3 e p\xE3o e um cofre brilhando. A etiqueta mandava buscar no carrinho de livros!",en:"On the last page, a town map came alive: a museum, a park, a picnic with an apple and bread, and a shining treasure chest. Its label said to look in the book trolley!",es:"En la \xFAltima p\xE1gina, un mapa de una ciudad cobran vida: \xA1un museo, un parque, un p\xEDcnic con manzana y pan y un cofre brillante! Su etiqueta dec\xEDa que mir\xE1ramos en el carrito de libros."}},{gloss:"fetch"},{gloss:"treasure"},{gloss:"sparkle"},{gloss:"magic"},{gloss:"spell"},{gloss:"bookmark"},{gloss:"paper"},{gloss:"ink"},{gloss:"quiet"},{gloss:"borrow"},{gloss:"return"},{gloss:"answer"},{gloss:"chapter"},{gloss:"title"},{gloss:"apple"},{gloss:"bread"},{gloss:"museum"},{gloss:"park"}],assemble:[{choice:{challengeId:"fractionMap",prompt:{pt:"As 4 partes juntas fazem 1 mapa inteiro. Uma parte sozinha \xE9 que fra\xE7\xE3o do mapa?",en:"The 4 pieces together make 1 whole map. One piece alone is what fraction of the map?",es:"Las 4 partes juntas hacen 1 mapa entero. Una parte sola es qu\xE9 fracci\xF3n del mapa?"},options:[{id:"half",label:{pt:"1/2 (metade)",en:"1/2 (a half)",es:"1/2 (la mitad)"}},{id:"third",label:{pt:"1/3 (um ter\xE7o)",en:"1/3 (a third)",es:"1/3 (un tercio)"}},{id:"quarter",label:{pt:"1/4 (um quarto)",en:"1/4 (a quarter)",es:"1/4 (un cuarto)"},correct:!0}],success:{pt:"Um quarto de 4 partes! As bordas se encaixam\u2026 e o mapa inteiro brilha: uma trilha at\xE9 a mata de Oxleas!",en:"A quarter, of four pieces! The edges fit\u2026 and the whole map glows: a trail into Oxleas Wood!",es:"\xA1Un cuarto, de 4 partes! \xA1Los bordes encajan\u2026 y el mapa entero brilla: un sendero hacia el bosque de Oxleas!"},fail:{pt:"Conte as partes: se 4 fazem o inteiro, cada uma vale\u2026?",en:"Count the pieces: if 4 make the whole, each one is worth\u2026?",es:"Cuenta las partes: si 4 hacen el entero, \xBFcada una vale\u2026?"}}}],gate:[{who:"owl",text:{pt:"A \xE1rvore do mapa combina com a \xE1rvore do port\xE3o. Toque no port\xE3o para abrir!",en:"The tree on the map matches the tree on the gate. Tap the gate to open it!",es:"El \xE1rbol del mapa coincide con el \xE1rbol de la puerta. \xA1Toca la puerta para abrirla!"}}]},$t={bookshop:{pt:'A vitrine da bookshop empilha hist\xF3rias em ingl\xEAs \u2014 a de cima se chama "The Golden Tree". Algu\xE9m deixou um marcador brilhando\u2026',en:'The bookshop window stacks English stories \u2014 the top one is called "The Golden Tree". Someone left a shiny bookmark\u2026',es:'El escaparate de la librer\xEDa apila cuentos en ingl\xE9s \u2014 el de arriba se llama "The Golden Tree". Alguien dej\xF3 un marcap\xE1ginas brillando\u2026'},postOffice:{pt:'Caixa de correio verde: uma carta sem endere\xE7o, s\xF3 o desenho de uma \xE1rvore dourada. O carimbo diz "Candy Castle".',en:'A green post box: a letter with no address, just a drawing of a golden tree. The stamp says "Candy Castle".',es:'Un buz\xF3n verde: una carta sin direcci\xF3n, solo el dibujo de un \xE1rbol dorado. El sello dice "Candy Castle".'},teaRoom:{pt:`O cheiro de ch\xE1 e bolo sai da porta aberta. No quadro: "Today's special \u2014 cinnamon tea with honey".`,en:`The smell of tea and cake drifts through the open door. On the board: "Today's special \u2014 cinnamon tea with honey".`,es:`El olor a t\xE9 y pastel entra por la puerta abierta. En el cartel: "Today's special \u2014 cinnamon tea with honey".`},board:{pt:'Mural: "Clube de Xadrez quinta-feira" \xB7 "Fotos da excurs\xE3o \xE0 padaria" \xB7 e um rabisco antigo de\u2026 uma \xE1rvore dourada?',en:'Notice board: "Chess Club Thursday" \xB7 "Bakery trip photos" \xB7 and an old doodle of\u2026 a golden tree?',es:'Mural: "Club de Ajedrez el jueves" \xB7 "Fotos del paseo a la panader\xEDa" \xB7 \xBFy un garabato antiguo de\u2026 un \xE1rbol dorado?'},signTree:{pt:"A \xE1rvore dourada no vidro pulsa devagar, como se respirasse. As corujas adoram ela.",en:"The golden tree on the glass pulses slowly, as if breathing. The owls love it.",es:"El \xE1rbol dorado del vidrio late despacio, como si respirara. A los b\xFAhos le encanta."},marker:{pt:'Pedra antiga com a \xE1rvore entalhada. Do outro lado, letras pequenas: "Quem l\xEA o mapa, v\xEA o caminho."',en:'Old stone with the tree carved in. On the back, small letters: "Who reads the map sees the way."',es:'Piedra antigua con el \xE1rbol tallado. Del otro lado, letras peque\xF1as: "Quien lee el mapa ve el camino."'},clueTable:{pt:"Na mesa da biblioteca, uma p\xE1gina rasgada guarda a ponta de um mapa. Ao lado, uma ma\xE7\xE3 e um p\xE3o formam o lanche das corujas estudiosas!",en:"On the library table, a torn page holds the tip of a map. Beside it, an apple and some bread make a snack for the study-minded owls!",es:"En la mesa de la biblioteca, una p\xE1gina rasgada guarda el borde de un mapa. \xA1Al lado, una manzana y pan forman la merienda de los b\xFAhos estudiosos!"},clueOak:{pt:"No carvalho, a p\xE1gina est\xE1 presa entre ra\xEDzes fortes. A casca \xE9 rugosa e fria, e uma folha dourada ainda brilha ali!",en:"On the oak, the page is caught between strong roots. The bark feels rough and cool, and one golden leaf still glows there!",es:"En el roble, la p\xE1gina est\xE1 atrapada entre ra\xEDces fuertes. \xA1La corteza es rugosa y fr\xEDa, y una hoja dorada todav\xEDa brilla all\xED!"},playground:{pt:'O parquinho tem balan\xE7o, escorregador e um caixote de areia. As marcas na areia parecem letras: "O.L.A.D.A"\u2026 e um guarda-chuva roxo encostado na cerca!',en:'The playground has swings, a slide and a sandpit. The marks in the sand spell "O.L.A.D.A"\u2026 and a purple umbrella leans on the fence!',es:'El parque tiene columpios, un tobog\xE1n y un arenero. Las marcas en la arena dicen "O.L.A.D.A"\u2026 \xA1y un paraguas morado apoyado en la valla!'},garden:{pt:"A horta da escola: couveiros, uma estufa de vidro e um espantalho que parece cumprimentar todo mundo. Cheira a terra molhada!",en:"The school garden: vegetable beds, a glass greenhouse and a scarecrow that seems to say hello. It smells of wet earth!",es:"El huerto de la escuela: bancales, un invernadero de cristal y un espantajo que parece saludar. \xA1Huele a tierra mojada!"},sports:{pt:'A quadra tem linhas brancas, dois gols e um placar: "WELLING FC \u2014 Home Games".',en:'The court has white lines, two goals and a scoreboard: "WELLING FC \u2014 Home Games".',es:'La cancha tiene l\xEDneas blancas, dos porter\xEDas y un marcador: "WELLING FC \u2014 Home Games".'},field:{pt:"O campo dos fundos \xE9 enorme \u2014 d\xE1 pra jogar de tudo. As linhas do gol est\xE3o gastas de tantinhas partidas.",en:"The back pitch is huge \u2014 you could play anything here. The goal lines are worn from all the games.",es:"El campo de atr\xE1s es enorme \u2014 aqu\xED se puede jugar de todo. Las l\xEDneas de la porter\xEDa est\xE1n gastas de tantos partidos."},cafe:{pt:'OXLEAS WOOD CAF\xC9 \u2014 o caf\xE9 de verdade fica no prado, no topo da colina! H\xE1 mesas com guarda-s\xF3is e um quadro: "Today: cake + forest views".',en:'OXLEAS WOOD CAF\xC9 \u2014 the real caf\xE9 sits in the meadow on top of the hill! There are tables with parasols and a board: "Today: cake + forest views".',es:'OXLEAS WOOD CAF\xC9 \u2014 \xA1el caf\xE9 de verdad est\xE1 en el prado, en lo alto de la colina! Hay mesas con sombrillas y un cartel: "Today: cake + forest views".'},severndroog:{pt:"Uma antiga casa de campo de pedra, feita para parecer um castelo, espera no meio de Oxleas Wood. A vista l\xE1 de cima vale a subida!",en:"An old stone country house built to look like a castle waits in the middle of Oxleas Wood. The view from the top is worth the climb!",es:"Una antigua casa de campo de piedra, construida para parecer un castillo, espera en medio de Oxleas Wood. \xA1La vista desde arriba vale la subida!"},pond:{pt:"Um lago de patos e juncos. Cuidado: em Oxleas NUNCA teve rio \u2014 o rio Cray passa longe daqui. O que corre depois da chuva \xE9 o leito do riacho, e seca.",en:"A pond with ducks and reeds. Careful: Oxleas NEVER had a river \u2014 the Cray flows far from here. What runs after rain is the seasonal stream bed, and it dries up.",es:"Un estanque con patos y juncos. Ojo: \xA1Oxleas NUNCA tuvo un r\xEDo! El Cray pasa muy lejos. Lo que corre tras la lluvia es el lecho del arroyo estacional, y se seca."},greenChain:{pt:'Placa verde: "GREEN CHAIN WALK \u2192" e uma seta para o "CAPITAL RING". Caminhos de verdade, como os de Welling!',en:'Green sign: "GREEN CHAIN WALK \u2192" and an arrow for the "CAPITAL RING". Real paths, like Welling\u2019s!',es:'Cartel verde: "GREEN CHAIN WALK \u2192" y una flecha al "CAPITAL RING". \xA1Senderos de verdad, como los de Welling!'},outdoorGym:{pt:'Uma academia ao ar livre no meio das \xE1rvores: barras, paralelas e o famous wall bar. S\xF3 falta a placa "WATCH YOUR STEP!".',en:'An outdoor gym among the trees: bars, parallel bars and the famous wall bar. Only the "WATCH YOUR STEP!" sign is missing.',es:'Un gimnasio al aire libre entre los \xE1rboles: barras, paralelas y el famoso wall bar. Solo falta el cartel "\xA1MIRA EL PASO!".'},orderDone:{pt:"O ch\xE1 das cinco est\xE1 pronto, queridas. A coruja comeu o \xFAltimo biscoito, mas guardou as migalhas pra voc\xEAs.",en:"Five-o\u2019clock tea is ready, dears. The owl ate the last biscuit, but saved you the crumbs.",es:"El t\xE9 de las cinco est\xE1 listo, queridos. El b\xFAho se comi\xF3 la \xFAltima galleta, pero guard\xF3 las migas para ustedes."}},Xd={benchPoster:{pt:'Cartaz rasgado preso no banco da rua: "\u2026e o Castelo de A\xE7\xFAcar trocava estrelas por perguntas bem respondidas."',en:'A torn poster pinned to the street bench: "\u2026and the Candy Castle traded stars for well-answered questions."',es:'Un cartel rasgado en el banco de la calle: "\u2026y el Castillo de Az\xFAcar cambiaba estrellas por preguntas bien respondidas."'},chalkNote:{pt:'Bilhete embaixo da janela da sala: "\u2026a Prof. Willow guardava um giz que escrevia sozinho \u2014 sumiu na noite dourada."',en:'A note under the classroom window: "\u2026Prof. Willow kept a chalk that wrote by itself \u2014 it vanished on golden night."',es:'Una nota bajo la ventana del sal\xF3n: "\u2026la Prof. Willow guardaba un giz que escrib\xEDa solo \u2014 desapareci\xF3 en la noche dorada."'},duelScroll:{pt:'Pergaminho ca\xEDdo no p\xE1tio da academia: "\u2026o duelo s\xF3 come\xE7a quando as duas corujas cantam juntas."',en:'A scroll dropped in the academy yard: "\u2026the duel only begins when both owls sing together."',es:'Un pergamino en el patio de la academia: "\u2026el duelo solo empieza cuando los dos b\xFAhos cantan juntos."'},libraryTable:{pt:'P\xE1gina rasgada de um livro de hist\xF3rias: "\u2026e o Castelo de A\xE7\xFAcar dava frutas a quem provava legumes primeiro."',en:'A torn page from a storybook: "\u2026and the Candy Castle gave fruit to anyone who tasted vegetables first."',es:'P\xE1gina rasgada de un cuento: "\u2026y el Castillo de Az\xFAcar daba frutas a quien probaba verduras primero."'},oak:{pt:'P\xE1gina presa no carvalho: "O port\xE3o s\xF3 abre para quem entende o mundo \u2014 nunca para quem tem pressa."',en:'A page stuck on the oak: "The gate only opens for those who understand the world \u2014 never for those in a hurry."',es:'P\xE1gina pegada al roble: "La puerta solo se abre para quien entiende el mundo, nunca para quien tiene prisa."'},timetable:{pt:'Tabela de jogos pregada na cerca da quadra: "Tuesday \u2014 PE: year 4 v year 5. Wednesday \u2014 Library club. Friday \u2014 Choir." Olha, o coro \xE9 na sexta!',en:'A games timetable nailed to the court fence: "Tuesday \u2014 PE: year 4 v year 5. Wednesday \u2014 Library club. Friday \u2014 Choir." Look \u2014 choir is on Friday!',es:'Un horario de deportes clavado en la valla: "Martes \u2014 Ed. f\xEDsica: 4\xBA vs 5\xBA. Mi\xE9rcoles \u2014 Club de lectura. Viernes \u2014 Coro." \xA1Mira, el coro es el viernes!'}},hg=[{who:"page",text:{pt:"Que bom ver voc\xEAs, queridas! Ai, que vergonha: perdi meu guarda-chuva roxo no playground da escola. Ontem caiu uma chuva fina e eu\u2026 enfim, vi um brilho rosa na areia perto do balan\xE7o.",en:"Lovely to see you, dears! How embarrassing: I lost my purple umbrella at the school playground. It drizzled yesterday and I\u2026 anyway, I saw a pink glint in the sand near the swings.",es:"\xA1Qu\xE9 gusto verlos, queridos! Qu\xE9 verg\xFCenza: perd\xED mi paraguas morado en el parque de la escuela. Ayer lloviznaba y yo\u2026 en fin, vi un brillo rosa en la arena cerca del columpio."}},{gloss:"umbrella"},{who:"owl",text:{pt:"O brilho rosa vinha de um barbante m\xE1gico preso ao guarda-chuva: ele sabia dizer o clima de Welling!",en:"The pink glint came from magic string tied to the umbrella: it knew Welling\u2019s weather!",es:"El brillo rosa ven\xEDa de un hilo m\xE1gico atado al paraguas: \xA1conoc\xEDa el clima de Welling!"}},{gloss:"rain"},{gloss:"wet"},{gloss:"wind"}],dg=[{who:"owl",text:{pt:"Achei! Um guarda-chuva roxo, dobrado, todo emaranhado na terra. Deve ter ca\xEDdo do muro do p\xE1tio ontem. Vamos levar pra Sra. Page!",en:"Found it! A purple umbrella, folded and all tangled in the dirt. It must have blown off the yard wall yesterday. Let\u2019s take it back to Ms Page!",es:"\xA1Encontrado! Un paraguas morado, plegado y enredado en la tierra. Seguro que se vol\xF3 del muro del patio ayer. \xA1Volvemos con la Sra. Page!"}},{gloss:"umbrella"},{who:"owl",text:{pt:"Agora o barbante mostra o c\xE9u azul e tr\xEAs exemplos de cor. A Sra. Page vai adorar!",en:"Now the string shows the blue sky and three colours. Ms Page will love it!",es:"\xA1Ahora el hilo muestra el cielo azul y tres colores! \xA1A la Sra. Page le va a encantar!"}},{gloss:"sunny"},{gloss:"cloudy"},{gloss:"weather"}],fg=[{who:"page",text:{pt:'Meu guarda-chuva! Voc\xEAs s\xE3o um verdadeiro tesouro! Agora meu ch\xE1 das cinco est\xE1 garantido, chove ou fa\xE7a sol. As palavras "umbrella" e "grateful" entraram no di\xE1rio de voc\xEAs!',en:'My umbrella! You are a real treasure! Now my five-o\u2019clock tea is weather-proof. The words "umbrella" and "grateful" went into your journal!',es:'\xA1Mi paraguas! \xA1Son un verdadero tesoro! Ahora mi t\xE9 de las cinco est\xE1 a salvo. \xA1Las palabras "umbrella" y "grateful" entraron en tu diario!'}},{gloss:"umbrella"},{who:"owl",text:{pt:"A Sra. Page amarrou tr\xEAs cores ao barbante: o azul do c\xE9u, o vermelho das ma\xE7\xE3s e o amarelo do sol. O guarda-chuva agora \xE9 um pequeno quadro do mundo!",en:"Ms Page tied three colours to the string: the blue of the sky, the red of apples and the yellow of the sun. Now the umbrella is a little picture of the world!",es:"\xA1La Sra. Page at\xF3 tres colores al hilo: el azul del cielo, el rojo de las manzanas y el amarillo del sol. \xA1Ahora el paraguas es un peque\xF1o cuadro del mundo!"}},{gloss:"blue"},{gloss:"red"},{gloss:"yellow"}],pg={finch:{pt:"do zelador",en:"from the caretaker",es:"del conserje"},page:{pt:"da bibliotec\xE1ria",en:"from the librarian",es:"de la bibliotecaria"},shelf:{pt:"da estante",en:"from the shelf",es:"del estante"},trolley:{pt:"do carrinho de livros",en:"from the book trolley",es:"del carrito de libros"}},Ki={story:{pt:"story = hist\xF3ria, conto",en:"story = words that tell events",es:"story = cuento"},letter:{pt:"letter = carta",en:"letter = a written message sent to someone",es:"letter = mensaje escrito enviado a alguien"},tea:{pt:"tea = ch\xE1",en:"tea = a warm drink",es:"tea = t\xE9"},peculiar:{pt:"peculiar = esquisito, diferente das outras",en:"peculiar = strange, unusual",es:"peculiar = extra\xF1o, poco com\xFAn"},concealed:{pt:"concealed = escondido",en:"concealed = hidden",es:"concealed = escondido"},broom:{pt:"broom = vassoura",en:"broom = a brush for sweeping the floor",es:"broom = escoba"},ancient:{pt:"ancient = muito antigo",en:"ancient = very, very old",es:"ancient = muy antiguo"},woods:{pt:"woods = mata, bosque",en:"woods = forest",es:"woods = bosque"},trust:{pt:"trust = confiar",en:"trust = believe someone will be kind and honest",es:"trust = creer que alguien ser\xE1 amable y honesto"},warm:{pt:"warm = morno, quentinho",en:"warm = pleasantly hot, not painfully hot",es:"warm = templado, calentito"},kind:{pt:"kind = gentil e bondoso",en:"kind = nice and caring",es:"kind = amable y bondadoso"},fetch:{pt:"fetch = buscar e trazer",en:"fetch = go get and bring back",es:"fetch = buscar y traer"},treasure:{pt:"treasure = tesouro",en:"treasure = special things worth finding",es:"treasure = cosas especiales que vale la pena encontrar"},sparkle:{pt:"sparkle = brilhar, cintilar",en:"sparkle = shine with little lights",es:"sparkle = destellar"},secret:{pt:"secret = segredo",en:"secret = something kept hidden",es:"secret = algo que se mantiene escondido"},spell:{pt:"spell = feiti\xE7o",en:"spell = magic words",es:"spell = hechizo"},practice:{pt:"practice = praticar",en:"practice = do it many times to learn",es:"practice = practicar"},golden:{pt:"golden = dourado, da cor do ouro",en:"golden = gold colored",es:"golden = dorado"},curious:{pt:"curious = curioso",en:"curious = wanting to know or learn more",es:"curious = que quiere saber o aprender m\xE1s"},roots:{pt:"roots = ra\xEDzes",en:"roots = the part of a plant under the ground",es:"roots = ra\xEDces"},map:{pt:"map = mapa",en:"map = a drawing that shows the way",es:"map = mapa"},library:{pt:"library = biblioteca",en:"library = a place full of books",es:"library = biblioteca"},gate:{pt:"gate = port\xE3o",en:"gate = a door in a fence",es:"gate = port\xF3n"},umbrella:{pt:"umbrella = guarda-chuva",en:"umbrella = a thing that keeps the rain off you",es:"umbrella = paraguas"},grateful:{pt:"grateful = agradecido",en:"grateful = thankful for what someone did",es:"grateful = agradecido"},meadow:{pt:"meadow = prado, campo aberto",en:"meadow = an open field of grass",es:"meadow = pradera"},hill:{pt:"hill = colina, morro",en:"hill = ground that rises above the land around it",es:"hill = terreno que sube sobre el suelo alrededor"},castle:{pt:"castle = castelo",en:"castle = an old home with towers",es:"castle = castillo"},pond:{pt:"pond = lago pequeno",en:"pond = a small lake with still water",es:"pond = lago peque\xF1o de agua quieta"},greenhouse:{pt:"greenhouse = estufa de vidro",en:"greenhouse = a glass house for plants",es:"greenhouse = invernadero"},swing:{pt:"swing = balan\xE7o",en:"swing = a seat that goes back and forth",es:"swing = columpio"},pitch:{pt:"pitch = campo de futebol, gramado",en:"pitch = a field where a team plays",es:"pitch = cancha de f\xFAtbol"},path:{pt:"path = caminho, trilha",en:"path = a way to walk",es:"path = sendero"},climb:{pt:"climb = subir, escalar",en:"climb = to go up",es:"climb = subir"},mother:{pt:"mother = m\xE3e",en:"mother = your parent who is a woman",es:"mother = tu progenitora"},father:{pt:"father = pai",en:"father = your parent who is a man",es:"father = tu progenitor"},sister:{pt:"sister = irm\xE3",en:"sister = a girl in your family",es:"sister = una ni\xF1a de tu familia"},brother:{pt:"brother = irm\xE3o",en:"brother = a boy in your family",es:"brother = un ni\xF1o de tu familia"},house:{pt:"house = casa",en:"house = a home for people",es:"house = casa"},room:{pt:"room = quarto",en:"room = a space inside a building",es:"room = espacio dentro de un edificio"},bed:{pt:"bed = cama",en:"bed = where a person sleeps",es:"bed = cama"},child:{pt:"child = crian\xE7a",en:"child = a boy or girl who is not grown up",es:"child = una persona joven que todav\xEDa no es adulta"},teacher:{pt:"teacher = quem ensina",en:"teacher = a person who helps others learn",es:"teacher = la persona que ayuda a otros a aprender"},student:{pt:"student = estudante",en:"student = a person who learns at school",es:"student = quien aprende en la escuela"},class:{pt:"class = turma",en:"class = a group of pupils who learn together",es:"class = grupo de alumnos que aprenden juntos"},book:{pt:"book = livro",en:"book = pages joined inside a cover",es:"book = p\xE1ginas unidas dentro de una portada"},pencil:{pt:"pencil = l\xE1pis",en:"pencil = a tool for writing or drawing",es:"pencil = herramienta para escribir o dibujar"},bag:{pt:"bag = sacola ou mochila",en:"bag = a container used to carry things",es:"bag = recipiente para llevar cosas"},read:{pt:"read = ler",en:"read = look at words and learn what they mean",es:"read = mirar las palabras y entenderlas"},write:{pt:"write = escrever",en:"write = make words or letters on a page",es:"write = hacer palabras o letras en una p\xE1gina"},question:{pt:"question = pergunta",en:"question = words that ask for an answer",es:"question = palabras que piden una respuesta"},apple:{pt:"apple = ma\xE7\xE3",en:"apple = a round fruit that can be red or green",es:"apple = manzana"},bread:{pt:"bread = p\xE3o",en:"bread = a baked food made from flour",es:"bread = pan"},cheese:{pt:"cheese = queijo",en:"cheese = a yellow food made from milk",es:"cheese = queso"},milk:{pt:"milk = leite",en:"milk = a white drink from a cow",es:"milk = leche"},egg:{pt:"egg = ovo",en:"egg = an oval that a bird lays",es:"egg = huevo"},rice:{pt:"rice = arroz",en:"rice = small white grains that people eat",es:"rice = arroz"},head:{pt:"head = cabe\xE7a",en:"head = the top of the body",es:"head = cabeza"},hair:{pt:"hair = cabelo",en:"hair = the threads on top of the head",es:"hair = cabello"},eye:{pt:"eye = olho",en:"eye = the organ that lets us see",es:"eye = ojo"},ear:{pt:"ear = orelha",en:"ear = the organ that lets us hear",es:"ear = oreja"},nose:{pt:"nose = nariz",en:"nose = the part of the face used to smell",es:"nose = nariz"},mouth:{pt:"mouth = boca",en:"mouth = the opening used for eating and talking",es:"mouth = abertura para comer y hablar"},hand:{pt:"hand = m\xE3o",en:"hand = the end of the arm that holds things",es:"hand = extremo del brazo que sostiene cosas"},foot:{pt:"foot = p\xE9",en:"foot = the end of the leg that touches the ground",es:"foot = extremo de la pierna que toca el suelo"},shoulder:{pt:"shoulder = ombro",en:"shoulder = the upper part of the arm",es:"shoulder = hombro"},knee:{pt:"knee = joelho",en:"knee = the bend in the middle of a leg",es:"knee = la curva en medio de la pierna"},arm:{pt:"arm = bra\xE7o",en:"arm = the part between the shoulder and hand",es:"arm = la parte entre el hombro y la mano"},face:{pt:"face = rosto",en:"face = the front of the head, with the eyes and mouth",es:"face = parte frontal de la cabeza, con ojos y boca"},hat:{pt:"hat = chap\xE9u",en:"hat = something worn on the head",es:"hat = sombrero"},shirt:{pt:"shirt = camisa",en:"shirt = a light top worn on the upper body",es:"shirt = prenda ligera para la parte de arriba del cuerpo"},trousers:{pt:"trousers = cal\xE7a",en:"trousers = clothes worn separately on each leg",es:"trousers = pantal\xF3n"},dress:{pt:"dress = vestido",en:"dress = one piece of clothing with a skirt",es:"dress = prenda de una pieza con falda"},shoes:{pt:"shoes = sapatos",en:"shoes = a pair worn on the feet",es:"shoes = par para los pies"},socks:{pt:"socks = meias",en:"socks = soft clothes worn inside shoes",es:"socks = prendas suaves que se llevan dentro de los zapatos"},coat:{pt:"coat = casaco",en:"coat = a warm piece of clothing",es:"coat = abrigo"},red:{pt:"red = vermelho",en:"red = the color of blood or a tomato",es:"red = rojo"},blue:{pt:"blue = azul",en:"blue = the color of a clear sky",es:"blue = azul"},green:{pt:"green = verde",en:"green = the color of leaves",es:"green = verde"},yellow:{pt:"yellow = amarelo",en:"yellow = the color of the sun",es:"yellow = amarillo"},black:{pt:"black = preto",en:"black = the color of very dark night",es:"black = negro"},white:{pt:"white = branco",en:"white = the color of fresh snow",es:"white = blanco"},one:{pt:"one = um",en:"one = the number 1",es:"one = uno"},two:{pt:"two = dois",en:"two = the number 2",es:"two = dos"},bookmark:{pt:"bookmark = marcador de p\xE1gina",en:"bookmark = a strip that marks the page where you stopped",es:"bookmark = cinta que marca la p\xE1gina donde paraste"},paper:{pt:"paper = papel",en:"paper = a thin sheet used for writing or drawing",es:"paper = hoja fina para escribir o dibujar"},chapter:{pt:"chapter = cap\xEDtulo",en:"chapter = one main part of a book",es:"chapter = una de las partes principales de un libro"},title:{pt:"title = t\xEDtulo",en:"title = the name at the top of a book",es:"title = nombre que aparece arriba de un libro"},quiet:{pt:"quiet = silencioso ou calmo",en:"quiet = making very little sound",es:"quiet = que hace muy poco ruido"},answer:{pt:"answer = resposta",en:"answer = what you say after a question",es:"answer = lo que dices despu\xE9s de una pregunta"},ink:{pt:"ink = tinta",en:"ink = coloured liquid used in a pen",es:"ink = l\xEDquido de color que se usa en un bol\xEDgrafo"},borrow:{pt:"borrow = pegar emprestado",en:"borrow = take something and give it back later",es:"borrow = tomar algo y devolverlo despu\xE9s"},flower:{pt:"flower = flor",en:"flower = the colorful part of many plants",es:"flower = flor"},tree:{pt:"tree = \xE1rvore",en:"tree = a tall plant with a trunk",es:"tree = \xE1rbol"},leaf:{pt:"leaf = folha",en:"leaf = a green part of a plant",es:"leaf = hoja"},grass:{pt:"grass = grama",en:"grass = short green plants on the ground",es:"grass = pasto"},stream:{pt:"stream = riacho",en:"stream = a small water channel that can dry up",es:"stream = cauce peque\xF1o de agua que puede secarse"},rock:{pt:"rock = pedra",en:"rock = hard material from the ground",es:"rock = roca"},star:{pt:"star = estrela",en:"star = a bright point seen in the night sky",es:"star = estrella"},rain:{pt:"rain = chuva",en:"rain = water that falls from clouds",es:"rain = lluvia"},wet:{pt:"wet = molhado",en:"wet = covered or filled with water",es:"wet = cubierto o lleno de agua"},wind:{pt:"wind = vento",en:"wind = moving air",es:"wind = viento"},sunny:{pt:"sunny = ensolarado",en:"sunny = bright with sunshine",es:"sunny = soleado"},cloudy:{pt:"cloudy = nublado",en:"cloudy = covered with clouds",es:"cloudy = nublado"},weather:{pt:"weather = tempo",en:"weather = the sun, rain, wind, and clouds",es:"weather = clima"},bus:{pt:"bus = \xF4nibus",en:"bus = a big vehicle for many people",es:"bus = autob\xFAs"},car:{pt:"car = carro",en:"car = a vehicle with four wheels",es:"car = carro"},bike:{pt:"bike = bicicleta",en:"bike = a vehicle with two wheels that people pedal",es:"bike = bicicleta"},train:{pt:"train = trem",en:"train = vehicles joined together on rails",es:"train = tren"},boat:{pt:"boat = barco",en:"boat = a vehicle that travels on water",es:"boat = barco"},plane:{pt:"plane = avi\xE3o",en:"plane = a vehicle that flies",es:"plane = avi\xF3n"},truck:{pt:"truck = caminh\xE3o",en:"truck = a large vehicle for carrying heavy things",es:"truck = cami\xF3n"},taxi:{pt:"taxi = t\xE1xi",en:"taxi = a car that takes people somewhere for money",es:"taxi = taxi"},shop:{pt:"shop = loja",en:"shop = a place where people buy things",es:"shop = tienda"},market:{pt:"market = mercado",en:"market = a place with many small shops or stalls",es:"market = mercado"},bakery:{pt:"bakery = padaria",en:"bakery = a place that makes and sells bread",es:"bakery = panader\xEDa"},restaurant:{pt:"restaurant = restaurante",en:"restaurant = a place where people eat a meal",es:"restaurant = restaurante"},hospital:{pt:"hospital = hospital",en:"hospital = a place where sick people get help",es:"hospital = hospital"},museum:{pt:"museum = museu",en:"museum = a place where people see interesting things",es:"museum = museo"},park:{pt:"park = parque",en:"park = an outdoor place with grass and trees",es:"park = parque"},happy:{pt:"happy = feliz",en:"happy = feeling glad and smiling",es:"happy = sentirse alegre y sonre\xEDr"},sad:{pt:"sad = triste",en:"sad = feeling unhappy and wanting to cry",es:"sad = sentirse infeliz y querer llorar"},angry:{pt:"angry = com raiva",en:"angry = feeling very upset and cross",es:"angry = sentirse muy molesto y enfadado"},tired:{pt:"tired = cansado",en:"tired = needing sleep or a rest",es:"tired = necesitar dormir o descansar"},scared:{pt:"scared = com medo",en:"scared = afraid that something may hurt you",es:"scared = temer que algo pueda hacerte da\xF1o"},hungry:{pt:"hungry = com fome",en:"hungry = your body needs food",es:"hungry = necesitar comida"},excited:{pt:"excited = animado",en:"excited = so happy you cannot wait!",es:"excited = \xA1tan feliz que no puedes esperar!"},brave:{pt:"brave = corajoso",en:"brave = facing something scary and not running away",es:"brave = afrontar algo que da miedo y no salir corriendo"},run:{pt:"run = correr",en:"run = move fast on foot",es:"run = correr"},return:{pt:"return = devolver ou voltar",en:"return = bring or go back",es:"return = llevar o volver"},walk:{pt:"walk = andar a p\xE9",en:"walk = move by putting one foot in front of the other",es:"walk = moverse poniendo un pie delante del otro"},jump:{pt:"jump = pular",en:"jump = push off the ground and go up",es:"jump = saltar"},stop:{pt:"stop = parar",en:"stop = do not move any more",es:"stop = dejar de moverse"},go:{pt:"go = ir",en:"go = move towards another place",es:"go = moverse hacia otro lugar"},come:{pt:"come = vir",en:"come = move towards where you are",es:"come = moverse hacia donde est\xE1s"},move:{pt:"move = se mexer",en:"move = change place or position",es:"move = cambiar de lugar o posici\xF3n"},big:{pt:"big = grande",en:"big = taller or wider than something else",es:"big = m\xE1s alto o ancho que otra cosa"},small:{pt:"small = pequeno",en:"small = shorter or narrower than something else",es:"small = m\xE1s bajo o estrecho que otra cosa"},tall:{pt:"tall = alto",en:"tall = higher than usual from the ground",es:"tall = m\xE1s alto de lo normal desde el suelo"},long:{pt:"long = comprido",en:"long = more than a short distance from end to end",es:"long = m\xE1s que una distancia corta de un extremo a otro"},fast:{pt:"fast = r\xE1pido",en:"fast = moving quickly",es:"fast = r\xE1pido"},slow:{pt:"slow = lento",en:"slow = moving slowly",es:"slow = lento"},clean:{pt:"clean = limpo",en:"clean = free of dirt",es:"clean = limpio"},new:{pt:"new = novo",en:"new = made recently",es:"new = nuevo"},dragon:{pt:"dragon = drag\xE3o",en:"dragon = a large magical creature that flies",es:"dragon = drag\xF3n"},wizard:{pt:"wizard = feiticeiro",en:"wizard = a person who uses magic",es:"wizard = mago"},crown:{pt:"crown = coroa",en:"crown = a special headpiece for a king or queen",es:"crown = corona"},wand:{pt:"wand = varinha",en:"wand = a small stick used to do magic",es:"wand = varita"},hero:{pt:"hero = her\xF3i",en:"hero = a brave person who helps others",es:"hero = h\xE9roe"},magic:{pt:"magic = magia",en:"magic = a special power that seems impossible",es:"magic = poder especial que parece imposible"}};var _M=["a[href]","area[href]","button:not([disabled])",'input:not([disabled]):not([type="hidden"])',"select:not([disabled])","textarea:not([disabled])","iframe","object","embed","[contenteditable]",'[tabindex]:not([tabindex="-1"])'].join(",");function bM(i,e){return e.document||i.ownerDocument||globalThis.document}function MM(i,e){return typeof e.getFocusableElements=="function"?Array.from(e.getFocusableElements(i)||[]):typeof i.querySelectorAll!="function"?[]:Array.from(i.querySelectorAll(_M))}function wM(i){return i?.disabled===!0||typeof i.getAttribute=="function"&&i.getAttribute("disabled")!==null||i?.getAttribute?.("aria-disabled")==="true"}function SM(i){return!i||i.hidden===!0||i.offsetParent===null||i.getAttribute?.("aria-hidden")==="true"}function EM(i){return!!i&&i.isConnected!==!1}function ao(i){return EM(i)&&!wM(i)&&!SM(i)&&typeof i.focus=="function"}function mg(i,e){return MM(i,e).filter(t=>ao(t))}function gg(i,e,t){return i&&typeof i.addEventListener=="function"?(i.addEventListener(e,t),!0):!1}function xg(i,e,t){i&&typeof i.removeEventListener=="function"&&i.removeEventListener(e,t)}function yg(i,e={}){if(!i||typeof i.addEventListener!="function")throw new TypeError("trapFocus requires an element with addEventListener");let t=bM(i,e),n=t&&typeof t.addEventListener=="function"?t:i,s=Object.prototype.hasOwnProperty.call(e,"activeElement")?e.activeElement:t?.activeElement,r=e.fallbackFocusTarget,o=typeof i.getAttribute=="function",a=o&&i.getAttribute("tabindex")!==null,l=a?i.getAttribute("tabindex"):null,c=!1,u=1,h=()=>{let x=mg(i,e);return x.length?x:ao(i)?[i]:[]},d=x=>ao(x)?(x.focus(),!0):!1,f=x=>{if(c||x.key!=="Tab")return;u=x.shiftKey?-1:1;let m=h();if(!m.length)return;let p=t?.activeElement,b=typeof i.contains=="function"&&i.contains(p),M=m[0],v=m[m.length-1],T=m.includes(p);if(!b||!T){x.preventDefault?.(),d(x.shiftKey?v:M);return}x.shiftKey&&p===M?(x.preventDefault?.(),d(v)):!x.shiftKey&&p===v&&(x.preventDefault?.(),d(M))},g=x=>{if(c)return;let m=x?.target;if(typeof i.contains=="function"&&i.contains(m))return;let p=h();p.length&&d(u<0?p[p.length-1]:p[0])};return gg(n,"keydown",f),gg(n,"focusin",g),mg(i,e).length===0&&(!a&&typeof i.setAttribute=="function"&&i.setAttribute("tabindex","-1"),d(i)),()=>{if(c)return;c=!0,xg(n,"keydown",f),xg(n,"focusin",g),o&&typeof i.setAttribute=="function"&&(a?i.setAttribute("tabindex",l):i.removeAttribute?.("tabindex")),(ao(s)?s:ao(r)?r:ao(i)?i:null)?.focus?.()}}var wa=(()=>{let i=[],e=t=>t?(t.release?.(),t.element):null;return{push(t,n={}){if(t==null||i.some(r=>r.element===t))return null;let s=typeof n=="function"?{release:n}:n||{};return i.push({element:t,release:typeof s.release=="function"?s.release:null,opener:s.opener??null}),t},close(t){let n=i.findIndex(r=>r.element===t);if(n<0)return null;let[s]=i.splice(n,1);return e(s)},closeTop(){return e(i.pop())},top(){return i.length?i[i.length-1].element:null},size(){return i.length},isEmpty(){return i.length===0},isOpen(){return i.length>0}}})();function vg(){let i=globalThis.window;if(!i||typeof i.matchMedia!="function")return!1;try{return!!i.matchMedia("(prefers-reduced-motion: reduce)")?.matches}catch{return!1}}function xt(i,e,t){let n=document.createElement(i);return e&&(n.className=e),t!==void 0&&(n.textContent=t),n}function Yt(i,e,{duration:t=2600}={}){let n=xt("div","rpg-toast",e);i.appendChild(n),requestAnimationFrame(()=>n.classList.add("show")),setTimeout(()=>{n.classList.remove("show"),setTimeout(()=>n.remove(),400)},t)}function li(i,e=70,t=1600){let n=["#ffd166","#ff5e7e","#4ecdc4","#7a4ecf","#58cc72","#fff"],s=xt("div","rpg-confetti");for(let r=0;r<e;r+=1){let o=xt("span");o.style.left=`${Math.random()*100}%`,o.style.background=n[r%n.length],o.style.animationDelay=`${Math.random()*.35}s`,o.style.animationDuration=`${.9+Math.random()*.9}s`;let a=7+Math.random()*7;o.style.width=`${a}px`,o.style.height=`${a*.6}px`,s.appendChild(o)}i.appendChild(s),setTimeout(()=>s.remove(),t+800)}function qd(i,{toBlack:e=!0,duration:t=450}={}){let n=xt("div","rpg-fade");return i.appendChild(n),requestAnimationFrame(()=>n.classList.add(e?"on":"off")),{cover:()=>new Promise(s=>setTimeout(s,t)),remove:()=>n.remove()}}function _g(i,e,{next:t,skip:n,done:s,onDone:r}){let o=xt("div","rpg-story"),a=xt("img","rpg-story-art"),l=xt("p","rpg-story-text"),c=xt("div","rpg-story-buttons"),u=xt("button","rpg-button ghost",n);u.type="button";let h=xt("button","rpg-button primary",t);h.type="button",c.append(u,h),o.append(a,l,c),i.appendChild(o);let d=0,f=!1;function g(){f||(f=!0,o.remove(),r?.())}function x(){a.src=e[d].image,a.alt="",l.textContent=e[d].text,h.textContent=d===e.length-1?s:t}return h.addEventListener("click",()=>{d>=e.length-1?g():(d+=1,x())}),u.addEventListener("click",g),x(),o}var Sa=Math.SQRT2,cu=class{constructor(){this.items=[]}push(e){this.items.push(e);let t=this.items.length-1;for(;t>0;){let n=t-1>>1;if(this.items[n].f<=e.f)break;this.items[t]=this.items[n],t=n}this.items[t]=e}pop(){let e=this.items[0],t=this.items.pop();if(this.items.length){let n=0;for(;;){let s=n*2+1;if(s>=this.items.length)break;let r=s+1,o=r<this.items.length&&this.items[r].f<this.items[s].f?r:s;if(this.items[o].f>=t.f)break;this.items[n]=this.items[o],n=o}this.items[n]=t}return e}get size(){return this.items.length}};function bg(i,e,t,n){let s=Math.max(t.minX,Math.min(i,t.maxX)),r=Math.max(t.minZ,Math.min(e,t.maxZ)),o=i-s,a=e-r;return o*o+a*a<n*n}function du(i,{cell:e=.45,radius:t=.35}={}){let n=i.bounds,s=Math.max(1,Math.ceil((n.maxX-n.minX)/e)),r=Math.max(1,Math.ceil((n.maxZ-n.minZ)/e)),o=new Uint8Array(s*r),a=i.colliders||[];for(let l=0;l<r;l+=1)for(let c=0;c<s;c+=1){let u=n.minX+(c+.5)*e,h=n.minZ+(l+.5)*e,d=u<n.minX+t||u>n.maxX-t||h<n.minZ+t||h>n.maxZ-t;if(!d){for(let f of a)if(bg(u,h,f,t)){d=!0;break}}d&&(o[l*s+c]=1)}return{minX:n.minX,minZ:n.minZ,maxX:n.maxX,maxZ:n.maxZ,cell:e,cols:s,rows:r,radius:t,blocked:o,colliders:a}}function uu(i,e,t){let n=Math.max(0,Math.min(i.cols-1,Math.floor((e-i.minX)/i.cell))),s=Math.max(0,Math.min(i.rows-1,Math.floor((t-i.minZ)/i.cell)));return{col:n,row:s,index:s*i.cols+n}}function Ea(i,e,t){return{x:i.minX+(e+.5)*i.cell,z:i.minZ+(t+.5)*i.cell}}function lr(i,e,t){let n=i.radius;if(e<i.minX+n||e>i.maxX-n||t<i.minZ+n||t>i.maxZ-n)return!1;for(let s of i.colliders)if(bg(e,t,s,n))return!1;return!0}function hu(i,e,t=4){if(!i.blocked[e.index])return e.index;for(let n=1;n<=t;n+=1)for(let s=-n;s<=n;s+=1)for(let r=-n;r<=n;r+=1){if(Math.max(Math.abs(r),Math.abs(s))!==n)continue;let o=e.col+r,a=e.row+s;if(o<0||a<0||o>=i.cols||a>=i.rows)continue;let l=a*i.cols+o;if(!i.blocked[l])return l}return-1}function Mg(i,e,t){if(lr(i,e,t))return{x:e,z:t};let n=hu(i,uu(i,e,t),6);return n<0?null:Ea(i,n%i.cols,Math.floor(n/i.cols))}function TM(i,e,t,n,s,r=.25){let o=Math.hypot(n-e,s-t),a=Math.max(1,Math.ceil(o/r));for(let l=1;l<a;l+=1){let c=l/a;if(!lr(i,e+(n-e)*c,t+(s-t)*c))return!1}return!0}var wg=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,Sa],[1,-1,Sa],[-1,1,Sa],[-1,-1,Sa]];function AM(i,e,t,{maxExpansions:n=3e4}={}){let s=hu(i,uu(i,e.x,e.z)),r=hu(i,uu(i,t.x,t.z));if(s<0||r<0)return null;if(s===r){let m=Ea(i,r%i.cols,Math.floor(r/i.cols));return lr(i,t.x,t.z)?[t]:[m]}let o=r%i.cols,a=Math.floor(r/i.cols),l=m=>{let p=Math.abs(m%i.cols-o),b=Math.abs(Math.floor(m/i.cols)-a);return p+b+(Sa-2)*Math.min(p,b)},c=new Float64Array(i.blocked.length).fill(1/0),u=new Int32Array(i.blocked.length).fill(-1),h=new Uint8Array(i.blocked.length),d=new cu;c[s]=0,d.push({index:s,f:l(s)});let f=!1,g=0;for(;d.size;){let m=d.pop().index;if(h[m])continue;if(h[m]=1,m===r){f=!0;break}if(++g>n)return null;let p=m%i.cols,b=Math.floor(m/i.cols);for(let[M,v,T]of wg){let A=p+M,R=b+v;if(A<0||R<0||A>=i.cols||R>=i.rows)continue;let I=R*i.cols+A;if(i.blocked[I]||h[I]||M&&v&&(i.blocked[b*i.cols+A]||i.blocked[R*i.cols+p]))continue;let w=c[m]+T;w<c[I]&&(c[I]=w,u[I]=m,d.push({index:I,f:w+l(I)}))}}if(!f)return null;let x=[];for(let m=r;m!==-1&&(x.push(Ea(i,m%i.cols,Math.floor(m/i.cols))),m!==s);m=u[m]);return x.reverse(),x[0]={x:e.x,z:e.z},lr(i,t.x,t.z)&&(x[x.length-1]={x:t.x,z:t.z}),Eg(i,x)}function Sg(i,e,t,{maxExpansions:n=3e4}={}){let s=AM(i,e,t);if(s)return s;let r=hu(i,uu(i,e.x,e.z));if(r<0)return null;let o=new Float64Array(i.blocked.length).fill(1/0),a=new Int32Array(i.blocked.length).fill(-1),l=new Uint8Array(i.blocked.length),c=new cu;o[r]=0,c.push({index:r,f:0});let u=-1,h=1/0,d=0;for(;c.size;){let g=c.pop().index;if(l[g])continue;if(l[g]=1,++d>n)break;let x=Ea(i,g%i.cols,Math.floor(g/i.cols)),m=Math.hypot(x.x-t.x,x.z-t.z)+.001*o[g];m<h&&(h=m,u=g);let p=g%i.cols,b=Math.floor(g/i.cols);for(let[M,v,T]of wg){let A=p+M,R=b+v;if(A<0||R<0||A>=i.cols||R>=i.rows)continue;let I=R*i.cols+A;if(i.blocked[I]||l[I]||M&&v&&(i.blocked[b*i.cols+A]||i.blocked[R*i.cols+p]))continue;let w=o[g]+T;w<o[I]&&(o[I]=w,a[I]=g,c.push({index:I,f:w}))}}if(u<0)return null;let f=[];for(let g=u;g!==-1&&(f.push(Ea(i,g%i.cols,Math.floor(g/i.cols))),g!==r);g=a[g]);return f.reverse(),f[0]={x:e.x,z:e.z},Eg(i,f)}function Eg(i,e){if(e.length<3)return e;let t=[e[0]],n=0;for(;n<e.length-1;){let s=n+1;for(let r=e.length-1;r>n+1;r-=1)if(TM(i,e[n].x,e[n].z,e[r].x,e[r].z)){s=r;break}t.push(e[s]),n=s}return t}var La=new URLSearchParams(location.search),_t=(La.get("name")||"Exploradora").trim().slice(0,32),Ra=["woods","school","highstreet","academy","classroom"].includes(La.get("zone"))?La.get("zone"):null,H=Hm(localStorage,_t),CM=["pt","en","es"].includes(La.get("language"))?La.get("language"):null,Te=["pt","en","es"].includes(H.language)?H.language:CM||"pt";Ra&&(H={...H,character:H.character||"ivy",zone:Ra,flags:{...H.flags,introSeen:!0,mapAssembled:!0}});var Me=i=>document.getElementById(i),at=Me("rpg"),PM={finch:{pt:"\u{1F5E3}\uFE0F Falar com o Sr. Finch",en:"\u{1F5E3}\uFE0F Talk to Mr Finch",es:"\u{1F5E3}\uFE0F Hablar con el Sr. Finch"},page:{pt:"\u{1F5E3}\uFE0F Falar com a Sra. Page",en:"\u{1F5E3}\uFE0F Talk to Ms Page",es:"\u{1F5E3}\uFE0F Hablar con la Sra. Page"},board:{pt:"\u{1F50D} Olhar o mural",en:"\u{1F50D} Look at the board",es:"\u{1F50D} Mirar el mural"},signTree:{pt:"\u{1F50D} Olhar a \xE1rvore dourada",en:"\u{1F50D} Look at the golden tree",es:"\u{1F50D} Mirar el \xE1rbol dorado"},pieceShelf:{pt:"\u{1F50D} Procurar na estante",en:"\u{1F50D} Search the shelf",es:"\u{1F50D} Buscar en el estante"},pieceTrolley:{pt:"\u{1F50D} Procurar no carrinho",en:"\u{1F50D} Search the trolley",es:"\u{1F50D} Buscar en el carrito"},clueTable:{pt:"\u{1F50D} Olhar embaixo da mesa",en:"\u{1F50D} Look under the table",es:"\u{1F50D} Mirar bajo la mesa"},clueOak:{pt:"\u{1F50D} Olhar o carvalho",en:"\u{1F50D} Look at the oak",es:"\u{1F50D} Mirar el roble"},ivyDoor:{pt:"\u{1F333} Porta de heras",en:"\u{1F333} Ivy door",es:"\u{1F333} Puerta de hiedra"},marker:{pt:"\u{1F50D} Ler a pedra antiga",en:"\u{1F50D} Read the old stone",es:"\u{1F50D} Leer la piedra antigua"},gate:{pt:"\u{1F6AA} Port\xE3o secreto",en:"\u{1F6AA} Secret gate",es:"\u{1F6AA} Puerta secreta"},chest:{pt:"\u{1F381} Abrir o ba\xFA",en:"\u{1F381} Open the chest",es:"\u{1F381} Abrir el cofre"},blackboard:{pt:"\u{1F9EE} Aula na lousa",en:"\u{1F9EE} Blackboard lesson",es:"\u{1F9EE} Lecci\xF3n en la pizarra"},willow:{pt:"\u{1F5E3}\uFE0F Falar com a Prof. Willow",en:"\u{1F5E3}\uFE0F Talk to Prof. Willow",es:"\u{1F5E3}\uFE0F Hablar con la Prof. Willow"},orderStart:{pt:"\u{1F375} Falar com a Sra. Page (encomenda)",en:"\u{1F375} Talk to Ms Page (errand)",es:"\u{1F375} Hablar con la Sra. Page (encargo)"},orderMint:{pt:"\u{1F33F} Colher menta fresca",en:"\u{1F33F} Pick fresh mint",es:"\u{1F33F} Recoger menta fresca"},orderBun:{pt:"\u{1F950} Pegar o p\xE3o de canela",en:"\u{1F950} Get the cinnamon bun",es:"\u{1F950} Tomar el pan de canela"},orderFeather:{pt:"\u{1FAB6} Pegar a pena azul",en:"\u{1FAB6} Get the blue feather",es:"\u{1FAB6} Tomar la pluma azul"},bookshop:{pt:"\u{1F4DA} Olhar a vitrine da bookshop",en:"\u{1F4DA} Look at the bookshop window",es:"\u{1F4DA} Mirar el escaparate"},postOffice:{pt:"\u2709\uFE0F Ver o correio",en:"\u2709\uFE0F Check the post box",es:"\u2709\uFE0F Mirar el buz\xF3n"},teaRoom:{pt:"\u{1F375} Ouvir o tea room",en:"\u{1F375} Listen at the tea room",es:"\u{1F375} Escuchar la sala de t\xE9"},clueBench:{pt:"\u{1F50D} Olhar o cartaz no banco",en:"\u{1F50D} Look at the poster on the bench",es:"\u{1F50D} Mirar el cartel del banco"},clueChalk:{pt:"\u{1F50D} Olhar a janela",en:"\u{1F50D} Look at the window",es:"\u{1F50D} Mirar la ventana"},clueScroll:{pt:"\u{1F50D} Ler o pergaminho",en:"\u{1F50D} Read the scroll",es:"\u{1F50D} Leer el pergamino"},baker:{pt:"\u{1F5E3}\uFE0F Falar com o padeiro",en:"\u{1F5E3}\uFE0F Talk to the baker",es:"\u{1F5E3}\uFE0F Hablar con el panadero"},playground:{pt:"\u{1F6DD} Olhar o parquinho",en:"\u{1F6DD} Look at the playground",es:"\u{1F6DD} Mirar el parque infantil"},umbrellaSpot:{pt:"\u2602\uFE0F Pegar o guarda-chuva roxo",en:"\u2602\uFE0F Pick up the purple umbrella",es:"\u2602\uFE0F Recoger el paraguas morado"},garden:{pt:"\u{1F955} Visitar a horta",en:"\u{1F955} Visit the garden",es:"\u{1F955} Visitar la huerto"},sports:{pt:"\u26BD Jogar no campo de Welling FC",en:"\u26BD Play on the Welling FC pitch",es:"\u26BD Jugar en la cancha de Welling FC"},clueTimetable:{pt:"\u{1F50D} Ler o tabela de jogos",en:"\u{1F50D} Read the games timetable",es:"\u{1F50D} Leer la tabla de juegos"},field:{pt:"\u26BD Olhar o campo grande",en:"\u26BD Look at the big field",es:"\u26BD Mirar el campo grande"},woodCafe:{pt:"\u2615 Caf\xE9 no alto da colina",en:"\u2615 Caf\xE9 on top of the hill",es:"\u2615 Caf\xE9 en la colina"},severndroog:{pt:"\u{1F3F0} Visitar o castelo de Severe",en:"\u{1F3F0} Visit Severndroog Castle",es:"\u{1F3F0} Visitar el castillo de Severe"},pond:{pt:"\u{1F986} Ver o lago e os patinhos",en:"\u{1F986} See the pond and the ducks",es:"\u{1F986} Ver el estanque y los patos"},greenChain:{pt:"\u{1F6E4}\uFE0F Achar a trilha do Green Chain Walk",en:"\u{1F6E4}\uFE0F Find the Green Chain Walk",es:"\u{1F6E4}\uFE0F Encontrar el sendero Green Chain"},outdoorGym:{pt:"\u{1F4AA} Aquecer na academia ao ar livre",en:"\u{1F4AA} Warm up at the outdoor gym",es:"\u{1F4AA} Calentar en el gimnasio exterior"},raven:{pt:"\u2694\uFE0F Desafiar a Prof. Raven",en:"\u2694\uFE0F Challenge Prof. Raven",es:"\u2694\uFE0F Desafiar a la Prof. Raven"},duel:{pt:"\u2694\uFE0F Entrar no duelo de feiti\xE7os",en:"\u2694\uFE0F Enter the spell duel",es:"\u2694\uFE0F Entrar al duelo de hechizos"}},IM={talk:"objTalk",find:"objFind",assemble:"objAssemble",toWoods:"objToWoods",cross:"objCross",gate:"objGate",done:"objDone"},Tg={school:{pt:"\u{1F3EB} Academia Leigh Stationers",en:"\u{1F3EB} Leigh Stationers' Primary Academy",es:"\u{1F3EB} Academia Leigh Stationers"},woods:{pt:"\u{1F333} Oxleas Woods",en:"\u{1F333} Oxleas Woods",es:"\u{1F333} Bosque de Oxleas"},highstreet:{pt:"\u{1F3EA} High Street",en:"\u{1F3EA} High Street",es:"\u{1F3EA} High Street"},academy:{pt:"\u{1F3F0} Academia Owlburt",en:"\u{1F3F0} Owlburt Academy",es:"\u{1F3F0} Academia Owlburt"},classroom:{pt:"\u{1FA91} Sala de Aula",en:"\u{1FA91} Classroom",es:"\u{1FA91} Sal\xF3n de Clases"}},cr=vg(),ui,Rt,hi,Kd,qn,Le=null,ue=null,Ca=null,Mn=null,fu=null,Pa={},Ms=null,ws=null,Ht=0,Yd=!1,Jd=!1,jd=0,Qd=0,Ag=0,Ia=new Set;function Ng(i,e){Ia=new Set;for(let t of Le?.exits||[])Math.hypot(t.x-i,t.z-e)<=t.radius&&Ia.add(`${t.target}:${t.x}:${t.z}`)}window.__BUNDLE_V="o";function LM(){ui=new Uc({antialias:!0}),ui.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),ui.setSize(window.innerWidth,window.innerHeight),ui.shadowMap.enabled=!0,ui.shadowMap.type=Dl,ui.toneMapping=Wr,ui.toneMappingExposure=1.06,at.prepend(ui.domElement),hi=new Xt(50,window.innerWidth/window.innerHeight,.1,200),Kd=new qs,window.addEventListener("resize",()=>{hi.aspect=window.innerWidth/window.innerHeight,hi.updateProjectionMatrix(),ui.setSize(window.innerWidth,window.innerHeight),qn&&qn.setSize(window.innerWidth,window.innerHeight)}),kM(ui.domElement)}function DM(){Rt&&(Rt.traverse(i=>{i.geometry&&i.geometry.dispose(),i.material?.map&&i.material.map.dispose()}),Rt.clear(),Rt=null)}function Og(i){if(DM(),Rt=new Fo,Rt.background=new we(2367288),Rt.userData.zone={colliders:[]},Le=i==="woods"?cg(Rt):i==="highstreet"?og(Rt):i==="academy"?ag(Rt):i==="classroom"?lg(Rt):rg(Rt),Tg[i]&&setTimeout(()=>Yt(at,un(Tg[i],Te),{duration:2600}),600),Rt.background=new we(Le.background),Rt.fog=new Uo(Le.fog[0],Le.fog[1],Le.fog[2]),Sm(i),!qn){qn=new Hc(ui),qn.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),qn.setSize(window.innerWidth,window.innerHeight),qn.addPass(new zc(Rt,hi));let l=new no(new be(window.innerWidth,window.innerHeight),.4,.55,.86);qn.addPass(l);let c=new Vc(window.innerWidth*Math.min(window.devicePixelRatio||1,2),window.innerHeight*Math.min(window.devicePixelRatio||1,2));qn.addPass(c),qn.addPass(new Wc)}let e=qn.passes[0];e.scene=Rt,e.camera=hi;let t=new Zo(Le.hemi[0],Le.hemi[1],Le.hemi[2]);Rt.add(t);let n=new Xs(Le.sun.color,Le.sun.intensity);n.position.set(...Le.sun.pos),n.castShadow=!0,n.shadow.mapSize.set(1024,1024);let s=Math.max(13,Math.min(30,(Le.bounds.maxX-Le.bounds.minX)/2+4));n.shadow.camera.left=-s,n.shadow.camera.right=s,n.shadow.camera.top=s,n.shadow.camera.bottom=-s,n.shadow.camera.near=1,n.shadow.camera.far=120,n.shadow.bias=-8e-4,n.shadow.normalBias=.02,Rt.add(n),Rt.add(n.target),Rt.userData.sun=n;let r=H.zone===i&&Array.isArray(H.position)?H.position:null;ue=Gd(H.character||"ivy"),ar(ue),ue.position.set(r?.[0]??Le.spawn[0],0,r?.[1]??Le.spawn[1]),Rt.add(ue),Ng(ue.position.x,ue.position.z);let o=H.character==="oakley"?1:0;Ca=Vd(o),Rt.add(Ca);let a=H.character==="ivy"?"oakley":"ivy";Mn=Gd(a),ar(Mn),Mn.position.set(ue.position.x-.9,0,ue.position.z+.4),Rt.add(Mn),fu=Vd(a==="oakley"?1:0),Mn.add(fu),fu.position.set(.24,1.62,-.08);for(let l of Object.keys(Pa))delete Pa[l];for(let l of Object.keys(Ma)){let c=Le.npcSpots?.[l];if(!c)continue;let u=ba(Ma[l].color,l);ar(u,.5),u.position.set(c[0],0,c[1]),u.rotation.y=l==="finch"?Math.PI/2:.95,Rt.add(u),Pa[l]=u}if(Ms=new D(new zs(.66,.055,8,32),new Pt({color:16765286,transparent:!0,opacity:.9})),Ms.rotation.x=-Math.PI/2,Ms.visible=!1,Rt.add(Ms),ws=new D(new ki(.3,.45,28),new Pt({color:8317090,transparent:!0,opacity:.95})),ws.rotation.x=-Math.PI/2,ws.visible=!1,Rt.add(ws),Ji(),hi.position.set(ue.position.x,7.5,ue.position.z+8.5),hi.lookAt(ue.position.x,.6,ue.position.z),i==="woods"){if(H.flags.stonesCrossed){let l=Le.colliders.indexOf(Le.streamCollider);l>=0&&Le.colliders.splice(l,1)}if(H.flags.gateOpen&&Le.gateCollider){let l=Le.colliders.indexOf(Le.gateCollider);l>=0&&Le.colliders.splice(l,1);let[c,u]=Le.gateDoors;c.rotation.y=-1.9,c.position.x=-1.69,u.rotation.y=1.9,u.position.x=1.69}}$i=du(Le,{radius:Qi})}var Ai=new Set,NM=new Map([["restartBackdrop",()=>nf()],["creditsBackdrop",()=>xu()],["wordsBackdrop",()=>rf()],["reportBackdrop",()=>sf()],["quizBackdrop",()=>yu()]]);function OM(){let i=wa.top();if(!i)return!1;for(let[e,t]of NM){let n=Me(e);if(!n)continue;if((n.querySelector(".rpg-panel")||n)===i)return t(),!0}return!1}window.addEventListener("keydown",i=>{if((i.key==="Enter"||i.key===" ")&&bu?.(),i.key==="Escape"){if(OM())return;if(Rn){yu();return}Ji()}["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(i.key)&&i.preventDefault(),Ai.add(i.key.toLowerCase()),i.key.toLowerCase()==="e"&&Xg()});window.addEventListener("keyup",i=>Ai.delete(i.key.toLowerCase()));function UM(){let i=0,e=0;(Ai.has("w")||Ai.has("arrowup"))&&(e-=1),(Ai.has("s")||Ai.has("arrowdown"))&&(e+=1),(Ai.has("a")||Ai.has("arrowleft"))&&(i-=1),(Ai.has("d")||Ai.has("arrowright"))&&(i+=1);let t=Math.hypot(i,e);return t>1&&(i/=t,e/=t),[i,e]}var on=null,_s=[],bs=0,$i=null,co=0,$d=0,pu=null,Rg=new $o,FM=new Hn(new L(0,1,0),0),Cg=new be,ur=new L;function Ji(){on=null,_s=[],bs=0,co=0}function Ug(i){if(!$i||!ue)return null;let e={x:ue.position.x,z:ue.position.z},t=Sg($i,e,i);if(!t||!t.length)return null;let n=t[t.length-1];return Math.hypot(n.x-e.x,n.z-e.z)<.3?null:t}function BM(i,e){if(!ue||!hi||Ht>0||(Cg.set(i/window.innerWidth*2-1,-(e/window.innerHeight)*2+1),Rg.setFromCamera(Cg,hi),!Rg.ray.intersectPlane(FM,ur)))return;let t=ur.x-ue.position.x,n=ur.z-ue.position.z,s=Math.hypot(t,n);if(s<.25){Ji();return}s>26&&(ur.x=ue.position.x+t/s*26,ur.z=ue.position.z+n/s*26);let r={x:Kr.clamp(ur.x,Le.bounds.minX+Qi,Le.bounds.maxX-Qi),z:Kr.clamp(ur.z,Le.bounds.minZ+Qi,Le.bounds.maxZ-Qi)},o=Ug(r);if(pu=r,!o){Ji(),Ge.wrong(),Yt(at,Ze(Te,"noPath"),{duration:2200});return}let a=o[o.length-1];on=lr($i,r.x,r.z)?r:{x:a.x,z:a.z},_s=o,bs=o.length>1?1:0,co=0,$d=0,Ge.tap()}var An={yawId:null,lastX:0,lastY:0},ci=new Map,Ta=0;function Fg(i){return Math.max(aw,Math.min(lw,i))}window.addEventListener("wheel",i=>{Oa=Fg(Oa*(1+i.deltaY*9e-4))},{passive:!0});function kM(i){i.style.touchAction="none",i.style.cursor="grab",i.addEventListener("contextmenu",r=>r.preventDefault()),document.addEventListener("gesturestart",r=>r.preventDefault());let e=r=>ci.set(r.pointerId,{x:r.clientX,y:r.clientY}),t=()=>{let[r,o]=[...ci.values()];return Math.hypot(r.x-o.x,r.y-o.y)},n={id:null,x:0,y:0,valid:!1};i.addEventListener("pointerdown",r=>{e(r),i.style.cursor="grabbing",ci.size===1?(An.yawId=r.pointerId,An.lastX=r.clientX,An.lastY=r.clientY,n.id=r.pointerId,n.x=r.clientX,n.y=r.clientY,n.valid=!0):(n.valid=!1,ci.size===2&&(Ta=t(),An.yawId=null))}),i.addEventListener("pointermove",r=>{if(ci.has(r.pointerId))if(e(r),ci.size===2){let o=t();Ta>0&&(Oa=Fg(Oa*(o/Ta))),Ta=o}else r.pointerId===An.yawId&&(n.valid&&r.pointerId===n.id&&Math.hypot(r.clientX-n.x,r.clientY-n.y)>9&&(n.valid=!1),Aa-=(r.clientX-An.lastX)*.006,_u=Math.max(rw,Math.min(ow,_u+(r.clientY-An.lastY)*.004)),An.lastX=r.clientX,An.lastY=r.clientY)});let s=r=>{ci.delete(r.pointerId),n.valid&&r.pointerId===n.id&&(n.valid=!1,BM(n.x,n.y)),ci.size===0&&(i.style.cursor="grab"),r.pointerId===An.yawId&&(An.yawId=null),ci.size<2&&(Ta=0);let o=[...ci.keys()];if(o.length===1){An.yawId=o[0];let a=ci.get(o[0]);An.lastX=a.x,An.lastY=a.y}};i.addEventListener("pointerup",s),i.addEventListener("pointercancel",s)}var Qi=.35;function Pg(i,e,t){let n=Math.max(t.minX,Math.min(i,t.maxX)),s=Math.max(t.minZ,Math.min(e,t.maxZ)),r=i-n,o=e-s;return r*r+o*o<Qi*Qi}function Ig(i,e,t,n){let s=i+t;Le.colliders.some(o=>Pg(s,e,o))&&(s=i);let r=e+n;return Le.colliders.some(o=>Pg(s,r,o))&&(r=e),s=Math.max(Le.bounds.minX,Math.min(s,Le.bounds.maxX)),r=Math.max(Le.bounds.minZ,Math.min(r,Le.bounds.maxZ)),[s,r]}var bu=null,Da=Me("dialog"),Bg=Me("dialogName"),ef=Me("dialogText"),mu=Me("dialogVoice"),gu=Me("dialogButtons");function HM(){Da.classList.contains("hidden")&&(Da.classList.remove("hidden"),Ht+=1,wu())}function kg(){Da.classList.contains("hidden")||(Da.classList.add("hidden"),Ht=Math.max(0,Ht-1))}var Mu=null,tf=!1;Me("dialogClose").addEventListener("click",()=>{if(Da.classList.contains("hidden"))return;Ge.tap(),tf=!0;let i=Mu;kg(),i?.()});function fo(i){if(!H.sound||!i||!window.speechSynthesis)return;let e=window.speechSynthesis;e.cancel();let t=new SpeechSynthesisUtterance(i);t.lang="en-GB",t.rate=.92;let n=e.getVoices(),s=n.find(r=>r.lang.replace("_","-")==="en-GB")||n.find(r=>r.lang.startsWith("en"));s&&(t.voice=s),e.speak(t)}function zM(i){return i==="owl"?`\u{1F989} ${jc.find(e=>e.id===(H.character||"ivy"))?.owl||"Pip"}`:`${Ma[i]?.emoji||""} ${un(Ma[i]?.name,Te)}`}function Hg(i,e){return new Promise(t=>{Mu=t,Bg.textContent=zM(i),ef.textContent=un(e,Te),mu.classList.remove("hidden"),mu.onclick=()=>fo(e.en),gu.replaceChildren();let n=xt("button","rpg-button primary",Ze(Te,"continueLabel"));n.type="button",n.addEventListener("click",s=>{s.stopPropagation(),Ge.tap(),t()}),gu.appendChild(n),bu=()=>n.click()})}var zg={bronze:"\u{1F949}",silver:"\u{1F948}",gold:"\u{1F947}"},Lg=Promise.resolve();function di({silent:i=!1}={}){let e=Nm(H.achievements,H);if(e.length!==0){for(let t of e)H.achievements.includes(t)||H.achievements.push(t);vt(localStorage,_t,H),!i&&(Lg=Lg.then(async()=>{for(let t of e){let n=Om(t);if(!n)continue;let s=zg[n.tier]||"\u{1F3C5}";Yt(at,`${s} ${un(n.text,Te)}`,{duration:3600}),Ge.hoot(),await new Promise(r=>setTimeout(r,3900))}}))}}function GM(){let i=Me("achievementsList");if(!i)return;let e=new Set(H.achievements||[]);if(e.size===0){i.innerHTML=`<p class="rpg-words-empty">${Ze(Te,"achievementsEmpty")}</p>`;return}let t=ga.filter(n=>e.has(n.id));i.innerHTML=t.map(n=>`<li class="achievement-row"><span class="achievement-emoji">${zg[n.tier]||"\u{1F3C5}"}</span><span class="achievement-text"><strong>${un(n.text,Te)}</strong><small>${un(n.hint,Te)}</small></span></li>`).join("")}function vs(i,e){let t=!H.words[i],n=Am(H.words,i,e);return!n&&t&&Yt(at,un({pt:"O teu di\xE1rio est\xE1 cheio. Guarda esta palavra para depois!",en:"Your journal is full. Keep this word for later!",es:"Tu diario est\xE1 lleno. Guarda esta palabra para despu\xE9s."},Te),{duration:4200}),t&&H.words[i]&&Zc(H,"added"),di(),n}function af(i){Rm(H.words,i),Zc(H,"right"),di()}function lf(i){Cm(H.words,i),Zc(H,"wrong")}function VM(i){let e=Ki[i];e&&(Yt(at,`\u2728 ${un(e,Te)}`,{duration:3400}),vs(i,e),vt(localStorage,_t,H),uo())}function uo(){let i=Me("reviewBadge");if(!i)return;let e=nr(H.words);i.classList.toggle("hidden",e.length===0),i.textContent=String(e.length),df()}function WM(){let i=Me("wordsList");if(!i)return;let e=Object.entries(H.words).sort((s,r)=>s[0].localeCompare(r[0]));if(e.length===0){i.innerHTML=`<p class="rpg-words-empty">${Ze(Te,"wordsEmpty")}</p>`;return}let t=Date.now(),n=s=>s.due<=t?`<span class="word-due">${Ze(Te,"wordsReviewMark")}</span>`:'<span class="word-ok">\u2713</span>';i.innerHTML=e.map(([s,r])=>`<div class="word-row"><span class="word-en">${s}</span><span>${r.pt}</span><span class="word-stars">${"\u2B50".repeat(Math.min(r.streak||0,5))}</span>${n(r)}</div>`).join("")}var Rn=null,XM=0,Na="";function cf(i){return Rn?null:(Rn={token:++XM,kind:i},Ht+=1,Rn.token)}function ho(i){return Rn&&Rn.token===i?i:null}function uf(i){!Rn||Rn.token!==i||(Rn=null,Ht=Math.max(0,Ht-1),Me("quizBackdrop").classList.add("hidden"))}function qM(){Rn&&(Rn.token+=1e3,Rn=null,Ht=Math.max(0,Ht-1),Me("quizBackdrop").classList.add("hidden"))}function YM(){if(nr(H.words).length===0||Rn)return;let e=cf("review");if(e===null)return;let t=new Set(nr(H.words).map(([r])=>r)),n=Zh(H.words).filter(r=>t.has(r)).slice(0,12),s=()=>{if(ho(e)===null)return;if(n.length===0){uf(e),uo();return}let r=Kh(H.words,n.shift(),Te);if(!r)return s();Na=r.word,Me("quizPrompt").textContent=Ze(Te,"quizListen"),fo(r.word);let o=Me("quizOptions");o.innerHTML="",Me("quizFeedback").textContent="";for(let a of r.options){let l=document.createElement("button");l.type="button",l.textContent=a.text,l.addEventListener("click",()=>{ho(e)!==null&&(a.correct?(af(r.word),l.classList.add("correct"),Me("quizFeedback").textContent=Ze(Te,"reviewRight"),Ge.star()):(lf(r.word),l.classList.add("wrong"),Me("quizFeedback").textContent=Ze(Te,"reviewWrong",{word:r.word}),Ge.wrong()),vt(localStorage,_t,H),uo(),setTimeout(s,1100))}),o.appendChild(l)}Me("quizBackdrop").classList.remove("hidden"),hr("quizBackdrop")};s()}function Gg(i){return new Promise(e=>{Mu=()=>e(!1),Bg.textContent=`\u{1F3AF} ${un(i.prompt,Te)}`,ef.textContent="",mu.classList.add("hidden"),mu.onclick=()=>fo(i.prompt.en);function t(){gu.replaceChildren();for(let n of i.options){let s=xt("button","rpg-choice",un(n.label,Te));s.type="button",s.addEventListener("click",async()=>{n.correct?(Ge.correct(),await Hg("owl",i.success),e(!0)):(Ge.wrong(),ef.textContent=un(i.fail,Te),t())}),gu.appendChild(s)}}t(),bu=null})}async function Qe(i){tf=!1,HM();for(let e of i)if(e.choice?await Gg(e.choice)&&jM(e.choice.challengeId):e.gloss?VM(e.gloss):await Hg(e.who,e.text),tf)break;kg(),bu=null,Mu=null}function jM(i){!i||H.challenges[i]||(H.challenges[i]=!0,vt(localStorage,_t,H),di())}function Yn(){let i=ed(H);Me("questChip").textContent=`\u{1F4DC} ${Ze(Te,IM[i.id],{count:i.progress??0})}`,Me("soundButton").textContent=H.sound?"\u{1F50A}":"\u{1F507}";let e=Me("langButton");e&&(e.textContent=`\u{1F310} ${Te.toUpperCase()}`)}function Vg(){let i=Me("journal");if(i.classList.contains("hidden")){let e=Me("journalPieces");e.replaceChildren();for(let s of so){let r=H.mapPieces.includes(s);e.appendChild(xt("li",void 0,`${r?"\u2705":"\u2B1C"} ${un(pg[s],Te)}`))}let t=Wm(H,{wordCount:Object.keys(H.words).length,today:xa(new Date)}),n=Me("journalSecondary");n.replaceChildren();for(let s of t)n.appendChild(xt("li",void 0,`\u25AB\uFE0F ${Ze(Te,s.key,{n:s.progress,total:s.total})}`));Me("journalObjective").textContent=Me("questChip").textContent,i.classList.remove("hidden")}else i.classList.add("hidden")}Me("questChip").addEventListener("click",Vg);Me("journalClose").addEventListener("click",Vg);Me("homeButton").addEventListener("click",()=>{location.href="../index.html"});function hr(i){let e=Me(i);if(!e)return;let t=e.querySelector(".rpg-panel")||e;if(wa.top()===t)return;let n=document.activeElement,s=yg(t,{activeElement:n,fallbackFocusTarget:t});wa.push(t,{release:s,opener:n}),t.focus?.()}function Ua(i){let e=Me(i);if(!e)return;let t=e.querySelector(".rpg-panel")||e;wa.close(t)}function ZM(){Me("restartBackdrop").classList.remove("hidden"),hr("restartBackdrop");let i=Me("restartCancel");setTimeout(()=>i.focus(),0)}function nf(){Me("restartBackdrop").classList.add("hidden"),Ua("restartBackdrop")}function Wg(){Jd=!0;try{Um()}catch{}location.reload()}function KM(){Me("creditsBackdrop").classList.remove("hidden"),hr("creditsBackdrop")}function xu(){Me("creditsBackdrop").classList.add("hidden"),Ua("creditsBackdrop")}function JM(){WM(),Me("wordsBackdrop").classList.remove("hidden"),hr("wordsBackdrop")}document.addEventListener("click",i=>{let e=i.target.closest?.("button")?.id;e==="restartConfirm"?Wg():e==="restartCancel"||e==="restartBackdrop"&&i.target===i.currentTarget?nf():e==="restartButton"?ZM():e==="creditsClose"||e==="creditsOk"?xu():e==="creditsButton"?KM():e==="wordsButton"?JM():e==="wordsClose"||e==="wordsClose2"?rf():e==="quizClose"||e==="quizClose2"?yu():e==="reportButton"?QM():e==="reportClose"||e==="reportClose2"?sf():i.target.id==="restartBackdrop"?nf():i.target.id==="creditsBackdrop"?xu():i.target.id==="wordsBackdrop"?rf():i.target.id==="quizBackdrop"?yu():i.target.id==="reportBackdrop"&&sf()});function QM(){let i=Object.keys(H.words).length,e=Object.values(H.words).filter(h=>(h.streak||0)>=3).length,t=nr(H.words).length,n=["school","woods","highstreet","academy","classroom"],s=n.filter(h=>h==="school"||H.flags[`visited_${h}`]).length,r=Bm(H.history),o=km(H.history),a=(h,d)=>Ze(Te,h,d),l=h=>`<span style="margin-left:auto;font-weight:700;color:#ffd166">${h}</span>`,c=(h,d)=>`<div class="word-row"><span>${h}</span>${d===void 0?"":l(d)}</div>`,u=[c(a("repWords"),String(i)),c(a("repMastered"),String(e)),c(a("repDue"),String(t)),c(a("repClues",{n:H.clues.length,total:Object.keys(Xd).length})),c(a("repPieces",{n:Zi(H)})),c(a("repChallenges"),String(Object.values(H.challenges).filter(Boolean).length)),c(a("repDuelWins",{n:H.duelWins,medal:td[Jc(H.duelWins)]})),c(a("repChapter"),H.flags.endingSeen?a("repYes"):a("repNo")),c(a("repZones",{n:s,total:n.length})),c(a("repWeek",{added:r.added,right:r.right,answers:r.right+r.wrong})),c(a("repStreak",{n:o}))];Me("reportBody").innerHTML=u.join("")+`<p style="font-size:11.5px;color:rgba(255,255,255,.55);margin:10px 0 0">${a("repMasterHint")}</p>`,GM(),Me("reportBackdrop").classList.remove("hidden"),hr("reportBackdrop")}function sf(){Me("reportBackdrop").classList.add("hidden"),Ua("reportBackdrop")}function rf(){Me("wordsBackdrop").classList.add("hidden"),Ua("wordsBackdrop")}function yu(){qM(),Ua("quizBackdrop")}function $M(){if(Rn)return;let e=Zh(H.words).slice(0,3),t=cf("duel");if(t===null)return;let n=0,s=0,r=()=>{if(ho(t)===null)return;if(s>=e.length)return o();let a=Kh(H.words,e[s],Te);if(!a)return o();s+=1,Me("quizPrompt").textContent=`\u26A1 ${a.word}?`,Na=a.word,fo(a.word);let l=Me("quizOptions");l.innerHTML="",Me("quizFeedback").textContent=Ze(Te,"duelRound",{n:s,m:e.length,score:n});for(let c of a.options){let u=document.createElement("button");u.type="button",u.textContent=c.text,u.addEventListener("click",()=>{ho(t)!==null&&(c.correct?(af(a.word),n+=1,u.classList.add("correct"),Me("quizFeedback").textContent=Ze(Te,"duelRight"),Ge.magic()):(lf(a.word),u.classList.add("wrong"),Me("quizFeedback").textContent=Ze(Te,"duelWrong",{word:a.word}),Ge.wrong()),vt(localStorage,_t,H),uo(),setTimeout(r,1100))}),l.appendChild(u)}Me("quizBackdrop").classList.remove("hidden"),hr("quizBackdrop")},o=()=>{uf(t);let a=n>=2,l=()=>{if(a){let c=Jc(H.duelWins);H.flags.duelWon=!0,H.duelWins+=1,vt(localStorage,_t,H),Yn(),di(),Ge.fanfare(),li(at,140);let u=Jc(H.duelWins);u>c&&Yt(at,Ze(Te,"medalEarned",{medal:td[u]}),{duration:4600})}};a?Qe([{who:"raven",text:{pt:`Impressionante! ${n} de 3 \u2014 voc\xEAs venceram o duelo! A Academia Owlburt reconhece seu vocabul\xE1rio. \u{1F3C5}`,en:`Impressive! ${n} of 3 \u2014 you won the duel! Owlburt Academy recognizes your vocabulary. \u{1F3C5}`,es:`\xA1Impresionante! ${n} de 3 \u2014 \xA1ganaron el duelo! La Academia Owlburt reconoce su vocabulario. \u{1F3C5}`}},{gloss:"spell"}]).then(l):Qe([{who:"raven",text:{pt:`${n} de 3\u2026 a vit\xF3ria \xE9 minha hoje. Estudem com a coruja e voltem \u2014 adoro uma revanche!`,en:`${n} of 3\u2026 victory is mine today. Study with the owl and come back \u2014 I love a rematch!`,es:`${n} de 3\u2026 la victoria es m\xEDa hoy. \xA1Estudien con el b\xFAho y vuelvan \u2014 me encanta una revancha!`}}]).then(l)};r()}Me("creditsBackdrop")&&Me("creditsBackdrop").addEventListener("click",i=>{i.target===Me("creditsBackdrop")&&xu()});Me("hintButton")?.addEventListener("click",i=>{nr(H.words).length>0&&(i.stopImmediatePropagation(),YM())},{capture:!0});Me("soundButton").addEventListener("click",()=>{H.sound=!H.sound,qh(!H.sound),vt(localStorage,_t,H),Yn(),df(),Ge.tap()});Me("quizVoice").addEventListener("click",()=>{Na&&!Me("quizBackdrop").classList.contains("hidden")&&fo(Na)});Me("langButton").addEventListener("click",()=>{let i={pt:"en",en:"es",es:"pt"};H.language=i[Te]||"en",vt(localStorage,_t,H),location.reload()});Me("hintButton").addEventListener("click",()=>{Ge.hoot(),Yt(at,Ze(Te,Vm(H)),{duration:4600})});var vu=Me("prompt"),Ri=null;function wu(){vu.classList.add("hidden")}function ew(i){vu.textContent=i,vu.classList.remove("hidden")}vu.addEventListener("click",()=>Xg());function Xg(){Ri&&Ht===0&&hf(Ri.id)}async function Zd(i){if(H.mapPieces.includes(i)){Yt(at,Ze(Te,"toastAlready"));return}H.mapPieces.push(i),vt(localStorage,_t,H),Ge.pickup(),li(at,40),Yt(at,Ze(Te,"toastPiece",{count:Zi(H)})),Kc(H)&&setTimeout(()=>{Ge.magic(),Yt(at,`\u{1F333} ${Ze(Te,"objAssemble")}`,{duration:3600})},500),Yn(),di()}async function lo(i){if(H.clues.includes(i)){Yt(at,Ze(Te,"toastAlready"));return}H.clues.push(i),vt(localStorage,_t,H),Ge.pickup(),Yt(at,Ze(Te,"toastClue")),di(),await Qe([{who:"owl",text:Xd[i]}])}async function of(i,e=null){Ht+=1,wu();let t=qd(at);await t.cover(),Ge.door(),Og(i),e&&ue&&(ue.position.set(e[0],0,e[1]),Ng(e[0],e[1])),H.zone=i,H.flags[`visited_${i}`]=!0,H.position=e?[e[0],e[1]]:null,vt(localStorage,_t,H),t.remove(),Yn(),Ht-=1,di()}async function tw(){H.flags.gateOpen=!0,vt(localStorage,_t,H);let i=Le.colliders.indexOf(Le.gateCollider);i>=0&&Le.colliders.splice(i,1),$i=du(Le,{radius:Qi}),Ge.door(),Ge.magic();let[e,t]=Le.gateDoors,n=performance.now();function s(r){let o=Math.min(1,(r-n)/900);e.rotation.y=-o*1.9,t.rotation.y=o*1.9,e.position.x=-.79-o*.9,t.position.x=.79+o*.9,o<1&&requestAnimationFrame(s)}requestAnimationFrame(s),Yn()}function nw(){if(Yd)return;Yd=!0,H.flags.endingSeen=!0,vt(localStorage,_t,H),di(),Ht+=1,wu(),Ge.fanfare();let i=xt("div","rpg-ending");i.append(xt("div","rpg-ending-castle","\u{1F3F0}"),xt("h2","rpg-ending-title",Ze(Te,"theEnd")),xt("p","rpg-ending-text",Ze(Te,"endCard")),xt("div","rpg-ending-badge",Ze(Te,"badgeEarned")));let e=xt("button","rpg-button primary",`\u{1F3F0} ${Ze(Te,"keepExploring")}`);e.type="button",e.addEventListener("click",()=>{i.remove(),Yd=!1,Ht=Math.max(0,Ht-1),Le?.name==="woods"&&ue&&ue.position.z<-18.6&&(ue.position.z=-18.6,Mn&&(Mn.position.z=-18.2)),Yn()});let t=xt("button","rpg-button ghost",Ze(Te,"playAgain"));t.type="button",t.addEventListener("click",()=>{location.href="../index.html"});let n=xt("button","rpg-button ghost",`\u{1F504} ${Ze(Te,"restart")}`);n.type="button",n.addEventListener("click",Wg);let s=xt("div","rpg-ending-buttons");s.append(e,t,n),i.append(s),at.appendChild(i),li(at,120,2400)}async function hf(i){if(i==="finch"||i==="page"){let e=i==="finch"?"vocabFinch":"compPage",t=!H.challenges[e];if(await Qe(t?lu[i]:lu[`${i}After`]),t){let n=i==="finch"?"finch":"page";H.flags[`${i}Met`]=!0,await Zd(n),vt(localStorage,_t,H),Yn()}i==="page"&&H.flags.mapAssembled&&(H.flags.umbrellaFound&&!H.flags.umbrellaDone?(await Qe(fg),H.flags.umbrellaDone=!0,vs("umbrella",Ki.umbrella),vs("grateful",Ki.grateful),vt(localStorage,_t,H),Ge.magic(),li(at,80),Yn(),di()):!H.flags.umbrellaAsked&&!H.flags.umbrellaDone&&(await Qe(hg),H.flags.umbrellaAsked=!0,vt(localStorage,_t,H),Yn(),Yt(at,Ze(Te,"objUmbrella"),{duration:4200})));return}if(i==="board")return void Qe([{who:"owl",text:$t.board}]);if(i==="blackboard"){let e=[{en:"teacher",emoji:"\u{1F9D1}\u200D\u{1F3EB}",pt:"quem ensina"},{en:"student",emoji:"\u{1F9D2}",pt:"estudante"},{en:"class",emoji:"\u{1F46B}",pt:"turma"},{en:"book",emoji:"\u{1F4D6}",pt:"livro"},{en:"pencil",emoji:"\u270F\uFE0F",pt:"l\xE1pis"},{en:"bag",emoji:"\u{1F392}",pt:"mochila"},{en:"read",emoji:"\u{1F440}",pt:"ler"},{en:"write",emoji:"\u270D\uFE0F",pt:"escrever"},{en:"question",emoji:"\u2753",pt:"pergunta"},{en:"child",emoji:"\u{1F9D2}",pt:"crian\xE7a"},{en:"tree",emoji:"\u{1F333}",pt:"\xE1rvore"},{en:"star",emoji:"\u2B50",pt:"estrela"}],t=cf("lesson");if(t===null)return;let s=e.map((a,l)=>({l:a,i:l,streak:H.words[a.en]?.streak??-1})).sort((a,l)=>a.streak-l.streak||a.i-l.i).slice(0,3).map(a=>a.l),r=0,o=()=>{if(ho(t)===null)return;if(r>=s.length)return uf(t),vt(localStorage,_t,H),uo(),Ge.magic(),void Qe([{who:"willow",text:{pt:"Excelente aula! Essas palavras j\xE1 est\xE3o no seu di\xE1rio \u2014 a coruja vai cobrar depois, hein!",en:"Excellent class! Those words are in your journal now \u2014 the owl will quiz you later!",es:"\xA1Excelente clase! Esas palabras ya est\xE1n en tu diario \u2014 \xA1el b\xFAho te va a preguntar despu\xE9s!"}}]);let a=s[r];r+=1;let l=e.filter(h=>h.en!==a.en).sort(()=>Math.random()-.5).slice(0,2).map(h=>h.en),c=[a.en,...l].sort(()=>Math.random()-.5);Me("quizPrompt").textContent=`${a.emoji} = ?`,Na=a.en,fo(a.en),Me("quizFeedback").textContent=Ze(Te,"lessonProgress",{n:r,m:s.length});let u=Me("quizOptions");u.innerHTML="";for(let h of c){let d=document.createElement("button");d.type="button",d.textContent=h,d.addEventListener("click",()=>{ho(t)!==null&&(H.words[a.en]||vs(a.en,Ki[a.en]),h===a.en?(af(a.en),d.classList.add("correct"),Me("quizFeedback").textContent=`\u2728 ${a.en} = ${a.pt}!`,Ge.star()):(lf(a.en),d.classList.add("wrong"),Me("quizFeedback").textContent=`\u{1F423} ${a.emoji} = ${a.en}`,Ge.wrong()),setTimeout(o,1e3))}),u.appendChild(d)}Me("quizBackdrop").classList.remove("hidden"),hr("quizBackdrop")};return void o()}if(i==="willow")return void Qe([{who:"willow",text:{pt:"Bem-vindos \xE0 minha sala! A lousa est\xE1 cheia de palavras novas \u2014 toque nela e vamos praticar!",en:"Welcome to my classroom! The blackboard is full of new words \u2014 touch it and let's practice!",es:"\xA1Bienvenidos a mi sala! La pizarra est\xE1 llena de palabras nuevas \u2014 \xA1t\xF3quenla y practiquemos!"}},{gloss:"practice"}]);if(i==="chest"){let e=new Date().toDateString();return H.flags.chestDay===e?(Ge.hoot(),void Qe([{who:"owl",text:{pt:"O ba\xFA est\xE1 dormindo. Volte amanh\xE3 \u2014 tesouros precisam de descanso!",en:"The chest is sleeping. Come back tomorrow \u2014 treasure needs rest!",es:"El cofre est\xE1 durmiendo. \xA1Vuelve ma\xF1ana \u2014 el tesoro necesita descanso!"}}])):(H.flags.chestOpened=!0,H.flags.chestDay=e,vs("treasure",Ki.treasure),vs("sparkle",Ki.sparkle),vs("secret",Ki.secret),vt(localStorage,_t,H),uo(),Ge.magic(),li(at,140),void Qe([{who:"owl",text:{pt:"Um tesouro! Moedas douradas, uma pena brilhante e\u2026 palavras m\xE1gicas novas no seu di\xE1rio! \u2728",en:"A treasure! Golden coins, a shiny feather and\u2026 new magic words for your journal! \u2728",es:"\xA1Un tesoro! Monedas doradas, una pluma brillante y\u2026 \xA1palabras m\xE1gicas nuevas para tu diario! \u2728"}},{gloss:"treasure"},{gloss:"sparkle"},{gloss:"secret"}]))}if(i==="baker")return void Qe([{who:"baker",text:{pt:"Bem-vindas \xE0 padaria da High Street! O p\xE3o de canela sai quentinho \xE0s cinco.",en:"Welcome to the High Street bakery! The cinnamon buns come out warm at five.",es:"\xA1Bienvenidas a la panader\xEDa de High Street! El pan de canela sale calentito a las cinco."}},{gloss:"warm"}]);if(i==="raven")return Object.keys(H.words).length<3?void Qe([{who:"raven",text:{pt:"Sou a Prof. Raven, da Academia Owlburt. Duelo de feiti\xE7os? Primeiro aprendam 3 palavras com a coruja. Voltem quando o di\xE1rio estiver cheio!",en:"I am Prof. Raven, from Owlburt Academy. A spell duel? First learn 3 words with the owl. Come back when your journal is full!",es:"Soy la Prof. Raven, de la Academia Owlburt. \xBFUn duelo de hechizos? Primero aprendan 3 palabras con el b\xFAho. \xA1Vuelvan cuando el diario est\xE9 lleno!"}}]):void Qe([{who:"raven",text:{pt:"Ent\xE3o voc\xEAs querem o Duelo de Feiti\xE7os? Tr\xEAs perguntas, duas certas pra vencer. preparem-se!",en:"So you want the Spell Duel? Three questions, two right to win. Get ready!",es:"\xBFQuieren el Duelo de Hechizos? Tres preguntas, dos aciertos para ganar. \xA1Prep\xE1rense!"}}]).then(()=>$M());if(i==="signTree")return Ge.hoot(),void Qe([{who:"owl",text:$t.signTree},{gloss:"golden"}]);if(i==="duel")return void hf("raven");if(i==="marker")return void Qe([{who:"owl",text:$t.marker},{gloss:"ancient"}]);if(i==="pieceShelf")return void Zd("shelf");if(i==="pieceTrolley")return void Zd("trolley");if(i==="clueTable")return lo("libraryTable"),void Qe([{who:"owl",text:$t.clueTable},{gloss:"curious"}]);if(i==="clueOak")return lo("oak"),void Qe([{who:"owl",text:$t.clueOak},{gloss:"roots"}]);if(i==="clueBench")return void lo("benchPoster");if(i==="clueChalk")return void lo("chalkNote");if(i==="clueScroll")return void lo("duelScroll");if(i==="bookshop")return Ge.hoot(),void Qe([{who:"owl",text:$t.bookshop},{gloss:"story"}]);if(i==="postOffice")return Ge.hoot(),void Qe([{who:"owl",text:$t.postOffice},{gloss:"letter"}]);if(i==="teaRoom")return Ge.hoot(),void Qe([{who:"owl",text:$t.teaRoom},{gloss:"tea"}]);if(i==="orderStart"){if(H.flags.orderDone)return void Qe([{who:"page",text:$t.orderDone}]);if(H.flags.orderStarted){if(["orderMint","orderBun","orderFeather"].filter(s=>H.flags[s]).length===3)return H.flags.orderDone=!0,vt(localStorage,_t,H),Ge.magic(),li(at,100),void Qe([{who:"page",text:{pt:"Menta, p\xE3o de canela e uma pena azul \u2014 ch\xE1 perfeito! Obrigada, queridas. You are so kind!",en:"Mint, a cinnamon bun and a blue feather \u2014 perfect tea! Thank you, dears. You are so kind!",es:"\xA1Menta, pan de canela y una pluma azul \u2014 t\xE9 perfecto! Gracias, queridos. You are so kind!"}},{gloss:"kind"}]);let t=["orderMint","orderBun","orderFeather"].filter(s=>!H.flags[s]),n={orderMint:{pt:"menta na mata",en:"mint in the woods",es:"menta en el bosque"},orderBun:{pt:"p\xE3o de canela na padaria",en:"a cinnamon bun at the bakery",es:"pan de canela en la panader\xEDa"},orderFeather:{pt:"a pena azul perto do carvalho",en:"the blue feather by the oak",es:"la pluma azul junto al roble"}};return void Qe([{who:"page",text:{pt:`Ainda falta: ${t.map(s=>n[s].pt).join(", ")}.`,en:`Still missing: ${t.map(s=>n[s].en).join(", ")}.`,es:`Todav\xEDa falta: ${t.map(s=>n[s].es).join(", ")}.`}}])}return H.flags.orderStarted=!0,vt(localStorage,_t,H),void Qe([{who:"page",text:{pt:"Minhas queridas, meu ch\xE1 das cinco precisa de tr\xEAs coisinhas: menta fresca na mata, um p\xE3o de canela da padaria da High Street e uma pena azul do carvalho. Podem trazer?",en:"My dears, my five-o-clock tea needs three little things: fresh mint in the woods, a cinnamon bun from the High Street bakery and a blue feather from the oak. Could you fetch them?",es:"Mis queridos, mi t\xE9 de las cinco necesita tres cositas: menta fresca en el bosque, un pan de canela de la panader\xEDa de High Street y una pluma azul del roble. \xBFTraen?"}},{gloss:"fetch"}])}for(let[e,t,n,s]of[["orderMint","menta fresca!","fresh mint!","\xA1menta fresca!"],["orderBun","p\xE3o de canela quentinho!","a warm cinnamon bun!","\xA1pan de canela calentito!"],["orderFeather","uma pena azul brilhante!","a shiny blue feather!","\xA1una pluma azul brillante!"]])if(i===e){if(H.flags[e])return;H.flags[e]=!0,vt(localStorage,_t,H),Ge.pickup(),li(at,40);let r=["orderMint","orderBun","orderFeather"].filter(o=>H.flags[o]).length;return void Qe([{who:"owl",text:{pt:`Achamos: ${t} \u2014 ${r} de 3!`,en:`We found: ${n} \u2014 ${r} of 3!`,es:`\xA1Encontramos: ${s} \u2014 3 de 3!`}}])}if(i==="umbrellaSpot")return H.flags.umbrellaAsked?H.flags.umbrellaDone?void Qe([{who:"owl",text:{pt:"A Sra. Page j\xE1 guardou o guarda-chuva. Chuva pode vir! \u2602\uFE0F",en:"Ms Page already put the umbrella away. Rain can come! \u2602\uFE0F",es:"\xA1La Sra. Page ya guard\xF3 el paraguas! \xA1Puede llover! \u2602\uFE0F"}}]):(Ge.pickup(),li(at,50),void Qe(dg).then(()=>{H.flags.umbrellaFound=!0,vt(localStorage,_t,H),Yt(at,Ze(Te,"objUmbrella"),{duration:4200})})):void Qe([{who:"owl",text:{pt:"Isso n\xE3o \xE9 nosso\u2026 um guarda-chuva roxo da Sra. Page. Mas ela est\xE1 na escola \u2014 leve de volta!",en:"This is not ours\u2026 it is Ms Page\u2019s purple umbrella. But she is at school \u2014 take it back to her!",es:"Esto no es nuestro\u2026 es el paraguas morado de la Sra. Page. \xA1Devu\xE9lveselo!"}},{gloss:"umbrella"}]);if(i==="playground")return Ge.hoot(),void Qe([{who:"owl",text:$t.playground},{gloss:"swing"}]);if(i==="garden")return Ge.hoot(),void Qe([{who:"owl",text:$t.garden},{gloss:"greenhouse"}]);if(i==="field")return Ge.hoot(),void Qe([{who:"owl",text:$t.field},{gloss:"pitch"}]);if(i==="woodCafe")return Ge.hoot(),void Qe([{who:"owl",text:$t.cafe},{gloss:"meadow"},{gloss:"hill"}]);if(i==="severndroog")return Ge.hoot(),void Qe([{who:"owl",text:$t.severndroog},{gloss:"castle"}]);if(i==="pond")return Ge.hoot(),void Qe([{who:"owl",text:$t.pond},{gloss:"pond"}]);if(i==="greenChain")return Ge.hoot(),void Qe([{who:"owl",text:$t.greenChain},{gloss:"path"}]);if(i==="outdoorGym")return Ge.hoot(),void Qe([{who:"owl",text:$t.outdoorGym},{gloss:"climb"}]);if(i==="clueTimetable")return void lo("timetable");if(i==="sports"){if(H.challenges.sportsChoice)return void Qe([{who:"owl",text:$t.sports}]);await Gg({prompt:{pt:"Welling FC joga contra quem no s\xE1bado?",en:"Who does Welling FC play on Saturday?",es:"\xBFContra qui\xE9n juega Welling FC el s\xE1bado?"},options:[{label:{pt:"Welling United",en:"Welling United",es:"Welling United"}},{label:{pt:"Manor Park Rangers",en:"Manor Park Rangers",es:"Manor Park Rangers"},correct:!0},{label:{pt:"The Moon",en:"The Moon",es:"La Luna"}}],success:{pt:"Isso! Welling FC 2 \xD7 1 Manor Park Rangers. E o ch\xE1 de domingo fica por nossa conta!",en:"That\u2019s right! Welling FC 2\u20131 Manor Park Rangers. And Sunday tea is on us!",es:"\xA1Correcto! Welling FC 2\u20131 Manor Park Rangers. \xA1Y el t\xE9 del domingo corre por nuestra cuenta!"},fail:{pt:"Quase! O advers\xE1rio \xE9 o Manor Park Rangers. De novo:",en:"Almost! The opponents are Manor Park Rangers. Again:",es:"\xA1Casi! Los rivales son Manor Park Rangers. Otra vez:"}})&&(H.challenges.sportsChoice=!0,vt(localStorage,_t,H),Ge.magic(),vs("pitch",Ki.pitch),li(at,50),Yn(),di());return}if(i==="ivyDoor"){if(!Kc(H))return Ge.hoot(),void Qe([{who:"owl",text:{pt:`Ainda faltam partes do mapa! Temos ${Zi(H)} de 4.`,en:`We still need map pieces! We have ${Zi(H)} of 4.`,es:`\xA1Todav\xEDa faltan partes del mapa! Tenemos ${Zi(H)} de 4.`}}]);if(!H.flags.mapAssembled){await Qe(lu.assemble),H.challenges.fractionMap&&(H.flags.mapAssembled=!0,vt(localStorage,_t,H),Ge.magic(),li(at,80),await of("woods"));return}return void of("woods")}if(i.startsWith("stone")){let e=Number(i.replace("stone","")),t=Le.stones.find(n=>n.number===e);if(H.flags.stonesCrossed)return;if(Gm(e)){Ge.magic(),H.flags.stonesCrossed=!0,vt(localStorage,_t,H);let n=Le.colliders.indexOf(Le.streamCollider);n>=0&&Le.colliders.splice(n,1),$i=du(Le,{radius:Qi});let s=qd(at);await s.cover(),ue.position.z=-2.6,Mn.position.z=-2,H.position=[ue.position.x,ue.position.z],s.remove(),Yn(),Yt(at,`\u2728 ${un({pt:"Pedra certa! Atravessaram o leito do riacho.",en:"Right stone! You crossed the stream bed.",es:"\xA1Piedra correcta! Cruzaron el lecho del arroyo."},Te)}`)}else{let r=function(o){let a=(o-n)/600;t.mesh.rotation.x=s+Math.sin(a*14)*.12*Math.max(0,1-a),a<1?requestAnimationFrame(r):t.mesh.rotation.x=s};Ge.wrong();let n=performance.now(),s=t.mesh.rotation.x;requestAnimationFrame(r),Yt(at,Ze(Te,"hintCross"),{duration:3200})}return}if(i==="gate"){H.flags.gateOpen?Qe([{who:"owl",text:{pt:"O port\xE3o est\xE1 aberto. A High Street fica do outro lado \u2014 e a Academia Owlburt logo depois\u2026",en:"The gate is open. The High Street is just outside \u2014 and Owlburt Academy right after\u2026",es:"El port\xF3n est\xE1 abierto. La High Street queda afuera \u2014 y la Academia Owlburt justo despu\xE9s\u2026"}},{gloss:"gate"}]):await tw();return}}function iw(){return new Promise(i=>{let e=xt("div","rpg-select");e.appendChild(xt("h2","rpg-select-title",Ze(Te,"chooseCharacter")));let t=xt("div","rpg-select-row");e.appendChild(t);for(let n of jc){let s=xt("button","rpg-select-card");s.type="button",s.append(xt("div","rpg-select-emoji",n.emoji),xt("div","rpg-select-name",n.id==="ivy"?"Ivy":"Oakley"),xt("p","rpg-select-desc",Ze(Te,n.id==="ivy"?"characterIvy":"characterOakley"))),s.addEventListener("click",()=>{Ge.tap(),e.remove(),Ht-=1,i(n.id)}),t.appendChild(s)}at.appendChild(e),Ht+=1})}var Aa=0,Oa=1,_u=.55,sw=11.2,rw=.22,ow=1.15,aw=.55,lw=2.2,Dg=new L;function qg(){requestAnimationFrame(qg);let i=Math.min(.05,Kd.getDelta()),e=Kd.elapsedTime;Ht>0&&on&&Ji();let[t,n]=Ht>0?[0,0]:UM(),s=Math.hypot(t,n)>.05,r=0,o=0,a=!1,l=s;if(s){Ji();let c=Math.cos(Aa),u=Math.sin(Aa);a=Math.hypot(t,n)>.92;let h=3.8*(a?1.55:1);r=(t*c+n*u)*h*i,o=(-t*u+n*c)*h*i}else if(on&&ue&&_s.length){let c=_s[bs]||on,u=Math.hypot(on.x-ue.position.x,on.z-ue.position.z);if(Math.hypot(c.x-ue.position.x,c.z-ue.position.z)<.35&&(bs<_s.length-1?(bs+=1,c=_s[bs]):(Ji(),c=null)),c){a=u>3;let h=3.8*(a?1.55:1),d=c.x-ue.position.x,f=c.z-ue.position.z,g=Math.max(1e-4,Math.hypot(d,f)),x=Math.min(g,h*i);r=d/g*x,o=f/g*x,l=!0}}if(ue){let[c,u]=Ig(ue.position.x,ue.position.z,r,o),h=Math.hypot(c-ue.position.x,u-ue.position.z);if(on&&h<.001&&(r||o)){let M=Math.atan2(r,o);for(let v of[.6,-.6,1.2,-1.2,2.1,-2.1]){let T=Math.sin(M+v),A=Math.cos(M+v),[R,I]=Ig(ue.position.x,ue.position.z,T*.06,A*.06);if(Math.hypot(R-ue.position.x,I-ue.position.z)>.001){c=R,u=I,h=Math.hypot(c-ue.position.x,u-ue.position.z);break}}}if($i&&!lr($i,ue.position.x,ue.position.z)){let M=Mg($i,ue.position.x,ue.position.z);M&&(c=M.x,u=M.z,h=Math.hypot(c-ue.position.x,u-ue.position.z))}if(ue.position.set(c,0,u),on){if(h<.001){if(co+=i,co>.6){$d+=1;let M=$d<=2?Ug(on):null;M?(_s=M,bs=M.length>1?1:0,co=0):(Ji(),Ge.wrong(),Yt(at,Ze(Te,"noPath"),{duration:2200}))}}else co=0;on&&Math.hypot(on.x-ue.position.x,on.z-ue.position.z)<.25&&Ji()}if(jd-=i,l&&h>5e-4&&jd<=0&&(Em(Le?.name||"school"),jd=a?.28:.4),l&&h>5e-4){let v=Math.atan2(r,o)-ue.rotation.y;for(;v>Math.PI;)v-=Math.PI*2;for(;v<-Math.PI;)v+=Math.PI*2;ue.rotation.y+=v*Math.min(1,i*12)}let d=cr?0:l?a?2:1:0;ue.userData.animate?.(e,d);let f=cr?.6:e*1.5;Ca.position.set(ue.position.x+Math.cos(f)*.85,1.85+(cr?0:Math.sin(e*2.2)*.1),ue.position.z+Math.sin(f)*.85),Ca.rotation.y=-f+Math.PI/2,Ca.userData.animate?.(e,cr?0:l?1:0);let g=Mn.position.distanceTo(ue.position);if(g>1.05){let M=ue.position.clone().sub(Mn.position).normalize(),v=g>3,T=Math.min(g-.95,(v?7:4.6)*i);Mn.position.addScaledVector(M,T),Mn.rotation.y=Math.atan2(M.x,M.z),Mn.userData.animate?.(e,cr?0:v?2:1)}else Mn.userData.animate?.(e,0);fu.userData.animate?.(e,cr?0:g>2);for(let M of Object.keys(Pa))Pa[M]?.userData.animate?.(e,0);let x=sw*Oa,m=x*Math.cos(_u),p=new L(Math.sin(Aa)*m,x*Math.sin(_u),Math.cos(Aa)*m);hi.position.lerp(new L().copy(ue.position).add(p),1-Math.exp(-i*5)),Dg.set(ue.position.x,.6,ue.position.z),hi.lookAt(Dg);let b=Rt.userData.sun;b&&(b.position.set(ue.position.x+Le.sun.pos[0]*.5,Le.sun.pos[1]*.75,ue.position.z+Le.sun.pos[2]*.5),b.target.position.set(ue.position.x,0,ue.position.z))}if(Ri=null,Ht===0&&ue){let c=1/0;for(let u of Le.interactables){if(u.id.startsWith("stone")&&H.flags.stonesCrossed)continue;let h=Math.hypot(u.x-ue.position.x,u.z-ue.position.z);h<=u.radius&&h<c&&(c=h,Ri=u)}if(Le?.name==="woods"&&H.flags.gateOpen&&!H.flags.endingSeen&&ue.position.z<-19&&nw(),Ht===0&&performance.now()>=Qd)for(let u of Le.exits||[]){let h=Math.hypot(u.x-ue.position.x,u.z-ue.position.z),d=`${u.target}:${u.x}:${u.z}`;if(h>u.radius){Ia.delete(d);continue}if(u.flag&&!H.flags[u.flag]){performance.now()-Ag>4e3&&(Ag=performance.now(),Yt(at,un({pt:"\u{1F512} O port\xE3o secreto ainda est\xE1 fechado \u2014 procure outro caminho!",en:"\u{1F512} The secret gate is still closed \u2014 find another way!",es:"\u{1F512} La puerta secreta sigue cerrada \u2014 \xA1busquen otro camino!"},Te),{duration:3200}));continue}if(!Ia.has(d)){Ia.add(d),Qd=performance.now()+2500,of(u.target,u.spawn);break}}}if(Ri){let u={...PM}[Ri.id];if(Ri.id.startsWith("stone")){let h=Number(Ri.id.replace("stone",""));u={pt:`\u{1FAA8} Pisar na pedra ${h}`,en:`\u{1FAA8} Step on stone ${h}`,es:`\u{1FAA8} Pisar la piedra ${h}`}}ew(un(u,Te)),Ms.visible=!0,Ms.position.set(Ri.x,.06,Ri.z),Ms.scale.setScalar(1+.08*Math.sin(e*4))}else wu(),Ms.visible=!1;ws&&(ws.visible=!!on,on&&(ws.position.set(on.x,.05,on.z),ws.scale.setScalar(cr?1:1+.15*Math.sin(e*6)))),Le?.update?.(i,e),qn.render()}function cw(){for(let i of document.querySelectorAll("[data-i18n]"))i.innerHTML=Ze(Te,i.dataset.i18n);for(let i of document.querySelectorAll("[data-i18n-aria]"))i.setAttribute("aria-label",Ze(Te,i.dataset.i18nAria,Yg(i)));document.documentElement.lang=Te}function Yg(i){let e={};try{e=JSON.parse(i.dataset.i18nVars||"{}")||{}}catch{e={}}return i.id==="langButton"&&(e.lang=Te.toUpperCase()),i.id==="hintButton"&&(e.n=nr(H.words).length),e}function df(){let i=Me("soundButton");i&&(i.setAttribute("aria-pressed",String(!!H.sound)),i.setAttribute("aria-label",Ze(Te,H.sound?"soundOn":"soundOff")));for(let e of document.querySelectorAll("[data-i18n-aria]"))(e.id==="langButton"||e.id==="hintButton")&&e.setAttribute("aria-label",Ze(Te,e.dataset.i18nAria,Yg(e)))}function uw(i){let e=Math.round(Math.max(0,Math.min(1,i))*100),t=Me("bootFill"),n=Me("bootPct");t&&(t.style.width=`${e}%`),n&&(n.textContent=`${e}%`)}eg(uw);function hw(){let i=Me("boot");i&&(i.classList.add("done"),setTimeout(()=>i.remove(),600))}async function dw(){try{LM()}catch{Me("fatal").textContent=Ze(Te,"webglFail"),Me("fatal").classList.add("show");return}qh(!H.sound),cw(),df(),ps(),window.addEventListener("pointerdown",()=>ps(),{once:!0}),Yn();let i=tg();H.character||(H.character=await iw()),vt(localStorage,_t,H),di({silent:!0});try{await i}catch(e){console.warn("Falha ao carregar modelos 3D externos; usando fallback procedural.",e),location.protocol==="file:"&&Yt(at,"\u26A0\uFE0F Abra pelo jogar.sh \u2014 o navegador bloqueia os modelos 3D no modo arquivo.",6e3)}hw(),Og(H.zone),qg(),!H.flags.introSeen&&!Ra&&(await new Promise(e=>{_g(at,ug.map(t=>({...t,text:un(t.text,Te)})),{next:Ze(Te,"next"),skip:Ze(Te,"skip"),done:Ze(Te,"start"),onDone:e})}),H.flags.introSeen=!0,vt(localStorage,_t,H)),Ra||window.setInterval(()=>{ue&&Ht===0&&!Jd&&(H.position=[ue.position.x,ue.position.z],vt(localStorage,_t,H))},4e3),window.addEventListener("beforeunload",()=>{ue&&!Ra&&!Jd&&(H.position=[ue.position.x,ue.position.z],vt(localStorage,_t,H))})}window.__rpgWelling={position:()=>ue?[ue.position.x,ue.position.z]:null,setPos:(i,e)=>{ue&&ue.position.set(i,0,e)},state:()=>H,debug:()=>({zone:Le?.name,overlay:Ht,moveTarget:on,path:_s.map(i=>[+i.x.toFixed(2),+i.z.toFixed(2)]),pathIndex:bs,cooldown:Math.max(0,(Qd-performance.now())/1e3),gateOpen:!!H.flags.gateOpen,exits:Le?.exits,lastGoal:pu&&{x:+pu.x.toFixed(2),z:+pu.z.toFixed(2)},colliders:Le?.colliders?.length,colliderBoxes:()=>Le?.colliders?.map(i=>[+i.minX.toFixed(2),+i.minZ.toFixed(2),+i.maxX.toFixed(2),+i.maxZ.toFixed(2)])}),interact:i=>hf(i),kids:()=>[ue,Mn].map(i=>i&&{pos:i.position.toArray().map(e=>+e.toFixed(2)),visible:i.visible,scale:i.scale.toArray(),children:i.children.map(e=>e.type)})};dw();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
