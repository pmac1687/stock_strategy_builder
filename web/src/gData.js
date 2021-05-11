
import React, { useEffect, useState } from 'react'; 
import axios from 'axios';


//const data = [];

const dataG = [
    ['-0.1016470565515406/-3','t:AUMN/588','-1:-0.07523529845125532', '-2:-0.08688235633513508','MM:-0.1016470565515406','last_p:0.7099999785423279'],
    ['-0.02029416701372888/-1','t:AUY/598','MM:-0.02029416701372888','-2:-0.07705887345706675','-3:-0.10617656146778831','last_p:4.659999847412109'],
    ['-0.4567647064433382/-1','t:AWRE/631','MM:-0.4567647064433382',-'2:-0.42211768066181854','-3:-0.38935302005094563','last_p:3.950000047683716'],
    ['-0.006969941286917997/-1','t:BANT/680','MM:-0.006969941286917997','-2:-0.005754411823171025','-3:-0.003091470250750291','last_p:0.020840000361204147'],
    ['0.01882351286271078/-1','t:BBD/691','MM:0.01882351286271078',-'2:-0.03200006344739137','-3:-0.07611768245697004','last_p:4.630000114440918'],
    ['1.7924706795636345/-3','t:BBW/702','-1:1.5948824798359595','-2:1.7534707349889427','MM:1.7924706795636345','last_p:8.380000114440918'],
    ['0.03188352453358034/-1','t:BDIC/736','MM:0.03188352453358034','-2:0.036442346739418374','-3:0.047011465929886864','last_p:0.3799999952316284']

];



const getData = async () => {  
    await axios.get(`http://localhost:5000/`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    })  
    .then((res) => {  
      //const data = JSON.parse(res.data);
      console.log(res.data)
      const data = [];
      for (let x=0;x<res.data.length;x++){
          data.push(res.data[x])
      }
      return data
    })
    .catch(err => {  
      console.log(err)  
    });  
  }  

  
// Creating the context object and passing the default values. 
const dataContext = React.createContext({
    data: getData
}); 
  
export default dataContext;
