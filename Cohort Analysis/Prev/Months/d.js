function getUnits(dt) {
    dt = new Date(dt);
    dt.setDate(dt.getDate() + 1);
    var D = (Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()) - Date.UTC(dt.getFullYear(), 0, 0)) / (24 * 60 * 60 * 1000);
    var W = Math.ceil( Math.floor((dt - new Date(dt.getFullYear(), 0, 1)) / (24 * 60 * 60 * 1000)) / 7);
    if ((parseInt(dt.toISOString().substring(8, 10))) == 1) {
      var M = dt.getMonth() + 2;
    } else {
      var M = dt.getMonth() + 1;
    }
    return { 'D': D, 'W': W, 'M': M };
}

obj = [
    {'First Event Date': '2021-09-01', 'Second Event Date': '2021-09-01', firstcount: 128, secondcount: 1},
    {'First Event Date': '2021-09-01', 'Second Event Date': '2021-09-02', firstcount: 1, secondcount: 3 },
    {'First Event Date': '2021-09-01', 'Second Event Date': '2021-09-05', firstcount: 1, secondcount: 0 },
    {'First Event Date': '2021-09-01', 'Second Event Date': '2021-09-11', firstcount: 1, secondcount: 0 },
    {'First Event Date': '2021-09-01', 'Second Event Date': '2021-09-12', firstcount: 1, secondcount: 0 },
    
    {'First Event Date': '2021-10-02', 'Second Event Date': '2021-10-02', firstcount: 4, secondcount: 4 },
    {'First Event Date': '2021-10-02', 'Second Event Date': '2021-11-05', firstcount: 2, secondcount: 1 },
        
    {'First Event Date': '2021-11-05', 'Second Event Date': '2021-11-05', firstcount: 4, secondcount: 4},
    {'First Event Date': '2021-11-06', 'Second Event Date': '2021-12-06', firstcount: 4, secondcount: 4}
];

var keys = Object.keys(obj);
var arr=[];
var fin=[];
for (var i = 0; i < keys.length; i++) {
  if(arr.indexOf(`${getUnits(obj[i]['First Event Date']).M}-${getUnits(obj[i]['Second Event Date']).M}`) == -1 ){
    arr.push(`${getUnits(obj[i]['First Event Date']).M}-${getUnits(obj[i]['Second Event Date']).M}`);
  }
}

console.log(arr);

for (var i = 0; i < arr.length; i++) {
  var d={};
  d['First Event Date']=arr[i].split("-")[0];
  d['Second Event Date']=arr[i].split("-")[1];
  d['firstcount']=0;
  d['secondcount']=0;
  fin.push(d);
}

for (var i = 0; i < keys.length; i++) {    
  for(var j = 0; j < fin.length; j++){
      if(((getUnits(obj[i]['First Event Date']).M) == fin[j]['First Event Date']) && ((getUnits(obj[i]['Second Event Date']).M) == fin[j]['Second Event Date'])){
          fin[j].firstcount+=obj[i].firstcount;
          fin[j].secondcount+=obj[i].secondcount;
      }
  }
}
console.log(fin);