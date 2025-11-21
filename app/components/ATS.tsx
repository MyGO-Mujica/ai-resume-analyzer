import React from 'react'

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // 根据分数确定背景渐变色
  const gradientClass = score > 69
    ? 'from-green-100'
    : score > 49
      ? 'from-yellow-100'
      : 'from-red-100';

  // 根据分数确定图标
  const iconSrc = score > 69
    ? '/icons/ats-good.svg'
    : score > 49
      ? '/icons/ats-warning.svg'
      : '/icons/ats-bad.svg';

  // 根据分数确定副标题
  const subtitle = score > 69
    ? '表现出色！'
    : score > 49
      ? '良好开端'
      : '有待提升';

  return (
    <div className={`bg-linear-to-b ${gradientClass} to-white rounded-2xl shadow-md w-full p-6`}>
      {/* 顶部图标和标题区域 */}
      <div className="flex items-center gap-4 mb-6">
        <img src={iconSrc} alt="ATS Score Icon" className="w-12 h-12" />
        <div>
          <h2 className="text-2xl font-bold">ATS Score - {score}/100</h2>
        </div>
      </div>

      {/* 描述区域 */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{subtitle}</h3>
        <p className="text-gray-600 mb-4">
          此分数反映您的简历在雇主使用的应聘者追踪系统（ATS）中的通过可能性。
        </p>

        {/* 建议列表 */}
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-3">
              <img
                src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                alt={suggestion.type === "good" ? "Check" : "Warning"}
                className="w-5 h-5 mt-1"
              />
              <p className={suggestion.type === "good" ? "text-green-700" : "text-amber-700"}>
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 结束语 */}
      <p className="text-gray-700 italic">
        持续优化您的简历，提高通过 ATS 筛选并进入招聘人员视野的机会。
      </p>
    </div>
  )
}

export default ATS