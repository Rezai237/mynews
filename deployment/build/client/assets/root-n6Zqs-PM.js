import{w as n,a as c}from"./with-props-DRM106Ts.js";import{o as e,M as i,L as l,S as d,p as m,O as h,q as p}from"./chunk-D4RADZKF-DUJFVFZr.js";const x=()=>[{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"}];function g({children:s}){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx(i,{}),e.jsx(l,{}),e.jsx("script",{dangerouslySetInnerHTML:{__html:`
              // Prevent flash of unstyled content
              try {
                const theme = localStorage.getItem('ui-storage');
                if (theme) {
                  const parsed = JSON.parse(theme);
                  if (parsed.state?.theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (parsed.state?.theme === 'system') {
                    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                      document.documentElement.classList.add('dark');
                    }
                  }
                }
              } catch (e) {}
            `}})]}),e.jsxs("body",{children:[s,e.jsx(d,{}),e.jsx(m,{})]})]})}const j=n(function(){return e.jsx("div",{className:"min-h-screen bg-white dark:bg-gray-900 transition-colors",children:e.jsx(h,{})})}),y=c(function({error:t}){let o="Oops!",r="An unexpected error occurred.",a;return p(t)&&(o=t.status===404?"404":"Error",r=t.status===404?"The requested page could not be found.":t.statusText||r),e.jsxs("main",{className:"pt-16 p-4 container mx-auto",children:[e.jsx("h1",{children:o}),e.jsx("p",{children:r}),a]})});export{y as ErrorBoundary,g as Layout,j as default,x as links};
