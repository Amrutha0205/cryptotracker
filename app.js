const form = document.querySelector('#searchForm');
const res = document.querySelector('#tableResult');
const cont = document.getElementById("allContaint");
var upd; 
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(upd){
        clearTimeout(upd);
    }
    const ctype = form.elements.coinType.value;
    fetchPrice(ctype);
});
function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
const fetchPrice= async(ctype) =>{
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=INR`); 
     const price = r.data.coin.price;
     const volume  = r.data.coin.volume;
     const change = r.data.coin.priceChange1d;
     const base = r.data.coin.name;
     const target = `INR`;     
    var col= "green";
    if(change<0){
        col = "red";
        }
     res.innerHTML =`<tr style="background-color:black; color:white; font-weight:700">
     <td>
         Property
     </td>
     <td>Value</td>
 </tr>
 <tr> 
     <td>
         ${base}
     </td>
     <td style="color:${col};"><span style="font-size: 1.3em;">${price}</span> ${target}</td>
 </tr>
 <tr>
     <td>
         Volume(24hrs)
     </td>
     <td>${volume}</td>
 </tr>
 <tr>
     <td>
         Change(24hrs)
     </td>
     <td style="color:${col};">${change} </td>
 </tr>`
    upd = setTimeout(()=>fetchPrice(ctype),10000);
}