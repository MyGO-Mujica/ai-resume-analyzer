import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

/**
 * Meta 函数 - 为当前路由定义页面元数据
 * 
 * 作用：
 * 1. 设置浏览器标签页标题（document.title）
 * 2. 添加 SEO 相关的 meta 标签（如 description）
 * 3. 在服务端渲染（SSR）时自动注入到 HTML <head> 中
 * 
 * 返回值：
 * - 数组，包含多个 meta 对象
 * - { title } - 设置页面标题
 * - { name, content } - 设置 meta 标签，如 <meta name="description" content="...">
 * 
 * React Router v7 会自动处理这些元数据，无需手动操作 DOM
 */
export const meta = () => ([
    { title: 'Resumind | Auth' },
    { name: 'description', content: '登录你的账户' },
])

const Auth = () => {
  
  /**
   * 认证重定向逻辑
   * 
   * 功能说明：
   * 1. 从 URL 查询参数中获取 'next' 参数（用户登录前想访问的页面）
   * 2. 监听用户认证状态变化
   * 3. 当用户成功登录后，自动重定向到之前想访问的页面
   * 
   * 使用场景：
   * - 用户访问需要登录的页面时，先跳转到 /auth?next=/目标页面
   * - 登录成功后，自动跳转回目标页面，提升用户体验
   * 
   * 示例：
   * - 访问 /auth?next=/resume/123
   * - 登录后自动跳转到 /resume/123
   */
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split('next=')[1];
  const navigate =useNavigate();

  useEffect(() => {
    if(auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated]);

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>登录以继续您的简历分析之旅</h2>
          </div>
          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p>正在为您登录...</p>
              </button>
            ) :(
              <>
                  {auth.isAuthenticated ? (
                    <button className="auth-button" onClick={auth.signOut}>
                      <p>注销</p>
                    </button>
                  ) : (
                    <button className="auth-button" onClick={auth.signIn}>
                      <p>登录</p>
                      </button>
                  )}
              </>
              )}
                
          </div>
        </section>
      </div>
    </main>
  );
}

export default Auth;