const form=document.querySelector("form")
const resultDiv=document.querySelector(".result")


form.addEventListener("submit",(e)=>{
e.preventDefault()
getwordInfo(form.elements[0].value);
})

const getwordInfo=async (word)=>{
try {
    resultDiv.innerHTML="Fetching Data..."
const response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
const data=await response.json()

let definitions=data[0].meanings[0].definitions[0];
resultDiv.innerHTML=`<h2><strong>Word:</strong> ${data[0].word}</h2>
<p class="PartOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
<p><strong>Meaning:</strong>${definitions.definition===undefined? "Not Found":
    definitions.definition}</p>
<p><strong>Example:</strong>${definitions.example===undefined? "Not Found":
    definitions.example}</p>

   <p><strong>Antonyms:</strong> 
`;
//Fetching Antonyms
if(definitions.antonyms.length===0){
    resultDiv.innerHTML+=`<span>Not Found </span>`
}
//else if(definitions.synonyms.length===0){
 //resultDiv.innerHTML+=`<span>Not Found </span>`
else{
    for(let i=0;i<definitions.antonyms.length;i++){
        resultDiv.innerHTML+=`<li>${definitions.antonyms[i]}</li>`
    }
}
//Adding Read me Button

resultDiv.innerHTML+=`<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`
} catch (error) {
    resultDiv.innerHTML=`<p>Sorry the word Couldn't be found</p>`
}
//console.log(error)
}