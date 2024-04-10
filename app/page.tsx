'use client';

import { useFormState } from 'react-dom';

import Link from 'next/link';

import { createQRCode } from '@/app/actions';

const defaultUrl = 'https://google.com/';
const defaultDarkColor = '#000000';
const defaultLightColor = '#FFFFFF';

const Header = () => {
  return (
    <>
      <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
        <Link href='/'>QR Code Generator</Link>
      </h1>
      <p className='mx-auto mt-6 max-w-xl text-lg text-gray-600'>
        Free QR codes without pesky time limits or tracking because I don&#39;t
        want your data or money!
      </p>
    </>
  );
};

const Form = ({
  url,
  darkColor,
  lightColor,
  action,
}: {
  url: string | null;
  darkColor: string | null;
  lightColor: string | null;
  action: (formData: FormData) => void;
}) => {
  return (
    <form className='space-y-3' action={action}>
      <div>
        <label
          htmlFor='url'
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          URL
        </label>
        <div className='mt-2'>
          <input
            id='url'
            name='url'
            type='url'
            autoComplete='none'
            required
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            defaultValue={url || defaultUrl}
          />
        </div>
      </div>

      <div className='flex'>
        <div className='flex-grow flex items-center'>
          <label
            htmlFor='darkColor'
            className='text-sm font-medium text-gray-900 mr-2'
          >
            Dark Color
          </label>
          <input
            type='color'
            name='darkColor'
            id='darkColor'
            defaultValue={darkColor || defaultDarkColor}
          />
        </div>
        <div className='flex-grow flex items-center'>
          <label
            htmlFor='lightColor'
            className='text-sm font-medium text-gray-900 mr-2'
          >
            Light Color
          </label>
          <input
            type='color'
            name='lightColor'
            id='lightColor'
            defaultValue={lightColor || defaultLightColor}
          />
        </div>
      </div>

      <button
        type='submit'
        className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
      >
        Generate QR Code
      </button>
    </form>
  );
};

export default function Home() {
  const [state, formAction] = useFormState(createQRCode, {
    href: '',
    dataURL: '',
    rawFormData: {
      url: defaultUrl,
      darkColor: defaultDarkColor,
      lightColor: defaultLightColor,
    },
  });

  if (state.dataURL) {
    return (
      <main>
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
          <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <Header />
          </div>
          <div className='mt-5 sm:mx-auto sm:w-full sm:max-w-sm'>
            <a href={state.dataURL} download={`qr-code-${Date.now()}.png`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={state.dataURL}
                width='500'
                height='500'
                alt='QR code'
                style={{ width: '100%', height: 'auto' }}
              />
            </a>
            <p className='mt-2 text-s text-center dark:text-slate-500'>
              Click image to download QR code.
            </p>
          </div>
          <div className='mt-5 sm:mx-auto sm:w-full sm:max-w-sm'>
            <Form
              url={state.rawFormData.url}
              darkColor={state.rawFormData.darkColor}
              lightColor={state.rawFormData.lightColor}
              action={formAction}
            />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <Header />
        </div>
        <div className='mt-5 sm:mx-auto sm:w-full sm:max-w-sm'>
          <Form
            url={state.rawFormData.url}
            darkColor={state.rawFormData.darkColor}
            lightColor={state.rawFormData.lightColor}
            action={formAction}
          />
        </div>
      </div>
    </main>
  );
}
