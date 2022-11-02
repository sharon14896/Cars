import Car from "./CarClass.js";

const API_URL = `https://project-yarin.herokuapp.com/cars?perPage=99`
const select = document.querySelector('#id_select');
const categories=[]// משתנה גלובלי לקטגוריות מתוך בגייסון
let cars=[];
//פונקציה להתחול האפליקציה כל מה שפועל בהתחלה יעבור דרכה
const init = () => {
    doApi();// קריאה לפונקציה שעושה בקשת איפיאיי

}
//פונקציה לאירועים באפליקציה כל האזנות לאירועים יהיו בפונקציה זו
const declareEvent=()=>{
    carsFilter()
}

//בקשת api
const doApi = async() => {
    //response
    const resp = await fetch(API_URL);
    // console.log(resp);

    //data to json
    const data = await resp.json();
    //console.log(data);
    // פונקציה המייצרת קטגוריוצ וסלקס אינפוט בכדי שנוכל לפלטר בהתאם את המכוניות לפי קטגוריה
    createCategoris(data)
    //פונקציה שמרנדרת למסך כל מכונית ומכנונית 
    createCars(data)
    cars=data;
   
}


const createCars = (_arr) => {
    //שור זו נועדה לאתחל ולאפס את כל האלמנטים שבאבא בכדי שלא יווצר שכפולים 
    document.querySelector('#parent').innerHTML="";
    // for (let i = 0; i < _arr.length; i++) {
    //     const car = new Car('#parent', _arr[i].company, _arr[i].model, _arr[i].year, _arr[i].price, _arr[i].img_url, _arr[i].category);
    //     car.render()
    // }

    // _arr.forEach(item => {
    //     const car = new Car('#parent', item.company, item.model, item.year, item.price, item.img_url, item.category);
    //     car.render()
    // });

    // רץ על מערך המכוניות שהתקבל מהבקשה 
    _arr.forEach(item => {
        //מייצר לכל אחד מהפריטים של המערך אובייקט מכונית
        const car = new Car('#parent', item);
        //קורא לשיטה רנדר לפעול ולהציג לי כל מכונית על המסך 
        car.render()
    });

}

//פונקציה המייצרת קטגוריות ומייצרת סלקט אינפוט
const createCategoris=(_arr)=>{
    categories.push("All");// קטגוריה שתיג את כל המכוניות
    //רץ על בגייסון 
    _arr.forEach(item=>{
        //אם לא קיים הקטגוריה בתוך מערך הקטגוריה הגלוביל תדחוף את הקטגוריה פנימה
        if(!categories.includes(item.category))
        categories.push(item.category)//דוחף את הקטגוריה למערך הקטגוריות 
    });
   // console.log(categories);
    //רץ על מערך הקטגוריות לאחר שהוכנות מתוך הגייסון 
    categories.forEach(cat =>{
        //יוצר אלמנט אופשן אל תוך הסלקט מכל קטגוריה
        const opt = document.createElement('option')
        //ווליו הערך של האופשן
        opt.value=cat;
        //אינר היצטיאמאל מה שיוצג באופשן ויזואלית
        opt.innerHTML=cat;
        //מכניס כל אופשן שייצרנו אל תוך הסלקט
        select.append(opt)
    });
}
//פונקציה המקבלת קטגוריה ומפלטרת בהתאם את המערך לאחר מכן מרנדרת למסך את המערך המופלטר בהתאם
const carsFiltering=(_category)=>{
    let filterd=[];
    // תנאי שאם זה לא שווה לכל המכוניות או לסטרינג ריק בצע 
    if(_category!='All'&&_category!=""){
        //פילטר פונקציה מובנת בגאווה סקריפט שמפלטרת מערך לפי תנאי ומחזריה מערך חדש
        filterd = cars.filter(car=>car.category==_category)//מערך מפולטר לפי קטגוריוצ 
    }
    else//במידה ואין קטגוריה או שזה כל המכוניות
        filterd= cars//השמה של כל המכוניות למערך המפולטר
        
        //קריאה לפונקציה שמרנדרת למסך את המכוניות 
        createCars(filterd);
      //  console.log(filterd);
}
//פונקציה שמבצעת אירוע בשינוי עבור בחירת קטגוריה בסלקט בעזרת שינוי 
const carsFilter=()=>{
    //באירוע זה אני מעביר את האוונט בפונקציית קולבק 
    select.addEventListener('change',(e)=>{
   // console.log(e.target.value)
   //תפסנו את הערך של האופן בסלקט
   const category=e.target.value;
   //קריאה לפונקציה שמפלטרת את המערך של המכוניות בעזרת הקטגוריה שנבחרה
   carsFiltering(category)
})
}



init()
declareEvent()