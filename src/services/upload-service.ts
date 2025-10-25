import type { HttpResponse } from '@/types/common';
import HttpClient from '@/utils/HttpClient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/image`;

export const uploadImage = (file: File, type: string): Promise<HttpResponse<{ file: { imageUrl: string, fileName: string }, folder: string }>> => {
  const formData = new FormData();
  formData.append('type', type);
  formData.append('image', file);
  
  return HttpClient.post(
    `${prefix}/upload-image`, 
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

export const uploadImages = (files: File[], type: string): Promise<HttpResponse<{ files: any[], folder: string }>> => {
  const formData = new FormData();
  formData.append('type', type);
  files.forEach((file) => {
    formData.append("images", file); // Mỗi file là 1 Blob
  });
  
  return HttpClient.post(
    `${prefix}/upload-images`, 
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

export const uploadVideos = (files: File[], type: string): Promise<HttpResponse<{ files: any[], folder: string }>> => {
  const formData = new FormData();
  formData.append('type', type);
  files.forEach((file) => {
    formData.append("videos", file); // Mỗi file là 1 Blob
  });
  
  return HttpClient.post(
    `${prefix}/upload-videos`, 
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};