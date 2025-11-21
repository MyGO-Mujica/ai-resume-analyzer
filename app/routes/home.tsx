import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { useEffect, useState } from "react";
import {  useNavigate, Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MyGo" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
 const { auth, kv} = usePuterStore();
 const navigate = useNavigate();
 const [resumes, setResumes] = useState<Resume[]>([]);
 const [LoadingResume, setLoadingResume] = useState(false);
  /**
   * 路由守卫 - 保护需要登录的页面
   * 
   * 功能说明：
   * 1. 检查用户是否已登录（auth.isAuthenticated）
   * 2. 如果未登录，重定向到登录页 /auth
   * 3. 在 URL 中保存当前页面路径（next=/），登录后可跳转回来
   * 
   * 工作流程：
   * - 用户未登录访问首页
   * - 自动跳转到 /auth?next=/
   * - 用户登录成功后，auth 页面会读取 next 参数并跳转回首页
   * 
   * 依赖监听：
   * - auth.isAuthenticated 变化时重新检查
   */
  
   useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])

   useEffect(() => {
    const loadResumes = async () => {
      setLoadingResume(true);

      const resumes = (await kv.list( 'resume:*',true)) as KVItem[]

      const parsedResumes = resumes?.map(resume => (
          JSON.parse(resume.value) as Resume
      ))
      console.log('parsedResumes', parsedResumes);
      setResumes(parsedResumes || []);
      setLoadingResume(false);
    }
    loadResumes();
  }, []);
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar></Navbar>
    <section className="main-section">
      <div className="page-heading py-16">
        <h1> 跟踪您的申请和简历评分</h1>
        {!LoadingResume && resumes.length === 0 ?(
          <h2 className="text-gray-500 mt-4">您还没有提交任何简历，快去上传第一份简历吧！</h2>
        ):(
            <h2>审核提交内容并查看ai评分结果</h2>
        )}
        </div>
        {LoadingResume && (
          <div className="flex flex-col items-center justify-center">
              <img src="/images/resume-scan-2.gif" alt="Loading..." className="w-[200px]" />
          </div>
        )}

       {!LoadingResume && resumes.length > 0 && (
    <div className="resumes-section">
      {resumes.map((resume) => (
        <ResumeCard key={resume.id} resume={resume}></ResumeCard>
     ))}
    </div>
  )}
    {!LoadingResume && resumes.length === 0 && (
      <div className="flex flex-col items-center justify-center mt-10 gap-4">
        <Link to="/upload" className="primary-button w-fit text-xl font-semibold"
        >上传第一份简历
        </Link>
        </div>
    )}
    </section>
  </main>
}
