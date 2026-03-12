let students=[
    { name: "Nguyễn Văn A", score: 8.6 },
    { name: "Trần Văn B", score: 7.5 },
    { name: "Lê Thị C", score: 6.2 },
    { name: "Nguyễn Văn D", score: 4.5 },
    { name: "Phạm Văn E", score: 9.1 }
]
function getRank(score){
if(score>=8.5) return "Giỏi"
if(score>=7) return "Khá"
if(score>=5) return "Trung bình"
return "Yếu"
}
document.getElementById("score").addEventListener("keypress",function(e){
if(e.key==="Enter"){
document.getElementById("addBtn").click()
}
})
document.getElementById("addBtn").onclick=function(){

let name=document.getElementById("name").value.trim()
let score=Number(document.getElementById("score").value)
if(name===""||score<0||score>10){
alert("Dữ liệu không hợp lệ")
return
}
students.push({name,score})
renderTable()
}
function renderTable(){
let tbody=document.getElementById("tableBody")
tbody.innerHTML=""
students.forEach((sv,i)=>{
let tr=document.createElement("tr")
if(sv.score<5) tr.classList.add("low")
tr.innerHTML=`

<td>${i+1}</td>
<td>${sv.name}</td>
<td>${sv.score}</td>
<td>${getRank(sv.score)}</td>
<td><button data-index="${i}">Xóa</button></td>
`
tbody.appendChild(tr)
})

let stats=document.getElementById("stats")
let total=students.length
let avg=0
if(total>0){
avg=students.reduce((sum,sv)=>sum+sv.score,0)/total
}
stats.textContent=`Tổng sinh viên: ${total} | Điểm trung bình: ${avg.toFixed(2)}`
}
document.getElementById("tableBody").onclick=function(e){
if(e.target.tagName==="BUTTON"){
let index=e.target.dataset.index
students.splice(index,1)
renderTable()
} 
} 
let keyword = ""; 
let filterRank = "all"; 
let sortAsc = true;

function applyFilters(){
let filteredStudents = [...students]

/* tìm kiếm */

if(keyword){
filteredStudents = filteredStudents.filter(s =>
s.name.toLowerCase().includes(keyword)
)
}

/* lọc */

if(filterRank !== "all"){
filteredStudents = filteredStudents.filter(s =>
getRank(s.score) === filterRank
)
}

/* sắp xếp */

filteredStudents.sort((a,b)=>{
return sortAsc ? a.score - b.score : b.score - a.score
})

renderFilteredTable(filteredStudents)
}

function renderFilteredTable(list){
let tbody=document.getElementById("tableBody")
tbody.innerHTML=""

list.forEach((sv,i)=>{
let tr=document.createElement("tr")
if(sv.score<5) tr.classList.add("low")

tr.innerHTML=`
<td>${i+1}</td>
<td>${sv.name}</td>
<td>${sv.score}</td>
<td>${getRank(sv.score)}</td>
`
tbody.appendChild(tr)
})
}

document.getElementById("search").addEventListener("input",function(){
keyword=this.value.toLowerCase()
applyFilters()
})

document.getElementById("filter").addEventListener("change",function(){
filterRank=this.value
applyFilters()

})

document.getElementById("sortScore").addEventListener("click",function(){
sortAsc=!sortAsc
applyFilters()
})

applyFilters()