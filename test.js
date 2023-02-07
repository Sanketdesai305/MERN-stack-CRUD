const arr = [1,2,3,4,5,4,3,2,1];

const arr1 = arr.filter((a,b,c)=>c.indexOf(a)==b)
for (var i = 0; i < arr1.length - 2; i++) {
    if(arr1[i]<arr1[i+1]){
        var temp = arr1[i];
        arr1[i] = arr1[i+1];
    }
}
console.log(arr1[i])
