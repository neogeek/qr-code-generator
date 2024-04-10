'use server';

import qrcode from 'qrcode';

import parseUrl from 'parse-url';

const isHex = (color: string) => /^#([a-f0-9]{3}){1,2}/i.test(color);

const defaultUrl = 'https://google.com/';
const defaultDarkColor = '#000000';
const defaultLightColor = '#FFFFFF';

export async function createQRCode(prevState: any, formData: FormData) {
  const rawFormData = {
    url: formData.get('url'),
    darkColor: formData.get('darkColor'),
    lightColor: formData.get('lightColor'),
  };

  const url = rawFormData.url?.toString() || defaultUrl;
  const darkColor = rawFormData.darkColor?.toString() || defaultDarkColor;
  const lightColor = rawFormData.lightColor?.toString() || defaultLightColor;

  const parsedUrl = parseUrl(url);

  const dataURL = await qrcode.toDataURL(parsedUrl.href, {
    margin: 0,
    color: {
      dark:
        darkColor !== null && isHex(darkColor) ? darkColor : defaultDarkColor,
      light:
        lightColor !== null && isHex(lightColor)
          ? lightColor
          : defaultLightColor,
    },
    scale: 40,
  });

  return {
    href: url,
    dataURL: dataURL,
    rawFormData: {
      url,
      darkColor,
      lightColor,
    },
  };
}
