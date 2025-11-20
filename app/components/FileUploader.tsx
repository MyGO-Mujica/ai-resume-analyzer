import {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize } from '../lib/utils'

/**
 * FileUploader 组件的属性接口
 * 
 * @interface FileUploaderProps
 * 
 * @property {function} [onFileSelect] - 文件选择回调函数（可选）
 *   - 当用户选择或拖拽文件时触发
 *   - 参数 file: File | null
 *     - File: 用户选择的文件对象
 *     - null: 用户取消选择或清空文件
 *   - 无返回值 (void)
 * 
 */
interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) =>{
  // 使用本地 state 管理选中的文件
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[])=> {
    const selectedFile = acceptedFiles[0] || null;
    setFile(selectedFile);  // 更新本地状态
    onFileSelect?.(selectedFile);  // 通知父组件
  }, [onFileSelect])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,  // 文件拖放或选择后的回调函数
    multiple: false,  // 禁止多文件上传，只允许选择单个文件
    accept: { 'application/pdf': ['.pdf'] },  // 限制只接受 PDF 文件（MIME 类型和扩展名）
    maxSize: 20 * 1024 * 1024, // 文件大小限制：20 MB（20 * 1024 * 1024 字节）
  })

  // 清空文件的处理函数
  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();  // 阻止冒泡，避免触发文件选择
    setFile(null);  // 清空本地状态
    onFileSelect?.(null);  // 通知父组件
  };

  return (
    <div className="w-full gradient-border">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
             
             <div className='space-y-4 cursor-pointer'>

                {file ? (
                        <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
                            <img src="/images/pdf.png" alt="pdf" className="size-10" />
                            <div className="flex items-center space-x-3">
                                <div>
                                    <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                                        {file.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button 
                               
                                className="p-2 cursor-pointer" 
                                onClick={handleRemoveFile}
                            >
                                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
                            </button>
                        </div>
                    ):(
                        <div>
                            <div className='mx-auto w-16 h-16 flex items-center justify-center mb-2'>
                                <img src="/icons/info.svg" alt="upload" className='size-20' />
                            </div>
                            <p className='text-lg text-gray-500'>
                              <span className='font-semibold'>
                                 点击上传
                              </span> 或拖拽文件到此处
                            </p>
                            <p className='text-lg text-gray-500'>PDF (max 20 MB)</p>
                        </div>
                )}
             </div>
          </div>
    </div>
  )
}

export default FileUploader