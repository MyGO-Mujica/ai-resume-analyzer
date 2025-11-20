import { useState, type FormEvent } from "react";
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader"
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdftoimg";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";


const Upload = () => {
const { auth, isLoading, fs, ai, kv } = usePuterStore();
const navigate = useNavigate();
const [isProcessing, setIsProcessing] = useState(false);
const [statusText, setStatusText] = useState('');
const [file, setFile] = useState<File | null>(null);


const handleFileSelect = (file: File | null) => {
  setFile(file);
}

/**
 * 简历分析处理函数
 * 
 * 完整流程：
 * 1. 上传 PDF 简历文件到云端存储
 * 2. 将 PDF 转换为图片（用于预览展示）
 * 3. 上传图片到云端存储
 * 4. 生成唯一 ID 并保存简历基本信息到 KV 存储
 * 5. 调用 AI 分析简历内容
 * 6. 解析并保存 AI 反馈结果
 * 7. 跳转到简历详情页
 * 
 * @param companyName - 目标公司名称
 * @param jobTitle - 申请职位名称
 * @param jobDescription - 职位描述
 * @param file - 用户上传的 PDF 简历文件
 */
const handleAnalyze = async ( companyName: string, jobTitle: string, jobDescription: string, file: File) => {
  setIsProcessing(true);
  setStatusText('正在上传简历...');

  // 步骤 1: 上传 PDF 文件到 Puter 云存储
  const uploadedFile = await fs.upload([file]);

  if(!uploadedFile) return setStatusText('文件上传失败');

  // 步骤 2: 将 PDF 转换为图片（用于在 UI 中显示简历预览）
  setStatusText('正在转换为图片...')
  const imageFile = await convertPdfToImage(file);
  console.log(imageFile);
  
  if(!imageFile.file) return setStatusText('PDF转换为图片失败');

  // 步骤 3: 上传简历图片到云端
  setStatusText('上传简历图片...')

  const uploadedImage = await fs.upload([imageFile.file]);
  if(!uploadedImage) return setStatusText('图片上传失败');

  // 步骤 4: 生成唯一标识符并准备数据
  setStatusText('准备数据中...')
  const uuid = generateUUID();
  const data = {
    id: uuid,
    resumePath: uploadedFile.path,      // PDF 文件路径
    imagePath: uploadedImage.path,       // 预览图片路径
    companyName,
    jobTitle,
    jobDescription,
    feedback:'',  // 暂时为空，等待 AI 分析结果
  }
  // 保存初始数据到 KV 存储（键值对数据库）
  await kv.set(`resume${uuid}`, JSON.stringify(data))

  // 步骤 5: 调用 AI 分析简历
  setStatusText('正在分析...')

  const feedback = await ai.feedback(
      uploadedFile.path,  // PDF 文件路径
      prepareInstructions({jobTitle, jobDescription})  // AI 提示词
  )
  if(!feedback) return setStatusText('简历分析失败...')

  // 步骤 6: 解析 AI 返回的反馈内容
  // AI 可能返回字符串或对象数组，需要统一处理
  const feedbackText = typeof feedback.message.content === 'string' 
   ? feedback.message.content
   : feedback.message.content[0].text;

  // 将 AI 反馈（JSON 字符串）解析为对象并更新数据
  data.feedback = JSON.parse(feedbackText);
  await kv.set(`resume${uuid}`, JSON.stringify(data))

  // 步骤 7: 完成分析，准备跳转
  setStatusText('分析完成！正在跳转...')
  console.log(data);
  
}
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget.closest('form');
  if(!form) return;
  const formData = new FormData(form);

  const companyName = formData.get('company-name') as string
  const jobTitle = formData.get('job-title') as string
  const jobDescription = formData.get('job-description') as string

  if(!file) return;

  handleAnalyze( companyName, jobTitle, jobDescription, file);


}


  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar></Navbar>

    <section className="main-section">
      <div className="page-heading py-12">
        <h1>为您的理想工作提供智能反馈</h1>
        {isProcessing ?(
          <>
            <h2>{statusText}</h2>
            <img src="/images/resume-scan.gif" className="w-full -mt-30" />
          </>
        ):(
          <h2>上传您的简历以获取AI的评分和改进建议</h2>
        )}
        {!isProcessing &&(
          <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
            <div className="form-div">
                <label htmlFor="company-name" >公司名称</label>
                <input type="text" name="company-name" placeholder="公司名称" id="company-name" />
            </div>

              <div className="form-div">
                <label htmlFor="job-title" >职位名称</label>
                <input type="text" name="job-title" placeholder="职位名称" id="job-title" />
            </div>

             <div className="form-div">
                <label htmlFor="job-description" >职位描述</label>
                <textarea rows={5} name="job-description" placeholder="职位描述" id="job-description" />
            </div>

             <div className="form-div">
                <label htmlFor="uploader" >上传简历</label>
                <FileUploader onFileSelect={handleFileSelect} />

            <button className="primary-button" type="submit">
                分析简历
            </button>
            </div>
          </form>
        )}
      </div>
    </section>
  </main>
}

export default Upload;