async function generateSite(){
 let status=document.getElementById("status");
 status.innerText="Generating site...";
 let file=document.getElementById("logoFile").files[0];
 let base64="";
 if(file){
   base64=await toBase64(file);
 }
 let data={
  name:document.getElementById("name").value,
  ticker:document.getElementById("ticker").value,
  desc:document.getElementById("desc").value,
  address:document.getElementById("address").value,
  logo:base64,
  theme:document.getElementById("theme").value,
  twitter:document.getElementById("twitter").value,
  telegram:document.getElementById("telegram").value,
  buy:document.getElementById("buy").value
 };
 let res=await fetch("/api/generate",{method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify(data)});
 let json=await res.json();
 if(json.success){
   status.innerHTML=`Done! <a href="${json.url}" target="_blank">View Site</a>`;
 }else status.innerText="Error: "+json.error;
}

function toBase64(file){
 return new Promise((resolve,reject)=>{
   let reader=new FileReader();
   reader.readAsDataURL(file);
   reader.onload=()=>resolve(reader.result);
   reader.onerror=e=>reject(e);
 });
}