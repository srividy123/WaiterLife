    var form=document.getElementById('addForm');
    form.addEventListener('submit',addToCrud);
    
    async function addToCrud(e){
        e.preventDefault();
        let price= e.target.price.value ;
        let dish= e.target.dish.value ;
        let table= e.target.table.value;
       
        if(dish.trim() === '' ||  table.trim()===''){
            alert('Please Enter valid details');
            return
        }  
        var item={
            dish:dish,
            price:price,
            table:table
        };

        try{
            const response=await axios.post('https://crudcrud.com/api/47ef9f2a5a5e43abbe92148f394059df/items',item);
            displayOnScreen(response.data);
            e.target.price.value='';
            e.target.dish.value='';
            e.target.table.value='';
            }catch(err){
                console.log(err);
            }
    }

    function displayOnScreen(item) {
        let parentEle;
        if(`${item.table}`==='table1'){
            parentEle=document.getElementById('tb1');
        }else if(`${item.table}`==='table2'){
            parentEle=document.getElementById('tb2');
        }else if(`${item.table}`==='table3'){
            parentEle=document.getElementById('tb3');
        }
        const childEle=`<li id='${item._id}'>
                          ${item.dish}-${item.price}
                          <button onclick="deleteOrder('${item._id}')">Delete</button>
                        </li>`
        parentEle.innerHTML=parentEle.innerHTML+childEle;
        //childEle.textContent=item.price+' '+item.dish+' '+item.table;
    }

    async function deleteOrder(id){
        try{
            const response=await axios.delete(`https://crudcrud.com/api/47ef9f2a5a5e43abbe92148f394059df/items/${id}`);
            const li=document.getElementById(id);
            li.parentNode.removeChild(li);
        }catch(err){
            console.log(err);
        }
    }

    window.addEventListener('DOMContentLoaded',async()=>{
        try{
            const response=await axios.get('https://crudcrud.com/api/47ef9f2a5a5e43abbe92148f394059df/items');
            for(var i=0;i<response.data.length;i++){
                displayOnScreen(response.data[i]);
            }
        }catch(err){
            console.log(err);
        }
    })
    


     



