import React, { ChangeEvent, useState, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { Area, Point } from 'react-easy-crop/types';
import { useTranslation } from 'react-i18next';
import { INPUT_CLASS_NAME } from './InputGroup';

interface PhotoUploadProps<K extends string, V extends string | undefined> {
  src?: string,
  name: K,
  value?: V,
  onChange: (name: K, value: V | undefined) => void
}

const PhotoUpload = <K extends string>({
  src,
  onChange,
  name,
  value
}: PhotoUploadProps<K, string>) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(src || null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);

  const onCropChange = (newCrop: Point) => {
    setCrop(newCrop);
  };

  const onZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  };

  const handleCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    if (!selectedFile) {
      return;
    }

    const image = new Image();
    image.src = URL.createObjectURL(selectedFile);

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );

        const croppedImageUrl = canvas.toDataURL(selectedFile.type);
        onChange(name, croppedImageUrl as K);
        setPreviewUrl(croppedImageUrl);
        // Предотвращаем стандартное поведение перетаскивания
        canvas.addEventListener('dragstart', (event) => {
          event.preventDefault();
        });

        // Прикрепляем обрезанное изображение к событию drop (перетаскивания)
        canvas.addEventListener('dragover', (event) => {
          event.preventDefault();
        });

        canvas.addEventListener('drop', (event) => {
          event.preventDefault();
          const droppedFile = new File([selectedFile], 'cropped-image.png', { type: selectedFile.type });
          setSelectedFile(droppedFile);
        });
      }
    };
  };

  const [imageObjectURL, setImageObjectURL] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        // onChange(name, reader.result as K);
        // setPreviewUrl(reader.result as string);

        if (imageObjectURL) {
          URL.revokeObjectURL(imageObjectURL); // Освободить ресурсы
        }
        setImageObjectURL(URL.createObjectURL(file)); // Создать новую ссылку
      };

      reader.readAsDataURL(file);
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

  const { t } = useTranslation()

  return (
    <div className='col-span-full'>
      <label htmlFor="photoInput" className="block font-medium text-gray-700 mb-2">
        {t("your-photo")}
      </label>
      
      <div className='flex flex-row'>
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
            <img src={previewUrl || src} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-5">
              <p className="text-gray-500">{t("click-or-drag-a-file-here")}</p>
            </div>
          )}
        </div>

        <div
          className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded cursor-pointer">
          {selectedFile && (
            <Cropper
              image={URL.createObjectURL(selectedFile)}
              crop={crop}
              zoom={zoom}
              aspect={4 / 4}
              onCropChange={onCropChange}
              onCropComplete={handleCropComplete}
              onZoomChange={onZoomChange}
            />
          )}
        </div>
      </div>
      <button
        className='btn btn-link align-left text-blue-600'
        // className={INPUT_CLASS_NAME}
        onClick={() => {
          onChange(name, undefined)
          setSelectedFile(null)
          setPreviewUrl(null)
        }}
        style={{ position: "relative"}}>
        {t('clear-photo-input')}
      </button>
    </div>
  );
};

export { PhotoUpload };
