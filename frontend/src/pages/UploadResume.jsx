import { useState } from "react";
import api from "../services/api";


function UploadResume() {


  const [file,setFile] = useState(null);

  const [loading,setLoading] = useState(false);

  const [analysis,setAnalysis] = useState(null);



  const handleUpload = async()=>{


    if(!file){

      alert("Please select Resume");

      return;

    }



    const formData = new FormData();


    formData.append(
      "file",
      file
    );



    try{


      setLoading(true);



      const res = await api.post(

        "/resume/upload",

        formData,

        {

          headers:{

            "Content-Type":
            "multipart/form-data"

          }

        }

      );



      setAnalysis(res.data);



    }

    catch(error){


      console.log(error);


      alert(

        error.response?.data?.detail ||

        "Upload failed"

      );


    }

    finally{

      setLoading(false);

    }


  };





return(


<div className="min-h-screen bg-gradient-to-br from-blue-950 to-slate-900 p-10">


<div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">


<h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">

AI Resume Analyzer

</h1>




<div className="border-2 border-dashed border-blue-400 rounded-xl p-8">


<input

type="file"

accept=".pdf,.docx"

onChange={(e)=>setFile(e.target.files[0])}

className="w-full"

/>



{

file &&

<p className="mt-3 text-green-600">

Selected: {file.name}

</p>

}


</div>




<button


onClick={handleUpload}


disabled={loading}


className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold"


>


{

loading ?

"Analyzing Resume..." :

"Upload & Analyze"

}



</button>





{

analysis &&

<div className="mt-10 space-y-5">



<h2 className="text-2xl font-bold text-gray-800">

Resume Analysis Result

</h2>



<div className="grid md:grid-cols-2 gap-5">



<div className="bg-blue-50 p-5 rounded-xl">

<p className="text-gray-500">

Resume Score

</p>


<h3 className="text-4xl font-bold text-blue-600">

{analysis.score}%

</h3>

</div>





<div className="bg-green-50 p-5 rounded-xl">


<p className="text-gray-500">

Status

</p>


<h3 className="text-xl font-bold text-green-600">

Uploaded Successfully

</h3>


</div>



</div>





<div className="bg-gray-100 p-5 rounded-xl">


<h3 className="font-bold text-xl mb-3">

Detected Skills

</h3>



<div className="flex flex-wrap gap-3">


{

analysis.skills?.map(

(skill,index)=>(


<span

key={index}

className="bg-blue-600 text-white px-4 py-2 rounded-full"


>

{skill}

</span>


)

)

}


</div>


</div>




<div className="bg-purple-50 p-5 rounded-xl">


<h3 className="font-bold">

Career Recommendation

</h3>


<p className="mt-2">

AI Based Career Analysis Completed

</p>


</div>




</div>


}



</div>


</div>


);


}


export default UploadResume;