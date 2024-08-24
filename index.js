import{i as d,S as p}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const h=r=>`
  <li class="gallery-card">
    <a href="${r.largeImageURL}">
      <img class="gallery-img" src="${r.webformatURL}" alt="${r.tags}" />
    </a>
    <p>likes ${r.likes}</p>
    <p>views ${r.views}</p>
    <p>comments ${r.comments}</p>
    <p>downloads ${r.downloads}</p>
  </li>
  `,f=r=>fetch(`https://pixabay.com/api/?key=45457641-ce63f5c92c9f6494e7448790b&q=${r}&image_type=photo&orientation=horizontal&safesearch=true`).then(o=>{if(!o.ok)throw new Error(o.status);return o.json()}),i=document.querySelector(".js-search-form"),n=document.querySelector(".js-gallery"),u=document.querySelector(".loader"),m=()=>{u.classList.remove("is-hidden")},c=()=>{u.classList.add("is-hidden")},y=r=>{r.preventDefault();const o=i.elements.user_query.value;m(),f(o).then(s=>{if(s.hits.length===0){d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),n.innerHTML="",i.reset(),c();return}const a=s.hits.map(t=>h(t)).join("");n.innerHTML=a,i.reset(),c(),new p(".js-gallery a",{captionsData:"alt",captionDelay:250}).refresh()}).catch(s=>{console.log(s)})};i.addEventListener("submit",y);
//# sourceMappingURL=index.js.map
