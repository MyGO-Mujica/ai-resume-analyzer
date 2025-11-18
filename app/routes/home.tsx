import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import { useEffect } from "react";
import {  useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MyGo" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
 const { auth } = usePuterStore();
  
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
  const navigate = useNavigate();
   useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])


  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar></Navbar>
    <section className="main-section">
      <div className="page-heading py-16">
        <h1> 跟踪您的申请和简历评分</h1>
        <h2>审核提交内容并查看ai评分结果</h2>
      </div>

       {resumes.length > 0 && (
    <div className="resumes-section">
      {resumes.map((resume) => (
        <ResumeCard key={resume.id} resume={resume}></ResumeCard>
     ))}
    </div>
  )}
    </section>
  </main>
}
