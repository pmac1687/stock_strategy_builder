import React from "react";
import { FormatBold, FormatItalic, FormatUnderlined,  FormatListBulleted, FormatListNumbered, KeyboardArrowDown } from '@material-ui/icons';


function Notes(props) {

  
  return (
    <div style={{ width: '100%', height:'100%'}} class=" bg-gray-200 flex items-center justify-center px-5 py-5">
        <div style={{ position:'relative', zIndex:'9'}} class="w-full h-full max-h-6xl max-w-6xl mx-auto rounded-xl bg-white shadow-lg p-5 text-black" >
            <div class="border border-gray-200  rounded-md">
                <div class="w-full flex border-b border-gray-200 text-xl text-gray-600">
                    <button class="outline-none focus:outline-none border-r border-gray-200 w-10 h-10 hover:text-indigo-500 active:bg-gray-50" >
                        <FormatBold />
                    </button>
                    <button class="outline-none focus:outline-none border-r border-gray-200 w-10 h-10 hover:text-indigo-500 active:bg-gray-50">
                        <FormatItalic />
                    </button>
                    <button class="outline-none focus:outline-none border-r border-gray-200 w-10 h-10 mr-1 hover:text-indigo-500 active:bg-gray-50" >
                        <FormatUnderlined />
                    </button>
                    <button class="outline-none focus:outline-none border-l border-r border-gray-200 w-10 h-10 hover:text-indigo-500 active:bg-gray-50" >
                        <FormatListBulleted />
                    </button>
                    <button class="outline-none focus:outline-none border-r border-gray-200 w-10 h-10 mr-1 hover:text-indigo-500 active:bg-gray-50" >
                        <FormatListNumbered />
                    </button>
                    <button style={{ marginLeft: '65%'}}>
                        <KeyboardArrowDown />
                    </button>
                </div>
                <div style={{ position:'relative', zIndex:'9'}} class="w-full h-full">
                    <iframe title='notes'  class="w-full h-full "></iframe>
                </div>
            </div>
        </div>
    </div>
  );
}



export default Notes;