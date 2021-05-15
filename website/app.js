/* Global Variables */
const API_key = "573b997938968689c02dbe6a700c5ad7";
const zipCodeField = document.getElementById("zip");
const feelingsField =document.getElementById("feelings")
const generateBtn = document.getElementById("generate");
const dateEntry = document.getElementById("date");
const tempEntry = document.getElementById("temp");
const content = document.getElementById("content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = +(d.getMonth())+1 +'/'+ d.getDate()+'/'+ d.getFullYear();

    //   add click event listener to generate button 
generateBtn.addEventListener('click', async ()=>{
   //   get th zip code value 
   zipCode = zipCodeField.value;
   //   get the feelings field value 
   feelingsValue = feelingsField.value;
        // calculate the full HTTP request URL 
   httpUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${API_key}&units=metric`;

   getWeatherTempFromAPI(httpUrl)
   .then(obj => {
       dealWithServer(obj);
         
       // calling function for updating the UI
       updateUiData(obj);
   })


   async function getWeatherTempFromAPI(httpUrl){
      // fetch data from the open weather API website
      const res = await fetch(httpUrl);
      const data = await res.json();
          
        // extracting data we want only  for updating the UI 
      const obj = {
          date : newDate,
          temp : data.main.temp,
          feelings : feelingsValue
      } 
      return obj;
   }

      // separate function for dealing with server side 
   async function dealWithServer(obj){
      ///      fetch  POST
      await fetch('/postData' , {
        method : "POST",
        credentials : "same-origin",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(obj)
      });
  
          ///////// fetch GET 
     const serverRes =  await fetch('/getWeatherInfo' , {credentials : "same-origin"});
     const serverData = await serverRes.json()
     console.log(serverData);
        
   }
     
})

  // seperate function for updating the HTML 3 DIVs for (temp , date , content)
function updateUiData(info){
  const {date , temp , feelings} = info;
  // update the date div 
  dateEntry.innerHTML = "Date: " + date;

  // update the temp div 
  tempEntry.innerHTML = "Temp: " + temp;

  // update the content entry 
  content.innerHTML = "Feelings: " + feelings ;

}

