'use client'

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import style from '@/styles/inicio/Dropzone.module.css'

export default function DropzoneImagenes({ onDropComplete }) {
  const [archivos, setArchivos] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const nuevosArchivos = acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setArchivos(nuevosArchivos);
    onDropComplete(nuevosArchivos); // lo puedes usar para pasarlo al formulario
  }, [onDropComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    multiple: true,
    maxFiles: 3
  });

  return (
    <div {...getRootProps()} className={style.contenedor}>
      <input {...getInputProps()} />
      {
        isDragActive ? (
          <p>Suelta las imágenes aquí...</p>
        ) : (
          <p>Arrastra hasta 3 imágenes o haz clic para seleccionarlas</p>
        )
      }

      <div className={style.imagenes}>
        {archivos.map((file, index) => (
          <div key={index}>
            <img
              src={file.preview}
              alt="preview"
              className={style.imagen}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
