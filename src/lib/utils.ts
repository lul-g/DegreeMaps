import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';
import { Content, Major, Path } from '@/app/(types)/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getMajor(id: number) {
  // do not use in prod
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/majors/${id}`
  );
  return result.data;
}

export async function getMajors() {
  // do not use in prod
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/majors`
  );
  const majors = result.data.map((major: Major) => {
    return { ...major, pathLen: major.paths.length };
  });
  return majors;
}

export async function getPath(id: number) {
  // do not use in prod
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/paths/${id}`
  );
  console.log(result.data);
  return result.data;
}

export async function postPath(path: Path) {
  // do not use in prod
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/paths`;
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await axios.post(apiUrl, path, { headers });
    if (response.status === 200) {
      console.log('Request successful:', response);
    } else {
      console.error('Request failed with status:', response.status);
    }
    return response;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export async function updatePath(path: Path) {
  // do not use in prod
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/paths/${path.id}`;
    const headers = {
      'Content-Type': 'application/json',
    };

    // console.log(path);
    const response = await axios.put(apiUrl, path, { headers });
    // console.log(response);

    if (response.status === 200) {
      console.log('Request successful:', response.data);
    } else {
      console.error('Request failed with status:', response.status);
    }
    return response;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export async function updateDraft(content: Content) {
  // do not use in prod
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/content/draft/${content.id}`;
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await axios.put(apiUrl, content, { headers });

    if (response.status === 200) {
      console.log('Request successful:', response.data);
      return response;
    } else {
      console.error('Request failed with status:', response.status);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export async function updatePublish(content: Content) {
  // do not use in prod
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/content/publish/${content.id}`;
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await axios.put(apiUrl, content, { headers });
    console.log(response);

    if (response.status === 200) {
      console.log('Request successful:', response.data);
    } else {
      console.error('Request failed with status:', response.status);
    }
    return response;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
