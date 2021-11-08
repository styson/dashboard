export default function Seo({ title, description }) {
  document.querySelector('title').innerHTML = `BFP: ${title}`;
  return null;
}