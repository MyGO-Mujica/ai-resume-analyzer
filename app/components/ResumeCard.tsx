import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({resume: {id, companyName, jobTitle, feedback, imagePath}}: {resume: Resume}) => {
  const { fs} = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState('');
  useEffect(() => {
    const loadResume = async () => {
      const blpb = await fs.read(imagePath)
      if(!blpb) return;
      const url = URL.createObjectURL(blpb);
      setResumeUrl(url);
    }
    loadResume();
  }, [imagePath])

  return <Link to ={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
     <div className="resume-card-header">
         <div className="flex flex-col gap-2">
            {companyName && <h2 className="text-black! font-bold wrap-break-words">
               {companyName}
             </h2>}
             {jobTitle && <h3 className="text-lg wrap-break-words">{jobTitle}</h3>}
             {!companyName && !jobTitle && <h2 className="text-gray-500 font-bold">未提供公司或职位信息</h2>}
         </div>
         <div className="shrink-0">
            <ScoreCircle score={feedback.overallScore}></ScoreCircle>
         </div>
     </div>
     {resumeUrl && (<div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full h-full">
                <img 
                    src={resumeUrl} 
                    alt="resume"
                    className="w-full h-[350px] max-sm:h-[250px] object-cover object-top"
                    />
          </div>
     </div>
)}
   </Link>;
}

export default ResumeCard;