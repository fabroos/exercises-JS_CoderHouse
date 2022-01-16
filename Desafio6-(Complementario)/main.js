let {Search} = JSON.parse(moviesJSON);
const movies = Search
console.log(movies);

const compare = (a, b, k)=>{
    if(typeof a === 'string') {
        a.toUpperCase();
        b.toUpperCase()
    }
    if(a[k] < b[k]) return -1;
    else if(a[k] > b[k]) return 1;
    else return 0
}

// Keys para usar:  
//                - Title
//                - Year

function orderBy(arr, key){
    let newArr = [...arr]
    return newArr.sort((a, b)=>compare(a, b, key))
}


console.log(orderBy(movies, "Title"))
console.log(orderBy(movies, "Year"))