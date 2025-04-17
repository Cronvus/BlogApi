declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '*.gif';
declare module '*.webp';

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}