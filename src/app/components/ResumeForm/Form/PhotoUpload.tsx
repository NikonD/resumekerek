import React, { ChangeEvent, useState, useRef } from 'react';

interface PhotoUploadProps<K extends string, V extends string> {
  name: K,
  value?: V,
  onChange: (name: K, value: V) => void
}

const PhotoUpload = <K extends string>({
  onChange,
  name,
  value
}: PhotoUploadProps<K, string>) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        // console.log(reader.result)
        onChange(name, reader.result as K)
        setPreviewUrl(reader.result as string);
      };

      reader.readAsDataURL(file);
      console.log(reader.result)
      

    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className='col-span-full'>
      <label htmlFor="photoInput" className="block font-medium text-gray-700 mb-2">
        Ваше фото
      </label>
      <div
        className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded cursor-pointer"
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          id="photoInput"
          name={name}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          ref={inputRef}
        />
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-5">
            <p className="text-gray-500">Кликните или перетащите файл сюда</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { PhotoUpload };