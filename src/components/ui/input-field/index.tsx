import React, { useRef } from 'react';
import { Trash } from 'lucide-react';
import { FileAttachment } from '@appTypes/tasks';

interface InputFileProps {
  label: string;
  files: FileAttachment[];
  onFilesChange: (files: FileAttachment[]) => void;
}

const InputFile: React.FC<InputFileProps> = ({
  label,
  files,
  onFilesChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []).map(
      (file, index) => ({
        id: Date.now() + index,
        name: file.name,
        url: URL.createObjectURL(file),
        size: file.size || 0,
        type: file.type,
      })
    );
    onFilesChange([...files, ...newFiles]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileRemove = (id: number) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    onFilesChange(updatedFiles);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer"
      >
        Выбрать файлы
      </button>

      {files.length > 0 && (
        <ul className="mt-2 space-y-2">
          {files.map((file) => (
            <li
              key={file.id}
              className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded"
            >
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {file.name}
              </span>
              <button
                type="button"
                onClick={() => handleFileRemove(file.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash className="w-4 h-4" color="black" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputFile;
