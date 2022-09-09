export default function Seo({ title, description }) {
  document.querySelector('title').innerHTML = `${title}`;
  return null;
}
