import ScoreBadge from "./ScoreBadge";
import ScoreGauge from "./ScoreGauge";

const Category = ({ title, score }: { title: string; score: number }) => {
    const textColor = score >= 75 ? 'text-green-600' 
    : score > 49 ? 'text-yellow-600' 
    : 'text-red-600';

    return (
        <div className="resume-summary">
            <div className="category">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <p className="text-[1.2rem] ">{title}</p>
                    <ScoreBadge score={score}/>
                </div>
                <p className="text-1xl ">
                    <span className={textColor}>{score}</span>/100
                </p>
            </div>
        </div>
    );
}

const Summary = ( {feedback}: {feedback: Feedback}) => {
    return (
         <div className="bg-white rounded-2xl shadow-md w-full">
            <div className="flex flex-row items-center p-4 gap-8">
                <ScoreGauge score={feedback.overallScore} />

                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">你的简历得分</h2>
                    <p className="text-sm text-gray-500">
                      此评分由以下各项指标综合计算得出
                    </p>
                </div>
            </div>

            <Category title="语气 & 风格" score={feedback.toneAndStyle.score} />
            <Category title="内容" score={feedback.content.score} />
            <Category title="结构" score={feedback.structure.score} />
            <Category title="技术" score={feedback.skills.score} />
        </div>
    );
}
export default Summary;